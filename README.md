# Pooja Gautam — portfolio website

A personal portfolio built with **React**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **shadcn/ui** and **Motion** (animations).

A clean, professional design: white and navy with one blue accent, the Plus Jakarta Sans font, real technology logos, light and dark mode, and subtle animations.

## Run it on your computer

You need **Node.js 20.19 or newer**. If you are not sure, install the latest LTS version from https://nodejs.org.

**Easiest:** double-click `start.bat` in this folder. It installs or updates the packages, then starts the site and opens it in your browser.

**Or** open a terminal in this folder (`D:\pooja\Portfolio`) and run:

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173). The page reloads by itself whenever you save a file.

## Make it yours

Almost everything you'll want to change is in **one file**: `src/data/portfolio.ts`.

| What | Where |
| --- | --- |
| Name, title, intro, current company, email, social links | `profile` in `src/data/portfolio.ts` |
| About text and quick facts | `about` |
| Skills (Frontend, Backend, Database, Cloud & DevOps) | `skills` — known names show their logo automatically |
| The two full stacks (.NET and Node.js) | `fullStacks` |
| Projects and case studies | `projects` |
| Jobs | `experience` (newest first; add years, titles and what you did) |
| Your CV | Replace `public/resume.pdf` with your own file |
| Your photo | Put it in `public/` (for example `public/pooja.jpg`) and set `photo: "/pooja.jpg"` |
| Colours | The CSS variables at the top of `src/index.css` |
| Page title and description (for Google and link previews) | `index.html` |

> The **projects** that ship with the site are **sample content**. Replace them with your own before you publish.

## Project structure

```
src/
  data/portfolio.ts        ← all the text and links
  assets/tech/             ← technology logos (from Devicon, MIT licence)
  components/
    sections/              ← Hero, About, Skills, Experience, Projects, Contact
    ui/                    ← shadcn/ui components (Button, Dialog, Sheet, …)
    tech-icon.tsx          ← maps a skill name to its logo
    site-header.tsx        ← navigation, dark mode toggle, mobile menu
    site-footer.tsx
  index.css                ← colours, font and theme
```

## Add more shadcn/ui components

`components.json` is already set up, so you can add any component from https://ui.shadcn.com:

```bash
npx shadcn@latest add accordion
```

## Publish it

```bash
npm run build
```

This creates a `dist` folder you can upload to any static host. The easiest free options:

- **Vercel** or **Netlify**: push this folder to a GitHub repository, then import it. Build command `npm run build`, output folder `dist`.
- **GitHub Pages**: upload the contents of `dist`.

## About the contact form

The site has no server, so **Send message** opens the visitor's email app with their message already filled in, addressed to your email. If you'd rather receive messages directly, you can connect the form to a service such as Formspree or Web3Forms later.
