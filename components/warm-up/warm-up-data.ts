export interface WarmUpOption {
  id: string;
  label: string;
  icon: string;
}

export interface WarmUpQuestion {
  id: number;
  stepNumber: number;
  tag: string;
  tagBg?: string;
  tagColor?: string;
  question: string;
  subtitle: string;
  helperText: string;
  layout: "grid-2" | "grid-3" | "grid-4";
  options: WarmUpOption[];
}

export const WARM_UP_QUESTIONS: WarmUpQuestion[] = [
  {
    id: 1,
    stepNumber: 1,
    tag: "THINGS YOU ENJOY",
    question: "Which of these do you like best?",
    subtitle: "Choose one answer that feels most like you.",
    helperText: "This is about what you like, not what you're good at.",
    layout: "grid-2",
    options: [
      { id: "drawing", label: "Drawing", icon: "✏️" },
      { id: "puzzles", label: "Puzzles", icon: "🧩" },
      { id: "sports", label: "Running and sports games", icon: "🏃" },
      { id: "stories", label: "Stories", icon: "📖" },
      { id: "blocks", label: "Building with blocks", icon: "🧱" },
      { id: "music", label: "Music", icon: "🎵" },
    ],
  },
  {
    id: 2,
    stepNumber: 2,
    tag: "FINDING YOUR WAY",
    question: "What helps when a game feels tricky?",
    subtitle: "Pick the answer that sounds most like you.",
    helperText: "There are lots of ways to tackle a challenge. Yours is welcome.",
    layout: "grid-2",
    options: [
      { id: "retry", label: "Give it another go", icon: "🔄" },
      { id: "help", label: "Ask for a little help", icon: "🤝" },
      { id: "rest", label: "Rest for a moment", icon: "🛋️" },
      { id: "different", label: "Try a different way", icon: "🔀" },
    ],
  },
  {
    id: 3,
    stepNumber: 3,
    tag: "PICTURES & WORDS",
    question: "How do you like to explore a story?",
    subtitle: "Pick the answer that sounds most like you.",
    helperText: "Pictures, words, or both—choose what you enjoy.",
    layout: "grid-3",
    options: [
      { id: "pictures", label: "Explore the pictures", icon: "🖼️" },
      { id: "words", label: "Read the words", icon: "📖" },
      { id: "both", label: "Enjoy both together", icon: "📑" },
    ],
  },
  {
    id: 4,
    stepNumber: 4,
    tag: "YOUR SCHOOL DAY",
    question: "Which part of your school day do you love?",
    subtitle: "Pick the answer that sounds most like you.",
    helperText: "Think about what makes you smile most at your desk.",
    layout: "grid-2",
    options: [
      { id: "numbers", label: "Numbers and puzzles", icon: "🧮" },
      { id: "reading", label: "Reading and stories", icon: "📚" },
      { id: "nature", label: "Nature and discovery", icon: "🌱" },
      { id: "drawing-school", label: "Drawing and making", icon: "🎨" },
      { id: "movement", label: "Movement and games", icon: "⚽" },
    ],
  },
  {
    id: 5,
    stepNumber: 5,
    tag: "PLAYING ON A SCREEN",
    question: "How do you feel about games on a screen?",
    subtitle: "Pick the answer that sounds most like you.",
    helperText: "New to tablets or computers? You can learn at your own pace.",
    layout: "grid-3",
    options: [
      { id: "really-enjoy", label: "I really enjoy them", icon: "💻" },
      { id: "enjoy-little", label: "I enjoy them a little", icon: "📱" },
      { id: "prefer-other", label: "I prefer other play", icon: "🪁" },
    ],
  },
  {
    id: 6,
    stepNumber: 6,
    tag: "HOW YOU FEEL",
    question: "How are you feeling right now?",
    subtitle: "Pick the answer that sounds most like you.",
    helperText: "Every feeling is okay. You can pause before the games begin.",
    layout: "grid-4",
    options: [
      { id: "happy", label: "Happy", icon: "happy" },
      { id: "okay", label: "Okay", icon: "okay" },
      { id: "sleepy", label: "Sleepy", icon: "sleepy" },
      { id: "worried", label: "Worried", icon: "worried" },
    ],
  },
];
