import { useEffect, useState } from "react";
export type Scene = "washitsu" | "graveyard" | "torii" | "honden" | "altar";
export type SimState = { scene: Scene; souls: number; safeZone: boolean; hudScale: number; reducedMotion: boolean; visible: boolean };
export const defaultSim: SimState = { scene:"washitsu",souls:0,safeZone:false,hudScale:100,reducedMotion:false,visible:true };
export const sceneNames: Record<Scene,string> = { washitsu:"Washitsu / 和室",graveyard:"Graveyard / 墓地",torii:"Torii Path / 鳥居",honden:"Main Sanctuary / 本殿",altar:"Altar / 祭壇" };
export const sceneObjectives: Record<Scene,string> = { washitsu:"Gather supplies before leaving the room",graveyard:"Collect three wandering spirits",torii:"Approach the torii and present an offering",honden:"Investigate the main sanctuary",altar:"Examine the ritual altar" };
type ScreenName = "menu" | "hud" | "ether" | "journal" | "inventory" | "dialogue" | "pause" | "overview";
export function Simulator({ value, onChange, screen, go }: { value:SimState; onChange:(v:SimState)=>void;screen:ScreenName;go:(s:ScreenName)=>void }) {
 const [open,setOpen]=useState(false);
 const set = (patch:Partial<SimState>)=>onChange({...value,...patch});
 useEffect(()=>{ const key=(e:KeyboardEvent)=>{if(e.key==="F2"){e.preventDefault();setOpen(v=>!v)}};window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key)},[]);
 const screens:ScreenName[]=["menu","hud","ether","journal","inventory","dialogue","pause","overview"];
 return <div className="rot-dev-root">
  <button className="rot-dev-tab" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="rot-dev-panel">SIM <span>F2</span></button>
  {open&&<aside id="rot-dev-panel" className="rot-dev-panel" aria-label="UI simulator controls">
   <div className="rot-dev-head"><div><span>AURORA STUDIO · INTERNAL TOOL</span><h2>UI Simulator <em>v0.1</em></h2></div><button onClick={()=>setOpen(false)} aria-label="Close simulator panel">×</button></div>
   <p className="rot-dev-description">Interactive UX test harness. This panel is not part of the player-facing HUD.</p>
   <label htmlFor="sim-scene">TEST SCENE</label><select id="sim-scene" value={value.scene} onChange={e=>set({scene:e.target.value as Scene})}>{Object.entries(sceneNames).map(([id,name])=><option key={id} value={id}>{name}</option>)}</select>
   <label htmlFor="sim-souls">SPIRIT COLLECTION <output>{value.souls} / 3</output></label>
   <input id="sim-souls" type="range" min="0" max="3" step="1" value={value.souls} onChange={e=>set({souls:Number(e.target.value)})}/>
   <div className="rot-dev-row"><button onClick={()=>set({souls:Math.min(3,value.souls+1)})}>+ Collect spirit</button><button onClick={()=>set({souls:0})}>Reset</button></div>
   <label htmlFor="sim-scale">HUD SCALE <output>{value.hudScale}%</output></label><input id="sim-scale" type="range" min="75" max="125" step="5" value={value.hudScale} onChange={e=>set({hudScale:Number(e.target.value)})}/>
   <label className="rot-dev-check"><input type="checkbox" checked={value.safeZone} onChange={e=>set({safeZone:e.target.checked})}/> Show 5% safe area</label>
   <label className="rot-dev-check"><input type="checkbox" checked={value.reducedMotion} onChange={e=>set({reducedMotion:e.target.checked})}/> Reduce motion</label>
   <label className="rot-dev-check"><input type="checkbox" checked={value.visible} onChange={e=>set({visible:e.target.checked})}/> Show gameplay HUD</label>
   <label>QUICK SCREEN SWITCH</label><div className="rot-dev-screens">{screens.map(s=><button key={s} className={screen===s?"active":""} onClick={()=>go(s)}>{s}</button>)}</div>
   <div className="rot-dev-foot"><button onClick={()=>onChange(defaultSim)}>Restore Defaults</button><span>Saved in this browser</span></div>
  </aside>}
 </div>
}
