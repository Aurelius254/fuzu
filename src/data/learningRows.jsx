const learningRows = [
  {
    id: "math-foundations",
    title: "Math Foundations",
    subtitle: "Strengthen your math fundamentals",
    icon: (
      <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
        <path d="M14 42L34 22" stroke="#4260ff" strokeWidth="9" strokeLinecap="round" />
        <circle cx="20" cy="20" r="8" fill="#6b8bff" />
        <rect x="30" y="10" width="18" height="18" rx="4" fill="#2747cc" transform="rotate(45 39 19)" />
        <rect x="28" y="32" width="22" height="12" rx="3" fill="#5b72ff" />
        <rect x="12" y="35" width="16" height="16" rx="4" fill="#3049c7" transform="rotate(45 20 43)" />
      </svg>
    ),
    cards: [
      { id: "arithmetic-thinking", title: "Arithmetic Thinking", tag: "NEW", icon: "🧮", summary: "Build confidence with number patterns, operations, and mental math.", lessons: ["Number sense", "Estimation", "Order of operations"], content: { intro: "Use quick visual patterns to make mental math faster and more reliable.", practice: "You'll compare groups, spot shortcuts, and explain why each move works.", challenge: "Try solving without a calculator and check your reasoning step by step." } },
      { id: "coordinate-plane", title: "Coordinate Plane", icon: "📐", summary: "Plot points, read graphs, and understand how position becomes data.", lessons: ["Coordinates", "Graph reading", "Slope intuition"], content: { intro: "Turn positions into points and points into stories about movement.", practice: "You'll plot coordinates, trace shapes, and connect graphs to real situations.", challenge: "Find how one point changes to another using only the grid." } },
      { id: "proportional-reasoning", title: "Proportional Reasoning", icon: "🎨", summary: "Work with ratios, scale, and relationships that stay in balance.", lessons: ["Ratios", "Scaling", "Unit rates"], content: { intro: "See how quantities stay balanced when one part grows or shrinks.", practice: "You'll compare recipes, map scales, and use tables to keep proportions intact.", challenge: "Detect whether a relationship is proportional from a table or picture." } },
      { id: "visual-algebra", title: "Visual Algebra", icon: "🧱", summary: "Use diagrams and patterns to make algebra feel concrete.", lessons: ["Patterns", "Variables", "Equivalence"], content: { intro: "Use blocks, tables, and diagrams to make variables tangible.", practice: "You'll identify patterns, replace mystery numbers with symbols, and balance both sides.", challenge: "Explain the same expression in two different visual ways." } },
    ],
  },
  {
    id: "algebra-fundamentals",
    title: "Algebra Fundamentals",
    subtitle: "Start developing your algebra toolkit",
    icon: (
      <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
        <rect x="8" y="10" width="18" height="18" rx="4" fill="#6b8bff" transform="rotate(45 17 19)" />
        <rect x="24" y="18" width="18" height="18" rx="4" fill="#2747cc" />
        <rect x="35" y="30" width="18" height="18" rx="4" fill="#5b72ff" transform="rotate(45 44 39)" />
      </svg>
    ),
    cards: [
      { id: "solving-equations", title: "Solving Equations", icon: "⚖️", summary: "Isolate unknowns step by step and keep both sides balanced.", lessons: ["One-step equations", "Multi-step equations", "Checking solutions"], content: { intro: "Treat an equation like a balanced scale and keep both sides equal.", practice: "You'll remove layers, undo operations, and verify each answer.", challenge: "Solve for the variable and prove your answer by substitution." } },
      { id: "linear-equations", title: "Linear Equations", tag: "NEW", icon: "π", summary: "Learn how lines behave and how to write them from different clues.", lessons: ["Slope", "Intercepts", "Graphing lines"], content: { intro: "Turn a pattern into an equation that draws a straight line.", practice: "You'll use slope, intercepts, and points to build line equations.", challenge: "Match different equations to the same line on a graph." } },
      { id: "linear-relationships", title: "Linear Relationships", tag: "NEW", icon: "📈", summary: "Spot patterns between quantities and interpret them with confidence.", lessons: ["Tables", "Proportionality", "Rate of change"], content: { intro: "Read how one quantity changes as another moves at a steady rate.", practice: "You'll study tables, compare change rates, and classify relationships.", challenge: "Explain whether a graph shows a constant rate of change." } },
      { id: "exponents-radicals", title: "Exponents and\nRadicals", tag: "NEW", icon: "🟡", summary: "Handle powers and roots with a visual sense of what they mean.", lessons: ["Powers", "Roots", "Exponent rules"], content: { intro: "Use repeated multiplication and square roots to see how powers work.", practice: "You'll simplify expressions and explore how exponent rules connect.", challenge: "Write the same value as a power, a root, and a product." } },
      { id: "coordinate-geometry", title: "Coordinate\nGeometry", icon: "📊", summary: "Connect shapes and equations using points, distance, and slope.", lessons: ["Distance formula", "Midpoint", "Graph transformations"], content: { intro: "Measure shapes using coordinates instead of just rulers.", practice: "You'll find distances, midpoints, and transform figures on the plane.", challenge: "Use coordinates to prove two shapes are congruent or related." } },
    ],
  },
  {
    id: "intermediate-algebra",
    title: "Intermediate Algebra",
    subtitle: "Master problem solving essentials in algebra",
    icon: (
      <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
        <rect x="6" y="22" width="18" height="18" rx="4" fill="#5b72ff" transform="rotate(45 15 31)" />
        <rect x="26" y="10" width="18" height="18" rx="4" fill="#2747cc" />
        <rect x="35" y="32" width="18" height="18" rx="4" fill="#6b8bff" transform="rotate(45 44 41)" />
      </svg>
    ),
    cards: [
      { id: "intro-to-functions", title: "Introduction to\nFunctions", tag: "NEW", icon: "↗", summary: "Treat inputs and outputs like a machine and read relationships clearly.", lessons: ["Function notation", "Domain and range", "Mappings"], content: { intro: "A function turns each input into exactly one output.", practice: "You'll trace mapping diagrams, evaluate rules, and test whether relations are functions.", challenge: "Sort pairs into function and non-function examples with confidence." } },
      { id: "quadratics", title: "Quadratics", tag: "NEW", icon: "▦", summary: "Explore parabolas, symmetry, and equations that curve.", lessons: ["Factoring", "Vertex form", "Graphs of parabolas"], content: { intro: "See how quadratic expressions create the curved shape of a parabola.", practice: "You'll factor expressions, find vertices, and analyze symmetry.", challenge: "Describe a parabola using both algebra and graph features." } },
      { id: "linear-systems", title: "Linear Systems", tag: "NEW", icon: "🕷️", summary: "Solve multiple equations together and see where they intersect.", lessons: ["Substitution", "Elimination", "Intersection points"], content: { intro: "Find the single point that satisfies more than one equation.", practice: "You'll solve systems with substitution, elimination, and graphing.", challenge: "Decide whether a system has one solution, none, or infinitely many." } },
      { id: "coordinate-transformations", title: "Coordinate\nTransformations", tag: "NEW", icon: "⧉", summary: "Move, reflect, and stretch shapes in the plane.", lessons: ["Translations", "Reflections", "Dilations"], content: { intro: "Move shapes around while keeping track of how coordinates change.", practice: "You'll slide, flip, and scale shapes on the grid.", challenge: "Predict the new location of every point after a transformation." } },
      { id: "exponentials-logarithms", title: "Exponentials and\nLogarithms", tag: "NEW", icon: "◔", summary: "Understand growth, decay, and inverse relationships.", lessons: ["Exponential growth", "Log properties", "Inverse functions"], content: { intro: "Model fast growth and the inverse tool that undoes it.", practice: "You'll compare growth curves, simplify logarithms, and solve inverse problems.", challenge: "Match an exponential expression to its logarithmic inverse." } },
    ],
  },
  {
    id: "advanced-math",
    title: "Advanced Math",
    subtitle: "Take your abilities to the next level",
    icon: (
      <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
        <rect x="8" y="8" width="18" height="18" rx="4" fill="#2747cc" transform="rotate(45 17 17)" />
        <rect x="30" y="10" width="16" height="16" rx="3" fill="#5b72ff" />
        <rect x="24" y="26" width="18" height="18" rx="4" fill="#6b8bff" transform="rotate(45 33 35)" />
      </svg>
    ),
    cards: [
      { id: "trigonometry", title: "Trigonometry", tag: "NEW", icon: "△", summary: "Relate angles and lengths in triangles with confidence.", lessons: ["Sine and cosine", "Unit circle", "Triangle ratios"], content: { intro: "Use triangle relationships to connect angles, sides, and circular motion.", practice: "You'll work with sine, cosine, and tangent across triangles and the unit circle.", challenge: "Find missing sides or angles from different triangle clues." } },
      { id: "statistics", title: "Statistics", tag: "NEW", icon: "◫", summary: "Interpret variation, averages, and probability in data.", lessons: ["Distributions", "Inference", "Probability"], content: { intro: "Make sense of data by describing what is typical and what is unusual.", practice: "You'll compare distributions, calculate averages, and reason about chance.", challenge: "Decide what a graph says about spread, center, and outliers." } },
      { id: "calculus", title: "Calculus", tag: "NEW", icon: "∫", summary: "Track change continuously and understand motion, area, and rates.", lessons: ["Limits", "Derivatives", "Integrals"], content: { intro: "Study what happens when change gets very small and very continuous.", practice: "You'll estimate slopes, areas, and rates of change from graphs.", challenge: "Connect a moving object to the derivative of its position." } },
      { id: "vectors", title: "Vectors", tag: "NEW", icon: "↗", summary: "Work with direction and magnitude in two and three dimensions.", lessons: ["Vector addition", "Components", "Magnitude"], content: { intro: "Use arrows to describe both how far and which way.", practice: "You'll break vectors into parts and add them geometrically.", challenge: "Find the resultant of two vectors from a diagram." } },
      { id: "complex-numbers", title: "Complex Numbers", tag: "NEW", icon: "◉", summary: "Extend the number system and model rotations elegantly.", lessons: ["Imaginary unit", "Polar form", "Complex plane"], content: { intro: "Expand beyond the number line to handle square roots of negative numbers.", practice: "You'll plot numbers on the complex plane and use polar form.", challenge: "Rotate a complex number and describe the result." } },
    ],
  },
];

export default learningRows;
