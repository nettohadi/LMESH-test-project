# Workload Management Table

A React + TypeScript + Vite app for managing monthly workload data.

## Prerequisites

- **Node.js** 18+ (LTS recommended) — check with `node -v`
- **npm** (comes with Node) — or use `pnpm`/`yarn` if you prefer

## Getting Started

1. **Clone the repository**

```bash
   git clone <repository-url>
   cd <project-folder>
```

2. **Install dependencies**

```bash
   npm install
```

3. **Start the dev server**

```bash
   npm run dev
```

The app runs at `http://localhost:5173`. Vite supports hot module replacement, so changes appear instantly.

## Available Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start the development server with HMR            |
| `npm run build`   | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally to test it    |
| `npm run lint`    | Run ESLint across the project                    |

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui (Radix-based components)
- Sonner (toasts)

## Notes

- If port `5173` is in use, Vite will pick the next available port — check the terminal output for the actual URL.
- Run `npm run build` before deploying to catch type errors; the build fails on TypeScript errors by design.
