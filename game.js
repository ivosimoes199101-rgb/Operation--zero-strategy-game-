// ============================================================================
// OPERATION ZERO — TACTICAL COMMAND SYSTEM (game.js)
// Compatível com index.html, 12 Operacionais, Base ZERO, Combate 8x6,
// Campanha de 12 Missões (4 Capítulos), Inimigos Xeno, Granadas e 4 Finais.
// ============================================================================

const STORAGE_KEY = "operation_zero_save_v1";

// ---------------------------------------------------------------------------
// 1. DADOS BASE: OPERACIONAIS, INSTALAÇÕES, ARQUÉTIPOS XENO E CAMPANHA
// ---------------------------------------------------------------------------

const INITIAL_ROSTER = [
  { id: "op-01", name: "ALEX MORGAN", codename: "VANGUARD-01", role: "Fuzileiro", level: 2, xp: 40, hp: 100, maxHp: 100, ap: 2, maxAp: 2, ammo: 12, maxAmmo: 12, aim: 78, dodge: 12, status: "PRONTO", medkits: 1, frags: 1, smokes: 1, overwatch: false, hunker: false, x: 1, y: 1 },
  { id: "op-02", name: "ELENA ROSTOVA", codename: "DEADEYE-02", role: "Atirador de Elite", level: 2, xp: 45, hp: 85, maxHp: 85, ap: 2, maxAp: 2, ammo: 6, maxAmmo: 6, aim: 88, dodge: 15, status: "PRONTO", medkits: 0, frags: 1, smokes: 1, overwatch: false, hunker: false, x: 1, y: 2 },
  { id: "op-03", name: "MARCUS VANCE", codename: "DOC-03", role: "Médico", level: 2, xp: 35, hp: 90, maxHp: 90, ap: 2, maxAp: 2, ammo: 10, maxAmmo: 10, aim: 74, dodge: 14, status: "PRONTO", medkits: 3, frags: 0, smokes: 1, overwatch: false, hunker: false, x: 1, y: 3 },
  { id: "op-04", name: "KAI TAKAHASHI", codename: "BREACH-04", role: "Demolições", level: 1, xp: 20, hp: 95, maxHp: 95, ap: 2, maxAp: 2, ammo: 8, maxAmmo: 8, aim: 72, dodge: 10, status: "PRONTO", medkits: 0, frags: 2, smokes: 1, overwatch: false, hunker: false, x: 1, y: 4 },
  { id: "op-05", name: "TORSTEN LIND", codename: "IRONCLAD-05", role: "Pesado", level: 2, xp: 50, hp: 120, maxHp: 120, ap: 2, maxAp: 2, ammo: 16, maxAmmo: 16, aim: 70, dodge: 6, status: "PRONTO", medkits: 0, frags: 1, smokes: 0, overwatch: false, hunker: false, x: 0, y: 2 },
  { id: "op-06", name: "SORAIA MENDES", codename: "GHOST-06", role: "Comando", level: 1, xp: 25, hp: 90, maxHp: 90, ap: 2, maxAp: 2, ammo: 12, maxAmmo: 12, aim: 80, dodge: 20, status: "PRONTO", medkits: 1, frags: 1, smokes: 1, overwatch: false, hunker: false, x: 0, y: 3 },
  { id: "op-07", name: "DAMIEN CROSS", codename: "VIPER-07", role: "Reconhecimento", level: 1, xp: 15, hp: 85, maxHp: 85, ap: 2, maxAp: 2, ammo: 10, maxAmmo: 10, aim: 82, dodge: 22, status: "PRONTO", medkits: 0, frags: 1, smokes: 1, overwatch: false, hunker: false, x: 2, y: 1 },
  { id: "op-08", name: "CLAIRE BEAUMONT", codename: "AEGIS-08", role: "Médico", level: 1, xp: 30, hp: 90, maxHp: 90, ap: 2, maxAp: 2, ammo: 10, maxAmmo: 10, aim: 75, dodge: 15, status: "PRONTO", medkits: 2, frags: 0, smokes: 1, overwatch: false, hunker: false, x: 2, y: 2 },
  { id: "op-09", name: "RAFAEL COSTA", codename: "SPARK-09", role: "Engenheiro", level: 1, xp: 20, hp: 95, maxHp: 95, ap: 2, maxAp: 2, ammo: 12, maxAmmo: 12, aim: 76, dodge: 12, status: "PRONTO", medkits: 1, frags: 1, smokes: 2, overwatch: false, hunker: false, x: 2, y: 3 },
  { id: "op-10", name: "NINA VOLKOVA", codename: "SPECTRE-10", role: "Atirador de Elite", level: 1, xp: 25, hp: 85, maxHp: 85, ap: 2, maxAp: 2, ammo: 6, maxAmmo: 6, aim: 86, dodge: 16, status: "PRONTO", medkits: 0, frags: 1, smokes: 1, overwatch: false, hunker: false, x: 2, y: 4 },
  { id: "op-11", name: "BRUNO ALMEIDA", codename: "TITAN-11", role: "Pesado", level: 1, xp: 15, hp: 115, maxHp: 115, ap: 2, maxAp: 2, ammo: 14, maxAmmo: 14, aim: 68, dodge: 8, status: "PRONTO", medkits: 0, frags: 1, smokes: 0, overwatch: false, hunker: false, x: 0, y: 1 },
  { id: "op-12", name: "ZOE PARK", codename: "NOVA-12", role: "Comando", level: 1, xp: 20, hp: 90, maxHp: 90, ap: 2, maxAp: 2, ammo: 12, maxAmmo: 12, aim: 79, dodge: 18, status: "PRONTO", medkits: 1, frags: 1, smokes: 1, overwatch: false, hunker: false, x: 0, y: 4 }
];

const INITIAL_BUILDINGS = [
  {
    id: "b-command",
    name: "CENTRO DE COMANDO",
    level: 1,
    maxLevel: 3,
    costCredits: 500,
    costMaterials: 20,
    energyDelta: -5,
    desc: "Coordena operações ZERO e melhora a precisão base da equipa (+4% pontaria por nível)."
  },
  {
    id: "b-barracks",
    name: "QUARTEL & ACADEMIA",
    level: 1,
    maxLevel: 3,
    costCredits: 450,
    costMaterials: 15,
    energyDelta: -5,
    desc: "Acelera o treino e fornece +10 HP máximo por nível aos operacionais."
  },
  {
    id: "b-medbay",
    name: "ENFERMARIA AVANÇADA",
    level: 1,
    maxLevel: 3,
    costCredits: 400,
    costMaterials: 15,
    energyDelta: -5,
    desc: "Recupera feridos entre missões e fornece +1 kit médico extra por nível em operação."
  },
  {
    id: "b-armory",
    name: "ARSENAL & OFICINA",
    level: 1,
    maxLevel: 3,
    costCredits: 600,
    costMaterials: 25,
    energyDelta: -10,
    desc: "Fabrica granadas de fragmentação e fumo e melhora o dano de combate (+4 dano por nível)."
  },
  {
    id: "b-lab",
    name: "LABORATÓRIO XENO",
    level: 0,
    maxLevel: 3,
    costCredits: 750,
    costMaterials: 30,
    energyDelta: -10,
    desc: "Analisa tecnologia alienígena, aumenta Investigação e gera núcleos xeno nas missões."
  }
];

const CAMPAIGN_METRICS = {
  trust: 50,      // Confiança (0-100)
  resources: 50,  // Recursos (0-100)
  research: 20,   // Investigação (0-100)
  threat: 20      // Ameaça (0-100)
};

const ENEMY_ARCHETYPES = {
  scout: {
    id: "scout",
    name: "Scout",
    role: "Batedor rápido",
    maxHp: 50,
    damage: 16,
    moveRange: 4,
    armor: 0,
    aim: 62,
    trait: "Alta mobilidade; avança rápido e pressiona a linha de frente."
  },
  stalker: {
    id: "stalker",
    name: "Stalker",
    role: "Flanqueador / emboscada",
    maxHp: 65,
    damage: 24,
    moveRange: 3,
    armor: 5,
    aim: 68,
    trait: "Causa dano extra contra alvos sem cobertura."
  },
  swarm: {
    id: "swarm",
    name: "Swarm",
    role: "Pressão em grupo",
    maxHp: 40,
    damage: 14,
    moveRange: 3,
    armor: 0,
    aim: 60,
    trait: "Ataca em enxame; ganha bónus de precisão quando há aliados perto."
  },
  psycher: {
    id: "psycher",
    name: "Psycher",
    role: "Perturbação mental",
    maxHp: 70,
    damage: 18,
    moveRange: 2,
    armor: 5,
    aim: 66,
    trait: "Perturba o alvo ao acertar (-1 PA no turno seguinte)."
  },
  brute: {
    id: "brute",
    name: "Brute",
    role: "Tanque pesado",
    maxHp: 140,
    damage: 34,
    moveRange: 2,
    armor: 20,
    aim: 65,
    trait: "Alta vida e blindagem; vulnerável a explosivos e flanqueio."
  },
  overlord: {
    id: "overlord",
    name: "Overlord Omega",
    role: "Boss Final",
    maxHp: 240,
    damage: 36,
    moveRange: 2,
    armor: 25,
    aim: 74,
    trait: "Comandante supremo da invasão com ataque potente e armadura pesada."
  }
};

const CAMPAIGN_MISSIONS = [
  {
    id: "m01_first_contact",
    chapter: "I — Primeiro Contacto",
    number: 1,
    title: "Primeiro Contacto",
    type: "Resgate / Contenção",
    objective: "Resgatar a equipa desaparecida e eliminar a patrulha inicial.",
    secondaryObjective: "Recuperar registos sem baixas no esquadrão.",
    enemies: ["scout", "swarm", "scout"],
    rewards: { credits: 350, materials: 20, alien: 1, research: 10, xp: 35 },
    choice: {
      prompt: "Encontraste sobreviventes e registos militares sob fogo cruzado.",
      optionA: {
        label: "Priorizar resgate total de sobreviventes (+Confiança)",
        effects: { trust: 12, resources: 5, threat: 3, credits: 50 }
      },
      optionB: {
        label: "Extrair rápido com os registos essenciais (+Investigação)",
        effects: { trust: -4, resources: 12, research: 10, threat: 2, materials: 10 }
      }
    }
  },
  {
    id: "m02_dead_signal",
    chapter: "I — Primeiro Contacto",
    number: 2,
    title: "Sinal Morto",
    type: "Recuperação",
    objective: "Reativar o relé de comunicações e recolher dados encriptados.",
    secondaryObjective: "Eliminar batedores antes de o alarme disparar.",
    enemies: ["scout", "stalker", "scout"],
    rewards: { credits: 400, materials: 25, alien: 1, research: 15, xp: 40 },
    choice: {
      prompt: "Os dados estão prontos para transmissão imediata ou envio encriptado.",
      optionA: {
        label: "Transmitir dados de imediato para a base (+15 Investigação, +10 Ameaça)",
        effects: { research: 15, threat: 10 }
      },
      optionB: {
        label: "Encriptar localmente e extrair em silêncio (+8 Confiança)",
        effects: { trust: 8, research: 8, threat: 3 }
      }
    }
  },
  {
    id: "m03_quarantine_zone",
    chapter: "II — Zona de Quarentena",
    number: 3,
    title: "Zona de Quarentena",
    type: "Defesa",
    objective: "Defender o perímetro urbano e neutralizar as forças invasoras.",
    secondaryObjective: "Manter civis e barricadas intactos.",
    enemies: ["scout", "stalker", "swarm", "swarm"],
    rewards: { credits: 450, materials: 30, alien: 2, research: 10, xp: 45 },
    choice: {
      prompt: "A pressão alienígena intensifica-se em dois pontos do setor urbano.",
      optionA: {
        label: "Defender ambos os setores até ao fim (+15 Confiança)",
        effects: { trust: 15, resources: -10, threat: 5 }
      },
      optionB: {
        label: "Recuar de um setor para preservar tropas (+10 Recursos)",
        effects: { trust: -8, resources: 10, threat: 10 }
      }
    }
  },
  {
    id: "m04_black_lab",
    chapter: "II — Zona de Quarentena",
    number: 4,
    title: "Laboratório Negro",
    type: "Sabotagem / Recuperação",
    objective: "Extrair amostras xeno e neutralizar os alvos na instalação.",
    secondaryObjective: "Evitar a rutura total das câmaras biológicas.",
    enemies: ["stalker", "swarm", "psycher", "scout"],
    rewards: { credits: 500, materials: 30, alien: 2, research: 20, xp: 50 },
    choice: {
      prompt: "No núcleo do laboratório, podes extrair amostras ou sabotar os reatores.",
      optionA: {
        label: "Extrair amostras para estudo avançado (+20 Investigação, +14 Ameaça)",
        effects: { research: 20, threat: 14, alien: 1 }
      },
      optionB: {
        label: "Sabotar os reatores e conter a ameaça (-8 Ameaça)",
        effects: { research: 5, threat: -8, resources: 8 }
      }
    }
  },
  {
    id: "m05_orbital_echo",
    chapter: "II — Zona de Quarentena",
    number: 5,
    title: "Eco Orbital",
    type: "Interceção / Recuperação",
    objective: "Intercetar o sinal da baliza caída e neutralizar a patrulha de contenção.",
    secondaryObjective: "Impedir a transmissão completa das coordenadas.",
    enemies: ["scout", "stalker", "psycher", "scout"],
    rewards: { credits: 520, materials: 32, alien: 2, research: 18, xp: 52 },
    choice: {
      prompt: "A baliza contém telemetria orbital valiosa mas ativa um farol de alerta.",
      optionA: {
        label: "Descarregar telemetria completa (+18 Investigação, +10 Ameaça)",
        effects: { research: 18, threat: 10, alien: 1 }
      },
      optionB: {
        label: "Cortar o sinal e recolher apenas o núcleo (+8 Confiança, -5 Ameaça)",
        effects: { trust: 8, threat: -5, resources: 8 }
      }
    }
  },
  {
    id: "m06_the_hive",
    chapter: "III — A Verdade",
    number: 6,
    title: "A Colmeia",
    type: "Sabotagem / Eliminação",
    objective: "Destruir o núcleo biológico e eliminar a guarda da colmeia.",
    secondaryObjective: "Evitar flanqueamentos e recolher amostra pura.",
    enemies: ["swarm", "psycher", "brute", "stalker"],
    rewards: { credits: 600, materials: 40, alien: 3, research: 15, xp: 55 },
    choice: {
      prompt: "Tens cargas explosivas pesadas junto ao núcleo biológico.",
      optionA: {
        label: "Detonar cargas pesadas para destruir rápido (+12 Ameaça)",
        effects: { resources: -8, threat: 12, research: 8 }
      },
      optionB: {
        label: "Avançar com precisão tática e contenção (+10 Confiança)",
        effects: { trust: 10, threat: 4, research: 12 }
      }
    }
  },
  {
    id: "m07_ghost_protocol",
    chapter: "III — A Verdade",
    number: 7,
    title: "Protocolo Fantasma",
    type: "Infiltração / Resgate",
    objective: "Resgatar o especialista ligado ao Projeto ZERO e neutralizar o setor.",
    secondaryObjective: "Aceder ao arquivo confidencial sem baixas.",
    enemies: ["stalker", "psycher", "brute", "psycher"],
    rewards: { credits: 650, materials: 40, alien: 3, research: 20, xp: 60 },
    choice: {
      prompt: "O especialista pede acesso livre aos ficheiros e proteção da unidade.",
      optionA: {
        label: "Partilhar os ficheiros e apoiar a aliança (+15 Confiança, +15 Investigação)",
        effects: { trust: 15, research: 15, threat: -4 }
      },
      optionB: {
        label: "Reter os ficheiros sob controlo estrito da ZERO (+15 Recursos)",
        effects: { resources: 15, trust: -10, research: 10 }
      }
    }
  },
  {
    id: "m08_sunken_citadel",
    chapter: "III — A Verdade",
    number: 8,
    title: "Cidadela Submersa",
    type: "Infiltração / Recuperação",
    objective: "Infiltrar a instalação subterrânea e extrair os registos do Projeto ZERO.",
    secondaryObjective: "Neutralizar as forças pesadas sem perder a rota de extração.",
    enemies: ["stalker", "psycher", "brute", "brute"],
    rewards: { credits: 700, materials: 45, alien: 3, research: 22, xp: 65 },
    choice: {
      prompt: "Nos arquivos submersos, encontras o registo original da chegada em 2089.",
      optionA: {
        label: "Tornar a verdade pública à coligação (+14 Confiança, +12 Investigação)",
        effects: { trust: 14, research: 12, threat: 4 }
      },
      optionB: {
        label: "Selar o arquivo e reforçar a defesa militar (+14 Recursos, -6 Ameaça)",
        effects: { resources: 14, threat: -6, trust: -5 }
      }
    }
  },
  {
    id: "m09_last_stand",
    chapter: "IV — Operation Zero",
    number: 9,
    title: "Última Defesa",
    type: "Defesa Crítica",
    objective: "Resistir ao assalto coordenado e eliminar os comandantes de campo.",
    secondaryObjective: "Manter os sistemas estratégicos operacionais.",
    enemies: ["brute", "psycher", "stalker", "brute"],
    rewards: { credits: 750, materials: 50, alien: 4, research: 15, xp: 70 },
    choice: {
      prompt: "As forças principais convergem para a última linha antes do assalto final.",
      optionA: {
        label: "Empenhar reservas totais para segurar a linha (+10 Confiança, -5 Ameaça)",
        effects: { trust: 10, resources: -15, threat: -5 }
      },
      optionB: {
        label: "Manter reserva estratégica para o golpe decisivo (+10 Recursos)",
        effects: { resources: 10, threat: 8 }
      }
    }
  },
  {
    id: "m10_eclipse_operation",
    chapter: "IV — Operation Zero",
    number: 10,
    title: "Operação Eclipse",
    type: "Sabotagem / Ataque",
    objective: "Cortar a rede energética das defesas inimigas e abrir passagem ao núcleo.",
    secondaryObjective: "Eliminação cirúrgica das unidades de guarda.",
    enemies: ["psycher", "brute", "stalker", "psycher"],
    rewards: { credits: 820, materials: 55, alien: 4, research: 18, xp: 75 },
    choice: {
      prompt: "Ao desligar a rede principal, podes redirecionar energia para a equipa ou desativar sensores.",
      optionA: {
        label: "Desativar sensores de alerta (-10 Ameaça, +10 Investigação)",
        effects: { threat: -10, research: 10 }
      },
      optionB: {
        label: "Sobrecarregar linhas para enfraquecer a guarda (+10 Confiança, +10 Recursos)",
        effects: { trust: 10, resources: 10, threat: 4 }
      }
    }
  },
  {
    id: "m11_vanguard_breach",
    chapter: "IV — Operation Zero",
    number: 11,
    title: "Rompimento da Vanguarda",
    type: "Assalto / Contenção",
    objective: "Romper a linha defensiva avançada antes da câmara do comando supremo.",
    secondaryObjective: "Concluir o assalto sem perder operacionais.",
    enemies: ["brute", "psycher", "stalker", "brute"],
    rewards: { credits: 900, materials: 58, alien: 4, research: 20, xp: 82 },
    choice: {
      prompt: "A vanguarda alienígena tenta recuar para reforçar o núcleo central.",
      optionA: {
        label: "Avançar sem tréguas para cortar a retirada (+12 Confiança, +6 Ameaça)",
        effects: { trust: 12, threat: 6, resources: -8 }
      },
      optionB: {
        label: "Reagrupar e reabastecer antes do assalto final (+15 Recursos, -6 Ameaça)",
        effects: { resources: 15, threat: -6 }
      }
    }
  },
  {
    id: "m12_operation_zero",
    chapter: "IV — Operation Zero",
    number: 12,
    title: "Operation Zero",
    type: "Assalto Final / Boss",
    objective: "Derrotar o Overlord Omega e a guarda de elite para decidir o destino da Terra.",
    secondaryObjective: "Manter todos os operacionais ativos até ao confronto final.",
    enemies: ["brute", "psycher", "overlord"],
    rewards: { credits: 1200, materials: 70, alien: 6, research: 25, xp: 100 },
    choice: {
      prompt: "Núcleo exposto e Overlord neutralizado: qual é a diretiva final da ZERO?",
      optionA: {
        label: "Ativar protocolo de defesa e salvar a Terra",
        finalTag: "earth_saved"
      },
      optionB: {
        label: "Abrir canal de negociação e pacto de coexistência",
        finalTag: "alien_alliance"
      },
      optionC: {
        label: "Sobrecarregar o núcleo num sacrifício total da operação",
        finalTag: "final_sacrifice"
      }
    }
  }
];

function resolveCampaignEnding(metrics, finalChoiceTag) {
  if (metrics.threat >= 85 && metrics.trust < 35) {
    return {
      id: "earth_conquered",
      title: "Terra Conquistada",
      summary: "A pressão da invasão superou as defesas e a humanidade caiu sob domínio alienígena."
    };
  }

  if (finalChoiceTag === "final_sacrifice") {
    return {
      id: "final_sacrifice",
      title: "Sacrifício Final",
      summary: "A operação ZERO pagou o preço máximo para travar a ameaça e proteger o que restava."
    };
  }

  if (finalChoiceTag === "alien_alliance" && metrics.research >= 55 && metrics.threat < 80) {
    return {
      id: "alien_alliance",
      title: "Aliança Extraterrestre",
      summary: "Com base na investigação e numa postura diplomática, abriu-se uma via de coexistência."
    };
  }

  if (finalChoiceTag === "earth_saved" && metrics.threat < 85) {
    return {
      id: "earth_saved",
      title: "Salvação da Terra",
      summary: "A unidade ZERO repeliu a invasão e garantiu a sobrevivência da Terra."
    };
  }

  if (metrics.threat >= 75) {
    return {
      id: "earth_conquered",
      title: "Terra Conquistada",
      summary: "Apesar do esforço final, o nível de ameaça acumulado inviabilizou a vitória limpa."
    };
  }

  return {
    id: "final_sacrifice",
    title: "Sacrifício Final",
    summary: "A vitória só foi possível através de um sacrifício duro e definitivo da linha de frente."
  };
}

// ---------------------------------------------------------------------------
// 2. ESTADO DO JOGO & PERSISTÊNCIA
// ---------------------------------------------------------------------------

function createDefaultState() {
  return {
    credits: 2500,
    energy: 100,
    materials: 80,
    alien: 0,
    roster: INITIAL_ROSTER.map((u) => ({ ...u })),
    selectedSquadIds: ["op-01", "op-02", "op-03", "op-04", "op-05"],
    buildings: INITIAL_BUILDINGS.map((b) => ({ ...b })),
    metrics: { ...CAMPAIGN_METRICS },
    completedMissions: [],
    currentMissionIndex: 0,
    lastEnding: null,
    battle: null
  };
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw);
    const def = createDefaultState();
    const safeIdx = typeof parsed.currentMissionIndex === "number"
      ? Math.max(0, Math.min(CAMPAIGN_MISSIONS.length - 1, parsed.currentMissionIndex))
      : 0;
    return {
      ...def,
      ...parsed,
      roster: Array.isArray(parsed.roster) && parsed.roster.length ? parsed.roster : def.roster,
      selectedSquadIds: Array.isArray(parsed.selectedSquadIds) ? parsed.selectedSquadIds : def.selectedSquadIds,
      buildings: Array.isArray(parsed.buildings) && parsed.buildings.length ? parsed.buildings : def.buildings,
      metrics: { ...def.metrics, ...(parsed.metrics || {}) },
      completedMissions: Array.isArray(parsed.completedMissions) ? parsed.completedMissions : [],
      currentMissionIndex: safeIdx
    };
  } catch (_) {
    return createDefaultState();
  }
}

function saveState() {
  try {
    const toSave = { ...state, battle: null };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (_) {}
}

// ---------------------------------------------------------------------------
// 3. NAVEGAÇÃO ENTRE ECRÃS & MODAL
// ---------------------------------------------------------------------------

function goToScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(screenId) || document.getElementById("home");
  if (target) target.classList.add("active");

  if (screenId === "command") renderCommand();
  if (screenId === "squad") renderSquad();
  if (screenId === "base") renderBase();
  if (screenId === "missions") renderCampaignMissions();
  if (screenId === "brief") renderIntelligence();
  if (screenId === "tactical" && state.battle) renderBattle();
}

function openModal(html) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");
  if (!modal || !content) return;
  content.innerHTML = html;
  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.add("hidden");
}

// ---------------------------------------------------------------------------
// 4. COMANDO, OPERACIONAIS E INSTALAÇÕES
// ---------------------------------------------------------------------------

function getBuildingLevel(id) {
  const b = state.buildings.find((item) => item.id === id);
  return b ? b.level : 0;
}

function syncUnitStatsWithBase() {
  const barracksBonusHp = getBuildingLevel("b-barracks") * 10;
  const medbayBonusKits = getBuildingLevel("b-medbay");

  state.roster.forEach((u) => {
    const baseUnit = INITIAL_ROSTER.find((r) => r.id === u.id) || u;
    const prevMaxHp = u.maxHp || baseUnit.maxHp;
    u.maxHp = baseUnit.maxHp + (u.level - 1) * 8 + barracksBonusHp;
    if (u.hp > u.maxHp) u.hp = u.maxHp;
    if (u.status === "PRONTO" && u.hp < u.maxHp && u.hp === prevMaxHp) {
      u.hp = u.maxHp;
    }
    u.maxMedkits = baseUnit.medkits + medbayBonusKits;
  });
}

function renderCommand() {
  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setText("credits", state.credits);
  setText("energy", state.energy);
  setText("materials", state.materials);
  setText("alien", state.alien);
}

function renderSquad() {
  syncUnitStatsWithBase();
  const rosterEl = document.getElementById("roster");
  const countEl = document.getElementById("team-count");
  if (countEl) countEl.textContent = `EQUIPA ${state.selectedSquadIds.length}/5`;
  if (!rosterEl) return;

  rosterEl.innerHTML = "";
  state.roster.forEach((u) => {
    const selected = state.selectedSquadIds.includes(u.id);
    const card = document.createElement("div");
    card.className = `unit-card ${selected ? "selected" : ""}`;
    card.style.cssText = `border:1px solid ${selected ? "#4ef2a1" : "rgba(255,255,255,0.14)"};padding:10px;border-radius:6px;margin-bottom:8px;cursor:pointer;`;
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <b>${u.name}</b>
        <small>${selected ? "NA EQUIPA" : "RESERVA"} · NV.${u.level}</small>
      </div>
      <div style="font-size:0.85em;opacity:0.85;margin-top:4px;">
        ${u.role} (${u.codename}) · ${u.hp}/${u.maxHp} HP · PONTARIA ${u.aim + getBuildingLevel("b-command") * 4}% · ${u.status}
      </div>
    `;

    card.addEventListener("click", () => {
      if (u.status === "FERIDO" && !selected) {
        openModal(`<h3>OPERACIONAL FERIDO</h3><p>${u.name} está em recuperação e não pode entrar na equipa ativa agora.</p><button class="primary" onclick="closeModal()">OK</button>`);
        return;
      }
      if (selected) {
        if (state.selectedSquadIds.length <= 1) return;
        state.selectedSquadIds = state.selectedSquadIds.filter((id) => id !== u.id);
      } else {
        if (state.selectedSquadIds.length >= 5) {
          openModal(`<h3>LIMITE DE EQUIPA</h3><p>Podes selecionar no máximo 5 operacionais para a missão.</p><button class="primary" onclick="closeModal()">OK</button>`);
          return;
        }
        state.selectedSquadIds.push(u.id);
      }
      saveState();
      renderSquad();
    });

    card.addEventListener("dblclick", () => {
      openModal(`
        <h3>${u.name} // ${u.codename}</h3>
        <p><b>Função:</b> ${u.role} · <b>Nível:</b> ${u.level} (${u.xp} XP)</p>
        <p><b>Vida:</b> ${u.hp}/${u.maxHp} HP · <b>Pontaria:</b> ${u.aim + getBuildingLevel("b-command") * 4}% · <b>Esquiva:</b> ${u.dodge}%</p>
        <p><b>Carga tática:</b> ${u.frags} Frag · ${u.smokes} Fumo · ${u.medkits + getBuildingLevel("b-medbay")} Kit Médico</p>
        <button class="primary" onclick="closeModal()">FECHAR</button>
      `);
    });

    rosterEl.appendChild(card);
  });
}

function renderBase() {
  const el = document.getElementById("buildings");
  if (!el) return;
  el.innerHTML = "";

  state.buildings.forEach((b) => {
    const isMax = b.level >= b.maxLevel;
    const costC = Math.round(b.costCredits * (1 + b.level * 0.5));
    const costM = Math.round(b.costMaterials * (1 + b.level * 0.5));
    const canAfford = !isMax && state.credits >= costC && state.materials >= costM && (state.energy + b.energyDelta >= 0 || b.energyDelta >= 0);

    const card = document.createElement("div");
    card.className = "building-card";
    card.style.cssText = "border:1px solid rgba(255,255,255,0.14);padding:12px;border-radius:6px;margin-bottom:10px;";
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <b>${b.name}</b>
        <small>NÍVEL ${b.level}/${b.maxLevel}</small>
      </div>
      <p style="margin:6px 0;font-size:0.88em;opacity:0.9;">${b.desc}</p>
      <div style="font-size:0.82em;opacity:0.8;margin-bottom:8px;">
        ${isMax ? "NÍVEL MÁXIMO ATINGIDO" : `Custo: ${costC} CRÉDITOS · ${costM} MATERIAIS · ENERGIA ${b.energyDelta}`}
      </div>
    `;

    const btn = document.createElement("button");
    btn.className = canAfford ? "primary" : "secondary";
    btn.disabled = !canAfford;
    btn.textContent = isMax ? "CONCLUÍDO" : b.level === 0 ? "CONSTRUIR" : "MELHORAR";
    btn.addEventListener("click", () => {
      if (!canAfford) return;
      state.credits -= costC;
      state.materials -= costM;
      state.energy += b.energyDelta;
      b.level += 1;
      if (b.id === "b-lab") state.metrics.research = Math.min(100, state.metrics.research + 8);
      if (b.id === "b-medbay") {
        state.roster.forEach((u) => {
          if (u.status === "FERIDO") {
            u.status = "PRONTO";
            u.hp = Math.max(u.hp, Math.round(u.maxHp * 0.75));
          }
        });
      }
      syncUnitStatsWithBase();
      saveState();
      renderCommand();
      renderBase();
    });

    card.appendChild(btn);
    el.appendChild(card);
  });
}

function renderIntelligence() {
  const briefSection = document.getElementById("brief");
  if (!briefSection) return;
  let metricsBox = document.getElementById("campaign-metrics-panel");
  if (!metricsBox) {
    metricsBox = document.createElement("div");
    metricsBox.id = "campaign-metrics-panel";
    metricsBox.style.cssText = "border:1px solid rgba(255,255,255,0.16);padding:12px;border-radius:6px;margin:12px 0;";
    const report = briefSection.querySelector(".report");
    if (report) report.insertAdjacentElement("afterend", metricsBox);
    else briefSection.appendChild(metricsBox);
  }

  const endingHtml = state.lastEnding
    ? `<p style="margin-top:8px;"><b>ÚLTIMO FINAL REGISTADO:</b> ${state.lastEnding.title} — ${state.lastEnding.summary}</p>`
    : "";

  metricsBox.innerHTML = `
    <div style="font-size:0.8em;letter-spacing:1px;opacity:0.75;margin-bottom:6px;">INDICADORES ESTRATÉGICOS DA CAMPANHA</div>
    <div><b>Confiança:</b> ${state.metrics.trust}/100 · <b>Recursos:</b> ${state.metrics.resources}/100 · <b>Investigação:</b> ${state.metrics.research}/100 · <b>Ameaça:</b> ${state.metrics.threat}/100</div>
    <div style="margin-top:6px;font-size:0.88em;opacity:0.9;">Missões concluídas: ${state.completedMissions.length}/${CAMPAIGN_MISSIONS.length}</div>
    ${endingHtml}
  `;
}

// ---------------------------------------------------------------------------
// 5. RENDERIZAÇÃO DAS 12 MISSÕES DA CAMPANHA
// ---------------------------------------------------------------------------

function formatMissionNumber(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

function renderCampaignMissions() {
  const listEl = document.getElementById("mission-list");
  if (!listEl) return;

  const currentMission = CAMPAIGN_MISSIONS[state.currentMissionIndex] || CAMPAIGN_MISSIONS[0];
  const sectionTag = document.querySelector("#missions .section-head .tag");
  if (sectionTag && currentMission) {
    sectionTag.textContent = `CAPÍTULO ${currentMission.chapter}`;
  }

  listEl.innerHTML = "";

  CAMPAIGN_MISSIONS.forEach((m, idx) => {
    const isCompleted = state.completedMissions.includes(m.id);
    const isUnlocked = idx <= state.currentMissionIndex || isCompleted;

    const card = document.createElement("div");
    card.className = "mission-card";
    card.style.cssText = `border:1px solid ${isUnlocked ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"};padding:12px;margin-bottom:10px;border-radius:6px;opacity:${isUnlocked ? "1" : "0.55"};`;

    const enemyNames = m.enemies
      .map((eid) => (ENEMY_ARCHETYPES[eid] ? ENEMY_ARCHETYPES[eid].name : eid))
      .join(", ");

    const statusBadge = isCompleted ? "CONCLUÍDA" : isUnlocked ? "DISPONÍVEL" : "BLOQUEADA";
    const numLabel = formatMissionNumber(m.number);

    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">
        <b>${numLabel}. ${m.title.toUpperCase()}</b>
        <small>${m.chapter} · ${statusBadge}</small>
      </div>
      <div style="margin:6px 0;font-size:0.9em;">${m.objective}</div>
      <div style="font-size:0.82em;opacity:0.85;">
        Tipo: ${m.type} · Ameaças: ${enemyNames} · Recompensa: +${m.rewards.credits} CR / +${m.rewards.materials} MAT
      </div>
    `;

    const btn = document.createElement("button");
    btn.className = isUnlocked ? "primary" : "secondary";
    btn.disabled = !isUnlocked;
    btn.textContent = isUnlocked ? (isCompleted ? "REJOGAR MISSÃO" : "INICIAR MISSÃO") : "BLOQUEADA";
    btn.style.marginTop = "8px";

    btn.addEventListener("click", () => {
      if (!isUnlocked) return;
      startMission(m, idx);
    });

    card.appendChild(btn);
    listEl.appendChild(card);
  });
}

// ---------------------------------------------------------------------------
// 6. COMBATE TÁTICO (GRELHA 8x6, COBERTURA, GRANADAS, IA XENO E FINAIS)
// ---------------------------------------------------------------------------

const GRID_W = 8;
const GRID_H = 6;

// Tipos de tile: 0 = chão normal, 1 = meia cobertura, 2 = cobertura pesada, 3 = bloqueio total
function createMissionMap(missionIndex) {
  const grid = Array.from({ length: GRID_H }, () => Array(GRID_W).fill(0));

  grid[1][3] = 1;
  grid[2][3] = 2;
  grid[3][3] = 1;
  grid[4][3] = 2;

  grid[1][5] = 2;
  grid[2][5] = 1;
  grid[3][5] = 1;
  grid[4][5] = 2;

  if (missionIndex >= 2) {
    grid[0][4] = 3;
    grid[5][4] = 3;
  }
  if (missionIndex >= 5) {
    grid[2][4] = 2;
    grid[3][4] = 2;
  }
  if (missionIndex >= 8) {
    grid[1][4] = 1;
    grid[4][4] = 1;
  }

  return grid;
}

function getTileCoverAt(battle, x, y) {
  if (!battle || !battle.grid) return 0;
  let best = 0;
  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1]
  ];
  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < GRID_W && ny >= 0 && ny < GRID_H) {
      const t = battle.grid[ny][nx];
      if (t === 2 && best < 2) best = 2;
      else if (t === 1 && best < 1) best = 1;
    }
  }
  return best;
}

function startMission(mission, missionIndex = 0) {
  syncUnitStatsWithBase();

  let activeSquad = state.roster.filter((u) => state.selectedSquadIds.includes(u.id) && u.status !== "FERIDO");
  if (!activeSquad.length) {
    activeSquad = state.roster.slice(0, 4).map((u) => ({ ...u, status: "PRONTO", hp: u.maxHp }));
    state.selectedSquadIds = activeSquad.map((u) => u.id);
  }

  const medbayBonusKits = getBuildingLevel("b-medbay");
  const startPositions = [
    [0, 1], [0, 2], [0, 3], [0, 4], [1, 2]
  ];

  const units = activeSquad.map((u, idx) => {
    const pos = startPositions[idx] || [0, idx % GRID_H];
    return {
      ...u,
      side: "player",
      x: pos[0],
      y: pos[1],
      hp: u.hp > 0 ? u.hp : u.maxHp,
      ap: u.maxAp,
      ammo: u.maxAmmo,
      frags: u.frags ?? 1,
      smokes: u.smokes ?? 1,
      medkits: (u.medkits ?? 1) + medbayBonusKits,
      overwatch: false,
      hunker: false,
      stunned: false
    };
  });

  const enemyPositions = [
    [6, 1], [7, 2], [6, 3], [7, 4], [6, 2], [7, 3]
  ];

  const enemies = mission.enemies.map((archId, idx) => {
    const arch = ENEMY_ARCHETYPES[archId] || ENEMY_ARCHETYPES.scout;
    const pos = enemyPositions[idx] || [7, idx % GRID_H];
    const scaleFactor = 1 + missionIndex * 0.05;
    const maxHp = Math.round(arch.maxHp * scaleFactor);
    return {
      id: `en-${mission.id}-${idx}`,
      name: `${arch.name.toUpperCase()} ${idx + 1}`,
      archetypeId: arch.id,
      role: arch.role,
      side: "enemy",
      x: pos[0],
      y: pos[1],
      hp: maxHp,
      maxHp,
      damage: Math.round(arch.damage * (1 + missionIndex * 0.035)),
      armor: arch.armor,
      aim: arch.aim,
      moveRange: arch.moveRange,
      ap: 2,
      maxAp: 2,
      overwatch: false,
      hunker: false,
      stunned: false
    };
  });

  state.battle = {
    mission,
    missionIndex,
    turn: 1,
    phase: "player",
    mode: "normal",
    grid: createMissionMap(missionIndex),
    smokes: [],
    units,
    enemies,
    selectedUnitId: null,
    selectedTargetId: enemies[0] ? enemies[0].id : null,
    log: `Missão ${formatMissionNumber(mission.number)}: ${mission.title} — Clica num operacional para ver as ordens.`
  };

  goToScreen("tactical");
  renderBattle();
}

function getSelectedUnit() {
  if (!state.battle) return null;
  return state.battle.units.find((u) => u.id === state.battle.selectedUnitId && u.hp > 0) || null;
}

function getSelectedEnemy() {
  if (!state.battle) return null;
  return state.battle.enemies.find((e) => e.id === state.battle.selectedTargetId && e.hp > 0) || null;
}

function isInSmoke(battle, x, y) {
  return (battle.smokes || []).some((s) => s.x === x && s.y === y && s.turns > 0);
}

function estimateUnitDamage(unit, target) {
  if (!unit) return 0;
  const armoryBonus = getBuildingLevel("b-armory") * 4;
  const baseDmg = unit.role === "Atirador de Elite" ? 42 : unit.role === "Pesado" ? 36 : 28;
  const rawDmg = baseDmg + armoryBonus;
  const armorMitigation = target ? Math.floor((target.armor || 0) * 0.45) : 0;
  return Math.max(8, rawDmg - armorMitigation);
}

function calculateHitChance(unit, target, battle) {
  if (!unit || !target) return 0;
  const dist = Math.abs(unit.x - target.x) + Math.abs(unit.y - target.y);
  const cmdBonus = getBuildingLevel("b-command") * 4;
  let chance = (unit.aim || 75) + cmdBonus - dist * 3;

  const cover = getTileCoverAt(battle, target.x, target.y);
  if (!unit.hunker) {
    if (cover === 1) chance -= target.hunker ? 40 : 25;
    if (cover === 2) chance -= target.hunker ? 55 : 40;
  }

  if (isInSmoke(battle, target.x, target.y)) chance -= 25;
  if (isInSmoke(battle, unit.x, unit.y)) chance -= 15;
  if (unit.stunned) chance -= 15;

  return Math.max(10, Math.min(98, Math.round(chance)));
}

function addBattleLog(msg) {
  if (!state.battle) return;
  state.battle.log = msg;
  const logEl = document.getElementById("battle-log");
  if (logEl) logEl.textContent = msg;
}

function ensureTacticalExtras() {
  const tactical = document.getElementById("tactical");
  if (!tactical) return;

  // Mover #battle-log para logo abaixo do campo de batalha (#battle-grid)
  const gridEl = document.getElementById("battle-grid");
  const logEl = document.getElementById("battle-log");
  if (gridEl && logEl && logEl.previousElementSibling !== gridEl) {
    logEl.style.marginTop = "8px";
    gridEl.insertAdjacentElement("afterend", logEl);
  }

  let extraBar = document.getElementById("tactical-grenade-bar");
  if (!extraBar) {
    const ordersPanel = tactical.querySelector(".battle-side .side-panel:nth-of-type(3)");
    if (ordersPanel) {
      extraBar = document.createElement("div");
      extraBar.id = "tactical-grenade-bar";
      extraBar.style.cssText = "display:flex;gap:6px;margin-top:6px;flex-wrap:wrap;";
      extraBar.innerHTML = `
        <button id="frag-btn" class="secondary" style="flex:1;font-size:0.8em;">GRANADA FRAG (1 PA)</button>
        <button id="smoke-btn" class="secondary" style="flex:1;font-size:0.8em;">GRANADA FUMO (1 PA)</button>
      `;
      ordersPanel.insertBefore(extraBar, document.getElementById("end-turn"));

      document.getElementById("frag-btn").addEventListener("click", () => {
        if (!state.battle || state.battle.phase !== "player") return;
        const u = getSelectedUnit();
        if (!u || u.ap < 1 || u.frags <= 0) {
          addBattleLog("Sem PA ou sem granadas de fragmentação disponíveis.");
          return;
        }
        state.battle.mode = state.battle.mode === "frag" ? "normal" : "frag";
        addBattleLog(state.battle.mode === "frag" ? "Modo GRANADA FRAG ativo: clica numa célula do mapa." : "Modo normal restaurado.");
        renderBattle();
      });

      document.getElementById("smoke-btn").addEventListener("click", () => {
        if (!state.battle || state.battle.phase !== "player") return;
        const u = getSelectedUnit();
        if (!u || u.ap < 1 || u.smokes <= 0) {
          addBattleLog("Sem PA ou sem granadas de fumo disponíveis.");
          return;
        }
        state.battle.mode = state.battle.mode === "smoke" ? "normal" : "smoke";
        addBattleLog(state.battle.mode === "smoke" ? "Modo GRANADA FUMO ativo: clica numa célula do mapa." : "Modo normal restaurado.");
        renderBattle();
      });
    }
  }
}

function renderFloatingUnitOrders(battle, selUnit, gridEl) {
  let pop = document.getElementById("floating-unit-orders");
  if (!pop) {
    pop = document.createElement("div");
    pop.id = "floating-unit-orders";
    pop.style.cssText = `
      position:absolute;
      z-index:25;
      background:rgba(12,18,26,0.96);
      border:1px solid #4ef2a1;
      border-radius:8px;
      padding:6px 8px;
      box-shadow:0 8px 24px rgba(0,0,0,0.55);
      display:none;
      min-width:210px;
      max-width:320px;
    `;
    const parent = gridEl && gridEl.parentElement ? gridEl.parentElement : document.getElementById("tactical");
    if (parent) {
      if (getComputedStyle(parent).position === "static") {
        parent.style.position = "relative";
      }
      parent.appendChild(pop);
    }
  }

  if (!battle || battle.phase !== "player" || !selUnit || !gridEl) {
    pop.style.display = "none";
    return;
  }

  const cellIndex = selUnit.y * GRID_W + selUnit.x;
  const cellEl = gridEl.children[cellIndex];
  const parent = pop.parentElement;
  if (!cellEl || !parent) {
    pop.style.display = "none";
    return;
  }

  const parentRect = parent.getBoundingClientRect();
  const cellRect = cellEl.getBoundingClientRect();

  pop.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:5px;font-size:0.75em;color:#4ef2a1;">
      <b>${selUnit.name} · ${selUnit.ap} PA</b>
      <button type="button" id="close-floating-orders" style="background:none;border:none;color:#fff;cursor:pointer;font-size:1em;padding:0 2px;">✕</button>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;">
      <button type="button" data-float-act="fire" class="primary" style="font-size:0.72em;padding:4px 7px;">${
        battle.selectedTargetId
          ? (() => {
              const t = battle.enemies.find((e) => e.id === battle.selectedTargetId && e.hp > 0);
              return t ? `DISPARAR (${calculateHitChance(selUnit, t, battle)}% · ~${estimateUnitDamage(selUnit, t)}D)` : "DISPARAR";
            })()
          : "DISPARAR"
      }</button>
      <button type="button" data-float-act="frag" class="secondary" style="font-size:0.72em;padding:4px 7px;">FRAG (${selUnit.frags})</button>
      <button type="button" data-float-act="smoke" class="secondary" style="font-size:0.72em;padding:4px 7px;">FUMO (${selUnit.smokes})</button>
      <button type="button" data-float-act="overwatch" class="secondary" style="font-size:0.72em;padding:4px 7px;">VIGILÂNCIA</button>
      <button type="button" data-float-act="hunker" class="secondary" style="font-size:0.72em;padding:4px 7px;">HUNKER</button>
      <button type="button" data-float-act="reload" class="secondary" style="font-size:0.72em;padding:4px 7px;">RECARREGAR</button>
      <button type="button" data-float-act="medkit" class="secondary" style="font-size:0.72em;padding:4px 7px;">CURAR (${selUnit.medkits})</button>
    </div>
  `;

  pop.style.display = "block";
  pop.style.left = "0px";
  pop.style.top = "0px";
  const popRect = pop.getBoundingClientRect();

  const centerX = cellRect.left - parentRect.left + cellRect.width / 2;
  let left = centerX - popRect.width / 2;
  left = Math.max(6, Math.min(parentRect.width - popRect.width - 6, left));

  let top = cellRect.top - parentRect.top - popRect.height - 6;
  if (top < 6) {
    top = cellRect.bottom - parentRect.top + 6;
  }

  pop.style.left = `${Math.round(left)}px`;
  pop.style.top = `${Math.round(top)}px`;

  const closeBtn = pop.querySelector("#close-floating-orders");
  if (closeBtn) {
    closeBtn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      battle.selectedUnitId = null;
      renderBattle();
    });
  }

  pop.querySelectorAll("[data-float-act]").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const act = btn.getAttribute("data-float-act");
      if (act === "fire") fireAtTarget();
      else if (act === "frag") {
        if (selUnit.ap < 1 || selUnit.frags <= 0) {
          addBattleLog("Sem PA ou sem granadas de fragmentação disponíveis.");
          return;
        }
        battle.mode = battle.mode === "frag" ? "normal" : "frag";
        addBattleLog(battle.mode === "frag" ? "Modo GRANADA FRAG ativo: clica numa célula do mapa." : "Modo normal restaurado.");
        renderBattle();
      } else if (act === "smoke") {
        if (selUnit.ap < 1 || selUnit.smokes <= 0) {
          addBattleLog("Sem PA ou sem granadas de fumo disponíveis.");
          return;
        }
        battle.mode = battle.mode === "smoke" ? "normal" : "smoke";
        addBattleLog(battle.mode === "smoke" ? "Modo GRANADA FUMO ativo: clica numa célula do mapa." : "Modo normal restaurado.");
        renderBattle();
      } else if (act === "overwatch") overwatchSelectedUnit();
      else if (act === "hunker") hunkerSelectedUnit();
      else if (act === "reload") reloadSelectedUnit();
      else if (act === "medkit") useMedkitSelectedUnit();
    });
  });
}

function ensureEndTurnVisible(battle) {
  const endTurnBtn = document.getElementById("end-turn");
  const battleSide = document.querySelector("#tactical .battle-side");
  if (!endTurnBtn || !battleSide) return;

  if (endTurnBtn.parentElement !== battleSide) {
    endTurnBtn.style.marginTop = "8px";
    battleSide.appendChild(endTurnBtn);
  }

  const isPlayerTurn = Boolean(battle && battle.phase === "player");
  endTurnBtn.style.display = "";
  endTurnBtn.disabled = !isPlayerTurn;
}

function renderBattle() {
  const b = state.battle;
  if (!b) return;
  ensureTacticalExtras();

  const titleEl = document.getElementById("battle-title");
  if (titleEl) titleEl.textContent = `${formatMissionNumber(b.mission.number)}. ${b.mission.title.toUpperCase()}`;

  const infoSpan = document.querySelector("#tactical .battle-info span:first-child");
  if (infoSpan) infoSpan.textContent = `OBJETIVO: ${b.mission.objective.toUpperCase()}`;

  const turnLabel = document.getElementById("turn-label");
  if (turnLabel) turnLabel.textContent = `TURNO ${b.turn} · ${b.phase === "player" ? "UNIDADE ZERO" : "ALIENÍGENAS"}`;

  const gridEl = document.getElementById("battle-grid");
  if (gridEl) {
    gridEl.style.display = "grid";
    gridEl.style.gridTemplateColumns = `repeat(${GRID_W}, minmax(36px, 1fr))`;
    gridEl.style.gap = "4px";
    gridEl.innerHTML = "";

    const selUnit = getSelectedUnit();

    for (let y = 0; y < GRID_H; y++) {
      for (let x = 0; x < GRID_W; x++) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "grid-cell";

        const tileType = b.grid[y][x];
        const unitHere = b.units.find((u) => u.x === x && u.y === y && u.hp > 0);
        const enemyHere = b.enemies.find((e) => e.x === x && e.y === y && e.hp > 0);
        const smokeHere = isInSmoke(b, x, y);

        const distFromSel = selUnit ? Math.abs(selUnit.x - x) + Math.abs(selUnit.y - y) : 99;
        const canMoveHere =
          b.phase === "player" &&
          b.mode === "normal" &&
          selUnit &&
          selUnit.ap >= 1 &&
          !unitHere &&
          !enemyHere &&
          tileType !== 3 &&
          distFromSel > 0 &&
          distFromSel <= (selUnit.stunned ? 2 : 3);

        let bg = "rgba(255,255,255,0.05)";
        let border = "rgba(255,255,255,0.14)";
        let label = "";

        if (tileType === 3) {
          bg = "rgba(30,35,42,0.9)";
          label = "■";
        } else if (tileType === 2) {
          bg = "rgba(90,120,160,0.25)";
          label = "▲";
        } else if (tileType === 1) {
          bg = "rgba(140,130,70,0.22)";
          label = "▪";
        }

        if (smokeHere) {
          bg = "rgba(180,200,220,0.28)";
        }

        const cellCover = (!unitHere && !enemyHere && tileType !== 3) ? getTileCoverAt(b, x, y) : 0;
        let subHint = "";

        if (canMoveHere) {
          border = "#4ef2a1";
          bg = cellCover === 2
            ? "rgba(78,242,161,0.22)"
            : cellCover === 1
              ? "rgba(78,242,161,0.18)"
              : "rgba(78,242,161,0.13)";
          if (!label) {
            label = "·";
            if (cellCover === 2) subHint = "COB+";
            else if (cellCover === 1) subHint = "COB";
          }
        } else if (!label && cellCover > 0) {
          subHint = cellCover === 2 ? "COB+" : "COB";
        }

        if (unitHere) {
          const isSel = selUnit && selUnit.id === unitHere.id;
          const uCover = getTileCoverAt(b, unitHere.x, unitHere.y);
          bg = isSel ? "rgba(78,242,161,0.35)" : "rgba(64,158,255,0.3)";
          border = isSel ? "#ffffff" : "#409eff";
          label = `${unitHere.name.split(" ")[0].slice(0, 4)} ${unitHere.hp}`;
          if (uCover === 2) subHint = "COB+";
          else if (uCover === 1) subHint = "COB";
        }

        if (enemyHere) {
          const isTarget = b.selectedTargetId === enemyHere.id;
          const eCover = getTileCoverAt(b, enemyHere.x, enemyHere.y);
          bg = isTarget ? "rgba(255,82,82,0.42)" : "rgba(255,82,82,0.22)";
          border = isTarget ? "#ffd166" : "#ff5252";
          label = `${enemyHere.name.split(" ")[0].slice(0, 4)} ${enemyHere.hp}`;
          if (selUnit) {
            const hChance = calculateHitChance(selUnit, enemyHere, b);
            const eDmg = estimateUnitDamage(selUnit, enemyHere);
            subHint = `${hChance}% · ~${eDmg}D`;
          } else if (eCover > 0) {
            subHint = eCover === 2 ? "COB+" : "COB";
          }
        }

        cell.style.cssText = `min-height:44px;background:${bg};border:1px solid ${border};border-radius:4px;color:#fff;font-size:0.72em;padding:2px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;`;
        if (subHint) {
          cell.innerHTML = `<span>${label || (smokeHere ? "☁" : "")}</span><span style="font-size:0.82em;opacity:0.85;color:#ffd166;">${subHint}</span>`;
        } else {
          cell.textContent = label || (smokeHere ? "☁" : "");
        }

        cell.addEventListener("mouseenter", () => {
          if (enemyHere && selUnit && b.phase === "player") {
            const hChance = calculateHitChance(selUnit, enemyHere, b);
            const eDmg = estimateUnitDamage(selUnit, enemyHere);
            const eCover = getTileCoverAt(b, enemyHere.x, enemyHere.y);
            const covTxt = eCover === 2 ? "cobertura pesada" : eCover === 1 ? "meia cobertura" : "sem cobertura";
            addBattleLog(`Alvo: ${enemyHere.name} (${enemyHere.hp} HP, ${covTxt}) — Chance ${hChance}%, dano estimado ~${eDmg} HP.`);
          } else if (canMoveHere && selUnit) {
            const cCov = getTileCoverAt(b, x, y);
            const covTxt = cCov === 2 ? " com cobertura pesada" : cCov === 1 ? " com meia cobertura" : "";
            addBattleLog(`Mover ${selUnit.name} para (${x + 1},${y + 1})${covTxt} (1 PA).`);
          }
        });

        cell.addEventListener("click", () => handleCellClick(x, y));
        gridEl.appendChild(cell);
      }
    }
  }

  const selUnit = getSelectedUnit();
  const selEnemy = getSelectedEnemy();

  renderFloatingUnitOrders(b, selUnit, gridEl);

  const setText = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  const ordersPanel = document.querySelector("#tactical .battle-side .side-panel:nth-of-type(3)");
  const canShowOrders = Boolean(selUnit && b.phase === "player");
  if (ordersPanel) {
    ordersPanel.style.display = canShowOrders ? "" : "none";
  }
  ensureEndTurnVisible(b);

  if (selUnit) {
    const maxMove = selUnit.stunned ? 2 : 3;
    setText("selected-unit", `${selUnit.name} (${selUnit.role})`);
    setText("unit-hp", `${selUnit.hp}/${selUnit.maxHp} HP`);
    setText("unit-ap", `${selUnit.ap}/${selUnit.maxAp} PA · MOV ${maxMove}`);
    setText("unit-ammo", `${selUnit.ammo}/${selUnit.maxAmmo} MUN`);
  } else {
    setText("selected-unit", "SEM OPERACIONAL");
    setText("unit-hp", "0 HP");
    setText("unit-ap", "0 PA");
    setText("unit-ammo", "0 MUN");
  }

  if (selUnit && selEnemy) {
    const chance = calculateHitChance(selUnit, selEnemy, b);
    const cover = getTileCoverAt(b, selEnemy.x, selEnemy.y);
    const coverText = cover === 2 ? "COB. PESADA (-40%)" : cover === 1 ? "MEIA COB. (-25%)" : "SEM COB. (0%)";
    const estDmg = estimateUnitDamage(selUnit, selEnemy);
    setText("target-info", `${selEnemy.name} (${selEnemy.hp} HP · ${coverText})`);
    setText("hit-chance", `CHANCE: ${chance}% · DANO EST.: ~${estDmg}`);
  } else if (selEnemy) {
    const cover = getTileCoverAt(b, selEnemy.x, selEnemy.y);
    const coverText = cover === 2 ? "COB. PESADA" : cover === 1 ? "MEIA COB." : "SEM COB.";
    setText("target-info", `${selEnemy.name} (${selEnemy.hp} HP · ${coverText})`);
    setText("hit-chance", "CHANCE: --% · DANO EST.: --");
  } else {
    setText("target-info", "NENHUM ALVO");
    setText("hit-chance", "CHANCE: --% · DANO EST.: --");
  }

  const logEl = document.getElementById("battle-log");
  if (logEl) logEl.textContent = b.log;

  checkBattleOutcome();
}

function handleCellClick(x, y) {
  const b = state.battle;
  if (!b || b.phase !== "player") return;

  const selUnit = getSelectedUnit();
  const enemyHere = b.enemies.find((e) => e.x === x && e.y === y && e.hp > 0);
  const unitHere = b.units.find((u) => u.x === x && u.y === y && u.hp > 0);

  if (b.mode === "frag" && selUnit) {
    throwFragGrenade(selUnit, x, y);
    return;
  }

  if (b.mode === "smoke" && selUnit) {
    throwSmokeGrenade(selUnit, x, y);
    return;
  }

  if (enemyHere) {
    b.selectedTargetId = enemyHere.id;
    addBattleLog(`Alvo selecionado: ${enemyHere.name} (${enemyHere.archetypeId.toUpperCase()}).`);
    renderBattle();
    return;
  }

  if (unitHere) {
    if (b.selectedUnitId === unitHere.id) {
      b.selectedUnitId = null;
      b.mode = "normal";
      addBattleLog(`Ordens de ${unitHere.name} recolhidas.`);
    } else {
      b.selectedUnitId = unitHere.id;
      b.mode = "normal";
      unitHere.overwatch = false;
      addBattleLog(`Operacional selecionado: ${unitHere.name}.`);
    }
    renderBattle();
    return;
  }

  if (selUnit && selUnit.ap >= 1 && b.grid[y][x] !== 3) {
    const dist = Math.abs(selUnit.x - x) + Math.abs(selUnit.y - y);
    const maxStep = selUnit.stunned ? 2 : 3;
    if (dist > 0 && dist <= maxStep) {
      selUnit.x = x;
      selUnit.y = y;
      selUnit.ap -= 1;
      selUnit.hunker = false;
      selUnit.stunned = false;
      addBattleLog(`${selUnit.name} avançou para (${x + 1},${y + 1}).`);
      renderBattle();
    }
  }
}

function throwFragGrenade(unit, tx, ty) {
  const b = state.battle;
  if (!b || !unit || unit.ap < 1 || unit.frags <= 0) return;

  unit.ap -= 1;
  unit.frags -= 1;
  b.mode = "normal";

  const radius = 1;
  const baseDamage = 32 + getBuildingLevel("b-armory") * 4;
  let hits = 0;

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const cx = tx + dx;
      const cy = ty + dy;
      if (cx < 0 || cx >= GRID_W || cy < 0 || cy >= GRID_H) continue;

      if (b.grid[cy][cx] === 1) {
        b.grid[cy][cx] = 0;
      }

      const en = b.enemies.find((e) => e.x === cx && e.y === cy && e.hp > 0);
      if (en) {
        const dmg = Math.max(10, baseDamage - Math.floor((en.armor || 0) * 0.35));
        en.hp = Math.max(0, en.hp - dmg);
        hits++;
      }

      const ally = b.units.find((u) => u.x === cx && u.y === cy && u.hp > 0 && u.id !== unit.id);
      if (ally) {
        const allyDmg = Math.max(4, Math.floor(baseDamage * 0.4));
        ally.hp = Math.max(0, ally.hp - allyDmg);
      }
    }
  }

  addBattleLog(`${unit.name} lançou granada de fragmentação em (${tx + 1},${ty + 1}) — ${hits} inimigo(s) atingido(s).`);
  renderBattle();
}

function throwSmokeGrenade(unit, tx, ty) {
  const b = state.battle;
  if (!b || !unit || unit.ap < 1 || unit.smokes <= 0) return;

  unit.ap -= 1;
  unit.smokes -= 1;
  b.mode = "normal";

  b.smokes.push({ x: tx, y: ty, turns: 2 });
  if (tx + 1 < GRID_W) b.smokes.push({ x: tx + 1, y: ty, turns: 2 });
  if (tx - 1 >= 0) b.smokes.push({ x: tx - 1, y: ty, turns: 2 });

  addBattleLog(`${unit.name} lançou cortina de fumo em (${tx + 1},${ty + 1}).`);
  renderBattle();
}

function fireAtTarget() {
  const b = state.battle;
  if (!b || b.phase !== "player") return;
  const unit = getSelectedUnit();
  const target = getSelectedEnemy();
  if (!unit || !target) {
    addBattleLog("Seleciona um operacional e um alvo inimigo.");
    return;
  }
  if (unit.ap < 1) {
    addBattleLog(`${unit.name} não tem Pontos de Ação suficientes.`);
    return;
  }
  if (unit.ammo <= 0) {
    addBattleLog(`${unit.name} está sem munições! Usa RECARREGAR.`);
    return;
  }

  unit.ap -= 1;
  unit.ammo -= 1;
  unit.hunker = false;

  const chance = calculateHitChance(unit, target, b);
  const roll = Math.random() * 100;

  if (roll <= chance) {
    const armoryBonus = getBuildingLevel("b-armory") * 4;
    const baseDmg = unit.role === "Atirador de Elite" ? 42 : unit.role === "Pesado" ? 36 : 28;
    const rawDmg = baseDmg + armoryBonus;
    const armorMitigation = Math.floor((target.armor || 0) * 0.45);
    const finalDmg = Math.max(8, rawDmg - armorMitigation);
    target.hp = Math.max(0, target.hp - finalDmg);
    addBattleLog(`${unit.name} acertou em ${target.name} (${chance}%) — ${finalDmg} de dano!`);
  } else {
    addBattleLog(`${unit.name} falhou o disparo contra ${target.name} (${chance}%).`);
  }

  if (target.hp <= 0) {
    const nextEnemy = b.enemies.find((e) => e.hp > 0);
    b.selectedTargetId = nextEnemy ? nextEnemy.id : null;
  }

  renderBattle();
}

function reloadSelectedUnit() {
  const b = state.battle;
  if (!b || b.phase !== "player") return;
  const unit = getSelectedUnit();
  if (!unit || unit.ap < 1) {
    addBattleLog("Sem PA para recarregar.");
    return;
  }
  unit.ap -= 1;
  unit.ammo = unit.maxAmmo;
  addBattleLog(`${unit.name} recarregou a arma (${unit.ammo}/${unit.maxAmmo}).`);
  renderBattle();
}

function overwatchSelectedUnit() {
  const b = state.battle;
  if (!b || b.phase !== "player") return;
  const unit = getSelectedUnit();
  if (!unit || unit.ap < 1) {
    addBattleLog("Sem PA para entrar em vigilância.");
    return;
  }
  unit.ap -= 1;
  unit.overwatch = true;
  addBattleLog(`${unit.name} entrou em VIGILÂNCIA.`);
  renderBattle();
}

function hunkerSelectedUnit() {
  const b = state.battle;
  if (!b || b.phase !== "player") return;
  const unit = getSelectedUnit();
  if (!unit || unit.ap < 1) {
    addBattleLog("Sem PA para HUNKER DOWN.");
    return;
  }
  unit.ap -= 1;
  unit.hunker = true;
  addBattleLog(`${unit.name} assumiu posição defensiva (HUNKER DOWN).`);
  renderBattle();
}

function useMedkitSelectedUnit() {
  const b = state.battle;
  if (!b || b.phase !== "player") return;
  const unit = getSelectedUnit();
  if (!unit || unit.ap < 1) {
    addBattleLog("Sem PA para usar Kit Médico.");
    return;
  }
  if (unit.medkits <= 0) {
    addBattleLog(`${unit.name} não tem Kits Médicos.`);
    return;
  }
  if (unit.hp >= unit.maxHp) {
    addBattleLog(`${unit.name} já está com a vida máxima.`);
    return;
  }

  unit.ap -= 1;
  unit.medkits -= 1;
  const heal = unit.role === "Médico" ? 45 : 30;
  unit.hp = Math.min(unit.maxHp, unit.hp + heal);
  addBattleLog(`${unit.name} recuperou ${heal} HP com Kit Médico (${unit.hp}/${unit.maxHp}).`);
  renderBattle();
}

function endPlayerTurn() {
  const b = state.battle;
  if (!b || b.phase !== "player") return;
  if (checkBattleOutcome()) return;

  b.phase = "enemy";
  b.mode = "normal";
  renderBattle();

  const aliveEnemies = b.enemies.filter((e) => e.hp > 0);
  aliveEnemies.forEach((en) => {
    const aliveUnits = b.units.filter((u) => u.hp > 0);
    if (!aliveUnits.length) return;

    aliveUnits.sort((a, c) => (Math.abs(a.x - en.x) + Math.abs(a.y - en.y)) - (Math.abs(c.x - en.x) + Math.abs(c.y - en.y)));
    const target = aliveUnits[0];
    const dist = Math.abs(en.x - target.x) + Math.abs(en.y - target.y);

    if (dist > 2) {
      const stepX = en.x + Math.sign(target.x - en.x);
      const stepY = en.y;
      if (stepX >= 0 && stepX < GRID_W && b.grid[stepY][stepX] !== 3 && !b.units.some((u) => u.x === stepX && u.y === stepY && u.hp > 0)) {
        en.x = stepX;
      }
    }

    const watcher = aliveUnits.find((u) => u.overwatch && u.ammo > 0);
    if (watcher) {
      watcher.overwatch = false;
      watcher.ammo -= 1;
      const owDmg = 20;
      en.hp = Math.max(0, en.hp - owDmg);
      addBattleLog(`${watcher.name} disparou em VIGILÂNCIA contra ${en.name} (-${owDmg} HP)!`);
      if (en.hp <= 0) return;
    }

    const cover = getTileCoverAt(b, target.x, target.y);
    let eChance = (en.aim || 65) - Math.max(0, Math.abs(en.x - target.x) + Math.abs(en.y - target.y) - 2) * 4;
    if (cover === 1) eChance -= target.hunker ? 40 : 25;
    if (cover === 2) eChance -= target.hunker ? 55 : 40;
    if (isInSmoke(b, target.x, target.y)) eChance -= 25;

    if (Math.random() * 100 <= Math.max(10, Math.min(90, eChance))) {
      let dmg = en.damage;
      if (en.archetypeId === "stalker" && cover === 0) dmg += 6;
      if (target.hunker) dmg = Math.round(dmg * 0.65);
      dmg = Math.max(6, dmg);
      target.hp = Math.max(0, target.hp - dmg);
      if (en.archetypeId === "psycher") target.stunned = true;
      addBattleLog(`${en.name} atingiu ${target.name} por ${dmg} HP!`);
    } else {
      addBattleLog(`${en.name} disparou contra ${target.name}, mas falhou.`);
    }
  });

  b.smokes = (b.smokes || [])
    .map((s) => ({ ...s, turns: s.turns - 1 }))
    .filter((s) => s.turns > 0);

  if (checkBattleOutcome()) return;

  b.turn += 1;
  b.phase = "player";
  b.units.forEach((u) => {
    if (u.hp > 0) {
      u.ap = u.maxAp;
      u.overwatch = false;
    }
  });

  const firstAlive = b.units.find((u) => u.hp > 0);
  if (firstAlive) b.selectedUnitId = firstAlive.id;

  addBattleLog(`Turno ${b.turn} iniciado — Ordens da Unidade ZERO.`);
  renderBattle();
}

function checkBattleOutcome() {
  const b = state.battle;
  if (!b) return false;

  const anyEnemyAlive = b.enemies.some((e) => e.hp > 0);
  const anyUnitAlive = b.units.some((u) => u.hp > 0);

  if (!anyEnemyAlive) {
    const mission = b.mission;
    const missionIndex = b.missionIndex;
    state.battle = null;

    state.credits += mission.rewards.credits || 0;
    state.materials += mission.rewards.materials || 0;
    state.alien += mission.rewards.alien || 0;
    state.metrics.research = Math.min(100, state.metrics.research + (mission.rewards.research || 0));

    if (!state.completedMissions.includes(mission.id)) {
      state.completedMissions.push(mission.id);
    }
    if (missionIndex + 1 > state.currentMissionIndex && missionIndex + 1 < CAMPAIGN_MISSIONS.length) {
      state.currentMissionIndex = missionIndex + 1;
    }

    b.units.forEach((bu) => {
      const ro = state.roster.find((r) => r.id === bu.id);
      if (ro) {
        ro.hp = bu.hp > 0 ? bu.hp : Math.max(15, Math.round(ro.maxHp * 0.35));
        ro.status = bu.hp > 0 ? "PRONTO" : "FERIDO";
        ro.xp += mission.rewards.xp || 30;
        if (ro.xp >= ro.level * 60) {
          ro.level += 1;
          ro.aim = Math.min(96, ro.aim + 2);
        }
      }
    });

    saveState();
    renderCommand();
    presentMissionChoiceModal(mission, missionIndex);
    return true;
  }

  if (!anyUnitAlive) {
    state.battle = null;
    state.metrics.threat = Math.min(100, state.metrics.threat + 12);
    state.roster.forEach((ro) => {
      if (state.selectedSquadIds.includes(ro.id)) {
        ro.status = "FERIDO";
        ro.hp = Math.max(20, Math.round(ro.maxHp * 0.4));
      }
    });
    saveState();
    renderCommand();
    openModal(`
      <h3>OPERAÇÃO FALHADA</h3>
      <p>A equipa recuou sob fogo pesado. A ameaça alienígena aumentou (+12%) e os operacionais necessitam de recuperação.</p>
      <button class="primary" onclick="closeModal(); goToScreen('command');">REGRESSAR AO COMANDO</button>
    `);
    return true;
  }

  return false;
}

function presentMissionChoiceModal(mission, missionIndex) {
  const ch = mission.choice;
  const numLabel = formatMissionNumber(mission.number);

  if (!ch) {
    openModal(`
      <h3>MISSÃO CONCLUÍDA — ${mission.title.toUpperCase()}</h3>
      <p>Recompensas recebidas: +${mission.rewards.credits} Créditos, +${mission.rewards.materials} Materiais.</p>
      <button class="primary" onclick="closeModal(); goToScreen('missions');">CONTINUAR</button>
    `);
    return;
  }

  const isFinalMission = missionIndex === CAMPAIGN_MISSIONS.length - 1 || Boolean(ch.optionA.finalTag);

  const buildOptBtn = (key, opt) => {
    const encoded = encodeURIComponent(JSON.stringify(opt));
    return `<button class="primary full" style="margin-top:8px;" onclick="applyMissionChoice('${mission.id}', ${isFinalMission}, '${encoded}')">${opt.label}</button>`;
  };

  let optsHtml = buildOptBtn("A", ch.optionA) + buildOptBtn("B", ch.optionB);
  if (ch.optionC) {
    optsHtml += buildOptBtn("C", ch.optionC);
  }

  openModal(`
    <h3>VITÓRIA — ${numLabel}. ${mission.title.toUpperCase()}</h3>
    <p>Recompensas: +${mission.rewards.credits} Créditos · +${mission.rewards.materials} Materiais · +${mission.rewards.alien || 0} Tec. Alienígena</p>
    <hr style="border-color:rgba(255,255,255,0.12);margin:10px 0;">
    <p><b>DECISÃO ESTRATÉGICA:</b> ${ch.prompt}</p>
    ${optsHtml}
  `);
}

function applyMissionChoice(missionId, isFinalMission, encodedOpt) {
  let opt = null;
  try {
    opt = JSON.parse(decodeURIComponent(encodedOpt));
  } catch (_) {}

  if (opt && opt.effects) {
    const e = opt.effects;
    state.metrics.trust = Math.max(0, Math.min(100, state.metrics.trust + (e.trust || 0)));
    state.metrics.resources = Math.max(0, Math.min(100, state.metrics.resources + (e.resources || 0)));
    state.metrics.research = Math.max(0, Math.min(100, state.metrics.research + (e.research || 0)));
    state.metrics.threat = Math.max(0, Math.min(100, state.metrics.threat + (e.threat || 0)));
    if (e.credits) state.credits += e.credits;
    if (e.materials) state.materials += e.materials;
    if (e.alien) state.alien += e.alien;
  }

  if (isFinalMission) {
    const ending = resolveCampaignEnding(state.metrics, opt ? opt.finalTag : null);
    state.lastEnding = ending;
    saveState();
    renderCommand();
    openModal(`
      <h3>FINAL DA CAMPANHA — ${ending.title.toUpperCase()}</h3>
      <p>${ending.summary}</p>
      <p style="font-size:0.85em;opacity:0.85;">
        Indicadores finais — Confiança: ${state.metrics.trust} · Recursos: ${state.metrics.resources} · Investigação: ${state.metrics.research} · Ameaça: ${state.metrics.threat}
      </p>
      <button class="primary full" style="margin-top:10px;" onclick="closeModal(); goToScreen('command');">VOLTAR AO COMANDO</button>
    `);
    return;
  }

  saveState();
  renderCommand();
  renderCampaignMissions();
  closeModal();
  goToScreen("missions");
}

// ---------------------------------------------------------------------------
// 7. INICIALIZAÇÃO DE EVENTOS
// ---------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  syncUnitStatsWithBase();
  renderCommand();
  renderSquad();
  renderBase();
  renderCampaignMissions();
  renderIntelligence();

  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dest = btn.getAttribute("data-go");
      if (dest) goToScreen(dest);
    });
  });

  const closeModalBtn = document.getElementById("close-modal");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  const modalEl = document.getElementById("modal");
  if (modalEl) {
    modalEl.addEventListener("click", (e) => {
      if (e.target === modalEl) closeModal();
    });
  }

  const fireBtn = document.getElementById("fire-btn");
  if (fireBtn) fireBtn.addEventListener("click", fireAtTarget);

  const reloadBtn = document.getElementById("reload-btn");
  if (reloadBtn) reloadBtn.addEventListener("click", reloadSelectedUnit);

  const overwatchBtn = document.getElementById("overwatch-btn");
  if (overwatchBtn) overwatchBtn.addEventListener("click", overwatchSelectedUnit);

  const hunkerBtn = document.getElementById("hunker-btn");
  if (hunkerBtn) hunkerBtn.addEventListener("click", hunkerSelectedUnit);

  const medkitBtn = document.getElementById("medkit");
  if (medkitBtn) medkitBtn.addEventListener("click", useMedkitSelectedUnit);

  const endTurnBtn = document.getElementById("end-turn");
  if (endTurnBtn) endTurnBtn.addEventListener("click", endPlayerTurn);

  const retreatBtn = document.getElementById("retreat");
  if (retreatBtn) {
    retreatBtn.addEventListener("click", () => {
      if (!state.battle) {
        goToScreen("command");
        return;
      }
      state.battle = null;
      state.metrics.threat = Math.min(100, state.metrics.threat + 6);
      saveState();
      goToScreen("command");
    });
  }
});
