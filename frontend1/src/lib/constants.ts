// RIASEC personality types with descriptions and colors
export const RIASEC_TYPES = {
  R: {
    code: 'R',
    name: 'Realistic',
    description: 'Practical, hands-on problem solvers who enjoy working with tools, machines, plants, or animals.',
    color: 'realistic',
    careers: ['Engineer', 'Mechanic', 'Carpenter', 'Electrician', 'Pilot'],
    icon: '🔧',
  },
  I: {
    code: 'I',
    name: 'Investigative',
    description: 'Analytical thinkers who enjoy researching, analyzing, and solving complex problems.',
    color: 'investigative',
    careers: ['Scientist', 'Researcher', 'Doctor', 'Data Analyst', 'Professor'],
    icon: '🔬',
  },
  A: {
    code: 'A',
    name: 'Artistic',
    description: 'Creative individuals who enjoy expressing themselves through art, music, writing, or design.',
    color: 'artistic',
    careers: ['Artist', 'Writer', 'Designer', 'Musician', 'Architect'],
    icon: '🎨',
  },
  S: {
    code: 'S',
    name: 'Social',
    description: 'People-oriented helpers who enjoy teaching, counseling, and assisting others.',
    color: 'social',
    careers: ['Teacher', 'Counselor', 'Nurse', 'Social Worker', 'HR Manager'],
    icon: '🤝',
  },
  E: {
    code: 'E',
    name: 'Enterprising',
    description: 'Natural leaders who enjoy persuading, managing, and influencing others.',
    color: 'enterprising',
    careers: ['Entrepreneur', 'Manager', 'Lawyer', 'Sales Director', 'CEO'],
    icon: '💼',
  },
  C: {
    code: 'C',
    name: 'Conventional',
    description: 'Detail-oriented organizers who enjoy working with data, systems, and procedures.',
    color: 'conventional',
    careers: ['Accountant', 'Banker', 'Administrator', 'Auditor', 'Secretary'],
    icon: '📊',
  },
} as const;

// Test questions for each RIASEC type (3 questions each = 18 total)
export const TEST_QUESTIONS = [
  // Realistic (R) - 3 questions
  { id: 1, type: 'R', question: 'I enjoy working with my hands to build or fix things.' },
  { id: 2, type: 'R', question: 'I prefer outdoor activities and physical work over desk jobs.' },
  { id: 3, type: 'R', question: 'I like using tools, machines, or technology to solve practical problems.' },
  
  // Investigative (I) - 3 questions
  { id: 4, type: 'I', question: 'I enjoy solving complex puzzles and analytical problems.' },
  { id: 5, type: 'I', question: 'I am curious about how things work and love researching topics deeply.' },
  { id: 6, type: 'I', question: 'I prefer making decisions based on data and logical analysis.' },
  
  // Artistic (A) - 3 questions
  { id: 7, type: 'A', question: 'I express myself creatively through art, music, writing, or design.' },
  { id: 8, type: 'A', question: 'I value originality and prefer unconventional approaches.' },
  { id: 9, type: 'A', question: 'I enjoy activities that allow me to be imaginative and innovative.' },
  
  // Social (S) - 3 questions
  { id: 10, type: 'S', question: 'I enjoy helping others learn new skills or overcome challenges.' },
  { id: 11, type: 'S', question: 'I am good at understanding people\'s feelings and motivations.' },
  { id: 12, type: 'S', question: 'I prefer working in teams rather than working alone.' },
  
  // Enterprising (E) - 3 questions
  { id: 13, type: 'E', question: 'I enjoy leading projects and motivating others to achieve goals.' },
  { id: 14, type: 'E', question: 'I am comfortable taking risks to achieve success.' },
  { id: 15, type: 'E', question: 'I like persuading and negotiating with others.' },
  
  // Conventional (C) - 3 questions
  { id: 16, type: 'C', question: 'I prefer organized, structured work with clear guidelines.' },
  { id: 17, type: 'C', question: 'I pay close attention to details and accuracy.' },
  { id: 18, type: 'C', question: 'I enjoy working with numbers, records, and data systems.' },
];

// Score labels for the 5-point Likert scale
export const SCORE_LABELS = [
  { value: 0, label: 'Strongly Disagree' },
  { value: 1, label: 'Disagree' },
  { value: 2, label: 'Neutral' },
  { value: 3, label: 'Agree' },
  { value: 4, label: 'Strongly Agree' },
];

export type RIASECCode = keyof typeof RIASEC_TYPES;
export type RIASECScores = Record<RIASECCode, number>;
