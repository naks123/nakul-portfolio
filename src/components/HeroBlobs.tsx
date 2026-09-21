type Blob = {
  className: string;
  dx: string;
  dy: string;
  duration: string;
};

/* Three blurred orbs in the accent colors. Pure CSS: drift is the .blob
   animation in globals.css, off under reduced motion. Now the fallback for
   the WebGL ring (see HeroVisual): fills whatever box its parent gives it. */
const BLOBS: Blob[] = [
  {
    className: "left-[6%] top-[8%] size-[64%] bg-radial from-accent-blue to-transparent to-70% opacity-90",
    dx: "10%",
    dy: "8%",
    duration: "23s",
  },
  {
    className: "right-[2%] top-[26%] size-[56%] bg-radial from-accent-red to-transparent to-70% opacity-80",
    dx: "-9%",
    dy: "10%",
    duration: "29s",
  },
  {
    // Kept near-opaque: yellow at low opacity on black reads as olive.
    className: "left-[24%] bottom-[6%] size-[42%] bg-radial from-accent-yellow to-transparent to-66% opacity-90",
    dx: "8%",
    dy: "-10%",
    duration: "19s",
  },
];

export default function HeroBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {BLOBS.map((blob, i) => (
        <span
          key={i}
          className={`blob ${blob.className}`}
          style={
            {
              "--dx": blob.dx,
              "--dy": blob.dy,
              "--blob-duration": blob.duration,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
