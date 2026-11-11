import { Simulator, defaultSim, sceneObjectives, type SimState } from "./Simulator";
import { useEffect, useMemo, useState } from "react";

type Screen =
  | "menu"
  | "hud"
  | "ether"
  | "journal"
  | "inventory"
  | "dialogue"
  | "pause"
  | "overview";

const menuItems = ["New Game", "Continue", "Chapters", "Settings", "Credits", "Exit Game"];
const journalTabs = ["Case Records", "Evidence", "Characters", "Locations", "Folklore", "Progress"];
const pauseItems = [
  "Resume Game",
  "Save / Load",
  "Graphics",
  "Audio",
  "Gameplay",
  "Controls",
  "Accessibility",
  "Language",
  "Return to Main Menu",
];

const items = [
  {
    name: "Foxfire Omamori",
    jp: "狐火守",
    type: "OMAMORI",
    mark: "狐",
    desc: "A shrine charm warm to the touch. Reveals footprints left by spirits for a short time.",
    action: "EQUIP",
  },
  {
    name: "Salt of Sōda",
    jp: "宗太の塩",
    type: "RITUAL",
    mark: "塩",
    desc: "Consecrated sea salt from the western shore. Breaks minor bindings and wards.",
    action: "USE",
  },
  {
    name: "Cracked Kagura Bell",
    jp: "神楽鈴",
    type: "ARTIFACT",
    mark: "鈴",
    desc: "Its broken chime can still be heard in Ether Sight. Tojo believes it belonged to the vanished miko.",
    action: "INSPECT",
  },
  {
    name: "Mildewed Letter",
    jp: "濡れ文",
    type: "EVIDENCE",
    mark: "文",
    desc: "A water-damaged letter bearing the seal of the Itsukushima branch shrine.",
    action: "READ",
  },
  {
    name: "Red Binding Thread",
    jp: "縁糸",
    type: "RITUAL",
    mark: "縁",
    desc: "A ritual cord cut from the offering hall. One end remains impossibly taut.",
    action: "INSPECT",
  },
  {
    name: "Mirror Fragment",
    jp: "鏡片",
    type: "ARTIFACT",
    mark: "鏡",
    desc: "A fragment of sacred mirror. Reflections move a breath later than they should.",
    action: "EQUIP",
  },
];

function Sigil({ small = false }: { small?: boolean }) {
  return (
    <span className={`sigil ${small ? "sigil-small" : ""}`} aria-hidden="true">
      魂
    </span>
  );
}

function KeyHint({ keyName, children }: { keyName: string; children: React.ReactNode }) {
  return (
    <span className="key-hint">
      <b>{keyName}</b>
      {children}
    </span>
  );
}

function CornerFrame() {
  return (
    <div className="corner-frame" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

function World({ ether = false }: { ether?: boolean }) {
  return (
    <div className={`world ${ether ? "world-ether" : ""}`} aria-hidden="true">
      <div className="world-image" />
      <div className="world-wash" />
      <div className="fog fog-a" />
      <div className="fog fog-b" />
      <div className="particles">
        {Array.from({ length: 20 }, (_, i) => (
          <i key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      {ether && (
        <>
          <div className="ether-ring" />
          <div className="trace trace-a">残</div>
          <div className="trace trace-b">念</div>
        </>
      )}
    </div>
  );
}

function ScreenHeader({
  section,
  title,
  onBack,
}: {
  section: string;
  title: string;
  onBack: () => void;
}) {
  return (
    <header className="screen-header">
      <div className="brand-mini">
        <Sigil small />
        <span>
          REVENANT <em>OF</em> TSUSHIMA
        </span>
      </div>
      <div className="section-title">
        <span>{section}</span>
        <h1>{title}</h1>
      </div>
      <button className="text-button" onClick={onBack}>
        <span>ESC</span> Return
      </button>
    </header>
  );
}

function MainMenu({ go }: { go: (s: Screen) => void }) {
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("");

  const activate = (item: string) => {
    if (item === "New Game" || item === "Continue") go("hud");
    else if (item === "Chapters") go("journal");
    else if (item === "Settings") go("pause");
    else if (item === "Credits") go("overview");
    else {
      setMessage("The mist will not release you yet.");
      window.setTimeout(() => setMessage(""), 2600);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") setSelected((v) => (v + 1) % menuItems.length);
      if (e.key === "ArrowUp") setSelected((v) => (v - 1 + menuItems.length) % menuItems.length);
      if (e.key === "Enter") activate(menuItems[selected]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <main className="screen menu-screen">
      <div className="menu-scene" aria-hidden="true">
        <div className="menu-environment" />
        <div className="menu-depth-light" />
        <div className="menu-stone-lanterns" />
        <div className="mewa-portrait" />
        <div className="mewa-rim" />
        <div className="menu-ground-fog menu-ground-fog-a" />
        <div className="menu-ground-fog menu-ground-fog-b" />
        <div className="menu-embers">
          {Array.from({ length: 16 }, (_, i) => (
            <i key={i} style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
      </div>
      <div className="menu-grain" />
      <div className="menu-content">
        <div className="title-lockup">
          <span className="studio-presents">AURORA STUDIO PRESENTS</span>
          <div className="title-jp">
            津島<span>・</span>魂鬼
          </div>
          <h1>
            REVENANT <i>OF</i> TSUSHIMA
          </h1>
          <p>What the sea takes, the island remembers.</p>
        </div>
        <nav className="main-nav" aria-label="Main menu">
          {menuItems.map((item, i) => (
            <button
              key={item}
              className={selected === i ? "selected" : ""}
              onMouseEnter={() => setSelected(i)}
              onClick={() => activate(item)}
            >
              <span>{item}</span>
              <i aria-hidden="true">{selected === i ? "魂" : ""}</i>
            </button>
          ))}
        </nav>
      </div>
      <div className="menu-inputs">
        <KeyHint keyName="↑↓">Navigate</KeyHint>
        <KeyHint keyName="ENTER">Confirm</KeyHint>
      </div>
      {message && <div className="toast">{message}</div>}
    </main>
  );
}

function HUD({ go, ether = false, sim, updateSim }: { go: (s: Screen) => void; ether?: boolean; sim: SimState; updateSim:(v:SimState)=>void }) {
  const [notice, setNotice] = useState(true);
  return (
    <main className={`screen hud-screen ${ether ? "ether-screen" : ""}`}>
      <World ether={ether} />
      <CornerFrame />
      <div className={"hud-top "+(!sim.visible?"sim-invisible":"")} style={{transform:"scale("+(sim.hudScale/100)+")",transformOrigin:"top left"}}>
        <div className="objective">
          <span>{ether ? "ETHER RESONANCE" : "CURRENT OBJECTIVE"}</span>
          <h2>{ether ? "Follow the severed memory" : sceneObjectives[sim.scene]}</h2>
          <p>{ether ? "A spiritual trace is moving beyond the torii." : "DEMO INVESTIGATION · "+sim.souls+"/3 SPIRITS"}</p>
        </div>
        <div className={`spirit-meter ${ether ? "active" : ""}`}>
          <Sigil small />
          <div>
            <span>SPIRIT</span>
            <i>
              <b />
            </i>
          </div>
          <em>{ether ? "87" : "62"}</em>
        </div>
      </div>

      {ether ? (
        <>
          <div className="ether-title">
            <span>境 界 感 知</span>
            <h1>ETHER SIGHT</h1>
            <p>The dead leave impressions where memory fractures.</p>
          </div>
          <button className="trace-point" onClick={() => setNotice(!notice)}>
            <i />
            <span>
              Residual Memory<small>18 m · Unstable</small>
            </span>
          </button>
        </>
      ) : (
        <button className={"interaction "+(!sim.visible?"sim-invisible":"")} onClick={() => updateSim({...sim,souls:Math.min(3,sim.souls+1)})}>
          <span className="interact-ring">E</span>
          <div>
            <small>INVESTIGATE</small>
            <b>{sim.souls===3?"Spirit collection completed":sim.scene==="graveyard"?"Collect wandering spirit":"Investigate the shrine relic"}</b>
          </div>
        </button>
      )}

      {notice && (
        <div className="item-notice" onClick={() => setNotice(false)}>
          <span>ITEM DISCOVERED</span>
          <b>{ether ? "Residual Thought" : "Mildewed Letter"}</b>
          <small>{ether ? "記憶の残滓" : "濡れ文"} · Added to Evidence</small>
        </div>
      )}

      <div className={"hud-bottom "+(!sim.visible?"sim-invisible":"")} style={{transform:"scale("+(sim.hudScale/100)+")",transformOrigin:"bottom left"}}>
        <div className="quick-nav">
          <button onClick={() => go(ether ? "hud" : "ether")}>
            <b>Q</b>
            {ether ? "Close Ether Sight" : "Ether Sight"}
          </button>
          <button onClick={() => go("journal")}>
            <b>J</b>Journal
          </button>
          <button onClick={() => go("inventory")}>
            <b>I</b>Omamori
          </button>
          <button onClick={() => go("dialogue")}>
            <b>D</b>Dialogue
          </button>
          <button onClick={() => go("pause")}>
            <b>ESC</b>Pause
          </button>
        </div>
        <div className="chapter-mark">
          二 <span>THE DROWNED BELL</span>
        </div>
      </div>
    </main>
  );
}

function Journal({ go }: { go: (s: Screen) => void }) {
  const [tab, setTab] = useState(0);
  const records = [
    "The Drowned Bell",
    "The Woman at Sōda Cape",
    "Footprints Without a Pilgrim",
    "Seishi’s Missing Hour",
  ];
  return (
    <main className="screen manuscript-screen">
      <div className="washi-bg" />
      <ScreenHeader section="INVESTIGATION JOURNAL" title="調査記録" onBack={() => go("hud")} />
      <div className="journal-tabs">
        {journalTabs.map((t, i) => (
          <button key={t} className={tab === i ? "active" : ""} onClick={() => setTab(i)}>
            <span>0{i + 1}</span>
            {t}
          </button>
        ))}
      </div>
      <div className="journal-layout">
        <aside className="record-list">
          <span className="vertical-label">未解決事件</span>
          <p className="eyebrow">OPEN RECORDS · 04</p>
          {records.map((r, i) => (
            <button key={r} className={i === 0 ? "active" : ""}>
              <span>0{i + 1}</span>
              <b>{r}</b>
              <small>{i === 0 ? "ACTIVE INVESTIGATION" : i === 3 ? "LOCKED" : "UNRESOLVED"}</small>
            </button>
          ))}
        </aside>
        <section className="case-page">
          <div className="case-heading">
            <div>
              <span>CASE 02 · ACTIVE</span>
              <h2>The Drowned Bell</h2>
              <p>水没した鈴</p>
            </div>
            <div className="seal">
              調<br />査
            </div>
          </div>
          <div className="case-art">
            <div className="bell-glyph">鈴</div>
            <div className="ink-circle" />
            <span>Recovered below the offering hall</span>
          </div>
          <div className="case-copy">
            <p>
              At 02:13, the shrine bell rang from beneath the flooded foundations. No rope remains
              attached. Saltwater footprints lead inland, against the tide.
            </p>
            <blockquote>
              “The bell does not call the living. It tells the drowned that the road home is open.”
              <cite>— Tojo Seishi</cite>
            </blockquote>
          </div>
        </section>
        <aside className="clue-chain">
          <p className="eyebrow">CLUE CHAIN · 68%</p>
          {[
            "Broken shimenawa",
            "Saltwater footprints",
            "Kagura bell",
            "Missing shrine register",
          ].map((x, i) => (
            <div key={x} className={i < 3 ? "found" : ""}>
              <i>{i < 3 ? "✓" : "?"}</i>
              <span>
                {x}
                <small>{i < 3 ? "CONNECTED" : "UNDISCOVERED"}</small>
              </span>
            </div>
          ))}
          <div className="progress-ring">
            <b>68</b>
            <span>
              CASE
              <br />
              PROGRESS
            </span>
          </div>
        </aside>
      </div>
      <FooterHints />
    </main>
  );
}

function Inventory({ go }: { go: (s: Screen) => void }) {
  const [selected, setSelected] = useState(0);
  const [equipped, setEquipped] = useState<number[]>([0]);
  const item = items[selected];
  const toggle = () =>
    setEquipped((v) => (v.includes(selected) ? v.filter((x) => x !== selected) : [...v, selected]));
  return (
    <main className="screen inventory-screen">
      <div className="inventory-bg" />
      <ScreenHeader section="INVENTORY & OMAMORI" title="所持品" onBack={() => go("hud")} />
      <div className="inventory-layout">
        <aside className="loadout">
          <p className="eyebrow">BOUND OMAMORI · 1/3</p>
          {[0, 1, 2].map((n) => (
            <button key={n} className={equipped.includes(n) ? "filled" : ""}>
              <span>{n + 1}</span>
              <b>{equipped.includes(n) ? items[n].mark : "空"}</b>
              <small>{equipped.includes(n) ? items[n].name : "Empty binding"}</small>
            </button>
          ))}
          <div className="spirit-capacity">
            <span>SPIRIT LOAD</span>
            <i>
              <b />
            </i>
            <em>42 / 100</em>
          </div>
        </aside>
        <section className="item-grid-wrap">
          <div className="item-filters">
            <button className="active">ALL · 12</button>
            <button>OMAMORI · 3</button>
            <button>RITUAL · 4</button>
            <button>EVIDENCE · 5</button>
          </div>
          <div className="item-grid">
            {items.map((x, i) => (
              <button
                key={x.name}
                onClick={() => setSelected(i)}
                className={selected === i ? "active" : ""}
              >
                <span className="item-mark">{x.mark}</span>
                <small>{x.type}</small>
                <b>{x.name}</b>
                {equipped.includes(i) && <em>E</em>}
              </button>
            ))}
          </div>
        </section>
        <aside className="item-detail">
          <p className="eyebrow">{item.type} · RARE</p>
          <div className="large-mark">
            {item.mark}
            <i />
          </div>
          <span className="jp-name">{item.jp}</span>
          <h2>{item.name}</h2>
          <p>{item.desc}</p>
          <div className="effect">
            <span>RITUAL EFFECT</span>
            <b>Spiritual traces remain visible 40% longer.</b>
          </div>
          <button className="action-button" onClick={toggle}>
            {equipped.includes(selected) ? "UNBIND" : item.action}
            <span>↵</span>
          </button>
        </aside>
      </div>
      <FooterHints />
    </main>
  );
}

function Dialogue({ go }: { go: (s: Screen) => void }) {
  const [choice, setChoice] = useState(0);
  const [line, setLine] = useState(0);
  const choices = [
    "What happened beneath the shrine?",
    "You knew my mother.",
    "End the conversation.",
  ];
  return (
    <main className="screen dialogue-screen">
      <World />
      <div className="dialogue-vignette" />
      <div className="speaker-card left">
        <span>津島 真羽</span>
        <b>TSUSHIMA MEWA</b>
        <small>FIELD INVESTIGATOR</small>
      </div>
      <div className="speaker-card right">
        <span>東條 誠士</span>
        <b>TOJO SEISHI</b>
        <small>SHRINE ARCHIVIST</small>
      </div>
      <div className="dialogue-box">
        <div className="speaker-name">
          {line === 0 ? "TOJO SEISHI" : "TSUSHIMA MEWA"}{" "}
          <span>{line === 0 ? "東條 誠士" : "津島 真羽"}</span>
        </div>
        <p>
          {line === 0
            ? "Your mother heard that bell too, Mewa. Three nights before the sea took everyone in the lower village."
            : "Then you knew this would happen. Why bring me back to Tsushima?"}
        </p>
        <div className="dialogue-choices">
          {choices.map((x, i) => (
            <button
              key={x}
              className={choice === i ? "active" : ""}
              onMouseEnter={() => setChoice(i)}
              onClick={() => (i === 2 ? go("hud") : setLine(1))}
            >
              <span>0{i + 1}</span>
              {x}
              <i>{choice === i ? "選" : ""}</i>
            </button>
          ))}
        </div>
      </div>
      <div className="input-strip">
        <KeyHint keyName="↑↓">Select response</KeyHint>
        <KeyHint keyName="ENTER">Speak</KeyHint>
        <KeyHint keyName="ESC">Leave</KeyHint>
      </div>
    </main>
  );
}

function Toggle({ initial = true }: { initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button className={`toggle ${on ? "on" : ""}`} onClick={() => setOn(!on)} aria-pressed={on}>
      <i />
      {on ? "ON" : "OFF"}
    </button>
  );
}

function Slider({ initial }: { initial: number }) {
  const [value, setValue] = useState(initial);
  return (
    <label className="slider">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(+e.target.value)}
      />
      <b>{value}</b>
    </label>
  );
}

function Pause({ go }: { go: (s: Screen) => void }) {
  const [selected, setSelected] = useState(2);
  const setting = pauseItems[selected];
  const isSetting = selected >= 2 && selected <= 7;
  return (
    <main className="screen pause-screen">
      <World />
      <div className="pause-shade" />
      <CornerFrame />
      <header className="pause-title">
        <Sigil />
        <div>
          <span>GAME PAUSED</span>
          <h1>静止</h1>
        </div>
      </header>
      <div className="pause-layout">
        <nav>
          {pauseItems.map((x, i) => (
            <button
              key={x}
              className={selected === i ? "active" : ""}
              onMouseEnter={() => setSelected(i)}
              onClick={() =>
                x === "Resume Game"
                  ? go("hud")
                  : x === "Return to Main Menu"
                    ? go("menu")
                    : setSelected(i)
              }
            >
              <span>0{i + 1}</span>
              {x}
              <i>{selected === i ? "—" : ""}</i>
            </button>
          ))}
        </nav>
        <section className="settings-panel">
          <div className="settings-heading">
            <span>{isSetting ? "SYSTEM CONFIGURATION" : "GAME SYSTEM"}</span>
            <h2>{setting}</h2>
            <p>
              {setting === "Graphics"
                ? "映像設定"
                : setting === "Audio"
                  ? "音響設定"
                  : "操作と環境"}
            </p>
          </div>
          <div className="setting-row">
            <span>
              Display Mode<small>Borderless fullscreen</small>
            </span>
            <button className="select-value">
              BORDERLESS <b>‹ ›</b>
            </button>
          </div>
          <div className="setting-row">
            <span>
              Brightness<small>Adjust until the seal is barely visible</small>
            </span>
            <Slider initial={54} />
          </div>
          <div className="setting-row">
            <span>
              Film Grain<small>Cinematic image texture</small>
            </span>
            <Slider initial={28} />
          </div>
          <div className="setting-row">
            <span>
              Motion Blur<small>Camera and object movement</small>
            </span>
            <Toggle />
          </div>
          <div className="setting-row">
            <span>
              High Contrast Prompts<small>Improves interaction legibility</small>
            </span>
            <Toggle initial={false} />
          </div>
          <button className="restore">RESTORE DEFAULTS</button>
        </section>
      </div>
      <div className="input-strip">
        <KeyHint keyName="↑↓">Navigate</KeyHint>
        <KeyHint keyName="ENTER">Select</KeyHint>
        <KeyHint keyName="ESC">Resume</KeyHint>
      </div>
    </main>
  );
}

function Overview({ go }: { go: (s: Screen) => void }) {
  const screens: { name: string; jp: string; target: Screen }[] = [
    { name: "Main Menu", jp: "主選單", target: "menu" },
    { name: "Exploration HUD", jp: "探索", target: "hud" },
    { name: "Ether Sight", jp: "境界感知", target: "ether" },
    { name: "Journal", jp: "調査記録", target: "journal" },
    { name: "Inventory", jp: "所持品", target: "inventory" },
    { name: "Dialogue", jp: "会話", target: "dialogue" },
    { name: "Pause & Settings", jp: "静止", target: "pause" },
  ];
  return (
    <main className="screen overview-screen">
      <div className="washi-bg dark" />
      <ScreenHeader section="VISUAL SYSTEM OVERVIEW" title="意匠体系" onBack={() => go("menu")} />
      <div className="overview-grid">
        <section className="principle">
          <p className="eyebrow">01 · CREATIVE PRINCIPLE</p>
          <h2>
            Cinematic Japanese
            <br />
            <i>Occult Minimalism</i>
          </h2>
          <p>
            World-first interfaces that feel touched by ritual: quiet geometry, purposeful
            vermilion, aged materials, and movement that breathes rather than performs.
          </p>
          <div className="type-sample">
            <span>MINCHO DISPLAY / 48</span>
            <b>津島・魂鬼</b>
            <em>Revenant of Tsushima</em>
          </div>
        </section>
        <section className="tokens">
          <p className="eyebrow">02 · RITUAL PALETTE</p>
          <div className="swatches">
            {[
              ["#101312", "OBSIDIAN"],
              ["#E8DFCC", "WASHI"],
              ["#9D3029", "VERMILION"],
              ["#AE956A", "ANTIQUE GOLD"],
              ["#71877F", "SPIRIT JADE"],
              ["#777873", "ASH"],
            ].map(([hex, name]) => (
              <div key={hex} style={{ "--swatch": hex } as React.CSSProperties}>
                <i />
                <b>{name}</b>
                <span>{hex}</span>
              </div>
            ))}
          </div>
          <p className="eyebrow spacing-title">03 · INTERACTION STATES</p>
          <div className="states">
            <button>RESTING</button>
            <button className="hover">FOCUSED</button>
            <button className="pressed">SELECTED</button>
            <Toggle />
          </div>
        </section>
        <section className="screen-map">
          <p className="eyebrow">04 · PROTOTYPE FLOW</p>
          <div>
            {screens.map((x, i) => (
              <button key={x.name} onClick={() => go(x.target)}>
                <span>0{i + 1}</span>
                <b>{x.name}</b>
                <small>{x.jp}</small>
                <i>↗</i>
              </button>
            ))}
          </div>
          <p className="localization">
            LOCALIZATION READY <b>EN</b>
            <b>日本語</b>
            <b>繁中</b>
            <b>简中</b>
            <b>한국어</b>
          </p>
        </section>
      </div>
    </main>
  );
}

function FooterHints() {
  return (
    <div className="manuscript-footer">
      <KeyHint keyName="L1 / R1">Change section</KeyHint>
      <KeyHint keyName="A">Select</KeyHint>
      <KeyHint keyName="B">Return</KeyHint>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [sim,setSim] = useState<SimState>(()=>{try {return {...defaultSim,...JSON.parse(localStorage.getItem("rot-simulator")||"{}")}} catch{return defaultSim}});
  useEffect(()=>{localStorage.setItem("rot-simulator",JSON.stringify(sim))},[sim]);
  const go = (s: Screen) => setScreen(s);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (screen === "menu") return;
      if (e.key.toLowerCase() === "j") go("journal");
      else if (e.key.toLowerCase() === "i") go("inventory");
      else if (e.key.toLowerCase() === "q") go(screen === "ether" ? "hud" : "ether");
      else if (e.key.toLowerCase() === "d") go("dialogue");
      else if (e.key === "Escape") {
        if (screen === "overview") go("menu");
        else if (["pause", "journal", "inventory", "dialogue"].includes(screen)) go("hud");
        else go("pause");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen]);

  const current = useMemo(() => {
    if (screen === "menu") return <MainMenu go={go} />;
    if (screen === "hud") return <HUD go={go} sim={sim} updateSim={setSim} />;
    if (screen === "ether") return <HUD go={go} ether sim={sim} updateSim={setSim} />;
    if (screen === "journal") return <Journal go={go} />;
    if (screen === "inventory") return <Inventory go={go} />;
    if (screen === "dialogue") return <Dialogue go={go} />;
    if (screen === "pause") return <Pause go={go} />;
    return <Overview go={go} />;
  }, [screen,sim]);

  return (
    <div className={"app-shell "+(sim.reducedMotion?"sim-reduced":"")} data-screen={screen} data-scene={sim.scene}>
      {current}
      {sim.safeZone && <div className="sim-safe-area" aria-hidden="true" />}
      <Simulator value={sim} onChange={setSim} screen={screen} go={go} />
    </div>
  );
}
