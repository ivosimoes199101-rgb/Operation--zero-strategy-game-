const OPERATIVES = [
  ["Kael Vance", "SECTOR 04", "Assalto", [76, 72, 68, 70], "Especialista em avanço rápido, flanqueamento e pressão a curta distância."],
  ["Lyra Chen", "SECTOR 07", "Sniper", [84, 65, 62, 66], "Atiradora de precisão de longo alcance, ideal para eliminar alvos prioritários."],
  ["Marcus Thorne", "SECTOR 02", "Médico", [68, 70, 74, 78], "Suporte vital em campo, estabiliza feridos e mantém a coesão da esquadra."],
  ["Soraia Mendes", "SECTOR 09", "Engenheira", [72, 75, 72, 74], "Perita em demolição, coberturas, dispositivos táticos e controlo de área."],
  ["Darius Kane", "SECTOR 01", "Armas pesadas", [70, 66, 82, 72], "Fogo de supressão e elevada resistência sob fogo inimigo."],
  ["Elena Rostova", "SECTOR 05", "Batedora", [79, 78, 66, 75], "Reconhecimento avançado, mobilidade e ataques de oportunidade."]
];

const STAT_NAMES = ["Pontaria", "Mobilidade", "Blindagem", "Disciplina"];

const ROLE_PERKS = {
  "Assalto": "Perícia: +5% precisão a curta distância (<=4 casas).",
  "Sniper": "Perícia: +6% precisão e +5% crítico a longo alcance (>=5 casas).",
  "Médico": "Perícia: cura +10 HP extra em campo e com Kit de Saúde.",
  "Engenheira": "Perícia: reduz em -5% o bónus de cobertura do alvo.",
  "Armas pesadas": "Perícia: reduz em -2 o dano recebido em ataques diretos.",
  "Batedora": "Perícia: +6% precisão ao flanquear e +5% em Vigilância."
};

const WEAPONS_BY_ROLE = {
  "Assalto": { name: "RIFLE DE ASSALTO MK-II", mag: 24, dmg: 24, optRange: 4 },
  "Sniper": { name: "CARABINA DE PRECISÃO X-9", mag: 8, dmg: 38, optRange: 6 },
  "Médico": { name: "SUBMETRALHADORA MÉDICA", mag: 30, dmg: 18, optRange: 3 },
  "Engenheira": { name: "ESPINGARDA TÁTICA BREACHER", mag: 12, dmg: 30, optRange: 3 },
  "Armas pesadas": { name: "METRALHADORA PESADA SAW", mag: 40, dmg: 26, optRange: 4 },
  "Batedora": { name: "RIFLE TÁTICO RECON", mag: 20, dmg: 22, optRange: 5 }
};

const WEAPONS_SHOP = [
  { id: "wpn_std", name: "Padrão da Classe", credits: 0, materials: 0, dmgBonus: 0, magBonus: 0, hitBonus: 0, desc: "Equipamento base de serviço." },
  { id: "wpn_reflex", name: "Mira Reflex Tática", credits: 320, materials: 6, dmgBonus: 3, magBonus: 0, hitBonus: 6, desc: "+3 dano e +6% precisão." },
  { id: "wpn_hv", name: "Munição Alta Velocidade", credits: 480, materials: 10, dmgBonus: 7, magBonus: 4, hitBonus: 3, desc: "+7 dano, +4 munições e +3% precisão." },
  { id: "wpn_zero", name: "Cano Estriado ZERO-X", credits: 720, materials: 15, dmgBonus: 12, magBonus: 6, hitBonus: 8, desc: "+12 dano, +6 munições e +8% precisão." }
];

const OUTFITS_SHOP = [
  { id: "out_std", name: "Farda Operacional Padrão", credits: 0, materials: 0, hpBonus: 0, dmgRed: 0, dodgeBonus: 0, desc: "Farda regulamentar sem blindagem extra." },
  { id: "out_kevlar", name: "Farda Kevlar Leve", credits: 300, materials: 6, hpBonus: 10, dmgRed: 2, dodgeBonus: 4, desc: "+10 HP máx., -2 dano recebido e +4% esquiva." },
  { id: "out_tactical", name: "Traje Tático Reforçado", credits: 520, materials: 11, hpBonus: 20, dmgRed: 4, dodgeBonus: 6, desc: "+20 HP máx., -4 dano recebido e +6% esquiva." },
  { id: "out_aegis", name: "Exofarda AEGIS-01", credits: 780, materials: 16, hpBonus: 30, dmgRed: 6, dodgeBonus: 8, desc: "+30 HP máx., -6 dano recebido e +8% esquiva." }
];

const CONSUMABLES_SHOP = {
  frag: [
    { id: "frag_1", name: "Granada Fragmentação (x1)", qty: 1, credits: 140, materials: 3, desc: "Explosão 3x3 com 32 de dano (ignora cobertura)." },
    { id: "frag_2", name: "Granadas Fragmentação (x2)", qty: 2, credits: 250, materials: 5, desc: "2 granadas de fragmentação (3x3, 32 dano cada)." }
  ],
  smoke: [
    { id: "smoke_1", name: "Granada de Fumo (x1)", qty: 1, credits: 120, materials: 2, desc: "Cortina 3x3 por 2 turnos (-30% precisão inimiga)." },
    { id: "smoke_2", name: "Granadas de Fumo (x2)", qty: 2, credits: 215, materials: 4, desc: "2 granadas de fumo (3x3 por 2 turnos)." }
  ],
  medkit: [
    { id: "med_1", name: "Kit de Saúde (x1)", qty: 1, credits: 130, materials: 3, desc: "Cura +40 HP em campo (+50 HP para Médico)." },
    { id: "med_2", name: "Kits de Saúde (x2)", qty: 2, credits: 230, materials: 5, desc: "2 kits de saúde de campo." }
  ]
};

const BUILDINGS = [
  ["Quartel", "Alojamento da equipa, seleção de esquadra, descanso e camaradagem.", 0, 0],
  ["Enfermaria", "Tratamento médico e recuperação acelerada de operacionais.", 700, 15],
  ["Arsenal", "Armamento avançado, fardas, granadas e kits táticos.", 900, 20],
  ["Laboratório", "Pesquisa de amostras alienígenas, armamento e informação inimiga.", 1100, 25]
];

const MISSIONS = [
  {
    title: "FIRST CONTACT",
    desc: "Reconhecimento e contenção no perímetro norte.",
    rewardCredits: 450,
    rewardMaterials: 14,
    bonusCredits: 200,
    bonusMaterials: 6,
    xpBase: 35,
    secondaryType: "clear_all",
    secondaryLabel: "Neutralizar todos os alvos"
  },
  {
    title: "BLACKOUT",
    desc: "Recuperar dados de comunicações sem baixas.",
    rewardCredits: 650,
    rewardMaterials: 20,
    bonusCredits: 280,
    bonusMaterials: 9,
    xpBase: 45,
    secondaryType: "no_casualties",
    secondaryLabel: "Terminar sem operacionais abatidos"
  },
  {
    title: "ZERO HOUR",
    desc: "Assalto final ao núcleo hostil em contenção rápida.",
    rewardCredits: 900,
    rewardMaterials: 28,
    bonusCredits: 380,
    bonusMaterials: 12,
    xpBase: 60,
    secondaryType: "fast_clear",
    secondaryLabel: "Concluir em até 6 turnos"
  }
];

const COVERS = [
  { x: 2, y: 1, type: "half", blocksSight: false },
  { x: 3, y: 2, type: "full", blocksSight: true },
  { x: 4, y: 4, type: "half", blocksSight: false },
  { x: 5, y: 3, type: "full", blocksSight: true }
];
let state = {
  credits: 1800,
  materials: 45,
  alien: 2,
  built: [0],
  barracksLevel: 1,
  lab: {
    weaponTier: 0,
    intelTier: 0,
    armorTier: 0
  },
  completed: [],
  selected: [0, 1, 2, 3],
  mission: 0,
  opHp: {},
  opGear: {},
  opProgress: {}
};

let selectedOpIndex = 0;
let selectedShopOpIndex = 0;
let selectedShopCategory = "weapon";
let selectedShopItemId = "wpn_reflex";
let selectedTrainOpIndex = 0;
let selectedTrainStatIndex = 0;
let activeCombatMode = null;

function save() {
  localStorage.setItem("oz_save", JSON.stringify(state));
}

function load() {
  const s = localStorage.getItem("oz_save");
  if (!s) return;
  try {
    const parsed = JSON.parse(s);
    if (parsed && typeof parsed === "object") {
      state = {
        ...state,
        ...parsed,
        lab: {
          weaponTier: 0,
          intelTier: 0,
          armorTier: 0,
          ...(parsed.lab && typeof parsed.lab === "object" ? parsed.lab : {})
        }
      };
    }
  } catch (e) {
    console.warn("Falha ao carregar oz_save:", e);
  }
}

load();

if (!Array.isArray(state.built)) state.built = [0];
if (!state.built.includes(0)) state.built.unshift(0);
if (!state.barracksLevel || typeof state.barracksLevel !== "number") state.barracksLevel = 1;
if (!state.opHp || typeof state.opHp !== "object") state.opHp = {};
if (!state.opGear || typeof state.opGear !== "object") state.opGear = {};
if (!state.opProgress || typeof state.opProgress !== "object") state.opProgress = {};
if (!Array.isArray(state.selected)) state.selected = [0, 1, 2, 3];

function getBarracksLevel() {
  return Math.max(1, Math.min(3, Number(state.barracksLevel) || 1));
}

function getBarracksUpgradeCost() {
  const lv = getBarracksLevel();
  if (lv === 1) return { credits: 650, materials: 15, nextLv: 2, hpBonus: 10, restHeal: 14 };
  if (lv === 2) return { credits: 1050, materials: 25, nextLv: 3, hpBonus: 20, restHeal: 20 };
  return null;
}

function getBarracksHpBonus() {
  const lv = getBarracksLevel();
  if (lv === 2) return 10;
  if (lv === 3) return 20;
  return 0;
}

function getBarracksRestHeal() {
  const lv = getBarracksLevel();
  if (lv === 1) return 8;
  if (lv === 2) return 14;
  return 20;
}

function getSquadSynergyBonus() {
  const count = Array.isArray(state.selected) ? state.selected.length : 0;
  if (count >= 4) return 6;
  if (count >= 2) return 3;
  return 0;
}

function getLabWeaponBonus() {
  const t = Number(state.lab && state.lab.weaponTier) || 0;
  if (t === 1) return { dmg: 5, hit: 3 };
  if (t === 2) return { dmg: 10, hit: 6 };
  return { dmg: 0, hit: 0 };
}

function getLabIntelDebuff() {
  const t = Number(state.lab && state.lab.intelTier) || 0;
  if (t === 1) return { aimPen: 8, dmgRed: 2 };
  if (t === 2) return { aimPen: 15, dmgRed: 4 };
  return { aimPen: 0, dmgRed: 0 };
}

function getLabArmorBonus() {
  const t = Number(state.lab && state.lab.armorTier) || 0;
  if (t === 1) return { hp: 10, dmgRed: 2 };
  if (t === 2) return { hp: 20, dmgRed: 4 };
  return { hp: 0, dmgRed: 0 };
}

function go(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.go === id));
  if (id === "roster") renderRoster();
  if (id === "base") renderBuildings();
  if (id === "missions") renderMissions();
}

document.querySelectorAll("[data-go]").forEach(b => {
  b.onclick = () => go(b.dataset.go);
});

function renderResources() {
  const c = document.getElementById("credits");
  const m = document.getElementById("materials");
  const a = document.getElementById("alien");
  if (c) c.textContent = state.credits;
  if (m) m.textContent = state.materials;
  if (a) a.textContent = state.alien;
}

let modalReturnScreen = null;

function logModal(title, body, returnScreen = null) {
  modalReturnScreen = returnScreen;
  const titleEl = document.getElementById("modal-title");
  const bodyEl = document.getElementById("modal-body");
  const modalEl = document.getElementById("modal");
  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.innerHTML = body;
  if (modalEl) modalEl.classList.add("open");
}

const closeModalBtn = document.getElementById("close-modal");
if (closeModalBtn) {
  closeModalBtn.onclick = () => {
    const modalEl = document.getElementById("modal");
    if (modalEl) modalEl.classList.remove("open");
    if (modalReturnScreen) {
      const dest = modalReturnScreen;
      modalReturnScreen = null;
      go(dest);
    }
  };
}
function getMaxHp(opIndex) {
  const op = OPERATIVES[opIndex];
  const base = op ? op[3][2] : 70;
  const outfit = getEquippedOutfitItem(opIndex);
  return base + (outfit.hpBonus || 0) + getBarracksHpBonus() + getLabArmorBonus().hp;
}

function getOpHp(opIndex) {
  const maxHp = getMaxHp(opIndex);
  if (typeof state.opHp[opIndex] !== "number") {
    state.opHp[opIndex] = maxHp;
  }
  return Math.max(0, Math.min(maxHp, state.opHp[opIndex]));
}

function setOpHp(opIndex, hp) {
  const maxHp = getMaxHp(opIndex);
  state.opHp[opIndex] = Math.max(0, Math.min(maxHp, Math.round(hp)));
}

function getInjurySeverity(hp, maxHp) {
  if (hp >= maxHp) return { label: "Pronto", color: "var(--lime)", multiplier: 0, baseCost: 0 };
  const ratio = hp / Math.max(1, maxHp);
  if (ratio >= 0.7) {
    return { label: "Ferimento Leve", color: "#ffd166", multiplier: 1.0, baseCost: 35 };
  }
  if (ratio >= 0.35) {
    return { label: "Ferimento Grave", color: "#ff9e5e", multiplier: 1.45, baseCost: 65 };
  }
  return { label: "Ferimento Muito Grave", color: "#ff5c77", multiplier: 1.9, baseCost: 105 };
}

function getOpProgress(opIndex) {
  const raw = state.opProgress[opIndex];
  if (!raw || typeof raw !== "object") {
    state.opProgress[opIndex] = { xp: 0, level: 1, trainPoints: 0 };
  } else {
    state.opProgress[opIndex] = {
      xp: Math.max(0, Number(raw.xp) || 0),
      level: Math.max(1, Number(raw.level) || 1),
      trainPoints: Math.max(0, Number(raw.trainPoints) || 0)
    };
  }
  return state.opProgress[opIndex];
}

function grantOpXp(opIndex, amount) {
  const prog = getOpProgress(opIndex);
  prog.xp += Math.max(0, Math.round(amount));
  let levelsGained = 0;
  while (prog.xp >= 100) {
    prog.xp -= 100;
    prog.level += 1;
    prog.trainPoints += 2;
    levelsGained += 1;
  }
  return levelsGained;
}

function getOpGear(opIndex) {
  const g = state.opGear[opIndex];
  if (!g || typeof g !== "object") {
    state.opGear[opIndex] = {
      weaponId: "wpn_std",
      outfitId: "out_std",
      frag: 0,
      smoke: 0,
      medkit: 0
    };
  } else {
    state.opGear[opIndex] = {
      weaponId: g.weaponId || "wpn_std",
      outfitId: g.outfitId || "out_std",
      frag: Math.max(0, Number(g.frag) || 0),
      smoke: Math.max(0, Number(g.smoke) || 0),
      medkit: Math.max(0, Number(g.medkit) || 0)
    };
  }
  return state.opGear[opIndex];
}

function getEquippedWeaponItem(opIndex) {
  const gear = getOpGear(opIndex);
  return WEAPONS_SHOP.find(w => w.id === gear.weaponId) || WEAPONS_SHOP[0];
}

function getEquippedOutfitItem(opIndex) {
  const gear = getOpGear(opIndex);
  return OUTFITS_SHOP.find(o => o.id === gear.outfitId) || OUTFITS_SHOP[0];
}

function getWeapon(opIndex) {
  const role = OPERATIVES[opIndex][2];
  const base = WEAPONS_BY_ROLE[role] || WEAPONS_BY_ROLE["Assalto"];
  const item = getEquippedWeaponItem(opIndex);
  const lab = getLabWeaponBonus();
  return {
    name: item.id === "wpn_std" ? base.name : `${base.name} + ${item.name}`,
    mag: base.mag + (item.magBonus || 0),
    dmg: base.dmg + (item.dmgBonus || 0) + lab.dmg,
    optRange: base.optRange,
    hitBonus: (item.hitBonus || 0) + lab.hit
  };
}

function getHealCost(opIndex) {
  const maxHp = getMaxHp(opIndex);
  const hp = getOpHp(opIndex);
  const missing = Math.max(0, maxHp - hp);
  if (missing === 0) return 0;
  const sev = getInjurySeverity(hp, maxHp);
  return Math.max(40, Math.round((sev.baseCost + missing * 3.2) * sev.multiplier));
}

function healOperative(opIndex) {
  if (!state.built.includes(1)) {
    logModal("ENFERMARIA EM FALTA", "Constrói primeiro a <b>Enfermaria</b> na base para tratar operacionais feridos.");
    return;
  }
  const maxHp = getMaxHp(opIndex);
  const hp = getOpHp(opIndex);
  if (hp >= maxHp) {
    logModal("SEM FERIMENTOS", `${OPERATIVES[opIndex][0]} já está com os HP máximos.`);
    return;
  }
  const cost = getHealCost(opIndex);
  if (state.credits < cost) {
    logModal("CRÉDITOS INSUFICIENTES", `Precisas de <b>${cost} créditos</b> para tratar ${OPERATIVES[opIndex][0]}.`);
    return;
  }
  state.credits -= cost;
  setOpHp(opIndex, maxHp);
  save();
  renderResources();
  renderRoster();
  logModal("TRATAMENTO CONCLUÍDO", `${OPERATIVES[opIndex][0]} recuperou totalmente (${maxHp}/${maxHp} HP) por <b>${cost} créditos</b>.`);
}

function renderRoster() {
  const el = document.getElementById("roster-list");
  if (!el) return;
  el.innerHTML = "";
  const infBuilt = state.built.includes(1);
  const synergy = getSquadSynergyBonus();

  const headerInfo = document.createElement("div");
  headerInfo.className = "card";
  headerInfo.style.marginBottom = "10px";
  headerInfo.innerHTML = `
    <small style="color:var(--muted)">
      Esquadra selecionada: <b>${state.selected.length}/5</b> · Camaradagem ativa: <b>+${synergy}% precisão</b> · Quartel: <b>Nv.${getBarracksLevel()}/3</b>
    </small>
  `;
  el.appendChild(headerInfo);

  OPERATIVES.forEach((op, i) => {
    const picked = state.selected.includes(i);
    const maxHp = getMaxHp(i);
    const hp = getOpHp(i);
    const sev = getInjurySeverity(hp, maxHp);
    const healCost = getHealCost(i);
    const prog = getOpProgress(i);
    const gear = getOpGear(i);
    const wpn = getWeapon(i);
    const outfit = getEquippedOutfitItem(i);
    const d = document.createElement("div");
    d.className = "card";
    d.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
        <div>
          <span class="tag">${op[1]}</span>
          <h3 style="margin:6px 0 2px">${op[0]} <small style="color:var(--lime)">NV.${prog.level}</small></h3>
          <small style="color:var(--muted)">${op[2]} · XP: ${prog.xp}/100${prog.trainPoints ? ` · <span style="color:var(--lime)">${prog.trainPoints} PT</span>` : ""}</small>
        </div>
        <button class="btn" data-pick="${i}">${picked ? "NA EQUIPA ✓" : "ESCALAR"}</button>
      </div>
      <p style="margin:8px 0;font-size:13px">${op[4]}</p>
      <div style="font-size:12px;color:#b8d4e3;margin-bottom:6px">
        <b>HP:</b> <span style="color:${sev.color}">${hp}/${maxHp} (${sev.label})</span> · <b>Arma:</b> ${wpn.name} (${wpn.dmg} DMG) · <b>Farda:</b> ${outfit.name}
      </div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:6px">
        <b>Mochila:</b> Frag x${gear.frag} · Fumo x${gear.smoke} · Kit Saúde x${gear.medkit}
      </div>
      <div style="font-size:11px;color:var(--lime);margin-bottom:8px">${ROLE_PERKS[op[2]] || ""}</div>
      <div class="stats">
        ${op[3].map((v, sIdx) => `<div class="stat">${STAT_NAMES[sIdx]}: <b>${v}</b></div>`).join("")}
      </div>
      ${hp < maxHp ? `
        <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center;gap:8px">
          <small style="color:${sev.color}">${sev.label} · Custo cura: ${healCost} CR</small>
          <button class="btn" data-heal="${i}" ${!infBuilt ? "disabled" : ""}>${infBuilt ? `TRATAR (${healCost} CR)` : "REQUER ENFERMARIA"}</button>
        </div>
      ` : ""}
    `;
    d.querySelector("[data-pick]").onclick = () => {
      if (state.selected.includes(i)) {
        state.selected = state.selected.filter(x => x !== i);
      } else if (state.selected.length < 5) {
        state.selected.push(i);
      } else {
        logModal("LIMITE ATINGIDO", "Podes selecionar no máximo 5 operacionais por missão.");
      }
      save();
      renderRoster();
    };
    const healBtn = d.querySelector("[data-heal]");
    if (healBtn) {
      healBtn.onclick = () => healOperative(i);
    }
    el.appendChild(d);
  });
    }
function getShopItemsForCategory(cat) {
  if (cat === "weapon") return WEAPONS_SHOP;
  if (cat === "outfit") return OUTFITS_SHOP;
  return [
    ...CONSUMABLES_SHOP.frag,
    ...CONSUMABLES_SHOP.smoke,
    ...CONSUMABLES_SHOP.medkit
  ];
}

function ensureValidShopSelection() {
  const items = getShopItemsForCategory(selectedShopCategory);
  if (!items.some(it => it.id === selectedShopItemId)) {
    selectedShopItemId = items[0] ? items[0].id : "";
  }
}

function buySelectedShopItem() {
  if (!state.built.includes(2)) {
    logModal("ARSENAL EM FALTA", "Constrói primeiro o <b>Arsenal</b> na base para comprar armamento, fardas e consumíveis.");
    return;
  }
  ensureValidShopSelection();
  const opIndex = selectedShopOpIndex;
  const opName = OPERATIVES[opIndex][0];
  const gear = getOpGear(opIndex);

  if (selectedShopCategory === "weapon") {
    const item = WEAPONS_SHOP.find(w => w.id === selectedShopItemId) || WEAPONS_SHOP[0];
    if (gear.weaponId === item.id) {
      logModal("JÁ EQUIPADO", `${opName} já tem <b>${item.name}</b> equipado.`);
      return;
    }
    if (state.credits < item.credits || state.materials < item.materials) {
      logModal("RECURSOS INSUFICIENTES", `Precisas de <b>${item.credits} créditos</b> e <b>${item.materials} materiais</b>.`);
      return;
    }
    state.credits -= item.credits;
    state.materials -= item.materials;
    gear.weaponId = item.id;
    save();
    renderResources();
    renderRoster();
    renderBuildings();
    logModal("ARMAMENTO EQUIPADO", `${opName} recebeu <b>${item.name}</b>.`);
    return;
  }

  if (selectedShopCategory === "outfit") {
    const item = OUTFITS_SHOP.find(o => o.id === selectedShopItemId) || OUTFITS_SHOP[0];
    if (gear.outfitId === item.id) {
      logModal("JÁ EQUIPADO", `${opName} já tem <b>${item.name}</b> equipada.`);
      return;
    }
    if (state.credits < item.credits || state.materials < item.materials) {
      logModal("RECURSOS INSUFICIENTES", `Precisas de <b>${item.credits} créditos</b> e <b>${item.materials} materiais</b>.`);
      return;
    }
    state.credits -= item.credits;
    state.materials -= item.materials;
    const prevMax = getMaxHp(opIndex);
    const prevHp = getOpHp(opIndex);
    gear.outfitId = item.id;
    const newMax = getMaxHp(opIndex);
    if (newMax > prevMax) {
      setOpHp(opIndex, prevHp + (newMax - prevMax));
    } else {
      setOpHp(opIndex, Math.min(newMax, prevHp));
    }
    save();
    renderResources();
    renderRoster();
    renderBuildings();
    logModal("FARDA EQUIPADA", `${opName} equipou <b>${item.name}</b>.`);
    return;
  }

  const allCons = [
    ...CONSUMABLES_SHOP.frag.map(x => ({ ...x, kind: "frag" })),
    ...CONSUMABLES_SHOP.smoke.map(x => ({ ...x, kind: "smoke" })),
    ...CONSUMABLES_SHOP.medkit.map(x => ({ ...x, kind: "medkit" }))
  ];
  const item = allCons.find(c => c.id === selectedShopItemId) || allCons[0];
  if (state.credits < item.credits || state.materials < item.materials) {
    logModal("RECURSOS INSUFICIENTES", `Precisas de <b>${item.credits} créditos</b> e <b>${item.materials} materiais</b>.`);
    return;
  }
  state.credits -= item.credits;
  state.materials -= item.materials;
  gear[item.kind] = (gear[item.kind] || 0) + item.qty;
  save();
  renderResources();
  renderRoster();
  renderBuildings();
  logModal("CONSUMÍVEL ADICIONADO", `${opName} recebeu <b>${item.name}</b> na mochila.`);
}

function upgradeBarracks() {
  const lv = getBarracksLevel();
  const upg = getBarracksUpgradeCost();
  if (!upg) return;
  if (state.credits < upg.credits || state.materials < upg.materials) {
    logModal("RECURSOS INSUFICIENTES", `Melhorar o Quartel para o Nível ${upg.nextLv} custa <b>${upg.credits} créditos</b> e <b>${upg.materials} materiais</b>.`);
    return;
  }
  state.credits -= upg.credits;
  state.materials -= upg.materials;
  state.barracksLevel = upg.nextLv;
  OPERATIVES.forEach((_, idx) => {
    setOpHp(idx, Math.min(getMaxHp(idx), getOpHp(idx) + 10));
  });
  save();
  renderResources();
  renderRoster();
  renderBuildings();
  logModal("QUARTEL MELHORADO", `Quartel agora no <b>Nível ${upg.nextLv}</b> (+${upg.hpBonus} HP base e descanso de +${upg.restHeal} HP entre missões).`);
}

function researchLabProject(kind) {
  if (!state.built.includes(3)) {
    logModal("LABORATÓRIO EM FALTA", "Constrói primeiro o <b>Laboratório</b> na base para estudar material alienígena.");
    return;
  }
  const tier = Number(state.lab[kind + "Tier"]) || 0;
  const table = {
    weapon: [
      { alien: 1, credits: 350, materials: 10, label: "Balística Xeno I (+5 dano, +3% precisão)" },
      { alien: 2, credits: 650, materials: 18, label: "Balística Xeno II (+10 dano, +6% precisão)" }
    ],
    intel: [
      { alien: 1, credits: 300, materials: 8, label: "Análise Tática I (-8% precisão e -2 dano inimigo)" },
      { alien: 2, credits: 600, materials: 16, label: "Análise Tática II (-15% precisão e -4 dano inimigo)" }
    ],
    armor: [
      { alien: 1, credits: 350, materials: 12, hpGain: 10, label: "Blindagem Reativa I (+10 HP máx., -2 dano)" },
      { alien: 2, credits: 700, materials: 20, hpGain: 10, label: "Blindagem Reativa II (+20 HP máx., -4 dano)" }
    ]
  };
  const proj = table[kind][tier];
  if (!proj) {
    logModal("PESQUISA CONCLUÍDA", "Este projeto já está no nível máximo.");
    return;
  }
  if ((state.alien || 0) < proj.alien || state.credits < proj.credits || state.materials < proj.materials) {
    logModal("RECURSOS INSUFICIENTES", `Precisas de <b>${proj.alien} Tec. Alienígena</b>, <b>${proj.credits} créditos</b> e <b>${proj.materials} materiais</b>.`);
    return;
  }
  state.alien -= proj.alien;
  state.credits -= proj.credits;
  state.materials -= proj.materials;
  state.lab[kind + "Tier"] = tier + 1;
  if (kind === "armor") {
    OPERATIVES.forEach((_, idx) => {
      setOpHp(idx, Math.min(getMaxHp(idx), getOpHp(idx) + (proj.hpGain || 10)));
    });
  }
  save();
  renderResources();
  renderRoster();
  renderBuildings();
  logModal("INVESTIGAÇÃO CONCLUÍDA", `Ativado: <b>${proj.label}</b>.`);
}

function resetGameProgress() {
  if (!confirm("Apagar todo o progresso guardado e recomeçar do zero?")) return;
  localStorage.removeItem("oz_save");
  location.reload();
}

function renderBuildings() {
  const el = document.getElementById("buildings");
  if (!el) return;
  el.innerHTML = "";
  ensureValidShopSelection();

  const bLv = getBarracksLevel();
  const bUpg = getBarracksUpgradeCost();
  const synergy = getSquadSynergyBonus();
  const restHeal = getBarracksRestHeal();

  const barracksHub = document.createElement("div");
  barracksHub.className = "building";
  barracksHub.style.flexDirection = "column";
  barracksHub.style.alignItems = "stretch";
  barracksHub.style.gap = "10px";

  const squadRowsHtml = OPERATIVES.map((op, idx) => {
    const picked = state.selected.includes(idx);
    const maxHp = getMaxHp(idx);
    const hp = getOpHp(idx);
    const sev = getInjurySeverity(hp, maxHp);
    const gear = getOpGear(idx);
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:7px 8px;background:#0b1218;border:1px solid ${picked ? "var(--lime)" : "rgba(255,255,255,.08)"};border-radius:6px">
        <div style="min-width:0;flex:1">
          <b style="font-size:12px">${op[0]}</b> <small style="color:var(--muted)">· ${op[2]}</small><br>
          <small style="color:${sev.color}">${hp}/${maxHp} HP (${sev.label})</small>
          <small style="color:var(--muted)"> · Frag:${gear.frag} Fumo:${gear.smoke} Kit:${gear.medkit}</small>
        </div>
        <button class="btn" data-pick-barracks="${idx}" style="padding:6px 9px;font-size:10px;white-space:nowrap">${picked ? "NA EQUIPA ✓" : "ESCALAR"}</button>
      </div>
    `;
  }).join("");

  barracksHub.innerHTML = `
    <div>
      <b>QUARTEL · NÍVEL ${bLv}/3 · EQUIPA ${state.selected.length}/5</b><br>
      <small style="color:var(--muted)">
        Bónus HP: <b>+${getBarracksHpBonus()} HP</b> · Camaradagem: <b>+${synergy}% precisão</b> · Descanso fora da missão: <b>+${restHeal} HP</b>
      </small>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">${squadRowsHtml}</div>
    <button class="btn" id="btn-upgrade-barracks" ${!bUpg ? "disabled" : ""} style="width:100%">
      ${bUpg ? `MELHORAR QUARTEL PARA NV.${bUpg.nextLv} (${bUpg.credits} CR / ${bUpg.materials} MAT)` : "QUARTEL NO NÍVEL MÁXIMO (3)"}
    </button>
  `;

  barracksHub.querySelectorAll("[data-pick-barracks]").forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.pickBarracks);
      if (state.selected.includes(idx)) {
        state.selected = state.selected.filter(x => x !== idx);
      } else if (state.selected.length < 5) {
        state.selected.push(idx);
      } else {
        logModal("LIMITE ATINGIDO", "Podes selecionar no máximo 5 operacionais por missão.");
        return;
      }
      save();
      renderRoster();
      renderBuildings();
    };
  });

  const upgBtn = barracksHub.querySelector("#btn-upgrade-barracks");
  if (upgBtn && bUpg) upgBtn.onclick = upgradeBarracks;
  el.appendChild(barracksHub);

  BUILDINGS.slice(1).forEach((b, idxOffset) => {
    const i = idxOffset + 1;
    const built = state.built.includes(i);
    const d = document.createElement("div");
    d.className = "building";
    d.innerHTML = `
      <div><b>${b[0]}</b><br><small style="color:var(--muted)">${b[1]}</small><br><small>${b[2]} CR · ${b[3]} MAT</small></div>
      <button class="btn" ${built ? "disabled" : ""}>${built ? "CONSTRUÍDO" : "CONSTRUIR"}</button>
    `;
    const btn = d.querySelector("button");
    if (!built) {
      btn.onclick = () => {
        if (state.credits < b[2] || state.materials < b[3]) {
          logModal("RECURSOS INSUFICIENTES", "Precisas de mais créditos ou materiais para construir.");
          return;
        }
        state.credits -= b[2];
        state.materials -= b[3];
        state.built.push(i);
        save();
        renderResources();
        renderBuildings();
        renderRoster();
      };
    }
    el.appendChild(d);
  });

  const armoryBuilt = state.built.includes(2);
  const opOptions = OPERATIVES.map((op, idx) => `<option value="${idx}" ${idx === selectedShopOpIndex ? "selected" : ""}>${op[0]} (${op[2]})</option>`).join("");
  const shopItems = getShopItemsForCategory(selectedShopCategory);
  const itemOptions = shopItems.map(it => `<option value="${it.id}" ${it.id === selectedShopItemId ? "selected" : ""}>${it.name} — ${it.credits} CR / ${it.materials} MAT</option>`).join("");
  const currentItem = shopItems.find(it => it.id === selectedShopItemId) || shopItems[0];

  const shopCard = document.createElement("div");
  shopCard.className = "building";
  shopCard.style.flexDirection = "column";
  shopCard.style.alignItems = "stretch";
  shopCard.style.gap = "8px";
  shopCard.innerHTML = `
    <div>
      <b>ARSENAL — EQUIPAMENTO E CONSUMÍVEIS</b><br>
      <small style="color:var(--muted)">${armoryBuilt ? "Arsenal ativo: equipa armas, fardas, granadas e kits." : "Constrói o Arsenal para equipar operacionais."}</small>
    </div>
    <label style="font-size:11px;color:var(--muted)">Operacional:</label>
    <select id="shop-op-select" ${!armoryBuilt ? "disabled" : ""} style="width:100%;padding:9px;background-color:#0e161d;color:#f2f7fa;border:1px solid rgba(255,255,255,.22);border-radius:6px;font-size:12px">${opOptions}</select>
    <label style="font-size:11px;color:var(--muted)">Categoria:</label>
    <select id="shop-cat-select" ${!armoryBuilt ? "disabled" : ""} style="width:100%;padding:9px;background-color:#0e161d;color:#f2f7fa;border:1px solid rgba(255,255,255,.22);border-radius:6px;font-size:12px">
      <option value="weapon" ${selectedShopCategory === "weapon" ? "selected" : ""}>Armamento</option>
      <option value="outfit" ${selectedShopCategory === "outfit" ? "selected" : ""}>Fardas e Proteção</option>
      <option value="consumable" ${selectedShopCategory === "consumable" ? "selected" : ""}>Granadas e Kits de Saúde</option>
    </select>
    <label style="font-size:11px;color:var(--muted)">Item:</label>
    <select id="shop-item-select" ${!armoryBuilt ? "disabled" : ""} style="width:100%;padding:9px;background-color:#0e161d;color:#f2f7fa;border:1px solid rgba(255,255,255,.22);border-radius:6px;font-size:12px">${itemOptions}</select>
    <small style="color:#b8d4e3">${currentItem ? currentItem.desc : ""}</small>
    <button class="btn" id="btn-buy-shop" ${!armoryBuilt ? "disabled" : ""} style="width:100%">EQUIPAR / COMPRAR</button>
  `;

  shopCard.querySelector("#shop-op-select").onchange = e => {
    selectedShopOpIndex = Number(e.target.value);
    renderBuildings();
  };
  shopCard.querySelector("#shop-cat-select").onchange = e => {
    selectedShopCategory = e.target.value;
    const list = getShopItemsForCategory(selectedShopCategory);
    selectedShopItemId = list[0] ? list[0].id : "";
    renderBuildings();
  };
  shopCard.querySelector("#shop-item-select").onchange = e => {
    selectedShopItemId = e.target.value;
    renderBuildings();
  };
  shopCard.querySelector("#btn-buy-shop").onclick = buySelectedShopItem;
  el.appendChild(shopCard);

  const labBuilt = state.built.includes(3);
  const wTier = Number(state.lab.weaponTier) || 0;
  const iTier = Number(state.lab.intelTier) || 0;
  const aTier = Number(state.lab.armorTier) || 0;

  const labCard = document.createElement("div");
  labCard.className = "building";
  labCard.style.flexDirection = "column";
  labCard.style.alignItems = "stretch";
  labCard.style.gap = "8px";
  labCard.innerHTML = `
    <div>
      <b>LABORATÓRIO — PESQUISA E INFORMAÇÃO INIMIGA</b><br>
      <small style="color:var(--muted)">${labBuilt ? "Laboratório ativo: estuda amostras alienígenas para armamento, informação e blindagem." : "Constrói o Laboratório para desbloquear as pesquisas."}</small>
    </div>
    <button class="btn" id="lab-w" ${!labBuilt || wTier >= 2 ? "disabled" : ""} style="width:100%">
      ${wTier >= 2 ? "ARMAMENTO XENO: NÍVEL MÁXIMO (2/2)" : `ARMAMENTO XENO (NV.${wTier}/2) — ${wTier === 0 ? "1 XENO · 350 CR · 10 MAT" : "2 XENO · 650 CR · 18 MAT"}`}
    </button>
    <button class="btn" id="lab-i" ${!labBuilt || iTier >= 2 ? "disabled" : ""} style="width:100%">
      ${iTier >= 2 ? "INFORMAÇÃO INIMIGA: NÍVEL MÁXIMO (2/2)" : `INFORMAÇÃO INIMIGA (NV.${iTier}/2) — ${iTier === 0 ? "1 XENO · 300 CR · 8 MAT" : "2 XENO · 600 CR · 16 MAT"}`}
    </button>
    <button class="btn" id="lab-a" ${!labBuilt || aTier >= 2 ? "disabled" : ""} style="width:100%">
      ${aTier >= 2 ? "BLINDAGEM ADAPTATIVA: NÍVEL MÁXIMO (2/2)" : `BLINDAGEM ADAPTATIVA (NV.${aTier}/2) — ${aTier === 0 ? "1 XENO · 350 CR · 12 MAT" : "2 XENO · 700 CR · 20 MAT"}`}
    </button>
  `;
  labCard.querySelector("#lab-w").onclick = () => researchLabProject("weapon");
  labCard.querySelector("#lab-i").onclick = () => researchLabProject("intel");
  labCard.querySelector("#lab-a").onclick = () => researchLabProject("armor");
  el.appendChild(labCard);

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn";
  resetBtn.textContent = "RESET PROGRESSO (TESTE)";
  resetBtn.style.marginTop = "12px";
  resetBtn.style.width = "100%";
  resetBtn.onclick = resetGameProgress;
  el.appendChild(resetBtn);

  el.querySelectorAll("select option").forEach(opt => {
    opt.style.backgroundColor = "#0e161d";
    opt.style.color = "#f2f7fa";
  });
}
const MISSION_ENEMIES = [
  [
    { name: "SENTINELA XENO", x: 5, y: 1, hp: 65, dmg: 14, role: "flanker" },
    { name: "CAÇADOR XENO", x: 6, y: 4, hp: 75, dmg: 18, role: "skirmisher" }
  ],
  [
    { name: "FLANQUEADOR XENO", x: 4, y: 1, hp: 70, dmg: 16, role: "flanker" },
    { name: "SUPRESSOR XENO", x: 6, y: 3, hp: 85, dmg: 19, role: "skirmisher" },
    { name: "SENTINELA XENO", x: 6, y: 5, hp: 65, dmg: 15, role: "flanker" }
  ],
  [
    { name: "COLOSSO XENO", x: 5, y: 2, hp: 105, dmg: 22, role: "skirmisher" },
    { name: "ASSALTANTE XENO", x: 4, y: 4, hp: 75, dmg: 18, role: "flanker" },
    { name: "INTERCETOR XENO", x: 7, y: 1, hp: 80, dmg: 19, role: "flanker" }
  ]
];

const MISSION_SAMPLES = [
  [{ x: 3, y: 4, id: "m0_s1" }],
  [{ x: 4, y: 2, id: "m1_s1" }, { x: 5, y: 4, id: "m1_s2" }],
  [{ x: 3, y: 1, id: "m2_s1" }, { x: 6, y: 2, id: "m2_s2" }]
];

let battle = {
  missionIndex: 0,
  turn: 1,
  active: 0,
  units: [],
  enemies: [],
  smokes: [],
  samples: [],
  finished: false
};

function getCoverAt(x, y) {
  return COVERS.find(c => c.x === x && c.y === y) || null;
}

function hasLineOfSight(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  if (steps <= 1) return true;
  for (let i = 1; i < steps; i++) {
    const ix = Math.round(x1 + (dx * i) / steps);
    const iy = Math.round(y1 + (dy * i) / steps);
    const cov = getCoverAt(ix, iy);
    if (cov && cov.blocksSight) return false;
  }
  return true;
}

function getTargetCoverBonus(attackerX, attackerY, targetX, targetY) {
  let best = 0;
  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1]
  ];
  for (const [dx, dy] of dirs) {
    const cx = targetX + dx;
    const cy = targetY + dy;
    const cov = getCoverAt(cx, cy);
    if (!cov) continue;
    const distToCover = Math.hypot(attackerX - cx, attackerY - cy);
    const distToTarget = Math.hypot(attackerX - targetX, attackerY - targetY);
    if (distToCover < distToTarget) {
      const val = cov.type === "full" ? 25 : 15;
      if (val > best) best = val;
    }
  }
  return best;
}

function renderMissions() {
  const el = document.getElementById("mission-list");
  if (!el) return;
  el.innerHTML = "";
  const synergy = getSquadSynergyBonus();
  const intel = getLabIntelDebuff();

  const squadBar = document.createElement("div");
  squadBar.className = "card";
  squadBar.style.marginBottom = "10px";
  squadBar.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px">
      <b style="font-size:12px">ESQUADRA ATIVA (${state.selected.length}/5)</b>
      <small style="color:var(--lime)">Camaradagem: +${synergy}% precisão</small>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:6px">
      ${OPERATIVES.map((op, idx) => {
        const active = state.selected.includes(idx);
        const hp = getOpHp(idx);
        const maxHp = getMaxHp(idx);
        return `<button class="btn" data-msel="${idx}" style="padding:5px 8px;font-size:10px;opacity:${active ? "1" : "0.55"}">${active ? "✓ " : ""}${op[0]} (${hp}/${maxHp})</button>`;
      }).join("")}
    </div>
    ${intel.aimPen > 0 ? `<div style="margin-top:6px;font-size:11px;color:#6ef7ff">Info Lab ativa: inimigos -${intel.aimPen}% precisão e -${intel.dmgRed} dano.</div>` : ""}
  `;
  squadBar.querySelectorAll("[data-msel]").forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.msel);
      if (state.selected.includes(idx)) {
        state.selected = state.selected.filter(x => x !== idx);
      } else if (state.selected.length < 5) {
        state.selected.push(idx);
      } else {
        logModal("LIMITE ATINGIDO", "Máximo de 5 operacionais por missão.");
        return;
      }
      save();
      renderMissions();
      renderBuildings();
    };
  });
  el.appendChild(squadBar);

  MISSIONS.forEach((m, i) => {
    const done = state.completed.includes(i);
    const d = document.createElement("div");
    d.className = "card";
    d.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
        <div>
          <span class="tag">OPERAÇÃO 0${i + 1}${done ? " · CONCLUÍDA" : ""}</span>
          <h3 style="margin:6px 0 4px">${m.title}</h3>
          <p style="margin:0 0 6px;font-size:13px;color:var(--muted)">${m.desc}</p>
          <small style="color:#d6e9f5">Base: <b>${m.rewardCredits} CR</b> · <b>${m.rewardMaterials} MAT</b> · <b>${m.xpBase} XP</b></small><br>
          <small style="color:var(--lime)">Bónus (${m.secondaryLabel}): +${m.bonusCredits} CR · +${m.bonusMaterials} MAT</small>
        </div>
        <button class="btn" data-start="${i}">INICIAR</button>
      </div>
    `;
    d.querySelector("[data-start]").onclick = () => startMission(i);
    el.appendChild(d);
  });
}

function startMission(i) {
  if (!Array.isArray(state.selected) || state.selected.length === 0) {
    logModal("SEM OPERACIONAIS", "Seleciona pelo menos 1 operacional no Quartel ou nas Missões antes de iniciar.");
    return;
  }
  state.mission = i;
  activeCombatMode = null;

  const startPositions = [
    [0, 1], [0, 2], [0, 3], [0, 4], [1, 2]
  ];

  const units = state.selected.slice(0, 5).map((opIdx, slot) => {
    const op = OPERATIVES[opIdx];
    const wpn = getWeapon(opIdx);
    const maxHp = getMaxHp(opIdx);
    const curHp = Math.max(15, getOpHp(opIdx));
    const pos = startPositions[slot] || [0, slot % 6];
    return {
      opIndex: opIdx,
      name: op[0],
      role: op[2],
      stats: [...op[3]],
      x: pos[0],
      y: pos[1],
      hp: curHp,
      maxHp: maxHp,
      ap: 2,
      ammo: wpn.mag,
      overwatch: false,
      hunkered: false,
      acted: false
    };
  });

  const enemies = (MISSION_ENEMIES[i] || MISSION_ENEMIES[0]).map(e => ({
    ...e,
    maxHp: e.hp,
    overwatch: false
  }));

  const samples = (MISSION_SAMPLES[i] || []).map(s => ({
    ...s,
    collected: false
  }));

  battle = {
    missionIndex: i,
    turn: 1,
    active: 0,
    units,
    enemies,
    smokes: [],
    samples,
    finished: false
  };

  go("battle");
  renderBattle();
  const sampleMsg = samples.length > 0 ? ` Amostras xeno (✦): ${samples.length}.` : "";
  battleLog(`Operação ${MISSIONS[i].title} iniciada. Turno 1.${sampleMsg}`);
  }
function getActiveUnit() {
  if (!Array.isArray(battle.units) || battle.units.length === 0) return null;
  for (let offset = 0; offset < battle.units.length; offset++) {
    const idx = (battle.active + offset) % battle.units.length;
    const u = battle.units[idx];
    if (u && u.hp > 0 && u.ap > 0) {
      battle.active = idx;
      return u;
    }
  }
  return battle.units[battle.active] || null;
}

function isInSmoke(x, y) {
  return Array.isArray(battle.smokes) && battle.smokes.some(sm => {
    return sm.turns > 0 && Math.abs(sm.x - x) <= 1 && Math.abs(sm.y - y) <= 1;
  });
}

function calcHitChance(unit, enemy, isOverwatch = false) {
  if (!unit || !enemy || enemy.hp <= 0) return 0;
  const dist = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
  if (!hasLineOfSight(unit.x, unit.y, enemy.x, enemy.y)) return 0;

  const wpn = getWeapon(unit.opIndex);
  let chance = unit.stats[0] + (wpn.hitBonus || 0) + getSquadSynergyBonus();

  const rangeDiff = Math.abs(dist - wpn.optRange);
  chance -= Math.round(rangeDiff * 4.5);

  if (unit.role === "Assalto" && dist <= 4) chance += 5;
  if (unit.role === "Sniper" && dist >= 5) chance += 6;
  if (unit.role === "Batedora" && isOverwatch) chance += 5;

  const coverBonus = getTargetCoverBonus(unit.x, unit.y, enemy.x, enemy.y);
  if (coverBonus > 0) {
    let effCover = coverBonus;
    if (unit.role === "Engenheira") effCover = Math.max(0, effCover - 5);
    chance -= effCover;
  }

  if (isInSmoke(enemy.x, enemy.y) || isInSmoke(unit.x, unit.y)) {
    chance -= 22;
  }
  if (isOverwatch) chance -= 10;

  return Math.max(5, Math.min(96, Math.round(chance)));
}

function throwFragGrenadeAt(tx, ty) {
  const unit = getActiveUnit();
  if (!unit || battle.finished) return;
  const gear = getOpGear(unit.opIndex);
  if ((gear.frag || 0) <= 0) {
    logModal("SEM GRANADAS", `${unit.name} não tem granadas de fragmentação na mochila.`);
    return;
  }
  if (unit.ap < 1) {
    logModal("SEM PA", `${unit.name} não tem pontos de ação suficientes.`);
    return;
  }
  gear.frag -= 1;
  unit.ap -= 1;
  activeCombatMode = null;
  save();

  let hits = 0;
  battle.enemies.forEach(e => {
    if (e.hp > 0 && Math.abs(e.x - tx) <= 1 && Math.abs(e.y - ty) <= 1) {
      e.hp = Math.max(0, e.hp - 32);
      hits += 1;
    }
  });

  battleLog(`${unit.name} lançou Granada de Fragmentação em (${tx + 1},${ty + 1}) — ${hits} alvo(s) atingido(s) (32 dano).`);
  checkWin();
  renderBattle();
}

function throwSmokeGrenadeAt(tx, ty) {
  const unit = getActiveUnit();
  if (!unit || battle.finished) return;
  const gear = getOpGear(unit.opIndex);
  if ((gear.smoke || 0) <= 0) {
    logModal("SEM FUMO", `${unit.name} não tem granadas de fumo na mochila.`);
    return;
  }
  if (unit.ap < 1) {
    logModal("SEM PA", `${unit.name} não tem pontos de ação suficientes.`);
    return;
  }
  gear.smoke -= 1;
  unit.ap -= 1;
  activeCombatMode = null;
  save();

  battle.smokes.push({ x: tx, y: ty, turns: 2 });
  battleLog(`${unit.name} lançou Granada de Fumo em (${tx + 1},${ty + 1}) por 2 turnos.`);
  renderBattle();
}

function useFieldMedkit() {
  const unit = getActiveUnit();
  if (!unit || battle.finished) return;
  const gear = getOpGear(unit.opIndex);
  if ((gear.medkit || 0) <= 0) {
    logModal("SEM KITS", `${unit.name} não tem Kit de Saúde na mochila.`);
    return;
  }
  if (unit.hp >= unit.maxHp) {
    logModal("HP COMPLETO", `${unit.name} já está com a saúde máxima.`);
    return;
  }
  const healAmt = unit.role === "Médico" ? 50 : 40;
  gear.medkit -= 1;
  unit.hp = Math.min(unit.maxHp, unit.hp + healAmt);
  unit.ap = Math.max(0, unit.ap - 1);
  activeCombatMode = null;
  save();

  battleLog(`${unit.name} usou Kit de Saúde (+${healAmt} HP · agora ${unit.hp}/${unit.maxHp} HP).`);
  renderBattle();
      }
function renderBattle() {
  const grid = document.getElementById("battle-grid");
  const statusEl = document.getElementById("battle-status");
  const actionsEl = document.getElementById("battle-actions");
  if (!grid || !statusEl || !actionsEl) return;

  const activeUnit = getActiveUnit();
  const gear = activeUnit ? getOpGear(activeUnit.opIndex) : { frag: 0, smoke: 0, medkit: 0 };
  const wpn = activeUnit ? getWeapon(activeUnit.opIndex) : { name: "-", dmg: 0, mag: 0 };

  statusEl.innerHTML = activeUnit ? `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
      <div>
        <b>TURNO ${battle.turn}</b> · Ativo: <b style="color:var(--lime)">${activeUnit.name}</b> (${activeUnit.role})
      </div>
      <div style="font-size:12px">
        HP: <b>${activeUnit.hp}/${activeUnit.maxHp}</b> · PA: <b>${activeUnit.ap}</b> · Mun: <b>${activeUnit.ammo}/${wpn.mag}</b>
      </div>
    </div>
    <div style="font-size:11px;color:var(--muted);margin-top:4px">
      Arma: <b>${wpn.name}</b> (${wpn.dmg} DMG) · Mochila: Frag x${gear.frag} · Fumo x${gear.smoke} · Kit x${gear.medkit}
      ${activeCombatMode ? ` · <span style="color:#ffd166">Modo: ${activeCombatMode.toUpperCase()}</span>` : ""}
    </div>
  ` : `<div><b>TURNO ${battle.turn}</b> · A aguardar resolução...</div>`;

  grid.innerHTML = "";
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 8; x++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.x = x;
      tile.dataset.y = y;

      const cov = getCoverAt(x, y);
      const inSmoke = isInSmoke(x, y);
      const sample = Array.isArray(battle.samples)
        ? battle.samples.find(s => !s.collected && s.x === x && s.y === y)
        : null;
      const unitHere = battle.units.find(u => u.hp > 0 && u.x === x && u.y === y);
      const enemyHere = battle.enemies.find(e => e.hp > 0 && e.x === x && e.y === y);

      if (inSmoke) {
        tile.style.background = "rgba(170, 190, 210, 0.28)";
        tile.style.borderColor = "rgba(220, 235, 250, 0.5)";
      }

      if (unitHere) {
        const isCurrent = activeUnit && unitHere.opIndex === activeUnit.opIndex;
        tile.textContent = unitHere.name.slice(0, 2).toUpperCase() + (unitHere.overwatch ? "👁" : "");
        tile.style.background = isCurrent ? "rgba(155, 240, 11, 0.24)" : "rgba(76, 175, 255, 0.2)";
        tile.style.borderColor = isCurrent ? "var(--lime)" : "#4cafff";
        tile.style.color = "#ffffff";
      } else if (enemyHere) {
        tile.textContent = "X" + (enemyHere.overwatch ? "!" : "");
        tile.style.background = "rgba(255, 92, 119, 0.24)";
        tile.style.borderColor = "#ff5c77";
        tile.style.color = "#ffd6de";
      } else if (sample) {
        tile.textContent = "✦";
        tile.style.color = "#6ef7ff";
        tile.style.borderColor = "rgba(110, 247, 255, 0.55)";
      } else if (cov) {
        tile.textContent = cov.type === "full" ? "▣" : "▤";
        tile.style.color = cov.type === "full" ? "#ffd166" : "#b8d4e3";
      } else if (inSmoke) {
        tile.textContent = "☁";
        tile.style.color = "#e6f2ff";
      }

      if (activeUnit && !battle.finished) {
        const dist = Math.hypot(x - activeUnit.x, y - activeUnit.y);
        if (!unitHere && !enemyHere && !cov && dist <= 3.1 && activeUnit.ap > 0 && !activeCombatMode) {
          tile.style.boxShadow = "inset 0 0 0 1px rgba(155, 240, 11, 0.35)";
        }
      }

      tile.onclick = () => onTileClick(x, y);
      grid.appendChild(tile);
    }
  }

  actionsEl.innerHTML = "";
  if (!activeUnit || battle.finished) return;

  const buttons = [
    {
      label: activeCombatMode === "frag" ? "CANCELAR FRAG" : `FRAG (${gear.frag})`,
      disabled: gear.frag <= 0 || activeUnit.ap <= 0,
      fn: () => {
        activeCombatMode = activeCombatMode === "frag" ? null : "frag";
        renderBattle();
      }
    },
    {
      label: activeCombatMode === "smoke" ? "CANCELAR FUMO" : `FUMO (${gear.smoke})`,
      disabled: gear.smoke <= 0 || activeUnit.ap <= 0,
      fn: () => {
        activeCombatMode = activeCombatMode === "smoke" ? null : "smoke";
        renderBattle();
      }
    },
    {
      label: `KIT (${gear.medkit})`,
      disabled: gear.medkit <= 0 || activeUnit.ap <= 0 || activeUnit.hp >= activeUnit.maxHp,
      fn: useFieldMedkit
    },
    {
      label: activeUnit.overwatch ? "VIGILÂNCIA ✓" : "VIGILÂNCIA",
      disabled: activeUnit.ap <= 0,
      fn: () => setOverwatch(activeUnit)
    },
    {
      label: activeUnit.hunkered ? "HUNKER ✓" : "HUNKER",
      disabled: activeUnit.ap <= 0,
      fn: () => setHunker(activeUnit)
    },
    {
      label: "RECARREGAR",
      disabled: activeUnit.ap <= 0 || activeUnit.ammo >= wpn.mag,
      fn: () => reloadUnit(activeUnit)
    },
    {
      label: "PRÓXIMO",
      disabled: false,
      fn: () => cycleNextUnit()
    },
    {
      label: "TERMINAR TURNO",
      disabled: false,
      fn: () => endPlayerTurn()
    }
  ];

  buttons.forEach(b => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = b.label;
    btn.disabled = !!b.disabled;
    btn.style.backgroundColor = "#121d27";
    btn.style.color = b.disabled ? "#6f8796" : "#f2f7fa";
    btn.style.border = "1px solid rgba(255,255,255,.18)";
    btn.onclick = b.fn;
    actionsEl.appendChild(btn);
  });
      }
function battleLog(msg) {
  const el = document.getElementById("battle-log");
  if (!el) return;
  el.textContent = msg;
}

function collectSampleAt(x, y, unit) {
  if (!Array.isArray(battle.samples)) return;
  battle.samples.forEach(s => {
    if (!s.collected && s.x === x && s.y === y) {
      s.collected = true;
      state.alien = (state.alien || 0) + 1;
      save();
      renderResources();
      battleLog(`${unit.name} recolheu uma amostra alienígena (+1 Tec. Alienígena)!`);
    }
  });
}

function moveUnitTo(unit, x, y) {
  if (unit.ap <= 0) {
    logModal("SEM PA", `${unit.name} não tem pontos de ação disponíveis.`);
    return;
  }
  const cov = getCoverAt(x, y);
  if (cov && cov.blocksSight) {
    logModal("OBSTÁCULO", "Não podes ocupar uma cobertura total bloqueada.");
    return;
  }
  const occupied =
    battle.units.some(u => u.hp > 0 && u.x === x && u.y === y) ||
    battle.enemies.some(e => e.hp > 0 && e.x === x && e.y === y);
  if (occupied) {
    logModal("CASA OCUPADA", "Já existe alguém nessa posição.");
    return;
  }
  const dist = Math.hypot(x - unit.x, y - unit.y);
  const maxMove = unit.ap === 2 ? 4.2 : 3.2;
  if (dist > maxMove) {
    logModal("FORA DE ALCANCE", "Essa casa está demasiado longe para o movimento atual.");
    return;
  }

  unit.x = x;
  unit.y = y;
  unit.ap -= 1;
  unit.hunkered = false;

  battle.enemies.forEach(e => {
    if (e.hp > 0 && e.overwatch) {
      e.overwatch = false;
      const hitChance = Math.max(10, Math.min(85, 55 - getLabIntelDebuff().aimPen));
      const roll = Math.random() * 100;
      if (roll <= hitChance) {
        const rawDmg = Math.max(4, e.dmg - getLabIntelDebuff().dmgRed);
        unit.hp = Math.max(0, unit.hp - rawDmg);
        battleLog(`${e.name} disparou em Vigilância contra ${unit.name} (-${rawDmg} HP)!`);
      } else {
        battleLog(`Vigilância de ${e.name} falhou sobre ${unit.name}.`);
      }
    }
  });

  collectSampleAt(x, y, unit);
  checkWin();
  renderBattle();
}

function shootEnemy(unit, enemy) {
  if (unit.ap <= 0) {
    logModal("SEM PA", `${unit.name} não tem pontos de ação para disparar.`);
    return;
  }
  if (unit.ammo <= 0) {
    logModal("SEM MUNIÇÕES", `${unit.name} precisa de recarregar a arma.`);
    return;
  }
  const chance = calcHitChance(unit, enemy, false);
  if (chance <= 0) {
    logModal("SEM LINHA DE VISÃO", "Há um obstáculo a bloquear o disparo para este alvo.");
    return;
  }

  unit.ap = 0;
  unit.ammo -= 1;
  unit.hunkered = false;
  unit.overwatch = false;

  const wpn = getWeapon(unit.opIndex);
  const dist = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
  let critChance = 12;
  if (unit.role === "Sniper" && dist >= 5) critChance += 5;

  const roll = Math.random() * 100;
  if (roll <= chance) {
    const isCrit = Math.random() * 100 <= critChance;
    const dmg = isCrit ? Math.round(wpn.dmg * 1.35) : wpn.dmg;
    enemy.hp = Math.max(0, enemy.hp - dmg);
    battleLog(
      `${unit.name} acertou (${chance}%) em ${enemy.name} para ${dmg} dano${isCrit ? " CRÍTICO" : ""}!`
    );
  } else {
    battleLog(`${unit.name} falhou o disparo (${chance}%) contra ${enemy.name}.`);
  }

  checkWin();
  renderBattle();
}

function setOverwatch(unit) {
  if (unit.ap <= 0) return;
  unit.overwatch = !unit.overwatch;
  if (unit.overwatch) {
    unit.ap = 0;
    battleLog(`${unit.name} entrou em Vigilância.`);
  }
  renderBattle();
}

function setHunker(unit) {
  if (unit.ap <= 0) return;
  unit.hunkered = true;
  unit.ap = 0;
  battleLog(`${unit.name} assumiu posição defensiva (Hunker).`);
  renderBattle();
}

function reloadUnit(unit) {
  if (unit.ap <= 0) return;
  const wpn = getWeapon(unit.opIndex);
  unit.ammo = wpn.mag;
  unit.ap -= 1;
  battleLog(`${unit.name} recarregou (${wpn.mag} munições).`);
  renderBattle();
}

function cycleNextUnit() {
  if (!Array.isArray(battle.units) || battle.units.length === 0) return;
  for (let i = 1; i <= battle.units.length; i++) {
    const idx = (battle.active + i) % battle.units.length;
    if (battle.units[idx].hp > 0) {
      battle.active = idx;
      activeCombatMode = null;
      renderBattle();
      return;
    }
  }
}

function onTileClick(x, y) {
  if (battle.finished) return;
  const unit = getActiveUnit();
  if (!unit) return;

  if (activeCombatMode === "frag") {
    throwFragGrenadeAt(x, y);
    return;
  }
  if (activeCombatMode === "smoke") {
    throwSmokeGrenadeAt(x, y);
    return;
  }

  const enemyHere = battle.enemies.find(e => e.hp > 0 && e.x === x && e.y === y);
  if (enemyHere) {
    shootEnemy(unit, enemyHere);
    return;
  }

  const unitHere = battle.units.find(u => u.hp > 0 && u.x === x && u.y === y);
  if (unitHere) {
    battle.active = battle.units.indexOf(unitHere);
    activeCombatMode = null;
    renderBattle();
    return;
  }

  moveUnitTo(unit, x, y);
}
function endPlayerTurn() {
  if (battle.finished) return;
  activeCombatMode = null;

  if (Array.isArray(battle.smokes)) {
    battle.smokes = battle.smokes
      .map(sm => ({ ...sm, turns: sm.turns - 1 }))
      .filter(sm => sm.turns > 0);
  }

  runEnemyTurn();
}

function runEnemyTurn() {
  const intel = getLabIntelDebuff();
  const logs = [];

  battle.enemies.forEach(enemy => {
    if (enemy.hp <= 0) return;

    const aliveUnits = battle.units.filter(u => u.hp > 0);
    if (aliveUnits.length === 0) return;

    let target = aliveUnits[0];
    let bestDist = Math.hypot(target.x - enemy.x, target.y - enemy.y);
    aliveUnits.forEach(u => {
      const d = Math.hypot(u.x - enemy.x, u.y - enemy.y);
      if (d < bestDist) {
        bestDist = d;
        target = u;
      }
    });

    const stepX = enemy.x + Math.sign(target.x - enemy.x);
    const stepY = enemy.y + Math.sign(target.y - enemy.y);
    const stepBlocked =
      battle.units.some(u => u.hp > 0 && u.x === stepX && u.y === stepY) ||
      battle.enemies.some(e => e !== enemy && e.hp > 0 && e.x === stepX && e.y === stepY) ||
      Boolean(getCoverAt(stepX, stepY) && getCoverAt(stepX, stepY).blocksSight);

    if (bestDist > 4.5 && !stepBlocked) {
      enemy.x = stepX;
      enemy.y = stepY;
      bestDist = Math.hypot(target.x - enemy.x, target.y - enemy.y);

      const watcher = battle.units.find(u => u.hp > 0 && u.overwatch && hasLineOfSight(u.x, u.y, enemy.x, enemy.y));
      if (watcher) {
        watcher.overwatch = false;
        const wChance = Math.max(15, Math.min(92, calcHitChance(watcher, enemy, true)));
        const wRoll = Math.random() * 100;
        if (wRoll <= wChance) {
          const wDmg = getWeapon(watcher.opIndex).dmg;
          enemy.hp = Math.max(0, enemy.hp - wDmg);
          logs.push(`Vigilância de ${watcher.name} atingiu ${enemy.name} (-${wDmg} HP)`);
          if (enemy.hp <= 0) {
            logs.push(`${enemy.name} neutralizado em Vigilância`);
            return;
          }
        } else {
          logs.push(`Vigilância de ${watcher.name} falhou sobre ${enemy.name}`);
        }
      }
    }

    if (enemy.hp <= 0) return;

    if (hasLineOfSight(enemy.x, enemy.y, target.x, target.y)) {
      let hitChance = 62 - intel.aimPen;
      const coverBonus = getTargetCoverBonus(enemy.x, enemy.y, target.x, target.y);
      if (coverBonus > 0) hitChance -= coverBonus;
      if (target.hunkered) hitChance -= 20;
      if (isInSmoke(target.x, target.y) || isInSmoke(enemy.x, enemy.y)) hitChance -= 30;
      const outfit = getEquippedOutfitItem(target.opIndex);
      hitChance -= (outfit.dodgeBonus || 0);
      hitChance = Math.max(8, Math.min(90, Math.round(hitChance)));

      const roll = Math.random() * 100;
      if (roll <= hitChance) {
        let dmg = Math.max(4, enemy.dmg - intel.dmgRed);
        dmg = Math.max(2, dmg - (outfit.dmgRed || 0) - getLabArmorBonus().dmgRed);
        if (target.role === "Armas pesadas") dmg = Math.max(2, dmg - 2);
        if (target.hunkered) dmg = Math.max(1, Math.round(dmg * 0.65));

        target.hp = Math.max(0, target.hp - dmg);
        logs.push(`${enemy.name} acertou (${hitChance}%) em ${target.name} (-${dmg} HP)`);
      } else {
        logs.push(`${enemy.name} falhou (${hitChance}%) contra ${target.name}`);
      }
    } else {
      enemy.overwatch = true;
      logs.push(`${enemy.name} entrou em Vigilância sem linha de visão`);
    }
  });

  checkWin();
  if (battle.finished) {
    if (logs.length > 0) {
      battleLog(`${document.getElementById("battle-log").textContent} · ${logs.join(" | ")}`);
    }
    renderBattle();
    return;
  }

  battle.turn += 1;
  battle.units.forEach(u => {
    if (u.hp > 0) {
      u.ap = 2;
      u.overwatch = false;
      u.hunkered = false;
    }
  });
  battle.active = 0;

  if (logs.length > 0) {
    battleLog(`Turno ${battle.turn}: ${logs.join(" | ")}`);
  } else {
    battleLog(`Turno ${battle.turn} iniciado.`);
  }
  renderBattle();
}
function applyBarracksRestAfterMission() {
  const restHeal = getBarracksRestHeal();
  const rested = [];
  OPERATIVES.forEach((op, idx) => {
    if (state.selected.includes(idx)) return;
    const maxHp = getMaxHp(idx);
    const curHp = getOpHp(idx);
    if (curHp < maxHp) {
      const nextHp = Math.min(maxHp, curHp + restHeal);
      setOpHp(idx, nextHp);
      rested.push(`${op[0]} (+${nextHp - curHp} HP)`);
    }
  });
  return rested;
}

function checkWin() {
  if (battle.finished) return;

  const allEnemiesDown = battle.enemies.every(e => e.hp <= 0);
  const allUnitsDown = battle.units.every(u => u.hp <= 0);

  if (!allEnemiesDown && !allUnitsDown) return;
  battle.finished = true;

  battle.units.forEach(u => {
    setOpHp(u.opIndex, u.hp);
  });

  if (allEnemiesDown) {
    const m = MISSIONS[battle.missionIndex] || MISSIONS[0];
    let earnedCredits = m.rewardCredits;
    let earnedMaterials = m.rewardMaterials;
    let bonusText = "";

    const secondaryMet =
      (m.secondaryType === "clear_all" && allEnemiesDown) ||
      (m.secondaryType === "no_casualties" && battle.units.every(u => u.hp > 0)) ||
      (m.secondaryType === "fast_clear" && battle.turn <= 6);

    if (secondaryMet) {
      earnedCredits += m.bonusCredits;
      earnedMaterials += m.bonusMaterials;
      bonusText = `<br><span style="color:var(--lime)">Objetivo secundário cumprido (${m.secondaryLabel}): +${m.bonusCredits} CR · +${m.bonusMaterials} MAT</span>`;
    }

    state.credits += earnedCredits;
    state.materials += earnedMaterials;
    if (!state.completed.includes(battle.missionIndex)) {
      state.completed.push(battle.missionIndex);
    }

    const xpNotes = battle.units.map(u => {
      const gained = m.xpBase + (u.hp > 0 ? 10 : 0);
      const lvUp = grantOpXp(u.opIndex, gained);
      return `${u.name}: +${gained} XP${lvUp > 0 ? ` (SUBIU NV.${getOpProgress(u.opIndex).level}!)` : ""}`;
    });

    const rested = applyBarracksRestAfterMission();
    const restText = rested.length > 0
      ? `<br><small style="color:#6ef7ff">Descanso no Quartel: ${rested.join(", ")}</small>`
      : "";

    save();
    renderResources();
    renderRoster();
    renderBuildings();

    battleLog(`Vitória na operação ${m.title}!`);
    logModal(
      "OPERAÇÃO CONCLUÍDA",
      `Ganhaste <b>${earnedCredits} créditos</b> e <b>${earnedMaterials} materiais</b>.${bonusText}<br><small style="color:var(--muted)">${xpNotes.join(" · ")}</small>${restText}`,
      "missions"
    );
    return;
  }

  const rested = applyBarracksRestAfterMission();
  const restText = rested.length > 0
    ? `<br><small style="color:#6ef7ff">Descanso no Quartel: ${rested.join(", ")}</small>`
    : "";

  save();
  renderResources();
  renderRoster();
  renderBuildings();

  battleLog("Esquadra abatida. Reagrupamento na base.");
  logModal(
    "MISSÃO FALHADA",
    `A tua esquadra foi neutralizada. Usa a <b>Enfermaria</b> ou o descanso do <b>Quartel</b> para recuperar antes da próxima saída.${restText}`,
    "base"
  );
}

save();
renderResources();
renderRoster();
renderBuildings();
renderMissions();
(function initBaseFacilitiesExpansion() {
  if (!state.facilities || typeof state.facilities !== "object") {
    state.facilities = {
      armoryTier: 0,
      labIntelDecoded: 0,
      piercingAmmo: false,
      medProphylaxis: {}
    };
  }
  if (!state.facilities.medProphylaxis || typeof state.facilities.medProphylaxis !== "object") {
    state.facilities.medProphylaxis = {};
  }

  let expTrainOp = 0;
  let expTrainStat = 0;
  let expMedOp = 0;
  let expLabTarget = "flanker";

  function syncExpansionState() {
    if (!state.facilities || typeof state.facilities !== "object") {
      state.facilities = { armoryTier: 0, labIntelDecoded: 0, piercingAmmo: false, medProphylaxis: {} };
    }
    if (!state.facilities.medProphylaxis || typeof state.facilities.medProphylaxis !== "object") {
      state.facilities.medProphylaxis = {};
    }
  }

  const origGetMaxHp = typeof getMaxHp === "function" ? getMaxHp : null;
  if (origGetMaxHp) {
    getMaxHp = function(opIndex) {
      syncExpansionState();
      const baseMax = origGetMaxHp(opIndex);
      const op = OPERATIVES[opIndex];
      const statArmorBonus = op ? Math.max(0, Math.round(((op[3][2] || 68) - 68) * 0.4)) : 0;
      const prophBonus = state.facilities.medProphylaxis[opIndex] ? 8 : 0;
      return baseMax + statArmorBonus + prophBonus;
    };
  }

  const origGetWeapon = typeof getWeapon === "function" ? getWeapon : null;
  if (origGetWeapon) {
    getWeapon = function(opIndex) {
      syncExpansionState();
      const wpn = { ...origGetWeapon(opIndex) };
      const armTier = Number(state.facilities.armoryTier) || 0;
      if (armTier > 0) {
        wpn.dmg += armTier * 4;
        wpn.hitBonus = (wpn.hitBonus || 0) + armTier * 4;
        wpn.name = `${wpn.name} [AR-NV${armTier}]`;
      }
      if (state.facilities.piercingAmmo) {
        wpn.dmg += 4;
        wpn.piercing = true;
      }
      return wpn;
    };
  }

  const origGetLabIntelDebuff = typeof getLabIntelDebuff === "function" ? getLabIntelDebuff : null;
  if (origGetLabIntelDebuff) {
    getLabIntelDebuff = function() {
      syncExpansionState();
      const baseIntel = { ...origGetLabIntelDebuff() };
      const decoded = Number(state.facilities.labIntelDecoded) || 0;
      if (decoded > 0) {
        baseIntel.aimPen += decoded * 5;
        baseIntel.dmgRed += decoded * 1;
      }
      return baseIntel;
    };
  }

  const origCalcHitChance = typeof calcHitChance === "function" ? calcHitChance : null;
  if (origCalcHitChance) {
    calcHitChance = function(unit, enemy, isOverwatch = false) {
      syncExpansionState();
      let chance = origCalcHitChance(unit, enemy, isOverwatch);
      const decoded = Number(state.facilities.labIntelDecoded) || 0;
      if (decoded > 0 && enemy) {
        if (expLabTarget === enemy.role) {
          chance += decoded * 6;
        } else {
          chance += decoded * 2;
        }
      }
      const wpn = typeof getWeapon === "function" ? getWeapon(unit.opIndex) : null;
      if (wpn && wpn.piercing && typeof getTargetCoverBonus === "function") {
        const covBonus = getTargetCoverBonus(unit.x, unit.y, enemy.x, enemy.y);
        if (covBonus > 0) chance += Math.round(covBonus * 0.4);
      }
      return Math.max(5, Math.min(98, Math.round(chance)));
    };
  }

  function trainOperativeStat(opIndex, statIndex) {
    syncExpansionState();
    const prog = getOpProgress(opIndex);
    const op = OPERATIVES[opIndex];
    const currentVal = op[3][statIndex];
    if (currentVal >= 99) {
      logModal("MÁXIMO ATINGIDO", `${STAT_NAMES[statIndex]} de ${op[0]} já está no máximo.`);
      return;
    }

    if (prog.trainPoints > 0) {
      prog.trainPoints -= 1;
      op[3][statIndex] = Math.min(99, currentVal + 3);
      save();
      renderResources();
      renderRoster();
      renderBuildings();
      logModal("TREINO CONCLUÍDO", `${op[0]} recebeu <b>+3 em ${STAT_NAMES[statIndex]}</b> usando 1 Ponto de Treino.`);
      return;
    }

    const creditCost = 260;
    const matCost = 7;
    if (state.credits < creditCost || state.materials < matCost) {
      logModal("RECURSOS INSUFICIENTES", `Sem pontos de treino livres. Treinar custa <b>${creditCost} CR</b> e <b>${matCost} MAT</b>.`);
      return;
    }
    state.credits -= creditCost;
    state.materials -= matCost;
    op[3][statIndex] = Math.min(99, currentVal + 2);
    save();
    renderResources();
    renderRoster();
    renderBuildings();
    logModal("TREINO INTENSIVO", `${op[0]} recebeu <b>+2 em ${STAT_NAMES[statIndex]}</b>.`);
  }

  function restOperativeNow(opIndex) {
    if (state.selected.includes(opIndex)) {
      logModal("EM SERVIÇO ATIVO", `${OPERATIVES[opIndex][0]} está na equipa ativa. Retira da equipa ou usa a Enfermaria.`);
      return;
    }
    const maxHp = getMaxHp(opIndex);
    const curHp = getOpHp(opIndex);
    if (curHp >= maxHp) {
      logModal("SEM DESGASTE", `${OPERATIVES[opIndex][0]} já está com HP máximo.`);
      return;
    }
    const cost = 90;
    if (state.credits < cost) {
      logModal("CRÉDITOS INSUFICIENTES", `Descanso imediato no Quartel custa <b>${cost} créditos</b>.`);
      return;
    }
    const healAmt = getBarracksRestHeal() + 10;
    state.credits -= cost;
    setOpHp(opIndex, curHp + healAmt);
    save();
    renderResources();
    renderRoster();
    renderBuildings();
    logModal("DESCANSO NO QUARTEL", `${OPERATIVES[opIndex][0]} recuperou <b>+${Math.min(maxHp - curHp, healAmt)} HP</b>.`);
  }

  function urgentInfirmaryCare(opIndex) {
    if (!state.built.includes(1)) {
      logModal("ENFERMARIA EM FALTA", "Constrói primeiro a <b>Enfermaria</b>.");
      return;
    }
    const maxHp = getMaxHp(opIndex);
    const curHp = getOpHp(opIndex);
    if (curHp >= maxHp) {
      logModal("SAÚDE COMPLETA", `${OPERATIVES[opIndex][0]} não precisa de cuidados.`);
      return;
    }
    const cost = Math.max(120, Math.round(getHealCost(opIndex) * 1.35));
    if (state.credits < cost) {
      logModal("CRÉDITOS INSUFICIENTES", `Cuidado urgente custa <b>${cost} créditos</b>.`);
      return;
    }
    state.credits -= cost;
    setOpHp(opIndex, maxHp);
    save();
    renderResources();
    renderRoster();
    renderBuildings();
    logModal("CUIDADO URGENTE CONCLUÍDO", `${OPERATIVES[opIndex][0]} estabilizado com <b>${maxHp}/${maxHp} HP</b>.`);
  }

  function applyMedicalProphylaxis(opIndex) {
    syncExpansionState();
    if (!state.built.includes(1)) {
      logModal("ENFERMARIA EM FALTA", "Constrói primeiro a <b>Enfermaria</b>.");
      return;
    }
    if (state.facilities.medProphylaxis[opIndex]) {
      logModal("PROFILAXIA ATIVA", `${OPERATIVES[opIndex][0]} já tem profilaxia médica pronta para a próxima missão.`);
      return;
    }
    const costCredits = 180;
    const costMat = 4;
    if (state.credits < costCredits || state.materials < costMat) {
      logModal("RECURSOS INSUFICIENTES", `Profilaxia médica custa <b>${costCredits} CR</b> e <b>${costMat} MAT</b>.`);
      return;
    }
    state.credits -= costCredits;
    state.materials -= costMat;
    state.facilities.medProphylaxis[opIndex] = true;
    const newMax = getMaxHp(opIndex);
    setOpHp(opIndex, Math.min(newMax, getOpHp(opIndex) + 8));
    save();
    renderResources();
    renderRoster();
    renderBuildings();
    logModal("PROFILAXIA APLICADA", `${OPERATIVES[opIndex][0]} recebeu <b>+8 HP</b> de reforço para a próxima saída.`);
  }

  function resupplyActiveSquad() {
    if (!state.built.includes(2)) {
      logModal("ARSENAL EM FALTA", "Constrói primeiro o <b>Arsenal</b>.");
      return;
    }
    const squad = Array.isArray(state.selected) ? state.selected : [];
    if (squad.length === 0) {
      logModal("SEM ESQUADRA", "Seleciona operacionais na equipa antes de reabastecer.");
      return;
    }
    const totalCredits = squad.length * 150;
    const totalMat = squad.length * 3;
    if (state.credits < totalCredits || state.materials < totalMat) {
      logModal("RECURSOS INSUFICIENTES", `Reabastecer ${squad.length} operacionais custa <b>${totalCredits} CR</b> e <b>${totalMat} MAT</b>.`);
      return;
    }
    state.credits -= totalCredits;
    state.materials -= totalMat;
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
    logModal("ESQUADRA REABASTECIDA", `Cada operacional ativo recebeu pelo menos <b>1 Frag, 1 Fumo e 1 Kit de Saúde</b>.`);
  }

  function upgradeArmoryTier() {
    syncExpansionState();
    if (!state.built.includes(2)) {
      logModal("ARSENAL EM FALTA", "Constrói primeiro o <b>Arsenal</b>.");
      return;
    }
    const cur = Number(state.facilities.armoryTier) || 0;
    if (cur >= 2) {
      logModal("ARSENAL NO MÁXIMO", "O Arsenal já atingiu o Nível 2 de equipamento.");
      return;
    }
    const costCr = cur === 0 ? 550 : 900;
    const costMat = cur === 0 ? 14 : 22;
    if (state.credits < costCr || state.materials < costMat) {
      logModal("RECURSOS INSUFICIENTES", `Melhoria de Arsenal custa <b>${costCr} CR</b> e <b>${costMat} MAT</b>.`);
      return;
    }
    state.credits -= costCr;
    state.materials -= costMat;
    state.facilities.armoryTier = cur + 1;
    save();
    renderResources();
    renderRoster();
    renderBuildings();
    logModal("ARSENAL MELHORADO", `Armamento agora no <b>Nível ${state.facilities.armoryTier}</b> (+4 dano e +4% precisão).`);
  }

  function decodeAlienSample() {
    syncExpansionState();
    if (!state.built.includes(3)) {
      logModal("LABORATÓRIO EM FALTA", "Constrói primeiro o <b>Laboratório</b>.");
      return;
    }
    const decoded = Number(state.facilities.labIntelDecoded) || 0;
    if (decoded >= 2) {
      logModal("ANÁLISE COMPLETA", "Já descodificaste o máximo de relatórios alienígenas (2/2).");
      return;
    }
    const alienCost = 1;
    const crCost = 220;
    if ((state.alien || 0) < alienCost || state.credits < crCost) {
      logModal("RECURSOS INSUFICIENTES", `Descodificar amostra custa <b>${alienCost} Tec. Alienígena</b> e <b>${crCost} CR</b>.`);
      return;
    }
    state.alien -= alienCost;
    state.credits -= crCost;
    state.facilities.labIntelDecoded = decoded + 1;
    save();
    renderResources();
    renderBuildings();
    logModal("AMOSTRA DESCODIFICADA", `Relatório Tático <b>${state.facilities.labIntelDecoded}/2</b> ativo: maior precisão e menor precisão/dano inimigo.`);
  }

  function researchPiercingAmmo() {
    syncExpansionState();
    if (!state.built.includes(3)) {
      logModal("LABORATÓRIO EM FALTA", "Constrói primeiro o <b>Laboratório</b>.");
      return;
    }
    if (state.facilities.piercingAmmo) {
      logModal("JÁ PESQUISADO", "A <b>Munição Perfurante Xeno</b> já está ativa.");
      return;
    }
    const alienCost = 2;
    const crCost = 650;
    const matCost = 16;
    if ((state.alien || 0) < alienCost || state.credits < crCost || state.materials < matCost) {
      logModal("RECURSOS INSUFICIENTES", `Munição Perfurante Xeno custa <b>${alienCost} XENO</b>, <b>${crCost} CR</b> e <b>${matCost} MAT</b>.`);
      return;
    }
    state.alien -= alienCost;
    state.credits -= crCost;
    state.materials -= matCost;
    state.facilities.piercingAmmo = true;
    save();
    renderResources();
    renderRoster();
    renderBuildings();
    logModal("PROJETO EXPERIMENTAL CONCLUÍDO", "<b>Munição Perfurante Xeno</b> ativa (+4 dano e ignora parte da cobertura).");
  }

  function renderExtraFacilitiesPanel() {
    syncExpansionState();
    const el = document.getElementById("buildings");
    if (!el) return;

    const old = document.getElementById("oz-extra-facilities-panel");
    if (old) old.remove();

    const infBuilt = state.built.includes(1);
    const armBuilt = state.built.includes(2);
    const labBuilt = state.built.includes(3);

    const opOpts = OPERATIVES.map((op, i) => {
      const p = getOpProgress(i);
      return `<option value="${i}" ${i === expTrainOp ? "selected" : ""}>${op[0]} (Nv.${p.level} · PT:${p.trainPoints})</option>`;
    }).join("");

    const statOpts = STAT_NAMES.map((s, i) => {
      return `<option value="${i}" ${i === expTrainStat ? "selected" : ""}>${s} (${OPERATIVES[expTrainOp][3][i]})</option>`;
    }).join("");

    const medOpts = OPERATIVES.map((op, i) => {
      const hp = getOpHp(i);
      const maxHp = getMaxHp(i);
      const proph = state.facilities.medProphylaxis[i] ? " · PROFILAXIA ✓" : "";
      return `<option value="${i}" ${i === expMedOp ? "selected" : ""}>${op[0]} (${hp}/${maxHp} HP${proph})</option>`;
    }).join("");

    const panel = document.createElement("div");
    panel.id = "oz-extra-facilities-panel";
    panel.style.display = "flex";
    panel.style.flexDirection = "column";
    panel.style.gap = "10px";
    panel.style.marginTop = "10px";

    panel.innerHTML = `
      <div class="building" style="flex-direction:column;align-items:stretch;gap:8px">
        <div>
          <b>QUARTEL — TREINO DE ATRIBUTOS E DESCANSO RÁPIDO</b><br>
          <small style="color:var(--muted)">Usa Pontos de Treino (gratuitos) ou 260 CR / 7 MAT para +2 atributo.</small>
        </div>
        <select id="exp-train-op" style="width:100%;padding:8px;background:#0e161d;color:#f2f7fa;border:1px solid rgba(255,255,255,.22);border-radius:6px;font-size:12px">${opOpts}</select>
        <select id="exp-train-stat" style="width:100%;padding:8px;background:#0e161d;color:#f2f7fa;border:1px solid rgba(255,255,255,.22);border-radius:6px;font-size:12px">${statOpts}</select>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn" id="exp-btn-train" style="flex:1">TREINAR ATRIBUTO</button>
          <button class="btn" id="exp-btn-rest" style="flex:1">DESCANSO (90 CR)</button>
        </div>
      </div>

      <div class="building" style="flex-direction:column;align-items:stretch;gap:8px">
        <div>
          <b>ENFERMARIA — CUIDADO URGENTE E PROFILAXIA</b><br>
          <small style="color:var(--muted)">${infBuilt ? "Tratamento de urgência e reforço médico (+8 HP) antes da saída." : "Constrói a Enfermaria para usar estas funções."}</small>
        </div>
        <select id="exp-med-op" ${!infBuilt ? "disabled" : ""} style="width:100%;padding:8px;background:#0e161d;color:#f2f7fa;border:1px solid rgba(255,255,255,.22);border-radius:6px;font-size:12px">${medOpts}</select>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn" id="exp-btn-urgent" ${!infBuilt ? "disabled" : ""} style="flex:1">CUIDADO URGENTE</button>
          <button class="btn" id="exp-btn-proph" ${!infBuilt ? "disabled" : ""} style="flex:1">PROFILAXIA (180 CR / 4 MAT)</button>
        </div>
      </div>

      <div class="building" style="flex-direction:column;align-items:stretch;gap:8px">
        <div>
          <b>ARSENAL — REABASTECIMENTO E NÍVEL DE ARMAMENTO</b><br>
          <small style="color:var(--muted)">Nível de Armamento: <b>${state.facilities.armoryTier || 0}/2</b> · Equipa ativa: <b>${state.selected.length}</b> operacionais.</small>
        </div>
        <button class="btn" id="exp-btn-resupply" ${!armBuilt ? "disabled" : ""} style="width:100%">
          REABASTECER EQUIPA ATIVA (${state.selected.length * 150} CR / ${state.selected.length * 3} MAT)
        </button>
        <button class="btn" id="exp-btn-arm-tier" ${!armBuilt || (state.facilities.armoryTier || 0) >= 2 ? "disabled" : ""} style="width:100%">
          ${(state.facilities.armoryTier || 0) >= 2 ? "ARMAMENTO NO NÍVEL MÁXIMO (2/2)" : `MELHORAR ARMAMENTO (${(state.facilities.armoryTier || 0) === 0 ? "550 CR / 14 MAT" : "900 CR / 22 MAT"})`}
        </button>
      </div>

      <div class="building" style="flex-direction:column;align-items:stretch;gap:8px">
        <div>
          <b>LABORATÓRIO — DESCODIFICAÇÃO E MUNIÇÃO PERFURANTE</b><br>
          <small style="color:var(--muted)">Relatórios descodificados: <b>${state.facilities.labIntelDecoded || 0}/2</b> · Perfurante: <b>${state.facilities.piercingAmmo ? "ATIVA ✓" : "INATIVA"}</b></small>
        </div>
        <select id="exp-lab-target" ${!labBuilt ? "disabled" : ""} style="width:100%;padding:8px;background:#0e161d;color:#f2f7fa;border:1px solid rgba(255,255,255,.22);border-radius:6px;font-size:12px">
          <option value="flanker" ${expLabTarget === "flanker" ? "selected" : ""}>Foco de Análise: Flanqueadores / Sentinela</option>
          <option value="skirmisher" ${expLabTarget === "skirmisher" ? "selected" : ""}>Foco de Análise: Pesados / Caçadores</option>
        </select>
        <button class="btn" id="exp-btn-decode" ${!labBuilt || (state.facilities.labIntelDecoded || 0) >= 2 ? "disabled" : ""} style="width:100%">
          ${(state.facilities.labIntelDecoded || 0) >= 2 ? "DESCODIFICAÇÃO COMPLETA (2/2)" : "DESCODIFICAR AMOSTRA (1 XENO / 220 CR)"}
        </button>
        <button class="btn" id="exp-btn-piercing" ${!labBuilt || state.facilities.piercingAmmo ? "disabled" : ""} style="width:100%">
          ${state.facilities.piercingAmmo ? "MUNIÇÃO PERFURANTE ATIVA ✓" : "PESQUISAR PERFURANTE (2 XENO / 650 CR / 16 MAT)"}
        </button>
      </div>
    `;

    panel.querySelector("#exp-train-op").onchange = e => {
      expTrainOp = Number(e.target.value);
      renderExtraFacilitiesPanel();
    };
    panel.querySelector("#exp-train-stat").onchange = e => {
      expTrainStat = Number(e.target.value);
    };
    panel.querySelector("#exp-btn-train").onclick = () => trainOperativeStat(expTrainOp, expTrainStat);
    panel.querySelector("#exp-btn-rest").onclick = () => restOperativeNow(expTrainOp);

    panel.querySelector("#exp-med-op").onchange = e => {
      expMedOp = Number(e.target.value);
    };
    panel.querySelector("#exp-btn-urgent").onclick = () => urgentInfirmaryCare(expMedOp);
    panel.querySelector("#exp-btn-proph").onclick = () => applyMedicalProphylaxis(expMedOp);

    panel.querySelector("#exp-btn-resupply").onclick = resupplyActiveSquad;
    panel.querySelector("#exp-btn-arm-tier").onclick = upgradeArmoryTier;

    panel.querySelector("#exp-lab-target").onchange = e => {
      expLabTarget = e.target.value;
    };
    panel.querySelector("#exp-btn-decode").onclick = decodeAlienSample;
    panel.querySelector("#exp-btn-piercing").onclick = researchPiercingAmmo;

    panel.querySelectorAll("select option").forEach(opt => {
      opt.style.backgroundColor = "#0e161d";
      opt.style.color = "#f2f7fa";
    });

    const resetBtn = Array.from(el.querySelectorAll("button")).find(b => b.textContent.includes("RESET PROGRESSO"));
    if (resetBtn) {
      el.insertBefore(panel, resetBtn);
    } else {
      el.appendChild(panel);
    }
  }

  const origRenderBuildings = typeof renderBuildings === "function" ? renderBuildings : null;
  if (origRenderBuildings) {
    renderBuildings = function() {
      origRenderBuildings();
      renderExtraFacilitiesPanel();
    };
  }

  const origCheckWin = typeof checkWin === "function" ? checkWin : null;
  if (origCheckWin) {
    checkWin = function() {
      const wasFinished = battle && battle.finished;
      origCheckWin();
      if (!wasFinished && battle && battle.finished) {
        syncExpansionState();
        state.facilities.medProphylaxis = {};
        save();
        if (typeof renderBuildings === "function") renderBuildings();
      }
    };
  }

  if (typeof renderBuildings === "function") {
    renderBuildings();
  }
})();
