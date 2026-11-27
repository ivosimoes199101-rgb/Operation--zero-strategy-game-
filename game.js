const OPERATIVES = [
["Alex Morgan","EUA","Assalto",[78,65,72,82,70,48,55,88],"Líder Nato"],
["Elena Volkov","Ucrânia","Sniper",[82,94,65,68,91,42,86,90],"Disparo calculado"],
["Daniel Okafor","Nigéria","Médico",[68,55,65,76,82,88,60,91],"Médico de combate"],
["Mei Tanaka","Japão","Engenheira",[60,48,72,62,80,96,78,84],"Especialista tecnológica"],
["Marcus Weber","Alemanha","Armas pesadas",[75,58,48,94,68,52,35,86],"Resistência excecional"],
["Sofia Reyes","México","Batedora",[72,68,94,65,96,55,95,82],"Predadora silenciosa"],
["Sarah Mitchell","Reino Unido","Assalto",[88,70,86,78,74,42,68,65],"Instinto agressivo"],
["Amir Haddad","Líbano","Médico",[65,52,68,72,76,85,58,95],"Espírito de equipa"],
["Ingrid Larsen","Noruega","Engenheira",[62,55,66,70,84,93,72,91],"Especialista em explosivos"],
["Jack Sullivan","Austrália","Batedor",[70,64,92,72,94,50,90,78],"Explorador nato"],
["Amara Diallo","Senegal","Sniper",[86,96,70,72,95,48,89,96],"Concentração absoluta"],
["Katarina Novak","Sérvia","Armas pesadas",[82,62,55,92,72,58,42,90],"Poder de fogo"]
];
const BUILDINGS = [
["Quartel","Aumenta a capacidade de alojamento.",500,10],
["Enfermaria","Permite tratar ferimentos após operações.",700,15],
["Arsenal","Melhora a preparação e equipamento.",900,20],
["Laboratório","Investiga tecnologia recuperada.",1200,25],
["Hangar","Desbloqueia operações de transporte.",1500,35],
["Centro de inteligência","Melhora a informação de missão.",1000,20],
["Academia militar","Permite treinar os operacionais.",1100,25],
["Central de energia","Aumenta a capacidade energética.",1300,30]
];
const MISSIONS = [
["FIRST CONTACT","Investiga o local da primeira queda. Recupera dados e alcança a extração.","Disponível"],
["DEAD SIGNAL","Localiza a equipa de reconhecimento desaparecida.","Bloqueada"],
["THE BREACH","Contém a ameaça antes que alcance a zona urbana.","Bloqueada"]
];
const defaults = {credits:2500,energy:100,materials:80,alien:0,selected:[],built:[],completed:[],mission:0,turn:1,hp:{},pos:0};
let state = load();
function load(){try{return {...defaults,...JSON.parse(localStorage.getItem("oz_save")||"{}")}}catch(e){return {...defaults}}}
function save(){localStorage.setItem("oz_save",JSON.stringify(state));renderResources()}
function go(id){document.querySelectorAll(".screen").forEach(s=>s.classList.toggle("active",s.id===id));window.scrollTo(0,0);if(id==="squad")renderRoster();if(id==="base")renderBuildings();if(id==="missions")renderMissions();if(id==="command")renderResources();if(id==="tactical")renderBattle()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)go(b.dataset.go)});
function renderResources(){["credits","energy","materials","alien"].forEach(k=>document.getElementById(k).textContent=state[k])}
function renderRoster(){
 const el=document.getElementById("roster");el.innerHTML="";
 OPERATIVES.forEach((o,i)=>{let selected=state.selected.includes(i);let d=document.createElement("button");d.className="operator"+(selected?" selected":"");d.innerHTML=`<span class="portrait">${o[0].split(" ").map(x=>x[0]).slice(0,2).join("")}</span><span style="min-width:0;text-align:left"><b>${o[0]}</b><small>${o[2]} · ${o[1]}</small></span><span class="pick">${selected?"✓":"＋"}</span>`;d.onclick=()=>{if(state.selected.includes(i))state.selected=state.selected.filter(x=>x!==i);else if(state.selected.length<5)state.selected.push(i);else{logModal("LIMITE DA EQUIPA","Só podes levar cinco operacionais para uma missão.");return}save();renderRoster()};d.oncontextmenu=(ev)=>{ev.preventDefault();showOperator(i)};d.ondblclick=()=>showOperator(i);el.appendChild(d)});
 document.getElementById("team-count").textContent=`EQUIPA ${state.selected.length}/5`;
}
function showOperator(i){const o=OPERATIVES[i],names=["Precisão","Pontaria","Mobilidade","Resistência","Perceção","Técnica","Furtividade","Disciplina"];document.getElementById("modal-content").innerHTML=`<div class="eyebrow">${o[1]} // ${o[2]}</div><h2 style="font:800 32px var(--display);margin:0">${o[0]}</h2><p class="muted">${o[4]}</p><div class="stats">${o[3].map((v,j)=>`<div class="stat">${names[j]} <b>${v}</b></div>`).join("")}</div><p class="muted">Toque prolongado ou duplo toque num operacional para consultar a ficha.</p>`;document.getElementById("modal").classList.remove("hidden")}
function logModal(title,msg){document.getElementById("modal-content").innerHTML=`<h2 style="font:800 28px var(--display)">${title}</h2><p class="muted">${msg}</p>`;document.getElementById("modal").classList.remove("hidden")}
document.getElementById("close-modal").onclick=()=>document.getElementById("modal").classList.add("hidden");
function renderBuildings(){let el=document.getElementById("buildings");el.innerHTML="";BUILDINGS.forEach((b,i)=>{let built=state.built.includes(i),d=document.createElement("div");d.className="building";d.innerHTML=`<div><b>${b[0]}</b><small>${b[1]}<br>Custo: ${b[2]} créditos / ${b[3]} materiais</small></div><button ${built?"disabled":""}>${built?"CONSTRUÍDO":"CONSTRUIR"}</button>`;d.querySelector("button").onclick=()=>{if(state.credits<b[2]||state.materials<b[3]){logModal("RECURSOS INSUFICIENTES","Não existem recursos suficientes para esta construção.");return}state.credits-=b[2];state.materials-=b[3];state.built.push(i);save();renderBuildings()};el.appendChild(d)})}
function renderMissions(){let el=document.getElementById("mission-list");el.innerHTML="";MISSIONS.forEach((m,i)=>{let done=state.completed.includes(i),unlocked=i===0||state.completed.includes(i-1),d=document.createElement("div");d.className="mission";d.innerHTML=`<div class="mission-main"><span class="num">0${i+1}</span><div><b>${m[0]}</b><small>${m[1]}</small></div></div><button ${(!unlocked||done)?"disabled":""}>${done?"CONCLUÍDA":unlocked?"INICIAR":"BLOQUEADA"}</button>`;d.querySelector("button").onclick=()=>startMission(i);el.appendChild(d)})}

const ISO_COLS = 8;
const ISO_ROWS = 6;
let battle = {unit:0,units:[],enemies:[[5,1],[6,4]],selected:0,turn:1,finished:false};

function getIsoLayout(canvas) {
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(280, rect.width || canvas.parentElement?.clientWidth || 360);
  const h = Math.max(240, rect.height || 310);
  const tileW = Math.max(42, Math.min(68, Math.floor((w - 24) / 7.5)));
  const tileH = Math.round(tileW * 0.5);
  const extrudeH = Math.max(7, Math.round(tileH * 0.35));
  const originX = w * 0.5;
  const originY = Math.max(36, h * 0.22);
  return { w, h, tileW, tileH, extrudeH, originX, originY };
}

function gridToIso(x, y, layout) {
  return {
    sx: layout.originX + (x - y) * (layout.tileW * 0.5),
    sy: layout.originY + (x + y) * (layout.tileH * 0.5)
  };
}

function isoToGrid(px, py, layout) {
  const dx = (px - layout.originX) / (layout.tileW * 0.5);
  const dy = (py - layout.originY) / (layout.tileH * 0.5);
  const gx = Math.floor((dx + dy) * 0.5 + 0.5);
  const gy = Math.floor((dy - dx) * 0.5 + 0.5);
  if (gx < 0 || gx >= ISO_COLS || gy < 0 || gy >= ISO_ROWS) return null;
  return { x: gx, y: gy };
}

function drawDiamond(ctx, sx, sy, tileW, tileH, fillStyle, strokeStyle, lineWidth = 1) {
  const hw = tileW * 0.5;
  const hh = tileH * 0.5;
  ctx.beginPath();
  ctx.moveTo(sx, sy - hh);
  ctx.lineTo(sx + hw, sy);
  ctx.lineTo(sx, sy + hh);
  ctx.lineTo(sx - hw, sy);
  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function drawIsoPrism(ctx, sx, sy, tileW, tileH, heightPx, topFill, leftFill, rightFill, strokeStyle = "rgba(255,255,255,0.22)") {
  const hw = tileW * 0.5;
  const hh = tileH * 0.5;
  const ty = sy - heightPx;

  ctx.beginPath();
  ctx.moveTo(sx - hw, ty);
  ctx.lineTo(sx, ty + hh);
  ctx.lineTo(sx, sy + hh);
  ctx.lineTo(sx - hw, sy);
  ctx.closePath();
  ctx.fillStyle = leftFill;
  ctx.fill();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(sx + hw, ty);
  ctx.lineTo(sx, ty + hh);
  ctx.lineTo(sx, sy + hh);
  ctx.lineTo(sx + hw, sy);
  ctx.closePath();
  ctx.fillStyle = rightFill;
  ctx.fill();
  ctx.stroke();

  drawDiamond(ctx, sx, ty, tileW, tileH, topFill, strokeStyle, 1);
}

function ensureIsoGridCanvas(gridEl) {
  if (!gridEl || !gridEl.parentElement) return null;
  gridEl.style.display = "none";
  let canvas = document.getElementById("iso-map-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "iso-map-canvas";
    canvas.style.cssText = `
      width: 100%;
      height: 310px;
      display: block;
      touch-action: manipulation;
      cursor: pointer;
      border-radius: 8px;
      background: radial-gradient(circle at 50% 25%, rgba(26,44,64,0.5), rgba(8,13,20,0.92));
      border: 1px solid rgba(255,255,255,0.14);
    `;
    gridEl.parentElement.insertBefore(canvas, gridEl);

    canvas.addEventListener("click", (ev) => {
      if (!battle || battle.finished) return;
      const rect = canvas.getBoundingClientRect();
      const px = ev.clientX - rect.left;
      const py = ev.clientY - rect.top;
      const layout = getIsoLayout(canvas);
      const hit = isoToGrid(px, py, layout);
      if (!hit) return;
      const u = battle.units.findIndex(a => a.x === hit.x && a.y === hit.y);
      const en = battle.enemies.findIndex(a => a[0] === hit.x && a[1] === hit.y);
      tileAction(hit.x, hit.y, u, en);
    });
  }
  return canvas;
}

function startMission(i){
  if(state.selected.length===0){
    logModal("EQUIPA NÃO SELECIONADA","Vai a Operacionais e escolhe até cinco elementos antes de iniciar.");
    return;
  }
  battle={
    unit:0,
    units:state.selected.map((id,n)=>({id,x:1,y:n+1,hp:100})),
    enemies:[[5,1],[6,4]],
    selected:0,
    turn:1,
    finished:false
  };
  state.mission=i;
  document.getElementById("battle-title").textContent=MISSIONS[i][0];
  document.getElementById("turn-label").textContent="TURNO 1";
  document.getElementById("battle-log").textContent="A equipa entrou na zona de operações. Move os operacionais até ao ponto de extração.";
  go("tactical");
  renderBattle();
}

function renderBattle(){
  const grid = document.getElementById("battle-grid");
  const canvas = ensureIsoGridCanvas(grid);
  if (canvas) {
    const layout = getIsoLayout(canvas);
    const dpr = window.devicePixelRatio || 1;
    canvas.style.height = layout.h + "px";
    if (canvas.width !== Math.round(layout.w * dpr) || canvas.height !== Math.round(layout.h * dpr)) {
      canvas.width = Math.round(layout.w * dpr);
      canvas.height = Math.round(layout.h * dpr);
    }
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, layout.w, layout.h);

    const activeUnit = battle.units[battle.selected];

    for (let sum = 0; sum <= ISO_COLS + ISO_ROWS - 2; sum++) {
      for (let y = 0; y < ISO_ROWS; y++) {
        const x = sum - y;
        if (x < 0 || x >= ISO_COLS) continue;
        const { sx, sy } = gridToIso(x, y, layout);

        const isCover = (x === 3 && y === 2) || (x === 4 && y === 4);
        const isExit = x === 7 && y === 5;
        const uIdx = battle.units.findIndex(a => a.x === x && a.y === y);
        const enIdx = battle.enemies.findIndex(a => a[0] === x && a[1] === y);
        const inRange = Boolean(activeUnit && uIdx < 0 && enIdx < 0 && (Math.abs(activeUnit.x - x) + Math.abs(activeUnit.y - y) <= 2));

        let fill = "rgba(34, 48, 66, 0.45)";
        let stroke = "rgba(155, 185, 215, 0.25)";
        if (isExit) {
          fill = "rgba(78, 242, 161, 0.26)";
          stroke = "#4ef2a1";
        } else if (inRange) {
          fill = "rgba(78, 242, 161, 0.16)";
          stroke = "rgba(78, 242, 161, 0.7)";
        }

        drawDiamond(ctx, sx, sy, layout.tileW, layout.tileH, fill, stroke, isExit || inRange ? 1.5 : 1);

        if (isExit) {
          ctx.fillStyle = "#4ef2a1";
          ctx.font = "bold 9px monospace";
          ctx.textAlign = "center";
          ctx.fillText("EXT", sx, sy + 3);
        }

        if (isCover) {
          drawIsoPrism(
            ctx,
            sx,
            sy,
            layout.tileW * 0.72,
            layout.tileH * 0.72,
            layout.extrudeH * 0.75,
            "#eab308",
            "#a16207",
            "#854d0e"
          );
        }

        if (uIdx >= 0) {
          const uObj = battle.units[uIdx];
          const isSel = uIdx === battle.selected;
          drawIsoPrism(
            ctx,
            sx,
            sy,
            layout.tileW * 0.66,
            layout.tileH * 0.66,
            layout.extrudeH * 0.95,
            isSel ? "#6ee7b7" : "#4ea8de",
            "#1e40af",
            "#1d4ed8",
            isSel ? "#ffffff" : "#93c5fd"
          );
          const shortName = (OPERATIVES[uObj.id]?.[0] || "OP").split(" ")[0].slice(0, 5).toUpperCase();
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 9px monospace";
          ctx.textAlign = "center";
          ctx.fillText(`${shortName} ${uObj.hp}`, sx, sy - layout.extrudeH * 0.95 - layout.tileH * 0.35);
        }

        if (enIdx >= 0) {
          drawIsoPrism(
            ctx,
            sx,
            sy,
            layout.tileW * 0.68,
            layout.tileH * 0.68,
            layout.extrudeH * 1.0,
            "#ff5252",
            "#991b1b",
            "#7f1d1d",
            "#fca5a5"
          );
          ctx.fillStyle = "#ffb4b4";
          ctx.font = "bold 9px monospace";
          ctx.textAlign = "center";
          ctx.fillText("XENO", sx, sy - layout.extrudeH * 1.0 - layout.tileH * 0.35);
        }
      }
    }

    ctx.restore();
  }

  let unit = battle.units[battle.selected];
  if (unit) {
    document.getElementById("selected-unit").textContent = OPERATIVES[unit.id][0].toUpperCase();
    document.getElementById("unit-hp").textContent = unit.hp + " HP";
  }
}

function tileAction(x,y,u,en){
  if(battle.finished)return;
  if(u>=0){battle.selected=u;renderBattle();return}
  let unit=battle.units[battle.selected];
  if(!unit)return;
  if(en>=0){
    battle.enemies.splice(en,1);
    battleLog("Alvo alienígena neutralizado. (Combate simplificado de demonstração)");
    renderBattle();
    checkWin();
    return;
  }
  if(Math.abs(unit.x-x)+Math.abs(unit.y-y)<=2&&x<8&&y<6){
    unit.x=x;unit.y=y;renderBattle();
    if(x===7&&y===5)checkWin();
  } else {
    battleLog("Movimento fora do alcance. Escolhe uma casa a uma ou duas posições.");
  }
}

function battleLog(t){document.getElementById("battle-log").textContent=t}
function checkWin(){
  if(battle.units.some(u=>u.x===7&&u.y===5)||battle.enemies.length===0){
    battle.finished=true;
    battleLog("OBJETIVO CUMPRIDO. A equipa regressa à base.");
    if(!state.completed.includes(state.mission))state.completed.push(state.mission);
    state.credits+=500;state.materials+=15;state.alien+=1;save();
    setTimeout(()=>{logModal("OPERAÇÃO CONCLUÍDA","A equipa regressou à base. Recompensa: 500 créditos, 15 materiais e 1 tecnologia alienígena.");renderMissions()},250);
  }
}
document.getElementById("end-turn").onclick=()=>{
  if(battle.finished)return;
  battle.turn++;
  document.getElementById("turn-label").textContent="TURNO "+battle.turn;
  battle.units.forEach(u=>{if(battle.enemies.length&&Math.random()<.35)u.hp=Math.max(0,u.hp-8)});
  battleLog("O inimigo respondeu. Verifica o estado da equipa e continua.");
  renderBattle();
};
document.getElementById("medkit").onclick=()=>{
  let u=battle.units[battle.selected];
  if(!u)return;
  u.hp=Math.min(100,u.hp+25);
  battleLog("Kit médico utilizado. +25 HP.");
  renderBattle();
};
document.getElementById("retreat").onclick=()=>{if(confirm("Queres mesmo abortar esta operação?"))go("missions")};
renderResources();renderRoster();document.getElementById("clock").textContent="2089";
