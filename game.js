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

const BUILDINGS = [
  ["Quartel", "Aumenta a capacidade de alojamento.", 500, 10],
  ["Enfermaria", "Permite tratar ferimentos após operações.", 700, 15],
  ["Arsenal", "Melhora a preparação e equipamento.", 900, 20],
  ["Laboratório", "Investiga tecnologia recuperada.", 1200, 25],
  ["Hangar", "Desbloqueia operações de transporte.", 1500, 35],
  ["Centro de inteligência", "Melhora a informação de missão.", 1000, 20],
  ["Academia militar", "Permite treinar os operacionais.", 1100, 25],
  ["Central de energia", "Aumenta a capacidade energética.", 1300, 30]
];

const MISSIONS = [
  ["FIRST CONTACT", "Investiga o local da primeira queda. Recupera dados e alcança a extração.", "Disponível"],
  ["DEAD SIGNAL", "Localiza a equipa de reconhecimento desaparecida.", "Bloqueada"],
  ["THE BREACH", "Contém a ameaça antes que alcance a zona urbana.", "Bloqueada"]
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
  pos: 0
};

let state = load();

function load() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem("oz_save") || "{}") };
  } catch (e) {
    return { ...defaults };
  }
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
    const d = document.createElement("button");
    d.className = "operator" + (selected ? " selected" : "");
    d.innerHTML = `<span class="portrait">${o[0].split(" ").map(x => x[0]).slice(0, 2).join("")}</span><span style="min-width:0;text-align:left"><b>${o[0]}</b><small>${o[2]} · ${o[1]}</small></span><span class="pick">${selected ? "✓" : "＋"}</span>`;
    d.onclick = () => {
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
    d.oncontextmenu = ev => {
      ev.preventDefault();
      showOperator(i);
    };
    d.ondblclick = () => showOperator(i);
    el.appendChild(d);
  });
  const countEl = document.getElementById("team-count");
  if (countEl) countEl.textContent = `EQUIPA ${state.selected.length}/5`;
}

function showOperator(i) {
  const o = OPERATIVES[i];
  const names = ["Precisão", "Pontaria", "Mobilidade", "Resistência", "Perceção", "Técnica", "Furtividade", "Disciplina"];
  document.getElementById("modal-content").innerHTML = `<div class="eyebrow">${o[1]} // ${o[2]}</div><h2 style="font:800 32px var(--display);margin:0">${o[0]}</h2><p class="muted">${o[4]}</p><div class="stats">${o[3].map((v, j) => `<div class="stat">${names[j]} <b>${v}</b></div>`).join("")}</div><p class="muted">Toque prolongado ou duplo toque num operacional para consultar a ficha.</p>`;
  document.getElementById("modal").classList.remove("hidden");
}

function logModal(title, msg) {
  document.getElementById("modal-content").innerHTML = `<h2 style="font:800 28px var(--display)">${title}</h2><p class="muted">${msg}</p>`;
  document.getElementById("modal").classList.remove("hidden");
}

document.getElementById("close-modal").onclick = () => {
  document.getElementById("modal").classList.add("hidden");
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
    d.innerHTML = `<div class="mission-main"><span class="num">0${i + 1}</span><div><b>${m[0]}</b><small>${m[1]}</small></div></div><button ${(!unlocked || done) ? "disabled" : ""}>${done ? "CONCLUÍDA" : unlocked ? "INICIAR" : "BLOQUEADA"}</button>`;
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

function calcHitChance(unit, enemy) {
  if (!unit || !enemy || enemy.hp <= 0 || unit.hp <= 0) return 0;
  if (!hasLineOfSight(unit.x, unit.y, enemy.x, enemy.y)) return 0;
  const stats = OPERATIVES[unit.id][3];
  const wpn = getWeapon(unit.id);
  const dist = Math.abs(unit.x - enemy.x) + Math.abs(unit.y - enemy.y);
  const base = stats[0] * 0.45 + stats[1] * 0.55;
  const rangeLoss = Math.abs(dist - wpn.optRange) * 6;
  const coverLoss = getCoverPenalty(enemy.x, enemy.y, unit.x, unit.y);
  return Math.max(5, Math.min(95, Math.round(base - rangeLoss - coverLoss)));
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
        maxAmmo: wpn.mag
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
  document.getElementById("battle-title").textContent = MISSIONS[i][0];
  document.getElementById("turn-label").textContent = "TURNO 1";
  document.getElementById("battle-log").textContent = "Turno 1: Escolhe uma casa destacada para mover (-1 PA) ou seleciona um alvo para disparar (-1 PA).";
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
    document.getElementById("selected-unit").textContent = OPERATIVES[unit.id][0].toUpperCase();
    document.getElementById("unit-hp").textContent = unit.hp + " HP";
    document.getElementById("unit-ap").textContent = unit.ap + " PA";
    document.getElementById("unit-ammo").textContent = unit.ammo + "/" + unit.maxAmmo + " MUN";
  }

  const enemy = battle.enemies[battle.targetEnemy];
  const fireBtn = document.getElementById("fire-btn");
  const reloadBtn = document.getElementById("reload-btn");
  const medBtn = document.getElementById("medkit");

  if (enemy && enemy.hp > 0 && unit && unit.hp > 0) {
    const chance = calcHitChance(unit, enemy);
    const covPen = getCoverPenalty(enemy.x, enemy.y, unit.x, unit.y);
    document.getElementById("target-info").textContent = `${enemy.name} (${enemy.hp} HP)`;
    document.getElementById("hit-chance").textContent = chance > 0
      ? `CHANCE: ${chance}%${covPen ? ` (-${covPen}% COB)` : ""}`
      : "SEM LINHA DE VISÃO";
    fireBtn.disabled = battle.finished || unit.ap < 1 || unit.ammo <= 0 || chance <= 0;
  } else {
    document.getElementById("target-info").textContent = "SEM ALVO";
    document.getElementById("hit-chance").textContent = "CHANCE: --%";
    fireBtn.disabled = true;
  }

  reloadBtn.disabled = battle.finished || !unit || unit.hp <= 0 || unit.ap < 1 || unit.ammo >= unit.maxAmmo;
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

  const chance = calcHitChance(unit, enemy);
  if (chance <= 0) {
    battleLog("Sem linha de visão para o alvo.");
    return;
  }

  unit.ap = Math.max(0, unit.ap - 1);
  unit.ammo = Math.max(0, unit.ammo - 1);
  const wpn = getWeapon(unit.id);
  const roll = Math.random() * 100;

  if (roll <= chance) {
    enemy.hp = Math.max(0, enemy.hp - wpn.dmg);
    battleLog(`Acertou em ${enemy.name} (${chance}%) com ${wpn.name}: -${wpn.dmg} HP!`);
    if (enemy.hp === 0) {
      battleLog(`${enemy.name} neutralizado!`);
      const nextAlive = battle.enemies.findIndex(e => e.hp > 0);
      if (nextAlive >= 0) battle.targetEnemy = nextAlive;
    }
  } else {
    battleLog(`Disparo falhou contra ${enemy.name} (${chance}%).`);
  }

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

document.getElementById("medkit").onclick = () => {
  if (battle.finished) return;
  const unit = battle.units[battle.selected];
  if (!unit || unit.ap < 1 || unit.hp >= 100) return;
  unit.ap = Math.max(0, unit.ap - 1);
  unit.hp = Math.min(100, unit.hp + 25);
  battleLog(`Kit médico aplicado a ${OPERATIVES[unit.id][0]}: +25 HP (-1 PA).`);
  renderBattle();
};

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
    }

    if (hasLineOfSight(e.x, e.y, target.x, target.y)) {
      const dist = Math.abs(target.x - e.x) + Math.abs(target.y - e.y);
      const targetCovPen = getCoverPenalty(target.x, target.y, e.x, e.y);
      const hitProb = Math.max(15, Math.min(85, 72 - Math.max(0, dist - 4) * 6 - targetCovPen));
      if (Math.random() * 100 <= hitProb) {
        target.hp = Math.max(0, target.hp - e.dmg);
        logs.push(`${e.name} acertou em ${OPERATIVES[target.id][0]} (${hitProb}%): -${e.dmg} HP${targetCovPen ? " [cobertura]" : ""}.`);
      } else {
        logs.push(`${e.name} falhou contra ${OPERATIVES[target.id][0]} (${hitProb}%).`);
      }
    } else {
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
    logModal("OPERAÇÃO FALHADA", "Os operacionais ficaram sem condições de combate. Regressa às missões para tentar novamente.");
    return;
  }

  battle.turn += 1;
  battle.units.forEach(u => {
    if (u.hp > 0) u.ap = 2;
  });
  document.getElementById("turn-label").textContent = "TURNO " + battle.turn;
  battleLog(`${enemyLogs.join(" ")} — Turno ${battle.turn}: PA renovados.`.trim());
  renderBattle();
};

function checkWin() {
  const reachedExit = battle.units.some(u => u.hp > 0 && u.x === 7 && u.y === 5);
  const allEnemiesDown = battle.enemies.every(e => e.hp <= 0);
  if (reachedExit || allEnemiesDown) {
    battle.finished = true;
    battleLog("OBJETIVO CUMPRIDO. A equipa regressa à base.");
    if (!state.completed.includes(state.mission)) state.completed.push(state.mission);
    state.credits += 500;
    state.materials += 15;
    state.alien += 1;
    save();
    setTimeout(() => {
      logModal("OPERAÇÃO CONCLUÍDA", "A equipa regressou à base. Recompensa: 500 créditos, 15 materiais e 1 tecnologia alienígena.");
      renderMissions();
    }, 250);
  }
}

document.getElementById("retreat").onclick = () => {
  if (confirm("Queres mesmo abortar esta operação?")) go("missions");
};

renderResources();
renderRoster();
document.getElementById("clock").textContent = "2089";
