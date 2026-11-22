# Purane Naghme

A simple website for listening to nostalgic music, built with Next.js.

**Live demo:** [add your link here once the site is deployed]

<!-- Add a screenshot: save it as screenshot.png in the project and uncomment the line below -->
<!-- ![Purane Naghme screenshot](screenshot.png) -->

## Features

- Music player for nostalgic songs
- Live clock
- Listener count display
- Social links
- Responsive layout

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- TypeScript
- CSS

## Getting Started

### What you need

- [Node.js](https://nodejs.org/) version 20 or newer
- [Git](https://git-scm.com/)

### Run it on your computer

1. Download the project:

   ```bash
   git clone https://github.com/xtwali/purane-naghme.git
   cd purane-naghme
   ```

2. Install the packages:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the site in development mode |
| `npm run build` | Creates the production build |
| `npm start` | Runs the production build (run `npm run build` first) |

## Project Structure

```
purane-naghme/
├── app/
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Page layout
│   └── page.tsx        # Home page
├── components/
│   ├── Clock.tsx
│   ├── ListenerCount.tsx
│   ├── Player.tsx
│   └── SocialLinks.tsx
├── lib/
│   └── songs.ts        # Song list
├── next.config.ts
└── package.json
```

## Customize

- **Songs:** edit the song list in `lib/songs.ts`.
- **Social links:** edit `components/SocialLinks.tsx`.
- **Colors and fonts:** edit `app/globals.css`.

## Deploy

The easiest way is [Vercel](https://vercel.com/):

1. Push this project to GitHub.
2. Sign in to Vercel with your GitHub account and click **Add New → Project**.
3. Select the `purane-naghme` repository and click **Deploy**.

## Disclaimer

The songs and music belong to their respective owners. This project is made for personal and educational use only, and no copyright is claimed on any music. If you are an owner and want a song removed, please open an issue.

## License

The code in this project is released under the license in the [LICENSE](LICENSE) file. The license covers the code only, not the music.

## Author

Made by Ali Khan ([@xtwali](https://github.com/xtwali)).
