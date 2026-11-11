# Revenant of Tsushima | UI Simulator

Interactive browser-based game UI/UX test harness for **津島・魂鬼 (Revenant of Tsushima)** by Aurora Studio.

> Prototype only: not a playable game, not a shipped Unreal Engine UI implementation, and not a substitute for UE5 UMG / Common UI integration.

## Run locally

Requires Node.js and pnpm.

```bash
pnpm install
pnpm dev
```

Open the local Vite URL printed by the terminal.

## Build

```bash
pnpm build
pnpm preview
```

## Simulator v0.1

The imported Figma Make experience provides an interactive main menu, first-person exploration HUD, Ether Sight, journal, inventory, dialogue, pause/settings, and a design overview.

Open the **SIM** tab or press **F2** for the developer-facing test harness:

- Switch between five mock progression scenes: washitsu, graveyard, torii, honden, altar.
- Change wandering spirit collection progress from 0/3 to 3/3.
- Collect a spirit using the on-screen HUD interaction.
- Jump directly to any of the eight UI previews.
- Show a 5% screen safe area.
- Scale gameplay HUD from 75% to 125%.
- Toggle reduced-motion mode.
- Temporarily hide gameplay HUD.
- Save developer settings locally in the current browser.

### Keyboard

| Key | Action |
| --- | --- |
| F2 | Toggle simulator panel |
| J | Journal |
| I | Inventory |
| Q | Ether Sight on/off via screen navigation |
| D | Dialogue |
| Escape | Pause / Return |
| Arrow Up/Down, Enter | Navigate main menu |

## Art and production notes

Current backgrounds and character photography from the initial Figma Make export are placeholders. **They are not approved Tsushima Mewa key art or screenshots from the Unreal Engine build.** Replace them with properly licensed game renders before external distribution.

The simulator's narrative text and item descriptions are also concept placeholders, not canon-approved script. Reference the actual demo script and UE5 build before production integration.

### Architecture

- `src/App.tsx`: original Figma Make screen components and UI route state.
- `src/Simulator.tsx`: simulator parameters and developer controls.
- `src/index.css`: original visual language and simulator overlay styles.

The browser simulator is intended for design approval, usability experiments, safe area checks and UX handoff. Actual production UIs should be rebuilt or ported as Unreal Engine 5 UMG/Common UI widgets.

## License

No license is granted by this repository unless the repository owner adds one.

© Aurora Studio.

## Standalone HTML5 edition (no build needed)

A separate, single-file simulator is available at **[simulator.html](./simulator.html)**. Download this file and open it directly in a modern web browser. No package manager, web server, or React build is needed. Fonts may use an internet connection; all simulator JavaScript, CSS, and placeholder scenery are embedded in the HTML file.

Press **F2** or select **SIMULATOR** to open the debug panel. Use **J** for journal, **I** for inventory, **Q** for Ether Sight, **D** for dialogue, and **Esc** to pause or go back. In the simulator panel you can change demo scenes, collected spirits, HUD scale, accessibility and safe area options.

The existing React/Vite edition remains available and unchanged as the Figma Make project. GitHub Pages is not automatically enabled by adding the HTML file. The repository is public as currently reported by GitHub. You can enable GitHub Pages in Settings → Pages and choose Deploy from a branch (main, /root) to host simulator.html.


## v0.3 Official art and breathing light (HTML5)

The standalone `simulator.html` now references the following **user-supplied** game assets (optimized WebP). The user has uploaded these files directly into the repository root; `simulator.html` now resolves them there:

| File | Source / placement |
| --- | --- |
| `rot-logo.webp` | Official Revenant of Tsushima logo; splash and main menu |
| `tomoe.webp` | Tomoe crest; splash emblem and corner |
| `mewa.webp` | Tsushima Mewa key art; main-menu character |
| `seishi.webp` | Tojo Seishi key art; dialogue portrait |
| `rot-shrine.webp` | Supplied torii / shrine screenshot; menu scene |
| `rot-town.webp` | Supplied Japanese town screenshot; alternative scene |

The first screen is a **breathing-light opening**: crest and official logo gently pulse and glow, automatically transition to the title screen after ~4.2 seconds, and can be dismissed with click, Enter, Space or Escape. Lantern light and background illumination continue subtly pulsing on the main menu. Reduced-motion preference is respected.

****Assets uploaded and linked:** All six WebP files are present in the repository root. Commit `025557b` updates the HTML file to use the correct relative image paths.

Once the binary assets are committed, the standalone file can be previewed via GitHub Pages. The existing React/Figma UI still uses its own art references; this change targets the **standalone HTML5 simulator**.


## v0.4 Gameplay preview asset paths (verified)

The official WebP files are now in the repository's `public/` folder. The standalone `simulator.html` has been updated to reference `public/mewa.webp`, `public/seishi.webp`, `public/rot-logo.webp`, `public/tomoe.webp`, `public/rot-shrine.webp`, `public/rot-town.webp` and `public/gameplay-washitsu.webp`. On the **Washitsu** gameplay test scene, the simulator uses the uploaded UE5 candlelit interior screenshot instead of the placeholder streetscape.

Do not move these files back to the root directory merely for the standalone page. The GitHub Pages path and the Vite project's asset handling are different; keep relative paths correct for each deployment route. The standalone HTML has been updated for the current repository layout.


## v1.2: Audio soundtrack and full game settings

The HTML5 simulator uses the two MP3 files uploaded under `public/`:
- `Revenant of Tsushima_Loading_V0-128kbps.mp3` for the opening splash (when playback starts with a user gesture)
- `Revenant of Tsushima_Menu_V1_1006-128kbps.mp3` for the main menu, settings, and pause screens

Browsers generally block unprompted audio autoplay. Click/tap or press Enter/Space/Escape at the splash to activate sound. When the timed intro finishes without interaction, the soundtrack begins after the user's first click. The on-screen **MUSIC** button can also activate audio.

Seven settings groups are available: **Audio, Display, Graphics, Gameplay, Controls, Accessibility, Language**, with 41 controls. Music and master audio sliders affect actual MP3 playback; UI scale, brightness, contrast, safe-area display and reduced-motion settings affect the HTML preview. Browser fullscreen is functional where supported. Settings are stored in localStorage.

**Important:** Graphics settings such as Lumen, shadows, textures, FPS, camera FOV, autosave and gamepad vibration are UI/UX simulation parameters for future UE5 UMG implementation; they do not alter a static browser screenshot or modify the Unreal project. Sound effects and voice channel volumes are prepared as UI simulation settings; no SFX or dialogue recordings are attached yet.

The existing approved main-menu character layout and F3 visual editor remain available.

## v1.3: 25-second Tomoe loading screen

The HTML5 Simulator displays a **25-second simulated loading screen** when choosing New Game / Continue. Initial launch uses a separate 4.2-second logo splash. The official `public/tomoe.webp` crest rotates continuously in the center with a 0–100% time-based progress indicator, logo, atmospheric shrine background and uploaded Loading BGM. At 25 seconds, the splash transitions automatically to the main menu or gameplay and menu music begins where appropriate.

This is an intentional UX timing demonstration, **not genuine asset-loading progress**. Clicking or pressing Enter while loading can unlock audio playback under browser autoplay policies, but does not skip the 25-second sequence. Reduced-motion preference slows the spinner. The loading delay is defined by `LOAD_DURATION=25000` in `simulator.html`.

## v1.3.1: Separate startup splash and gameplay loading

Initial page launch shows the original **4.2-second animated logo splash** (official logo and gently breathing Tomoe crest), without the 25-second progress bar. It automatically enters the Main Menu. The **25-second rotating Tomoe loading screen** with simulated progress and Loading BGM is shown only when selecting **New Game** or **Continue**. Menu BGM begins once the menu is entered, subject to browser autoplay policies. The loading progress is simulated, not actual UE5 asset loading.

## v1.4 Settings localization

All **seven settings categories** and **41 setting labels/descriptions** now follow the active interface language: English, 日本語, or 繁體中文. Option display names are localized while the underlying stored values remain stable. Switching language in Settings or via the top navigation redraws the settings screen immediately. Restoring defaults preserves the selected interface language. This updates the standalone `simulator.html` only; the React/Figma version is a separate implementation.
