# Guess the Number Game

This project shows a simple idea in two forms:

- a small Python script with the core guessing logic
- a polished React + Vite web version that turns the same mechanic into a cleaner public-facing demo

[Live Demo](https://soumyojitsarkar123.github.io/Guess-the-Number-game/)

## Why This Repo Matters

The point of this project is not just the game itself. It is a practical example of how a few lines of Python can become a presentable, modern product experience when the frontend is treated seriously.

## What’s Included

- `Number Gussing Game.py`: the original command-line version
- `web-ui/`: the browser version built with React, TypeScript, and Vite
- responsive UI with clearer game flow and improved visual hierarchy
- live range tracking so each guess narrows the search window
- saved best score using browser local storage
- GitHub Pages-ready frontend setup

## Project Structure

```text
.
|-- Number Gussing Game.py
|-- README.md
`-- web-ui
    |-- src
    |-- public
    |-- package.json
    `-- vite.config.ts
```

## Run The Python Game

```bash
python "Number Gussing Game.py"
```

## Run The Web Version

```bash
cd web-ui
npm install
npm run dev
```

To build the production version:

```bash
cd web-ui
npm run build
```

## Tech Stack

- Python
- React 19
- TypeScript
- Vite
- Vanilla CSS
- GitHub Pages

## Gameplay

1. Enter a number between `1` and `100`
2. Use the high or low hint after each guess
3. Watch the search range tighten as you get closer
4. Try to beat your best score

## Goal Of The Frontend Refresh

The frontend was redesigned to feel more intentional, more readable, and more shareable:

- stronger layout and typography
- better mobile behavior
- more useful feedback after each guess
- a more professional repo presentation for recruiters, collaborators, and visitors

## Author

Created by **Soumyojit Sarkar**
