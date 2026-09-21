export type Project = {
  slug: string;
  name: string;
  summary: string;
  tech: string[];
  bullets: string[];
};

/** Ordered most recent first. `slug` is the /projects/[slug] route segment. */
export const projects: Project[] = [
  {
    slug: "spt-risk-engine",
    name: "Stochastic Portfolio Theory Risk Engine",
    summary:
      "Monte Carlo VaR/ES engine with four pluggable simulation backends, two of them rank-based Stochastic Portfolio Theory models.",
    tech: ["Python", "NumPy", "SciPy", "pytest", "Streamlit"],
    bullets: [
      "Building a Monte Carlo VaR/ES engine generating 10,000+ path scenarios at 95%/99% confidence across four pluggable simulation backends (Cholesky-correlated Gaussian, historical bootstrap, and two rank-based models from Fernholz–Karatzas Stochastic Portfolio Theory), reporting confidence intervals on the VaR estimate itself.",
      "Encoded three closed-form theorem targets as failing tests before writing simulator code, with 200-case property tests per invariant; identified an off-diagonal covariance error in the leading open-source SPT implementation.",
    ],
  },
  {
    slug: "gem-hunters",
    name: "Gem Hunters Game",
    summary:
      "Web-based multidimensional reinforcement learning task. 216 trials per participant, deployed to 100+ participants via Prolific.",
    tech: ["Python", "JavaScript", "jsPsych", "Node.js"],
    bullets: [
      "Built a web-based multidimensional reinforcement learning task in JavaScript using jsPsych where participants completed 216 trials each to learn reward rules that were changed between rounds.",
      "Engineered randomized experiment logic and data collection pipelines, implementing probabilistic reward schedules (80/20) and reaction time logging across 20,000+ trials, enabling precise measurement of learning performance.",
      "Deployed the experiment to 100+ participants via Prolific and analyzed response patterns, producing statistically usable data that was presented to 40+ professors, PhD students, and graduate researchers at Mount Sinai.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
