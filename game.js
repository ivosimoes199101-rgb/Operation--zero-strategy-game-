const OPERATIVES = [
  ["Alex Morgan", "EUA", "Assalto", [78, 65, 72, 82, 70, 48, 55, 88], "Líder Nato"],
  ["Elena Volkov", "Ucrânia", "Sniper", [82, 94, 65, 68, 91, 42, 86, 90], "Disparo calculado"],
  ["Daniel Okafor", "Nigéria", "Médico", [68, 55, 65, 76, 82, 88, 60, 91], "Médico de combate"],
  ["Mei Tanaka", "Japão", "Engenheira", [60, 48, 72, 62, 80, 96, 78, 84], "Especialista tecnológica"],
  ["Marcus Weber", "Alemanha", "Armas pesadas", [75, 58, 48, 94, 68, 52, 35, 86], "Resistência excecional"],
  ["Sofia Reyes", "México", "Batedora", [72, 68, 94, 65, 96, 55, 95, 82], "Predadora silenciosa"],
  ["Sarah Mitchell", "Reino Unido", "Assalto", [88, 70, 86, 78, 74, 42, 68, 65], "Instinto agressivo"],
  ["Amir Haddad", "Líbano", "Médico", [65, 52, 68, 72, 76, 85, 58, 95], "Espírito de equipa"],
  ["Ingrid Larsen", "Noruega", "Engenheira", [62, 55, 66, 70, 84, 93, 72, 91], "Especialista em explosivos"],
  ["Jack Sullivan", "Austrália", "Batedor", [70, 64, 92, 72, 94, 50, 90, 78], "Explorador nato"],
  ["Amara Diallo", "Senegal", "Sniper", [86, 96, 70, 72, 95, 48, 89, 96], "Concentração absoluta"],
  ["Katarina Novak", "Sérvia", "Armas pesadas", [82, 62, 55, 92, 72, 58, 42, 90], "Poder de fogo"]
];

const STAT_NAMES = ["Precisão", "Pontaria", "Mobilidade", "Resistência", "Perceção", "Técnica", "Furtividade", "Disciplina"];

const BUILDINGS = [
  ["Quartel", "Aumenta a capacidade de alojamento.", 500, 10],
  ["Enfermaria", "Desbloqueia o tratamento de ferimentos (Leve, Grave e Muito Grave).", 700, 15],
  ["Arsenal", "Desbloqueia a loja de armas, fardas, granadas e kits de saúde.", 900, 20],
  ["Laboratório", "Investiga tecnologia recuperada.", 1200, 25],
  ["Hangar", "Desbloqueia operações de transporte.", 1500, 35],
  ["Centro de inteligência", "Melhora a informação de missão.", 1000, 20],
  ["Academia militar", "Desbloqueia o treino de atributos na base.", 1100, 25],
  ["Central de energia", "Aumenta a capacidade energética.", 1300, 30]
];

const WEAPONS_SHOP = [
  { id: "wpn_std", name: "ARMA PADRÃO", credits: 0, materials: 0, dmgBonus: 0, magBonus: 0, hitBonus: 0, desc: "Equipamento base." },
  { id: "wpn_vanguard", name: "CARABINA VANGUARDA MK.II", credits: 450, materials: 12, dmgBonus: 8, magBonus: 4, hitBonus: 4, desc: "+8 dano, +4 munição, +4% precisão." },
  { id: "wpn_marksman", name: "PRECISÃO ZERO-X", credits: 700, materials: 18, dmgBonus: 16, magBonus: 2, hitBonus: 8, desc: "+16 dano, +2 munição, +8% precisão." },
  { id: "wpn_heavy", name: "ASSALTO PESADO TITAN", credits: 950, materials: 25, dmgBonus: 22, magBonus: 10, hitBonus: 5, desc: "+22 dano, +10 munição, +5% precisão." }
];

const OUTFITS_SHOP = [
  { id: "out_std", name: "FARDA OPERACIONAL", credits: 0, materials: 0, dmgRed: 0, hpBonus: 0, dodgeBonus: 0, desc: "Farda base sem blindagem extra." },
  { id: "out_recon", name: "FATO FURTIVO SHADOW", credits: 400, materials: 10, dmgRed: 2, hpBonus: 10, dodgeBonus: 8, desc: "+10 HP máx., -2 dano recebido, +8% evasão." },
  { id: "out_tactical", name: "COLETE TÁTICO AEGIS", credits: 650, materials: 16, dmgRed: 5, hpBonus: 20, dodgeBonus: 4, desc: "+20 HP máx., -5 dano recebido, +4% evasão." },
  { id: "out_exo", name: "EXOFARDA SENTINELA", credits: 950, materials: 24, dmgRed: 8, hpBonus: 35, dodgeBonus: 6, desc: "+35 HP máx., -8 dano recebido, +6% evasão." }
];
const CONSUMABLES_SHOP = {
  frag: [
    { id: "frag_1", name: "GRANADA FRAGMENTAÇÃO x1", count: 1, credits: 180, materials: 4, dmg: 32, desc: "Explosão 3x3 (32 dano direto, ignora cobertura)." },
    { id: "frag_2", name: "GRANADA FRAGMENTAÇÃO x2", count: 2, credits: 320, materials: 7, dmg: 32, desc: "2 granadas de fragmentação (32 dano em área)." }
  ],
  smoke: [
    { id: "smoke_1", name: "GRANADA DE FUMO x1", count: 1, credits: 150, materials: 3, turns: 2, pen: 30, desc: "Nuvem de fumo 3x3 por 2 turnos (-30% precisão inimiga)." },
    { id: "smoke_2", name: "GRANADA DE FUMO x2", count: 2, credits: 270, materials: 6, turns: 2, pen: 30, desc: "2 granadas de fumo (-30% precisão inimiga por 2 turnos)." }
  ],
  medkit: [
    { id: "med_1", name: "KIT DE SAÚDE x1", count: 1, credits: 160, materials: 4, heal: 40, desc: "Recupera +40 HP em combate (+50 HP na classe Médico)." },
    { id: "med_2", name: "KIT DE SAÚDE x2", count: 2, credits: 290, materials: 7, heal: 40, desc: "2 kits de saúde (+40 HP cada, +50 HP na classe Médico)." }
  ]
};

const MISSIONS = [
  {
    title: "FIRST CONTACT",
    desc: "Principal: Alcança a extração ou elimina a patrulha. Secundário: Neutraliza todos os inimigos antes de sair.",
    status: "Disponível",
    rewardCredits: 500,
    rewardMaterials: 15,
    bonusCredits: 300,
    bonusMaterials: 10,
    xpBase: 45,
    secondaryType: "clear_all",
    secondaryLabel: "Eliminar todos os inimigos"
  },
  {
    title: "DEAD SIGNAL",
    desc: "Principal: Sobrevive e extrai dados. Secundário: Concluir sem qualquer operacional abatido.",
    status: "Bloqueada",
    rewardCredits: 650,
    rewardMaterials: 20,
    bonusCredits: 350,
    bonusMaterials: 12,
    xpBase: 55,
    secondaryType: "no_casualties",
    secondaryLabel: "Concluir sem baixas na equipa"
  },
  {
    title: "THE BREACH",
    desc: "Principal: Contém a brecha inimiga. Secundário: Neutraliza todos os alvos em até 6 turnos.",
    status: "Bloqueada",
    rewardCredits: 800,
    rewardMaterials: 25,
    bonusCredits: 450,
    bonusMaterials: 15,
    xpBase: 65,
    secondaryType: "fast_clear",
    secondaryLabel: "Eliminar todos em até 6 turnos"
  }
];

const WEAPONS_BY_ROLE = {
  "Assalto": { name: "RIFLE Z-04", mag: 24, dmg: 28, optRange: 4 },
  "Sniper": { name: "PRECISÃO L-9", mag: 6, dmg: 52, optRange: 7 },
  "Médico": { name: "CARABINA M-2", mag: 18, dmg: 22, optRange: 4 },
  "Engenheira": { name: "ESPINGARDA E-7", mag: 10, dmg: 34, optRange: 3 },
  "Armas pesadas": { name: "METRALHADORA H-1", mag: 40, dmg: 30, optRange: 5 },
  "Batedora": { name: "SUBMETRALHADORA S-3", mag: 28, dmg: 24, optRange: 3 },
  "Batedor": { name: "SUBMETRALHADORA S-3", mag: 28, dmg: 24, optRange: 3 }
};

const ROLE_PERKS = {
  "Assalto": "Bónus discreto: +5% precisão a curta/média distância (≤ 4 casas).",
  "Sniper": "Bónus discreto: +6% precisão e +5% crítico à distância (≥ 5 casas).",
  "Médico": "Bónus discreto: kit médico recupera +35 HP base (+50 com kit de saúde).",
  "Engenheira": "Bónus discreto: reduz em 5% a proteção de cobertura dos inimigos.",
  "Armas pesadas": "Bónus discreto: reduz em 2 pontos o dano recebido em combate.",
  "Batedora": "Bónus discreto: +6% precisão em flancos e +5% em vigilância.",
  "Batedor": "Bónus discreto: +6% precisão em flancos e +5% em vigilância."
};

const COVERS = [
  { x: 3, y: 2, type: "half", blocksSight: false },
  { x: 4, y: 4, type: "half", blocksSight: false },
  { x: 5, y: 2, type: "full", blocksSight: true }
];

const defaults = {
  credits: 2500,
  energy: 100,
  materials: 80,
  alien: 0,
  selected: [],
  built: [],
  completed: [],
  mission: 0,
  turn: 1,
  hp: {},
  pos: 0,
  opProgress: {},
  opHp: {},
  opGear: {}
};

let state = load();
let pendingReturnScreen = null;
let selectedTrainOpIndex = 0;
let selectedTrainStatIndex = 0;
let selectedHealOpIndex = 0;
let selectedShopOpIndex = 0;
let selectedShopCategory = "weapon";
let selectedShopItemId = "wpn_vanguard";
let activeCombatMode = null;

function load() {
  try {
    const parsed = { ...defaults, ...JSON.parse(localStorage.getItem("oz_save") || "{}") };
    if (!parsed.opProgress || typeof parsed.opProgress !== "object") parsed.opProgress = {};
    if (!parsed.opHp || typeof parsed.opHp !== "object") parsed.opHp = {};
    if (!parsed.opGear || typeof parsed.opGear !== "object") parsed.opGear = {};
    return parsed;
  } catch (e) {
    return { ...defaults, opProgress: {}, opHp: {}, opGear: {} };
  }
}

function isInfirmaryBuilt() {
  return state.built.includes(1);
}

function isArmoryBuilt() {
  return state.built.includes(2);
}

function isAcademyBuilt() {
  return state.built.includes(6);
}

function getOpGear(opIndex) {
  if (!state.opGear[opIndex]) {
    state.opGear[opIndex] = { weaponId: "wpn_std", outfitId: "out_std", frag: 0, smoke: 0, medkit: 0 };
  }
  const g = state.opGear[opIndex];
  if (typeof g.frag !== "number") g.frag = 0;
  if (typeof g.smoke !== "number") g.smoke = 0;
  if (typeof g.medkit !== "number") g.medkit = 0;
  return g;
}

function getEquippedWeaponItem(opIndex) {
  const g = getOpGear(opIndex);
  return WEAPONS_SHOP.find(w => w.id === g.weaponId) || WEAPONS_SHOP[0];
}

function getEquippedOutfitItem(opIndex) {
  const g = getOpGear(opIndex);
  return OUTFITS_SHOP.find(o => o.id === g.outfitId) || OUTFITS_SHOP[0];
}

function getMaxHp(opIndex) {
  return 100 + (getEquippedOutfitItem(opIndex).hpBonus || 0);
}

function getShopItemCost(item) {
  return {
    credits: item.credits,
    materials: item.materials
  };
}
function getOpHp(opIndex) {
  const maxHp = getMaxHp(opIndex);
  const raw = state.opHp[opIndex];
  if (typeof raw !== "number" || Number.isNaN(raw)) {
    state.opHp[opIndex] = maxHp;
    return maxHp;
  }
  return Math.max(1, Math.min(maxHp, Math.round(raw)));
}

function setOpHp(opIndex, value) {
  const maxHp = getMaxHp(opIndex);
  state.opHp[opIndex] = Math.max(1, Math.min(maxHp, Math.round(value)));
}

function getInjurySeverity(hp, maxHp = 100) {
  const ratio = hp / Math.max(1, maxHp);
  if (hp >= maxHp) return { label: "Íntegro", color: "var(--lime)", mult: 1, baseCr: 0, baseMat: 0 };
  if (ratio >= 0.7) return { label: "Ferimento Leve", color: "#9be564", mult: 1, baseCr: 10, baseMat: 1 };
  if (ratio >= 0.4) return { label: "Ferimento Grave", color: "#ffb84d", mult: 1.6, baseCr: 35, baseMat: 3 };
  return { label: "Ferimento Muito Grave", color: "#ff6b6b", mult: 2.4, baseCr: 75, baseMat: 6 };
}

function getHealCost(opIndex) {
  const maxHp = getMaxHp(opIndex);
  const hp = getOpHp(opIndex);
  const missing = Math.max(0, maxHp - hp);
  const sev = getInjurySeverity(hp, maxHp);
  if (missing === 0) {
    return { missing: 0, credits: 0, materials: 0, severity: sev, maxHp };
  }
  const crPerHp = 3.2 * sev.mult;
  const matPerHp = 0.14 * sev.mult;

  const credits = Math.max(15, Math.ceil(sev.baseCr + missing * crPerHp));
  const materials = Math.max(2, Math.ceil(sev.baseMat + missing * matPerHp));

  return {
    missing,
    credits,
    materials,
    severity: sev,
    maxHp
  };
}

function getOpProgress(opIndex) {
  if (!state.opProgress[opIndex]) {
    state.opProgress[opIndex] = {
      xp: 0,
      level: 1,
      trainPts: 0,
      bonusStats: [0, 0, 0, 0, 0, 0, 0, 0]
    };
  }
  return state.opProgress[opIndex];
}

function getEffectiveStats(opIndex) {
  const base = OPERATIVES[opIndex][3];
  const prog = getOpProgress(opIndex);
  return base.map((val, idx) => Math.min(99, val + (prog.bonusStats[idx] || 0)));
}

function grantOpXp(opIndex, amount) {
  const prog = getOpProgress(opIndex);
  prog.xp += amount;
  let levelsGained = 0;
  while (prog.xp >= 100) {
    prog.xp -= 100;
    prog.level += 1;
    prog.trainPts += 2;
    levelsGained += 1;
  }
  return levelsGained;
}

function save() {
  localStorage.setItem("oz_save", JSON.stringify(state));
  renderResources();
}

function go(id) {
  activeCombatMode = null;
  document.querySelectorAll(".screen").forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo(0, 0);
  if (id === "squad") renderRoster();
  if (id === "base") renderBuildings();
  if (id === "missions") renderMissions();
  if (id === "command") renderResources();
}

document.addEventListener("click", e => {
  const b = e.target.closest("[data-go]");
  if (b) go(b.dataset.go);
});

function renderResources() {
  ["credits", "energy", "materials", "alien"].forEach(k => {
    const el = document.getElementById(k);
    if (el) el.textContent = state[k];
  });
}

function renderRoster() {
  const el = document.getElementById("roster");
  if (!el) return;
  el.innerHTML = "";
  OPERATIVES.forEach((o, i) => {
    const selected = state.selected.includes(i);
    const prog = getOpProgress(i);
    const maxHp = getMaxHp(i);
    const hp = getOpHp(i);
    const sev = getInjurySeverity(hp, maxHp);
    const ptsBadge = prog.trainPts > 0 ? ` · +${prog.trainPts} PT` : "";
    const hpBadge = hp < maxHp
      ? ` · <span style="color:${sev.color}">${hp}/${maxHp} HP (${sev.label})</span>`
      : ` · ${maxHp} HP`;
    const d = document.createElement("div");
    d.className = "operator" + (selected ? " selected" : "");
    d.innerHTML = `<span class="portrait">${o[0].split(" ").map(x => x[0]).slice(0, 2).join("")}</span><span style="min-width:0;flex:1;text-align:left"><b>${o[0]}</b><small>NV.${prog.level} · ${o[2]}${hpBadge} · ${prog.xp}/100 XP${ptsBadge}</small></span><button type="button" class="op-info-btn">INFO</button><span class="pick">${selected ? "✓" : "＋"}</span>`;
    d.onclick = ev => {
      if (ev.target.closest(".op-info-btn")) return;
      if (state.selected.includes(i)) {
        state.selected = state.selected.filter(x => x !== i);
      } else if (state.selected.length < 5) {
        state.selected.push(i);
      } else {
        logModal("LIMITE DA EQUIPA", "Só podes levar cinco operacionais para uma missão.");
        return;
      }
      save();
      renderRoster();
    };
    d.querySelector(".op-info-btn").onclick = ev => {
      ev.stopPropagation();
      showOperator(i);
    };
    d.ondblclick = () => showOperator(i);
    el.appendChild(d);
  });
  const countEl = document.getElementById("team-count");
  if (countEl) countEl.textContent = `EQUIPA ${state.selected.length}/5`;
}

function buyOrEquipGear(opIndex, type, itemId) {
  if (!isArmoryBuilt()) {
    logModal("ARSENAL EM FALTA", "Constrói primeiro o edifício <b>Arsenal</b> na base para aceder à loja.");
    return;
  }

  const idx = Number(opIndex);
  if (Number.isNaN(idx) || !OPERATIVES[idx]) return;
  const op = OPERATIVES[idx];
  const gear = getOpGear(idx);

  if (type === "frag" || type === "smoke" || type === "medkit") {
    const list = CONSUMABLES_SHOP[type] || [];
    const item = list.find(x => x.id === itemId);
    if (!item) return;
    const cost = getShopItemCost(item);
    if (state.credits < cost.credits || state.materials < cost.materials) {
      logModal("RECURSOS INSUFICIENTES", `Comprar <b>${item.name}</b> custa <b>${cost.credits} créditos</b> e <b>${cost.materials} materiais</b>.`);
      return;
    }
    state.credits -= cost.credits;
    state.materials -= cost.materials;
    gear[type] = (gear[type] || 0) + item.count;
    save();
    renderBuildings();
    renderRoster();
    logModal(
      "CONSUMÍVEL ADICIONADO",
      `${op[0]} recebeu <b>${item.name}</b> (total: ${gear[type]} na mochila) por ${cost.credits} cr e ${cost.materials} mat.`
    );
    return;
  }

  const catalog = type === "weapon" ? WEAPONS_SHOP : OUTFITS_SHOP;
  const item = catalog.find(x => x.id === itemId);
  if (!item) return;

  if (type === "weapon" && gear.weaponId === item.id) {
    logModal("JÁ EQUIPADO", `${op[0]} já tem <b>${item.name}</b> equipada.`);
    return;
  }
  if (type === "outfit" && gear.outfitId === item.id) {
    logModal("JÁ EQUIPADO", `${op[0]} já tem <b>${item.name}</b> equipada.`);
    return;
  }

  const cost = getShopItemCost(item);
  const needsPayment = !(type === "weapon" && item.id === "wpn_std") && !(type === "outfit" && item.id === "out_std");
  if (needsPayment && (state.credits < cost.credits || state.materials < cost.materials)) {
    logModal("RECURSOS INSUFICIENTES", `Comprar <b>${item.name}</b> custa <b>${cost.credits} créditos</b> e <b>${cost.materials} materiais</b>.`);
    return;
  }

  if (needsPayment) {
    state.credits -= cost.credits;
    state.materials -= cost.materials;
  }

  if (type === "weapon") {
    gear.weaponId = item.id;
  } else {
    const oldMax = getMaxHp(idx);
    const currentHp = getOpHp(idx);
    gear.outfitId = item.id;
    const newMax = getMaxHp(idx);
    if (newMax > oldMax) {
      setOpHp(idx, currentHp + (newMax - oldMax));
    } else if (currentHp > newMax) {
      setOpHp(idx, newMax);
    }
  }

  save();
  renderBuildings();
  renderRoster();
  logModal(
    needsPayment ? "COMPRA CONCLUÍDA" : "EQUIPAMENTO ATUALIZADO",
    `${op[0]} equipou <b>${item.name}</b>${needsPayment ? ` (${cost.credits} cr e ${cost.materials} mat gastos)` : ""}.`
  );
}
function trainOpStat(opIndex, statIdx, fromAcademy = false) {
  const prog = getOpProgress(opIndex);
  const currentStats = getEffectiveStats(opIndex);
  if (currentStats[statIdx] >= 99) return false;

  if (prog.trainPts > 0) {
    if (!isAcademyBuilt()) return false;
    prog.trainPts -= 1;
    prog.bonusStats[statIdx] = (prog.bonusStats[statIdx] || 0) + 1;
    save();
    return true;
  }

  if (!isAcademyBuilt()) return false;
  const cost = 200;
  if (fromAcademy && state.credits >= cost) {
    state.credits -= cost;
    prog.bonusStats[statIdx] = (prog.bonusStats[statIdx] || 0) + 1;
    save();
    return true;
  }
  return false;
}

function trainSelectedOperative(opIndex, statIdx) {
  if (!isAcademyBuilt()) {
    logModal("ACADEMIA EM FALTA", "Constrói primeiro o edifício <b>Academia militar</b> na base para treinar atributos.");
    return;
  }

  const idx = Number(opIndex);
  if (Number.isNaN(idx) || !OPERATIVES[idx]) return;
  const op = OPERATIVES[idx];
  const prog = getOpProgress(idx);
  const currentStats = getEffectiveStats(idx);

  if (currentStats[statIdx] >= 99) {
    logModal("ATRIBUTO NO MÁXIMO", `${op[0]} já atingiu o máximo (99) em ${STAT_NAMES[statIdx]}.`);
    return;
  }

  if (prog.trainPts > 0) {
    prog.trainPts -= 1;
    prog.bonusStats[statIdx] = (prog.bonusStats[statIdx] || 0) + 1;
    save();
    renderBuildings();
    renderRoster();
    logModal("TREINO CONCLUÍDO", `${op[0]} usou 1 PT livre e ganhou +1 em <b>${STAT_NAMES[statIdx]}</b> (${getEffectiveStats(idx)[statIdx]}).`);
    return;
  }

  const cost = 220;
  if (state.credits < cost) {
    logModal("CRÉDITOS INSUFICIENTES", `Precisas de ${cost} créditos para treinar ${op[0]}.`);
    return;
  }

  state.credits -= cost;
  prog.bonusStats[statIdx] = (prog.bonusStats[statIdx] || 0) + 1;
  save();
  renderBuildings();
  renderRoster();
  logModal("TREINO CONCLUÍDO", `${op[0]} ganhou +1 em <b>${STAT_NAMES[statIdx]}</b> (${getEffectiveStats(idx)[statIdx]}).`);
}

function healOperativeOnBase(opIndex) {
  if (!isInfirmaryBuilt()) {
    logModal("ENFERMARIA EM FALTA", "Constrói primeiro o edifício <b>Enfermaria</b> na base para tratar ferimentos.");
    return;
  }

  const idx = Number(opIndex);
  if (Number.isNaN(idx) || !OPERATIVES[idx]) return;
  const op = OPERATIVES[idx];
  const maxHp = getMaxHp(idx);
  const cost = getHealCost(idx);

  if (cost.missing <= 0) {
    logModal("SEM FERIMENTOS", `${op[0]} já está com ${maxHp} HP.`);
    return;
  }

  if (state.credits < cost.credits || state.materials < cost.materials) {
    logModal(
      "RECURSOS INSUFICIENTES",
      `Tratar <b>${cost.severity.label}</b> de ${op[0]} custa <b>${cost.credits} créditos</b> e <b>${cost.materials} materiais</b>.`
    );
    return;
  }

  state.credits -= cost.credits;
  state.materials -= cost.materials;
  setOpHp(idx, maxHp);
  save();
  renderBuildings();
  renderRoster();
  logModal(
    "FERIMENTOS TRATADOS",
    `${op[0]} (${cost.severity.label}) recuperou até ${maxHp} HP (${cost.credits} cr e ${cost.materials} mat gastos).`
  );
}

function showOperator(i) {
  const o = OPERATIVES[i];
  const prog = getOpProgress(i);
  const maxHp = getMaxHp(i);
  const hp = getOpHp(i);
  const sev = getInjurySeverity(hp, maxHp);
  const wpnItem = getEquippedWeaponItem(i);
  const outItem = getEquippedOutfitItem(i);
  const gear = getOpGear(i);
  const stats = getEffectiveStats(i);
  const perk = ROLE_PERKS[o[2]] || "";
  const academyBuilt = isAcademyBuilt();
  const drillCost = 200;
  const canUseDrill = academyBuilt && prog.trainPts <= 0 && state.credits >= drillCost;

  const statsHtml = stats.map((v, j) => {
    const canSpendPt = academyBuilt && prog.trainPts > 0 && v < 99;
    const canBuyDrill = !canSpendPt && canUseDrill && v < 99;
    const btnLabel = canSpendPt ? "+1 PT" : canBuyDrill ? `+1 (${drillCost}cr)` : "";
    const btnHtml = btnLabel
      ? `<button type="button" data-train-stat="${j}" style="margin-left:6px;background:#132129;border:1px solid var(--lime);color:var(--lime);padding:2px 6px;font-size:8px">${btnLabel}</button>`
      : "";
    return `<div class="stat"><span>${STAT_NAMES[j]}</span><span><b>${v}</b>${btnHtml}</span></div>`;
  }).join("");

  const hpLine = hp < maxHp
    ? `<span style="color:${sev.color}">${hp}/${maxHp} HP · ${sev.label}</span>`
    : `${maxHp}/${maxHp} HP · Íntegro`;

  const trainStatusText = academyBuilt
    ? (prog.trainPts > 0
      ? `<span style="color:var(--lime)">${prog.trainPts} PONTO(S) DE TREINO LIVRE</span>`
      : `Treino direto: ${drillCost} cr/ponto (Academia ativa)`)
    : `<span style="color:var(--muted)">Treino bloqueado · Constrói a Academia militar na base</span>`;

  const headerInfo = `NV.${prog.level} · ${hpLine} · ${prog.xp}/100 XP · ${trainStatusText}`;
  const packInfo = `Frag: <b>${gear.frag}</b> · Fumo: <b>${gear.smoke}</b> · Kits Saúde: <b>${gear.medkit}</b>`;

  document.getElementById("modal-content").innerHTML = `<div class="eyebrow">${o[1]} // ${o[2]}</div><h2 style="font:800 32px var(--display);margin:0">${o[0]}</h2><p class="muted">${o[4]}<br><span style="color:var(--lime)">${perk}</span><br><small style="color:#9ec5d8">Arma: <b>${wpnItem.name}</b> · Farda: <b>${outItem.name}</b><br>Mochila: ${packInfo}</small><br><small style="color:var(--muted)">${headerInfo}</small></p><div class="stats">${statsHtml}</div>`;

  document.querySelectorAll("#modal-content [data-train-stat]").forEach(btn => {
    btn.onclick = () => {
      const sIdx = Number(btn.dataset.trainStat);
      if (trainOpStat(i, sIdx, prog.trainPts <= 0)) {
        renderRoster();
        showOperator(i);
      }
    };
  });

  document.getElementById("modal").classList.remove("hidden");
}

function logModal(title, msg, returnScreen = null) {
  pendingReturnScreen = returnScreen;
  document.getElementById("modal-content").innerHTML = `<h2 style="font:800 28px var(--display)">${title}</h2><p class="muted">${msg}</p>`;
  document.getElementById("modal").classList.remove("hidden");
}

document.getElementById("close-modal").onclick = () => {
  document.getElementById("modal").classList.add("hidden");
  if (pendingReturnScreen) {
    const dest = pendingReturnScreen;
    pendingReturnScreen = null;
    go(dest);
  }
};

function renderBuildings() {
  const el = document.getElementById("buildings");
  if (!el) return;
  el.innerHTML = "";

  BUILDINGS.forEach((b, i) => {
    const built = state.built.includes(i);
    const d = document.createElement("div");
    d.className = "building";
    d.innerHTML = `<div><b>${b[0]}</b><small>${b[1]}<br>Custo: ${b[2]} créditos / ${b[3]} materiais</small></div><button ${built ? "disabled" : ""}>${built ? "CONSTRUÍDO" : "CONSTRUIR"}</button>`;
    d.querySelector("button").onclick = () => {
      if (state.credits < b[2] || state.materials < b[3]) {
        logModal("RECURSOS INSUFICIENTES", "Não existem recursos suficientes para esta construção.");
        return;
      }
      state.credits -= b[2];
      state.materials -= b[3];
      state.built.push(i);
      save();
      renderBuildings();
    };
    el.appendChild(d);
  });

  const infirmaryBuilt = isInfirmaryBuilt();
  if (!OPERATIVES[selectedHealOpIndex]) selectedHealOpIndex = 0;
  const healOp = OPERATIVES[selectedHealOpIndex];
  const healMaxHp = getMaxHp(selectedHealOpIndex);
  const healHp = getOpHp(selectedHealOpIndex);
  const healCost = getHealCost(selectedHealOpIndex);

  const healOptionsHtml = OPERATIVES.map((o, idx) => {
    const mHp = getMaxHp(idx);
    const h = getOpHp(idx);
    const s = getInjurySeverity(h, mHp);
    const status = h < mHp ? ` (${h}/${mHp} HP · ${s.label})` : ` (${mHp}/${mHp} HP · Íntegro)`;
    return `<option value="${idx}" ${idx === selectedHealOpIndex ? "selected" : ""}>${o[0]} · ${o[2]}${status}</option>`;
  }).join("");

  const healBox = document.createElement("div");
  healBox.className = "building";
  healBox.style.flexDirection = "column";
  healBox.style.alignItems = "stretch";
  healBox.style.gap = "10px";

  healBox.innerHTML = `
    <div>
      <b>ENFERMARIA E CURA — BASE MILITAR</b><br>
      <small>${infirmaryBuilt ? "<span style='color:var(--lime)'>Enfermaria construída · Trata ferimentos Leves, Graves e Muito Graves</span>" : "<span style='color:#ff9e5e'>Bloqueada · Constrói a Enfermaria para curar operacionais</span>"}</small>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.07)">
      <label style="font-size:11px;color:var(--muted)">Seleciona o operacional:</label>
      <select id="heal-op-select" ${!infirmaryBuilt ? "disabled" : ""} style="width:100%;padding:9px;background:#0e161d;color:#fff;border:1px solid rgba(255,255,255,.18);border-radius:6px;font-size:12px">
        ${healOptionsHtml}
      </select>
      <small style="color:var(--muted)">
        ${healOp[0]}: <b style="color:${healCost.severity.color}">${healHp}/${healMaxHp} HP (${healCost.severity.label})</b> · ${healCost.missing > 0 ? `Custo: <b>${healCost.credits} créditos</b> e <b>${healCost.materials} materiais</b>` : "Sem ferimentos para tratar"}
      </small>
      <button type="button" id="heal-op-btn" ${(!infirmaryBuilt || healCost.missing <= 0) ? "disabled" : ""} style="padding:8px 10px;font-size:10px">
        ${!infirmaryBuilt ? "REQUER ENFERMARIA" : (healCost.missing > 0 ? `CURAR ATÉ ${healMaxHp} HP (${healCost.credits} CR / ${healCost.materials} MAT)` : "TOTALMENTE RECUPERADO")}
      </button>
    </div>
  `;

  healBox.querySelector("#heal-op-select").onchange = ev => {
    selectedHealOpIndex = Number(ev.target.value);
    renderBuildings();
  };
  healBox.querySelector("#heal-op-btn").onclick = () => {
    healOperativeOnBase(selectedHealOpIndex);
  };
  el.appendChild(healBox);
  const armoryBuilt = isArmoryBuilt();
  if (!OPERATIVES[selectedShopOpIndex]) selectedShopOpIndex = 0;
  const shopOp = OPERATIVES[selectedShopOpIndex];
  const shopGear = getOpGear(selectedShopOpIndex);
  const eqWpn = getEquippedWeaponItem(selectedShopOpIndex);
  const eqOut = getEquippedOutfitItem(selectedShopOpIndex);

  const validCats = ["weapon", "outfit", "frag", "smoke", "medkit"];
  if (!validCats.includes(selectedShopCategory)) selectedShopCategory = "weapon";

  let shopCatalog = WEAPONS_SHOP;
  if (selectedShopCategory === "outfit") shopCatalog = OUTFITS_SHOP;
  else if (selectedShopCategory === "frag" || selectedShopCategory === "smoke" || selectedShopCategory === "medkit") {
    shopCatalog = CONSUMABLES_SHOP[selectedShopCategory];
  }

  if (!shopCatalog.some(x => x.id === selectedShopItemId)) {
    selectedShopItemId = shopCatalog[1] ? shopCatalog[1].id : shopCatalog[0].id;
  }
  const chosenShopItem = shopCatalog.find(x => x.id === selectedShopItemId) || shopCatalog[0];
  const isConsumable = selectedShopCategory === "frag" || selectedShopCategory === "smoke" || selectedShopCategory === "medkit";
  const chosenEquipped = !isConsumable && (
    selectedShopCategory === "outfit"
      ? shopGear.outfitId === chosenShopItem.id
      : shopGear.weaponId === chosenShopItem.id
  );
  const chosenNeedsPay = isConsumable || !(chosenShopItem.credits === 0 && chosenShopItem.materials === 0);
  const chosenCost = getShopItemCost(chosenShopItem);

  const shopOpOptions = OPERATIVES.map((o, idx) => {
    return `<option value="${idx}" ${idx === selectedShopOpIndex ? "selected" : ""}>${o[0]} · ${o[2]}</option>`;
  }).join("");

  const shopItemOptions = shopCatalog.map(item => {
    let tag = "";
    if (!isConsumable) {
      const isEq = selectedShopCategory === "outfit" ? shopGear.outfitId === item.id : shopGear.weaponId === item.id;
      tag = isEq ? " [EQUIPADO]" : (item.credits > 0 || item.materials > 0 ? ` (${item.credits} CR / ${item.materials} MAT)` : " [BASE]");
    } else {
      tag = ` (${item.credits} CR / ${item.materials} MAT)`;
    }
    return `<option value="${item.id}" ${item.id === chosenShopItem.id ? "selected" : ""}>${item.name}${tag}</option>`;
  }).join("");

  const shopBox = document.createElement("div");
  shopBox.className = "building";
  shopBox.style.flexDirection = "column";
  shopBox.style.alignItems = "stretch";
  shopBox.style.gap = "10px";

  shopBox.innerHTML = `
    <div>
      <b>LOJA DE OBJETOS E TÁTICA — BASE MILITAR</b><br>
      <small>${armoryBuilt ? "<span style='color:var(--lime)'>Arsenal construído · Escolhe personagem, tipo e objeto</span>" : "<span style='color:#ff9e5e'>Bloqueada · Constrói o Arsenal para comprar armas, fardas, granadas e kits</span>"}</small>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.07)">
      <label style="font-size:11px;color:var(--muted)">1. Personagem:</label>
      <select id="shop-op-select" ${!armoryBuilt ? "disabled" : ""} style="width:100%;padding:9px;background:#0e161d;color:#fff;border:1px solid rgba(255,255,255,.18);border-radius:6px;font-size:12px">
        ${shopOpOptions}
      </select>
      <label style="font-size:11px;color:var(--muted)">2. Tipo de objeto:</label>
      <select id="shop-cat-select" ${!armoryBuilt ? "disabled" : ""} style="width:100%;padding:9px;background:#0e161d;color:#fff;border:1px solid rgba(255,255,255,.18);border-radius:6px;font-size:12px">
        <option value="weapon" ${selectedShopCategory === "weapon" ? "selected" : ""}>Arma</option>
        <option value="outfit" ${selectedShopCategory === "outfit" ? "selected" : ""}>Farda / Roupa</option>
        <option value="frag" ${selectedShopCategory === "frag" ? "selected" : ""}>Granadas de Fragmentação</option>
        <option value="smoke" ${selectedShopCategory === "smoke" ? "selected" : ""}>Granadas de Fumo</option>
        <option value="medkit" ${selectedShopCategory === "medkit" ? "selected" : ""}>Kits de Saúde</option>
      </select>
      <label style="font-size:11px;color:var(--muted)">3. Objeto:</label>
      <select id="shop-item-select" ${!armoryBuilt ? "disabled" : ""} style="width:100%;padding:9px;background:#0e161d;color:#fff;border:1px solid rgba(255,255,255,.18);border-radius:6px;font-size:12px">
        ${shopItemOptions}
      </select>
      <small style="color:var(--muted)">
        ${shopOp[0]} (atual: <b>${eqWpn.name}</b> · <b>${eqOut.name}</b>)<br>
        Mochila de ${shopOp[0]}: Frag <b>${shopGear.frag}</b> · Fumo <b>${shopGear.smoke}</b> · Kits Saúde <b>${shopGear.medkit}</b><br>
        Selecionado: <b>${chosenShopItem.name}</b> — ${chosenShopItem.desc}${chosenNeedsPay ? ` (${chosenCost.credits} cr / ${chosenCost.materials} mat)` : ""}
      </small>
      <button type="button" id="shop-confirm-btn" ${(!armoryBuilt || chosenEquipped) ? "disabled" : ""} style="padding:8px 10px;font-size:10px">
        ${!armoryBuilt ? "REQUER ARSENAL" : (chosenEquipped ? "JÁ EQUIPADO" : (chosenNeedsPay ? `COMPRAR (${chosenCost.credits} CR / ${chosenCost.materials} MAT)` : "EQUIPAR OBJETO BASE"))}
      </button>
    </div>
  `;

  shopBox.querySelector("#shop-op-select").onchange = ev => {
    selectedShopOpIndex = Number(ev.target.value);
    renderBuildings();
  };
  shopBox.querySelector("#shop-cat-select").onchange = ev => {
    selectedShopCategory = ev.target.value;
    let nextCat = WEAPONS_SHOP;
    if (selectedShopCategory === "outfit") nextCat = OUTFITS_SHOP;
    else if (selectedShopCategory === "frag" || selectedShopCategory === "smoke" || selectedShopCategory === "medkit") {
      nextCat = CONSUMABLES_SHOP[selectedShopCategory];
    }
    selectedShopItemId = nextCat[1] ? nextCat[1].id : nextCat[0].id;
    renderBuildings();
  };
  shopBox.querySelector("#shop-item-select").onchange = ev => {
    selectedShopItemId = ev.target.value;
    renderBuildings();
  };
  shopBox.querySelector("#shop-confirm-btn").onclick = () => {
    buyOrEquipGear(selectedShopOpIndex, selectedShopCategory, selectedShopItemId);
  };
  el.appendChild(shopBox);

  const academyBuilt = isAcademyBuilt();
  const trainCost = 220;
  if (!OPERATIVES[selectedTrainOpIndex]) selectedTrainOpIndex = 0;
  if (!STAT_NAMES[selectedTrainStatIndex]) selectedTrainStatIndex = 0;

  const currentOp = OPERATIVES[selectedTrainOpIndex];
  const currentProg = getOpProgress(selectedTrainOpIndex);
  const currentStats = getEffectiveStats(selectedTrainOpIndex);
  const chosenStatVal = currentStats[selectedTrainStatIndex];
  const ptHint = academyBuilt
    ? (currentProg.trainPts > 0
      ? `<span style="color:var(--lime)">${currentProg.trainPts} PT livre disponível (custo 0 cr)</span>`
      : `Custo: ${trainCost} cr por +1 ponto em qualquer atributo (Academia militar ativa)`)
    : `<span style="color:#ff9e5e">Bloqueado · Constrói a Academia militar para treinar atributos na base</span>`;

  const opOptionsHtml = OPERATIVES.map((o, idx) => {
    const p = getOpProgress(idx);
    const ptTag = p.trainPts > 0 ? ` [+${p.trainPts} PT]` : "";
    return `<option value="${idx}" ${idx === selectedTrainOpIndex ? "selected" : ""}>${o[0]} · ${o[2]} (NV.${p.level})${ptTag}</option>`;
  }).join("");

  const statOptionsHtml = STAT_NAMES.map((sName, sIdx) => {
    return `<option value="${sIdx}" ${sIdx === selectedTrainStatIndex ? "selected" : ""}>${sName} (${currentStats[sIdx]})</option>`;
  }).join("");

  const trainingBox = document.createElement("div");
  trainingBox.className = "building";
  trainingBox.style.flexDirection = "column";
  trainingBox.style.alignItems = "stretch";
  trainingBox.style.gap = "10px";

  trainingBox.innerHTML = `
    <div>
      <b>ACADEMIA E TREINO LIVRE — BASE MILITAR</b><br>
      <small>${ptHint}</small>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.07)">
      <label style="font-size:11px;color:var(--muted)">Personagem:</label>
      <select id="train-op-select" ${!academyBuilt ? "disabled" : ""} style="width:100%;padding:9px;background:#0e161d;color:#fff;border:1px solid rgba(255,255,255,.18);border-radius:6px;font-size:12px">
        ${opOptionsHtml}
      </select>
      <label style="font-size:11px;color:var(--muted)">Atributo a subir (+1):</label>
      <select id="train-stat-select" ${!academyBuilt ? "disabled" : ""} style="width:100%;padding:9px;background:#0e161d;color:#fff;border:1px solid rgba(255,255,255,.18);border-radius:6px;font-size:12px">
        ${statOptionsHtml}
      </select>
      <small style="color:var(--muted)">
        ${currentOp[0]} · <b>${STAT_NAMES[selectedTrainStatIndex]}</b> atual: <b>${chosenStatVal}</b>/99
      </small>
      <button type="button" id="train-confirm-btn" ${(!academyBuilt || chosenStatVal >= 99) ? "disabled" : ""} style="padding:8px 10px;font-size:10px">
        ${!academyBuilt ? "REQUER ACADEMIA MILITAR" : (chosenStatVal >= 99 ? "NO MÁXIMO (99)" : `TREINAR +1 ${STAT_NAMES[selectedTrainStatIndex].toUpperCase()} (${currentProg.trainPts > 0 ? "1 PT" : trainCost + " CR"})`)}
      </button>
    </div>
  `;

  trainingBox.querySelector("#train-op-select").onchange = ev => {
    selectedTrainOpIndex = Number(ev.target.value);
    renderBuildings();
  };
  trainingBox.querySelector("#train-stat-select").onchange = ev => {
    selectedTrainStatIndex = Number(ev.target.value);
    renderBuildings();
  };
  trainingBox.querySelector("#train-confirm-btn").onclick = () => {
    trainSelectedOperative(selectedTrainOpIndex, selectedTrainStatIndex);
  };

  el.appendChild(trainingBox);
}

function renderMissions() {
  const el = document.getElementById("mission-list");
  if (!el) return;
  el.innerHTML = "";
  MISSIONS.forEach((m, i) => {
    const done = state.completed.includes(i);
    const unlocked = i === 0 || state.completed.includes(i - 1);
    const d = document.createElement("div");
    d.className = "mission";
    d.innerHTML = `<div class="mission-main"><span class="num">0${i + 1}</span><div><b>${m.title}</b><small>${m.desc}<br>Base: ${m.rewardCredits} cr / ${m.rewardMaterials} mat · Bónus Sec.: +${m.bonusCredits} cr · XP: +${m.xpBase}</small></div></div><button ${(!unlocked || done) ? "disabled" : ""}>${done ? "CONCLUÍDA" : unlocked ? "INICIAR" : "BLOQUEADA"}</button>`;
    d.querySelector("button").onclick = () => startMission(i);
    el.appendChild(d);
  });
}

let battle = {
  units: [],
  enemies: [],
  smokes: [],
  selected: 0,
  targetEnemy: 0,
  turn: 1,
  finished: false
};

function getWeapon(opIndex) {
  const role = OPERATIVES[opIndex][2];
  const baseWpn = WEAPONS_BY_ROLE[role] || { name: "PISTOLA ZERO", mag: 15, dmg: 20, optRange: 4 };
  const shopWpn = getEquippedWeaponItem(opIndex);
  return {
    name: shopWpn.id !== "wpn_std" ? `${baseWpn.name} + ${shopWpn.name}` : baseWpn.name,
    mag: baseWpn.mag + (shopWpn.magBonus || 0),
    dmg: baseWpn.dmg + (shopWpn.dmgBonus || 0),
    optRange: baseWpn.optRange,
    hitBonus: shopWpn.hitBonus || 0
  };
}

function getCoverAt(x, y) {
  return COVERS.find(c => c.x === x && c.y === y) || null;
}

function isSmokeAt(x, y) {
  return (battle.smokes || []).some(s => s.turnsLeft > 0 && Math.abs(s.x - x) <= 1 && Math.abs(s.y - y) <= 1);
}

function isTileBlocked(x, y, ignoreUnit = null, ignoreEnemy = null) {
  if (x < 0 || y < 0 || x >= 8 || y >= 6) return true;
  if (getCoverAt(x, y)) return true;
  if (battle.units.some(u => u !== ignoreUnit && u.hp > 0 && u.x === x && u.y === y)) return true;
  if (battle.enemies.some(e => e !== ignoreEnemy && e.hp > 0 && e.x === x && e.y === y)) return true;
  return false;
}

function hasLineOfSight(x0, y0, x1, y1) {
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let cx = x0;
  let cy = y0;

  while (true) {
    if ((cx !== x0 || cy !== y0) && (cx !== x1 || cy !== y1)) {
      const cov = getCoverAt(cx, cy);
      if (cov && cov.blocksSight) return false;
    }
    if (cx === x1 && cy === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      cx += sx;
    }
    if (e2 < dx) {
      err += dx;
      cy += sy;
    }
  }
  return true;
}

function getCoverPenalty(tx, ty, ax, ay) {
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let bestPenalty = 0;
  const toAttackerX = ax - tx;
  const toAttackerY = ay - ty;

  for (const [dx, dy] of dirs) {
    const cov = getCoverAt(tx + dx, ty + dy);
    if (!cov) continue;
    const alignsX = dx !== 0 && Math.sign(toAttackerX) === dx && Math.abs(toAttackerX) >= Math.abs(toAttackerY);
    const alignsY = dy !== 0 && Math.sign(toAttackerY) === dy && Math.abs(toAttackerY) > Math.abs(toAttackerX);
    if (alignsX || alignsY) {
      const pen = cov.type === "full" ? 35 : 20;
      if (pen > bestPenalty) bestPenalty = pen;
    }
  }
  return bestPenalty;
}

function isFlanked(tx, ty, ax, ay) {
  const covPen = getCoverPenalty(tx, ty, ax, ay);
  if (covPen > 0) return false;
  return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(
    ([dx, dy]) => Boolean(getCoverAt(tx + dx, ty + dy))
  );
}

function calcHitChance(unit, enemy, isOverwatch = false) {
  if (!unit || !enemy || enemy.hp <= 0 || unit.hp <= 0) return 0;
  if (!hasLineOfSight(unit.x, unit.y, enemy.x, enemy.y)) return 0;
  const role = OPERATIVES[unit.id][2];
  const stats = getEffectiveStats(unit.id);
  const wpn = getWeapon(unit.id);
  const dist = Math.abs(unit.x - enemy.x) + Math.abs(unit.y - enemy.y);
  const base = stats[0] * 0.45 + stats[1] * 0.55 + (wpn.hitBonus || 0);
  const rangeLoss = Math.abs(dist - wpn.optRange) * 6;
  let coverLoss = getCoverPenalty(enemy.x, enemy.y, unit.x, unit.y);
  if (role === "Engenheira" && coverLoss > 0) {
    coverLoss = Math.max(0, coverLoss - 5);
  }
  const flanked = coverLoss === 0 && isFlanked(enemy.x, enemy.y, unit.x, unit.y);
  let flankBonus = flanked ? 12 : 0;
  if ((role === "Batedora" || role === "Batedor") && flanked) {
    flankBonus += 6;
  }
  let roleBonus = 0;
  if (role === "Assalto" && dist <= 4) roleBonus += 5;
  if (role === "Sniper" && dist >= 5) roleBonus += 6;
  if ((role === "Batedora" || role === "Batedor") && isOverwatch) roleBonus += 5;

  const smokeLoss = isSmokeAt(enemy.x, enemy.y) ? 20 : 0;
  const reactionLoss = isOverwatch ? 10 : 0;
  return Math.max(5, Math.min(98, Math.round(base - rangeLoss - coverLoss + flankBonus + roleBonus - smokeLoss - reactionLoss)));
}

function calcCritChance(unit, enemy, isOverwatch = false) {
  if (!unit || !enemy) return 0;
  const role = OPERATIVES[unit.id][2];
  const dist = Math.abs(unit.x - enemy.x) + Math.abs(unit.y - enemy.y);
  const flanked = isFlanked(enemy.x, enemy.y, unit.x, unit.y);
  let baseCrit = flanked ? 30 : 8;
  if (role === "Sniper" && dist >= 5) baseCrit += 5;
  return isOverwatch ? Math.max(0, baseCrit - 5) : baseCrit;
}

function applyShotDamage(attackerUnit, enemy, chance, isOverwatch, logs = null) {
  const wpn = getWeapon(attackerUnit.id);
  const roll = Math.random() * 100;
  const opName = OPERATIVES[attackerUnit.id][0];
  const prefix = isOverwatch ? "VIGILÂNCIA: " : "";

  if (roll <= chance) {
    const critChance = calcCritChance(attackerUnit, enemy, isOverwatch);
    const isCrit = Math.random() * 100 <= critChance;
    const finalDmg = isCrit ? Math.round(wpn.dmg * 1.5) : wpn.dmg;
    enemy.hp = Math.max(0, enemy.hp - finalDmg);
    const msg = `${prefix}${opName} acertou em ${enemy.name} (${chance}%)${isCrit ? " [CRÍTICO]" : ""}: -${finalDmg} HP!`;
    if (logs) logs.push(msg);
    else battleLog(msg);

    if (enemy.hp === 0) {
      const downMsg = `${enemy.name} neutralizado!`;
      if (logs) logs.push(downMsg);
      else {
        battleLog(downMsg);
        const nextAlive = battle.enemies.findIndex(e => e.hp > 0);
        if (nextAlive >= 0) battle.targetEnemy = nextAlive;
      }
    }
  } else {
    const missMsg = `${prefix}${opName} falhou contra ${enemy.name} (${chance}%).`;
    if (logs) logs.push(missMsg);
    else battleLog(missMsg);
  }
}

function canMoveTo(unit, x, y) {
  if (!unit || unit.hp <= 0 || unit.ap < 1) return false;
  if (unit.x === x && unit.y === y) return false;
  const dist = Math.abs(unit.x - x) + Math.abs(unit.y - y);
  if (dist > 2) return false;
  return !isTileBlocked(x, y, unit, null);
}

function startMission(i) {
  if (!state.selected || state.selected.length === 0) {
    logModal("EQUIPA NÃO SELECIONADA", "Vai a Operacionais e escolhe até cinco elementos antes de iniciar.");
    return;
  }
  activeCombatMode = null;
  const m = MISSIONS[i];
  battle = {
    units: state.selected.map((id, n) => {
      const wpn = getWeapon(id);
      const maxHp = getMaxHp(id);
      const gear = getOpGear(id);
      return {
        id,
        x: 1,
        y: Math.min(5, n + 1),
        hp: Math.min(maxHp, getOpHp(id)),
        maxHp,
        ap: 2,
        ammo: wpn.mag,
        maxAmmo: wpn.mag,
        frag: gear.frag || 0,
        smoke: gear.smoke || 0,
        medkit: gear.medkit || 0,
        overwatch: false,
        hunker: false
      };
    }),
    enemies: [
      { name: "SENTINELA XENO", x: 5, y: 1, hp: 65, dmg: 14, role: "flanker" },
      { name: "CAÇADOR XENO", x: 6, y: 4, hp: 75, dmg: 18, role: "skirmisher" }
    ],
    smokes: [],
    selected: 0,
    targetEnemy: 0,
    turn: 1,
    finished: false
  };
  state.mission = i;
  document.getElementById("battle-title").textContent = m.title;
  document.getElementById("turn-label").textContent = "TURNO 1";
  document.getElementById("battle-log").textContent = `Turno 1 · Secundário: ${m.secondaryLabel}. Usa mover, disparar, granadas ou kits de saúde.`;
  go("tactical");
  renderBattle();
    }
function positionBattleLogBelowGrid() {
  const grid = document.getElementById("battle-grid");
  const logEl = document.getElementById("battle-log");
  if (!grid || !logEl || !grid.parentNode) return;
  if (grid.nextElementSibling !== logEl) {
    grid.insertAdjacentElement("afterend", logEl);
  }
}

function ensureTacticalConsumableButtons() {
  const medBtn = document.getElementById("medkit");
  if (!medBtn || !medBtn.parentNode) return;

  if (!document.getElementById("frag-btn")) {
    const fragBtn = document.createElement("button");
    fragBtn.type = "button";
    fragBtn.id = "frag-btn";
    fragBtn.style.marginLeft = "6px";
    fragBtn.textContent = "FRAG (0)";
    medBtn.insertAdjacentElement("afterend", fragBtn);
  }

  if (!document.getElementById("smoke-btn")) {
    const smokeBtn = document.createElement("button");
    smokeBtn.type = "button";
    smokeBtn.id = "smoke-btn";
    smokeBtn.style.marginLeft = "6px";
    smokeBtn.textContent = "FUMO (0)";
    document.getElementById("frag-btn").insertAdjacentElement("afterend", smokeBtn);
  }

  const fragBtnEl = document.getElementById("frag-btn");
  if (fragBtnEl && !fragBtnEl.dataset.bound) {
    fragBtnEl.dataset.bound = "1";
    fragBtnEl.onclick = () => {
      if (battle.finished) return;
      const unit = battle.units[battle.selected];
      if (!unit || unit.hp <= 0 || unit.ap < 1 || (unit.frag || 0) <= 0) return;
      activeCombatMode = activeCombatMode === "frag" ? null : "frag";
      battleLog(
        activeCombatMode === "frag"
          ? "Modo FRAG ativo: clica num inimigo ou casa no mapa para lançar (área 3x3, 32 dano)."
          : "Modo FRAG cancelado."
      );
      renderBattle();
    };
  }

  const smokeBtnEl = document.getElementById("smoke-btn");
  if (smokeBtnEl && !smokeBtnEl.dataset.bound) {
    smokeBtnEl.dataset.bound = "1";
    smokeBtnEl.onclick = () => {
      if (battle.finished) return;
      const unit = battle.units[battle.selected];
      if (!unit || unit.hp <= 0 || unit.ap < 1 || (unit.smoke || 0) <= 0) return;
      activeCombatMode = activeCombatMode === "smoke" ? null : "smoke";
      battleLog(
        activeCombatMode === "smoke"
          ? "Modo FUMO ativo: clica numa casa do mapa para lançar cortina de fumo (3x3, 2 turnos)."
          : "Modo FUMO cancelado."
      );
      renderBattle();
    };
  }
}

function throwFragAt(x, y) {
  const unit = battle.units[battle.selected];
  if (!unit || unit.hp <= 0 || unit.ap < 1 || (unit.frag || 0) <= 0) return;
  if (x < 0 || y < 0 || x >= 8 || y >= 6) return;

  unit.ap = Math.max(0, unit.ap - 1);
  unit.frag = Math.max(0, unit.frag - 1);
  unit.hunker = false;
  activeCombatMode = null;

  const hitEnemies = battle.enemies.filter(
    e => e.hp > 0 && Math.abs(e.x - x) <= 1 && Math.abs(e.y - y) <= 1
  );

  if (hitEnemies.length === 0) {
    battleLog(`${OPERATIVES[unit.id][0]} lançou Granada de Fragmentação em (${x + 1},${y + 1}) sem atingir inimigos (-1 PA).`);
  } else {
    const names = [];
    hitEnemies.forEach(e => {
      e.hp = Math.max(0, e.hp - 32);
      names.push(`${e.name} (-32 HP)`);
    });
    const nextAlive = battle.enemies.findIndex(e => e.hp > 0);
    if (nextAlive >= 0) battle.targetEnemy = nextAlive;
    battleLog(`${OPERATIVES[unit.id][0]} detonou Granada de Fragmentação em (${x + 1},${y + 1}): ${names.join(", ")} (-1 PA).`);
  }

  renderBattle();
  checkWin();
}

function throwSmokeAt(x, y) {
  const unit = battle.units[battle.selected];
  if (!unit || unit.hp <= 0 || unit.ap < 1 || (unit.smoke || 0) <= 0) return;
  if (x < 0 || y < 0 || x >= 8 || y >= 6) return;

  unit.ap = Math.max(0, unit.ap - 1);
  unit.smoke = Math.max(0, unit.smoke - 1);
  unit.hunker = false;
  activeCombatMode = null;

  battle.smokes.push({ x, y, turnsLeft: 2 });
  battleLog(`${OPERATIVES[unit.id][0]} lançou Granada de Fumo em (${x + 1},${y + 1}) por 2 turnos (-1 PA).`);
  renderBattle();
}

function renderBattle() {
  positionBattleLogBelowGrid();
  ensureTacticalConsumableButtons();

  const grid = document.getElementById("battle-grid");
  grid.innerHTML = "";
  const unit = battle.units[battle.selected];

  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 8; x++) {
      const tile = document.createElement("button");
      tile.className = "tile";
      const uIdx = battle.units.findIndex(a => a.hp > 0 && a.x === x && a.y === y);
      const eIdx = battle.enemies.findIndex(a => a.hp > 0 && a.x === x && a.y === y);
      const cov = getCoverAt(x, y);
      const smoky = isSmokeAt(x, y);

      if (cov) {
        tile.classList.add("cover");
        tile.classList.add(cov.blocksSight ? "wall" : "half");
      }
      if (smoky) {
        tile.style.boxShadow = "inset 0 0 0 2px rgba(180,225,255,.55)";
      }
      if (x === 7 && y === 5) {
        tile.classList.add("exit");
        tile.textContent = "◎";
      } else if (uIdx >= 0) {
        tile.textContent = "♟";
        if (uIdx === battle.selected) tile.classList.add("selected");
        if (battle.units[uIdx].overwatch) tile.classList.add("overwatch");
        if (battle.units[uIdx].hunker) tile.classList.add("hunker");
      } else if (eIdx >= 0) {
        tile.textContent = "◆";
        tile.classList.add("enemy");
        if (eIdx === battle.targetEnemy) tile.classList.add("target");
      } else if (!activeCombatMode && canMoveTo(unit, x, y)) {
        tile.classList.add("move");
      }

      tile.onclick = () => tileAction(x, y, uIdx, eIdx);
      grid.appendChild(tile);
    }
  }

  if (unit) {
    const flags = [];
    if (unit.overwatch) flags.push("VIGILÂNCIA");
    if (unit.hunker) flags.push("HUNKER");
    if (activeCombatMode === "frag") flags.push("MODO FRAG");
    if (activeCombatMode === "smoke") flags.push("MODO FUMO");
    const statusSuffix = flags.length ? " · " + flags.join(" + ") : "";
    document.getElementById("selected-unit").textContent = OPERATIVES[unit.id][0].toUpperCase();
    document.getElementById("unit-hp").textContent = `${unit.hp}/${unit.maxHp} HP`;
    document.getElementById("unit-ap").textContent = unit.ap + " PA";
    document.getElementById("unit-ammo").textContent = `${unit.ammo}/${unit.maxAmmo} MUN · KIT:${unit.medkit || 0}${statusSuffix}`;
  }

  const enemy = battle.enemies[battle.targetEnemy];
  const fireBtn = document.getElementById("fire-btn");
  const reloadBtn = document.getElementById("reload-btn");
  const overwatchBtn = document.getElementById("overwatch-btn");
  const hunkerBtn = document.getElementById("hunker-btn");
  const medBtn = document.getElementById("medkit");
  const fragBtn = document.getElementById("frag-btn");
  const smokeBtn = document.getElementById("smoke-btn");

  if (enemy && enemy.hp > 0 && unit && unit.hp > 0) {
    const chance = calcHitChance(unit, enemy, false);
    const covPen = getCoverPenalty(enemy.x, enemy.y, unit.x, unit.y);
    const flanked = isFlanked(enemy.x, enemy.y, unit.x, unit.y);
    const smoky = isSmokeAt(enemy.x, enemy.y);
    document.getElementById("target-info").textContent = `${enemy.name} (${enemy.hp} HP)`;
    document.getElementById("hit-chance").textContent = chance > 0
      ? `CHANCE: ${chance}%${covPen ? ` (-${covPen}% COB)` : flanked ? " [FLANCO]" : ""}${smoky ? " [FUMO]" : ""}`
      : "SEM LINHA DE VISÃO";
    fireBtn.disabled = battle.finished || unit.ap < 1 || unit.ammo <= 0 || chance <= 0;
  } else {
    document.getElementById("target-info").textContent = "SEM ALVO";
    document.getElementById("hit-chance").textContent = "CHANCE: --%";
    fireBtn.disabled = true;
  }

  reloadBtn.disabled = battle.finished || !unit || unit.hp <= 0 || unit.ap < 1 || unit.ammo >= unit.maxAmmo;
  if (overwatchBtn) {
    overwatchBtn.disabled = battle.finished || !unit || unit.hp <= 0 || unit.ap < 1 || unit.ammo <= 0 || unit.overwatch;
  }
  if (hunkerBtn) {
    hunkerBtn.disabled = battle.finished || !unit || unit.hp <= 0 || unit.ap < 1 || unit.hunker;
  }
  if (medBtn) {
    const hasPack = (unit && (unit.medkit || 0) > 0);
    const role = unit ? OPERATIVES[unit.id][2] : "";
    medBtn.textContent = hasPack ? `KIT SAÚDE (${unit.medkit})` : (role === "Médico" ? "CURA CAMPO (35)" : "CURA CAMPO (25)");
    medBtn.disabled = battle.finished || !unit || unit.hp <= 0 || unit.ap < 1 || unit.hp >= unit.maxHp;
  }
  if (fragBtn) {
    const fCount = unit ? (unit.frag || 0) : 0;
    fragBtn.textContent = `FRAG (${fCount})`;
    fragBtn.disabled = battle.finished || !unit || unit.hp <= 0 || unit.ap < 1 || fCount <= 0;
  }
  if (smokeBtn) {
    const sCount = unit ? (unit.smoke || 0) : 0;
    smokeBtn.textContent = `FUMO (${sCount})`;
    smokeBtn.disabled = battle.finished || !unit || unit.hp <= 0 || unit.ap < 1 || sCount <= 0;
  }
}

function tileAction(x, y, uIdx, eIdx) {
  if (battle.finished) return;

  if (activeCombatMode === "frag") {
    throwFragAt(x, y);
    return;
  }
  if (activeCombatMode === "smoke") {
    throwSmokeAt(x, y);
    return;
  }

  if (uIdx >= 0) {
    battle.selected = uIdx;
    battleLog(`${OPERATIVES[battle.units[uIdx].id][0]} selecionado.`);
    renderBattle();
    return;
  }
  if (eIdx >= 0) {
    battle.targetEnemy = eIdx;
    renderBattle();
    return;
  }
  const unit = battle.units[battle.selected];
  if (!unit || unit.hp <= 0) return;

  if (canMoveTo(unit, x, y)) {
    unit.x = x;
    unit.y = y;
    unit.ap = Math.max(0, unit.ap - 1);
    unit.hunker = false;
    battleLog(`${OPERATIVES[unit.id][0]} moveu-se para (${x + 1},${y + 1}) (-1 PA).`);
    renderBattle();
    checkWin();
  } else {
    battleLog("Movimento indisponível: verifica os PA (-1 PA para até 2 casas) ou bloqueios.");
  }
}

function battleLog(t) {
  positionBattleLogBelowGrid();
  document.getElementById("battle-log").textContent = t;
}

document.getElementById("fire-btn").onclick = () => {
  if (battle.finished) return;
  activeCombatMode = null;
  const unit = battle.units[battle.selected];
  const enemy = battle.enemies[battle.targetEnemy];
  if (!unit || !enemy || enemy.hp <= 0 || unit.ap < 1 || unit.ammo <= 0) return;

  const chance = calcHitChance(unit, enemy, false);
  if (chance <= 0) {
    battleLog("Sem linha de visão para o alvo.");
    return;
  }

  unit.ap = Math.max(0, unit.ap - 1);
  unit.ammo = Math.max(0, unit.ammo - 1);
  unit.hunker = false;
  applyShotDamage(unit, enemy, chance, false, null);
  renderBattle();
  checkWin();
};

document.getElementById("reload-btn").onclick = () => {
  if (battle.finished) return;
  activeCombatMode = null;
  const unit = battle.units[battle.selected];
  if (!unit || unit.ap < 1 || unit.ammo >= unit.maxAmmo) return;
  unit.ap = Math.max(0, unit.ap - 1);
  unit.ammo = unit.maxAmmo;
  battleLog(`${OPERATIVES[unit.id][0]} recarregou a arma (-1 PA).`);
  renderBattle();
};

const overwatchBtnEl = document.getElementById("overwatch-btn");
if (overwatchBtnEl) {
  overwatchBtnEl.onclick = () => {
    if (battle.finished) return;
    activeCombatMode = null;
    const unit = battle.units[battle.selected];
    if (!unit || unit.hp <= 0 || unit.ap < 1 || unit.ammo <= 0 || unit.overwatch) return;
    unit.ap = Math.max(0, unit.ap - 1);
    unit.overwatch = true;
    battleLog(`${OPERATIVES[unit.id][0]} entrou em VIGILÂNCIA (-1 PA).`);
    renderBattle();
  };
}

const hunkerBtnEl = document.getElementById("hunker-btn");
if (hunkerBtnEl) {
  hunkerBtnEl.onclick = () => {
    if (battle.finished) return;
    activeCombatMode = null;
    const unit = battle.units[battle.selected];
    if (!unit || unit.hp <= 0 || unit.ap < 1 || unit.hunker) return;
    unit.ap = Math.max(0, unit.ap - 1);
    unit.hunker = true;
    battleLog(`${OPERATIVES[unit.id][0]} ativou HUNKER DOWN: defesa reforçada até ao próximo turno (-1 PA).`);
    renderBattle();
  };
}

document.getElementById("medkit").onclick = () => {
  if (battle.finished) return;
  activeCombatMode = null;
  const unit = battle.units[battle.selected];
  if (!unit || unit.ap < 1 || unit.hp >= unit.maxHp) return;
  const role = OPERATIVES[unit.id][2];
  const hasPack = (unit.medkit || 0) > 0;
  let healAmount = role === "Médico" ? 35 : 25;
  let sourceLabel = "Cura de campo";

  if (hasPack) {
    unit.medkit -= 1;
    const gear = getOpGear(unit.id);
    gear.medkit = Math.max(0, (gear.medkit || 0) - 1);
    healAmount = role === "Médico" ? 50 : 40;
    sourceLabel = "Kit de Saúde";
    save();
  }

  unit.ap = Math.max(0, unit.ap - 1);
  unit.hp = Math.min(unit.maxHp, unit.hp + healAmount);
  battleLog(`${sourceLabel} aplicado a ${OPERATIVES[unit.id][0]}: +${healAmount} HP (-1 PA).`);
  renderBattle();
};

function triggerOverwatchForEnemyMove(enemy, logs) {
  if (!enemy || enemy.hp <= 0) return;
  for (const u of battle.units) {
    if (u.hp <= 0 || !u.overwatch || u.ammo <= 0) continue;
    if (!hasLineOfSight(u.x, u.y, enemy.x, enemy.y)) continue;

    u.overwatch = false;
    u.ammo = Math.max(0, u.ammo - 1);
    const chance = calcHitChance(u, enemy, true);
    applyShotDamage(u, enemy, chance, true, logs);
    if (enemy.hp <= 0) break;
  }
}

function scoreEnemyTile(enemy, target, nx, ny) {
  const dist = Math.abs(target.x - nx) + Math.abs(target.y - ny);
  const los = hasLineOfSight(nx, ny, target.x, target.y) ? 25 : -25;
  const coverBonus = getCoverPenalty(nx, ny, target.x, target.y) * 1.1;
  let rangeScore = 0;

  if (enemy.hp <= 30) {
    rangeScore = dist >= 4 && dist <= 6 ? 20 : -dist * 2;
  } else if (enemy.role === "flanker") {
    rangeScore = dist >= 2 && dist <= 4 ? 22 : -Math.abs(dist - 3) * 5;
  } else {
    rangeScore = dist >= 3 && dist <= 5 ? 20 : -Math.abs(dist - 4) * 5;
  }

  return los + coverBonus + rangeScore;
}

function runEnemyTurn() {
  const logs = [];

  battle.enemies.forEach(e => {
    if (e.hp <= 0) return;
    const aliveUnits = battle.units.filter(u => u.hp > 0);
    if (!aliveUnits.length) return;

    aliveUnits.sort((a, b) => (Math.abs(a.x - e.x) + Math.abs(a.y - e.y)) - (Math.abs(b.x - e.x) + Math.abs(b.y - e.y)));
    const target = aliveUnits[0];

    const candidates = [{ x: e.x, y: e.y, moved: false }];
    const steps = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dx, dy] of steps) {
      const nx = e.x + dx;
      const ny = e.y + dy;
      if (!isTileBlocked(nx, ny, null, e)) {
        candidates.push({ x: nx, y: ny, moved: true });
      }
    }

    let best = candidates[0];
    let bestScore = scoreEnemyTile(e, target, best.x, best.y);
    for (const c of candidates.slice(1)) {
      const s = scoreEnemyTile(e, target, c.x, c.y);
      if (s > bestScore) {
        best = c;
        bestScore = s;
      }
    }

    if (best.moved) {
      e.x = best.x;
      e.y = best.y;
      const hasCov = getCoverPenalty(e.x, e.y, target.x, target.y) > 0;
      logs.push(`${e.name} manobrou${hasCov ? " para cobertura" : ""}.`);
      triggerOverwatchForEnemyMove(e, logs);
    }

    if (e.hp > 0 && hasLineOfSight(e.x, e.y, target.x, target.y)) {
      const targetRole = OPERATIVES[target.id][2];
      const outfit = getEquippedOutfitItem(target.id);
      const dist = Math.abs(target.x - e.x) + Math.abs(target.y - e.y);
      const targetCovPen = getCoverPenalty(target.x, target.y, e.x, e.y);
      const hunkerExtra = target.hunker ? (targetCovPen > 0 ? 35 : 25) : 0;
      const dodgeExtra = outfit.dodgeBonus || 0;
      const smokeLoss = (isSmokeAt(target.x, target.y) || isSmokeAt(e.x, e.y)) ? 30 : 0;
      const hitProb = Math.max(10, Math.min(85, 72 - Math.max(0, dist - 4) * 6 - targetCovPen - hunkerExtra - dodgeExtra - smokeLoss));
      if (Math.random() * 100 <= hitProb) {
        const roleMitigation = targetRole === "Armas pesadas" ? 2 : 0;
        const outfitMitigation = outfit.dmgRed || 0;
        const dmgTaken = Math.max(1, e.dmg - roleMitigation - outfitMitigation);
        target.hp = Math.max(0, target.hp - dmgTaken);
        logs.push(`${e.name} acertou em ${OPERATIVES[target.id][0]} (${hitProb}%): -${dmgTaken} HP${targetCovPen ? " [cobertura]" : ""}${smokeLoss ? " [fumo]" : ""}${target.hunker ? " [hunker]" : ""}.`);
      } else {
        logs.push(`${e.name} falhou contra ${OPERATIVES[target.id][0]} (${hitProb}%).`);
      }
    } else if (e.hp > 0) {
      logs.push(`${e.name} sem linha de visão para disparar.`);
    }
  });

  if (Array.isArray(battle.smokes)) {
    battle.smokes.forEach(s => {
      s.turnsLeft -= 1;
    });
    battle.smokes = battle.smokes.filter(s => s.turnsLeft > 0);
  }

  return logs;
}

function persistBattleInjuries(minDownHp = 25) {
  battle.units.forEach(u => {
    const savedHp = u.hp > 0 ? u.hp : Math.min(u.maxHp, minDownHp);
    setOpHp(u.id, savedHp);
    const gear = getOpGear(u.id);
    gear.frag = u.frag || 0;
    gear.smoke = u.smoke || 0;
    gear.medkit = u.medkit || 0;
  });
}

document.getElementById("end-turn").onclick = () => {
  if (battle.finished) return;
  activeCombatMode = null;
  const enemyLogs = runEnemyTurn();

  if (battle.units.every(u => u.hp <= 0)) {
    battle.finished = true;
    persistBattleInjuries(25);
    save();
    renderRoster();
    battleLog(enemyLogs.join(" ") + " Toda a equipa ficou inconsciente. Operação falhada.");
    renderBattle();
    logModal("OPERAÇÃO FALHADA", "Os operacionais ficaram sem condições de combate (25 HP · Ferimento Muito Grave). A regressar à base.", "command");
    return;
  }

  const nextAliveEnemy = battle.enemies.findIndex(e => e.hp > 0);
  if (nextAliveEnemy >= 0 && (!battle.enemies[battle.targetEnemy] || battle.enemies[battle.targetEnemy].hp <= 0)) {
    battle.targetEnemy = nextAliveEnemy;
  }

  battle.turn += 1;
  battle.units.forEach(u => {
    if (u.hp > 0) {
      u.ap = 2;
      u.overwatch = false;
      u.hunker = false;
    }
  });
  document.getElementById("turn-label").textContent = "TURNO " + battle.turn;
  battleLog(`${enemyLogs.join(" ")} — Turno ${battle.turn}: PA renovados.`.trim());
  renderBattle();
  checkWin();
};

function isSecondaryCompleted(m) {
  const allEnemiesDown = battle.enemies.every(e => e.hp <= 0);
  const noCasualties = battle.units.every(u => u.hp > 0);
  if (m.secondaryType === "clear_all") return allEnemiesDown;
  if (m.secondaryType === "no_casualties") return noCasualties;
  if (m.secondaryType === "fast_clear") return allEnemiesDown && battle.turn <= 6;
  return false;
}

function checkWin() {
  if (battle.finished) return;
  const reachedExit = battle.units.some(u => u.hp > 0 && u.x === 7 && u.y === 5);
  const allEnemiesDown = battle.enemies.every(e => e.hp <= 0);
  if (reachedExit || allEnemiesDown) {
    battle.finished = true;
    persistBattleInjuries(25);
    const m = MISSIONS[state.mission];
    const secDone = isSecondaryCompleted(m);
    const totalCredits = m.rewardCredits + (secDone ? m.bonusCredits : 0);
    const totalMaterials = m.rewardMaterials + (secDone ? m.bonusMaterials : 0);

    let totalLevelsGained = 0;
    const reportRows = battle.units.map(u => {
      const survivedBonus = u.hp > 0 ? 15 : 0;
      const secBonus = secDone ? 20 : 0;
      const gained = m.xpBase + survivedBonus + secBonus;
      const lvUps = grantOpXp(u.id, gained);
      const prog = getOpProgress(u.id);
      const maxHp = getMaxHp(u.id);
      const finalHp = getOpHp(u.id);
      const sev = getInjurySeverity(finalHp, maxHp);
      totalLevelsGained += lvUps;
      const hpNote = finalHp < maxHp
        ? ` · <span style="color:${sev.color}">${finalHp}/${maxHp} HP (${sev.label})</span>`
        : ` · ${maxHp} HP`;
      return `<div><b>${OPERATIVES[u.id][0]}</b>: +${gained} XP → NV.${prog.level} (${prog.xp}/100 XP)${hpNote}${lvUps ? ` · <span style="color:var(--lime)">+${lvUps * 2} PT</span>` : ""}</div>`;
    });

    battleLog(`OBJETIVO CUMPRIDO${secDone ? " + SECUNDÁRIO!" : "."} A regressar à base.`);
    if (!state.completed.includes(state.mission)) state.completed.push(state.mission);
    state.credits += totalCredits;
    state.materials += totalMaterials;
    state.alien += 1;
    save();

    setTimeout(() => {
      const secText = secDone
        ? `<br><span style="color:var(--lime)">Secundário concluído (${m.secondaryLabel}): +${m.bonusCredits} créditos e +${m.bonusMaterials} materiais extra!</span>`
        : `<br>Secundário (${m.secondaryLabel}): não concluído.`;
      const lvText = totalLevelsGained > 0
        ? `<br><span style="color:var(--lime)">Subidas de nível: +${totalLevelsGained} (pontos de treino livres adicionados!).</span>`
        : "";
      const xpReportHtml = `<div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,.1);font-size:12px">${reportRows.join("")}</div>`;
      logModal(
        "OPERAÇÃO CONCLUÍDA",
        `Recompensas: <b>${totalCredits} créditos</b>, <b>${totalMaterials} materiais</b> e <b>1 tecnologia alienígena</b>.${secText}${lvText}${xpReportHtml}<br><small style="color:var(--muted)">Fecha esta janela para regressar à base.</small>`,
        "command"
      );
      renderMissions();
      renderRoster();
    }, 250);
  }
}

document.getElementById("retreat").onclick = () => {
  if (confirm("Queres mesmo abortar esta operação?")) go("missions");
};

renderResources();
renderRoster();
document.getElementById("clock").textContent = "2089";
function ensureBarracksInitialized() {
  if (!Array.isArray(state.built)) state.built = [];
  if (!state.built.includes(0)) {
    state.built.push(0);
  }
  if (!state.barracksLevel || typeof state.barracksLevel !== "number") {
    state.barracksLevel = 1;
  }
}

function getBarracksLevel() {
  ensureBarracksInitialized();
  return Math.max(1, Math.min(3, state.barracksLevel));
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

const _baseGetMaxHp = getMaxHp;
getMaxHp = function(opIndex) {
  return _baseGetMaxHp(opIndex) + getBarracksHpBonus();
};

const _baseCalcHitChance = calcHitChance;
calcHitChance = function(unit, enemy, isOverwatch = false) {
  const raw = _baseCalcHitChance(unit, enemy, isOverwatch);
  if (raw <= 0) return 0;
  const syn = getSquadSynergyBonus();
  return Math.max(5, Math.min(98, raw + syn));
};

function toggleSquadMemberFromBarracks(opIndex) {
  if (state.selected.includes(opIndex)) {
    state.selected = state.selected.filter(x => x !== opIndex);
  } else if (state.selected.length < 5) {
    state.selected.push(opIndex);
  } else {
    logModal("LIMITE DO QUARTEL", "Só podes escalar até 5 operacionais por missão.");
    return;
  }
  save();
  renderRoster();
  renderBuildings();
}

function upgradeBarracks() {
  const upg = getBarracksUpgradeCost();
  if (!upg) return;
  if (state.credits < upg.credits || state.materials < upg.materials) {
    logModal("RECURSOS INSUFICIENTES", `Melhorar o Quartel para o Nível ${upg.nextLv} custa ${upg.credits} créditos e ${upg.materials} materiais.`);
    return;
  }
  state.credits -= upg.credits;
  state.materials -= upg.materials;
  state.barracksLevel = upg.nextLv;
  OPERATIVES.forEach((_, idx) => {
    const mHp = getMaxHp(idx);
    const cur = getOpHp(idx);
    setOpHp(idx, Math.min(mHp, cur + 10));
  });
  save();
  renderRoster();
  renderBuildings();
  logModal("QUARTEL MELHORADO", `Quartel agora no <b>Nível ${upg.nextLv}</b> (+${upg.hpBonus} HP base e descanso de +${upg.restHeal} HP entre missões).`);
}

function applyBarracksRestAfterMission() {
  const restHeal = getBarracksRestHeal();
  const restedNames = [];
  OPERATIVES.forEach((op, idx) => {
    if (state.selected.includes(idx)) return;
    const mHp = getMaxHp(idx);
    const cur = getOpHp(idx);
    if (cur < mHp) {
      const nextHp = Math.min(mHp, cur + restHeal);
      setOpHp(idx, nextHp);
      restedNames.push(`${op[0]} (+${nextHp - cur} HP)`);
    }
  });
  return restedNames;
}

const _baseCheckWin = checkWin;
checkWin = function() {
  const wasFinished = battle.finished;
  _baseCheckWin();
  if (!wasFinished && battle.finished) {
    const rested = applyBarracksRestAfterMission();
    save();
    renderRoster();
    if (rested.length > 0) {
      battleLog(`${document.getElementById("battle-log").textContent} Descanso no Quartel: ${rested.join(", ")}.`.trim());
    }
  }
};

const _baseRenderBuildings = renderBuildings;
renderBuildings = function() {
  ensureBarracksInitialized();
  _baseRenderBuildings();

  const el = document.getElementById("buildings");
  if (!el) return;

  const firstCard = el.querySelector(".building");
  if (firstCard) {
    const lv = getBarracksLevel();
    firstCard.querySelector("b").textContent = `Quartel · Nível ${lv}`;
    firstCard.querySelector("button").textContent = `NV.${lv} ATIVO`;
  }

  const lv = getBarracksLevel();
  const upg = getBarracksUpgradeCost();
  const synergy = getSquadSynergyBonus();
  const restHeal = getBarracksRestHeal();

  const rosterRows = OPERATIVES.map((op, idx) => {
    const picked = state.selected.includes(idx);
    const mHp = getMaxHp(idx);
    const hp = getOpHp(idx);
    const sev = getInjurySeverity(hp, mHp);
    const gear = getOpGear(idx);
    const bagCount = (gear.frag || 0) + (gear.smoke || 0) + (gear.medkit || 0);
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:7px 8px;background:#0b1218;border:1px solid ${picked ? "var(--lime)" : "rgba(255,255,255,.08)"};border-radius:6px">
        <div style="min-width:0;flex:1">
          <b style="font-size:12px">${op[0]}</b> <small style="color:var(--muted)">· ${op[2]}</small><br>
          <small style="color:${sev.color}">${hp}/${mHp} HP (${sev.label})</small>
          <small style="color:var(--muted)"> · Mochila: ${bagCount}</small>
        </div>
        <button type="button" data-barracks-pick="${idx}" style="padding:6px 9px;font-size:10px;white-space:nowrap">${picked ? "NA EQUIPA ✓" : "ESCALAR +"}</button>
      </div>
    `;
  }).join("");

  const barracksHub = document.createElement("div");
  barracksHub.className = "building";
  barracksHub.style.flexDirection = "column";
  barracksHub.style.alignItems = "stretch";
  barracksHub.style.gap = "10px";

  barracksHub.innerHTML = `
    <div>
      <b>GESTÃO DO QUARTEL (NV.${lv}/3) · EQUIPA ${state.selected.length}/5</b><br>
      <small style="color:var(--muted)">
        Bónus HP: <b>+${getBarracksHpBonus()} HP</b> · Camaradagem: <b>+${synergy}% precisão</b> · Descanso fora da missão: <b>+${restHeal} HP</b>
      </small>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${rosterRows}
    </div>
    <button type="button" id="upgrade-barracks-btn" ${!upg ? "disabled" : ""} style="padding:8px 10px;font-size:10px">
      ${upg ? `MELHORAR QUARTEL PARA NV.${upg.nextLv} (${upg.credits} CR / ${upg.materials} MAT)` : "QUARTEL NO NÍVEL MÁXIMO (3)"}
    </button>
  `;

  barracksHub.querySelectorAll("[data-barracks-pick]").forEach(btn => {
    btn.onclick = () => toggleSquadMemberFromBarracks(Number(btn.dataset.barracksPick));
  });

  const upgBtn = barracksHub.querySelector("#upgrade-barracks-btn");
  if (upgBtn && upg) {
    upgBtn.onclick = () => upgradeBarracks();
  }

  el.prepend(barracksHub);
};

ensureBarracksInitialized();
renderBuildings();
(function initLabUiAndResetExtension() {
  if (!state.lab || typeof state.lab !== "object") {
    state.lab = {
      weaponTier: 0,
      intelTier: 0,
      armorTier: 0
    };
  }
  if (!Array.isArray(state.lootCollected)) {
    state.lootCollected = [];
  }

  const LAB_COSTS = {
    weapon: [
      { alien: 1, credits: 350, materials: 10, dmgBonus: 5, hitBonus: 3, label: "Balística Xeno I (+5 dano, +3% precisão)" },
      { alien: 2, credits: 650, materials: 18, dmgBonus: 10, hitBonus: 6, label: "Balística Xeno II (+10 dano, +6% precisão)" }
    ],
    intel: [
      { alien: 1, credits: 300, materials: 8, enemyAimPen: 8, enemyDmgRed: 2, label: "Análise Tática I (-8% precisão e -2 dano inimigo)" },
      { alien: 2, credits: 600, materials: 16, enemyAimPen: 15, enemyDmgRed: 4, label: "Análise Tática II (-15% precisão e -4 dano inimigo)" }
    ],
    armor: [
      { alien: 1, credits: 350, materials: 12, hpBonus: 10, dmgRed: 2, label: "Blindagem Reativa I (+10 HP máx., -2 dano)" },
      { alien: 2, credits: 700, materials: 20, hpBonus: 20, dmgRed: 4, label: "Blindagem Reativa II (+20 HP máx., -4 dano)" }
    ]
  };

  const MISSION_ENEMY_SETS = [
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

  function isLabBuilt() {
    return Array.isArray(state.built) && state.built.includes(3);
  }

  function getLabWeaponBonus() {
    const t = state.lab.weaponTier || 0;
    if (t === 1) return { dmg: 5, hit: 3 };
    if (t === 2) return { dmg: 10, hit: 6 };
    return { dmg: 0, hit: 0 };
  }

  function getLabIntelDebuff() {
    const t = state.lab.intelTier || 0;
    if (t === 1) return { aimPen: 8, dmgRed: 2 };
    if (t === 2) return { aimPen: 15, dmgRed: 4 };
    return { aimPen: 0, dmgRed: 0 };
  }

  function getLabArmorBonus() {
    const t = state.lab.armorTier || 0;
    if (t === 1) return { hp: 10, dmgRed: 2 };
    if (t === 2) return { hp: 20, dmgRed: 4 };
    return { hp: 0, dmgRed: 0 };
  }

  function researchLabProject(kind) {
    if (!isLabBuilt()) {
      logModal("LABORATÓRIO EM FALTA", "Constrói primeiro o edifício <b>Laboratório</b> na base para estudar material alienígena.");
      return;
    }
    const currentTier = state.lab[kind + "Tier"] || 0;
    const project = LAB_COSTS[kind][currentTier];
    if (!project) {
      logModal("PESQUISA CONCLUÍDA", "Este projeto já atingiu o nível máximo no Laboratório.");
      return;
    }
    if (state.alien < project.alien || state.credits < project.credits || state.materials < project.materials) {
      logModal(
        "RECURSOS INSUFICIENTES",
        `Precisas de <b>${project.alien} tecnologia alienígena</b>, <b>${project.credits} créditos</b> e <b>${project.materials} materiais</b>.`
      );
      return;
    }
    state.alien -= project.alien;
    state.credits -= project.credits;
    state.materials -= project.materials;
    state.lab[kind + "Tier"] = currentTier + 1;
    if (kind === "armor") {
      OPERATIVES.forEach((_, idx) => {
        setOpHp(idx, Math.min(getMaxHp(idx), getOpHp(idx) + 10));
      });
    }
    save();
    renderRoster();
    renderBuildings();
    logModal("INVESTIGAÇÃO CONCLUÍDA", `Novo avanço ativo: <b>${project.label}</b>.`);
  }

  function resetGameProgress() {
    if (!confirm("Apagar todo o progresso guardado e recomeçar do zero?")) return;
    localStorage.removeItem("oz_save");
    location.reload();
  }

  function ensureResetButtonOnBase() {
    const baseScreen = document.getElementById("base");
    if (!baseScreen) return;
    if (document.getElementById("reset-save-btn")) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "reset-save-btn";
    btn.textContent = "RESET SAVE (TESTE)";
    btn.style.marginTop = "14px";
    btn.style.width = "100%";
    btn.style.padding = "9px 12px";
    btn.style.fontSize = "10px";
    btn.style.background = "#261215";
    btn.style.border = "1px solid #ff6b6b";
    btn.style.color = "#ffb3b3";
    btn.style.borderRadius = "6px";
    btn.onclick = resetGameProgress;

    const container = document.getElementById("buildings") || baseScreen;
    container.insertAdjacentElement("afterend", btn);
  }

  const origGetMaxHp = getMaxHp;
  getMaxHp = function(opIndex) {
    return origGetMaxHp(opIndex) + getLabArmorBonus().hp;
  };

  const origGetWeapon = getWeapon;
  getWeapon = function(opIndex) {
    const w = origGetWeapon(opIndex);
    const labBonus = getLabWeaponBonus();
    return {
      ...w,
      dmg: w.dmg + labBonus.dmg,
      hitBonus: (w.hitBonus || 0) + labBonus.hit
    };
  };

  const origStartMission = startMission;
  startMission = function(i) {
    origStartMission(i);
    const set = MISSION_ENEMY_SETS[i] || MISSION_ENEMY_SETS[0];
    battle.enemies = set.map(e => ({ ...e }));
    const samples = (MISSION_SAMPLES[i] || []).map(s => ({ ...s, collected: false }));
    battle.samples = samples;
    const intel = getLabIntelDebuff();
    const intelNote = intel.aimPen > 0
      ? ` · Info Lab: inimigos -${intel.aimPen}% precisão / -${intel.dmgRed} dano`
      : "";
    const sampleNote = samples.length > 0 ? ` · Amostras xeno no mapa: ${samples.length}` : "";
    battleLog(`${document.getElementById("battle-log").textContent}${intelNote}${sampleNote}`);
    renderBattle();
  };

  const origTileAction = tileAction;
  tileAction = function(x, y, uIdx, eIdx) {
    origTileAction(x, y, uIdx, eIdx);
    if (!Array.isArray(battle.samples) || battle.finished) return;
    for (const s of battle.samples) {
      if (!s.collected && s.x === x && s.y === y) {
        const hasUnit = battle.units.some(u => u.hp > 0 && u.x === x && u.y === y);
        if (hasUnit) {
          s.collected = true;
          state.alien = (state.alien || 0) + 1;
          save();
          battleLog(`${document.getElementById("battle-log").textContent} Amostra alienígena recolhida (+1 Tec. Alienígena)!`.trim());
          renderBattle();
        }
      }
    }
  };

  const origRenderBattle = renderBattle;
  renderBattle = function() {
    origRenderBattle();
    const grid = document.getElementById("battle-grid");
    if (!grid || !Array.isArray(battle.samples)) return;
    const tiles = grid.querySelectorAll(".tile");
    battle.samples.forEach(s => {
      if (s.collected) return;
      const idx = s.y * 8 + s.x;
      const tile = tiles[idx];
      if (!tile) return;
      const occupied = battle.units.some(u => u.hp > 0 && u.x === s.x && u.y === s.y) ||
        battle.enemies.some(e => e.hp > 0 && e.x === s.x && e.y === s.y);
      if (!occupied && !(s.x === 7 && s.y === 5)) {
        tile.textContent = "✦";
        tile.style.color = "#6ef7ff";
      }
    });
  };

  const origRunEnemyTurn = runEnemyTurn;
  runEnemyTurn = function() {
    const intel = getLabIntelDebuff();
    const prevDmg = battle.enemies.map(e => e.dmg);
    if (intel.dmgRed > 0) {
      battle.enemies.forEach(e => {
        e.dmg = Math.max(4, e.dmg - intel.dmgRed);
      });
    }
    const logs = origRunEnemyTurn();
    battle.enemies.forEach((e, idx) => {
      e.dmg = prevDmg[idx];
    });
    return logs;
  };

  const origRenderBuildings = renderBuildings;
  renderBuildings = function() {
    origRenderBuildings();
    ensureResetButtonOnBase();

    const el = document.getElementById("buildings");
    if (!el) return;

    const labBuilt = isLabBuilt();
    const wTier = state.lab.weaponTier || 0;
    const iTier = state.lab.intelTier || 0;
    const aTier = state.lab.armorTier || 0;

    const wNext = LAB_COSTS.weapon[wTier];
    const iNext = LAB_COSTS.intel[iTier];
    const aNext = LAB_COSTS.armor[aTier];

    const labCard = document.createElement("div");
    labCard.className = "building";
    labCard.style.flexDirection = "column";
    labCard.style.alignItems = "stretch";
    labCard.style.gap = "10px";

    labCard.innerHTML = `
      <div>
        <b>LABORATÓRIO XENO — PESQUISA E INFORMAÇÃO</b><br>
        <small style="color:var(--muted)">
          ${labBuilt ? "<span style='color:var(--lime)'>Laboratório ativo · Estuda amostras recolhidas em missão</span>" : "<span style='color:#ff9e5e'>Bloqueado · Constrói o Laboratório para investigar</span>"}
          · Tec. Alienígena: <b>${state.alien || 0}</b>
        </small>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.07)">
        <div>
          <small style="color:#d6e9f5"><b>Armamento (Nv.${wTier}/2):</b> ${wNext ? wNext.label : "Máximo atingido"}</small><br>
          <button type="button" id="lab-btn-weapon" ${(!labBuilt || !wNext) ? "disabled" : ""} style="margin-top:4px;padding:7px 9px;font-size:10px;width:100%">
            ${!labBuilt ? "REQUER LABORATÓRIO" : (wNext ? `PESQUISAR ARMAMENTO (${wNext.alien} XENO · ${wNext.credits} CR · ${wNext.materials} MAT)` : "ARMAMENTO NO MÁXIMO")}
          </button>
        </div>
        <div>
          <small style="color:#d6e9f5"><b>Informação Inimiga (Nv.${iTier}/2):</b> ${iNext ? iNext.label : "Máximo atingido"}</small><br>
          <button type="button" id="lab-btn-intel" ${(!labBuilt || !iNext) ? "disabled" : ""} style="margin-top:4px;padding:7px 9px;font-size:10px;width:100%">
            ${!labBuilt ? "REQUER LABORATÓRIO" : (iNext ? `DECIFRAR INIMIGOS (${iNext.alien} XENO · ${iNext.credits} CR · ${iNext.materials} MAT)` : "INFORMAÇÃO NO MÁXIMO")}
          </button>
        </div>
        <div>
          <small style="color:#d6e9f5"><b>Blindagem Adaptativa (Nv.${aTier}/2):</b> ${aNext ? aNext.label : "Máximo atingido"}</small><br>
          <button type="button" id="lab-btn-armor" ${(!labBuilt || !aNext) ? "disabled" : ""} style="margin-top:4px;padding:7px 9px;font-size:10px;width:100%">
            ${!labBuilt ? "REQUER LABORATÓRIO" : (aNext ? `DESENVOLVER BLINDAGEM (${aNext.alien} XENO · ${aNext.credits} CR · ${aNext.materials} MAT)` : "BLINDAGEM NO MÁXIMO")}
          </button>
        </div>
      </div>
    `;

    labCard.querySelector("#lab-btn-weapon").onclick = () => researchLabProject("weapon");
    labCard.querySelector("#lab-btn-intel").onclick = () => researchLabProject("intel");
    labCard.querySelector("#lab-btn-armor").onclick = () => researchLabProject("armor");

    el.appendChild(labCard);
  };

  renderBuildings();
})();
