export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      "R",
      "Python",
      "Java",
      "JavaScript",
      "HTML/CSS",
      "LaTeX",
      "React",
      "SQL",
      "MATLAB",
    ],
  },
  {
    label: "Libraries",
    items: [
      "Tidyverse",
      "ggplot",
      "jsPsych",
      "NumPy",
      "scikit-learn",
      "Matplotlib",
      "pandas",
      "Node.js",
      "Express.js",
    ],
  },
  {
    label: "Tools",
    items: [
      "GitHub",
      "Cursor",
      "Visual Studio Code",
      "MongoDB",
      "Docker",
      "Claude Code",
      "CodeX",
      "Jira",
    ],
  },
];
