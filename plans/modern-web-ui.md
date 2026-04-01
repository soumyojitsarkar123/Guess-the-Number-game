# Plan: World-Class Minimalist UI for Number Guessing Game

## Objective
Transform the simple Python logic into a world-class, visually stunning web experience. The goal is to prove that simple logic can power a highly engaging and premium-feeling game.

## Design Philosophy (Full Creativity)
- **Aesthetic:** "Hyper-Minimalist Glassmorphism." Use deep shadows, subtle blurs, and a refined color palette (e.g., Deep Indigo, Vibrant Teal, Soft White).
- **Typography:** Premium sans-serif fonts (e.g., Inter or Montserrat) with generous spacing.
- **Micro-interactions:** 
  - Smooth 3D-like hover effects on the input and buttons.
  - "Shake" animation for incorrect guesses.
  - "Pulsing" background gradients that shift subtly.
- **Win State:** A "heroic" win screen with custom SVG confetti and a sleek "Play Again" transition.

## Key Components
1.  **The Stage:** A centralized, elevated glass card that holds the game logic.
2.  **Visual Indicators:** 
    - A "distance" gauge (color shifts from cool blue to hot red as you get closer).
    - An animated "attempt counter" that pops on each guess.
3.  **Creator Branding:** A sophisticated fixed footer: "Curated & Built by **Soumyojit Sarkar**" with a subtle glow.

## Technical Approach
- **React (TypeScript) + Vite:** For a fast, modern development experience.
- **Vanilla CSS:** To craft every detail of the UI manually, ensuring a unique and premium feel.
- **Logic:** Port the Python `random.randint(1, 100)` logic directly into a React state.

## Implementation Steps
1.  **Visual Foundation:** Set up the global CSS with custom properties for colors, shadows, and animations.
2.  **Game Container:** Build the glassmorphism card with responsive layout.
3.  **Core Interaction:** Implement the input field and "Guess" button with high-quality feedback.
4.  **Win/Loss States:** Design and animate the transitions for victory and feedback.
5.  **Final Polish:** Add the creator credit and ensure mobile responsiveness.
