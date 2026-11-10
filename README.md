# junk-yard

One-off web apps. Cataloged, tagged, searchable, hosted on GitHub Pages.

## Use

```
npm install
npm run dev
npm run build
```

Dev uses port **5175**; `npm run preview` uses **4173**. Both fail if their port is occupied. Reuse an existing Junk Yard server instead of starting on another port.

## Add an app

`junkyard/{app}/index.html`, `main.ts` and `app.json`, then `npm run build`. The build writes `bundle/main.js` and `bundle/main.css` next to the page; commit them, since Pages serves the repo root as-is. Static files go in `assets/`.

## Skills

Shared skills are in [~/git/skills/](../../skills/).

## License

MIT
