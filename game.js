const SAVE_KEY = "oz_save";
const STAT_NAMES = ["Pontaria", "Mobilidade", "Blindagem", "Disciplina"];
const GRID_W = 8;
const GRID_H = 6;

const OPERATIVES = [
  ["Kaelen Vance", "Rifle de Assalto", "Assalto", [78, 74, 70, 72], 100],
  ["Lyra Mercer", "Rifle de Precisão", "Sniper", [86, 68, 62, 75], 85],
  ["Ronan Thorne", "Metralhadora Pesada", "Armas pesadas", [72, 62, 84, 76], 115],
  ["Soraia Lind", "Submetralhadora", "Batedora", [80, 84, 65, 70], 90],
  ["Darius Kade", "Carabina Tática", "Engenheira", [76, 72, 72, 78], 95],
  ["Elena Rostova", "Espingarda Médica", "Médico", [75, 76, 68, 82], 95],
  ["Marcus Sterling", "Rifle de Assalto", "Assalto", [77, 75, 73, 74], 102],
  ["Nadia Kowalski", "Rifle de Precisão", "Sniper", [85, 70, 64, 76], 88],
  ["Victor Chen", "Metralhadora Pesada", "Armas pesadas", [74, 64, 82, 75], 112],
  ["Zoe Vance", "Submetralhadora", "Batedora", [82, 85, 66, 72], 92],
  ["Tessa Moreau", "Carabina Tática", "Engenheira", [78, 74, 74, 80], 96],
  ["Henrik Lindqvist", "Espingarda Médica", "Médico", [76, 75, 70, 84], 98]
];

const BUILDINGS = [
  ["Quartel", "Gestão da equipa, melhorias de nível, treino de atributos e descanso.", 0, 0],
  ["Enfermaria", "Tratamento médico, cuidados urgentes e profilaxia para a esquadra.", 450, 12],
  ["Arsenal", "Armamento, fardas, granadas, kits, reabastecimento e níveis de arma.", 500, 14],
  ["Laboratório", "Pesquisa xeno, descodificação de amostras e munição perfurante.", 600, 16],
  ["Centro de Comando", "Varredura de reconhecimento (+15% precisão T1) e extração avançada.", 850, 18]
];

const WEAPONS_SHOP = [
  { id: "ar_mk1", name: "Rifle Padrão MK-I", dmg: 22, mag: 6, optRange: 5, hitBonus: 0, credits: 0, materials: 0, desc: "Equilibrado a média distância." },
  { id: "ar_mk2", name: "Rifle Tático MK-II", dmg: 28, mag: 7, optRange: 5, hitBonus: 4, credits: 320, materials: 8, desc: "+6 dano e +4% precisão." },
  { id: "sg_breach", name: "Espingarda de Assalto", dmg: 34, mag: 4, optRange: 3, hitBonus: 3, credits: 380, materials: 10, desc: "Alto impacto a curta distância." },
  { id: "sr_long", name: "Carabina de Precisão", dmg: 38, mag: 4, optRange: 7, hitBonus: 6, credits: 460, materials: 12, desc: "Excelente a longa distância." }
];

const OUTFITS_SHOP = [
  { id: "fat_std", name: "Farda Operacional", hpBonus: 0, dmgRed: 0, dodgeBonus: 0, credits: 0, materials: 0, desc: "Equipamento padrão sem custo." },
  { id: "kev_light", name: "Colete Leve Kevlar", hpBonus: 12, dmgRed: 2, dodgeBonus: 4, credits: 280, materials: 7, desc: "+12 HP, -2 dano, +4% evasão." },
  { id: "exo_heavy", name: "Exoesqueleto Reforçado", hpBonus: 24, dmgRed: 5, dodgeBonus: 0, credits: 520, materials: 14, desc: "+24 HP e -5 dano recebido." }
];

const CONSUMABLES_SHOP = {
  frag: [{ id: "frag_1", name: "Granada Fragmentação (x1)", qty: 1, credits: 120, materials: 3, desc: "Explosão 3x3 com 32 de dano." }],
  smoke: [{ id: "smoke_1", name: "Granada de Fumo (x1)", qty: 1, credits: 110, materials: 3, desc: "Cobertura visual 3x3 por 2 turnos." }],
  medkit: [{ id: "med_1", name: "Kit de Saúde (x1)", qty: 1, credits: 130, materials: 3, desc: "Recupera 40 HP (50 HP na classe Médico)." }]
};

const MISSIONS = [
  {
    title: "SETOR 01 // PERÍMETRO ABANDONADO",
    desc: "Elimina as patrulhas xeno na zona industrial e recolhe amostras ativas.",
    rewardCredits: 320,
    rewardMaterials: 10,
    xpBase: 35,
    secondaryType: "clear_all",
    secondaryLabel: "Eliminar todos os alvos",
    bonusCredits: 130,
    bonusMaterials: 5
  },
  {
    title: "SETOR 02 // ESTAÇÃO DE RETRANSMISSÃO",
    desc: "Limpa a torre de comunicações com oposição mais densa e amostras adicionais.",
    rewardCredits: 460,
    rewardMaterials: 14,
    xpBase: 45,
    secondaryType: "no_casualties",
    secondaryLabel: "Sem baixas na esquadra",
    bonusCredits: 180,
    bonusMaterials: 7
  },
  {
    title: "SETOR 03 // NÚCLEO DE CONTENÇÃO",
    desc: "Enfrenta unidades pesadas e flanqueadores junto ao reator xeno.",
    rewardCredits: 640,
    rewardMaterials: 20,
    xpBase: 60,
    secondaryType: "fast_clear",
    secondaryLabel: "Concluir em até 6 turnos",
    bonusCredits: 240,
    bonusMaterials: 9
  }
];

const COVERS = [
  { x: 2, y: 1, type: "half", blocksSight: false },
  { x: 2, y: 4, type: "half", blocksSight: false },
  { x: 4, y: 2, type: "full", blocksSight: true },
  { x: 5, y: 3, type: "half", blocksSight: false }
];

function createDefaultState() {
  return {
    credits: 2500,
    materials: 80,
    alien: 2,
    selected: [0, 1, 2],
    built: [0],
    completed: [],
    mission: 0,
    barracksLevel: 1,
    commandCenter: { built: false, level: 0, reconReady: false },
    lab: { weaponTier: 0, intelTier: 0, armorTier: 0, intelDecoded: 0, piercingAmmo: false },
    armoryTier: 0,
    opHp: OPERATIVES.map(op => op[4]),
    opGear: OPERATIVES.map(() => ({ weaponId: "ar_mk1", outfitId: "fat_std", frag: 1, smoke: 1, medkit: 1 })),
    opProgress: OPERATIVES.map(() => ({ xp: 0, level: 1, trainPoints: 0 })),
    medProphylaxis: {}
  };
}

function loadState() {
  const base = createDefaultState();
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return base;

    const merged = {
      ...base,
      ...parsed,
      commandCenter: {
        ...base.commandCenter,
        ...(parsed.commandCenter && typeof parsed.commandCenter === "object" ? parsed.commandCenter : {})
      },
      lab: {
        ...base.lab,
        ...(parsed.lab && typeof parsed.lab === "object" ? parsed.lab : {})
      },
      medProphylaxis: parsed.medProphylaxis && typeof parsed.medProphylaxis === "object" ? { ...parsed.medProphylaxis } : {}
    };

    if (!Array.isArray(merged.built) || merged.built.length === 0) merged.built = [0];
    if (!merged.built.includes(0)) merged.built.unshift(0);
    if (!Array.isArray(merged.selected) || merged.selected.length === 0) merged.selected = [0, 1, 2];
    if (!Array.isArray(merged.completed)) merged.completed = [];

    merged.opHp = OPERATIVES.map((op, i) => {
      const v = Array.isArray(parsed.opHp) ? Number(parsed.opHp[i]) : op[4];
      return Number.isFinite(v) ? Math.max(0, v) : op[4];
    });

    merged.opGear = OPERATIVES.map((_, i) => {
      const g = Array.isArray(parsed.opGear) && parsed.opGear[i] ? parsed.opGear[i] : {};
      return {
        weaponId: typeof g.weaponId === "string" ? g.weaponId : "ar_mk1",
        outfitId: typeof g.outfitId === "string" ? g.outfitId : "fat_std",
        frag: Number.isFinite(Number(g.frag)) ? Math.max(0, Number(g.frag)) : 1,
        smoke: Number.isFinite(Number(g.smoke)) ? Math.max(0, Number(g.smoke)) : 1,
        medkit: Number.isFinite(Number(g.medkit)) ? Math.max(0, Number(g.medkit)) : 1
      };
    });

    merged.opProgress = OPERATIVES.map((_, i) => {
      const p = Array.isArray(parsed.opProgress) && parsed.opProgress[i] ? parsed.opProgress[i] : {};
      return {
        xp: Number.isFinite(Number(p.xp)) ? Math.max(0, Number(p.xp)) : 0,
        level: Number.isFinite(Number(p.level)) ? Math.max(1, Number(p.level)) : 1,
        trainPoints: Number.isFinite(Number(p.trainPoints)) ? Math.max(0, Number(p.trainPoints)) : 0
      };
    });

    return merged;
  } catch (_) {
    return base;
  }
}

let state = loadState();
let selectedOpIndex = 0;
let selectedShopOpIndex = 0;
let selectedShopCategory = "weapon";
let activeCombatMode = null;
let selectedTargetId = null;
let expTrainOp = 0;
let expTrainStat = 0;
let expMedOp = 0;
let expLabTarget = "flanker";
let modalReturnScreen = null;

let battle = {
  missionIndex: 0,
  turn: 1,
  activeUnitIdx: 0,
  units: [],
  enemies: [],
  smokes: [],
  finished: false,
  commandReconTurn1: false
};

function save() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (_) {}
}

function resolveScreenElement(screenName) {
  const aliases = {
    battle: ["tactical", "battle", "screen-battle", "combat"],
    tactical: ["tactical", "battle", "screen-battle", "combat"],
    squad: ["squad", "roster", "equipa"],
    roster: ["squad", "roster", "equipa"],
    base: ["base", "command"],
    command: ["command", "base"],
    missions: ["missions"],
    home: ["home"],
    brief: ["brief"]
  };
  const candidates = aliases[screenName] || [screenName];
  for (const id of candidates) {
    const el = document.getElementById(id);
    if (el) return el;
  }
  return null;
}

function hideModalImmediately() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
}

function go(screenName) {
  hideModalImmediately();

  document.querySelectorAll(".screen").forEach(sec => {
    sec.classList.remove("active");
    sec.style.display = "";
  });

  const target = resolveScreenElement(screenName);
  if (target) {
    target.classList.add("active");
    target.style.display = "block";
    target.style.opacity = "1";
    target.style.visibility = "visible";
  }

  if (screenName === "squad" || screenName === "roster") renderRoster();
  if (screenName === "base") renderBuildings();
  if (screenName === "missions") renderMissions();
  if (screenName === "battle" || screenName === "tactical") renderBattle();
}

function bindNavigation() {
  document.querySelectorAll("[data-go]").forEach(btn => {
    btn.onclick = () => {
      const dest = btn.getAttribute("data-go");
      if (dest) go(dest);
    };
  });

  const closeModalBtn = document.getElementById("close-modal");
  if (closeModalBtn) closeModalBtn.onclick = closeModal;
}

function logModal(title, htmlMessage, returnScreen = null) {
  const modal = document.getElementById("modal");
  const contentEl = document.getElementById("modal-content");
  modalReturnScreen = returnScreen;
  if (contentEl) {
    contentEl.innerHTML = `<h3 style="margin-top:0">${title}</h3><div>${htmlMessage}</div>`;
  }
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  }
}

function closeModal() {
  hideModalImmediately();
  if (modalReturnScreen) {
    const dest = modalReturnScreen;
    modalReturnScreen = null;
    go(dest);
  }
}

function renderResources() {
  const cEl = document.getElementById("credits");
  const mEl = document.getElementById("materials");
  const aEl = document.getElementById("alien");
  if (cEl) cEl.textContent = state.credits;
  if (mEl) mEl.textContent = state.materials;
  if (aEl) aEl.textContent = state.alien;
}

function getOpProgress(i) {
  return (Array.isArray(state.opProgress) && state.opProgress[i]) || { xp: 0, level: 1, trainPoints: 0 };
}

function getXpNeededForLevel(level) {
  return 60 + (Math.max(1, level) - 1) * 35;
}

function grantOpXp(opIndex, amount) {
  const prog = getOpProgress(opIndex);
  prog.xp += Math.max(0, amount);
  let ups = 0;
  while (prog.xp >= getXpNeededForLevel(prog.level)) {
    prog.xp -= getXpNeededForLevel(prog.level);
    prog.level += 1;
    prog.trainPoints += 1;
    ups += 1;
    const op = OPERATIVES[opIndex];
    if (op && Array.isArray(op[3])) {
      op[3][0] = Math.min(99, op[3][0] + 2);
      op[3][1] = Math.min(99, op[3][1] + 1);
      op[3][2] = Math.min(99, op[3][2] + 1);
      op[3][3] = Math.min(99, op[3][3] + 2);
    }
  }
  return ups;
}

function getOpGear(i) {
  return (Array.isArray(state.opGear) && state.opGear[i]) || { weaponId: "ar_mk1", outfitId: "fat_std", frag: 1, smoke: 1, medkit: 1 };
}

function getEquippedOutfitItem(i) {
  const gear = getOpGear(i);
  return OUTFITS_SHOP.find(o => o.id === gear.outfitId) || OUTFITS_SHOP[0];
}

function getLabWeaponBonus() {
  const t = Number(state.lab && state.lab.weaponTier) || 0;
  return { dmg: t * 3, hit: t * 3 };
}

function getLabArmorBonus() {
  const t = Number(state.lab && state.lab.armorTier) || 0;
  return { hp: t * 10, dmgRed: t * 1 };
}

function getLabIntelDebuff() {
  const t = Number(state.lab && state.lab.intelTier) || 0;
  const d = Number(state.lab && state.lab.intelDecoded) || 0;
  return { aimPen: t * 4 + d * 5, dmgRed: t * 1 + d * 1 };
}

function getWeapon(opIndex) {
  const gear = getOpGear(opIndex);
  const baseWpn = WEAPONS_SHOP.find(w => w.id === gear.weaponId) || WEAPONS_SHOP[0];
  const labWpn = getLabWeaponBonus();
  const armTier = Number(state.armoryTier) || 0;
  const piercing = Boolean(state.lab && state.lab.piercingAmmo);
  let name = baseWpn.name;
  if (armTier > 0) name += ` [AR-NV${armTier}]`;
  if (piercing) name += ` [AP]`;
  return {
    ...baseWpn,
    name,
    dmg: baseWpn.dmg + labWpn.dmg + armTier * 4 + (piercing ? 4 : 0),
    hitBonus: (baseWpn.hitBonus || 0) + labWpn.hit + armTier * 4,
    piercing
  };
}

function getMaxHp(opIndex) {
  const op = OPERATIVES[opIndex] || OPERATIVES[0];
  const prog = getOpProgress(opIndex);
  const levelHp = (Math.max(1, prog.level) - 1) * 6;
  const outfitHp = getEquippedOutfitItem(opIndex).hpBonus || 0;
  const labHp = getLabArmorBonus().hp || 0;
  const statArmorBonus = Math.max(0, Math.round(((op[3][2] || 70) - 70) * 0.4));
  const prophBonus = state.medProphylaxis && state.medProphylaxis[opIndex] ? 8 : 0;
  return op[4] + levelHp + outfitHp + labHp + statArmorBonus + prophBonus;
}

function getOpHp(opIndex) {
  const maxHp = getMaxHp(opIndex);
  const raw = Array.isArray(state.opHp) ? Number(state.opHp[opIndex]) : maxHp;
  if (!Number.isFinite(raw)) return maxHp;
  return Math.max(0, Math.min(maxHp, raw));
}

function setOpHp(opIndex, value) {
  const maxHp = getMaxHp(opIndex);
  if (!Array.isArray(state.opHp)) state.opHp = OPERATIVES.map(op => op[4]);
  state.opHp[opIndex] = Math.max(0, Math.min(maxHp, Math.round(value)));
}

function getBarracksRestHeal() {
  return 15 + ((Number(state.barracksLevel) || 1) - 1) * 10;
}

function getSquadSynergyBonus() {
  const count = Array.isArray(state.selected) ? state.selected.length : 0;
  const lv = Number(state.barracksLevel) || 1;
  return count <= 1 ? 0 : (count - 1) * 2 + (lv - 1) * 2;
}

function getHealCost(opIndex) {
  const missing = Math.max(0, getMaxHp(opIndex) - getOpHp(opIndex));
  return Math.max(40, missing * 4);
}

function renderRoster() {
  const listEl = document.getElementById("roster");
  const countEl = document.getElementById("team-count");
  const cap = 5;
  if (countEl) countEl.textContent = `EQUIPA ${state.selected.length}/${cap}`;
  if (!listEl) return;

  const opActive = OPERATIVES[selectedOpIndex] || OPERATIVES[0];
  const maxHpActive = getMaxHp(selectedOpIndex);
  const curHpActive = getOpHp(selectedOpIndex);
  const progActive = getOpProgress(selectedOpIndex);
  const gearActive = getOpGear(selectedOpIndex);
  const wpnActive = getWeapon(selectedOpIndex);
  const outfitActive = getEquippedOutfitItem(selectedOpIndex);
  const statsHtml = opActive[3].map((val, idx) => `<span><b>${STAT_NAMES[idx]}:</b> ${val}</span>`).join(" · ");

  listEl.innerHTML = `
    <div style="margin-bottom:10px;padding:10px;border:1px solid rgba(255,255,255,.16);border-radius:8px;background:rgba(14,22,29,.8)">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
        <div><b style="color:var(--lime)">${opActive[0]}</b> · <span>${opActive[2]}</span> (${opActive[1]})</div>
        <div style="font-size:12px">Nv.<b>${progActive.level}</b> · XP: <b>${progActive.xp}/${getXpNeededForLevel(progActive.level)}</b> · PT: <b>${progActive.trainPoints}</b></div>
      </div>
      <div style="font-size:12px;margin-top:6px">HP: <b>${curHpActive}/${maxHpActive}</b> · Arma: <b>${wpnActive.name}</b> (${wpnActive.dmg} DMG) · Farda: <b>${outfitActive.name}</b></div>
      <div style="font-size:11px;color:var(--muted);margin-top:4px">Mochila: Frag x${gearActive.frag} · Fumo x${gearActive.smoke} · Kit x${gearActive.medkit}</div>
      <div style="font-size:11px;color:var(--muted);margin-top:4px;display:flex;flex-wrap:wrap;gap:8px">${statsHtml}</div>
    </div>
  `;

  OPERATIVES.forEach((op, idx) => {
    const isSelected = state.selected.includes(idx);
    const isFocused = idx === selectedOpIndex;
    const hp = getOpHp(idx);
    const maxHp = getMaxHp(idx);
    const prog = getOpProgress(idx);

    const card = document.createElement("div");
    card.className = "building";
    card.style.cssText = `display:flex;flex-direction:column;align-items:stretch;gap:8px;margin-bottom:8px;padding:10px;border:1px solid ${isFocused ? "var(--lime)" : "rgba(255,255,255,.14)"};border-radius:8px`;

    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
        <div>
          <b>${op[0]}</b> · <span style="color:var(--lime)">${op[2]}</span> (Nv.${prog.level})<br>
          <small style="color:var(--muted)">${op[1]} · HP: ${hp}/${maxHp} · PT: ${prog.trainPoints}</small>
        </div>
        <div style="display:flex;gap:6px">
          <button type="button" class="btn" data-inspect="${idx}">VER</button>
          <button type="button" class="btn" data-toggle="${idx}">${isSelected ? "NA EQUIPA ✓" : "CONVOCAR"}</button>
        </div>
      </div>
    `;

    card.querySelector(`[data-inspect="${idx}"]`).onclick = () => {
      selectedOpIndex = idx;
      renderRoster();
    };

    card.querySelector(`[data-toggle="${idx}"]`).onclick = () => {
      if (isSelected) {
        if (state.selected.length <= 1) {
          logModal("EQUIPA MÍNIMA", "Mantém pelo menos 1 operacional selecionado.");
          return;
        }
        state.selected = state.selected.filter(i => i !== idx);
      } else {
        if (state.selected.length >= cap) {
          logModal("LIMITE DA EQUIPA", `Só podes convocar até ${cap} operacionais por missão.`);
          return;
        }
        state.selected.push(idx);
      }
      selectedOpIndex = idx;
      save();
      renderRoster();
    };

    listEl.appendChild(card);
  });
}

function renderBuildings() {
  const el = document.getElementById("buildings");
  if (!el) return;
  el.innerHTML = "";

  BUILDINGS.forEach((b, i) => {
    const [name, desc, costCr, costMat] = b;
    const isCommandCenter = i === 4;
    const cc = state.commandCenter || { built: false, level: 0, reconReady: false };
    const built = isCommandCenter ? Boolean(cc.built) : state.built.includes(i);

    const row = document.createElement("div");
    row.className = "building";
    row.style.cssText = "display:flex;flex-direction:column;align-items:stretch;gap:8px;margin-bottom:10px";

    let levelInfo = "";
    if (i === 0) levelInfo = ` · Nível ${state.barracksLevel || 1}/3`;
    else if (isCommandCenter && built) levelInfo = ` · Nível ${cc.level || 1}/2`;

    row.innerHTML = `<div><b>${name}${levelInfo}</b><br><small style="color:var(--muted)">${desc}</small></div>`;

    const actionWrap = document.createElement("div");
    actionWrap.style.cssText = "display:flex;flex-wrap:wrap;gap:8px";

    if (!built) {
      const buildBtn = document.createElement("button");
      buildBtn.type = "button";
      buildBtn.className = "btn";
      buildBtn.textContent = `CONSTRUIR (${costCr} CR · ${costMat} MAT)`;
      buildBtn.onclick = () => {
        if (state.credits < costCr || state.materials < costMat) {
          logModal("RECURSOS INSUFICIENTES", `Precisas de <b>${costCr} CR</b> e <b>${costMat} MAT</b> para construir ${name}.`);
          return;
        }
        state.credits -= costCr;
        state.materials -= costMat;
        if (isCommandCenter) {
          state.commandCenter.built = true;
          state.commandCenter.level = 1;
        } else if (!state.built.includes(i)) {
          state.built.push(i);
        }
        save();
        renderResources();
        renderBuildings();
        logModal("INSTALAÇÃO CONCLUÍDA", `<b>${name}</b> está agora operacional na base.`);
      };
      actionWrap.appendChild(buildBtn);
    } else {
      const tag = document.createElement("span");
      tag.style.cssText = "font-size:12px;color:var(--lime);align-self:center";
      tag.textContent = "OPERACIONAL ✓";
      actionWrap.appendChild(tag);

      if (i === 0) {
        const curLv = state.barracksLevel || 1;
        const upgBtn = document.createElement("button");
        upgBtn.type = "button";
        upgBtn.className = "btn";
        upgBtn.disabled = curLv >= 3;
        upgBtn.textContent = curLv >= 3 ? "QUARTEL NÍVEL MÁXIMO (3/3)" : `MELHORAR QUARTEL (${curLv === 1 ? "400 CR · 10 MAT" : "700 CR · 18 MAT"})`;
        upgBtn.onclick = () => {
          const needCr = curLv === 1 ? 400 : 700;
          const needMat = curLv === 1 ? 10 : 18;
          if (state.credits < needCr || state.materials < needMat) {
            logModal("RECURSOS INSUFICIENTES", `Precisas de <b>${needCr} CR</b> e <b>${needMat} MAT</b>.`);
            return;
          }
          state.credits -= needCr;
          state.materials -= needMat;
          state.barracksLevel = curLv + 1;
          save();
          renderResources();
          renderBuildings();
          renderRoster();
          logModal("QUARTEL MELHORADO", `O Quartel subiu para o <b>Nível ${state.barracksLevel}</b>.`);
        };
        actionWrap.appendChild(upgBtn);
      }

      if (isCommandCenter) {
        const reconBtn = document.createElement("button");
        reconBtn.type = "button";
        reconBtn.className = "btn";
        reconBtn.disabled = Boolean(cc.reconReady);
        reconBtn.textContent = cc.reconReady ? "RECONHECIMENTO ATIVO ✓" : "VARREDURA RECONHECIMENTO (200 CR · +15% T1)";
        reconBtn.onclick = () => {
          if (state.credits < 200) {
            logModal("CRÉDITOS INSUFICIENTES", "Precisas de <b>200 CR</b> para iniciar a varredura.");
            return;
          }
          state.credits -= 200;
          state.commandCenter.reconReady = true;
          save();
          renderResources();
          renderBuildings();
          logModal("RECONHECIMENTO CARREGADO", "A esquadra ganha <b>+15% de precisão</b> no Turno 1 da próxima missão.");
        };
        actionWrap.appendChild(reconBtn);

        const ccUpgBtn = document.createElement("button");
        ccUpgBtn.type = "button";
        ccUpgBtn.className = "btn";
        ccUpgBtn.disabled = (cc.level || 1) >= 2;
        ccUpgBtn.textContent = (cc.level || 1) >= 2 ? "CENTRO DE COMANDO NÍVEL MÁXIMO (2/2)" : "MELHORAR PARA NÍVEL 2 (950 CR · 24 MAT)";
        ccUpgBtn.onclick = () => {
          if (state.credits < 950 || state.materials < 24) {
            logModal("RECURSOS INSUFICIENTES", "Precisas de <b>950 CR</b> e <b>24 MAT</b>.");
            return;
          }
          state.credits -= 950;
          state.materials -= 24;
          state.commandCenter.level = 2;
          save();
          renderResources();
          renderBuildings();
          logModal("CENTRO DE COMANDO MELHORADO", "Centro de Comando no <b>Nível 2</b>: maior extração e hipótese de +1 Tec. Alienígena na vitória.");
        };
        actionWrap.appendChild(ccUpgBtn);
      }
    }

    row.appendChild(actionWrap);
    el.appendChild(row);
  });

  renderFacilityExtras(el);

  const resetBtn = document.createElement("button");
  resetBtn.type = "button";
  resetBtn.className = "btn";
  resetBtn.style.cssText = "width:100%;margin-top:14px";
  resetBtn.textContent = "RESET PROGRESSO (TESTE)";
  resetBtn.onclick = () => {
    try { localStorage.removeItem(SAVE_KEY); } catch (_) {}
    state = createDefaultState();
    selectedOpIndex = 0;
    selectedShopOpIndex = 0;
    activeCombatMode = null;
    save();
    renderResources();
    renderRoster();
    renderBuildings();
    renderMissions();
    logModal("PROGRESSO REINICIADO", "Estado inicial restaurado com os 12 operacionais e o Quartel no Nível 1.", "command");
  };
  el.appendChild(resetBtn);
}

function renderFacilityExtras(container) {
  const infBuilt = state.built.includes(1);
  const armBuilt = state.built.includes(2);
  const labBuilt = state.built.includes(3);

  const opOpts = OPERATIVES.map((op, i) => {
    const p = getOpProgress(i);
    return `<option value="${i}" ${i === expTrainOp ? "selected" : ""}>${op[0]} (Nv.${p.level} · PT:${p.trainPoints})</option>`;
  }).join("");

  const statOpts = STAT_NAMES.map((s, i) => `<option value="${i}" ${i === expTrainStat ? "selected" : ""}>${s} (${OPERATIVES[expTrainOp][3][i]})</option>`).join("");

  const medOpts = OPERATIVES.map((op, i) => {
    const hp = getOpHp(i);
    const maxHp = getMaxHp(i);
    const proph = state.medProphylaxis && state.medProphylaxis[i] ? " · PROFILAXIA ✓" : "";
    return `<option value="${i}" ${i === expMedOp ? "selected" : ""}>${op[0]} (${hp}/${maxHp} HP${proph})</option>`;
  }).join("");

  const barracksBox = document.createElement("div");
  barracksBox.className = "building";
  barracksBox.style.cssText = "display:flex;flex-direction:column;align-items:stretch;gap:8px;margin-bottom:10px";
  barracksBox.innerHTML = `
    <div><b>QUARTEL — TREINO DE ATRIBUTOS E DESCANSO RÁPIDO</b><br><small style="color:var(--muted)">Usa 1 Ponto de Treino (gratuito) ou 260 CR · 7 MAT para subir +2 num atributo.</small></div>
    <select id="oz-train-op" style="width:100%;padding:8px;background:#0e161d;color:#f2f7fa;border:1px solid rgba(255,255,255,.22);border-radius:6px;font-size:12px">${opOpts}</select>
    <select id="oz-train-stat" style="width:100%;padding:8px;background:#0e161d;color:#f2f7fa;border:1px solid rgba(255,255,255,.22);border-radius:6px;font-size:12px">${statOpts}</select>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn" id="oz-btn-train" style="flex:1">TREINAR ATRIBUTO</button>
      <button type="button" class="btn" id="oz-btn-rest" style="flex:1">DESCANSO RÁPIDO (90 CR)</button>
    </div>
  `;
  container.appendChild(barracksBox);

  const medBox = document.createElement("div");
  medBox.className = "building";
  medBox.style.cssText = "display:flex;flex-direction:column;align-items:stretch;gap:8px;margin-bottom:10px";
  medBox.innerHTML = `
    <div><b>ENFERMARIA — TRATAMENTO, URGÊNCIA E PROFILAXIA</b><br><small style="color:var(--muted)">${infBuilt ? "Cura padrão, recuperação de urgência (HP completo) e reforço +8 HP para a próxima saída." : "Constrói a Enfermaria para usar estas opções."}</small></div>
    <select id="oz-med-op" ${!infBuilt ? "disabled" : ""} style="width:100%;padding:8px;background:#0e161d;color:#f2f7fa;border:1px solid rgba(255,255,255,.22);border-radius:6px;font-size:12px">${medOpts}</select>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn" id="oz-btn-heal" ${!infBuilt ? "disabled" : ""} style="flex:1">CURAR FERIDO</button>
      <button type="button" class="btn" id="oz-btn-urgent" ${!infBuilt ? "disabled" : ""} style="flex:1">CUIDADO URGENTE</button>
      <button type="button" class="btn" id="oz-btn-proph" ${!infBuilt ? "disabled" : ""} style="flex:1">PROFILAXIA (180 CR · 4 MAT)</button>
    </div>
  `;
  container.appendChild(medBox);

  const armoryBox = document.createElement("div");
  armoryBox.className = "building";
  armoryBox.style.cssText = "display:flex;flex-direction:column;align-items:stretch;gap:8px;margin-bottom:10px";

  const shopOpOpts = OPERATIVES.map((op, i) => `<option value="${i}" ${i === selectedShopOpIndex ? "selected" : ""}>${op[0]} (${op[2]})</option>`).join("");
  const armTier = Number(state.armoryTier) || 0;
  const squadCount = state.selected.length;

  armoryBox.innerHTML = `
    <div><b>ARSENAL — EQUIPAMENTO, REABASTECIMENTO E NÍVEL (${armTier}/2)</b><br><small style="color:var(--muted)">${armBuilt ? "Equipa armas, fardas e consumíveis ou melhora o nível de armamento da base." : "Constrói o Arsenal para equipar e melhorar armamento."}</small></div>
    <select id="oz-shop-op" ${!armBuilt ? "disabled" : ""} style="width:100%;padding:8px;background:#0e161d;color:#f2f7fa;border:1px solid rgba(255,255,255,.22);border-radius:6px;font-size:12px">${shopOpOpts}</select>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <button type="button" class="btn" data-shop-cat="weapon" ${!armBuilt ? "disabled" : ""}>ARMAS</button>
      <button type="button" class="btn" data-shop-cat="outfit" ${!armBuilt ? "disabled" : ""}>FARDAS</button>
      <button type="button" class="btn" data-shop-cat="frag" ${!armBuilt ? "disabled" : ""}>FRAG</button>
      <button type="button" class="btn" data-shop-cat="smoke" ${!armBuilt ? "disabled" : ""}>FUMO</button>
      <button type="button" class="btn" data-shop-cat="medkit" ${!armBuilt ? "disabled" : ""}>KIT</button>
    </div>
    <div id="oz-shop-items" style="display:flex;flex-direction:column;gap:6px"></div>
    <button type="button" class="btn" id="oz-btn-resupply" ${!armBuilt ? "disabled" : ""} style="width:100%">REABASTECER EQUIPA ATIVA (${squadCount * 150} CR · ${squadCount * 3} MAT)</button>
    <button type="button" class="btn" id="oz-btn-arm-tier" ${!armBuilt || armTier >= 2 ? "disabled" : ""} style="width:100%">${armTier >= 2 ? "ARMAMENTO NO NÍVEL MÁXIMO (2/2)" : `MELHORAR ARMAMENTO (${armTier === 0 ? "550 CR · 14 MAT" : "900 CR · 22 MAT"})`}</button>
  `;
  container.appendChild(armoryBox);

  const labBox = document.createElement("div");
  labBox.className = "building";
  labBox.style.cssText = "display:flex;flex-direction:column;align-items:stretch;gap:8px;margin-bottom:10px";

  const wTier = state.lab.weaponTier || 0;
  const iTier = state.lab.intelTier || 0;
  const aTier = state.lab.armorTier || 0;
  const decoded = state.lab.intelDecoded || 0;
  const piercing = Boolean(state.lab.piercingAmmo);

  labBox.innerHTML = `
    <div><b>LABORATÓRIO — PESQUISA XENO, ANÁLISE E PERFURANTE</b><br><small style="color:var(--muted)">${labBuilt ? `Armas: ${wTier}/2 · Info: ${iTier}/2 · Blindagem: ${aTier}/2 · Amostras: ${decoded}/2` : "Constrói o Laboratório para pesquisar tecnologia alienígena."}</small></div>
    <button type="button" class="btn" id="oz-lab-wpn" ${!labBuilt || wTier >= 2 ? "disabled" : ""} style="width:100%">${wTier >= 2 ? "PESQUISA ARMAS XENO COMPLETA (2/2)" : `PESQUISA ARMAS XENO (${wTier === 0 ? "1 XENO · 300 CR" : "2 XENO · 550 CR"})`}</button>
    <button type="button" class="btn" id="oz-lab-int" ${!labBuilt || iTier >= 2 ? "disabled" : ""} style="width:100%">${iTier >= 2 ? "PESQUISA INFO XENO COMPLETA (2/2)" : `PESQUISA INFO XENO (${iTier === 0 ? "1 XENO · 300 CR" : "2 XENO · 550 CR"})`}</button>
    <button type="button" class="btn" id="oz-lab-arm" ${!labBuilt || aTier >= 2 ? "disabled" : ""} style="width:100%">${aTier >= 2 ? "PESQUISA BLINDAGEM XENO COMPLETA (2/2)" : `PESQUISA BLINDAGEM XENO (${aTier === 0 ? "1 XENO · 350 CR" : "2 XENO · 600 CR"})`}</button>
    <select id="oz-lab-target" ${!labBuilt ? "disabled" : ""} style="width:100%;padding:8px;background:#0e161d;color:#f2f7fa;border:1px solid rgba(255,255,255,.22);border-radius:6px;font-size:12px">
      <option value="flanker" ${expLabTarget === "flanker" ? "selected" : ""}>Foco de Análise: Flanqueadores / Sentinela</option>
      <option value="skirmisher" ${expLabTarget === "skirmisher" ? "selected" : ""}>Foco de Análise: Pesados / Caçadores</option>
    </select>
    <button type="button" class="btn" id="oz-lab-decode" ${!labBuilt || decoded >= 2 ? "disabled" : ""} style="width:100%">${decoded >= 2 ? "DESCODIFICAÇÃO DE AMOSTRAS COMPLETA (2/2)" : "DESCODIFICAR AMOSTRA XENO (1 XENO · 220 CR)"}</button>
    <button type="button" class="btn" id="oz-lab-piercing" ${!labBuilt || piercing ? "disabled" : ""} style="width:100%">${piercing ? "MUNIÇÃO PERFURANTE XENO ATIVA ✓" : "PESQUISAR MUNIÇÃO PERFURANTE (2 XENO · 650 CR · 16 MAT)"}</button>
  `;
  container.appendChild(labBox);

  bindFacilityExtraEvents(container, armBuilt);
}

function renderArsenalShopItems(armBuilt) {
  const box = document.getElementById("oz-shop-items");
  if (!box) return;
  box.innerHTML = "";
  const gear = getOpGear(selectedShopOpIndex);
  const opName = OPERATIVES[selectedShopOpIndex][0];

  if (selectedShopCategory === "weapon") {
    WEAPONS_SHOP.forEach(w => {
      const equipped = gear.weaponId === w.id;
      const itemRow = document.createElement("div");
      itemRow.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 8px;border:1px solid rgba(255,255,255,.12);border-radius:6px";
      itemRow.innerHTML = `<div style="font-size:12px"><b>${w.name}</b> (${w.dmg} DMG · Alcance ${w.optRange})<br><small style="color:var(--muted)">${w.desc}</small></div>`;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn";
      btn.disabled = !armBuilt || equipped;
      btn.textContent = equipped ? "EQUIPADA ✓" : (w.credits === 0 && w.materials === 0 ? "EQUIPAR" : `COMPRAR (${w.credits} CR · ${w.materials} MAT)`);
      btn.onclick = () => {
        if (state.credits < w.credits || state.materials < w.materials) {
          logModal("RECURSOS INSUFICIENTES", `Precisas de <b>${w.credits} CR</b> e <b>${w.materials} MAT</b>.`);
          return;
        }
        state.credits -= w.credits;
        state.materials -= w.materials;
        gear.weaponId = w.id;
        save();
        renderResources();
        renderRoster();
        renderBuildings();
        logModal("ARMA EQUIPADA", `<b>${w.name}</b> equipada em <b>${opName}</b>.`);
      };
      itemRow.appendChild(btn);
      box.appendChild(itemRow);
    });
    return;
  }

  if (selectedShopCategory === "outfit") {
    OUTFITS_SHOP.forEach(o => {
      const equipped = gear.outfitId === o.id;
      const itemRow = document.createElement("div");
      itemRow.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 8px;border:1px solid rgba(255,255,255,.12);border-radius:6px";
      itemRow.innerHTML = `<div style="font-size:12px"><b>${o.name}</b> (+${o.hpBonus} HP · -${o.dmgRed} Dano)<br><small style="color:var(--muted)">${o.desc}</small></div>`;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn";
      btn.disabled = !armBuilt || equipped;
      btn.textContent = equipped ? "EQUIPADA ✓" : (o.credits === 0 && o.materials === 0 ? "EQUIPAR" : `COMPRAR (${o.credits} CR · ${o.materials} MAT)`);
      btn.onclick = () => {
        if (state.credits < o.credits || state.materials < o.materials) {
          logModal("RECURSOS INSUFICIENTES", `Precisas de <b>${o.credits} CR</b> e <b>${o.materials} MAT</b>.`);
          return;
        }
        state.credits -= o.credits;
        state.materials -= o.materials;
        gear.outfitId = o.id;
        setOpHp(selectedShopOpIndex, Math.max(getOpHp(selectedShopOpIndex), getMaxHp(selectedShopOpIndex)));
        save();
        renderResources();
        renderRoster();
        renderBuildings();
        logModal("FARDA EQUIPADA", `<b>${o.name}</b> equipada em <b>${opName}</b>.`);
      };
      itemRow.appendChild(btn);
      box.appendChild(itemRow);
    });
    return;
  }

  const catList = CONSUMABLES_SHOP[selectedShopCategory] || CONSUMABLES_SHOP.frag;
  const currentCount = gear[selectedShopCategory] || 0;
  catList.forEach(c => {
    const itemRow = document.createElement("div");
    itemRow.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 8px;border:1px solid rgba(255,255,255,.12);border-radius:6px";
    itemRow.innerHTML = `<div style="font-size:12px"><b>${c.name}</b> · Atual: <b>${currentCount}</b><br><small style="color:var(--muted)">${c.desc}</small></div>`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn";
    btn.disabled = !armBuilt;
    btn.textContent = `COMPRAR (${c.credits} CR · ${c.materials} MAT)`;
    btn.onclick = () => {
      if (state.credits < c.credits || state.materials < c.materials) {
        logModal("RECURSOS INSUFICIENTES", `Precisas de <b>${c.credits} CR</b> e <b>${c.materials} MAT</b>.`);
        return;
      }
      state.credits -= c.credits;
      state.materials -= c.materials;
      gear[selectedShopCategory] = (gear[selectedShopCategory] || 0) + c.qty;
      save();
      renderResources();
      renderRoster();
      renderBuildings();
      logModal("SUPRIMENTO ADQUIRIDO", `Adicionado <b>${c.name}</b> para <b>${opName}</b>.`);
    };
    itemRow.appendChild(btn);
    box.appendChild(itemRow);
  });
}

function bindFacilityExtraEvents(container, armBuilt) {
  const trainOpSel = container.querySelector("#oz-train-op");
  if (trainOpSel) trainOpSel.onchange = e => { expTrainOp = Number(e.target.value); renderBuildings(); };

  const trainStatSel = container.querySelector("#oz-train-stat");
  if (trainStatSel) trainStatSel.onchange = e => { expTrainStat = Number(e.target.value); };

  const trainBtn = container.querySelector("#oz-btn-train");
  if (trainBtn) {
    trainBtn.onclick = () => {
      const prog = getOpProgress(expTrainOp);
      const op = OPERATIVES[expTrainOp];
      const curVal = op[3][expTrainStat];
      if (curVal >= 99) {
        logModal("MÁXIMO ATINGIDO", `${STAT_NAMES[expTrainStat]} de ${op[0]} já está no máximo.`);
        return;
      }
      if (prog.trainPoints > 0) {
        prog.trainPoints -= 1;
        op[3][expTrainStat] = Math.min(99, curVal + 3);
        save();
        renderResources();
        renderRoster();
        renderBuildings();
        logModal("TREINO CONCLUÍDO", `${op[0]} recebeu <b>+3 em ${STAT_NAMES[expTrainStat]}</b>.`);
        return;
      }
      if (state.credits < 260 || state.materials < 7) {
        logModal("RECURSOS INSUFICIENTES", "Treinar sem Pontos de Treino custa <b>260 CR</b> e <b>7 MAT</b>.");
        return;
      }
      state.credits -= 260;
      state.materials -= 7;
      op[3][expTrainStat] = Math.min(99, curVal + 2);
      save();
      renderResources();
      renderRoster();
      renderBuildings();
      logModal("TREINO INTENSIVO", `${op[0]} recebeu <b>+2 em ${STAT_NAMES[expTrainStat]}</b>.`);
    };
  }

  const restBtn = container.querySelector("#oz-btn-rest");
  if (restBtn) {
    restBtn.onclick = () => {
      if (state.selected.includes(expTrainOp)) {
        logModal("EM EQUIPA ATIVA", `${OPERATIVES[expTrainOp][0]} está na equipa ativa.`);
        return;
      }
      const maxHp = getMaxHp(expTrainOp);
      const curHp = getOpHp(expTrainOp);
      if (curHp >= maxHp) {
        logModal("HP COMPLETO", `${OPERATIVES[expTrainOp][0]} já está com HP máximo.`);
        return;
      }
      if (state.credits < 90) {
        logModal("CRÉDITOS INSUFICIENTES", "O descanso rápido custa <b>90 CR</b>.");
        return;
      }
      const healAmt = getBarracksRestHeal() + 10;
      state.credits -= 90;
      setOpHp(expTrainOp, curHp + healAmt);
      save();
      renderResources();
      renderRoster();
      renderBuildings();
      logModal("DESCANSO CONCLUÍDO", `${OPERATIVES[expTrainOp][0]} recuperou <b>+${Math.min(maxHp - curHp, healAmt)} HP</b>.`);
    };
  }

  const medOpSel = container.querySelector("#oz-med-op");
  if (medOpSel) medOpSel.onchange = e => { expMedOp = Number(e.target.value); };

  const healBtn = container.querySelector("#oz-btn-heal");
  if (healBtn) {
    healBtn.onclick = () => {
      const maxHp = getMaxHp(expMedOp);
      const curHp = getOpHp(expMedOp);
      if (curHp >= maxHp) {
        logModal("SEM FERIMENTOS", `${OPERATIVES[expMedOp][0]} já está com HP máximo.`);
        return;
      }
      const cost = getHealCost(expMedOp);
      if (state.credits < cost) {
        logModal("CRÉDITOS INSUFICIENTES", `O tratamento custa <b>${cost} CR</b>.`);
        return;
      }
      state.credits -= cost;
      setOpHp(expMedOp, maxHp);
      save();
      renderResources();
      renderRoster();
      renderBuildings();
      logModal("TRATAMENTO CONCLUÍDO", `${OPERATIVES[expMedOp][0]} recuperou para <b>${maxHp}/${maxHp} HP</b>.`);
    };
  }

  const urgentBtn = container.querySelector("#oz-btn-urgent");
  if (urgentBtn) {
    urgentBtn.onclick = () => {
      const maxHp = getMaxHp(expMedOp);
      const curHp = getOpHp(expMedOp);
      if (curHp >= maxHp) {
        logModal("SEM FERIMENTOS", `${OPERATIVES[expMedOp][0]} já está com HP máximo.`);
        return;
      }
      const cost = Math.max(120, Math.round(getHealCost(expMedOp) * 1.35));
      if (state.credits < cost) {
        logModal("CRÉDITOS INSUFICIENTES", `O cuidado urgente custa <b>${cost} CR</b>.`);
        return;
      }
      state.credits -= cost;
      setOpHp(expMedOp, maxHp);
      save();
      renderResources();
      renderRoster();
      renderBuildings();
      logModal("CUIDADO URGENTE", `${OPERATIVES[expMedOp][0]} estabilizado com <b>${maxHp}/${maxHp} HP</b>.`);
    };
  }

  const prophBtn = container.querySelector("#oz-btn-proph");
  if (prophBtn) {
    prophBtn.onclick = () => {
      if (state.medProphylaxis[expMedOp]) {
        logModal("PROFILAXIA ATIVA", `${OPERATIVES[expMedOp][0]} já tem profilaxia para a próxima missão.`);
        return;
      }
      if (state.credits < 180 || state.materials < 4) {
        logModal("RECURSOS INSUFICIENTES", "Profilaxia custa <b>180 CR</b> e <b>4 MAT</b>.");
        return;
      }
      state.credits -= 180;
      state.materials -= 4;
      state.medProphylaxis[expMedOp] = true;
      setOpHp(expMedOp, Math.min(getMaxHp(expMedOp), getOpHp(expMedOp) + 8));
      save();
      renderResources();
      renderRoster();
      renderBuildings();
      logModal("PROFILAXIA APLICADA", `${OPERATIVES[expMedOp][0]} recebeu <b>+8 HP</b> para a próxima missão.`);
    };
  }

  const shopOpSel = container.querySelector("#oz-shop-op");
  if (shopOpSel) {
    shopOpSel.onchange = e => {
      selectedShopOpIndex = Number(e.target.value);
      renderArsenalShopItems(armBuilt);
    };
  }

  container.querySelectorAll("[data-shop-cat]").forEach(btn => {
    btn.onclick = () => {
      selectedShopCategory = btn.getAttribute("data-shop-cat");
      renderArsenalShopItems(armBuilt);
    };
  });

  renderArsenalShopItems(armBuilt);

  const resupplyBtn = container.querySelector("#oz-btn-resupply");
  if (resupplyBtn) {
    resupplyBtn.onclick = () => {
      const squad = state.selected;
      const needCr = squad.length * 150;
      const needMat = squad.length * 3;
      if (state.credits < needCr || state.materials < needMat) {
        logModal("RECURSOS INSUFICIENTES", `Reabastecer custa <b>${needCr} CR</b> e <b>${needMat} MAT</b>.`);
        return;
      }
      state.credits -= needCr;
      state.materials -= needMat;
      squad.forEach(idx => {
        const g = getOpGear(idx);
        g.frag = Math.max(g.frag || 0, 1);
        g.smoke = Math.max(g.smoke || 0, 1);
        g.medkit = Math.max(g.medkit || 0, 1);
      });
      save();
      renderResources();
      renderRoster();
      renderBuildings();
      logModal("ESQUADRA REABASTECIDA", "Cada operacional ativo tem agora pelo menos 1 Frag, 1 Fumo e 1 Kit.");
    };
  }

  const armTierBtn = container.querySelector("#oz-btn-arm-tier");
  if (armTierBtn) {
    armTierBtn.onclick = () => {
      const cur = state.armoryTier || 0;
      if (cur >= 2) return;
      const needCr = cur === 0 ? 550 : 900;
      const needMat = cur === 0 ? 14 : 22;
      if (state.credits < needCr || state.materials < needMat) {
        logModal("RECURSOS INSUFICIENTES", `Melhoria de armamento custa <b>${needCr} CR</b> e <b>${needMat} MAT</b>.`);
        return;
      }
      state.credits -= needCr;
      state.materials -= needMat;
      state.armoryTier = cur + 1;
      save();
      renderResources();
      renderRoster();
      renderBuildings();
      logModal("ARMAMENTO MELHORADO", `Nível de armamento subiu para <b>${state.armoryTier}/2</b>.`);
    };
  }

  const labWpnBtn = container.querySelector("#oz-lab-wpn");
  if (labWpnBtn) {
    labWpnBtn.onclick = () => {
      const cur = state.lab.weaponTier || 0;
      if (cur >= 2) return;
      const needAlien = cur === 0 ? 1 : 2;
      const needCr = cur === 0 ? 300 : 550;
      if ((state.alien || 0) < needAlien || state.credits < needCr) {
        logModal("RECURSOS INSUFICIENTES", `Precisas de <b>${needAlien} XENO</b> e <b>${needCr} CR</b>.`);
        return;
      }
      state.alien -= needAlien;
      state.credits -= needCr;
      state.lab.weaponTier = cur + 1;
      save();
      renderResources();
      renderRoster();
      renderBuildings();
      logModal("PESQUISA CONCLUÍDA", `Armas Xeno no nível <b>${state.lab.weaponTier}/2</b>.`);
    };
  }

  const labIntBtn = container.querySelector("#oz-lab-int");
  if (labIntBtn) {
    labIntBtn.onclick = () => {
      const cur = state.lab.intelTier || 0;
      if (cur >= 2) return;
      const needAlien = cur === 0 ? 1 : 2;
      const needCr = cur === 0 ? 300 : 550;
      if ((state.alien || 0) < needAlien || state.credits < needCr) {
        logModal("RECURSOS INSUFICIENTES", `Precisas de <b>${needAlien} XENO</b> e <b>${needCr} CR</b>.`);
        return;
      }
      state.alien -= needAlien;
      state.credits -= needCr;
      state.lab.intelTier = cur + 1;
      save();
      renderResources();
      renderBuildings();
      logModal("PESQUISA CONCLUÍDA", `Informação Xeno no nível <b>${state.lab.intelTier}/2</b>.`);
    };
  }

  const labArmBtn = container.querySelector("#oz-lab-arm");
  if (labArmBtn) {
    labArmBtn.onclick = () => {
      const cur = state.lab.armorTier || 0;
      if (cur >= 2) return;
      const needAlien = cur === 0 ? 1 : 2;
      const needCr = cur === 0 ? 350 : 600;
      if ((state.alien || 0) < needAlien || state.credits < needCr) {
        logModal("RECURSOS INSUFICIENTES", `Precisas de <b>${needAlien} XENO</b> e <b>${needCr} CR</b>.`);
        return;
      }
      state.alien -= needAlien;
      state.credits -= needCr;
      state.lab.armorTier = cur + 1;
      save();
      renderResources();
      renderRoster();
      renderBuildings();
      logModal("PESQUISA CONCLUÍDA", `Blindagem Xeno no nível <b>${state.lab.armorTier}/2</b>.`);
    };
  }

  const labTargetSel = container.querySelector("#oz-lab-target");
  if (labTargetSel) labTargetSel.onchange = e => { expLabTarget = e.target.value; };

  const labDecodeBtn = container.querySelector("#oz-lab-decode");
  if (labDecodeBtn) {
    labDecodeBtn.onclick = () => {
      const cur = state.lab.intelDecoded || 0;
      if (cur >= 2) return;
      if ((state.alien || 0) < 1 || state.credits < 220) {
        logModal("RECURSOS INSUFICIENTES", "Descodificar amostra custa <b>1 XENO</b> e <b>220 CR</b>.");
        return;
      }
      state.alien -= 1;
      state.credits -= 220;
      state.lab.intelDecoded = cur + 1;
      save();
      renderResources();
      renderBuildings();
      logModal("AMOSTRA DESCODIFICADA", `Relatórios táticos no nível <b>${state.lab.intelDecoded}/2</b>.`);
    };
  }

  const labPiercingBtn = container.querySelector("#oz-lab-piercing");
  if (labPiercingBtn) {
    labPiercingBtn.onclick = () => {
      if (state.lab.piercingAmmo) return;
      if ((state.alien || 0) < 2 || state.credits < 650 || state.materials < 16) {
        logModal("RECURSOS INSUFICIENTES", "Munição Perfurante custa <b>2 XENO</b>, <b>650 CR</b> e <b>16 MAT</b>.");
        return;
      }
      state.alien -= 2;
      state.credits -= 650;
      state.materials -= 16;
      state.lab.piercingAmmo = true;
      save();
      renderResources();
      renderRoster();
      renderBuildings();
      logModal("MUNIÇÃO PERFURANTE ATIVA", "Armas agora ganham <b>+4 dano</b> e <b>[AP]</b>.");
    };
  }

  container.querySelectorAll("select option").forEach(opt => {
    opt.style.backgroundColor = "#0e161d";
    opt.style.color = "#f2f7fa";
  });
}

function renderMissions() {
  const list = document.getElementById("mission-list");
  if (!list) return;
  list.innerHTML = "";

  const cc = state.commandCenter || { built: false, level: 0, reconReady: false };
  if (cc.built && cc.reconReady) {
    const reconBanner = document.createElement("div");
    reconBanner.style.cssText = "margin-bottom:10px;padding:8px 10px;border:1px solid var(--lime);border-radius:6px;font-size:12px;color:var(--lime)";
    reconBanner.textContent = "Reconhecimento do Centro de Comando pronto: +15% de precisão no Turno 1.";
    list.appendChild(reconBanner);
  }

  MISSIONS.forEach((m, idx) => {
    const done = state.completed.includes(idx);
    const card = document.createElement("div");
    card.className = "building";
    card.style.cssText = "display:flex;flex-direction:column;align-items:stretch;gap:8px;margin-bottom:10px";

    card.innerHTML = `
      <div>
        <b>${m.title}</b> ${done ? `<span style="color:var(--lime)">· CONCLUÍDA ✓</span>` : ""}<br>
        <small style="color:var(--muted)">${m.desc}</small><br>
        <small style="color:#6ef7ff">Recompensa: ${m.rewardCredits} CR · ${m.rewardMaterials} MAT · ${m.xpBase} XP · Bónus: ${m.secondaryLabel} (+${m.bonusCredits} CR / +${m.bonusMaterials} MAT)</small>
      </div>
      <button type="button" class="btn primary" data-launch="${idx}">INICIAR OPERAÇÃO</button>
    `;

    const launchBtn = card.querySelector(`[data-launch="${idx}"]`);
    if (launchBtn) {
      launchBtn.onclick = () => startMission(idx);
    }

    list.appendChild(card);
  });
}

function buildEnemiesForMission(missionIndex) {
  const baseTemplates = [
    { name: "Drone Sentinela", role: "flanker", hp: 46, maxHp: 46, dmg: 14, aim: 62, move: 3, x: 6, y: 1 },
    { name: "Assaltante Xeno", role: "flanker", hp: 54, maxHp: 54, dmg: 17, aim: 66, move: 4, x: 6, y: 3 },
    { name: "Caçador de Cobertura", role: "skirmisher", hp: 62, maxHp: 62, dmg: 19, aim: 64, move: 3, x: 7, y: 4 }
  ];
  const extra = missionIndex >= 1 ? [{ name: "Guardião Blindado", role: "skirmisher", hp: 78, maxHp: 78, dmg: 22, aim: 68, move: 2, x: 7, y: 2 }] : [];
  const extra2 = missionIndex >= 2 ? [{ name: "Ceifador de Assalto", role: "flanker", hp: 70, maxHp: 70, dmg: 24, aim: 72, move: 4, x: 5, y: 5 }] : [];
  return [...baseTemplates, ...extra, ...extra2].map((e, i) => ({ ...e, id: `en_${i}`, hunker: false }));
}

function startMission(missionIndex) {
  const idx = Number(missionIndex) || 0;
  const squadIndices = Array.isArray(state.selected) && state.selected.length > 0 ? state.selected.slice(0, 5) : [0];
  const startPositions = [[1, 1], [0, 2], [1, 3], [0, 4], [1, 5]];

  const units = squadIndices.map((opIdx, i) => {
    const op = OPERATIVES[opIdx] || OPERATIVES[0];
    const gear = getOpGear(opIdx);
    const wpn = getWeapon(opIdx);
    const maxHp = getMaxHp(opIdx);
    const curHp = getOpHp(opIdx);
    const spawnHp = curHp > 0 ? curHp : Math.max(25, Math.round(maxHp * 0.5));
    const [sx, sy] = startPositions[i] || [1, Math.min(GRID_H - 1, i + 1)];

    return {
      opIndex: opIdx,
      name: op[0],
      role: op[2],
      stats: op[3],
      x: sx,
      y: sy,
      hp: spawnHp,
      maxHp,
      ammo: wpn.mag || 6,
      maxAmmo: wpn.mag || 6,
      ap: 2,
      overwatch: false,
      hunker: false,
      frag: gear.frag || 0,
      smoke: gear.smoke || 0,
      medkit: gear.medkit || 0
    };
  });

  const cc = state.commandCenter || { built: false, level: 0, reconReady: false };
  const hasRecon = Boolean(cc.built && cc.reconReady);
  if (hasRecon) {
    cc.reconReady = false;
    save();
  }

  state.mission = idx;
  activeCombatMode = null;
  selectedTargetId = null;

  battle = {
    missionIndex: idx,
    turn: 1,
    activeUnitIdx: 0,
    units,
    enemies: buildEnemiesForMission(idx),
    smokes: [],
    finished: false,
    commandReconTurn1: hasRecon
  };

  go("tactical");
  const reconMsg = hasRecon ? " · Reconhecimento ativo (+15% precisão T1)" : "";
  battleLog(`Operação iniciada: ${MISSIONS[idx].title}${reconMsg}.`);
}

function battleLog(msg) {
  const logEl = document.getElementById("battle-log");
  if (logEl) logEl.textContent = msg;
}

function manhattanDist(ax, ay, bx, by) {
  return Math.abs(ax - bx) + Math.abs(ay - by);
}

function getCoverAt(x, y) {
  return COVERS.find(c => c.x === x && c.y === y) || null;
}

function isSmokeAt(x, y) {
  return battle.smokes.some(s => s.turns > 0 && manhattanDist(x, y, s.x, s.y) <= 1);
}

function getUnitAt(x, y) {
  return battle.units.find(u => u.hp > 0 && u.x === x && u.y === y) || null;
}

function getEnemyAt(x, y) {
  return battle.enemies.find(e => e.hp > 0 && e.x === x && e.y === y) || null;
}

function getTargetCoverBonus(attackerX, attackerY, targetX, targetY) {
  let bonus = 0;
  const dx = Math.sign(attackerX - targetX);
  const dy = Math.sign(attackerY - targetY);
  const checkCoords = [[targetX + dx, targetY], [targetX, targetY + dy], [targetX + dx, targetY + dy]];
  for (const [cx, cy] of checkCoords) {
    const cov = getCoverAt(cx, cy);
    if (cov) bonus = Math.max(bonus, cov.type === "full" ? 30 : 15);
  }
  return bonus;
}

function getActiveUnit() {
  if (!battle || !Array.isArray(battle.units) || battle.units.length === 0) return null;
  const alive = battle.units.filter(u => u.hp > 0);
  if (alive.length === 0) return null;
  let u = battle.units[battle.activeUnitIdx];
  if (!u || u.hp <= 0 || u.ap <= 0) {
    const nextIdx = battle.units.findIndex(item => item.hp > 0 && item.ap > 0);
    if (nextIdx !== -1) {
      battle.activeUnitIdx = nextIdx;
      u = battle.units[nextIdx];
    } else {
      const firstAlive = battle.units.findIndex(item => item.hp > 0);
      battle.activeUnitIdx = firstAlive !== -1 ? firstAlive : 0;
      u = battle.units[battle.activeUnitIdx];
    }
  }
  return u;
}

function calcHitChance(unit, enemy, isOverwatch = false) {
  const op = OPERATIVES[unit.opIndex] || OPERATIVES[0];
  const wpn = getWeapon(unit.opIndex);
  const aimStat = op[3][0] || 75;
  const dist = manhattanDist(unit.x, unit.y, enemy.x, enemy.y);

  let chance = aimStat + (wpn.hitBonus || 0) + getSquadSynergyBonus();
  chance -= Math.max(0, dist - (wpn.optRange || 5)) * 4;

  const covBonus = getTargetCoverBonus(unit.x, unit.y, enemy.x, enemy.y);
  const piercingFactor = wpn.piercing ? 0.5 : 1;
  chance -= Math.round(covBonus * piercingFactor);

  if (isSmokeAt(enemy.x, enemy.y)) chance -= 25;
  if (isOverwatch) chance -= 12;

  const decoded = Number(state.lab && state.lab.intelDecoded) || 0;
  if (decoded > 0) chance += expLabTarget === enemy.role ? decoded * 6 : decoded * 2;
  if (battle.commandReconTurn1 && battle.turn === 1) chance += 15;

  return Math.max(5, Math.min(98, Math.round(chance)));
}

function calcDamage(unit) {
  const wpn = getWeapon(unit.opIndex);
  const outfit = getEquippedOutfitItem(unit.opIndex);
  const intel = getLabIntelDebuff();
  const selfOutfitBonus = outfit.id === "exo_heavy" ? 2 : 0;
  return Math.max(6, (wpn.dmg || 20) + selfOutfitBonus - (intel.dmgRed || 0));
}

function canMoveTo(unit, tx, ty) {
  if (tx < 0 || tx >= GRID_W || ty < 0 || ty >= GRID_H) return false;
  if (getUnitAt(tx, ty) || getEnemyAt(tx, ty)) return false;
  const cov = getCoverAt(tx, ty);
  if (cov && cov.blocksSight) return false;
  const mobStat = unit.stats && unit.stats[1] ? unit.stats[1] : 72;
  const maxStep = unit.ap >= 2 ? 4 + Math.floor((mobStat - 70) / 10) : 3;
  const dist = manhattanDist(unit.x, unit.y, tx, ty);
  return dist >= 1 && dist <= Math.max(2, maxStep);
}

function selectNextUnitWithAp() {
  const nextIdx = battle.units.findIndex(u => u.hp > 0 && u.ap > 0);
  if (nextIdx !== -1) battle.activeUnitIdx = nextIdx;
}

function updateBattleSidePanel(active) {
  const titleEl = document.getElementById("battle-title");
  const turnEl = document.getElementById("turn-label");
  const selUnitEl = document.getElementById("selected-unit");
  const hpEl = document.getElementById("unit-hp");
  const apEl = document.getElementById("unit-ap");
  const ammoEl = document.getElementById("unit-ammo");
  const targetEl = document.getElementById("target-info");
  const chanceEl = document.getElementById("hit-chance");

  const mission = MISSIONS[battle.missionIndex] || MISSIONS[0];
  if (titleEl) titleEl.textContent = mission.title;
  if (turnEl) turnEl.textContent = `TURNO ${battle.turn}`;

  if (active) {
    if (selUnitEl) selUnitEl.textContent = active.name.toUpperCase();
    if (hpEl) hpEl.textContent = `${active.hp}/${active.maxHp} HP`;
    if (apEl) apEl.textContent = `${active.ap} PA`;
    if (ammoEl) ammoEl.textContent = `${active.ammo}/${active.maxAmmo} MUN`;
  }

  let targetEnemy = battle.enemies.find(e => e.hp > 0 && e.id === selectedTargetId) || null;
  if (!targetEnemy) targetEnemy = battle.enemies.find(e => e.hp > 0) || null;

  if (targetEnemy && active) {
    if (targetEl) targetEl.textContent = `${targetEnemy.name.toUpperCase()} (${targetEnemy.hp} HP)`;
    if (chanceEl) chanceEl.textContent = `CHANCE: ${calcHitChance(active, targetEnemy, false)}%`;
  } else {
    if (targetEl) targetEl.textContent = "NENHUM ALVO";
    if (chanceEl) chanceEl.textContent = "CHANCE: --%";
  }

  const fireBtn = document.getElementById("fire-btn");
  const reloadBtn = document.getElementById("reload-btn");
  const overwatchBtn = document.getElementById("overwatch-btn");
  const hunkerBtn = document.getElementById("hunker-btn");
  const medkitBtn = document.getElementById("medkit");
  const endTurnBtn = document.getElementById("end-turn");
  const retreatBtn = document.getElementById("retreat");

  if (fireBtn) {
    fireBtn.disabled = !active || battle.finished || active.ap <= 0 || active.ammo <= 0;
    fireBtn.onclick = () => {
      if (!active || !targetEnemy) return;
      performShot(active, targetEnemy);
    };
  }

  if (reloadBtn) {
    reloadBtn.disabled = !active || battle.finished || active.ap <= 0 || active.ammo >= active.maxAmmo;
    reloadBtn.onclick = () => {
      if (!active) return;
      active.ammo = active.maxAmmo;
      active.ap = Math.max(0, active.ap - 1);
      activeCombatMode = null;
      battleLog(`${active.name} recarregou (${active.ammo}/${active.maxAmmo}).`);
      if (active.ap <= 0) selectNextUnitWithAp();
      renderBattle();
    };
  }

  if (overwatchBtn) {
    overwatchBtn.disabled = !active || battle.finished || active.ap <= 0 || active.ammo <= 0 || active.overwatch;
    overwatchBtn.onclick = () => {
      if (!active) return;
      active.overwatch = true;
      active.hunker = false;
      active.ap = 0;
      activeCombatMode = null;
      battleLog(`${active.name} entrou em VIGILÂNCIA.`);
      selectNextUnitWithAp();
      renderBattle();
    };
  }

  if (hunkerBtn) {
    hunkerBtn.disabled = !active || battle.finished || active.ap <= 0 || active.hunker;
    hunkerBtn.onclick = () => {
      if (!active) return;
      active.hunker = true;
      active.overwatch = false;
      active.ap = 0;
      activeCombatMode = null;
      battleLog(`${active.name} em cobertura (HUNKER DOWN).`);
      selectNextUnitWithAp();
      renderBattle();
    };
  }

  if (medkitBtn) {
    medkitBtn.disabled = !active || battle.finished || active.ap <= 0 || active.medkit <= 0;
    medkitBtn.onclick = () => {
      if (!active) return;
      const wounded = battle.units.find(u => u.hp > 0 && u.hp < u.maxHp && manhattanDist(active.x, active.y, u.x, u.y) <= 2);
      if (!wounded) {
        battleLog("Nenhum aliado ferido a até 2 células de distância.");
        return;
      }
      useMedkit(active, wounded);
    };
  }

  if (endTurnBtn) {
    endTurnBtn.disabled = battle.finished;
    endTurnBtn.onclick = () => {
      activeCombatMode = null;
      runEnemyTurn();
    };
  }

  if (retreatBtn) {
    retreatBtn.onclick = () => {
      battle.finished = true;
      go("command");
    };
  }
}

function renderBattle() {
  const gridEl = document.getElementById("battle-grid");
  if (!gridEl) return;

  battle.smokes = battle.smokes.filter(s => s.turns > 0);
  const active = getActiveUnit();

  gridEl.style.display = "grid";
  gridEl.style.gridTemplateColumns = `repeat(${GRID_W}, minmax(0, 1fr))`;
  gridEl.style.gap = "4px";
  gridEl.innerHTML = "";

  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.cssText = "min-height:44px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.16);border-radius:4px;background:#121d26;color:#f2f7fa;font-size:10px;padding:2px;text-align:center";

      const unitHere = getUnitAt(x, y);
      const enemyHere = getEnemyAt(x, y);
      const covHere = getCoverAt(x, y);
      const smokeHere = isSmokeAt(x, y);

      const movable = Boolean(active && !battle.finished && active.ap > 0 && canMoveTo(active, x, y));
      if (movable) {
        cell.classList.add("move");
        cell.style.borderColor = "#42e88b";
      }

      if (smokeHere) cell.style.boxShadow = "inset 0 0 0 2px rgba(200,220,235,.65)";

      if (covHere) {
        const covTag = document.createElement("span");
        covTag.style.cssText = "font-size:8px;opacity:.8";
        covTag.textContent = covHere.type === "full" ? "COB-F" : "COB-M";
        cell.appendChild(covTag);
      }

      if (unitHere) {
        const badge = document.createElement("div");
        badge.className = "unit player";
        badge.style.cssText = `background:#1c4a6e;color:#fff;padding:1px 3px;border-radius:3px;font-weight:bold;${active && active.opIndex === unitHere.opIndex ? "outline:2px solid #b9ff3b;" : ""}`;
        badge.textContent = `${unitHere.name.split(" ")[0]} (${unitHere.hp})`;
        cell.appendChild(badge);
      }

      if (enemyHere) {
        const eBadge = document.createElement("div");
        eBadge.className = "unit enemy";
        eBadge.style.cssText = `background:#6b1d29;color:#fff;padding:1px 3px;border-radius:3px;font-weight:bold;${selectedTargetId === enemyHere.id ? "outline:2px solid #ff9d42;" : ""}`;
        eBadge.textContent = `${enemyHere.name.split(" ")[0]} (${enemyHere.hp})`;
        cell.appendChild(eBadge);
      }

      cell.onclick = () => {
        if (!active || battle.finished) return;

        if (enemyHere) {
          selectedTargetId = enemyHere.id;
          battleLog(`Alvo selecionado: ${enemyHere.name} (${calcHitChance(active, enemyHere, false)}% precisão).`);
          renderBattle();
          return;
        }

        if (movable) {
          active.x = x;
          active.y = y;
          active.ap = Math.max(0, active.ap - 1);
          active.hunker = false;
          battleLog(`${active.name} moveu-se para (${x + 1}, ${y + 1}).`);
          if (active.ap <= 0) selectNextUnitWithAp();
          renderBattle();
          return;
        }

        if (unitHere) {
          const idx = battle.units.findIndex(u => u.opIndex === unitHere.opIndex);
          if (idx !== -1 && unitHere.ap > 0) {
            battle.activeUnitIdx = idx;
            battleLog(`${unitHere.name} selecionado.`);
            renderBattle();
          }
        }
      };

      gridEl.appendChild(cell);
    }
  }

  updateBattleSidePanel(active);
}

function performShot(unit, enemy) {
  if (unit.ammo <= 0) {
    battleLog(`${unit.name} está sem munição — usa RECARREGAR.`);
    return;
  }

  const hitChance = calcHitChance(unit, enemy, false);
  unit.ammo = Math.max(0, unit.ammo - 1);
  unit.ap = 0;
  unit.hunker = false;

  if (Math.random() * 100 <= hitChance) {
    const dmg = calcDamage(unit);
    enemy.hp = Math.max(0, enemy.hp - dmg);
    battleLog(`${unit.name} acertou em ${enemy.name} (${hitChance}%) por ${dmg} de dano${enemy.hp <= 0 ? " — ALVO ELIMINADO" : ""}.`);
  } else {
    battleLog(`${unit.name} falhou o disparo contra ${enemy.name} (${hitChance}%).`);
  }

  checkWin();
  if (!battle.finished) {
    selectNextUnitWithAp();
    renderBattle();
  }
}

function useMedkit(unit, targetUnit) {
  const gear = getOpGear(unit.opIndex);
  unit.medkit = Math.max(0, unit.medkit - 1);
  gear.medkit = Math.max(0, (gear.medkit || 0) - 1);
  unit.ap = Math.max(0, unit.ap - 1);

  const healAmt = unit.role === "Médico" ? 50 : 40;
  const before = targetUnit.hp;
  targetUnit.hp = Math.min(targetUnit.maxHp, targetUnit.hp + healAmt);
  save();
  battleLog(`${unit.name} tratou ${targetUnit.name} (+${targetUnit.hp - before} HP).`);
  if (unit.ap <= 0) selectNextUnitWithAp();
  renderBattle();
}

function triggerOverwatchReactions(enemy) {
  for (const unit of battle.units) {
    if (enemy.hp <= 0) break;
    if (unit.hp > 0 && unit.overwatch && unit.ammo > 0) {
      unit.overwatch = false;
      unit.ammo = Math.max(0, unit.ammo - 1);
      const hitChance = calcHitChance(unit, enemy, true);
      if (Math.random() * 100 <= hitChance) {
        const dmg = calcDamage(unit);
        enemy.hp = Math.max(0, enemy.hp - dmg);
        battleLog(`VIGILÂNCIA: ${unit.name} atingiu ${enemy.name} (${hitChance}%) por ${dmg} de dano.`);
      } else {
        battleLog(`VIGILÂNCIA: ${unit.name} falhou contra ${enemy.name} (${hitChance}%).`);
      }
    }
  }
}

function runEnemyTurn() {
  if (battle.finished) return;
  const intelDebuff = getLabIntelDebuff();
  const events = [];

  for (const enemy of battle.enemies) {
    if (enemy.hp <= 0) continue;
    const livingUnits = battle.units.filter(u => u.hp > 0);
    if (livingUnits.length === 0) break;

    let target = livingUnits[0];
    let bestDist = manhattanDist(enemy.x, enemy.y, target.x, target.y);
    for (const u of livingUnits) {
      const d = manhattanDist(enemy.x, enemy.y, u.x, u.y);
      if (d < bestDist) {
        bestDist = d;
        target = u;
      }
    }

    if (bestDist > 2) {
      const steps = Math.min(enemy.move || 3, bestDist - 2);
      for (let s = 0; s < steps; s++) {
        const dx = Math.sign(target.x - enemy.x);
        const dy = Math.sign(target.y - enemy.y);
        const candidates = [[enemy.x + dx, enemy.y], [enemy.x, enemy.y + dy]];
        let moved = false;
        for (const [nx, ny] of candidates) {
          if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) continue;
          if (getUnitAt(nx, ny) || getEnemyAt(nx, ny)) continue;
          const cov = getCoverAt(nx, ny);
          if (cov && cov.blocksSight) continue;
          enemy.x = nx;
          enemy.y = ny;
          moved = true;
          break;
        }
        if (moved) {
          triggerOverwatchReactions(enemy);
          if (enemy.hp <= 0) break;
        } else {
          break;
        }
      }
    }

    if (enemy.hp <= 0) continue;

    const outfit = getEquippedOutfitItem(target.opIndex);
    const covBonus = getTargetCoverBonus(enemy.x, enemy.y, target.x, target.y);
    let hitChance = (enemy.aim || 64) - (intelDebuff.aimPen || 0) - covBonus - (outfit.dodgeBonus || 0);
    if (target.hunker) hitChance -= 25;
    if (isSmokeAt(target.x, target.y)) hitChance -= 25;
    hitChance = Math.max(8, Math.min(92, Math.round(hitChance)));

    if (Math.random() * 100 <= hitChance) {
      const rawDmg = enemy.dmg || 16;
      const armorRed = (outfit.dmgRed || 0) + (getLabArmorBonus().dmgRed || 0);
      const finalDmg = Math.max(4, rawDmg - armorRed);
      target.hp = Math.max(0, target.hp - finalDmg);
      events.push(`${enemy.name} atingiu ${target.name} (-${finalDmg} HP)`);
    } else {
      events.push(`${enemy.name} falhou contra ${target.name}`);
    }

    checkWin();
    if (battle.finished) return;
  }

  battle.turn += 1;
  battle.smokes.forEach(s => { s.turns = Math.max(0, s.turns - 1); });
  battle.smokes = battle.smokes.filter(s => s.turns > 0);
  battle.units.forEach(u => {
    if (u.hp > 0) {
      u.ap = 2;
      u.overwatch = false;
      u.hunker = false;
    }
  });

  selectNextUnitWithAp();
  renderBattle();
  battleLog(events.length > 0 ? `Turno inimigo: ${events.join(" · ")}.` : `Turno ${battle.turn} da esquadra.`);
}

function checkWin() {
  if (battle.finished) return;
  const allEnemiesDead = battle.enemies.every(e => e.hp <= 0);
  const allUnitsDead = battle.units.every(u => u.hp <= 0);
  if (!allEnemiesDead && !allUnitsDead) return;

  battle.finished = true;
  activeCombatMode = null;

  const mission = MISSIONS[battle.missionIndex] || MISSIONS[0];
  battle.units.forEach(u => setOpHp(u.opIndex, u.hp));
  state.medProphylaxis = {};

  const restHeal = getBarracksRestHeal();
  OPERATIVES.forEach((_, idx) => {
    if (!state.selected.includes(idx)) {
      const cur = getOpHp(idx);
      if (cur > 0) setOpHp(idx, cur + restHeal);
    }
  });

  if (allEnemiesDead) {
    if (!state.completed.includes(battle.missionIndex)) state.completed.push(battle.missionIndex);

    let secondaryMet = false;
    if (mission.secondaryType === "clear_all") secondaryMet = true;
    else if (mission.secondaryType === "no_casualties") secondaryMet = battle.units.every(u => u.hp > 0);
    else if (mission.secondaryType === "fast_clear") secondaryMet = battle.turn <= 6;

    let totalCr = mission.rewardCredits + (secondaryMet ? mission.bonusCredits : 0);
    let totalMat = mission.rewardMaterials + (secondaryMet ? mission.bonusMaterials : 0);
    let alienGain = 1;

    const cc = state.commandCenter || { built: false, level: 0 };
    let ccNote = "";
    if (cc.built) {
      const lv = cc.level || 1;
      const extraCr = lv >= 2 ? 180 : 90;
      const extraMat = lv >= 2 ? 6 : 3;
      totalCr += extraCr;
      totalMat += extraMat;
      let extraAlien = 0;
      if (lv >= 2 && Math.random() < 0.65) {
        extraAlien = 1;
        alienGain += 1;
      }
      ccNote = `<br><small style="color:#6ef7ff">Centro de Comando (Nv.${lv}): +${extraCr} CR · +${extraMat} MAT${extraAlien ? " · +1 Tec. Alienígena" : ""}</small>`;
    }

    state.credits += totalCr;
    state.materials += totalMat;
    state.alien = (state.alien || 0) + alienGain;

    const levelNotes = [];
    battle.units.forEach(u => {
      const xpGain = u.hp > 0 ? mission.xpBase : Math.round(mission.xpBase * 0.5);
      const ups = grantOpXp(u.opIndex, xpGain);
      if (ups > 0) levelNotes.push(`${u.name} subiu para Nv.${getOpProgress(u.opIndex).level}`);
    });

    save();
    renderResources();
    renderRoster();
    renderBuildings();
    renderMissions();
    renderBattle();

    const lvlHtml = levelNotes.length > 0 ? `<br><b>Promoções:</b> ${levelNotes.join(" · ")}` : "";
    const secHtml = secondaryMet
      ? `<br>Objetivo secundário concluído: <b>+${mission.bonusCredits} CR · +${mission.bonusMaterials} MAT</b>`
      : `<br><small style="color:var(--muted)">Objetivo secundário não cumprido (${mission.secondaryLabel}).</small>`;

    logModal(
      "OPERAÇÃO CONCLUÍDA",
      `Vitória em <b>${mission.title}</b>!<br>Recompensa: <b>+${totalCr} CR · +${totalMat} MAT · +${alienGain} Tec. Alienígena</b>${secHtml}${ccNote}${lvlHtml}`,
      "command"
    );
  } else {
    save();
    renderResources();
    renderRoster();
    renderBuildings();
    renderMissions();
    renderBattle();

    logModal(
      "ESQUADRA INCAPACITADA",
      "Todos os operacionais caíram em combate. Recupera a equipa nas Instalações.",
      "command"
    );
  }
}

function initOperationZero() {
  hideModalImmediately();
  bindNavigation();
  renderResources();
  renderRoster();
  renderBuildings();
  renderMissions();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initOperationZero);
} else {
  initOperationZero();
}