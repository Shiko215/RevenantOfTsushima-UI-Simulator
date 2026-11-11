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

The existing React/Vite edition remains available and unchanged as the Figma Make project. GitHub Pages is not automatically enabled by adding the HTML file. The repository is currently private, so public Pages access depends on repository visibility and GitHub plan eligibility.
