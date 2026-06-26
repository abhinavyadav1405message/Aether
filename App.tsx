// @ts-nocheck
import { useState, useRef, useEffect, createContext, useContext } from "react";

// ── AETHER BRAND TOKENS ───────────────────────────────────────────────────────
const A = {
  cyan:        "#00E5FF",
  blue:        "#4A7BFF",
  purple:      "#B14DFF",
  dark1:       "#0D1117",
  dark2:       "#1A1F2B",
  surface:     "#12171f",
  surfaceHi:   "#1a2030",
  surfaceHov:  "#1f2840",
  border:      "#ffffff0f",
  borderGlow:  "#00E5FF22",
  text:        "#E8F0FE",
  textSub:     "#8899BB",
  textDim:     "#445066",
  white:       "#ffffff",
  green:       "#00E676",
  red:         "#FF4444",
  yellow:      "#FFD600",
  orange:      "#FF6D00",
  grad:        "linear-gradient(135deg, #00E5FF, #4A7BFF, #B14DFF)",
  gradHoriz:   "linear-gradient(90deg, #00E5FF, #4A7BFF, #B14DFF)",
  gradMsg:     "linear-gradient(135deg, #00E5FF 0%, #4A7BFF 50%, #B14DFF 100%)",
  gradGlow:    "rgba(0,229,255,0.12)",
  gradGlow2:   "rgba(74,123,255,0.10)",
  gradGlow3:   "rgba(177,77,255,0.10)",
  bubbleSent:  "linear-gradient(135deg, #00c8e0 0%, #3d6fe0 55%, #9b3de0 100%)",
};

// ── LIGHT THEME ───────────────────────────────────────────────────────────────
const LIGHT_A = {
  cyan:        "#0099BB",
  blue:        "#3060DD",
  purple:      "#8830CC",
  dark1:       "#F0F2F5",
  dark2:       "#FFFFFF",
  surface:     "#F7F8FA",
  surfaceHi:   "#EBEDF0",
  surfaceHov:  "#E2E5E9",
  border:      "rgba(0,0,0,0.10)",
  borderGlow:  "rgba(0,153,187,0.25)",
  text:        "#111B21",
  textSub:     "#667781",
  textDim:     "#8696A0",
  white:       "#ffffff",
  green:       "#25D366",
  red:         "#FF4444",
  yellow:      "#E09800",
  orange:      "#FF6D00",
  grad:        "linear-gradient(135deg, #0099BB, #3060DD, #8830CC)",
  gradHoriz:   "linear-gradient(90deg, #0099BB, #3060DD, #8830CC)",
  gradMsg:     "linear-gradient(135deg, #0099BB 0%, #3060DD 50%, #8830CC 100%)",
  gradGlow:    "rgba(0,153,187,0.10)",
  gradGlow2:   "rgba(48,96,221,0.08)",
  gradGlow3:   "rgba(136,48,204,0.08)",
  bubbleSent:  "linear-gradient(135deg, #0088aa 0%, #2550bb 55%, #7020aa 100%)",
};

// ── THEME CONTEXT ─────────────────────────────────────────────────────────────
const ThemeCtx = createContext(A);
function useA() { return useContext(ThemeCtx); }

// ── MY PROFILE ────────────────────────────────────────────────────────────────
const MY_PROFILE = {
  name:"Aether User", phone:"+91 98765 43210", about:"Available",
  initials:"YO", color:"#00E5FF",
};

// ── CALLS DATA ────────────────────────────────────────────────────────────────
const CALLS_DATA = [
  {id:"cl1",userId:"u1",type:"incoming",answered:true, duration:"3:42", time:"Today, 10:23 AM",   isVideo:false},
  {id:"cl2",userId:"u2",type:"outgoing",answered:true, duration:"1:15", time:"Today, 9:05 AM",    isVideo:true},
  {id:"cl3",userId:"u3",type:"missed",  answered:false,duration:null,   time:"Yesterday, 8:44 PM",isVideo:false},
  {id:"cl4",userId:"u4",type:"incoming",answered:false,duration:null,   time:"Yesterday, 6:12 PM",isVideo:false},
  {id:"cl5",userId:"u1",type:"outgoing",answered:true, duration:"12:34",time:"Mon, 11:30 AM",     isVideo:true},
  {id:"cl6",userId:"u5",type:"missed",  answered:false,duration:null,   time:"Sun, 3:21 PM",      isVideo:false},
  {id:"cl7",userId:"u2",type:"incoming",answered:true, duration:"0:48", time:"Sun, 1:08 PM",      isVideo:false},
  {id:"cl8",userId:"u3",type:"outgoing",answered:true, duration:"7:22", time:"Sat, 6:00 PM",      isVideo:true},
];

// ── STATUS STORIES DATA ───────────────────────────────────────────────────────
const STATUS_STORIES = [
  {id:"s1",userId:"u1",time:"2 min ago",seen:false,color:"#00E5FF",
   items:[{type:"text",text:"Just shipped a new feature! 🚀",bg:"linear-gradient(135deg,#0D1117,#1A1F2B)"}]},
  {id:"s2",userId:"u2",time:"18 min ago",seen:false,color:"#B14DFF",
   items:[{type:"text",text:"Coffee time ☕",bg:"linear-gradient(135deg,#1a0d2b,#2b1a4a)"}]},
  {id:"s3",userId:"u3",time:"1 hr ago",seen:true,color:"#FF6D00",
   items:[{type:"text",text:"Design review done ✅",bg:"linear-gradient(135deg,#2b1a00,#4a3000)"}]},
  {id:"s4",userId:"u4",time:"3 hrs ago",seen:true,color:"#00E676",
   items:[{type:"text",text:"Team lunch! 🍕",bg:"linear-gradient(135deg,#0d2b14,#1a4a28)"}]},
];

// ── GLOBAL CSS ────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; overflow: hidden; }
  body { background: ${A.dark1}; font-family: 'Inter', -apple-system, sans-serif; }
  ::-webkit-scrollbar { width: 3px; height: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${A.cyan}33; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: ${A.cyan}66; }

  @keyframes fadeUp   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes scaleIn  { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:scale(1)} }
  @keyframes slideInL { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideInR { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideUp  { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.4} }
  @keyframes glow     { 0%,100%{box-shadow:0 0 8px #00E5FF44} 50%{box-shadow:0 0 22px #00E5FF88} }
  @keyframes bounce   { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
  @keyframes ripple   { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(3.5);opacity:0} }
  @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes waveform { 0%,100%{height:4px} 50%{height:18px} }
  @keyframes gradShift    { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes slideInChat  { from{transform:translateX(100%);opacity:.6} to{transform:translateX(0);opacity:1} }
  @keyframes statusProgress { from{width:0%} to{width:100%} }
  .status-scroll::-webkit-scrollbar { display:none; }
  .status-scroll { -ms-overflow-style:none; scrollbar-width:none; }
  @keyframes slideInList  { from{transform:translateX(-100%);opacity:.6} to{transform:translateX(0);opacity:1} }

  /* ── Mobile responsive ── */
  @media (max-width: 768px) {
    .aether-sidebar { width: 100% !important; min-width: 0 !important; }
    .aether-main   { width: 100% !important; min-width: 0 !important; }
    .aether-chat-pad { padding: 12px 14px !important; }
    .aether-msg-max { max-width: 80% !important; }
    .aether-profile-panel { width: 100% !important; position: fixed !important; inset: 0 !important; z-index: 500 !important; }
  }
  @keyframes float       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes splashPulse { 0%,100%{opacity:.55;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
  @keyframes loginSlide  { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer     { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes countPop    { from{transform:scale(.4);opacity:0} to{transform:scale(1);opacity:1} }
  @keyframes timerTick   { 0%,100%{opacity:1} 50%{opacity:.4} }

  .splash-logo { animation: float 3.2s ease-in-out infinite; }
  .login-card  { animation: loginSlide .45s cubic-bezier(.22,1,.36,1); }
  .shimmer-btn {
    background: linear-gradient(90deg,${A.cyan},${A.blue},${A.purple},${A.cyan});
    background-size: 300% auto;
    animation: shimmer 2.8s linear infinite;
  }
  .unread-badge { animation: countPop .2s cubic-bezier(.34,1.56,.64,1); }
  .disappearing-tick { animation: timerTick 1.4s ease-in-out infinite; }

  .msg-in  { animation: fadeUp .22s ease; }
  .msg-out { animation: fadeUp .22s ease; }
  .sidebar-row:hover { background: ${A.surfaceHov} !important; }
  .icon-btn:hover { color: ${A.cyan} !important; background: ${A.gradGlow} !important; }
  .tab-active { background: ${A.gradGlow} !important; color: ${A.cyan} !important; }

  .aether-logo-text {
    background: ${A.gradHoriz};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 900;
    letter-spacing: 4px;
    font-size: 18px;
  }

  .gradient-border {
    position: relative;
  }
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: ${A.gradHoriz};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .send-btn {
    background: ${A.gradMsg};
    background-size: 200% 200%;
    animation: gradShift 3s ease infinite;
    transition: transform .1s, box-shadow .2s;
  }
  .send-btn:hover { box-shadow: 0 6px 24px #00E5FF44 !important; }
  .send-btn:active { transform: scale(.9) !important; }

  .online-dot { animation: glow 2s ease-in-out infinite; }
`;

// ── SEED DATA ─────────────────────────────────────────────────────────────────
const USERS = {
  me:    { id:"me",    name:"You",           initials:"ME", color:A.cyan,    status:"online",  about:"Using Aether ✨",                phone:"+1 555-000-0001" },
  sofia: { id:"sofia", name:"Sophia Carter", initials:"SC", color:"#FF6BD6", status:"online",  about:"Hey there! I'm using Aether 👋", phone:"+1 555-000-0002" },
  alex:  { id:"alex",  name:"Alex Morgan",   initials:"AM", color:"#00E676", status:"online",  about:"Always here to chat 😄",         phone:"+1 555-000-0003" },
  priya: { id:"priya", name:"Priya Sharma",  initials:"PS", color:"#FFD600", status:"away",    about:"Busy but reachable 📲",          phone:"+1 555-000-0004" },
  marco: { id:"marco", name:"Marco Rossi",   initials:"MR", color:"#FF6D00", status:"offline", about:"Ciao! 🇮🇹",                     phone:"+1 555-000-0005" },
  kai:   { id:"kai",   name:"Kai Nakamura",  initials:"KN", color:"#7C4DFF", status:"online",  about:"Building the future 🚀",        phone:"+1 555-000-0006" },
};

const PINNED_MSG = "Welcome to Aether! 👋";

const SEED = [
  {
    id:"c1", type:"group", name:"Aether Team", participants:["sofia","alex","priya","marco","kai"],
    pinned: PINNED_MSG,
    messages:[
      {id:"m1",from:"sofia",text:"Hey team! Here's the update on the new design.",time:"10:30 AM",status:"read"},
      {id:"m2",from:"sofia",file:{name:"Design_Update.pdf",size:"4.6 MB",type:"pdf"},time:"10:30 AM",status:"read"},
      {id:"m3",from:"me",   text:"Looks amazing! 🔥",time:"10:31 AM",status:"read"},
      {id:"m4",from:"alex", text:"Great work everyone! 🙌",time:"10:32 AM",status:"read",reactions:[{emoji:"🎉",from:"me"},{emoji:"🎉",from:"priya"},{emoji:"🎉",from:"kai"}]},
      {id:"m5",from:"priya",audio:true,audioDur:"0:16",time:"10:33 AM",status:"read"},
    ],
  },
  {
    id:"c2", type:"dm", participants:["sofia"],
    messages:[
      {id:"m1",from:"sofia",text:"Can you review the Figma file when you're free?",time:"9:15 AM",status:"read"},
      {id:"m2",from:"me",   text:"Sure! Sending feedback now",time:"9:20 AM",status:"read"},
      {id:"m3",from:"sofia",text:"You're the best 🙏",time:"9:21 AM",status:"read"},
    ],
  },
  {
    id:"c3", type:"dm", participants:["alex"],
    messages:[
      {id:"m1",from:"alex",text:"Did you see the new Aether update? The UI is 🔥",time:"Yesterday",status:"read"},
      {id:"m2",from:"me",  text:"Yes! Love the new gradients",time:"Yesterday",status:"read"},
      {id:"m3",from:"alex",text:"End-to-end encryption is now military grade 🛡️",time:"Yesterday",status:"read"},
    ],
  },
  {
    id:"c4", type:"dm", participants:["priya"],
    messages:[
      {id:"m1",from:"priya",text:"Team lunch Friday? 🍕",time:"Mon",status:"read"},
      {id:"m2",from:"me",   text:"I'm in! What time?",time:"Mon",status:"read"},
      {id:"m3",from:"priya",text:"Noon works?",time:"Mon",status:"read"},
    ],
  },
  {
    id:"c5", type:"dm", participants:["kai"],
    messages:[
      {id:"m1",from:"kai",text:"Pushed the WebSocket changes to main 🚀",time:"Sun",status:"read"},
      {id:"m2",from:"me", text:"Merging now 👌",time:"Sun",status:"read"},
    ],
  },
  {
    id:"c6", type:"group", name:"🎯 Design Squad", participants:["sofia","priya","kai"],
    messages:[
      {id:"m1",from:"sofia",text:"New color system is ready for review",time:"Fri",status:"read"},
      {id:"m2",from:"priya",text:"Looking clean! 🎨",time:"Fri",status:"read"},
      {id:"m3",from:"kai",  text:"Ship it 🚀",time:"Fri",status:"read"},
    ],
  },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const convName   = c => c.type==="group" ? c.name : USERS[c.participants[0]]?.name ?? "Unknown";
const convInit   = c => c.type==="group" ? "GP" : USERS[c.participants[0]]?.initials ?? "?";
const convColor  = c => c.type==="group" ? A.blue : USERS[c.participants[0]]?.color ?? A.textSub;
const convStatus = c => c.type==="group" ? null : USERS[c.participants[0]]?.status;
const lastMsg    = c => c.messages.at(-1);
const uid        = () => `m${Date.now()}${Math.random().toString(36).slice(2,5)}`;
const fmtTime    = () => new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
const REPLIES    = ["Got it! 👍","Sounds great!","On it 🚀","Amazing! ✨","🔥🔥","Let's go!","Perfect timing!","100% agree","Will do!","Thanks! 🙏","Love it 💙","Interesting...","Makes sense!"];

// ── AI SMART REPLY ─────────────────────────────────────────────────────────────
function smartReply(lastMsg) {
  if(!lastMsg||!lastMsg.text) return {text:"Hey! 👋",label:"Greet"};
  const t=lastMsg.text.toLowerCase();
  if(t.includes("?"))                                      return {text:"Let me check 👍",label:"Check"};
  if(t.includes("meet")||t.includes("lunch")||t.includes("coffee")||t.includes("call")) return {text:"Sounds good! ☕ Let's do it",label:"Accept"};
  if(t.includes("thanks")||t.includes("thank you"))        return {text:"You're welcome! 😊",label:"Welcome"};
  if(t.includes("hi")||t.includes("hello")||t.includes("hey")||t.includes("hola"))     return {text:"Hey! 👋 How's it going?",label:"Reply"};
  if(t.includes("ok")||t.includes("okay")||t.includes("sure"))  return {text:"Perfect! 👌 On it.",label:"Confirm"};
  if(t.includes("great")||t.includes("amazing")||t.includes("awesome")||t.includes("🔥")) return {text:"Absolutely! 🔥 Love it!",label:"React"};
  if(t.includes("update")||t.includes("design")||t.includes("review"))  return {text:"Looks amazing! 🔥 Great work!",label:"Approve"};
  if(t.includes("push")||t.includes("ship")||t.includes("merge"))       return {text:"On it! Merging now 🚀",label:"Merge"};
  return {text:"Sounds good! 👌",label:"Agree"};
}

// ── AETHER LOGO SVG ───────────────────────────────────────────────────────────
function AetherLogo({size=36}) {
  const u=`al${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`${u}bg`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#06B6D4"/>
          <stop offset="48%"  stopColor="#3B5BFF"/>
          <stop offset="100%" stopColor="#9333EA"/>
        </linearGradient>
        <radialGradient id={`${u}sh`} cx="32%" cy="22%" r="58%">
          <stop offset="0%"   stopColor="#fff" stopOpacity=".28"/>
          <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id={`${u}ltr`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#06B6D4"/>
          <stop offset="100%" stopColor="#9333EA"/>
        </linearGradient>
        <filter id={`${u}drp`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity=".25"/>
        </filter>
      </defs>
      {/* App-icon background — rounded square */}
      <rect width="100" height="100" rx="26" fill={`url(#${u}bg)`}/>
      {/* Glass-shine overlay */}
      <rect width="100" height="100" rx="26" fill={`url(#${u}sh)`}/>
      {/* White speech bubble body */}
      <rect x="13" y="10" width="74" height="56" rx="17" fill="rgba(255,255,255,0.95)" filter={`url(#${u}drp)`}/>
      {/* Bubble tail */}
      <path d="M22 66 L13 87 L47 66Z" fill="rgba(255,255,255,0.95)"/>
      {/* Gradient "A" letter inside bubble */}
      <path d="M27 58 L50 16 L73 58" stroke={`url(#${u}ltr)`} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M36 41 L64 41"         stroke={`url(#${u}ltr)`} strokeWidth="7" strokeLinecap="round"/>
    </svg>
  );
}

// ── STATUS DOT ────────────────────────────────────────────────────────────────
function StatusDot({status}) {
  const A = useA();
  if(!status) return null;
  const col = status==="online"?A.green : status==="away"?A.yellow : A.textDim;
  return (
    <span className={status==="online"?"online-dot":""} style={{
      position:"absolute",bottom:1,right:1,
      width:10,height:10,borderRadius:"50%",
      background:col,border:`2px solid ${A.dark1}`,
      display:"block",
    }}/>
  );
}

// ── AVATAR ────────────────────────────────────────────────────────────────────
function Avatar({initials,color,size=42,status,glow=false,ring=false}) {
  const A = useA();
  return (
    <div style={{position:"relative",flexShrink:0}}>
      <div style={{
        width:size,height:size,borderRadius:"50%",
        background:`${color}14`,
        border:`1.5px solid ${ring||glow?color:color+"30"}`,
        boxShadow: glow ? `0 0 0 3px ${color}25, 0 0 20px ${color}35` : "none",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontWeight:700,fontSize:size*.3,color,userSelect:"none",
        letterSpacing:"-.3px",flexShrink:0,
        transition:"box-shadow .3s",
      }}>{initials}</div>
      <StatusDot status={status}/>
    </div>
  );
}

// ── ICON BUTTON ───────────────────────────────────────────────────────────────
function IBtn({onClick,title,children,active=false,danger=false,sz=36}) {
  const A = useA();
  return (
    <button className="icon-btn" onClick={onClick} title={title} style={{
      width:sz,height:sz,borderRadius:sz/2,border:"none",cursor:"pointer",
      background:active?A.gradGlow:"transparent",
      color:active?A.cyan:danger?A.red:A.textSub,
      display:"flex",alignItems:"center",justifyContent:"center",
      flexShrink:0,transition:"color .15s,background .15s",
    }}>{children}</button>
  );
}

// ── TICK ──────────────────────────────────────────────────────────────────────
function Tick({status}) {
  const A = useA();
  if(status==="sending") return <span style={{fontSize:9,color:A.textDim}}>○</span>;
  const col = status==="read" ? A.cyan : A.textDim;
  return (
    <svg width="14" height="9" viewBox="0 0 16 10" fill="none">
      <path d="M1 5L4.5 8.5L14 1" stroke={col} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {status==="read"&&<path d="M4.5 5L8 8.5" stroke={col} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}
    </svg>
  );
}

// ── EMOJI PICKER ──────────────────────────────────────────────────────────────
const EMOJIS = {
  "😊":["😊","😂","🤣","😅","🥰","😍","🤩","😎","🥳","😭","😤","😡","🤔","🙏","💀","🤖","😈","🫶","❤️","💙"],
  "👍":["👍","👎","🙌","👏","🤝","✌️","🤞","👌","💪","🙏","🫶","🫂","👋","🤙","🖖","☝️","👆","🫵","🤜","🤛"],
  "🔥":["🔥","✨","💫","⭐","🌟","💥","🎉","🎊","🏆","🥇","💯","❤️‍🔥","🚀","⚡","🌈","💎","🔮","🎯","🛡️","⚔️"],
  "🍕":["🍕","🍔","🌮","🍜","☕","🍵","🧋","🎂","🍰","🍩","🍦","🍓","🥗","🍣","🥞","🧇","🍺","🥤","🍱","🍛"],
};

function EmojiPanel({onPick}) {
  const A = useA();
  const [tab,setTab] = useState("😊");
  return (
    <div style={{
      position:"absolute",bottom:"calc(100% + 10px)",left:0,
      background:A.surfaceHi,border:`1px solid ${A.borderGlow}`,
      borderRadius:16,width:310,zIndex:300,
      boxShadow:`0 20px 60px rgba(0,0,0,.7), 0 0 0 1px ${A.cyan}11`,
      animation:"scaleIn .15s ease",transformOrigin:"bottom left",overflow:"hidden",
    }}>
      <div style={{display:"flex",borderBottom:`1px solid ${A.border}`}}>
        {Object.keys(EMOJIS).map(k=>(
          <button key={k} onClick={()=>setTab(k)} style={{
            flex:1,padding:"10px 4px",border:"none",cursor:"pointer",
            background:tab===k?A.gradGlow:"transparent",
            fontSize:18,borderBottom:tab===k?`2px solid ${A.cyan}`:"2px solid transparent",
            transition:"all .15s",
          }}>{k}</button>
        ))}
      </div>
      <div style={{padding:10,display:"flex",flexWrap:"wrap",gap:2,maxHeight:210,overflowY:"auto"}}>
        {EMOJIS[tab].map(e=>(
          <button key={e} onClick={()=>onPick(e)} style={{
            background:"none",border:"none",cursor:"pointer",
            fontSize:22,padding:"5px 6px",borderRadius:8,transition:"background .1s",
          }}
            onMouseEnter={ev=>ev.currentTarget.style.background=A.surfaceHov}
            onMouseLeave={ev=>ev.currentTarget.style.background="none"}
          >{e}</button>
        ))}
      </div>
    </div>
  );
}

// ── REACTION BAR ──────────────────────────────────────────────────────────────
const QUICK = ["❤️","😂","😮","😢","🔥","👍","🎉","💙"];
function ReactBar({onReact}) {
  const A = useA();
  return (
    <div style={{
      position:"absolute",top:-50,left:0,zIndex:200,
      background:A.surfaceHi,border:`1px solid ${A.borderGlow}`,
      borderRadius:30,padding:"7px 12px",display:"flex",gap:3,
      boxShadow:`0 10px 30px rgba(0,0,0,.6)`,animation:"scaleIn .15s ease",
    }}>
      {QUICK.map(e=>(
        <button key={e} onClick={()=>onReact(e)} style={{
          background:"none",border:"none",cursor:"pointer",
          fontSize:22,padding:"2px 3px",borderRadius:20,transition:"transform .12s",
        }}
          onMouseEnter={ev=>ev.currentTarget.style.transform="scale(1.5)"}
          onMouseLeave={ev=>ev.currentTarget.style.transform="scale(1)"}
        >{e}</button>
      ))}
    </div>
  );
}

// ── CALL OVERLAY ──────────────────────────────────────────────────────────────
function CallOverlay({conv,mode,onEnd}) {
  const A = useA();
  const [sec,setSec] = useState(0);
  const [muted,setMuted] = useState(false);
  const [camOff,setCamOff] = useState(false);
  const [spk,setSpk] = useState(true);

  useEffect(()=>{const t=setInterval(()=>setSec(s=>s+1),1000);return()=>clearInterval(t);},[]);
  const fmt = s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return (
    <div style={{
      position:"fixed",inset:0,zIndex:2000,
      background:"linear-gradient(160deg,#020810 0%,#060c1a 40%,#0a0620 80%,#060c1a 100%)",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      animation:"fadeIn .35s ease",
    }}>
      {[140,200,270,360].map((r,i)=>(
        <div key={i} style={{
          position:"absolute",top:"50%",left:"50%",
          width:r,height:r,borderRadius:"50%",
          border:`1px solid ${[A.cyan,A.blue,A.purple,A.cyan][i]}${["22","18","12","08"][i]}`,
          transform:"translate(-50%,-50%)",
          animation:`ripple ${2.4+i*.6}s ease-out infinite ${i*.35}s`,
          pointerEvents:"none",
        }}/>
      ))}

      <div style={{
        position:"absolute",width:300,height:300,borderRadius:"50%",
        background:`radial-gradient(circle, ${A.cyan}18 0%, transparent 70%)`,
        pointerEvents:"none",
      }}/>

      {mode==="video"&&!camOff&&(
        <div style={{
          position:"absolute",top:24,right:24,
          width:160,height:100,borderRadius:14,overflow:"hidden",
          border:`1px solid ${A.cyan}44`,boxShadow:`0 8px 32px rgba(0,0,0,.5)`,
          background:`linear-gradient(135deg,${A.dark2},${A.surfaceHi})`,
          display:"flex",alignItems:"center",justifyContent:"center",
        }}>
          <Avatar initials="ME" color={A.cyan} size={52}/>
          <div style={{position:"absolute",bottom:6,left:8,fontSize:10,color:A.textSub}}>You</div>
        </div>
      )}

      <div style={{textAlign:"center",position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
        <Avatar initials={convInit(conv)} color={convColor(conv)} size={110} glow ring/>
        <div>
          <div style={{color:A.white,fontSize:28,fontWeight:800,letterSpacing:"-.5px"}}>{convName(conv)}</div>
          <div style={{
            marginTop:8,fontSize:15,fontWeight:600,
            background:sec>0?`linear-gradient(90deg,${A.green},${A.cyan})`:"none",
            WebkitBackgroundClip:sec>0?"text":"none",WebkitTextFillColor:sec>0?"transparent":"none",
            color:sec>0?"transparent":A.textSub,
            fontVariantNumeric:"tabular-nums",
          }}>{sec>0?fmt(sec):"Connecting…"}</div>
          <div style={{marginTop:4,fontSize:12,color:A.textDim}}>
            {mode==="video"?"Video call":"Voice call"}{muted?" · Muted":""}{camOff&&mode==="video"?" · Camera off":""}
          </div>
        </div>
      </div>

      <div style={{
        position:"absolute",bottom:56,
        display:"flex",gap:20,alignItems:"center",
      }}>
        {[
          {e:muted?"🔇":"🎤",l:muted?"Unmute":"Mute",f:()=>setMuted(!muted),a:muted},
          mode==="video"&&{e:camOff?"📵":"📹",l:"Camera",f:()=>setCamOff(!camOff),a:camOff},
          {e:spk?"🔊":"🔈",l:"Speaker",f:()=>setSpk(!spk),a:!spk},
        ].filter(Boolean).map((b,i)=>(
          <button key={i} onClick={b.f} title={b.l} style={{
            width:58,height:58,borderRadius:"50%",border:"none",cursor:"pointer",
            background:b.a?`${A.blue}44`:A.surfaceHi,
            fontSize:22,display:"flex",alignItems:"center",justifyContent:"center",
            outline:`1px solid ${b.a?A.cyan+"44":A.border}`,
            transition:"transform .15s,background .15s",
          }}
            onMouseEnter={ev=>ev.currentTarget.style.transform="scale(1.1)"}
            onMouseLeave={ev=>ev.currentTarget.style.transform="scale(1)"}
          >{b.e}</button>
        ))}

        <button onClick={onEnd} style={{
          width:68,height:68,borderRadius:"50%",border:"none",cursor:"pointer",
          background:"linear-gradient(135deg,#FF1744,#FF4444)",
          fontSize:28,display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:"0 6px 28px #FF444466",
          transition:"transform .15s,box-shadow .15s",
        }}
          onMouseEnter={ev=>{ev.currentTarget.style.transform="scale(1.1)";ev.currentTarget.style.boxShadow="0 8px 36px #FF444488";}}
          onMouseLeave={ev=>{ev.currentTarget.style.transform="scale(1)";ev.currentTarget.style.boxShadow="0 6px 28px #FF444466";}}
        >📵</button>
      </div>

      <div style={{
        position:"absolute",bottom:16,
        display:"flex",alignItems:"center",gap:6,
        background:A.surfaceHi,border:`1px solid ${A.green}33`,
        borderRadius:20,padding:"5px 14px",
        color:A.green,fontSize:11,fontWeight:600,
      }}>
        🛡️ End-to-End Encrypted
      </div>
    </div>
  );
}

// ── IMAGE MODAL ───────────────────────────────────────────────────────────────
function ImageModal({src,onClose}) {
  const A = useA();
  return (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,zIndex:1500,background:"rgba(0,0,0,.92)",
      display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn .2s",cursor:"zoom-out",
    }}>
      <img src={src} alt="" style={{maxWidth:"88vw",maxHeight:"88vh",borderRadius:16,objectFit:"contain",boxShadow:"0 32px 80px rgba(0,0,0,.8)"}}/>
      <button onClick={onClose} style={{
        position:"absolute",top:20,right:20,background:A.surfaceHi,
        border:`1px solid ${A.border}`,borderRadius:"50%",width:40,height:40,
        cursor:"pointer",color:A.text,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",
      }}>✕</button>
    </div>
  );
}

// ── FILE BUBBLE ───────────────────────────────────────────────────────────────
function FileBubble({file,isMe}) {
  const A = useA();
  const icons = {pdf:"📄",doc:"📝",xls:"📊",zip:"📦",img:"🖼️"};
  const ext = file.name.split(".").pop().toLowerCase();
  const icon = icons[ext] || "📎";
  return (
    <div style={{
      display:"flex",alignItems:"center",gap:12,
      padding:"10px 14px",
      background:isMe?`${A.blue}22`:`${A.surfaceHov}`,
      borderRadius:12,border:`1px solid ${isMe?A.cyan+"33":A.border}`,
      minWidth:200,cursor:"pointer",
      transition:"background .15s",
    }}
      onMouseEnter={ev=>ev.currentTarget.style.background=isMe?`${A.blue}35`:`${A.surfaceHov}`}
      onMouseLeave={ev=>ev.currentTarget.style.background=isMe?`${A.blue}22`:`${A.surfaceHov}`}
    >
      <div style={{
        width:40,height:40,borderRadius:10,
        background:isMe?`${A.cyan}22`:`${A.blue}22`,
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,
      }}>{icon}</div>
      <div>
        <div style={{color:isMe?A.white:A.text,fontSize:13,fontWeight:600}}>{file.name}</div>
        <div style={{color:A.textSub,fontSize:11,marginTop:2}}>{file.size} · {ext.toUpperCase()}</div>
      </div>
      <div style={{marginLeft:"auto",color:A.cyan,fontSize:18}}>⬇</div>
    </div>
  );
}

// ── AUDIO BUBBLE ─────────────────────────────────────────────────────────────
function AudioBubble({dur,isMe}) {
  const A = useA();
  const [playing,setPlaying] = useState(false);
  const bars = Array.from({length:32},(_,i)=>4+Math.sin(i*.7+1)*8+Math.random()*6);
  return (
    <div style={{
      display:"flex",alignItems:"center",gap:10,
      padding:"10px 14px",borderRadius:26,minWidth:220,
      background:isMe?A.bubbleSent:A.surfaceHi,
    }}>
      <Avatar initials={isMe?"ME":USERS.priya.initials} color={isMe?A.cyan:USERS.priya.color} size={36}/>
      <button onClick={()=>setPlaying(!playing)} style={{
        width:34,height:34,borderRadius:"50%",border:"none",cursor:"pointer",
        background:isMe?"rgba(255,255,255,.2)":A.gradGlow,
        color:isMe?A.white:A.cyan,fontSize:14,
        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
      }}>{playing?"⏸":"▶"}</button>
      <div style={{display:"flex",alignItems:"center",gap:1.5,height:28,flex:1}}>
        {bars.map((h,i)=>(
          <div key={i} style={{
            width:2.5,height:h,borderRadius:2,
            background:isMe?"rgba(255,255,255,.7)":`${A.cyan}99`,
            animation:playing?`waveform ${.4+i*.03}s ease-in-out infinite ${i*.02}s`:"none",
            transition:"height .1s",
          }}/>
        ))}
      </div>
      <span style={{color:isMe?"rgba(255,255,255,.8)":A.textSub,fontSize:11,flexShrink:0}}>{dur}</span>
    </div>
  );
}

// ── CONTEXT MENU ─────────────────────────────────────────────────────────────
function CtxMenu({x,y,isMe,onCopy,onReply,onDelete,onClose}) {
  const A = useA();
  const items=[
    {l:"Reply",i:"↩",f:onReply},
    {l:"Copy Text",i:"📋",f:onCopy},
    {l:"Forward",i:"➡",f:()=>{}},
    {l:"Star Message",i:"⭐",f:()=>{}},
    ...(isMe?[{l:"Delete",i:"🗑",f:onDelete,d:true}]:[]),
  ];
  return (
    <>
      <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:400}}/>
      <div style={{
        position:"fixed",left:x,top:y,zIndex:500,
        background:A.surfaceHi,border:`1px solid ${A.borderGlow}`,borderRadius:14,
        overflow:"hidden",boxShadow:`0 16px 48px rgba(0,0,0,.7),0 0 0 1px ${A.cyan}11`,
        animation:"scaleIn .12s ease",minWidth:168,
      }}>
        {items.map(it=>(
          <button key={it.l} onClick={()=>{it.f?.();onClose();}} style={{
            width:"100%",padding:"10px 18px",border:"none",cursor:"pointer",
            background:"none",color:it.d?A.red:A.text,
            display:"flex",alignItems:"center",gap:10,fontSize:13,fontWeight:500,
            textAlign:"left",transition:"background .1s",
          }}
            onMouseEnter={ev=>ev.currentTarget.style.background=A.surfaceHov}
            onMouseLeave={ev=>ev.currentTarget.style.background="none"}
          >
            <span style={{fontSize:16}}>{it.i}</span>{it.l}
          </button>
        ))}
      </div>
    </>
  );
}

// ── NEW CHAT MODAL ────────────────────────────────────────────────────────────
function NewChatModal({convs,onDM,onGroup,onClose}) {
  const A = useA();
  const [tab,setTab] = useState("dm");
  const [q,setQ] = useState("");
  const [sel,setSel] = useState([]);
  const [gname,setGname] = useState("");

  const others = Object.values(USERS).filter(u=>u.id!=="me");
  const filtered = others.filter(u=>u.name.toLowerCase().includes(q.toLowerCase()));

  const toggle = id=>setSel(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);

  return (
    <div style={{position:"fixed",inset:0,zIndex:800,background:"rgba(0,0,0,.8)",display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn .2s"}}>
      <div style={{
        background:A.surfaceHi,border:`1px solid ${A.borderGlow}`,borderRadius:22,
        width:440,maxHeight:"85vh",display:"flex",flexDirection:"column",
        boxShadow:`0 32px 80px rgba(0,0,0,.8),0 0 0 1px ${A.cyan}11`,
        animation:"slideUp .25s ease",overflow:"hidden",
      }}>
        <div style={{
          padding:"20px 22px 16px",
          background:`linear-gradient(135deg,${A.cyan}0a,${A.blue}0a,${A.purple}0a)`,
          borderBottom:`1px solid ${A.border}`,
          display:"flex",alignItems:"center",gap:12,
        }}>
          <AetherLogo size={30}/>
          <div style={{flex:1}}>
            <div style={{color:A.text,fontWeight:700,fontSize:16}}>New Conversation</div>
            <div style={{color:A.textSub,fontSize:11,marginTop:1}}>Connect. Communicate. Beyond.</div>
          </div>
          <IBtn onClick={onClose} title="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </IBtn>
        </div>

        <div style={{display:"flex",borderBottom:`1px solid ${A.border}`}}>
          {["dm","group"].map(t=>(
            <button key={t} onClick={()=>{setTab(t);setSel([]);}} style={{
              flex:1,padding:"13px 0",border:"none",cursor:"pointer",
              background:tab===t?A.gradGlow:"transparent",
              color:tab===t?A.cyan:A.textSub,fontWeight:700,fontSize:13,
              borderBottom:tab===t?`2px solid ${A.cyan}`:"2px solid transparent",
              transition:"all .15s",
            }}>{t==="dm"?"💬 Direct Message":"👥 New Group"}</button>
          ))}
        </div>

        {tab==="group"&&(
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${A.border}`}}>
            <input value={gname} onChange={e=>setGname(e.target.value)} placeholder="Group name…"
              style={{
                width:"100%",background:A.dark2,border:`1px solid ${A.borderGlow}`,borderRadius:12,
                padding:"10px 14px",color:A.text,fontSize:13,fontFamily:"inherit",outline:"none",
              }}/>
          </div>
        )}

        <div style={{padding:"10px 14px",borderBottom:`1px solid ${A.border}`}}>
          <div style={{display:"flex",gap:8,alignItems:"center",background:A.dark2,border:`1px solid ${A.border}`,borderRadius:12,padding:"9px 13px"}}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="7" stroke={A.textSub} strokeWidth="1.8"/><path d="M15 15l3 3" stroke={A.textSub} strokeWidth="1.8" strokeLinecap="round"/></svg>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search contacts…"
              style={{background:"none",border:"none",outline:"none",color:A.text,fontSize:13,width:"100%",fontFamily:"inherit"}}/>
          </div>
        </div>

        {tab==="group"&&sel.length>0&&(
          <div style={{padding:"8px 14px",display:"flex",gap:6,flexWrap:"wrap",borderBottom:`1px solid ${A.border}`}}>
            {sel.map(id=>{
              const u=USERS[id];
              return (
                <div key={id} onClick={()=>toggle(id)} style={{
                  display:"flex",alignItems:"center",gap:5,cursor:"pointer",
                  background:A.gradGlow,border:`1px solid ${A.cyan}33`,
                  borderRadius:20,padding:"4px 10px 4px 6px",
                }}>
                  <Avatar initials={u.initials} color={u.color} size={20}/>
                  <span style={{fontSize:12,color:A.cyan}}>{u.name.split(" ")[0]}</span>
                  <span style={{color:A.textSub,fontSize:10}}>✕</span>
                </div>
              );
            })}
          </div>
        )}

        <div style={{flex:1,overflowY:"auto",padding:"6px 0"}}>
          {filtered.map(u=>{
            const isSel=sel.includes(u.id);
            const existing=tab==="dm"&&convs.find(c=>c.type==="dm"&&c.participants.includes(u.id));
            return (
              <div key={u.id} onClick={()=>tab==="dm"?(existing?onDM(existing.id):onDM(null,u.id)):toggle(u.id)}
                style={{
                  padding:"11px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,
                  background:isSel?A.gradGlow2:"none",transition:"background .12s",
                }}
                onMouseEnter={ev=>ev.currentTarget.style.background=isSel?A.gradGlow2:A.surfaceHov}
                onMouseLeave={ev=>ev.currentTarget.style.background=isSel?A.gradGlow2:"none"}
              >
                <Avatar initials={u.initials} color={u.color} size={44} status={u.status}/>
                <div style={{flex:1}}>
                  <div style={{color:A.text,fontWeight:600,fontSize:14}}>{u.name}</div>
                  <div style={{color:A.textDim,fontSize:12,marginTop:2}}>{u.about}</div>
                </div>
                {tab==="dm"&&existing&&<span style={{fontSize:11,color:A.textSub,background:A.surfaceHov,borderRadius:8,padding:"3px 8px"}}>existing</span>}
                {tab==="group"&&(
                  <div style={{
                    width:22,height:22,borderRadius:"50%",border:`2px solid ${isSel?A.cyan:A.border}`,
                    background:isSel?`linear-gradient(135deg,${A.cyan},${A.blue})`:"none",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff",
                    transition:"all .15s",flexShrink:0,
                  }}>{isSel&&"✓"}</div>
                )}
              </div>
            );
          })}
        </div>

        {tab==="group"&&sel.length>0&&(
          <div style={{padding:16,borderTop:`1px solid ${A.border}`}}>
            <button onClick={()=>onGroup(gname||"New Group",sel)} className="send-btn" style={{
              width:"100%",padding:"13px 0",borderRadius:14,border:"none",cursor:"pointer",
              color:"#fff",fontWeight:700,fontSize:14,
              boxShadow:`0 6px 24px ${A.cyan}33`,
            }}>Create Group · {sel.length} member{sel.length!==1?"s":""} ✓</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── PROFILE PANEL ─────────────────────────────────────────────────────────────
function ProfilePanel({conv,onClose}) {
  const A = useA();
  const isDM = conv.type==="dm";
  const user = isDM?USERS[conv.participants[0]]:null;
  const imgs = conv.messages.filter(m=>m.image).map(m=>m.image);
  const members = conv.type==="group"?conv.participants.map(id=>USERS[id]).filter(Boolean):[];

  return (
    <div style={{
      width:290,flexShrink:0,
      background:A.surfaceHi,borderLeft:`1px solid ${A.border}`,
      display:"flex",flexDirection:"column",overflowY:"auto",
      animation:"slideInR .2s ease",
    }}>
      <div style={{padding:"14px 16px",borderBottom:`1px solid ${A.border}`,display:"flex",alignItems:"center",gap:8}}>
        <span style={{color:A.text,fontWeight:700,fontSize:15,flex:1}}>{isDM?"Contact Info":"Group Info"}</span>
        <IBtn onClick={onClose} title="Close" sz={30}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
        </IBtn>
      </div>

      <div style={{
        padding:"28px 0 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:10,
        background:`linear-gradient(180deg,${A.cyan}08 0%,transparent 100%)`,
        borderBottom:`1px solid ${A.border}`,
      }}>
        <Avatar initials={convInit(conv)} color={convColor(conv)} size={82} status={user?.status} glow ring/>
        <div style={{color:A.text,fontWeight:800,fontSize:18}}>{convName(conv)}</div>
        {user&&(
          <div style={{
            fontSize:12,fontWeight:600,
            color:user.status==="online"?A.green:user.status==="away"?A.yellow:A.textSub,
          }}>{user.status==="online"?"● Active Now":user.status==="away"?"● Away":"○ Offline"}</div>
        )}
      </div>

      <div style={{display:"flex",justifyContent:"space-around",padding:"16px 12px",borderBottom:`1px solid ${A.border}`}}>
        {[{e:"📞",l:"Call"},{e:"📹",l:"Video"},{e:"🔔",l:"Mute"},{e:"🔍",l:"Search"}].map(b=>(
          <div key={b.l} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer"}}
            onMouseEnter={ev=>ev.currentTarget.style.opacity=".7"}
            onMouseLeave={ev=>ev.currentTarget.style.opacity="1"}
          >
            <div style={{
              width:44,height:44,borderRadius:"50%",
              background:A.gradGlow,border:`1px solid ${A.borderGlow}`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,
            }}>{b.e}</div>
            <span style={{fontSize:10,color:A.textSub}}>{b.l}</span>
          </div>
        ))}
      </div>

      <div style={{padding:"14px 18px",borderBottom:`1px solid ${A.border}`}}>
        <div style={{fontSize:10,color:A.textSub,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",marginBottom:8}}>About</div>
        <div style={{fontSize:13,color:A.text,lineHeight:1.6}}>{isDM?user?.about:`${conv.participants.length+1} members`}</div>
        {user?.phone&&<div style={{fontSize:12,color:A.textDim,marginTop:5}}>{user.phone}</div>}
      </div>

      <div style={{
        margin:"12px 14px",padding:"10px 14px",
        background:`${A.green}0c`,border:`1px solid ${A.green}33`,borderRadius:10,
        display:"flex",alignItems:"center",gap:8,
      }}>
        <span style={{fontSize:18}}>🛡️</span>
        <div>
          <div style={{color:A.green,fontSize:12,fontWeight:700}}>End-to-End Encrypted</div>
          <div style={{color:A.textDim,fontSize:11,marginTop:1}}>Military-grade encryption</div>
        </div>
      </div>

      {conv.type==="group"&&(
        <div style={{padding:"12px 0",borderBottom:`1px solid ${A.border}`}}>
          <div style={{fontSize:10,color:A.textSub,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",padding:"0 18px",marginBottom:8}}>Members ({members.length+1})</div>
          {[USERS.me,...members].map(u=>(
            <div key={u.id} style={{padding:"8px 18px",display:"flex",alignItems:"center",gap:10}}>
              <Avatar initials={u.initials} color={u.color} size={34} status={u.status}/>
              <div>
                <div style={{color:A.text,fontSize:13,fontWeight:600}}>{u.name}{u.id==="me"&&" (You)"}</div>
                <div style={{color:A.textDim,fontSize:11}}>{u.status}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {imgs.length>0&&(
        <div style={{padding:"12px 0"}}>
          <div style={{fontSize:10,color:A.textSub,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",padding:"0 18px",marginBottom:8}}>Media ({imgs.length})</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:3,padding:"0 12px"}}>
            {imgs.map((img,i)=>(
              <div key={i} style={{aspectRatio:"1",borderRadius:8,overflow:"hidden"}}>
                <img src={img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── CALLS SCREEN ─────────────────────────────────────────────────────────────
function CallsScreen({onCall}) {
  const A = useA();
  const [filter,setFilter] = useState("all"); // all | missed

  const list = filter==="missed"
    ? CALLS_DATA.filter(c=>!c.answered)
    : CALLS_DATA;

  const icon = (type,answered)=>{
    if(!answered) return {sym:"↙",col:"#FF4444"};           // missed
    if(type==="outgoing") return {sym:"↗",col:"#8899BB"};   // outgoing
    return {sym:"↙",col:"#25D366"};                          // incoming answered
  };

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* Header */}
      <div style={{padding:"14px 16px 10px",background:A.dark2,borderBottom:`1px solid ${A.border}`}}>
        <div style={{color:A.text,fontSize:17,fontWeight:800,letterSpacing:"-.3px",marginBottom:10}}>Recent Calls</div>
        <div style={{display:"flex",gap:8}}>
          {[["all","All"],["missed","Missed"]].map(([k,l])=>(
            <button key={k} onClick={()=>setFilter(k)} style={{
              padding:"5px 16px",borderRadius:20,border:"none",cursor:"pointer",
              background:filter===k?`${A.cyan}22`:A.surface,
              color:filter===k?A.cyan:A.textSub,
              fontWeight:filter===k?700:500,fontSize:12,
              outline:filter===k?`1px solid ${A.cyan}44`:`1px solid ${A.border}`,
              transition:"all .15s",
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Call List */}
      <div style={{flex:1,overflowY:"auto"}}>
        {list.map((call,i)=>{
          const user = USERS[call.userId];
          if(!user) return null;
          const {sym,col} = icon(call.type,call.answered);
          return (
            <div key={call.id} style={{
              display:"flex",alignItems:"center",gap:12,
              padding:"12px 16px",
              borderBottom:`1px solid ${A.border}`,
              transition:"background .1s",
              cursor:"pointer",
            }}
              onMouseEnter={ev=>ev.currentTarget.style.background=A.surfaceHov}
              onMouseLeave={ev=>ev.currentTarget.style.background="none"}
            >
              <Avatar initials={user.initials} color={user.color} size={46} status={user.status}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{
                  color:call.answered?A.text:A.red,
                  fontWeight:700,fontSize:14,
                  overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                }}>{user.name}</div>
                <div style={{display:"flex",alignItems:"center",gap:5,marginTop:3}}>
                  <span style={{color:col,fontSize:13,fontWeight:700,lineHeight:1}}>{sym}</span>
                  <span style={{color:A.textSub,fontSize:12}}>
                    {call.type.charAt(0).toUpperCase()+call.type.slice(1)}
                    {call.duration ? ` · ${call.duration}` : " · Not answered"}
                  </span>
                  {call.isVideo && <span style={{fontSize:11,color:A.blue}}>📹</span>}
                </div>
                <div style={{color:A.textDim,fontSize:11,marginTop:2}}>{call.time}</div>
              </div>
              {/* Callback buttons */}
              <div style={{display:"flex",gap:6,flexShrink:0}}>
                <button onClick={()=>onCall&&onCall(user,"audio")} style={{
                  width:36,height:36,borderRadius:"50%",border:`1px solid ${A.cyan}33`,
                  background:A.gradGlow,cursor:"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color:A.cyan,fontSize:16,transition:"all .15s",
                }}
                  onMouseEnter={ev=>{ev.currentTarget.style.background=`${A.cyan}22`;ev.currentTarget.style.borderColor=A.cyan+"66";}}
                  onMouseLeave={ev=>{ev.currentTarget.style.background=A.gradGlow;ev.currentTarget.style.borderColor=A.cyan+"33";}}
                  title={`Call ${user.name}`}
                >📞</button>
                {call.isVideo&&(
                  <button onClick={()=>onCall&&onCall(user,"video")} style={{
                    width:36,height:36,borderRadius:"50%",border:`1px solid ${A.blue}33`,
                    background:`${A.blue}08`,cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    color:A.blue,fontSize:16,transition:"all .15s",
                  }}
                    onMouseEnter={ev=>{ev.currentTarget.style.background=`${A.blue}22`;}}
                    onMouseLeave={ev=>{ev.currentTarget.style.background=`${A.blue}08`;}}
                    title={`Video call ${user.name}`}
                  >🎥</button>
                )}
              </div>
            </div>
          );
        })}
        {list.length===0&&(
          <div style={{padding:"48px 20px",textAlign:"center",color:A.textDim}}>
            <div style={{fontSize:40,marginBottom:12}}>📵</div>
            <div style={{fontSize:14}}>No missed calls</div>
          </div>
        )}
      </div>

      {/* New call CTA */}
      <div style={{
        padding:"12px 16px",borderTop:`1px solid ${A.border}`,
        background:A.dark2,
      }}>
        <button style={{
          width:"100%",padding:"11px",borderRadius:12,border:"none",cursor:"pointer",
          background:A.gradMsg,color:"#fff",fontWeight:700,fontSize:13,
          boxShadow:`0 4px 20px ${A.cyan}30`,transition:"opacity .15s",
        }}
          onMouseEnter={ev=>ev.currentTarget.style.opacity=".88"}
          onMouseLeave={ev=>ev.currentTarget.style.opacity="1"}
        >📞 New Call</button>
      </div>
    </div>
  );
}

// ── STATUS BAR (WhatsApp-style stories) ───────────────────────────────────────
function StatusBar({onView,myStory}) {
  const A = useA();
  const [seenMap,setSeenMap] = useState({});
  const [viewer,setViewer] = useState(null);

  function openStory(story) {
    setSeenMap(p=>({...p,[story.id]:true}));
    setViewer(story);
    onView&&onView(story);
  }

  return (
    <>
      <div style={{
        padding:"12px 14px 6px",
        borderBottom:`1px solid ${A.border}`,
        background:A.dark2,
      }}>
        <div style={{
          display:"flex",gap:12,overflowX:"auto",paddingBottom:6,
        }} className="status-scroll">
          {/* My Status */}
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer",flexShrink:0}}
            onClick={()=>{}}
          >
            <div style={{position:"relative"}}>
              <div style={{
                width:52,height:52,borderRadius:"50%",
                background:`${MY_PROFILE.color}18`,
                border:`2px dashed ${A.cyan}66`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:18,fontWeight:700,color:A.cyan,
              }}>{MY_PROFILE.initials}</div>
              <div style={{
                position:"absolute",bottom:0,right:0,
                width:18,height:18,borderRadius:"50%",
                background:A.cyan,border:`2px solid ${A.dark2}`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:11,color:"#000",fontWeight:900,lineHeight:1,
              }}>+</div>
            </div>
            <span style={{fontSize:10,color:A.textSub,fontWeight:500,maxWidth:52,textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>My Status</span>
          </div>

          {/* Contact Statuses */}
          {STATUS_STORIES.map(story=>{
            const user = USERS[story.userId];
            if(!user) return null;
            const seen = seenMap[story.id]||story.seen;
            return (
              <div key={story.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer",flexShrink:0}}
                onClick={()=>openStory(story)}
              >
                <div style={{
                  width:56,height:56,borderRadius:"50%",
                  padding:2,
                  background:seen?"transparent":A.gradHoriz,
                  border:seen?`2px solid ${A.border}`:"none",
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>
                  <div style={{
                    width:"100%",height:"100%",borderRadius:"50%",
                    background:A.dark2,display:"flex",alignItems:"center",justifyContent:"center",
                    padding:2,
                  }}>
                    <Avatar initials={user.initials} color={user.color} size={44}/>
                  </div>
                </div>
                <span style={{fontSize:10,color:seen?A.textDim:A.text,fontWeight:seen?400:600,maxWidth:56,textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name.split(" ")[0]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Viewer Modal */}
      {viewer&&(
        <div style={{
          position:"fixed",inset:0,zIndex:2500,
          background:"rgba(0,0,0,0.95)",
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          animation:"fadeIn .2s",
        }} onClick={()=>setViewer(null)}>
          <div style={{
            width:Math.min(360,window.innerWidth-32),
            padding:"40px 32px",
            borderRadius:24,
            background:viewer.items[0]?.bg||"#1a1f2b",
            border:`1px solid ${A.borderGlow}`,
            textAlign:"center",
            position:"relative",
          }} onClick={e=>e.stopPropagation()}>
            {/* Progress bar */}
            <div style={{
              position:"absolute",top:16,left:16,right:16,height:3,
              background:`${A.white}22`,borderRadius:4,overflow:"hidden",
            }}>
              <div style={{height:"100%",background:A.cyan,animation:"statusProgress 5s linear forwards"}}/>
            </div>
            {/* Close */}
            <button onClick={()=>setViewer(null)} style={{
              position:"absolute",top:16,right:16,background:"none",border:"none",
              color:A.white,fontSize:22,cursor:"pointer",lineHeight:1,zIndex:1,
            }}>✕</button>
            {/* Avatar */}
            <div style={{marginTop:16,marginBottom:16}}>
              <Avatar initials={USERS[viewer.userId]?.initials||"?"} color={viewer.color} size={64} glow/>
            </div>
            <div style={{color:A.white,fontWeight:700,fontSize:15,marginBottom:4}}>
              {USERS[viewer.userId]?.name}
            </div>
            <div style={{color:`${A.white}77`,fontSize:11,marginBottom:24}}>{viewer.time}</div>
            <div style={{color:A.white,fontSize:20,fontWeight:600,lineHeight:1.4}}>
              {viewer.items[0]?.text}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── SETTINGS PANEL ────────────────────────────────────────────────────────────
function SettingsPanel({onClose,theme,onThemeChange}) {
  const A = useA();
  const [section,setSection] = useState("main"); // main|account|privacy|notifications
  const [myName,setMyName] = useState(MY_PROFILE.name);
  const [myAbout,setMyAbout] = useState(MY_PROFILE.about);
  const [editingName,setEditingName] = useState(false);
  const [editingAbout,setEditingAbout] = useState(false);
  const [notifMsgs,setNotifMsgs] = useState(true);
  const [notifSound,setNotifSound] = useState(true);
  const [lastSeen,setLastSeen] = useState("everyone");
  const [dpPrivacy,setDpPrivacy] = useState("everyone");

  const Toggle = ({on,onToggle})=>(
    <div onClick={onToggle} style={{
      width:44,height:24,borderRadius:12,cursor:"pointer",
      background:on?A.cyan:`${A.textDim}44`,
      position:"relative",transition:"background .2s",flexShrink:0,
    }}>
      <div style={{
        position:"absolute",top:3,left:on?23:3,
        width:18,height:18,borderRadius:"50%",
        background:"#fff",transition:"left .2s",
        boxShadow:"0 1px 4px rgba(0,0,0,.3)",
      }}/>
    </div>
  );

  const Row = ({icon,label,sub,onClick,right,noBorder=false})=>(
    <div onClick={onClick} style={{
      display:"flex",alignItems:"center",gap:14,
      padding:"14px 20px",cursor:onClick?"pointer":"default",
      borderBottom:noBorder?"none":`1px solid ${A.border}`,
      transition:"background .12s",
    }}
      onMouseEnter={ev=>{if(onClick)ev.currentTarget.style.background=A.surfaceHov;}}
      onMouseLeave={ev=>{ev.currentTarget.style.background="none";}}
    >
      <div style={{
        width:40,height:40,borderRadius:"50%",
        background:`${A.cyan}15`,display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:18,flexShrink:0,
      }}>{icon}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:A.text,fontSize:14,fontWeight:600}}>{label}</div>
        {sub&&<div style={{color:A.textSub,fontSize:12,marginTop:2}}>{sub}</div>}
      </div>
      {right||<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke={A.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
  );

  return (
    <div style={{
      position:"fixed",inset:0,zIndex:1500,
      background:"rgba(0,0,0,.7)",display:"flex",alignItems:"flex-end",justifyContent:"flex-end",
      animation:"fadeIn .2s",
    }} onClick={()=>section==="main"?onClose():setSection("main")}>
      <div style={{
        width:Math.min(400,window.innerWidth),
        height:"100%",
        background:A.dark1,
        display:"flex",flexDirection:"column",
        animation:"slideInR .25s ease",
        overflowY:"auto",
      }} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding:"16px 20px",
          background:A.dark2,
          borderBottom:`1px solid ${A.border}`,
          display:"flex",alignItems:"center",gap:14,
          position:"sticky",top:0,zIndex:2,
        }}>
          <button onClick={()=>section==="main"?onClose():setSection("main")} style={{
            background:"none",border:"none",cursor:"pointer",color:A.cyan,
            display:"flex",alignItems:"center",fontSize:22,padding:"2px 6px 2px 0",
          }}>‹</button>
          <div style={{flex:1}}>
            <div style={{color:A.text,fontWeight:700,fontSize:17}}>
              {section==="main"?"Settings":section==="account"?"Account":section==="privacy"?"Privacy":section==="notifications"?"Notifications":"Settings"}
            </div>
          </div>
        </div>

        {section==="main"&&(
          <>
            {/* My Profile Card */}
            <div style={{
              padding:"24px 20px 20px",
              background:A.dark2,
              borderBottom:`1px solid ${A.border}`,
              display:"flex",alignItems:"center",gap:16,
            }}>
              <div style={{position:"relative"}}>
                <div style={{
                  width:72,height:72,borderRadius:"50%",
                  background:`${MY_PROFILE.color}22`,
                  border:`2px solid ${A.cyan}55`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:26,fontWeight:800,color:A.cyan,
                  boxShadow:`0 0 0 4px ${A.cyan}15`,
                }}>{MY_PROFILE.initials}</div>
                <div style={{
                  position:"absolute",bottom:0,right:0,
                  width:22,height:22,borderRadius:"50%",
                  background:A.cyan,border:`2px solid ${A.dark2}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:12,cursor:"pointer",
                }}>✏</div>
              </div>
              <div style={{flex:1,minWidth:0}}>
                {editingName?(
                  <input autoFocus value={myName} onChange={e=>setMyName(e.target.value)}
                    onBlur={()=>setEditingName(false)}
                    onKeyDown={e=>e.key==="Enter"&&setEditingName(false)}
                    style={{
                      background:"none",border:"none",borderBottom:`1px solid ${A.cyan}`,
                      color:A.text,fontSize:17,fontWeight:700,outline:"none",width:"100%",
                      fontFamily:"inherit",padding:"2px 0",
                    }}/>
                ):(
                  <div style={{
                    color:A.text,fontSize:17,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6,
                  }} onClick={()=>setEditingName(true)}>
                    {myName}
                    <span style={{fontSize:13,color:A.textDim}}>✏</span>
                  </div>
                )}
                {editingAbout?(
                  <input autoFocus value={myAbout} onChange={e=>setMyAbout(e.target.value)}
                    onBlur={()=>setEditingAbout(false)}
                    onKeyDown={e=>e.key==="Enter"&&setEditingAbout(false)}
                    style={{
                      background:"none",border:"none",borderBottom:`1px solid ${A.cyan}33`,
                      color:A.textSub,fontSize:12,outline:"none",width:"100%",
                      fontFamily:"inherit",marginTop:4,padding:"1px 0",
                    }}/>
                ):(
                  <div style={{color:A.textSub,fontSize:12,marginTop:3,cursor:"pointer"}}
                    onClick={()=>setEditingAbout(true)}>
                    {myAbout}
                  </div>
                )}
                <div style={{color:A.textDim,fontSize:11,marginTop:4}}>{MY_PROFILE.phone}</div>
              </div>
            </div>

            {/* Theme Toggle */}
            <div style={{
              padding:"14px 20px",
              background:A.dark2,
              borderBottom:`1px solid ${A.border}`,
              marginTop:12,
            }}>
              <div style={{color:A.textSub,fontSize:11,fontWeight:700,letterSpacing:".8px",marginBottom:10,padding:"0 0 0 54px"}}>APPEARANCE</div>
              <div style={{display:"flex",alignItems:"center",gap:14,padding:"4px 0"}}>
                <div style={{
                  width:40,height:40,borderRadius:"50%",
                  background:`${A.purple}15`,display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:18,flexShrink:0,
                }}>{theme==="dark"?"🌙":"☀️"}</div>
                <div style={{flex:1}}>
                  <div style={{color:A.text,fontSize:14,fontWeight:600}}>{theme==="dark"?"Dark Mode":"Light Mode"}</div>
                  <div style={{color:A.textSub,fontSize:12,marginTop:2}}>{theme==="dark"?"Easy on eyes at night":"Bright and clean"}</div>
                </div>
                <Toggle on={theme==="dark"} onToggle={()=>onThemeChange(theme==="dark"?"light":"dark")}/>
              </div>
              {/* Theme Options */}
              <div style={{display:"flex",gap:10,marginTop:14,padding:"0 0 4px 54px"}}>
                {[["dark","🌙 Dark"],["light","☀️ Light"]].map(([t,l])=>(
                  <button key={t} onClick={()=>onThemeChange(t)} style={{
                    flex:1,padding:"10px 8px",borderRadius:12,border:"none",cursor:"pointer",
                    background:theme===t?`${A.cyan}22`:A.surface,
                    color:theme===t?A.cyan:A.textSub,
                    fontWeight:theme===t?700:500,fontSize:12,
                    outline:theme===t?`1.5px solid ${A.cyan}44`:`1px solid ${A.border}`,
                    transition:"all .15s",
                  }}>{l}</button>
                ))}
              </div>
            </div>

            {/* Settings Rows */}
            <div style={{background:A.dark2,marginTop:12}}>
              <div style={{color:A.textSub,fontSize:11,fontWeight:700,letterSpacing:".8px",padding:"14px 20px 6px 74px"}}>ACCOUNT</div>
              <Row icon="👤" label="Account" sub="Privacy, security, change number" onClick={()=>setSection("account")}/>
              <Row icon="🔒" label="Privacy" sub="Last seen, profile photo, status" onClick={()=>setSection("privacy")}/>
              <Row icon="🔔" label="Notifications" sub="Message, group, call tones" onClick={()=>setSection("notifications")} noBorder/>
            </div>
            <div style={{background:A.dark2,marginTop:12}}>
              <div style={{color:A.textSub,fontSize:11,fontWeight:700,letterSpacing:".8px",padding:"14px 20px 6px 74px"}}>MORE</div>
              <Row icon="💬" label="Chats" sub="Theme, wallpapers, chat history"/>
              <Row icon="💾" label="Storage & Data" sub="Network usage, auto-download"/>
              <Row icon="❓" label="Help" sub="FAQ, contact us, privacy policy" noBorder/>
            </div>
            <div style={{background:A.dark2,marginTop:12,padding:"4px 0 8px"}}>
              <button style={{
                width:"100%",padding:"14px 20px",background:"none",border:"none",cursor:"pointer",
                color:A.red,fontSize:14,fontWeight:600,textAlign:"left",display:"flex",alignItems:"center",gap:14,
              }}>
                <div style={{width:40,height:40,borderRadius:"50%",background:`${A.red}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🚪</div>
                Log Out
              </button>
            </div>
            <div style={{color:A.textDim,fontSize:11,textAlign:"center",padding:"20px",lineHeight:1.8}}>
              Aether v1.0.0 · <span style={{color:A.cyan}}>Check for updates</span>
            </div>
          </>
        )}

        {section==="account"&&(
          <div style={{padding:"20px"}}>
            <div style={{color:A.textSub,fontSize:12,marginBottom:20}}>Manage your account info and security settings.</div>
            {[
              {l:"Name",v:myName,icon:"✏️"},
              {l:"Phone number",v:MY_PROFILE.phone,icon:"📱"},
              {l:"About",v:myAbout,icon:"💬"},
              {l:"Email",v:"Not set",icon:"📧"},
            ].map(({l,v,icon})=>(
              <div key={l} style={{
                padding:"14px 16px",background:A.dark2,borderRadius:14,marginBottom:10,
                border:`1px solid ${A.border}`,display:"flex",alignItems:"center",gap:12,
              }}>
                <span style={{fontSize:18}}>{icon}</span>
                <div style={{flex:1}}>
                  <div style={{color:A.textSub,fontSize:11,marginBottom:3}}>{l}</div>
                  <div style={{color:A.text,fontSize:14,fontWeight:500}}>{v}</div>
                </div>
              </div>
            ))}
            <div style={{marginTop:16,padding:"14px 16px",background:`${A.red}08`,borderRadius:14,border:`1px solid ${A.red}22`}}>
              <div style={{color:A.red,fontWeight:700,fontSize:14,marginBottom:4}}>⚠️ Danger Zone</div>
              <div style={{color:A.textSub,fontSize:12,marginBottom:12}}>These actions are permanent and cannot be undone.</div>
              <button style={{
                width:"100%",padding:"10px",borderRadius:10,border:`1px solid ${A.red}44`,
                background:`${A.red}11`,color:A.red,fontSize:13,fontWeight:600,cursor:"pointer",
              }}>Delete My Account</button>
            </div>
          </div>
        )}

        {section==="privacy"&&(
          <div style={{padding:"20px"}}>
            {[
              {l:"Last seen",opts:["everyone","my contacts","nobody"],val:lastSeen,set:setLastSeen},
              {l:"Profile photo",opts:["everyone","my contacts","nobody"],val:dpPrivacy,set:setDpPrivacy},
            ].map(({l,opts,val,set})=>(
              <div key={l} style={{marginBottom:16,background:A.dark2,borderRadius:14,padding:"16px",border:`1px solid ${A.border}`}}>
                <div style={{color:A.textSub,fontSize:12,marginBottom:10,fontWeight:600}}>{l}</div>
                <div style={{display:"flex",gap:8}}>
                  {opts.map(o=>(
                    <button key={o} onClick={()=>set(o)} style={{
                      flex:1,padding:"8px 4px",borderRadius:10,border:"none",cursor:"pointer",
                      background:val===o?`${A.cyan}20`:A.surface,
                      color:val===o?A.cyan:A.textSub,
                      fontWeight:val===o?700:400,fontSize:11,
                      outline:val===o?`1.5px solid ${A.cyan}44`:`1px solid ${A.border}`,
                    }}>{o.charAt(0).toUpperCase()+o.slice(1)}</button>
                  ))}
                </div>
              </div>
            ))}
            <div style={{background:A.dark2,borderRadius:14,padding:"16px",border:`1px solid ${A.border}`}}>
              <div style={{color:A.textSub,fontSize:12,marginBottom:14,fontWeight:600}}>Status</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{color:A.text,fontSize:14,fontWeight:500}}>Read receipts</div>
                  <div style={{color:A.textSub,fontSize:11,marginTop:2}}>Show 🔵 ticks when messages are read</div>
                </div>
                <Toggle on={true} onToggle={()=>{}}/>
              </div>
            </div>
          </div>
        )}

        {section==="notifications"&&(
          <div style={{padding:"20px"}}>
            {[
              {l:"Message notifications",sub:"Show notifications for new messages",on:notifMsgs,set:setNotifMsgs,icon:"💬"},
              {l:"Notification sounds",sub:"Play sound for new messages",on:notifSound,set:setNotifSound,icon:"🔔"},
              {l:"Vibration",sub:"Vibrate for notifications",on:true,set:()=>{},icon:"📳"},
            ].map(({l,sub,on,set,icon})=>(
              <div key={l} style={{
                display:"flex",alignItems:"center",gap:14,padding:"14px 16px",
                background:A.dark2,borderRadius:14,marginBottom:10,border:`1px solid ${A.border}`,
              }}>
                <div style={{
                  width:40,height:40,borderRadius:"50%",background:`${A.cyan}15`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,
                }}>{icon}</div>
                <div style={{flex:1}}>
                  <div style={{color:A.text,fontSize:14,fontWeight:600}}>{l}</div>
                  <div style={{color:A.textSub,fontSize:11,marginTop:2}}>{sub}</div>
                </div>
                <Toggle on={on} onToggle={()=>set(s=>!s)}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({convs,activeId,onSelect,onNew,unread,onSettings,onStatusView,onCall}) {
  const A = useA();
  const [q,setQ] = useState("");
  const [tab,setTab] = useState("all");
  const [navTab,setNavTab] = useState("chats"); // "chats" | "calls" | "alerts"

  const list = convs.filter(c=>{
    const nm=convName(c).toLowerCase();
    if(q&&!nm.includes(q.toLowerCase())&&!lastMsg(c)?.text?.toLowerCase().includes(q.toLowerCase())) return false;
    if(tab==="dm"&&c.type!=="dm") return false;
    if(tab==="gr"&&c.type!=="group") return false;
    return true;
  });

  return (
    <div className="aether-sidebar" style={{
      width:330,flexShrink:0,display:"flex",flexDirection:"column",
      background:A.dark2,borderRight:`1px solid ${A.border}`,height:"100%",
    }}>
      <div style={{
        padding:"18px 18px 14px",
        background:`linear-gradient(180deg,${A.dark1} 0%,${A.dark2} 100%)`,
        borderBottom:`1px solid ${A.border}`,
        display:"flex",alignItems:"center",gap:12,
      }}>
        <AetherLogo size={36}/>
        <div style={{flex:1}}>
          <div className="aether-logo-text">AETHER</div>
          <div style={{color:A.textDim,fontSize:10,letterSpacing:"2px",marginTop:1}}>CONNECT. COMMUNICATE. BEYOND.</div>
        </div>
        <button onClick={onNew} style={{
          width:36,height:36,borderRadius:"50%",border:`1px solid ${A.cyan}44`,cursor:"pointer",
          background:A.gradGlow,color:A.cyan,fontSize:20,
          display:"flex",alignItems:"center",justifyContent:"center",
          transition:"box-shadow .2s",
        }}
          onMouseEnter={ev=>ev.currentTarget.style.boxShadow=`0 0 16px ${A.cyan}55`}
          onMouseLeave={ev=>ev.currentTarget.style.boxShadow="none"}
          title="New chat"
        >✏</button>
      </div>

      {navTab==="chats"&&<StatusBar/>}

      {navTab==="calls" ? (
        <CallsScreen onCall={onCall}/>
      ) : navTab==="alerts" ? (
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,padding:"40px 20px",color:A.textDim}}>
          <div style={{fontSize:44}}>🔔</div>
          <div style={{fontSize:15,fontWeight:700,color:A.text}}>No new alerts</div>
          <div style={{fontSize:12,textAlign:"center",lineHeight:1.6}}>You'll see message requests and system notifications here</div>
        </div>
      ) : (
        <>
      <div style={{padding:"10px 14px"}}>
        <div style={{
          display:"flex",gap:8,alignItems:"center",
          background:A.surface,border:`1px solid ${A.border}`,borderRadius:14,
          padding:"9px 14px",transition:"border-color .2s",
        }}
          onFocusCapture={ev=>ev.currentTarget.style.borderColor=A.cyan+"44"}
          onBlurCapture={ev=>ev.currentTarget.style.borderColor=A.border}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="7" stroke={A.textSub} strokeWidth="1.8"/><path d="M15 15l3 3" stroke={A.textSub} strokeWidth="1.8" strokeLinecap="round"/></svg>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search conversations…"
            style={{background:"none",border:"none",outline:"none",color:A.text,fontSize:13,width:"100%",fontFamily:"inherit"}}/>
          {q&&<button onClick={()=>setQ("")} style={{background:"none",border:"none",color:A.textSub,cursor:"pointer",fontSize:14}}>✕</button>}
        </div>
      </div>

      <div style={{display:"flex",gap:6,padding:"0 14px 10px"}}>
        {[["all","All"],["dm","Direct"],["gr","Groups"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{
            padding:"5px 13px",borderRadius:20,border:"none",cursor:"pointer",
            background:tab===k?`linear-gradient(90deg,${A.cyan}22,${A.blue}22)`:A.surface,
            color:tab===k?A.cyan:A.textSub,fontSize:12,fontWeight:600,
            outline:tab===k?`1px solid ${A.cyan}33`:`1px solid transparent`,
            transition:"all .15s",
          }}>{l}</button>
        ))}
      </div>

      <div style={{flex:1,overflowY:"auto"}}>
        {list.length===0&&(
          <div style={{padding:"48px 20px",textAlign:"center",color:A.textDim}}>
            <AetherLogo size={48}/>
            <div style={{marginTop:12,fontSize:14}}>No conversations found</div>
          </div>
        )}
        {list.map(conv=>{
          const lm=lastMsg(conv);
          const isActive=conv.id===activeId;
          return (
            <div key={conv.id} className="sidebar-row" onClick={()=>onSelect(conv.id)}
              style={{
                padding:"11px 16px",cursor:"pointer",display:"flex",gap:12,alignItems:"center",
                background:isActive?`linear-gradient(90deg,${A.cyan}10,${A.blue}08,transparent)`:"none",
                borderLeft:isActive?`3px solid ${A.cyan}`:"3px solid transparent",
                transition:"background .12s",position:"relative",
              }}
            >
              <Avatar initials={convInit(conv)} color={convColor(conv)} size={48} status={convStatus(conv)}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                  <span style={{
                    fontWeight:700,fontSize:14,color:A.text,
                    overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:160,
                  }}>{convName(conv)}</span>
                  {(unread?.[conv.id]||0)>0
                    ? <span className="unread-badge" style={{
                        minWidth:20,height:20,borderRadius:10,padding:"0 6px",
                        background:A.gradMsg,color:"#fff",fontSize:11,fontWeight:700,
                        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
                      }}>{unread[conv.id]}</span>
                    : <span style={{color:A.textDim,fontSize:11,flexShrink:0}}>{lm?.time}</span>
                  }
                </div>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  {lm?.from==="me"&&<Tick status={lm.status}/>}
                  <span style={{
                    color:(unread?.[conv.id]||0)>0?A.text:A.textSub,
                    fontWeight:(unread?.[conv.id]||0)>0?600:400,
                    fontSize:12.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,
                  }}>
                    {lm?.audio?"🎤 Voice message":lm?.file?"📎 "+lm.file.name:
                     conv.type==="group"&&lm?.from!=="me"?`${USERS[lm?.from]?.name?.split(" ")[0]}: ${lm?.text??""}`:
                     lm?.text??""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </>
      )}

      <div style={{
        padding:"10px 0 8px",borderTop:`1px solid ${A.border}`,
        display:"flex",justifyContent:"space-around",
        background:A.dark2,flexShrink:0,
      }}>
        {[
          {i:"💬",l:"Chats",  k:"chats"},
          {i:"📞",l:"Calls",  k:"calls"},
          {i:"🔔",l:"Alerts", k:"alerts"},
          {i:"⚙️",l:"Settings",k:"settings"},
        ].map(b=>{
          const isActive = navTab===b.k;
          return (
            <button key={b.l}
              onClick={()=> b.k==="settings" ? onSettings() : setNavTab(b.k)}
              style={{
                background:"none",border:"none",cursor:"pointer",
                display:"flex",flexDirection:"column",alignItems:"center",gap:3,
                color:isActive?A.cyan:A.textDim,padding:"4px 12px",
                transition:"color .15s",position:"relative",
              }}
            >
              {isActive&&b.k!=="settings"&&(
                <div style={{
                  position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",
                  width:28,height:3,borderRadius:2,background:A.cyan,
                }}/>
              )}
              <span style={{fontSize:20}}>{b.i}</span>
              <span style={{fontSize:9,fontWeight:700,letterSpacing:".3px"}}>{b.l}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── CHAT HEADER ───────────────────────────────────────────────────────────────
function ChatHeader({conv,onCall,onToggleInfo,showInfo,disappearing,onToggleDisappearing,onBack}) {
  const A = useA();
  const status=convStatus(conv);
  const sub=conv.type==="group"
    ?`${conv.participants.length+1} members, ${conv.participants.filter(id=>USERS[id]?.status==="online").length+1} online`
    :status==="online"?"Active now":status==="away"?"Away":"Offline";

  return (
    <div style={{flexShrink:0}}>
      <div style={{
        padding:"12px 20px",borderBottom:`1px solid ${A.border}`,
        background:A.dark2,display:"flex",alignItems:"center",gap:12,
        boxShadow:`0 2px 12px rgba(0,0,0,.2)`,
      }}>
        {onBack&&(
          <button onClick={onBack} style={{
            background:"none",border:"none",cursor:"pointer",padding:"6px 4px",
            color:A.cyan,display:"flex",alignItems:"center",flexShrink:0,
            borderRadius:8,marginLeft:-4,
          }} title="Back to chats" aria-label="Back">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <Avatar initials={convInit(conv)} color={convColor(conv)} size={44} status={convStatus(conv)} glow/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{color:A.text,fontWeight:700,fontSize:16}}>{convName(conv)}</div>
          <div style={{
            fontSize:12,marginTop:1,fontWeight:500,
            color:status==="online"?A.green:status==="away"?A.yellow:A.textSub,
          }}>{sub}</div>
        </div>
        <div style={{display:"flex",gap:4,flexShrink:0}}>
          <IBtn onClick={onToggleDisappearing} title={disappearing?"Disappearing: ON":"Disappearing messages"} active={disappearing}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IBtn>
          <IBtn onClick={()=>onCall("voice")} title="Voice call">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.39 10.8 19.79 19.79 0 01.31 2.18 2 2 0 012.3 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
          </IBtn>
          <IBtn onClick={()=>onCall("video")} title="Video call">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
          </IBtn>
          <IBtn onClick={onToggleInfo} title="Contact info" active={showInfo}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </IBtn>
          <IBtn title="More">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>
          </IBtn>
        </div>
      </div>

      {/* Pinned message banner */}
      {conv.pinned&&(
        <div style={{
          display:"flex",alignItems:"center",gap:10,
          background:`linear-gradient(90deg,${A.cyan}10,${A.blue}08,transparent)`,
          borderBottom:`1px solid ${A.borderGlow}`,
          padding:"8px 20px",cursor:"pointer",
        }}>
          <span style={{fontSize:14,flexShrink:0}}>📌</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{color:A.cyan,fontSize:10,fontWeight:700,letterSpacing:"0.5px",marginBottom:1}}>PINNED MESSAGE</div>
            <div style={{color:A.textSub,fontSize:12.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{conv.pinned}</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{flexShrink:0,color:A.textDim}}><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      )}

      {/* Disappearing messages banner */}
      {disappearing&&(
        <div style={{
          display:"flex",alignItems:"center",gap:8,
          background:`${A.purple}14`,borderBottom:`1px solid ${A.purple}22`,
          padding:"7px 20px",
        }}>
          <svg className="disappearing-tick" width="13" height="13" viewBox="0 0 24 24" fill="none" style={{color:A.purple,flexShrink:0}}>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{color:A.purple,fontSize:12,fontWeight:600}}>Disappearing messages ON</span>
          <span style={{color:A.textDim,fontSize:11,marginLeft:2}}>· Messages will vanish after 24h</span>
        </div>
      )}
    </div>
  );
}

// ── MSG BUBBLE ────────────────────────────────────────────────────────────────
function MsgBubble({msg,conv,prevFrom,onReact,onCtx,onImgClick,onReply}) {
  const A = useA();
  const isMe = msg.from==="me";
  const sender = USERS[msg.from];
  const grouped = prevFrom===msg.from;
  const showName = conv.type==="group"&&!isMe&&!grouped;
  const [hov,setHov] = useState(false);
  const [showReact,setShowReact] = useState(false);

  const reactions={};
  (msg.reactions||[]).forEach(r=>{reactions[r.emoji]=(reactions[r.emoji]||[]);reactions[r.emoji].push(r.from);});

  return (
    <div className={isMe?"msg-out":"msg-in"} style={{
      display:"flex",flexDirection:isMe?"row-reverse":"row",
      gap:8,marginBottom:grouped?2:8,marginTop:showName?12:0,
      alignItems:"flex-end",position:"relative",
    }}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>{setHov(false);setShowReact(false);}}
    >
      {conv.type==="group"&&!isMe&&(
        <div style={{width:32,flexShrink:0,alignSelf:"flex-end"}}>
          {!grouped&&<Avatar initials={sender?.initials} color={sender?.color} size={32}/>}
        </div>
      )}

      <div style={{maxWidth:"60%",display:"flex",flexDirection:"column",alignItems:isMe?"flex-end":"flex-start",position:"relative"}}>
        {showName&&(
          <span style={{fontSize:12,fontWeight:700,color:sender?.color,marginBottom:3,marginLeft:13}}>
            {sender?.name}
          </span>
        )}

        <div onContextMenu={e=>{e.preventDefault();onCtx(e,msg);}} style={{
          background: isMe ? A.bubbleSent : A.surfaceHi,
          borderRadius: isMe
            ?(grouped?"16px 4px 4px 16px":"20px 20px 4px 20px")
            :(grouped?"4px 20px 20px 4px":"20px 20px 20px 4px"),
          overflow:"hidden",cursor:"pointer",
          boxShadow: isMe?`0 4px 20px ${A.cyan}22`:`0 2px 8px rgba(0,0,0,.2)`,
          border: isMe?"none":`1px solid ${A.border}`,
        }}>
          {msg.image&&(
            <div onClick={()=>onImgClick(msg.image)} style={{cursor:"zoom-in"}}>
              <img src={msg.image} alt="media" style={{display:"block",maxWidth:260,maxHeight:190,objectFit:"cover"}}/>
            </div>
          )}

          {msg.file&&<div style={{padding:"8px 10px"}}><FileBubble file={msg.file} isMe={isMe}/></div>}

          {msg.audio&&<div style={{padding:"6px"}}><AudioBubble dur={msg.audioDur||"0:00"} isMe={isMe}/></div>}

          {msg.text&&(
            <div style={{padding:`${msg.image||msg.file||msg.audio?"6px":"10px"} 14px 10px`,fontSize:14,lineHeight:1.55,color:isMe?A.white:A.text,wordBreak:"break-word"}}>
              {msg.reply&&(
                <div style={{
                  borderLeft:`3px solid ${isMe?"rgba(255,255,255,.5)":A.cyan}`,
                  color:isMe?"rgba(255,255,255,.7)":A.textSub,fontSize:12,
                  background:isMe?"rgba(255,255,255,.08)":A.surface,
                  borderRadius:"0 8px 8px 0",padding:"5px 8px",marginBottom:8,
                }}>
                  <div style={{fontWeight:700,marginBottom:2,color:isMe?"rgba(255,255,255,.9)":A.cyan}}>
                    {msg.reply.from==="me"?"You":USERS[msg.reply.from]?.name?.split(" ")[0]}
                  </div>
                  {msg.reply.text}
                </div>
              )}
              {msg.text}
            </div>
          )}
        </div>

        {Object.keys(reactions).length>0&&(
          <div style={{display:"flex",gap:3,marginTop:4,flexWrap:"wrap",justifyContent:isMe?"flex-end":"flex-start"}}>
            {Object.entries(reactions).map(([e,froms])=>(
              <div key={e} onClick={()=>onReact(msg.id,e)} style={{
                background:A.surfaceHi,border:`1px solid ${A.cyan}33`,borderRadius:12,
                padding:"2px 8px",fontSize:13,cursor:"pointer",
                display:"flex",alignItems:"center",gap:3,transition:"transform .1s",
              }}
                onMouseEnter={ev=>ev.currentTarget.style.transform="scale(1.1)"}
                onMouseLeave={ev=>ev.currentTarget.style.transform="scale(1)"}
              >{e}<span style={{fontSize:11,color:A.textSub}}>{froms.length}</span></div>
            ))}
          </div>
        )}

        <div style={{display:"flex",alignItems:"center",gap:5,marginTop:3,paddingInline:4}}>
          {msg.disappearing&&(
            <svg className="disappearing-tick" width="11" height="11" viewBox="0 0 24 24" fill="none"
              style={{color:isMe?"rgba(255,255,255,.6)":A.purple,flexShrink:0}}
              title="Disappearing message">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2"/>
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          )}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
            title="End-to-end encrypted" style={{flexShrink:0,opacity:.55}}>
            <rect x="3" y="11" width="18" height="11" rx="2" stroke={isMe?"rgba(255,255,255,.8)":A.textDim} strokeWidth="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4" stroke={isMe?"rgba(255,255,255,.8)":A.textDim} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{fontSize:10.5,color:A.textDim}}>{msg.time}</span>
          {isMe&&<Tick status={msg.status}/>}
        </div>
      </div>

      {hov&&(
        <div style={{
          alignSelf:"center",display:"flex",gap:2,
          order:isMe?-1:99,position:"relative",
        }}>
          {showReact&&<ReactBar onReact={e=>{onReact(msg.id,e);setShowReact(false);}}/>}
          <button onClick={()=>setShowReact(s=>!s)} className="icon-btn" style={{
            width:28,height:28,borderRadius:14,border:"none",cursor:"pointer",
            background:A.surfaceHi,color:A.textSub,fontSize:14,
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>😊</button>
          <button onClick={()=>onReply(msg)} className="icon-btn" style={{
            width:28,height:28,borderRadius:14,border:"none",cursor:"pointer",
            background:A.surfaceHi,color:A.textSub,fontSize:13,
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>↩</button>
        </div>
      )}
    </div>
  );
}

// ── REPLY BANNER ─────────────────────────────────────────────────────────────
function ReplyBanner({msg,onCancel}) {
  const A = useA();
  const name=msg.from==="me"?"You":USERS[msg.from]?.name?.split(" ")[0];
  return (
    <div style={{
      padding:"8px 16px",background:A.surface,
      borderTop:`1px solid ${A.border}`,
      display:"flex",alignItems:"center",gap:10,
      borderLeft:`3px solid ${A.cyan}`,
    }}>
      <div style={{flex:1}}>
        <div style={{fontSize:12,fontWeight:700,color:A.cyan,marginBottom:2}}>↩ Replying to {name}</div>
        <div style={{fontSize:12,color:A.textSub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
          {msg.audio?"🎤 Voice message":msg.file?"📎 "+msg.file.name:msg.text}
        </div>
      </div>
      <IBtn onClick={onCancel} title="Cancel" sz={28}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
      </IBtn>
    </div>
  );
}

// ── CHAT WINDOW ───────────────────────────────────────────────────────────────
function ChatWindow({conv,onSend,onReact,onCall,showInfo,onToggleInfo,disappearing,onToggleDisappearing,onBack}) {
  const A = useA();
  const [input,setInput] = useState("");
  const [showEmoji,setShowEmoji] = useState(false);
  const [typing,setTyping] = useState(false);
  const [replyTo,setReplyTo] = useState(null);
  const [ctx,setCtx] = useState(null);
  const [lightbox,setLightbox] = useState(null);
  const [recording,setRecording] = useState(false);
  const [aiDismissed,setAiDismissed] = useState(false);
  const bottomRef = useRef();
  const tyRef = useRef();
  const fileRef = useRef();

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[conv.messages.length,conv.id]);
  useEffect(()=>{setInput("");setReplyTo(null);setAiDismissed(false);},[conv.id]);

  function handleInput(e){
    setInput(e.target.value);
    setTyping(true);
    clearTimeout(tyRef.current);
    tyRef.current=setTimeout(()=>setTyping(false),1500);
  }
  function handleKey(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}
  function handleFile(e){
    const file=e.target.files?.[0];
    if(!file) return;
    if(file.type.startsWith("image/")){
      const url=URL.createObjectURL(file);
      onSend(conv.id,file.name,null,url,null);
    } else {
      onSend(conv.id,null,null,null,{name:file.name,size:`${(file.size/1024/1024).toFixed(1)} MB`,type:file.type});
    }
    e.target.value="";
  }

  function send(){
    const t=input.trim();
    if(!t) return;
    onSend(conv.id,t,replyTo,null,null,disappearing);
    setInput("");setReplyTo(null);setTyping(false);setShowEmoji(false);
  }

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",height:"100%",background:A.dark1,minWidth:0,position:"relative"}}>
      <ChatHeader conv={conv} onCall={onCall} onToggleInfo={onToggleInfo} showInfo={showInfo}
        disappearing={disappearing} onToggleDisappearing={onToggleDisappearing} onBack={onBack}/>

      <div className="aether-chat-pad" style={{
        flex:1,overflowY:"auto",padding:"20px 32px",
        background:`radial-gradient(ellipse at 20% 20%,${A.cyan}05 0%,transparent 50%),radial-gradient(ellipse at 80% 80%,${A.purple}05 0%,transparent 50%),${A.dark1}`,
      }}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <span style={{
            background:A.surfaceHi,color:A.textSub,fontSize:11,
            padding:"4px 16px",borderRadius:20,border:`1px solid ${A.border}`,
          }}>Today</span>
        </div>

        {!aiDismissed && (()=>{
          const incoming=conv.messages.filter(m=>m.from!=="me").at(-1);
          const sr=smartReply(incoming);
          return (
            <div style={{
              display:"flex",alignItems:"center",gap:10,
              background:`linear-gradient(90deg,${A.blue}15,${A.purple}15)`,
              border:`1px solid ${A.blue}33`,borderRadius:12,padding:"10px 16px",
              marginBottom:20,animation:"fadeUp .3s ease",
            }}>
              <span style={{fontSize:18}}>🤖</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{color:A.blue,fontSize:11,fontWeight:700,letterSpacing:".4px"}}>AI SMART REPLY</div>
                <div style={{color:A.text,fontSize:12,marginTop:2,fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>"{sr.text}"</div>
              </div>
              <button style={{
                background:`${A.blue}22`,border:`1px solid ${A.blue}44`,borderRadius:8,
                padding:"5px 13px",color:A.blue,fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0,
              }} onClick={()=>{onSend(conv.id,sr.text,null);setAiDismissed(true);}}>Use</button>
              <button onClick={()=>setAiDismissed(true)} style={{
                background:"none",border:"none",cursor:"pointer",
                color:A.textDim,fontSize:16,padding:"2px 4px",flexShrink:0,lineHeight:1,
              }}>✕</button>
            </div>
          );
        })()}

        {conv.messages.map((msg,i)=>(
          <MsgBubble
            key={msg.id} msg={msg} conv={conv}
            prevFrom={conv.messages[i-1]?.from}
            onReact={(msgId,emoji)=>onReact(conv.id,msgId,emoji)}
            onCtx={(e,m)=>setCtx({x:Math.min(e.clientX,window.innerWidth-200),y:Math.min(e.clientY,window.innerHeight-220),msg:m})}
            onImgClick={setLightbox}
            onReply={m=>setReplyTo(m)}
          />
        ))}

        {typing&&(
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8,animation:"fadeUp .2s ease"}}>
            {conv.type==="group"&&<div style={{width:32}}/>}
            <div style={{
              background:A.surfaceHi,borderRadius:"18px 18px 18px 4px",
              padding:"11px 16px",display:"flex",gap:5,alignItems:"center",
              border:`1px solid ${A.border}`,
            }}>
              {[0,1,2].map(i=>(
                <div key={i} style={{
                  width:7,height:7,borderRadius:"50%",
                  background:`linear-gradient(135deg,${A.cyan},${A.blue})`,
                  animation:`bounce 1.2s ease infinite ${i*.18}s`,
                }}/>
              ))}
            </div>
            <span style={{fontSize:11,color:A.textDim}}>typing…</span>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {replyTo&&<ReplyBanner msg={replyTo} onCancel={()=>setReplyTo(null)}/>}

      <div style={{
        padding:"12px 16px",borderTop:`1px solid ${A.border}`,
        background:A.dark2,display:"flex",alignItems:"flex-end",gap:8,flexShrink:0,
      }}>
        <input ref={fileRef} type="file" accept="*/*" style={{display:"none"}} onChange={handleFile}/>

        <IBtn onClick={()=>fileRef.current?.click()} title="Attach file" sz={40}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.42 16.41a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </IBtn>

        <IBtn onClick={()=>fileRef.current?.click()} title="Camera" sz={40}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.8"/></svg>
        </IBtn>

        <div style={{position:"relative",flexShrink:0}}>
          <IBtn onClick={()=>setShowEmoji(s=>!s)} title="Emoji" active={showEmoji} sz={40}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="9" cy="10" r="1.1" fill="currentColor"/><circle cx="15" cy="10" r="1.1" fill="currentColor"/>
            </svg>
          </IBtn>
          {showEmoji&&<EmojiPanel onPick={e=>{setInput(i=>i+e);}}/>}
        </div>

        <div style={{flex:1,position:"relative"}}>
          <textarea value={input} onChange={handleInput} onKeyDown={handleKey}
            placeholder="Message…" rows={1}
            style={{
              width:"100%",background:A.surface,border:`1px solid ${A.border}`,
              borderRadius:16,padding:"11px 16px",color:A.text,
              fontSize:14,resize:"none",outline:"none",fontFamily:"inherit",
              lineHeight:1.5,maxHeight:120,overflowY:"auto",display:"block",
              transition:"border-color .2s",
            }}
            onFocus={ev=>ev.target.style.borderColor=A.cyan+"55"}
            onBlur={ev=>ev.target.style.borderColor=A.border}
          />
        </div>

        <IBtn onClick={()=>setRecording(r=>!r)} title="Voice message" active={recording} sz={40}>
          {recording
            ?<div style={{width:14,height:14,borderRadius:3,background:A.red}}/>
            :<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          }
        </IBtn>

        <button onClick={send} disabled={!input.trim()} className={input.trim()?"send-btn":""} style={{
          width:44,height:44,borderRadius:"50%",border:"none",
          background:input.trim()?undefined:A.surfaceHi,
          cursor:input.trim()?"pointer":"not-allowed",
          display:"flex",alignItems:"center",justifyContent:"center",
          flexShrink:0,
          opacity:input.trim()?1:.5,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {ctx&&<CtxMenu
        x={ctx.x} y={ctx.y} isMe={ctx.msg.from==="me"}
        onCopy={()=>navigator.clipboard?.writeText(ctx.msg.text||"")}
        onReply={()=>setReplyTo(ctx.msg)}
        onDelete={()=>{}}
        onClose={()=>setCtx(null)}
      />}

      {lightbox&&<ImageModal src={lightbox} onClose={()=>setLightbox(null)}/>}
    </div>
  );
}

// ── EMPTY STATE ───────────────────────────────────────────────────────────────
function EmptyState({onNew}) {
  const A = useA();
  return (
    <div style={{
      flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      background:`radial-gradient(ellipse at center,${A.blue}08 0%,transparent 65%),${A.dark1}`,
      gap:20,position:"relative",overflow:"hidden",
    }}>
      {[200,280,380].map((r,i)=>(
        <div key={i} style={{
          position:"absolute",width:r,height:r,borderRadius:"50%",
          border:`1px solid ${[A.cyan,A.blue,A.purple][i]}14`,
          animation:`spin ${20+i*10}s linear infinite`,
          pointerEvents:"none",
        }}/>
      ))}
      <div style={{position:"relative",zIndex:1,textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
        <AetherLogo size={80}/>
        <div>
          <div className="aether-logo-text" style={{fontSize:28}}>AETHER</div>
          <div style={{color:A.textDim,fontSize:13,letterSpacing:"2px",marginTop:4}}>CONNECT. COMMUNICATE. BEYOND.</div>
        </div>
        <div style={{color:A.textSub,fontSize:14,textAlign:"center",maxWidth:300,lineHeight:1.6}}>
          Select a conversation to start messaging, or create a new one.
        </div>
        <button onClick={onNew} style={{
          padding:"13px 32px",borderRadius:30,border:"none",cursor:"pointer",
          fontWeight:700,fontSize:14,color:"#fff",marginTop:8,
          boxShadow:`0 6px 28px ${A.cyan}44`,
        }} className="send-btn">+ New Conversation</button>

        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginTop:4}}>
          {["🛡️ E2E Encrypted","🤖 AI Assistant","⚡ Blazing Fast","☁️ Cloud Backup"].map(f=>(
            <span key={f} style={{
              background:A.surfaceHi,border:`1px solid ${A.border}`,borderRadius:20,
              padding:"5px 12px",fontSize:11,color:A.textSub,
            }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SPLASH SCREEN ─────────────────────────────────────────────────────────────
function SplashScreen({onDone}) {
  const A = useA();
  const [fading,setFading] = useState(false);
  useEffect(()=>{
    const t1=setTimeout(()=>setFading(true),2200);
    const t2=setTimeout(()=>onDone(),2750);
    return()=>{clearTimeout(t1);clearTimeout(t2);};
  },[]);
  return (
    <div style={{
      position:"fixed",inset:0,zIndex:9999,background:A.dark1,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      transition:"opacity .55s ease",opacity:fading?0:1,pointerEvents:fading?"none":"auto",
    }}>
      {[260,370,490].map((r,i)=>(
        <div key={i} style={{
          position:"absolute",width:r,height:r,borderRadius:"50%",
          border:`1px solid ${[A.cyan,A.blue,A.purple][i]}${["22","18","12"][i]}`,
          animation:`spin ${17+i*8}s linear infinite`,pointerEvents:"none",
        }}/>
      ))}
      <div style={{
        position:"absolute",width:220,height:220,borderRadius:"50%",
        background:`radial-gradient(circle,${A.cyan}22 0%,transparent 70%)`,
        filter:"blur(40px)",animation:"splashPulse 2.5s ease-in-out infinite",
      }}/>
      <div className="splash-logo" style={{position:"relative",zIndex:1,marginBottom:30}}>
        <AetherLogo size={108}/>
      </div>
      <div className="aether-logo-text" style={{fontSize:34,letterSpacing:8,zIndex:1,marginBottom:10}}>AETHER</div>
      <div style={{color:A.textDim,fontSize:11,letterSpacing:"3px",zIndex:1}}>CONNECT. COMMUNICATE. BEYOND.</div>
      <div style={{
        position:"absolute",bottom:48,display:"flex",gap:8,zIndex:1,
      }}>
        {[0,1,2].map(i=>(
          <div key={i} style={{
            width:6,height:6,borderRadius:"50%",
            background:`linear-gradient(135deg,${A.cyan},${A.blue})`,
            animation:`bounce 1.4s ease-in-out infinite ${i*.22}s`,
          }}/>
        ))}
      </div>
    </div>
  );
}

// ── LOGIN SCREEN ──────────────────────────────────────────────────────────────
function LoginScreen({onLogin}) {
  const A = useA();
  const [phone,setPhone]   = useState("");
  const [step,setStep]     = useState("phone");
  const [otp,setOtp]       = useState("");
  const [sending,setSending] = useState(false);

  const phoneDigits = phone.replace(/\D/g,"");

  function handleSend(){
    if(phoneDigits.length<10) return;
    setSending(true);
    setTimeout(()=>{setSending(false);setStep("otp");},1200);
  }
  function handleVerify(){
    if(otp.length<4) return;
    onLogin();
  }

  return (
    <div style={{
      position:"fixed",inset:0,zIndex:9998,background:A.dark1,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      padding:24,overflow:"hidden",
    }}>
      <div style={{
        position:"absolute",top:"28%",left:"50%",transform:"translate(-50%,-50%)",
        width:440,height:440,borderRadius:"50%",
        background:`radial-gradient(circle,${A.blue}14 0%,transparent 70%)`,
        filter:"blur(70px)",pointerEvents:"none",
      }}/>
      <div className="login-card" style={{
        width:"100%",maxWidth:388,zIndex:1,
        display:"flex",flexDirection:"column",alignItems:"center",
      }}>
        <div style={{marginBottom:22}}><AetherLogo size={70}/></div>
        <div className="aether-logo-text" style={{fontSize:26,letterSpacing:6,marginBottom:6}}>AETHER</div>
        <div style={{color:A.textDim,fontSize:11,letterSpacing:"2px",marginBottom:36}}>CONNECT. COMMUNICATE. BEYOND.</div>

        <div style={{
          width:"100%",background:A.dark2,borderRadius:24,
          border:`1px solid ${A.border}`,padding:"30px 26px",
          boxShadow:`0 24px 64px rgba(0,0,0,.45),0 0 80px ${A.cyan}08`,
        }}>
          {step==="phone" ? (
            <>
              <div style={{color:A.text,fontSize:18,fontWeight:700,marginBottom:5}}>Enter Phone Number</div>
              <div style={{color:A.textSub,fontSize:13,marginBottom:22}}>We'll send a verification code</div>
              <div style={{
                display:"flex",alignItems:"center",
                background:A.surface,border:`1px solid ${A.border}`,
                borderRadius:14,overflow:"hidden",marginBottom:18,transition:"border-color .2s",
              }}
                onFocusCapture={ev=>ev.currentTarget.style.borderColor=A.cyan+"55"}
                onBlurCapture={ev=>ev.currentTarget.style.borderColor=A.border}
              >
                <div style={{
                  padding:"14px 14px",color:A.textSub,fontSize:14,fontWeight:600,
                  borderRight:`1px solid ${A.border}`,background:A.surfaceHi,whiteSpace:"nowrap",
                }}>🌐 +1</div>
                <input type="tel" value={phone}
                  onChange={e=>setPhone(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&handleSend()}
                  placeholder="(555) 000-0000"
                  style={{
                    flex:1,background:"none",border:"none",outline:"none",
                    padding:"14px 14px",color:A.text,fontSize:15,fontFamily:"inherit",
                  }}
                />
              </div>
              <button onClick={handleSend}
                disabled={sending||phoneDigits.length<10}
                className={phoneDigits.length>=10&&!sending?"shimmer-btn":""}
                style={{
                  width:"100%",padding:"15px",borderRadius:14,border:"none",
                  cursor:phoneDigits.length>=10&&!sending?"pointer":"not-allowed",
                  color:"#fff",fontSize:15,fontWeight:700,
                  background:phoneDigits.length<10||sending?A.surfaceHi:undefined,
                  opacity:phoneDigits.length<10?0.45:1,transition:"opacity .2s",
                }}
              >{sending?"Sending OTP…":"Continue →"}</button>
            </>
          ):(
            <>
              <button onClick={()=>{setStep("phone");setOtp("");}} style={{
                background:"none",border:"none",color:A.textSub,cursor:"pointer",
                fontSize:13,display:"flex",alignItems:"center",gap:6,marginBottom:18,padding:0,
              }}>← Back</button>
              <div style={{color:A.text,fontSize:18,fontWeight:700,marginBottom:5}}>Verify OTP</div>
              <div style={{color:A.textSub,fontSize:13,marginBottom:22}}>
                Code sent to <span style={{color:A.cyan}}>{phone}</span>
              </div>
              <input type="text" maxLength={6} value={otp}
                onChange={e=>setOtp(e.target.value.replace(/\D/g,""))}
                onKeyDown={e=>e.key==="Enter"&&handleVerify()}
                placeholder="• • • • • •"
                style={{
                  width:"100%",background:A.surface,border:`1px solid ${A.border}`,
                  borderRadius:14,padding:"18px 16px",color:A.text,fontSize:26,
                  fontWeight:700,letterSpacing:16,textAlign:"center",outline:"none",
                  fontFamily:"monospace",marginBottom:18,transition:"border-color .2s",
                }}
                onFocus={ev=>ev.target.style.borderColor=A.cyan+"66"}
                onBlur={ev=>ev.target.style.borderColor=A.border}
              />
              <button onClick={handleVerify} disabled={otp.length<4}
                className={otp.length>=4?"shimmer-btn":""}
                style={{
                  width:"100%",padding:"15px",borderRadius:14,border:"none",
                  cursor:otp.length>=4?"pointer":"not-allowed",
                  color:"#fff",fontSize:15,fontWeight:700,
                  background:otp.length<4?A.surfaceHi:undefined,
                  opacity:otp.length<4?0.45:1,transition:"opacity .2s",
                }}
              >Verify &amp; Enter Aether</button>
              <div style={{textAlign:"center",marginTop:14}}>
                <button onClick={()=>{setSending(true);setTimeout(()=>setSending(false),1000);}} style={{
                  background:"none",border:"none",color:A.textSub,fontSize:12,cursor:"pointer",
                }}>Resend code</button>
              </div>
            </>
          )}
        </div>

        <div style={{marginTop:18,color:A.textDim,fontSize:11,textAlign:"center",lineHeight:1.8}}>
          By continuing you agree to Aether's{" "}
          <span style={{color:A.cyan,cursor:"pointer"}}>Terms of Service</span> &amp;{" "}
          <span style={{color:A.cyan,cursor:"pointer"}}>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,setScreen]   = useState("splash");   // "splash" | "login" | "app"
  const [convs,setConvs]     = useState(SEED);
  const [activeId,setActiveId] = useState(null);
  const [showNew,setShowNew] = useState(false);
  const [callState,setCallState] = useState(null);
  const [showInfo,setShowInfo]   = useState(false);
  const [unread,setUnread]   = useState({});          // { [convId]: number }
  const [disappearSet,setDisappearSet] = useState(new Set()); // convIds with disappearing ON
  const [isMobile,setIsMobile] = useState(()=>window.innerWidth<=768);
  const [theme,setTheme] = useState("dark");          // "dark" | "light"
  const [showSettings,setShowSettings] = useState(false);
  const themeTokens = theme==="dark" ? A : LIGHT_A;
  const activeIdRef = useRef(activeId);
  useEffect(()=>{activeIdRef.current=activeId;},[activeId]);
  useEffect(()=>{
    const handle=()=>setIsMobile(window.innerWidth<=768);
    window.addEventListener("resize",handle);
    return ()=>window.removeEventListener("resize",handle);
  },[]);

  const active = convs.find(c=>c.id===activeId);

  function selectConv(id){
    setActiveId(id);
    setShowInfo(false);
    setUnread(p=>({...p,[id]:0}));
  }

  function sendMsg(convId,text,replyTo=null,imageUrl=null,fileObj=null,isDisappearing=false){
    const newMsg={
      id:uid(),from:"me",text,time:fmtTime(),status:"sending",
      ...(isDisappearing?{disappearing:true}:{}),
      ...(replyTo?{reply:{from:replyTo.from,text:replyTo.text||""}}:{}),
      ...(imageUrl?{image:imageUrl}:{}),
      ...(fileObj?{file:fileObj,text:null}:{}),
    };
    setConvs(p=>p.map(c=>c.id!==convId?c:{...c,messages:[...c.messages,newMsg]}));
    setTimeout(()=>setConvs(p=>p.map(c=>c.id!==convId?c:{...c,messages:c.messages.map(m=>m.id===newMsg.id?{...m,status:"delivered"}:m)})),700);
    setTimeout(()=>{
      setConvs(p=>p.map(c=>{
        if(c.id!==convId) return c;
        const reply=REPLIES[Math.floor(Math.random()*REPLIES.length)];
        const resp=c.type==="group"?c.participants[Math.floor(Math.random()*c.participants.length)]:c.participants[0];
        const replyMsg={id:uid(),from:resp,text:reply,time:fmtTime(),status:"read",
          ...(isDisappearing?{disappearing:true}:{})};
        // Increment unread if this conv is not currently active
        if(activeIdRef.current!==convId){
          setUnread(prev=>({...prev,[convId]:(prev[convId]||0)+1}));
        }
        return {
          ...c,
          messages:[
            ...c.messages.map(m=>m.id===newMsg.id?{...m,status:"read"}:m),
            replyMsg,
          ],
        };
      }));
    },2400);
  }

  function reactMsg(convId,msgId,emoji){
    setConvs(p=>p.map(c=>{
      if(c.id!==convId) return c;
      return {...c,messages:c.messages.map(m=>{
        if(m.id!==msgId) return m;
        const ex=m.reactions||[];
        const idx=ex.findIndex(r=>r.from==="me"&&r.emoji===emoji);
        return {...m,reactions:idx>=0?ex.filter((_,i)=>i!==idx):[...ex,{emoji,from:"me"}]};
      })};
    }));
  }

  function startDM(existId,userId){
    setShowNew(false);
    if(existId){selectConv(existId);return;}
    const id=`c${Date.now()}`;
    setConvs(p=>[{id,type:"dm",participants:[userId],messages:[]}, ...p]);
    setActiveId(id);
  }
  function createGroup(name,members){
    setShowNew(false);
    const id=`c${Date.now()}`;
    setConvs(p=>[{id,type:"group",name:name||"New Group",participants:members,messages:[]}, ...p]);
    setActiveId(id);
  }
  function toggleDisappearing(convId){
    setDisappearSet(prev=>{
      const next=new Set(prev);
      next.has(convId)?next.delete(convId):next.add(convId);
      return next;
    });
  }

  return (
    <ThemeCtx.Provider value={themeTokens}>
      <style>{CSS}</style>
      {screen==="splash"&&<SplashScreen onDone={()=>setScreen("login")}/>}
      {screen==="login"&&<LoginScreen onLogin={()=>setScreen("app")}/>}
      <div style={{
        display:"flex",height:"100vh",width:"100%",overflow:"hidden",
        fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
        background:themeTokens.dark1,color:themeTokens.text,
        visibility:screen==="app"?"visible":"hidden",
        transition:"background .3s,color .3s",
      }}>
        {/* On mobile: show sidebar OR chat (never both). On desktop: sidebar always visible. */}
        {(!isMobile || !activeId) && (
          <Sidebar convs={convs} activeId={activeId} onSelect={selectConv} onNew={()=>setShowNew(true)} unread={unread}
            onSettings={()=>setShowSettings(true)}
            onCall={(user,mode)=>setCallState({conv:{id:`call-${user.id}`,type:"dm",participants:[user.id],messages:[]},mode})}
            style={isMobile && !activeId ? {animation:"slideInList .22s ease"} : {}}/>
        )}
        {(!isMobile || activeId) && (
          active ? (
            <>
              <ChatWindow conv={active} onSend={sendMsg} onReact={reactMsg}
                onCall={mode=>setCallState({conv:active,mode})}
                showInfo={showInfo} onToggleInfo={()=>setShowInfo(s=>!s)}
                disappearing={disappearSet.has(active.id)}
                onToggleDisappearing={()=>toggleDisappearing(active.id)}
                onBack={isMobile ? ()=>selectConv(null) : undefined}
                style={isMobile ? {animation:"slideInChat .22s ease"} : {}}/>
              {showInfo&&<ProfilePanel conv={active} onClose={()=>setShowInfo(false)}/>}
            </>
          ) : !isMobile ? (
            <EmptyState onNew={()=>setShowNew(true)}/>
          ) : null
        )}
      </div>

      {showNew&&<NewChatModal convs={convs} onDM={startDM} onGroup={createGroup} onClose={()=>setShowNew(false)}/>}
      {callState&&<CallOverlay conv={callState.conv} mode={callState.mode} onEnd={()=>setCallState(null)}/>}
      {showSettings&&<SettingsPanel onClose={()=>setShowSettings(false)} theme={theme} onThemeChange={t=>{setTheme(t);setShowSettings(false);setTimeout(()=>setShowSettings(true),50);}}/>}
    </ThemeCtx.Provider>
  );
}
