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

const CLASS_TRAINING_PROFILES = [
  { role: "Assalto", focusStat: 0, altStat: 2, label: "Linha de frente e mobilidade" },
  { role: "Sniper", focusStat: 1, altStat: 4, label: "Precisão de tiro e perceção" },
  { role: "Médico", focusStat: 7, altStat: 5, label: "Disciplina e suporte técnico" },
  { role: "Engenheira", focusStat: 5, altStat: 3, label: "Técnica e resistência tática" },
  { role: "Armas pesadas", focusStat: 3, altStat: 7, label: "Resistência e sangue-frio" },
  { role: "Batedora", focusStat: 6, altStat: 2, label: "Furtividade e flanqueamento" },
  { role: "Batedor", focusStat: 6, altStat: 2, label: "Furtividade e flanqueamento" }
];

const BUILDINGS = [
  ["Quartel", "Aumenta a capacidade de alojamento.", 500, 10],
  ["Enfermaria", "Permite tratar ferimentos após operações.", 700, 15],
  ["Arsenal", "Melhora a preparação e equipamento.", 900, 20],
  ["Laboratório", "Investiga tecnologia recuperada.", 1200, 25],
  ["Hangar", "Desbloqueia operações de transporte.", 1500, 35],
  ["Centro de inteligência", "Melhora a informação de missão.", 1000, 20],
  ["Academia militar", "Reduz o custo de treino e melhora a preparação das classes.", 1100, 25],
  ["Central de energia", "Aumenta a capacidade energética.", 1300, 30]
];

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
  "Médico": "Bónus discreto: kit médico recupera +35 HP em vez de +25 HP.",
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
  opProgress: {}
};

let state = load();
let pendingReturnScreen = null;

function load() {
  try {
    const parsed = { ...defaults, ...JSON.parse(localStorage.getItem("oz_save") || "{}") };
    if (!parsed.opProgress || typeof parsed.opProgress !== "object") parsed.opProgress = {};
    return parsed;
  } catch (e) {
    return { ...defaults, opProgress: {} };
  }
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
    const ptsBadge = prog.trainPts > 0 ? ` · +${prog.trainPts} PT` : "";
    const d = document.createElement("div");
    d.className = "operator" + (selected ? " selected" : "");
    d.innerHTML = `<span class="portrait">${o[0].split(" ").map(x => x[0]).slice(0, 2).join("")}</span><span style="min-width:0;flex:1;text-align:left"><b>${o[0]}</b><small>NV.${prog.level} · ${o[2]} · ${prog.xp}/100 XP${ptsBadge}</small></span><button type="button" class="op-info-btn">INFO</button><span class="pick">${selected ? "✓" : "＋"}</span>`;
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

function trainOpStat(opIndex, statIdx, fromAcademy = false) {
  const prog = getOpProgress(opIndex);
  const currentStats = getEffectiveStats(opIndex);
  if (currentStats[statIdx] >= 99) return false;

  if (prog.trainPts > 0) {
    prog.trainPts -= 1;
    prog.bonusStats[statIdx] = (prog.bonusStats[statIdx] || 0) + 1;
    save();
    return true;
  }

  const academyBuilt = state.built.includes(6);
  const cost = academyBuilt ? 140 : 220;
  if (fromAcademy && state.credits >= cost) {
    state.credits -= cost;
    prog.bonusStats[statIdx] = (prog.bonusStats[statIdx] || 0) + 1;
    save();
    return true;
  }
  return false;
}

function trainClassRole(roleName, statIdx) {
  const academyBuilt = state.built.includes(6);
  const cost = academyBuilt ? 160 : 250;
  if (state.credits < cost) {
    logModal("CRÉDITOS INSUFICIENTES", `Precisas de ${cost} créditos para treinar a classe ${roleName}.`);
    return;
  }

  const matchingIndices = OPERATIVES
    .map((o, idx) => ({ o, idx }))
    .filter(item => item.o[2] === roleName && getEffectiveStats(item.idx)[statIdx] < 99);

  if (!matchingIndices.length) {
    logModal("TREINO INDISPONÍVEL", `Nenhum operacional da classe ${roleName} pode subir ${STAT_NAMES[statIdx]}.`);
    return;
  }

  const targetItem = matchingIndices.sort((a, b) => getEffectiveStats(a.idx)[statIdx] - getEffectiveStats(b.idx)[statIdx])[0];
  const prog = getOpProgress(targetItem.idx);
  state.credits -= cost;
  prog.bonusStats[statIdx] = (prog.bonusStats[statIdx] || 0) + 1;
  save();
  renderBuildings();
  renderRoster();
  logModal("TREINO DE CLASSE CONCLUÍDO", `${targetItem.o[0]} (${roleName}) ganhou +1 em <b>${STAT_NAMES[statIdx]}</b> (${getEffectiveStats(targetItem.idx)[statIdx]}).`);
}

function showOperator(i) {
  const o = OPERATIVES[i];
  const prog = getOpProgress(i);
  const stats = getEffectiveStats(i);
  const perk = ROLE_PERKS[o[2]] || "";
  const academyBuilt = state.built.includes(6);
  const drillCost = academyBuilt ? 140 : 220;
  const canUseDrill = prog.trainPts <= 0 && state.credits >= drillCost;

  const statsHtml = stats.map((v, j) => {
    const canSpendPt = prog.trainPts > 0 && v < 99;
    const canBuyDrill = !canSpendPt && canUseDrill && v < 99;
    const btnLabel = canSpendPt ? "+1 PT" : canBuyDrill ? `+1 (${drillCost}cr)` : "";
    const btnHtml = btnLabel
      ? `<button type="button" data-train-stat="${j}" style="margin-left:6px;background:#132129;border:1px solid var(--lime);color:var(--lime);padding:2px 6px;font-size:8px">${btnLabel}</button>`
      : "";
    return `<div class="stat"><span>${STAT_NAMES[j]}</span><span><b>${v}</b>${btnHtml}</span></div>`;
  }).join("");

  const headerInfo = prog.trainPts > 0
    ? `NV.${prog.level} · ${prog.xp}/100 XP · <span style="color:var(--lime)">${prog.trainPts} PONTO(S) DE TREINO LIVRE</span>`
    : `NV.${prog.level} · ${prog.xp}/100 XP · Treino direto: ${drillCost} cr/ponto${academyBuilt ? " (Academia ativa)" : ""}`;

  document.getElementById("modal-content").innerHTML = `<div class="eyebrow">${o[1]} // ${o[2]}</div><h2 style="font:800 32px var(--display);margin:0">${o[0]}</h2><p class="muted">${o[4]}<br><span style="color:var(--lime)">${perk}</span><br><small style="color:var(--muted)">${headerInfo}</small></p><div class="stats">${statsHtml}</div>`;

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

  const academyBuilt = state.built.includes(6);
  const trainCost = academyBuilt ? 160 : 250;
  const trainingBox = document.createElement("div");
  trainingBox.className = "building";
  trainingBox.style.flexDirection = "column";
  trainingBox.style.alignItems = "stretch";
  trainingBox.style.gap = "10px";

  const uniqueRoles = [];
  CLASS_TRAINING_PROFILES.forEach(p => {
    const baseRole = p.role === "Batedor" ? "Batedora" : p.role;
    if (!uniqueRoles.includes(baseRole)) uniqueRoles.push(baseRole);
  });

  const rowsHtml = uniqueRoles.map(role => {
    const profile = CLASS_TRAINING_PROFILES.find(p => p.role === role) || CLASS_TRAINING_PROFILES[0];
    const focusName = STAT_NAMES[profile.focusStat];
    const altName = STAT_NAMES[profile.altStat];
    const opsCount = OPERATIVES.filter(o => o[2] === role || (role === "Batedora" && o[2] === "Batedor")).length;
    return `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 0;border-top:1px solid rgba(255,255,255,.07)">
      <div style="min-width:0;flex:1">
        <b>${role}</b> <small>(${opsCount} operacionais)</small><br>
        <small>${profile.label}</small>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button type="button" data-role-train="${role}" data-stat-idx="${profile.focusStat}" style="padding:7px 9px;font-size:9px">+1 ${focusName} (${trainCost}cr)</button>
        <button type="button" data-role-train="${role}" data-stat-idx="${profile.altStat}" class="secondary" style="padding:7px 9px;font-size:9px">+1 ${altName} (${trainCost}cr)</button>
      </div>
    </div>`;
  }).join("");

  trainingBox.innerHTML = `<div><b>TREINO POR CLASSE — BASE MILITAR</b><small>Treina operacionais por função (${trainCost} cr por treino${academyBuilt ? " · desconto da Academia militar ativo" : ""}).</small></div>${rowsHtml}`;
  trainingBox.querySelectorAll("[data-role-train]").forEach(btn => {
    btn.onclick = () => {
      trainClassRole(btn.dataset.roleTrain, Number(btn.dataset.statIdx));
    };
  });
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
  selected: 0,
  targetEnemy: 0,
  turn: 1,
  finished: false
};

function getWeapon(opIndex) {
  const role = OPERATIVES[opIndex][2];
  return WEAPONS_BY_ROLE[role] || { name: "PISTOLA ZERO", mag: 15, dmg: 20, optRange: 4 };
}

function getCoverAt(x, y) {
  return COVERS.find(c => c.x === x && c.y === y) || null;
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
  const base = stats[0] * 0.45 + stats[1] * 0.55;
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

  const reactionLoss = isOverwatch ? 10 : 0;
  return Math.max(5, Math.min(98, Math.round(base - rangeLoss - coverLoss + flankBonus + roleBonus - reactionLoss)));
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
  const m = MISSIONS[i];
  battle = {
    units: state.selected.map((id, n) => {
      const wpn = getWeapon(id);
      return {
        id,
        x: 1,
        y: Math.min(5, n + 1),
        hp: 100,
        ap: 2,
        ammo: wpn.mag,
        maxAmmo: wpn.mag,
        overwatch: false,
        hunker: false
      };
    }),
    enemies: [
      { name: "SENTINELA XENO", x: 5, y: 1, hp: 65, dmg: 14, role: "flanker" },
      { name: "CAÇADOR XENO", x: 6, y: 4, hp: 75, dmg: 18, role: "skirmisher" }
    ],
    selected: 0,
    targetEnemy: 0,
    turn: 1,
    finished: false
  };
  state.mission = i;
  document.getElementById("battle-title").textContent = m.title;
  document.getElementById("turn-label").textContent = "TURNO 1";
  document.getElementById("battle-log").textContent = `Turno 1 · Secundário: ${m.secondaryLabel}. Escolhe mover, disparar, vigiar ou Hunker Down (-1 PA).`;
  go("tactical");
  renderBattle();
    }
function renderBattle() {
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

      if (cov) {
        tile.classList.add("cover");
        tile.classList.add(cov.blocksSight ? "wall" : "half");
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
      } else if (canMoveTo(unit, x, y)) {
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
    const statusSuffix = flags.length ? " · " + flags.join(" + ") : "";
    document.getElementById("selected-unit").textContent = OPERATIVES[unit.id][0].toUpperCase();
    document.getElementById("unit-hp").textContent = unit.hp + " HP";
    document.getElementById("unit-ap").textContent = unit.ap + " PA";
    document.getElementById("unit-ammo").textContent = unit.ammo + "/" + unit.maxAmmo + " MUN" + statusSuffix;
  }

  const enemy = battle.enemies[battle.targetEnemy];
  const fireBtn = document.getElementById("fire-btn");
  const reloadBtn = document.getElementById("reload-btn");
  const overwatchBtn = document.getElementById("overwatch-btn");
  const hunkerBtn = document.getElementById("hunker-btn");
  const medBtn = document.getElementById("medkit");

  if (enemy && enemy.hp > 0 && unit && unit.hp > 0) {
    const chance = calcHitChance(unit, enemy, false);
    const covPen = getCoverPenalty(enemy.x, enemy.y, unit.x, unit.y);
    const flanked = isFlanked(enemy.x, enemy.y, unit.x, unit.y);
    document.getElementById("target-info").textContent = `${enemy.name} (${enemy.hp} HP)`;
    document.getElementById("hit-chance").textContent = chance > 0
      ? `CHANCE: ${chance}%${covPen ? ` (-${covPen}% COB)` : flanked ? " [FLANCO]" : ""}`
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
  medBtn.disabled = battle.finished || !unit || unit.hp <= 0 || unit.ap < 1 || unit.hp >= 100;
}

function tileAction(x, y, uIdx, eIdx) {
  if (battle.finished) return;
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
  document.getElementById("battle-log").textContent = t;
}

document.getElementById("fire-btn").onclick = () => {
  if (battle.finished) return;
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
  const unit = battle.units[battle.selected];
  if (!unit || unit.ap < 1 || unit.hp >= 100) return;
  const role = OPERATIVES[unit.id][2];
  const healAmount = role === "Médico" ? 35 : 25;
  unit.ap = Math.max(0, unit.ap - 1);
  unit.hp = Math.min(100, unit.hp + healAmount);
  battleLog(`Kit médico aplicado a ${OPERATIVES[unit.id][0]}: +${healAmount} HP (-1 PA).`);
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
      const dist = Math.abs(target.x - e.x) + Math.abs(target.y - e.y);
      const targetCovPen = getCoverPenalty(target.x, target.y, e.x, e.y);
      const hunkerExtra = target.hunker ? (targetCovPen > 0 ? 35 : 25) : 0;
      const hitProb = Math.max(10, Math.min(85, 72 - Math.max(0, dist - 4) * 6 - targetCovPen - hunkerExtra));
      if (Math.random() * 100 <= hitProb) {
        const roleMitigation = targetRole === "Armas pesadas" ? 2 : 0;
        const dmgTaken = Math.max(1, e.dmg - roleMitigation);
        target.hp = Math.max(0, target.hp - dmgTaken);
        logs.push(`${e.name} acertou em ${OPERATIVES[target.id][0]} (${hitProb}%): -${dmgTaken} HP${targetCovPen ? " [cobertura]" : ""}${target.hunker ? " [hunker]" : ""}.`);
      } else {
        logs.push(`${e.name} falhou contra ${OPERATIVES[target.id][0]} (${hitProb}%).`);
      }
    } else if (e.hp > 0) {
      logs.push(`${e.name} sem linha de visão para disparar.`);
    }
  });

  return logs;
}

document.getElementById("end-turn").onclick = () => {
  if (battle.finished) return;
  const enemyLogs = runEnemyTurn();

  if (battle.units.every(u => u.hp <= 0)) {
    battle.finished = true;
    battleLog(enemyLogs.join(" ") + " Toda a equipa ficou inconsciente. Operação falhada.");
    renderBattle();
    logModal("OPERAÇÃO FALHADA", "Os operacionais ficaram sem condições de combate. A regressar à base.", "command");
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
      totalLevelsGained += lvUps;
      return `<div><b>${OPERATIVES[u.id][0]}</b>: +${gained} XP → NV.${prog.level} (${prog.xp}/100 XP)${lvUps ? ` · <span style="color:var(--lime)">+${lvUps * 2} PT</span>` : ""}</div>`;
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
