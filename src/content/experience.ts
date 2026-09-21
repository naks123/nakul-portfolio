export type Experience = {
  org: string;
  role: string;
  start: string;
  end: string;
  summary: string;
  bullets: string[];
};

/** Ordered most recent first. `end: "Present"` drives the "Currently" list on the home page. */
export const experience: Experience[] = [
  {
    org: "Purdue VIP: Computer Vision & Generative Models",
    role: "Undergraduate Researcher",
    start: "Aug 2026",
    end: "Present",
    summary: "Multimodal deepfake detection for live video calls.",
    bullets: [
      "Developing a real-time multimodal deep learning pipeline that combines four signal types — facial, speech, lip synchronization, and acoustic features — to detect manipulated media in live video calls.",
      "Benchmarking audio and video deepfake models on three public datasets and benchmarks, including RTCFake, VCF, and FakeAVCeleb, using Slurm and NVIDIA GPUs on Purdue's Gilbreth cluster to test robustness against compression, packet loss, and noise suppression.",
    ],
  },
  {
    org: "Purdue Engineering Projects in Community Service",
    role: "Design Lead",
    start: "Jan 2026",
    end: "Present",
    summary: "Gamified early-literacy app. Flutter, Firebase. Team of 8.",
    bullets: [
      "Lead a team of 8 students to develop a gamified early literacy application for the Boys & Girls Club of Northern Indiana Corridor, aligning structured learning modules and UI workflows with the UFLI phonics curriculum to support classroom and at-home literacy development.",
      "Engineer core application features using the Flutter + Firebase stack, including sound identification exercises, CVC word construction, guided tracing interfaces, diagnostic placement logic, and level-based reward progression; implemented scalable backend data models to track student progress and support adaptive learning pathways.",
    ],
  },
  {
    org: "Hack the Future",
    role: "Software Developer",
    start: "Oct 2025",
    end: "Present",
    summary: "Internal operations platform for a UK nonprofit. MERN stack.",
    bullets: [
      "Built a centralized internal operations platform for Sleep Pod, a UK-based nonprofit distributing insulated sleeping pods across the UK and Europe, using the MERN stack (MongoDB, Express.js, React, Node.js) to replace fragmented WhatsApp, email, and spreadsheet workflows.",
      "Designed and implemented an analytics module using Apache ECharts with dual-party data verification, automated system-generated events for prison partners, and interactive visualizations for production amounts, material breakdowns, and geographic distribution.",
      "Built a real-time pending/history event pipeline using React, Node.js, Express.js, MongoDB, Stream Chat API, FullCalendar, and Apache ECharts, with role-based card views, dispute detection, admin override capabilities, and filtering by date, user, organization, and item type.",
    ],
  },
];
