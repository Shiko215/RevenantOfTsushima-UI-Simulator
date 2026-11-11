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

The standalone `simulator.html` now references the following **user-supplied** game assets (optimized WebP). Put these files in `assets/` in the repository root:

| File | Source / placement |
| --- | --- |
| `assets/rot-logo.webp` | Official Revenant of Tsushima logo; splash and main menu |
| `assets/tomoe.webp` | Tomoe crest; splash emblem and corner |
| `assets/mewa.webp` | Tsushima Mewa key art; main-menu character |
| `assets/seishi.webp` | Tojo Seishi key art; dialogue portrait |
| `assets/rot-shrine.webp` | Supplied torii / shrine screenshot; menu scene |
| `assets/rot-town.webp` | Supplied Japanese town screenshot; alternative scene |

The first screen is a **breathing-light opening**: crest and official logo gently pulse and glow, automatically transition to the title screen after ~4.2 seconds, and can be dismissed with click, Enter, Space or Escape. Lantern light and background illumination continue subtly pulsing on the main menu. Reduced-motion preference is respected.

**Asset upload required:** Because the connected GitHub text-file workflow cannot upload these binary images, the matching optimized asset bundle is provided separately as `rot-ui-v03-assets.zip` in the ChatGPT conversation. Extract it and upload its six `assets/` files to the repository's `assets/` directory (GitHub web UI: Add file → Upload files). Until those six files exist in GitHub, the logo and character art will be missing from the hosted preview. No image files have been uploaded to GitHub by this update.

Once the binary assets are committed, the standalone file can be previewed via GitHub Pages. The existing React/Figma UI still uses its own art references; this change targets the **standalone HTML5 simulator**.
