/* A glowing, slowly turning ring drawn by one WebGL fragment shader.
   No 3D library: the "3D" is a tilted circle (an ellipse) whose near side
   is brighter, and the glow is brightness falling off with distance from
   the ring. Colors come from the design tokens in globals.css. */

type RGB = [number, number, number];

export type RingOptions = {
  /** Draw one frame and stop (prefers-reduced-motion). */
  still: boolean;
  /** Frame cap; lower on phones to save battery. */
  maxFps: number;
};

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform vec3 uBlue;
uniform vec3 uRed;
uniform vec3 uYellow;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  // Centered, square coordinates: -0.5..0.5 across the canvas.
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  float t = uTime;

  // Tilt: squash y so the circle reads as a ring seen from slightly below.
  float tilt = 0.56 + 0.03 * sin(t * 0.21);
  vec2 p = vec2(uv.x, uv.y / tilt);

  const float R = 0.30;
  float r = length(p);
  float d = abs(r - R) * mix(1.0, tilt, 0.5); // distance to the ring, roughly on screen
  float ang = atan(p.y, p.x);

  // Near side (bottom arc) bright, far side (top arc) dim.
  float near = mix(1.0, 0.28, smoothstep(-0.7, 0.95, sin(ang)));

  // Color drifts around the ring: blue -> violet -> red and back.
  float h = ang / 6.28318 + t * 0.025;
  vec3 hue = mix(uBlue, uRed, 0.5 + 0.5 * sin(6.28318 * h));
  hue = mix(hue, vec3(0.62, 0.35, 1.0), 0.18); // a little violet between them

  float line = exp(-pow(d / 0.0068, 2.0));        // crisp core
  float glow = 1.0 / (1.0 + pow(d / 0.032, 2.0)); // neon bloom
  float haze = 1.0 / (1.0 + pow(d / 0.085, 2.0)); // soft light around it
  vec3 col = hue * (line * 1.15 + glow * 0.55 + haze * 0.13) * near;

  // A white-hot flare travelling slowly around the ring.
  float fa = -t * 0.22 - 1.2;
  float da = atan(sin(ang - fa), cos(ang - fa));
  float flare = exp(-da * da * 10.0);
  float flareNear = mix(1.0, 0.35, smoothstep(-0.7, 0.95, sin(fa)));
  vec3 hot = mix(vec3(1.0, 0.97, 0.92), uYellow, 0.22);
  // Tight falloff (gaussian, not the long-tailed glow) so the flare lights the
  // ring itself and doesn't paint a wedge toward the center.
  float flareGlow = exp(-pow(d / 0.036, 2.0));
  col += hot * flare * (line * 2.6 + flareGlow * 1.0) * flareNear;

  // Soft lens bloom around the flare's position on screen.
  vec2 fp = vec2(cos(fa), sin(fa) * tilt) * R;
  float fd = length(uv - fp);
  col += hot * 0.0022 / (fd * fd + 0.0022) * 0.15 * flareNear;

  // Sparse dust near the ring, twinkling.
  vec2 cell = floor(uv * 70.0);
  float rnd = hash(cell);
  vec2 f = fract(uv * 70.0) - 0.5;
  float dust = step(0.975, rnd) * smoothstep(0.16, 0.0, length(f));
  dust *= (0.55 + 0.45 * sin(t * 1.3 + rnd * 60.0)) * exp(-d * 7.0);
  col += vec3(0.85, 0.85, 1.0) * dust * 0.45;

  // Fade to nothing at the canvas edge, so no box is ever visible.
  col *= smoothstep(0.5, 0.33, length(uv));

  col = 1.0 - exp(-col * 1.5); // gentle tone curve: bright, never clipped flat
  float a = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
  gl_FragColor = vec4(col, a); // premultiplied: composites cleanly on any background
}
`;

function readToken(name: string, fallback: RGB): RGB {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = /^#([0-9a-f]{6})$/i.exec(raw);
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("hero ring shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** Starts the ring. Returns a stop function, or null if WebGL isn't
    available (the caller keeps its CSS fallback). */
export function startRing(
  canvas: HTMLCanvasElement,
  options: RingOptions,
  onContextLost: () => void,
): (() => void) | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!gl || gl.isContextLost()) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  // One triangle that covers the whole canvas.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(program, "uRes");
  const uTime = gl.getUniformLocation(program, "uTime");
  gl.uniform3fv(gl.getUniformLocation(program, "uBlue"), readToken("--color-accent-blue", [0.23, 0.3, 1]));
  gl.uniform3fv(gl.getUniformLocation(program, "uRed"), readToken("--color-accent-red", [1, 0.3, 0.24]));
  gl.uniform3fv(gl.getUniformLocation(program, "uYellow"), readToken("--color-accent-yellow", [0.98, 1, 0.24]));

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let raf = 0;
  let visible = true;
  let last = 0;
  const minFrame = 1000 / options.maxFps;
  const start = performance.now();
  const STILL_TIME = 7.5; // a flattering moment for the static frame

  const draw = (seconds: number) => {
    gl.uniform1f(uTime, seconds);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  // Tracked per start, not read off the canvas: when the same canvas is
  // started again (dev remount), it already has the right size, but this new
  // program still needs its uRes uniform set.
  let sizedW = 0;
  let sizedH = 0;
  const resize = () => {
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (sizedW === w && sizedH === h) return;
    sizedW = w;
    sizedH = h;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uRes, w, h);
    if (options.still) draw(STILL_TIME);
  };

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    if (!visible || now - last < minFrame) return;
    last = now;
    draw((now - start) / 1000 + 4);
  };

  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(canvas);
  resize();

  // Don't spend GPU time on a ring nobody can see.
  const viewObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  viewObserver.observe(canvas);

  const handleLost = (event: Event) => {
    event.preventDefault();
    cancelAnimationFrame(raf);
    onContextLost();
  };
  canvas.addEventListener("webglcontextlost", handleLost);

  if (options.still) draw(STILL_TIME);
  else raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    sizeObserver.disconnect();
    viewObserver.disconnect();
    canvas.removeEventListener("webglcontextlost", handleLost);
    // Release our GPU objects but leave the context alive: the same canvas can
    // be started again (React remounts effects in dev), and a context that was
    // force-lost can't be reused. The browser frees it with the canvas.
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
  };
}
