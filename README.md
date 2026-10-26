# Chairmageddon

A portfolio with image navigation scenes above the archive pages:

- `/`: Phoenix scene
- `/art`: Burning-chair Art room
- `/art/drawing`: Moonlit Owls drawing hub
- `/art/drawing/{folder}`: drawing archives named for the nine folders in `drawings/`
- `/art/animation`: existing Animation Archive
- `/art/painting`, `/art/storyboards`: archive placeholders

The existing research, about, writing, and links routes remain available. The old animation shortcuts `/animation` and `/art/archive` redirect to `/art/animation`.

## Run

```sh
npm install
npm run dev
```

Open the local address printed by Vite. Run `npm run build` for a production build.

## Scene assets and hotspots

- Phoenix background: `public/assets/scenes/phoenix/phoenix-background.png`
- Art room background: `public/assets/scenes/art-room/burning-room-background.png`
- Drawing scene background: `public/assets/scenes/drawing-room/moonlit-owls-background.png`
- Phoenix coordinates and routes: `src/config/scenes/homeScene.ts`
- Art-room coordinates and routes: `src/config/scenes/artScene.ts`
- Drawing coordinates, categories, folder names, and routes: `src/config/scenes/drawingScene.ts`
- Shared renderer and crop/pan logic: `src/components/InteractiveScene.tsx` and `src/utils/sceneGeometry.ts`
- Shared scene styling: `src/styles/interactive-scene.css`

Hotspot `x`, `y`, `width`, and `height` values are percentages of the **source image**. The Phoenix and Drawing hub use `fit: "contain"` so the whole image remains visible and centered; the Art room uses cover and can be panned when cropped. Both fit modes keep links attached to image features as the screen shape changes.

Press **D** on any scene to show hotspot boxes, IDs, labels, coordinates, pointer position, image bounds, and crop offsets. Drag the Art scene to inspect areas cropped on narrow screens; arrow keys pan as well. Keyboard focus brings offscreen hotspots into view.

To add another image hub, make a config matching `InteractiveSceneConfig` in `src/types/scene.ts`, then render `<InteractiveScene config={yourScene} />` from a route.

## Archive pages

The Animation Archive remains in `src/pages/ArtPage.tsx`, styled by `src/styles/art.css`. Its artwork list and order are in `src/config/animationConfig.ts`, following `animations/animation_names.rtfd`. Videos and posters live in `public/assets/animations/`. Painting and Storyboard routes use `src/pages/ArtArchivePlaceholder.tsx` until their collections are ready.

The Drawing hub links to **People, Gesture, Portrait: Study, Ethyl and Braxton, Character, Places: Scenes, Sillustration, Thumbnails, and Dogfight**. Each archive displays every JPG or PNG in its matching `drawings/` folder. `npm run dev` and `npm run build` automatically sync those files into browser-safe paths in `public/assets/drawings/` and create `src/config/drawingManifest.json`; clicking a drawing opens the full image. To add a work to an existing section, place it in that folder and restart the dev server (or run `npm run sync:drawings`). To add a new section, add a hotspot and folder mapping in `src/config/scenes/drawingScene.ts`. The old `/art/drawing/sketch` and `/art/drawing/ideas` links redirect to People and Places: Scenes.

To add an animation, copy an MP4 and a same-basename JPG poster into `public/assets/animations/`, then add its filename and title to `src/config/animationConfig.ts` in the desired order. The gallery shows posters first and loads each video when selected.

## GitHub Pages

The `.github/workflows/deploy.yml` workflow builds and publishes `dist/` on pushes to `main`. In the GitHub repository's **Settings → Pages**, select **GitHub Actions** as the source. Serving `main` from `/ (root)` does not work: the source `index.html` references TypeScript/React files that GitHub Pages cannot build. The workflow sets `SITE_BASE_PATH=/chairmageddon/` so Vite writes the correct asset and router URLs. The build also writes `dist/404.html` so direct archive links can load on Pages.

To check the production build locally at the Pages subpath, run `SITE_BASE_PATH=/chairmageddon/ npm run build` followed by `SITE_BASE_PATH=/chairmageddon/ npm run preview`, then open the printed local URL.

The `.gitignore` excludes `node_modules/`, `dist/`, the generated drawing copies, and raw MP4/MOV files in `animations/`. Commit the original `drawings/` folder and the smaller web videos in `public/assets/animations/`; the build regenerates the drawing copies from the originals.
