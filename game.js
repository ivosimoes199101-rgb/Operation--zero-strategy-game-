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

function resetSaveState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (_) {}
  state = createDefaultState();
  syncUnitStatsWithBase();
  saveState();
  renderCommand();
  renderSquad();
  renderBase();
  renderCampaignMissions();
  renderIntelligence();
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

function setTacticalViewportLock(active) {
  let styleEl = document.getElementById("tactical-fixed-viewport-style");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "tactical-fixed-viewport-style";
    styleEl.textContent = `
      html.tactical-locked, body.tactical-locked {
        overflow: hidden !important;
        overscroll-behavior: none !important;
        height: 100dvh !important;
        width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      #tactical.active {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100dvh !important;
        max-height: 100dvh !important;
        overflow: hidden !important;
        overscroll-behavior: none !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        box-sizing: border-box !important;
        padding: 8px 10px !important;
        z-index: 20 !important;
      }
      #tactical.active .battle-top,
      #tactical.active .battle-info {
        flex-shrink: 0 !important;
      }
      #tactical.active .battle-main {
        flex: 1 1 auto !important;
        min-height: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        overflow: hidden !important;
        position: relative !important;
      }
      #tactical.active #battle-grid {
        touch-action: none !important;
        user-select: none !important;
        -webkit-user-select: none !important;
      }
      #tactical.active #battle-log {
        flex-shrink: 0 !important;
        max-height: 54px !important;
        overflow-y: auto !important;
        font-size: 0.78em !important;
      }
      #tactical.active .battle-side {
        flex-shrink: 0 !important;
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: wrap !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 6px !important;
        margin-top: 6px !important;
      }
      #tactical.active .battle-side .side-panel:nth-of-type(1),
      #tactical.active .battle-side .side-panel:nth-of-type(2) {
        flex: 1 1 45% !important;
        font-size: 0.72em !important;
        padding: 5px 7px !important;
        margin: 0 !important;
      }
      #tactical.active #end-turn {
        flex: 1 1 100% !important;
        margin-top: 2px !important;
        padding: 7px 10px !important;
        font-size: 0.82em !important;
      }
    `;
    document.head.appendChild(styleEl);
  }
  document.documentElement.classList.toggle("tactical-locked", Boolean(active));
  document.body.classList.toggle("tactical-locked", Boolean(active));
}

function goToScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(screenId) || document.getElementById("home");
  if (target) target.classList.add("active");
  setTacticalViewportLock(screenId === "tactical");

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

function ensureResetSaveButton() {
  const cmdSection = document.getElementById("command");
  if (!cmdSection) return;
  let btn = document.getElementById("reset-save-btn");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "reset-save-btn";
    btn.type = "button";
    btn.className = "secondary";
    btn.textContent = "REPOR SAVE";
    btn.style.cssText = "margin-top:10px;font-size:0.8em;opacity:0.88;";
    btn.addEventListener("click", () => {
      openModal(`
        <h3>REPOR PROGRESSO GUARDADO</h3>
        <p>Isto vai limpar o save atual no navegador e repor a campanha, base e recursos do início. Queres continuar?</p>
        <div style="display:flex;gap:8px;margin-top:12px;">
          <button type="button" class="primary" id="confirm-reset-save">CONFIRMAR REPOSIÇÃO</button>
          <button type="button" class="secondary" onclick="closeModal()">CANCELAR</button>
        </div>
      `);
      const confirmBtn = document.getElementById("confirm-reset-save");
      if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
          resetSaveState();
          closeModal();
          openModal(`
            <h3>SAVE REPOSTO</h3>
            <p>O estado inicial da operação foi reposto com sucesso.</p>
            <button type="button" class="primary" onclick="closeModal()">OK</button>
          `);
        });
      }
    });
    cmdSection.appendChild(btn);
  }
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
  ensureResetSaveButton();
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
      <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
        <div style="display:flex;align-items:center;gap:6px;">
          ${getUnitVisualBadge(u, false)}
          <b>${u.name}</b>
        </div>
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
// 6. COMBATE TÁTICO ISOMÉTRICO XCOM (NAVEGAÇÃO TÁTIL + BARRA FLUTUANTE)
// ---------------------------------------------------------------------------

const GRID_W = 10;
const GRID_H = 8;
const ISO_VIEW_W = 6;
const ISO_VIEW_H = 6;

function createMissionMap(missionIndex) {
  const grid = Array.from({ length: GRID_H }, () => Array(GRID_W).fill(0));

  grid[1][3] = 4;
  grid[2][3] = 1;
  grid[3][3] = 2;
  grid[4][3] = 1;
  grid[5][3] = 4;
  grid[6][3] = 1;

  grid[2][5] = 2;
  grid[3][5] = 4;
  grid[4][5] = 4;
  grid[5][5] = 2;

  grid[0][4] = 3;
  grid[7][4] = 3;

  if (missionIndex >= 2) {
    grid[1][6] = 3;
    grid[6][6] = 3;
    grid[3][4] = 1;
  }
  if (missionIndex >= 5) {
    grid[3][6] = 2;
    grid[4][6] = 2;
    grid[2][4] = 4;
    grid[5][4] = 4;
  }
  if (missionIndex >= 8) {
    grid[0][6] = 2;
    grid[7][6] = 2;
    grid[1][4] = 1;
    grid[6][4] = 1;
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
      else if ((t === 1 || t === 4) && best < 1) best = 1;
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
    [0, 1], [0, 3], [0, 4], [0, 6], [1, 3]
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
      crouched: false,
      stunned: false
    };
  });

  const enemyPositions = [
    [8, 1], [9, 2], [8, 4], [9, 5], [8, 6], [9, 3]
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
    camera: { x: 2, y: 1 },
    grid: createMissionMap(missionIndex),
    smokes: [],
    units,
    enemies,
    selectedUnitId: null,
    selectedTargetId: enemies[0] ? enemies[0].id : null,
    log: `Missão ${formatMissionNumber(mission.number)}: ${mission.title} — Toca num operacional para abrir as ordens flutuantes ou arrasta o plano isométrico.`
  };

  goToScreen("tactical");
  renderBattle();
}

function getUnitMoveRange(unit) {
  if (!unit) return 0;
  let range = unit.crouched ? 2 : 4;
  if (unit.stunned) range = Math.max(1, range - 1);
  return range;
}

function toggleCrouchSelectedUnit() {
  const b = state.battle;
  if (!b || b.phase !== "player") return;
  const unit = getSelectedUnit();
  if (!unit || unit.ap < 1) {
    addBattleLog("Sem PA para alterar a postura.");
    return;
  }
  unit.ap -= 1;
  unit.crouched = !unit.crouched;
  if (unit.crouched) {
    unit.hunker = true;
    addBattleLog(`${unit.name} agachou-se (MOV CAUTELOSO: 2 casas, maior proteção).`);
  } else {
    unit.hunker = false;
    addBattleLog(`${unit.name} levantou-se (CORRER: 4 casas de alcance).`);
  }
  renderBattle();
}

function toggleMoveModeSelectedUnit() {
  const b = state.battle;
  if (!b || b.phase !== "player") return;
  const unit = getSelectedUnit();
  if (!unit) {
    addBattleLog("Seleciona primeiro um operacional.");
    return;
  }
  if (unit.ap < 1) {
    addBattleLog(`${unit.name} não tem PA para mover.`);
    return;
  }
  b.mode = b.mode === "move" ? "normal" : "move";
  const range = getUnitMoveRange(unit);
  const stanceTxt = unit.crouched ? "agachado/cauteloso" : "de pé/corrida";
  addBattleLog(
    b.mode === "move"
      ? `Modo MOVER ativo (${stanceTxt}, alcance ${range} casas): toca num losango realçado no mapa isométrico.`
      : "Modo de seleção normal restaurado."
  );
  renderBattle();
}

function panCamera(dx, dy) {
  const b = state.battle;
  if (!b) return;
  const maxCamX = Math.max(0, GRID_W - ISO_VIEW_W);
  const maxCamY = Math.max(0, GRID_H - ISO_VIEW_H);
  if (!b.camera) b.camera = { x: 2, y: 1 };
  b.camera.x = Math.max(0, Math.min(maxCamX, b.camera.x + dx));
  b.camera.y = Math.max(0, Math.min(maxCamY, b.camera.y + dy));
  renderBattle();
}

function centerCameraOnUnit(unit) {
  const b = state.battle;
  if (!b || !unit) return;
  const maxCamX = Math.max(0, GRID_W - ISO_VIEW_W);
  const maxCamY = Math.max(0, GRID_H - ISO_VIEW_H);
  if (!b.camera) b.camera = { x: 2, y: 1 };
  b.camera.x = Math.max(0, Math.min(maxCamX, unit.x - Math.floor(ISO_VIEW_W / 2)));
  b.camera.y = Math.max(0, Math.min(maxCamY, unit.y - Math.floor(ISO_VIEW_H / 2)));
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
  if (!unit.hunker && !unit.crouched) {
    if (cover === 1) chance -= target.hunker ? 40 : 25;
    if (cover === 2) chance -= target.hunker ? 55 : 40;
  }
  if (unit.crouched) {
    chance += 4;
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

// --- GEOMETRIA ISOMÉTRICA XCOM (2:1) ---
function getIsoMetrics(canvas) {
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(300, rect.width || canvas.parentElement?.clientWidth || 360);
  const h = Math.max(220, rect.height || 300);

  const maxTileWByWidth = Math.floor((w - 24) / ISO_VIEW_W);
  const maxTileWByHeight = Math.floor(((h - 62) / ISO_VIEW_H) * 2);
  const tileW = Math.max(40, Math.min(68, Math.min(maxTileWByWidth, maxTileWByHeight)));
  const tileH = Math.round(tileW * 0.5);
  const wallH = Math.max(8, Math.round(tileH * 0.44));
  const originX = w * 0.5;
  const boardPixelH = ISO_VIEW_W * tileH;
  const originY = Math.max(42, Math.round((h - boardPixelH) * 0.36));

  return { w, h, tileW, tileH, wallH, originX, originY };
}

function worldToIso(gx, gy, battle, m) {
  const camX = battle.camera ? battle.camera.x : 0;
  const camY = battle.camera ? battle.camera.y : 0;
  const lx = gx - camX;
  const ly = gy - camY;
  return {
    sx: m.originX + (lx - ly) * (m.tileW * 0.5),
    sy: m.originY + (lx + ly) * (m.tileH * 0.5)
  };
}

function isoToWorld(px, py, battle, m) {
  const camX = battle.camera ? battle.camera.x : 0;
  const camY = battle.camera ? battle.camera.y : 0;
  const hw = m.tileW * 0.5;
  const hh = m.tileH * 0.5;
  const u = (px - m.originX) / hw;
  const v = (py - m.originY) / hh;
  const lx = Math.floor((u + v) * 0.5 + 0.5);
  const ly = Math.floor((v - u) * 0.5 + 0.5);
  if (lx < 0 || lx >= ISO_VIEW_W || ly < 0 || ly >= ISO_VIEW_H) return null;
  const gx = lx + camX;
  const gy = ly + camY;
  if (gx < 0 || gx >= GRID_W || gy < 0 || gy >= GRID_H) return null;
  return { x: gx, y: gy };
}

function drawIsoDiamond(ctx, sx, sy, w, h, fill, stroke, lw = 1.2) {
  const hw = w * 0.5;
  const hh = h * 0.5;
  ctx.beginPath();
  ctx.moveTo(sx, sy - hh);
  ctx.lineTo(sx + hw, sy);
  ctx.lineTo(sx, sy + hh);
  ctx.lineTo(sx - hw, sy);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
}

function drawIsoBoardSkirt(ctx, battle, m) {
  const camX = battle.camera ? battle.camera.x : 0;
  const camY = battle.camera ? battle.camera.y : 0;
  const skirtH = Math.max(10, Math.round(m.wallH * 1.15));
  const hw = m.tileW * 0.5;
  const hh = m.tileH * 0.5;

  // Borda lateral esquerda do plano isométrico
  ctx.beginPath();
  for (let vx = 0; vx < ISO_VIEW_W; vx++) {
    const p = worldToIso(camX + vx, camY + ISO_VIEW_H - 1, battle, m);
    if (vx === 0) ctx.moveTo(p.sx - hw, p.sy);
    ctx.lineTo(p.sx, p.sy + hh);
  }
  const endL = worldToIso(camX + ISO_VIEW_W - 1, camY + ISO_VIEW_H - 1, battle, m);
  ctx.lineTo(endL.sx, endL.sy + hh + skirtH);
  const startL = worldToIso(camX, camY + ISO_VIEW_H - 1, battle, m);
  ctx.lineTo(startL.sx - hw, startL.sy + skirtH);
  ctx.closePath();
  ctx.fillStyle = "#101b28";
  ctx.fill();
  ctx.strokeStyle = "rgba(78, 242, 161, 0.34)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Borda lateral direita do plano isométrico
  ctx.beginPath();
  const topR = worldToIso(camX + ISO_VIEW_W - 1, camY, battle, m);
  ctx.moveTo(topR.sx + hw, topR.sy);
  for (let vy = 0; vy < ISO_VIEW_H; vy++) {
    const p = worldToIso(camX + ISO_VIEW_W - 1, camY + vy, battle, m);
    ctx.lineTo(p.sx, p.sy + hh);
  }
  const botR = worldToIso(camX + ISO_VIEW_W - 1, camY + ISO_VIEW_H - 1, battle, m);
  ctx.lineTo(botR.sx, botR.sy + hh + skirtH);
  ctx.lineTo(topR.sx + hw, topR.sy + skirtH);
  ctx.closePath();
  ctx.fillStyle = "#0a111a";
  ctx.fill();
  ctx.strokeStyle = "rgba(78, 242, 161, 0.24)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawIsoCoverBlock(ctx, sx, sy, w, h, wallH, isHigh, isDestructible) {
  const cw = w * 0.72;
  const ch = h * 0.72;
  const chw = cw * 0.5;
  const chh = ch * 0.5;
  const topY = sy - wallH;

  drawIsoDiamond(ctx, sx, sy + 1, w * 0.88, h * 0.88, "rgba(0,0,0,0.38)", null, 0);

  const leftCol = isHigh ? "#1d4ed8" : isDestructible ? "#b45309" : "#3f4e63";
  const rightCol = isHigh ? "#1e3a8a" : isDestructible ? "#78350f" : "#273242";
  const topCol = isHigh ? "#60a5fa" : isDestructible ? "#f59e0b" : "#64748b";
  const borderCol = isHigh ? "#93c5fd" : isDestructible ? "#fde68a" : "#94a3b8";

  ctx.beginPath();
  ctx.moveTo(sx - chw, topY);
  ctx.lineTo(sx, topY + chh);
  ctx.lineTo(sx, sy + chh);
  ctx.lineTo(sx - chw, sy);
  ctx.closePath();
  ctx.fillStyle = leftCol;
  ctx.fill();
  ctx.strokeStyle = borderCol;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(sx + chw, topY);
  ctx.lineTo(sx, topY + chh);
  ctx.lineTo(sx, sy + chh);
  ctx.lineTo(sx + chw, sy);
  ctx.closePath();
  ctx.fillStyle = rightCol;
  ctx.fill();
  ctx.stroke();

  drawIsoDiamond(ctx, sx, topY, cw, ch, topCol, borderCol, 1.2);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 8px monospace";
  ctx.textAlign = "center";
  ctx.fillText(isHigh ? "◈" : "◇", sx, topY + 3);
}

function drawIsoSoldierSprite(ctx, sx, sy, w, h, unit, isSelected) {
  ctx.beginPath();
  ctx.ellipse(sx, sy + 1, w * 0.28, h * 0.28, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.48)";
  ctx.fill();

  if (isSelected) {
    drawIsoDiamond(ctx, sx, sy, w * 0.94, h * 0.94, "rgba(78, 242, 161, 0.24)", "#4ef2a1", 1.8);
  }

  const crouchOffset = unit.crouched ? 3.5 : 0;
  const bodyH = Math.max(12, Math.round(h * 0.85));
  const headR = Math.max(3.5, Math.round(w * 0.11));
  const hipY = sy - bodyH * 0.32 + crouchOffset * 0.5;
  const shoulderY = sy - bodyH * 0.82 + crouchOffset;
  const headY = shoulderY - headR - 1.5;

  ctx.strokeStyle = isSelected ? "#bbf7d0" : "#94a3b8";
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(sx - 3, hipY);
  ctx.lineTo(sx - 4, sy);
  ctx.moveTo(sx + 3, hipY);
  ctx.lineTo(sx + 4, sy);
  ctx.stroke();

  ctx.fillStyle = isSelected ? "#16a34a" : "#1e3a5f";
  ctx.strokeStyle = isSelected ? "#4ef2a1" : "#60a5fa";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.roundRect(sx - 5.5, shoulderY, 11, bodyH * 0.52, 2.5);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(sx, headY, headR, 0, Math.PI * 2);
  ctx.fillStyle = isSelected ? "#4ef2a1" : "#cbd5e1";
  ctx.fill();
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(sx + 2, shoulderY + 4);
  ctx.lineTo(sx + 10, shoulderY + 1);
  ctx.stroke();

  const barW = 24;
  const barH = 3.5;
  const barX = sx - barW * 0.5;
  const barY = headY - headR - 8;
  const ratio = Math.max(0, Math.min(1, unit.hp / Math.max(1, unit.maxHp)));

  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
  ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
  ctx.fillStyle = ratio > 0.5 ? "#22c55e" : ratio > 0.25 ? "#eab308" : "#ef4444";
  ctx.fillRect(barX, barY, barW * ratio, barH);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 8px monospace";
  ctx.textAlign = "center";
  ctx.fillText(`${unit.name.split(" ")[0]} ${unit.hp}`, sx, barY - 3);
}

function drawIsoAlienSprite(ctx, sx, sy, w, h, enemy, isTargeted) {
  ctx.beginPath();
  ctx.ellipse(sx, sy + 1, w * 0.28, h * 0.28, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fill();

  if (isTargeted) {
    drawIsoDiamond(ctx, sx, sy, w * 0.94, h * 0.94, "rgba(255, 209, 102, 0.24)", "#ffd166", 1.8);
  }

  const isBig = enemy.archetypeId === "brute" || enemy.archetypeId === "overlord";
  const bodyH = Math.max(13, Math.round(h * (isBig ? 1.05 : 0.85)));
  const headR = Math.max(4, Math.round(w * (isBig ? 0.14 : 0.11)));
  const hipY = sy - bodyH * 0.35;
  const shoulderY = sy - bodyH * 0.82;
  const headY = shoulderY - headR - 1.5;

  ctx.strokeStyle = "#f87171";
  ctx.lineWidth = isBig ? 3 : 2.2;
  ctx.beginPath();
  ctx.moveTo(sx - 4, hipY);
  ctx.lineTo(sx - 5, sy);
  ctx.moveTo(sx + 4, hipY);
  ctx.lineTo(sx + 5, sy);
  ctx.stroke();

  ctx.fillStyle = isBig ? "#7f1d1d" : "#991b1b";
  ctx.strokeStyle = isTargeted ? "#fde047" : "#fca5a5";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(sx, shoulderY - 2);
  ctx.lineTo(sx + (isBig ? 8 : 6), hipY);
  ctx.lineTo(sx, sy - 2);
  ctx.lineTo(sx - (isBig ? 8 : 6), hipY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(sx, headY, headR, 0, Math.PI * 2);
  ctx.fillStyle = "#ef4444";
  ctx.fill();
  ctx.strokeStyle = "#fecaca";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#fef08a";
  ctx.beginPath();
  ctx.arc(sx - 1.5, headY - 0.5, 1.5, 0, Math.PI * 2);
  ctx.fill();

  const barW = 24;
  const barH = 3.5;
  const barX = sx - barW * 0.5;
  const barY = headY - headR - 8;
  const ratio = Math.max(0, Math.min(1, enemy.hp / Math.max(1, enemy.maxHp)));

  ctx.fillStyle = "rgba(0, 0, 0, 0.78)";
  ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(barX, barY, barW * ratio, barH);

  ctx.fillStyle = isTargeted ? "#fde047" : "#fca5a5";
  ctx.font = "bold 8px monospace";
  ctx.textAlign = "center";
  ctx.fillText(`${enemy.archetypeId.slice(0, 5).toUpperCase()} ${enemy.hp}`, sx, barY - 3);
}

function ensureIsoCanvasStage(gridEl) {
  if (!gridEl || !gridEl.parentElement) return null;
  gridEl.style.display = "none";

  let stage = document.getElementById("oz-iso-stage");
  if (!stage) {
    stage = document.createElement("div");
    stage.id = "oz-iso-stage";
    stage.style.cssText = `
      position:relative;
      width:100%;
      flex:1 1 auto;
      min-height:220px;
      border-radius:10px;
      overflow:hidden;
      border:1px solid rgba(78, 242, 161, 0.34);
      background:radial-gradient(circle at 50% 25%, #16283b 0%, #09111a 75%, #05090f 100%);
      box-shadow:inset 0 0 24px rgba(0, 0, 0, 0.72);
    `;
    gridEl.parentElement.insertBefore(stage, gridEl);

    const canvas = document.createElement("canvas");
    canvas.id = "iso-battle-canvas";
    canvas.style.cssText = "width:100%;height:100%;display:block;touch-action:none;user-select:none;-webkit-user-select:none;cursor:pointer;";
    stage.appendChild(canvas);

    // Navegação tátil suave por arrasto/deslize direto no canvas isométrico
    let pointerDown = false;
    let totalMoved = 0;
    let startClientX = 0;
    let startClientY = 0;
    let lastClientX = 0;
    let lastClientY = 0;

    canvas.addEventListener("pointerdown", (ev) => {
      pointerDown = true;
      totalMoved = 0;
      startClientX = ev.clientX;
      startClientY = ev.clientY;
      lastClientX = ev.clientX;
      lastClientY = ev.clientY;
    });

    window.addEventListener("pointermove", (ev) => {
      if (!pointerDown || !state.battle) return;
      totalMoved = Math.hypot(ev.clientX - startClientX, ev.clientY - startClientY);
      if (totalMoved > 18) {
        const dx = ev.clientX - lastClientX;
        const dy = ev.clientY - lastClientY;
        const stepX = Math.abs(dx) >= 30 ? (dx > 0 ? -1 : 1) : 0;
        const stepY = Math.abs(dy) >= 22 ? (dy > 0 ? -1 : 1) : 0;
        if (stepX !== 0 || stepY !== 0) {
          lastClientX = ev.clientX;
          lastClientY = ev.clientY;
          panCamera(stepX, stepY);
        }
      }
    });

    window.addEventListener("pointerup", (ev) => {
      if (!pointerDown) return;
      pointerDown = false;
      if (totalMoved <= 14 && state.battle) {
        const rect = canvas.getBoundingClientRect();
        const px = ev.clientX - rect.left;
        const py = ev.clientY - rect.top;
        const m = getIsoMetrics(canvas);
        const hit = isoToWorld(px, py, state.battle, m);
        if (hit) handleCellClick(hit.x, hit.y);
      }
    });
  }

  return document.getElementById("iso-battle-canvas");
}

function ensureTacticalExtras() {
  const tactical = document.getElementById("tactical");
  if (!tactical) return;

  const gridEl = document.getElementById("battle-grid");
  const logEl = document.getElementById("battle-log");
  if (gridEl && logEl && logEl.previousElementSibling !== gridEl) {
    logEl.style.marginTop = "6px";
    gridEl.insertAdjacentElement("afterend", logEl);
  }

  const oldExtraBar = document.getElementById("tactical-grenade-bar");
  if (oldExtraBar && oldExtraBar.parentElement) {
    oldExtraBar.parentElement.removeChild(oldExtraBar);
  }
}

function renderFloatingUnitOrders(battle, selUnit, canvas, m) {
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
      box-shadow:0 8px 24px rgba(0,0,0,0.6);
      display:none;
      min-width:210px;
      max-width:320px;
    `;
    const parent = canvas && canvas.parentElement ? canvas.parentElement : document.getElementById("tactical");
    if (parent) {
      if (getComputedStyle(parent).position === "static") {
        parent.style.position = "relative";
      }
      parent.appendChild(pop);
    }
  }

  if (!battle || battle.phase !== "player" || !selUnit || !canvas || !m) {
    pop.style.display = "none";
    return;
  }

  const camX = battle.camera ? battle.camera.x : 0;
  const camY = battle.camera ? battle.camera.y : 0;
  const vx = selUnit.x - camX;
  const vy = selUnit.y - camY;

  if (vx < 0 || vx >= ISO_VIEW_W || vy < 0 || vy >= ISO_VIEW_H) {
    pop.style.display = "none";
    return;
  }

  const parent = pop.parentElement;
  if (!parent) {
    pop.style.display = "none";
    return;
  }

  const unitIso = worldToIso(selUnit.x, selUnit.y, battle, m);
  const parentRect = parent.getBoundingClientRect();

  const stanceLabel = selUnit.crouched ? "AGACHADO" : "EM PÉ";
  pop.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:5px;font-size:0.73em;color:#4ef2a1;">
      <b>${selUnit.name} · ${selUnit.ap} PA · ${stanceLabel}</b>
      <button type="button" id="close-floating-orders" style="background:none;border:none;color:#fff;cursor:pointer;font-size:1em;padding:0 2px;">✕</button>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;">
      <button type="button" data-float-act="move" class="${battle.mode === "move" ? "primary" : "secondary"}" style="font-size:0.72em;padding:4px 7px;">MOVER (${getUnitMoveRange(selUnit)})</button>
      <button type="button" data-float-act="crouch" class="${selUnit.crouched ? "primary" : "secondary"}" style="font-size:0.72em;padding:4px 7px;">${selUnit.crouched ? "LEVANTAR" : "AGACHAR"}</button>
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
  pop.style.bottom = "auto";
  pop.style.right = "auto";
  pop.style.maxWidth = "320px";
  pop.style.left = "0px";
  pop.style.top = "0px";
  const popRect = pop.getBoundingClientRect();

  let left = unitIso.sx - popRect.width / 2;
  left = Math.max(6, Math.min(parentRect.width - popRect.width - 6, left));

  let top = unitIso.sy - popRect.height - 28;
  if (top < 6) {
    top = unitIso.sy + 20;
  }
  top = Math.max(6, Math.min(parentRect.height - popRect.height - 6, top));

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
      if (act === "move") toggleMoveModeSelectedUnit();
      else if (act === "crouch") toggleCrouchSelectedUnit();
      else if (act === "fire") fireAtTarget();
      else if (act === "frag") {
        if (selUnit.ap < 1 || selUnit.frags <= 0) {
          addBattleLog("Sem PA ou sem granadas de fragmentação disponíveis.");
          return;
        }
        battle.mode = battle.mode === "frag" ? "normal" : "frag";
        addBattleLog(battle.mode === "frag" ? "Modo GRANADA FRAG ativo: toca num losango do mapa." : "Modo normal restaurado.");
        renderBattle();
      } else if (act === "smoke") {
        if (selUnit.ap < 1 || selUnit.smokes <= 0) {
          addBattleLog("Sem PA ou sem granadas de fumo disponíveis.");
          return;
        }
        battle.mode = battle.mode === "smoke" ? "normal" : "smoke";
        addBattleLog(battle.mode === "smoke" ? "Modo GRANADA FUMO ativo: toca num losango do mapa." : "Modo normal restaurado.");
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

function getUnitVisualBadge(entity, isEnemy) {
  if (isEnemy) {
    const archColors = {
      scout: "#ff7b54",
      stalker: "#e056fd",
      swarm: "#ff9f1c",
      psycher: "#9b5de5",
      brute: "#ff4757",
      overlord: "#ff2e63"
    };
    const col = archColors[entity.archetypeId] || "#ff5252";
    const glyph =
      entity.archetypeId === "brute" || entity.archetypeId === "overlord" ? "M12 3 L20 7 L18 16 L12 21 L6 16 L4 7 Z" :
      entity.archetypeId === "stalker" ? "M12 3 L21 12 L12 21 L3 12 Z" :
      entity.archetypeId === "psycher" ? "M12 4 A8 8 0 1 0 12 20 A8 8 0 1 0 12 4 M12 8 A4 4 0 1 1 12 16" :
      "M12 4 L20 19 L12 15 L4 19 Z";
    return `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" style="flex-shrink:0;filter:drop-shadow(0 0 3px ${col});"><path d="${glyph}" fill="none" stroke="${col}" stroke-width="2.2" stroke-linejoin="round"/><circle cx="12" cy="12" r="2" fill="${col}"/></svg>`;
  }

  const roleColors = {
    "Fuzileiro": "#4ef2a1",
    "Atirador de Elite": "#38bdf8",
    "Médico": "#2dd4bf",
    "Demolições": "#fb923c",
    "Pesado": "#facc15",
    "Comando": "#c084fc",
    "Reconhecimento": "#a3e635",
    "Engenheiro": "#60a5fa"
  };
  const col = roleColors[entity.role] || "#4ef2a1";
  const statusTag = entity.crouched ? "AGA" : entity.overwatch ? "VIG" : entity.hunker ? "HNK" : entity.stunned ? "ATD" : "";

  return `
    <span style="display:inline-flex;align-items:center;gap:3px;line-height:1;">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" style="flex-shrink:0;">
        <circle cx="12" cy="7.5" r="3.5" fill="${col}"/>
        <path d="M5.5 20 C5.5 15.8 8.4 13.5 12 13.5 C15.6 13.5 18.5 15.8 18.5 20" fill="none" stroke="${col}" stroke-width="2.3" stroke-linecap="round"/>
      </svg>
      ${statusTag ? `<span style="font-size:0.72em;padding:0 2px;border-radius:3px;background:rgba(0,0,0,0.45);color:${col};border:1px solid ${col};">${statusTag}</span>` : ""}
    </span>
  `;
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

  if (!b.camera) b.camera = { x: 2, y: 1 };
  const maxCamX = Math.max(0, GRID_W - ISO_VIEW_W);
  const maxCamY = Math.max(0, GRID_H - ISO_VIEW_H);
  b.camera.x = Math.max(0, Math.min(maxCamX, b.camera.x));
  b.camera.y = Math.max(0, Math.min(maxCamY, b.camera.y));

  const camCoords = document.getElementById("camera-coords");
  if (camCoords) {
    camCoords.textContent = `ZONA ISO [${b.camera.x + 1}..${b.camera.x + ISO_VIEW_W}, ${b.camera.y + 1}..${b.camera.y + ISO_VIEW_H}] / ${GRID_W}x${GRID_H}`;
  }

  const gridEl = document.getElementById("battle-grid");
  const canvas = ensureIsoCanvasStage(gridEl);

  if (canvas && canvas.parentElement) {
    let squadBar = document.getElementById("iso-squad-strip");
    if (!squadBar) {
      squadBar = document.createElement("div");
      squadBar.id = "iso-squad-strip";
      squadBar.style.cssText = `
        position:absolute;
        top:6px;
        right:8px;
        z-index:15;
        display:flex;
        flex-wrap:wrap;
        gap:4px;
        max-width:64%;
        justify-content:flex-end;
      `;
      canvas.parentElement.appendChild(squadBar);
    }
    squadBar.innerHTML = "";
    b.units.filter((u) => u.hp > 0).forEach((u) => {
      const isAct = b.selectedUnitId === u.id;
      const chip = document.createElement("button");
      chip.type = "button";
      chip.textContent = `${u.name.split(" ")[0]} · ${u.ap}PA`;
      chip.style.cssText = `
        font-size:0.65em;
        padding:2px 6px;
        border-radius:999px;
        border:1px solid ${isAct ? "#4ef2a1" : u.ap > 0 ? "rgba(125,211,252,0.45)" : "rgba(148,163,184,0.25)"};
        background:${isAct ? "rgba(78,242,161,0.24)" : "rgba(9,17,26,0.84)"};
        color:${isAct ? "#ecfdf5" : "#cbd5e1"};
        cursor:pointer;
      `;
      chip.addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (b.phase !== "player") return;
        b.selectedUnitId = isAct ? null : u.id;
        b.mode = "normal";
        if (!isAct) centerCameraOnUnit(u);
        addBattleLog(isAct ? `Ordens de ${u.name} recolhidas.` : `Operacional selecionado: ${u.name}.`);
        renderBattle();
      });
      squadBar.appendChild(chip);
    });
  }
  const selUnit = getSelectedUnit();
  const selEnemy = getSelectedEnemy();

  let isoMetrics = null;
  if (canvas) {
    const m = getIsoMetrics(canvas);
    isoMetrics = m;
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(m.w * dpr) || canvas.height !== Math.round(m.h * dpr)) {
      canvas.width = Math.round(m.w * dpr);
      canvas.height = Math.round(m.h * dpr);
    }

    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, m.w, m.h);

    ctx.fillStyle = "rgba(78, 242, 161, 0.82)";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`ISO 2:1 · ARRASTA [${b.camera.x + 1}..${b.camera.x + ISO_VIEW_W}, ${b.camera.y + 1}..${b.camera.y + ISO_VIEW_H}]`, 10, 14);

    drawIsoBoardSkirt(ctx, b, m);

    const maxMoveRange = getUnitMoveRange(selUnit);

    // 1. Losangos do chão isométrico ordenados por profundidade (x + y)
    for (let sum = 0; sum <= ISO_VIEW_W + ISO_VIEW_H - 2; sum++) {
      for (let vy = 0; vy < ISO_VIEW_H; vy++) {
        const vx = sum - vy;
        if (vx < 0 || vx >= ISO_VIEW_W) continue;
        const gx = b.camera.x + vx;
        const gy = b.camera.y + vy;
        const { sx, sy } = worldToIso(gx, gy, b, m);

        const tileType = b.grid[gy][gx];
        const unitHere = b.units.find((u) => u.x === gx && u.y === gy && u.hp > 0);
        const enemyHere = b.enemies.find((e) => e.x === gx && e.y === gy && e.hp > 0);
        const smokeHere = isInSmoke(b, gx, gy);

        const distFromSel = selUnit ? Math.abs(selUnit.x - gx) + Math.abs(selUnit.y - gy) : 99;
        const canMoveHere =
          b.phase === "player" &&
          (b.mode === "move" || b.mode === "normal") &&
          selUnit &&
          selUnit.ap >= 1 &&
          !unitHere &&
          !enemyHere &&
          tileType !== 3 &&
          distFromSel > 0 &&
          distFromSel <= maxMoveRange;

        const isAlt = (gx + gy) % 2 === 0;
        let fill = isAlt ? "rgba(28, 48, 68, 0.65)" : "rgba(18, 32, 48, 0.60)";
        let stroke = "rgba(125, 211, 252, 0.28)";

        if (canMoveHere) {
          fill = b.mode === "move" ? "rgba(78, 242, 161, 0.30)" : "rgba(78, 242, 161, 0.16)";
          stroke = "#4ef2a1";
        } else if (smokeHere) {
          fill = "rgba(203, 213, 225, 0.34)";
          stroke = "rgba(241, 245, 249, 0.62)";
        }

        drawIsoDiamond(ctx, sx, sy, m.tileW, m.tileH, fill, stroke, canMoveHere ? 1.5 : 1);

        if (canMoveHere) {
          const cCov = getTileCoverAt(b, gx, gy);
          if (cCov > 0) {
            ctx.fillStyle = cCov === 2 ? "#93c5fd" : "#fde68a";
            ctx.font = "bold 8px monospace";
            ctx.textAlign = "center";
            ctx.fillText(cCov === 2 ? "▲" : "▪", sx, sy + 2.5);
          }
        }
      }
    }

    // 2. Linha de mira entre o soldado selecionado e o alvo selecionado
    if (selUnit && selEnemy) {
      const uPos = worldToIso(selUnit.x, selUnit.y, b, m);
      const ePos = worldToIso(selEnemy.x, selEnemy.y, b, m);
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "rgba(255, 209, 102, 0.72)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(uPos.sx, uPos.sy - 8);
      ctx.lineTo(ePos.sx, ePos.sy - 8);
      ctx.stroke();
      ctx.restore();
    }

    // 3. Coberturas 3D, soldados e inimigos Xeno por profundidade
    for (let sum = 0; sum <= ISO_VIEW_W + ISO_VIEW_H - 2; sum++) {
      for (let vy = 0; vy < ISO_VIEW_H; vy++) {
        const vx = sum - vy;
        if (vx < 0 || vx >= ISO_VIEW_W) continue;
        const gx = b.camera.x + vx;
        const gy = b.camera.y + vy;
        const { sx, sy } = worldToIso(gx, gy, b, m);

        const tileType = b.grid[gy][gx];
        const unitHere = b.units.find((u) => u.x === gx && u.y === gy && u.hp > 0);
        const enemyHere = b.enemies.find((e) => e.x === gx && e.y === gy && e.hp > 0);

        if (tileType === 3) {
          drawIsoCoverBlock(ctx, sx, sy, m.tileW, m.tileH, m.wallH * 1.45, true, false);
        } else if (tileType === 2) {
          drawIsoCoverBlock(ctx, sx, sy, m.tileW, m.tileH, m.wallH * 0.95, true, false);
        } else if (tileType === 1 || tileType === 4) {
          drawIsoCoverBlock(ctx, sx, sy, m.tileW, m.tileH, m.wallH * 0.72, false, tileType === 4);
        }

        if (unitHere) {
          drawIsoSoldierSprite(ctx, sx, sy, m.tileW, m.tileH, unitHere, Boolean(selUnit && selUnit.id === unitHere.id));
        }

        if (enemyHere) {
          drawIsoAlienSprite(ctx, sx, sy, m.tileW, m.tileH, enemyHere, Boolean(selEnemy && selEnemy.id === enemyHere.id));
        }
      }
    }

    ctx.restore();
  }

  renderFloatingUnitOrders(b, selUnit, canvas, isoMetrics);

  const setText = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  const ordersPanel = document.querySelector("#tactical .battle-side .side-panel:nth-of-type(3)");
  if (ordersPanel) {
    ordersPanel.style.display = "none";
  }
  ensureEndTurnVisible(b);

  if (selUnit) {
    const maxMove = getUnitMoveRange(selUnit);
    const postureName = selUnit.crouched ? "AGACHADO (CAUTELOSO)" : "DE PÉ (CORRER)";
    setText("selected-unit", `${selUnit.name} (${selUnit.role}) · ${postureName}`);
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
      centerCameraOnUnit(unitHere);
      addBattleLog(`Operacional selecionado: ${unitHere.name} (${unitHere.crouched ? "Agachado/Cauteloso: 2" : "Em pé/Correr: 4"}).`);
    }
    renderBattle();
    return;
  }

  if (selUnit && selUnit.ap >= 1 && b.grid[y][x] !== 3) {
    const dist = Math.abs(selUnit.x - x) + Math.abs(selUnit.y - y);
    const maxStep = getUnitMoveRange(selUnit);
    if (dist > 0 && dist <= maxStep) {
      const moveType = selUnit.crouched ? "avançou cautelosamente" : "correu";
      selUnit.x = x;
      selUnit.y = y;
      selUnit.ap -= 1;
      selUnit.hunker = false;
      selUnit.stunned = false;
      if (b.mode === "move") b.mode = "normal";
      centerCameraOnUnit(selUnit);
      addBattleLog(`${selUnit.name} ${moveType} para (${x + 1},${y + 1}).`);
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

      if (b.grid[cy][cx] === 1 || b.grid[cy][cx] === 4) {
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

    setTacticalViewportLock(false);
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
    setTacticalViewportLock(false);
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
      setTacticalViewportLock(false);
      state.metrics.threat = Math.min(100, state.metrics.threat + 6);
      saveState();
      goToScreen("command");
    });
  }
});
