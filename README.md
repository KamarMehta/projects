# 🏕️ Punjabi Family Mammoth Caves Adventure - Interactive Web Itinerary

Your complete React web app for planning and sharing the family trip!

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## 📋 Features

- ✅ Interactive daily itineraries (3 days)
- ✅ Real-time comments & notes (stored in browser)
- ✅ Restaurant recommendations (vegetarian-friendly)
- ✅ Shopping guide & grocery lists
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Print-friendly layouts
- ✅ No backend required - works offline

## 📚 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

## 🎉 Ready for Your Adventure!

**July 2-4, 2026** - Mammoth Caves, Kentucky

Made with ❤️ for your Punjabi family getaway!

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# projects
