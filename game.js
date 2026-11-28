// ============================================================================
// OPERATION ZERO — TACTICAL COMMAND SYSTEM (game.js)
// Compatível com index.html, 12 Operacionais, Base ZERO, Combate 14x12,
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
    objective: "Estabilizar os 2 colegas reféns na floresta e eliminar a patrulha alienígena.",
    secondaryObjective: "Resgatar ambos os colegas sem baixas no esquadrão.",
    enemies: ["scout", "swarm", "scout", "stalker", "swarm", "scout"],
    rewards: { credits: 420, materials: 25, alien: 1, research: 12, xp: 45 },
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

function syncTacticalHostParent(active) {
  const tac = document.getElementById("tactical");
  if (!tac) return;
  if (active) {
    if (!tac.__ozOriginalParent && tac.parentElement) {
      tac.__ozOriginalParent = tac.parentElement;
      tac.__ozOriginalNextSibling = tac.nextSibling;
    }
    if (tac.parentElement !== document.body) {
      document.body.appendChild(tac);
    }
  } else if (tac.__ozOriginalParent) {
    try {
      if (tac.__ozOriginalNextSibling && tac.__ozOriginalNextSibling.parentElement === tac.__ozOriginalParent) {
        tac.__ozOriginalParent.insertBefore(tac, tac.__ozOriginalNextSibling);
      } else {
        tac.__ozOriginalParent.appendChild(tac);
      }
    } catch (_) {}
  }
}

function setTacticalViewportLock(active) {
  syncTacticalHostParent(active);
  let styleEl = document.getElementById("tactical-fixed-viewport-style");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "tactical-fixed-viewport-style";
    styleEl.textContent = `
      /* === ADAPTAÇÃO RESPONSIVA 100% ECRÃ (TELEMÓVEIS + DESKTOP) === */
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        min-height: 100dvh !important;
        overflow-x: hidden !important;
        box-sizing: border-box !important;
        background: #060b11 !important;
        -webkit-text-size-adjust: 100%;
      }
      *, *::before, *::after {
        box-sizing: border-box !important;
      }
      .container, .wrap, .app, .page, main {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding-left: max(12px, env(safe-area-inset-left)) !important;
        padding-right: max(12px, env(safe-area-inset-right)) !important;
      }
      .screen.active {
        width: 100% !important;
        min-height: calc(100dvh - 54px) !important;
      }
      #oz-fullscreen-toggle-btn {
        position: fixed;
        bottom: max(12px, env(safe-area-inset-bottom));
        right: max(12px, env(safe-area-inset-right));
        z-index: 9998;
        background: rgba(11, 20, 31, 0.92);
        color: #4ef2a1;
        border: 1px solid rgba(78, 242, 161, 0.55);
        border-radius: 999px;
        padding: 8px 13px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: clamp(0.72rem, 2.4vw, 0.82rem);
        font-weight: 800;
        letter-spacing: 0.5px;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.65);
        
      }
      body.tactical-locked #oz-fullscreen-toggle-btn {
        display: none !important;
      }

      /* === MODO TÁTICO FULL-VIEWPORT (SEM ESPAÇOS PRETOS NEM SCROLL) === */
      html.tactical-locked, body.tactical-locked {
        overflow: hidden !important;
        overscroll-behavior: none !important;
        height: 100dvh !important;
        width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
        position: relative !important;
        inset: 0 !important;
      }
      body.tactical-locked > header,
      body.tactical-locked .topbar,
      body.tactical-locked .app-header {
        display: none !important;
      }
      html.tactical-locked #tactical,
      html.tactical-locked #tactical.active,
      body.tactical-locked #tactical,
      body.tactical-locked #tactical.active,
      #tactical.active {
        position: relative !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        height: 100dvh !important;
        max-width: 100vw !important;
        max-height: 100dvh !important;
        overflow: hidden !important;
        overscroll-behavior: none !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: stretch !important;
        padding: 0 !important;
        margin: 0 !important;
        background: #060b11 !important;
        z-index: 9999 !important;
      }
      html.tactical-locked .container,
      html.tactical-locked .wrap,
      html.tactical-locked .app,
      html.tactical-locked .page,
      html.tactical-locked main,
      body.tactical-locked .container,
      body.tactical-locked .wrap,
      body.tactical-locked .app,
      body.tactical-locked .page,
      body.tactical-locked main {
        position: static !important;
        max-width: none !important;
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      #tactical.active .battle-top,
      #tactical.active .battle-info,
      #tactical.active .section-head,
      #tactical.active .battle-header,
      #tactical.active .tactical-header {
        display: none !important;
      }
      body.tactical-locked > *:not(#tactical):not(#modal) {
        display: none !important;
      }
      #tactical.active .battle-main {
        flex: 1 1 auto !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        position: relative !important;
      }
      #tactical.active #oz-iso-stage {
        flex: 1 1 100% !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        border-radius: 0 !important;
      }
      #tactical.active #iso-battle-canvas {
        width: 100% !important;
        height: 100% !important;
        display: block !important;
      }
      #tactical.active .battle-side {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
        gap: 4px !important;
        padding: 4px max(6px, env(safe-area-inset-right)) max(5px, env(safe-area-inset-bottom)) max(6px, env(safe-area-inset-left)) !important;
        background: linear-gradient(180deg, rgba(11, 20, 30, 0.94) 0%, rgba(7, 13, 21, 0.98) 100%) !important;
        border-top: 1px solid rgba(78, 242, 161, 0.34) !important;
        flex: 0 0 auto !important;
        width: 100% !important;
        max-width: 100% !important;
        overflow: hidden !important;
        z-index: 20 !important;
      }
      #tactical.active #battle-log {
        display: block !important;
        grid-column: 1 / -1 !important;
        background: rgba(10, 18, 27, 0.88) !important;
        border: 1px solid rgba(148, 163, 184, 0.2) !important;
        border-left: 3px solid #4ef2a1 !important;
        border-radius: 6px !important;
        padding: 4px 8px !important;
        margin: 0 !important;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        font-size: clamp(0.7rem, 2.2vw, 0.82rem) !important;
        line-height: 1.2 !important;
        color: #e2e8f0 !important;
        min-height: 1.5em !important;
        max-height: 2.5em !important;
        overflow-y: auto !important;
        word-break: break-word !important;
      }
      #tactical.active .battle-side .side-panel {
        background: rgba(11, 18, 27, 0.97) !important;
        border: 1px solid rgba(148, 163, 184, 0.26) !important;
        border-radius: 7px !important;
        padding: 6px 9px !important;
        margin: 0 !important;
        min-width: 0 !important;
        max-width: 100% !important;
        overflow: hidden !important;
        font-size: 0 !important;
        line-height: 1.22 !important;
      }
      #tactical.active .battle-side .side-panel:nth-of-type(3) {
        display: none !important;
      }
      #tactical.active #selected-unit,
      #tactical.active #target-info {
        font-size: clamp(0.75rem, 2.5vw, 0.9rem) !important;
        font-weight: 800 !important;
        line-height: 1.2 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        display: block !important;
        margin-bottom: 3px !important;
      }
      #tactical.active #unit-hp,
      #tactical.active #unit-ap,
      #tactical.active #unit-ammo,
      #tactical.active #hit-chance {
        font-size: clamp(0.68rem, 2.2vw, 0.8rem) !important;
        line-height: 1.22 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        display: inline !important;
      }
      #tactical.active #unit-ap::before,
      #tactical.active #unit-ammo::before {
        content: " · " !important;
        color: rgba(148, 163, 184, 0.65) !important;
      }
      #tactical.active #oz-bottom-actions {
        grid-column: 1 / -1 !important;
        display: grid !important;
        grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr) !important;
        gap: 8px !important;
        margin-top: 2px !important;
        min-width: 0 !important;
      }
      #tactical.active #end-turn {
        background: #a3e635 !important;
        color: #071108 !important;
        border: none !important;
        border-radius: 7px !important;
        padding: clamp(9px, 2.2vh, 12px) 12px !important;
        font-size: clamp(0.8rem, 2.6vw, 0.95rem) !important;
        font-weight: 800 !important;
        letter-spacing: 0.5px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        cursor: pointer !important;
      }
      #tactical.active #retreat {
        background: #17202a !important;
        color: #e2e8f0 !important;
        border: 1px solid rgba(148, 163, 184, 0.32) !important;
        border-radius: 7px !important;
        padding: clamp(9px, 2.2vh, 12px) 10px !important;
        font-size: clamp(0.76rem, 2.4vw, 0.88rem) !important;
        font-weight: 700 !important;
        line-height: 1.15 !important;
        letter-spacing: 0.4px !important;
        cursor: pointer !important;
      }
      #tactical.active #battle-grid {
        touch-action: none !important;
        user-select: none !important;
        -webkit-user-select: none !important;
      }

      /* === LAYOUT DESKTOP / ECRÃS LARGOS (>= 900px) === */
      @media (min-width: 900px) {
        #tactical.active .battle-side {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(240px, 0.95fr) !important;
          align-items: center !important;
          padding: 8px 16px 10px 16px !important;
        }
        #tactical.active #battle-log {
          grid-column: 1 / -1 !important;
          max-height: 2.8em !important;
        }
        #tactical.active #oz-bottom-actions {
          grid-column: auto !important;
          margin-top: 0 !important;
        }
      }
    `;
    document.head.appendChild(styleEl);
  }
  document.documentElement.classList.toggle("tactical-locked", Boolean(active));
  document.body.classList.toggle("tactical-locked", Boolean(active));
  const tac = document.getElementById("tactical");
  if (tac) {
    if (active) {
      tac.style.setProperty("position", "fixed", "important");
      tac.style.setProperty("inset", "0", "important");
      tac.style.setProperty("width", "100vw", "important");
      tac.style.setProperty("height", "100dvh", "important");
      tac.style.setProperty("max-height", "100dvh", "important");
      tac.style.setProperty("margin", "0", "important");
      tac.style.setProperty("padding", "0", "important");
      tac.style.setProperty("z-index", "9999", "important");
    } else {
      tac.style.removeProperty("position");
      tac.style.removeProperty("inset");
      tac.style.removeProperty("width");
      tac.style.removeProperty("height");
      tac.style.removeProperty("max-height");
      tac.style.removeProperty("margin");
      tac.style.removeProperty("padding");
      tac.style.removeProperty("z-index");
    }
  }
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
  if (screenId === "tactical") {
    try { window.scrollTo(0, 0); } catch (_) {}
    if (state.battle) renderBattle();
  }
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

const GRID_W = 14;
const GRID_H = 12;
const ISO_VIEW_W = GRID_W;
const ISO_VIEW_H = GRID_H;

function createMissionMap(missionIndex) {
  const grid = Array.from({ length: GRID_H }, () => Array(GRID_W).fill(0));

  if (missionIndex === 0) {
    // --- MISSÃO 01: FLORESTA COM 3 ROTAS INTERLIGADAS POR LIGAÇÕES TRANSVERSAIS ---
    // Divisória Norte <-> Centro (y = 3): ligações abertas em x=4,5 (ravina) e x=9,10 (passagem rochosa)
    [2, 3, 6, 7, 8, 11].forEach((x) => { grid[3][x] = 3; });

    // Divisória Centro <-> Sul (y = 8): ligações abertas em x=4,5 (trilho da mata) e x=10,11 (clareira lateral)
    [2, 3, 6, 7, 8, 9].forEach((x) => { grid[8][x] = 3; });

    // --- ROTA NORTE (y = 1..2): CUMEADA ROCHOSA (cobertura pesada e linhas de tiro longas) ---
    grid[1][3] = 2;
    grid[2][5] = 1;
    grid[1][7] = 2;
    grid[2][9] = 2;
    grid[1][11] = 1;

    // --- ROTA CENTRAL (y = 5..6): CLAREIRA DA EXPLOSÃO (destroços, troncos e caixotes inflamáveis) ---
    grid[5][3] = 1;
    grid[6][4] = 4;
    grid[5][6] = 4;
    grid[6][7] = 2;
    grid[5][8] = 4;
    grid[6][10] = 1;
    grid[5][11] = 2;

    // --- ROTA SUL (y = 9..10): MATA DENSA E RIACHO (avanço furtivo e flanqueamento) ---
    grid[10][3] = 1;
    grid[9][5] = 1;
    grid[10][7] = 2;
    grid[9][9] = 1;
    grid[10][11] = 1;

    // Cobertura tática junto às ligações entre caminhos para trocas de rota seguras
    grid[4][4] = 1;
    grid[4][9] = 1;
    grid[7][5] = 1;
    grid[7][10] = 1;

    return grid;
  }

  // Restantes missões escaladas para 14x12
  grid[2][4] = 4;
  grid[3][4] = 1;
  grid[4][4] = 2;
  grid[6][4] = 1;
  grid[7][4] = 4;
  grid[9][4] = 1;

  grid[3][7] = 2;
  grid[5][7] = 4;
  grid[6][7] = 4;
  grid[8][7] = 2;

  grid[0][6] = 3;
  grid[11][6] = 3;

  if (missionIndex >= 2) {
    grid[2][9] = 3;
    grid[9][9] = 3;
    grid[5][6] = 1;
  }
  if (missionIndex >= 5) {
    grid[5][9] = 2;
    grid[6][9] = 2;
    grid[3][6] = 4;
    grid[8][6] = 4;
  }
  if (missionIndex >= 8) {
    grid[1][9] = 2;
    grid[10][9] = 2;
    grid[2][6] = 1;
    grid[9][6] = 1;
  }

  return grid;
}

function createMissionElevation(missionIndex, grid) {
  const elev = Array.from({ length: GRID_H }, () => Array(GRID_W).fill(0));
  if (missionIndex === 0) {
    // Cumeada Norte elevada (nível 1) e plataforma de vigia rochosa (nível 2)
    for (let y = 0; y <= 2; y++) {
      for (let x = 2; x <= 12; x++) {
        elev[y][x] = 1;
      }
    }
    elev[1][6] = 2;
    elev[1][7] = 2;
    elev[1][8] = 2;
    // Pequeno platô tático a Sudeste
    for (let y = 9; y <= 10; y++) {
      for (let x = 10; x <= 12; x++) {
        elev[y][x] = 1;
      }
    }
  } else {
    // Plataformas elevadas táticas nos flancos
    for (let y = 1; y <= 3; y++) {
      for (let x = 4; x <= 8; x++) {
        if (grid[y][x] !== 3) elev[y][x] = 1;
      }
    }
    for (let y = 8; y <= 10; y++) {
      for (let x = 6; x <= 10; x++) {
        if (grid[y][x] !== 3) elev[y][x] = 1;
      }
    }
    if (missionIndex >= 4) {
      elev[2][6] = 2;
      elev[9][8] = 2;
    }
  }
  return elev;
}

function getTileElevation(battle, gx, gy) {
  if (!battle || !battle.elevation) return 0;
  if (gy < 0 || gy >= GRID_H || gx < 0 || gx >= GRID_W) return 0;
  return battle.elevation[gy][gx] || 0;
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
  const startPositions = missionIndex === 0
    ? [
        [0, 4], [1, 3], [0, 6], [2, 2], [1, 5]
      ]
    : [
        [0, 2], [0, 4], [0, 6], [0, 8], [1, 5]
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

  const enemyPositions = missionIndex === 0
    ? [
        [8, 1],   // Scout a vigiar a Cumeada Norte
        [7, 5],   // Swarm na Clareira Central (explosão)
        [9, 6],   // Scout na retaguarda da Clareira
        [10, 4],  // Stalker a guardar a ligação Norte <-> Centro
        [8, 10],  // Swarm na Mata Sul
        [12, 7]   // Scout de reforço na ligação Centro <-> Sul
      ]
    : [
        [10, 2], [11, 4], [10, 6], [12, 8], [11, 10], [12, 5]
      ];

  const enemies = mission.enemies.map((archId, idx) => {
    const arch = ENEMY_ARCHETYPES[archId] || ENEMY_ARCHETYPES.scout;
    const pos = enemyPositions[idx] || [10, idx % GRID_H];
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

  const hostages = missionIndex === 0
    ? [
        {
          id: "hostage-01",
          name: "CABO RUI SANTOS",
          role: "Reconhecimento",
          x: 6,
          y: 5,
          hp: 65,
          maxHp: 85,
          aim: 78,
          rescued: false
        },
        {
          id: "hostage-02",
          name: "TEN. SARA LOPES",
          role: "Médico",
          x: 9,
          y: 10,
          hp: 70,
          maxHp: 90,
          aim: 75,
          rescued: false
        }
      ]
    : [];

  state.battle = {
    mission,
    missionIndex,
    turn: 1,
    phase: "player",
    mode: "normal",
    camera: missionIndex === 0 ? { x: 0, y: 3 } : { x: 2, y: 2 },
    zoom: 1.72,
    targetZoom: 1.72,
    panX: 155,
    panY: -44,
    targetPanX: 155,
    targetPanY: -44,
    hoveredEnemyId: null,
    grid: createMissionMap(missionIndex),
    elevation: null,
    vfxQueue: [],
    smokes: [],
    hoverTile: null,
    units,
    enemies,
    hostages,
    selectedUnitId: null,
    selectedTargetId: enemies[0] ? enemies[0].id : null,
    log: missionIndex === 0
      ? `Missão 01: Primeiro Contacto (14x12) — Explora as 3 rotas da floresta e aproxima-te dos 2 colegas [SOS] para os resgatar!`
      : `Missão ${formatMissionNumber(mission.number)}: ${mission.title} — Toca num operacional para abrir as ordens flutuantes ou arrasta o plano isométrico.`
  };

  state.battle.elevation = createMissionElevation(missionIndex, state.battle.grid);
  goToScreen("tactical");
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

function hideFloatingOrdersNow() {
  const pop = document.getElementById("floating-unit-orders");
  if (pop) {
    pop.style.setProperty("display", "none", "important");
  }
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
  if (b.mode === "move") {
    b.mode = "normal";
    b.ordersMinimized = false;
    addBattleLog("Modo de movimento cancelado.");
  } else {
    b.mode = "move";
    b.ordersMinimized = true;
    hideFloatingOrdersNow();
    const range = getUnitMoveRange(unit);
    const stanceTxt = unit.crouched ? "agachado/cauteloso" : "de pé/corrida";
    addBattleLog(
      `Modo MOVER ativo (${stanceTxt}, alcance ${range} casas): toca num losango verde no mapa.`
    );
  }
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
  const canvas = document.getElementById("iso-battle-canvas");
  if (!canvas) return;
  const m = getIsoMetrics(canvas, true);
  // Posição relativa ao centro do ecrã para manter a unidade em destaque na área útil
  const isoX = (unit.x - unit.y) * (m.tileW * 0.5);
  const isoY = (unit.x + unit.y) * (m.tileH * 0.5) - getTileElevation(b, unit.x, unit.y) * getElevationStepPx(m);
  const desiredOriginX = m.w * 0.52 - isoX;
  const desiredOriginY = m.h * 0.44 - isoY;
  b.targetPanX = desiredOriginX - m.baseOriginX;
  b.targetPanY = desiredOriginY - m.baseOriginY;
  clampBattlePan(b, m);
  ensureSmoothCameraLoop();
}

let ozSmoothCamActive = false;
function ensureSmoothCameraLoop() {
  if (ozSmoothCamActive) return;
  ozSmoothCamActive = true;
  const tick = () => {
    const b = state.battle;
    if (!b) {
      ozSmoothCamActive = false;
      return;
    }
    const curZ = getBattleZoom(b);
    const tgtZ = typeof b.targetZoom === "number" ? b.targetZoom : curZ;
    const curPx = typeof b.panX === "number" ? b.panX : 0;
    const curPy = typeof b.panY === "number" ? b.panY : 0;
    const tgtPx = typeof b.targetPanX === "number" ? b.targetPanX : curPx;
    const tgtPy = typeof b.targetPanY === "number" ? b.targetPanY : curPy;

    const dz = tgtZ - curZ;
    const dpx = tgtPx - curPx;
    const dpy = tgtPy - curPy;

    if (Math.abs(dz) < 0.002 && Math.abs(dpx) < 0.5 && Math.abs(dpy) < 0.5) {
      b.zoom = tgtZ;
      b.panX = tgtPx;
      b.panY = tgtPy;
      ozSmoothCamActive = false;
      renderBattle();
      return;
    }

    b.zoom = curZ + dz * 0.22;
    b.panX = curPx + dpx * 0.22;
    b.panY = curPy + dpy * 0.22;
    renderBattle();
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
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

  // Vantagem de altitude 2.5D (terreno elevado dá +8% por nível)
  const elevDiff = getTileElevation(battle, unit.x, unit.y) - getTileElevation(battle, target.x, target.y);
  if (elevDiff > 0) chance += Math.min(16, elevDiff * 8);
  else if (elevDiff < 0) chance += Math.max(-10, elevDiff * 5);

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
  const liveLogEl = document.getElementById("iso-live-log");
  if (liveLogEl) liveLogEl.textContent = msg;
}

// --- GEOMETRIA ISOMÉTRICA XCOM (2:1) ---

function getBattleZoom(battle) {
  if (!battle || typeof battle.zoom !== "number" || Number.isNaN(battle.zoom)) return 1.72;
  return Math.max(1.18, Math.min(3.2, battle.zoom));
}

function clampBattlePan(battle, m) {
  if (!battle || !m) return;
  const z = getBattleZoom(battle);
  const span = GRID_W + GRID_H;
  const boardW = span * (m.tileW * 0.5) * z;
  const boardH = span * (m.tileH * 0.5) * z;
  const marginX = Math.max(140, m.w * 0.45);
  const marginY = Math.max(110, m.h * 0.38);

  const minPanX = Math.min(-marginX, (m.w - boardW) - marginX);
  const maxPanX = Math.max(marginX, (m.w - boardW) + marginX);
  const minPanY = Math.min(-marginY, (m.h - boardH) - marginY);
  const maxPanY = Math.max(marginY, (m.h - boardH) + marginY);

  if (typeof battle.panX !== "number" || Number.isNaN(battle.panX)) battle.panX = 0;
  if (typeof battle.panY !== "number" || Number.isNaN(battle.panY)) battle.panY = 0;

  if (minPanX <= maxPanX) {
    battle.panX = Math.max(minPanX, Math.min(maxPanX, battle.panX));
  }
  if (minPanY <= maxPanY) {
    battle.panY = Math.max(minPanY, Math.min(maxPanY, battle.panY));
  }
}

function setBattleZoom(deltaOrFactor, anchorPx = null, anchorPy = null) {
  const b = state.battle;
  if (!b) return;
  const canvas = document.getElementById("iso-battle-canvas");
  const m = canvas ? getIsoMetrics(canvas, true) : null;
  const oldZoom = getBattleZoom(b);
  let nextZoom = typeof deltaOrFactor === "number" && deltaOrFactor < 0.25 && deltaOrFactor > -0.25
    ? oldZoom + deltaOrFactor
    : deltaOrFactor;
  nextZoom = Math.max(0.85, Math.min(2.8, Number(nextZoom.toFixed(2))));
  if (nextZoom === oldZoom) return;

  if (m) {
    const ax = typeof anchorPx === "number" ? anchorPx : m.w * 0.5;
    const ay = typeof anchorPy === "number" ? anchorPy : m.h * 0.48;
    const baseOrigX = m.baseOriginX + (b.panX || 0);
    const baseOrigY = m.baseOriginY + (b.panY || 0);
    const ratio = nextZoom / oldZoom;
    const newOrigX = ax - (ax - baseOrigX) * ratio;
    const newOrigY = ay - (ay - baseOrigY) * ratio;
    b.panX = newOrigX - m.baseOriginX;
    b.panY = newOrigY - m.baseOriginY;
  }

  b.targetZoom = nextZoom;
  b.targetPanX = b.panX - m.baseOriginX;
  b.targetPanY = b.panY - m.baseOriginY;
  // Atualizar âncora suave para o ponto de zoom
  const ax = typeof anchorPx === "number" ? anchorPx : m.w * 0.5;
  const ay = typeof anchorPy === "number" ? anchorPy : m.h * 0.48;
  const baseOrigX = m.baseOriginX + (b.panX || 0);
  const baseOrigY = m.baseOriginY + (b.panY || 0);
  const ratio = nextZoom / oldZoom;
  b.targetPanX = (ax - (ax - baseOrigX) * ratio) - m.baseOriginX;
  b.targetPanY = (ay - (ay - baseOrigY) * ratio) - m.baseOriginY;
  if (m) clampBattlePan(b, { ...m, panX: b.targetPanX, panY: b.targetPanY });
  ensureSmoothCameraLoop();
}

function resetBattleView() {
  const b = state.battle;
  if (!b) return;
  const sel = getSelectedUnit();
  if (sel) {
    b.targetZoom = 1.76;
    centerCameraOnUnit(sel);
    return;
  }
  b.targetZoom = 1.72;
  b.targetPanX = 155;
  b.targetPanY = -44;
  ensureSmoothCameraLoop();
}

function getIsoMetrics(canvas, ignoreBattlePan = false) {
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(280, rect.width || canvas.parentElement?.clientWidth || window.innerWidth || 360);
  const h = Math.max(220, rect.height || canvas.parentElement?.clientHeight || window.innerHeight || 420);

  const b = state.battle;
  const zoom = getBattleZoom(b);

  const span = GRID_W + GRID_H;
  const isLandscape = w > h;
  // Escala ampliada e adaptada ao ecrã vertical (portrait) para focar o campo de batalha próximo
  const portraitBoost = isLandscape ? 1.0 : 1.18;
  const maxTileWByWidth = Math.floor((w * 2.95 * portraitBoost) / span);
  const maxTileWByHeight = Math.floor((h * 5.65) / span);
  const upperCap = isLandscape ? 156 : 136;
  const baseTileW = Math.max(36, Math.min(upperCap, Math.min(maxTileWByWidth, maxTileWByHeight)));
  const tileW = Math.max(32, baseTileW * zoom);
  // Perspetiva isométrica 2.5D cinematográfica estilo XCOM 2
  const tileH = Math.max(13, tileW * 0.40);
  const wallH = Math.max(12, tileH * 1.05);

  const boardPixelH = span * tileH * 0.5;
  const baseOriginX = w * 0.5 + (GRID_H - GRID_W) * (tileW * 0.25);
  const topOffset = isLandscape ? 24 : 30;
  const baseOriginY = Math.max(topOffset, Math.round((h - boardPixelH) * 0.5));

  const panX = (!ignoreBattlePan && b && typeof b.panX === "number") ? b.panX : 0;
  const panY = (!ignoreBattlePan && b && typeof b.panY === "number") ? b.panY : 0;

  return {
    w,
    h,
    zoom,
    tileW,
    tileH,
    wallH,
    baseOriginX,
    baseOriginY,
    originX: baseOriginX + panX,
    originY: baseOriginY + panY
  };
}

function getElevationStepPx(m) {
  return Math.max(6, Math.round(m.tileH * 0.42));
}

function worldToIso(gx, gy, battle, m, elevOverride = null) {
  const elev = elevOverride !== null ? elevOverride : getTileElevation(battle, gx, gy);
  const elevOffset = elev * getElevationStepPx(m);
  return {
    sx: m.originX + (gx - gy) * (m.tileW * 0.5),
    sy: m.originY + (gx + gy) * (m.tileH * 0.5) - elevOffset,
    baseSy: m.originY + (gx + gy) * (m.tileH * 0.5),
    elev
  };
}

function isoToWorld(px, py, battle, m) {
  const hw = m.tileW * 0.5;
  const hh = m.tileH * 0.5;
  // Picking 2.5D: verifica primeiro os níveis mais altos para que cliques em plataformas elevadas sejam exatos
  for (let testElev = 2; testElev >= 0; testElev--) {
    const adjustedPy = py + testElev * getElevationStepPx(m);
    const u = (px - m.originX) / hw;
    const v = (adjustedPy - m.originY) / hh;
    const gx = Math.floor((u + v) * 0.5 + 0.5);
    const gy = Math.floor((v - u) * 0.5 + 0.5);
    if (gx >= 0 && gx < GRID_W && gy >= 0 && gy < GRID_H) {
      if (getTileElevation(battle, gx, gy) === testElev) {
        return { x: gx, y: gy };
      }
    }
  }
  const u = (px - m.originX) / hw;
  const v = (py - m.originY) / hh;
  const gx = Math.floor((u + v) * 0.5 + 0.5);
  const gy = Math.floor((v - u) * 0.5 + 0.5);
  if (gx < 0 || gx >= GRID_W || gy < 0 || gy >= GRID_H) return null;
  return { x: gx, y: gy };
}

function spawnBattleVfx(vfx) {
  const b = state.battle;
  if (!b) return;
  if (!Array.isArray(b.vfxQueue)) b.vfxQueue = [];
  b.vfxQueue.push({
    ...vfx,
    createdAt: performance.now(),
    duration: vfx.duration || 520
  });
  ensureVfxAnimationLoop();
}

let ozVfxLoopActive = false;
function ensureVfxAnimationLoop() {
  if (ozVfxLoopActive) return;
  ozVfxLoopActive = true;
  const step = () => {
    const b = state.battle;
    if (!b || !Array.isArray(b.vfxQueue) || b.vfxQueue.length === 0) {
      ozVfxLoopActive = false;
      return;
    }
    const now = performance.now();
    b.vfxQueue = b.vfxQueue.filter((item) => now - item.createdAt < item.duration);
    renderBattle();
    if (b.vfxQueue.length > 0) {
      requestAnimationFrame(step);
    } else {
      ozVfxLoopActive = false;
    }
  };
  requestAnimationFrame(step);
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

function getCellTerrainSurface(battle, gx, gy) {
  const mIdx = battle ? battle.missionIndex : 0;
  // Missão 01: Ambiente florestal com trilho central de terra batida, estrada tática e clareira
  if (mIdx === 0) {
    if (gy === 5 || gy === 6) return "dirt_road";
    if ((gx === 4 || gx === 5 || gx === 9 || gx === 10) && gy >= 2 && gy <= 10) return "dirt_path";
    if (gy <= 2) return "rock_ridge";
    return "forest_ground";
  }
  // Missões urbanas / base militar: estrada asfaltada, passeios de betão e pátio tático
  if (gy === 5 || gy === 6) return "asphalt_road";
  if (gy === 4 || gy === 7) return "concrete_sidewalk";
  if ((gx === 4 || gx === 8) && gy >= 1 && gy <= 10) return "asphalt_road";
  return mIdx >= 6 ? "industrial_yard" : "tactical_earth";
}

function getCoverSnapOffset(battle, gx, gy, w, h) {
  if (!battle || !battle.grid) return { ox: 0, oy: 0, coverLevel: 0 };
  const dirs = [
    { dx: 1, dy: 0, ox: w * 0.13, oy: h * 0.13 },
    { dx: 0, dy: 1, ox: -w * 0.13, oy: h * 0.13 },
    { dx: -1, dy: 0, ox: -w * 0.13, oy: -h * 0.13 },
    { dx: 0, dy: -1, ox: w * 0.13, oy: -h * 0.13 }
  ];
  let best = { ox: 0, oy: 0, coverLevel: 0 };
  for (const d of dirs) {
    const nx = gx + d.dx;
    const ny = gy + d.dy;
    if (nx >= 0 && nx < GRID_W && ny >= 0 && ny < GRID_H) {
      const t = battle.grid[ny][nx];
      const lvl = (t === 2 || t === 3) ? 2 : (t === 1 || t === 4) ? 1 : 0;
      if (lvl > best.coverLevel) {
        best = { ox: d.ox, oy: d.oy, coverLevel: lvl };
      }
    }
  }
  return best;
}

function drawCoverShieldBadge(ctx, sx, sy, coverLevel, isSelected) {
  if (!coverLevel) return;
  const r = 6.2;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(sx, sy - r);
  ctx.lineTo(sx + r * 0.86, sy - r * 0.45);
  ctx.lineTo(sx + r * 0.72, sy + r * 0.55);
  ctx.lineTo(sx, sy + r);
  ctx.lineTo(sx - r * 0.72, sy + r * 0.55);
  ctx.lineTo(sx - r * 0.86, sy - r * 0.45);
  ctx.closePath();

  ctx.fillStyle = isSelected ? "rgba(15, 23, 42, 0.92)" : "rgba(15, 23, 42, 0.78)";
  ctx.fill();
  ctx.strokeStyle = isSelected ? "#4ef2a1" : "#38bdf8";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  if (coverLevel === 2) {
    // Escudo cheio (cobertura alta)
    ctx.fillStyle = isSelected ? "#4ef2a1" : "#38bdf8";
    ctx.fill();
  } else {
    // Meio-escudo (cobertura baixa)
    ctx.beginPath();
    ctx.moveTo(sx, sy - r + 1.2);
    ctx.lineTo(sx + r * 0.75, sy - r * 0.4);
    ctx.lineTo(sx + r * 0.62, sy + r * 0.45);
    ctx.lineTo(sx, sy + r - 1.2);
    ctx.closePath();
    ctx.fillStyle = isSelected ? "#4ef2a1" : "#38bdf8";
    ctx.fill();
  }
  ctx.restore();
}

function drawTacticalCornerBrackets(ctx, sx, sy, w, h, color, lw = 1.6) {
  const hw = w * 0.46;
  const hh = h * 0.46;
  const seg = 0.24;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.lineCap = "round";

  // Topo
  ctx.beginPath();
  ctx.moveTo(sx - hw * seg, sy - hh * (1 - seg));
  ctx.lineTo(sx, sy - hh);
  ctx.lineTo(sx + hw * seg, sy - hh * (1 - seg));
  // Direita
  ctx.moveTo(sx + hw * (1 - seg), sy - hh * seg);
  ctx.lineTo(sx + hw, sy);
  ctx.lineTo(sx + hw * (1 - seg), sy + hh * seg);
  // Base
  ctx.moveTo(sx + hw * seg, sy + hh * (1 - seg));
  ctx.lineTo(sx, sy + hh);
  ctx.lineTo(sx - hw * seg, sy + hh * (1 - seg));
  // Esquerda
  ctx.moveTo(sx - hw * (1 - seg), sy + hh * seg);
  ctx.lineTo(sx - hw, sy);
  ctx.lineTo(sx - hw * (1 - seg), sy - hh * seg);
  ctx.stroke();
  ctx.restore();
}

function drawContinuousTerrainBackdrop(ctx, battle, m) {
  const hw = m.tileW * 0.5;
  const hh = m.tileH * 0.5;
  const pad = 7;
  const pN = worldToIso(-pad, -pad, battle, m, 0);
  const pE = worldToIso(GRID_W + pad, -pad, battle, m, 0);
  const pS = worldToIso(GRID_W + pad, GRID_H + pad, battle, m, 0);
  const pW = worldToIso(-pad, GRID_H + pad, battle, m, 0);

  const isForest = battle && battle.missionIndex === 0;
  const grad = ctx.createLinearGradient(pN.sx, pN.sy - 40, pS.sx, pS.sy + 40);
  if (isForest) {
    grad.addColorStop(0, "#16261b");
    grad.addColorStop(0.55, "#1f3223");
    grad.addColorStop(1, "#121d15");
  } else {
    grad.addColorStop(0, "#171f28");
    grad.addColorStop(0.55, "#212b36");
    grad.addColorStop(1, "#11171f");
  }

  ctx.beginPath();
  ctx.moveTo(pN.sx, pN.sy - hh);
  ctx.lineTo(pE.sx + hw, pE.sy);
  ctx.lineTo(pS.sx, pS.sy + hh);
  ctx.lineTo(pW.sx - hw, pW.sy);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
}

function drawIsoTerrainColumn(ctx, sx, sy, w, h, elev, surfaceType, gx, gy, canMoveHere, isMoveMode, smokeHere, coverAtMoveTile) {
  const hw = w * 0.5;
  const hh = h * 0.5;
  const stepPx = Math.max(7, Math.round(h * 0.48));
  const hash = ((gx * 73 + gy * 37 + (gx ^ gy) * 13) % 29);

  // Taludes/rampas naturais com sombreamento direcional onde há elevação
  if (elev > 0) {
    const depthPx = elev * stepPx;
    ctx.beginPath();
    ctx.moveTo(sx - hw, sy);
    ctx.lineTo(sx, sy + hh);
    ctx.lineTo(sx, sy + hh + depthPx);
    ctx.lineTo(sx - hw, sy + depthPx);
    ctx.closePath();
    ctx.fillStyle = surfaceType === "rock_ridge" ? "#3b3833" : "#2d353a";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sx + hw, sy);
    ctx.lineTo(sx, sy + hh);
    ctx.lineTo(sx, sy + hh + depthPx);
    ctx.lineTo(sx + hw, sy + depthPx);
    ctx.closePath();
    ctx.fillStyle = surfaceType === "rock_ridge" ? "#24221f" : "#1d2327";
    ctx.fill();
  }

  // Paleta de materiais militares coerentes com variação natural (sem contornos de grelha)
  const palette = {
    forest_ground: ["#243827", "#29402c", "#213324"],
    dirt_road: ["#4b3c2b", "#534330", "#443627"],
    dirt_path: ["#3d3427", "#443a2c", "#372f23"],
    rock_ridge: ["#3d4248", "#464c52", "#35393e"],
    asphalt_road: ["#22272f", "#272d36", "#1e232a"],
    concrete_sidewalk: ["#4a535e", "#525c68", "#424a54"],
    industrial_yard: ["#2e353e", "#353d47", "#282e36"],
    tactical_earth: ["#2b332c", "#313a32", "#262d27"]
  };
  const pair = palette[surfaceType] || palette.tactical_earth;
  const baseFill = pair[hash % pair.length];

  drawIsoDiamond(ctx, sx, sy, w + 2.2, h + 1.4, baseFill, null, 0);

  // Texturas e detalhes de terreno integrados ao solo
  if (surfaceType === "asphalt_road") {
    // Grão e fissuras discretas de asfalto
    if (hash % 4 === 0) {
      ctx.strokeStyle = "rgba(15, 23, 42, 0.45)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(sx - hw * 0.4, sy);
      ctx.lineTo(sx + hw * 0.2, sy + hh * 0.35);
      ctx.stroke();
    }
    if ((gy === 5 || gy === 6) && gx % 2 === 0) {
      ctx.strokeStyle = "rgba(226, 232, 240, 0.36)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(sx - hw * 0.32, sy - hh * 0.25);
      ctx.lineTo(sx + hw * 0.32, sy + hh * 0.25);
      ctx.stroke();
    }
  } else if (surfaceType === "concrete_sidewalk") {
    // Juntas de laje de passeio
    ctx.strokeStyle = "rgba(15, 23, 42, 0.28)";
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(sx - hw * 0.5, sy - hh * 0.5);
    ctx.lineTo(sx + hw * 0.5, sy + hh * 0.5);
    ctx.stroke();
  } else if (surfaceType === "forest_ground" || surfaceType === "tactical_earth") {
    if (hash < 7) {
      ctx.strokeStyle = surfaceType === "forest_ground" ? "rgba(116, 178, 86, 0.42)" : "rgba(148, 163, 132, 0.3)";
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(sx - 4, sy + 1);
      ctx.lineTo(sx - 6, sy - 3.5);
      ctx.moveTo(sx + 1.5, sy + 2);
      ctx.lineTo(sx + 3, sy - 3.5);
      ctx.stroke();
    }
  } else if (hash % 5 === 0) {
    ctx.fillStyle = "rgba(168, 162, 158, 0.24)";
    ctx.beginPath();
    ctx.arc(sx + 3, sy + 1, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Perspetiva atmosférica e iluminação direcional suave do topo-esquerdo para baixo-direito
  const lightAlpha = Math.max(0, 0.06 - (gx + gy) * 0.0022);
  if (lightAlpha > 0) {
    drawIsoDiamond(ctx, sx, sy, w + 1.4, h + 1.0, `rgba(226, 240, 255, ${lightAlpha.toFixed(4)})`, null, 0);
  }

  // Fumo tático
  if (smokeHere) {
    drawIsoDiamond(ctx, sx, sy, w * 0.96, h * 0.96, "rgba(203, 213, 225, 0.38)", "rgba(241, 245, 249, 0.55)", 1.0);
  }

  // Grelha oculta durante combate normal; posições de movimento apenas quando selecionado e em modo mover
  if (canMoveHere) {
    const moveFill = isMoveMode ? "rgba(56, 189, 248, 0.24)" : "rgba(78, 242, 161, 0.14)";
    const moveStroke = isMoveMode ? "rgba(125, 211, 252, 0.88)" : "rgba(78, 242, 161, 0.55)";
    drawIsoDiamond(ctx, sx, sy, w * 0.92, h * 0.92, moveFill, null, 0);
    drawTacticalCornerBrackets(ctx, sx, sy, w, h, moveStroke, isMoveMode ? 1.8 : 1.2);

    if (coverAtMoveTile > 0) {
      drawCoverShieldBadge(ctx, sx, sy - 2, coverAtMoveTile, isMoveMode);
    }
  }
}

function drawIsoBoardSkirt(ctx, battle, m) {
  drawContinuousTerrainBackdrop(ctx, battle, m);
}

function drawIsoCoverBlock(ctx, sx, sy, w, h, wallH, tileType, isForestMission = false, gx = 0, gy = 0) {
  const isBuilding = tileType === 3;
  const isContainerOrWall = tileType === 2;
  const isCrate = tileType === 4;
  const variant = ((gx * 19 + gy * 31) % 3);

  const scale = isBuilding ? 0.96 : isContainerOrWall ? 0.88 : isCrate ? 0.72 : 0.82;
  const cw = w * scale;
  const ch = h * scale;
  const chw = cw * 0.5;
  const chh = ch * 0.5;
  const effWallH = isBuilding ? wallH * 1.75 : isContainerOrWall ? wallH * 1.15 : wallH * 0.62;
  const topY = sy - effWallH;

  // Sombra projetada alongada + sombra de contacto junto à base
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(sx + w * 0.24, sy + h * 0.18, cw * 0.72, ch * 0.64, -0.22, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.36)";
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(sx, sy + h * 0.04, cw * 0.54, ch * 0.44, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.54)";
  ctx.fill();
  ctx.restore();

  // Árvores com folhagem detalhada em floresta ou vegetação militar
  if (isBuilding && isForestMission) {
    ctx.fillStyle = "#4b3828";
    ctx.fillRect(sx - chw * 0.18, sy - effWallH * 0.65, chw * 0.36, effWallH * 0.65);

    ctx.fillStyle = "#183322";
    ctx.beginPath();
    ctx.arc(sx + 2, topY + 3, cw * 0.42, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#244c32";
    ctx.beginPath();
    ctx.arc(sx - 3, topY - 2, cw * 0.35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#366b47";
    ctx.beginPath();
    ctx.arc(sx - 5, topY - 6, cw * 0.22, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  // Veículo militar destruído / ruína em algumas células de cobertura alta
  if (isContainerOrWall && variant === 2 && !isForestMission) {
    ctx.save();
    ctx.fillStyle = "#2a3129";
    ctx.strokeStyle = "#525d50";
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(sx - chw * 0.9, topY + chh * 0.3);
    ctx.lineTo(sx + chw * 0.85, topY - chh * 0.2);
    ctx.lineTo(sx + chw * 0.95, sy + chh * 0.4);
    ctx.lineTo(sx - chw * 0.8, sy + chh * 0.85);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Rodas/lagartas danificadas com sombra de contacto
    ctx.fillStyle = "#11161c";
    ctx.fillRect(sx - chw * 0.65, sy + chh * 0.15, chw * 0.36, chh * 0.55);
    ctx.fillRect(sx + chw * 0.25, sy + chh * 0.05, chw * 0.36, chh * 0.55);

    // Destroço / fumo leve
    ctx.fillStyle = "rgba(251, 146, 60, 0.28)";
    ctx.beginPath();
    ctx.arc(sx, topY + 2, chw * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  let leftCol, rightCol, topCol, borderCol;
  if (isBuilding) {
    leftCol = "#4b596b";
    rightCol = "#2f3946";
    topCol = "#6b7c93";
    borderCol = "#94a3b8";
  } else if (isContainerOrWall) {
    leftCol = "#41553c";
    rightCol = "#293726";
    topCol = "#587250";
    borderCol = "#89ae7f";
  } else if (isCrate) {
    leftCol = "#7d5832";
    rightCol = "#553b20";
    topCol = "#9e7142";
    borderCol = "#d6a874";
  } else {
    leftCol = "#59544e";
    rightCol = "#3d3935";
    topCol = "#7a746d";
    borderCol = "#a8a29e";
  }

  // Face esquerda iluminada
  ctx.beginPath();
  ctx.moveTo(sx - chw, topY);
  ctx.lineTo(sx, topY + chh);
  ctx.lineTo(sx, sy + chh);
  ctx.lineTo(sx - chw, sy);
  ctx.closePath();
  ctx.fillStyle = leftCol;
  ctx.fill();
  ctx.strokeStyle = borderCol;
  ctx.lineWidth = 1.0;
  ctx.stroke();

  // Face direita sombreada
  ctx.beginPath();
  ctx.moveTo(sx + chw, topY);
  ctx.lineTo(sx, topY + chh);
  ctx.lineTo(sx, sy + chh);
  ctx.lineTo(sx + chw, sy);
  ctx.closePath();
  ctx.fillStyle = rightCol;
  ctx.fill();
  ctx.stroke();

  if (isBuilding) {
    // Espessura de parede e ruína parcial no topo + janelas/aberturas
    const rim = Math.max(2.5, chw * 0.16);
    ctx.fillStyle = "rgba(15, 23, 42, 0.78)";
    ctx.fillRect(sx - chw * 0.72, topY + effWallH * 0.25, chw * 0.34, Math.max(3, effWallH * 0.16));
    ctx.fillRect(sx - chw * 0.72, topY + effWallH * 0.56, chw * 0.34, Math.max(3, effWallH * 0.16));
    ctx.fillRect(sx + chw * 0.32, topY + effWallH * 0.25, chw * 0.34, Math.max(3, effWallH * 0.16));

    // Topo com espessura de parede e recorte de ruína
    drawIsoDiamond(ctx, sx, topY, cw, ch, topCol, borderCol, 1.1);
    drawIsoDiamond(ctx, sx + (variant === 1 ? 2 : 0), topY + 1, Math.max(6, cw - rim * 2.4), Math.max(4, ch - rim * 2.4), "#2b333d", "rgba(148,163,184,0.45)", 0.8);
  } else if (isContainerOrWall) {
    ctx.strokeStyle = "rgba(15, 23, 15, 0.48)";
    ctx.lineWidth = 1.0;
    for (let k = 0.25; k <= 0.75; k += 0.25) {
      ctx.beginPath();
      ctx.moveTo(sx - chw * k, topY + chh * (1 - k));
      ctx.lineTo(sx - chw * k, sy + chh * (1 - k));
      ctx.stroke();
    }
    drawIsoDiamond(ctx, sx, topY, cw, ch, topCol, borderCol, 1.0);
  } else if (isCrate) {
    ctx.strokeStyle = "rgba(250, 204, 21, 0.58)";
    ctx.lineWidth = 1.15;
    ctx.beginPath();
    ctx.moveTo(sx - chw * 0.85, topY + effWallH * 0.3);
    ctx.lineTo(sx - chw * 0.15, sy - effWallH * 0.25);
    ctx.stroke();
    drawIsoDiamond(ctx, sx, topY, cw, ch, topCol, borderCol, 1.0);
  } else {
    // Muro/barreira com espessura visível no topo
    drawIsoDiamond(ctx, sx, topY, cw, ch, topCol, borderCol, 1.0);
    drawIsoDiamond(ctx, sx, topY + 1, cw * 0.76, ch * 0.76, "rgba(30, 41, 59, 0.35)", null, 0);
  }
}

function getSoldierVisualProfile(unit) {
  const profiles = {
    "op-01": {
      uniform: "#2f3d2e",
      vest: "#4b5563",
      armor: "#374151",
      helmet: "#3f4e3c",
      visor: "#38bdf8",
      pack: "#273026",
      accent: "#4ef2a1",
      weaponType: "rifle",
      helmetType: "tactical",
      bulk: 1.02,
      lean: 0.04
    },
    "op-02": {
      uniform: "#273544",
      vest: "#334155",
      armor: "#475569",
      helmet: "#2c3e50",
      visor: "#7dd3fc",
      pack: "#1e293b",
      accent: "#38bdf8",
      weaponType: "sniper",
      helmetType: "recon",
      bulk: 0.96,
      lean: 0.02
    },
    "op-03": {
      uniform: "#273e3c",
      vest: "#e2e8f0",
      armor: "#0f766e",
      helmet: "#f1f5f9",
      visor: "#2dd4bf",
      pack: "#1e3a38",
      accent: "#2dd4bf",
      weaponType: "rifle",
      helmetType: "medic",
      bulk: 1.0,
      lean: 0.03
    },
    "op-04": {
      uniform: "#3b322c",
      vest: "#57534e",
      armor: "#7c2d12",
      helmet: "#44403c",
      visor: "#fb923c",
      pack: "#292524",
      accent: "#fb923c",
      weaponType: "rifle",
      helmetType: "heavy",
      bulk: 1.08,
      lean: 0.06
    },
    "op-05": {
      uniform: "#3a3628",
      vest: "#52525b",
      armor: "#713f12",
      helmet: "#3f3f46",
      visor: "#facc15",
      pack: "#27272a",
      accent: "#facc15",
      weaponType: "heavy",
      helmetType: "heavy",
      bulk: 1.16,
      lean: 0.07
    },
    "op-06": {
      uniform: "#292538",
      vest: "#3b0764",
      armor: "#581c87",
      helmet: "#1e1b2e",
      visor: "#c084fc",
      pack: "#181524",
      accent: "#c084fc",
      weaponType: "pistol",
      helmetType: "recon",
      bulk: 0.95,
      lean: 0.05
    },
    "op-07": {
      uniform: "#2d3b27",
      vest: "#3f6212",
      armor: "#4d7c0f",
      helmet: "#2a3824",
      visor: "#bef264",
      pack: "#1e291b",
      accent: "#a3e635",
      weaponType: "rifle",
      helmetType: "recon",
      bulk: 0.97,
      lean: 0.05
    },
    "op-08": {
      uniform: "#243b3a",
      vest: "#cbd5e1",
      armor: "#115e59",
      helmet: "#e2e8f0",
      visor: "#5eead4",
      pack: "#1a2f2e",
      accent: "#2dd4bf",
      weaponType: "pistol",
      helmetType: "medic",
      bulk: 0.98,
      lean: 0.02
    },
    "op-09": {
      uniform: "#283444",
      vest: "#475569",
      armor: "#1d4ed8",
      helmet: "#334155",
      visor: "#60a5fa",
      pack: "#1e293b",
      accent: "#60a5fa",
      weaponType: "rifle",
      helmetType: "tactical",
      bulk: 1.03,
      lean: 0.04
    },
    "op-10": {
      uniform: "#28323e",
      vest: "#334155",
      armor: "#3b82f6",
      helmet: "#1e293b",
      visor: "#93c5fd",
      pack: "#17202a",
      accent: "#38bdf8",
      weaponType: "sniper",
      helmetType: "recon",
      bulk: 0.95,
      lean: 0.02
    },
    "op-11": {
      uniform: "#383529",
      vest: "#4b5563",
      armor: "#854d0e",
      helmet: "#374151",
      visor: "#fde047",
      pack: "#26251d",
      accent: "#facc15",
      weaponType: "heavy",
      helmetType: "heavy",
      bulk: 1.14,
      lean: 0.06
    },
    "op-12": {
      uniform: "#2d263d",
      vest: "#4c1d95",
      armor: "#6d28d9",
      helmet: "#231d33",
      visor: "#d8b4fe",
      pack: "#191526",
      accent: "#c084fc",
      weaponType: "rifle",
      helmetType: "recon",
      bulk: 0.96,
      lean: 0.04
    }
  };

  if (unit && profiles[unit.id]) return profiles[unit.id];

  const roleDefaults = {
    "Atirador de Elite": { weaponType: "sniper", helmetType: "recon", uniform: "#273544", vest: "#334155", armor: "#475569", helmet: "#2c3e50", visor: "#7dd3fc", pack: "#1e293b", accent: "#38bdf8", bulk: 0.96, lean: 0.02 },
    "Pesado": { weaponType: "heavy", helmetType: "heavy", uniform: "#3a3628", vest: "#52525b", armor: "#713f12", helmet: "#3f3f46", visor: "#facc15", pack: "#27272a", accent: "#facc15", bulk: 1.15, lean: 0.06 },
    "Médico": { weaponType: "pistol", helmetType: "medic", uniform: "#273e3c", vest: "#e2e8f0", armor: "#0f766e", helmet: "#f1f5f9", visor: "#2dd4bf", pack: "#1e3a38", accent: "#2dd4bf", bulk: 0.99, lean: 0.03 },
    "Demolições": { weaponType: "rifle", helmetType: "heavy", uniform: "#3b322c", vest: "#57534e", armor: "#7c2d12", helmet: "#44403c", visor: "#fb923c", pack: "#292524", accent: "#fb923c", bulk: 1.07, lean: 0.05 },
    "Comando": { weaponType: "pistol", helmetType: "recon", uniform: "#292538", vest: "#3b0764", armor: "#581c87", helmet: "#1e1b2e", visor: "#c084fc", pack: "#181524", accent: "#c084fc", bulk: 0.96, lean: 0.05 }
  };
  return roleDefaults[unit?.role] || {
    weaponType: "rifle",
    helmetType: "tactical",
    uniform: "#2f3d2e",
    vest: "#4b5563",
    armor: "#374151",
    helmet: "#3f4e3c",
    visor: "#38bdf8",
    pack: "#273026",
    accent: "#4ef2a1",
    bulk: 1.0,
    lean: 0.04
  };
}

function drawDetailedWeapon(ctx, sx, shoulderY, dirX, scaleU, weaponType, isAiming, recoil) {
  const kick = recoil * 4.6 * scaleU;
  const baseX = sx + dirX * (2.2 * scaleU) - dirX * kick;
  const baseY = shoulderY + (isAiming ? 2.4 * scaleU : 5.4 * scaleU);
  const angle = isAiming ? -0.14 * dirX : 0.24 * dirX;

  ctx.save();
  ctx.translate(baseX, baseY);
  ctx.rotate(angle);

  if (weaponType === "sniper") {
    const len = 21 * scaleU;
    // Coronha e cano longo de precisão
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3.2 * scaleU;
    ctx.beginPath();
    ctx.moveTo(-4 * scaleU, 1.5 * scaleU);
    ctx.lineTo(len, -1.2 * scaleU);
    ctx.stroke();

    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1.6 * scaleU;
    ctx.beginPath();
    ctx.moveTo(-2 * scaleU, 1.0 * scaleU);
    ctx.lineTo(len - 1 * scaleU, -1.1 * scaleU);
    ctx.stroke();

    // Mira telescópica
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 0.9;
    ctx.fillRect(2.5 * scaleU, -4.4 * scaleU, 7.5 * scaleU, 2.4 * scaleU);
    ctx.strokeRect(2.5 * scaleU, -4.4 * scaleU, 7.5 * scaleU, 2.4 * scaleU);
  } else if (weaponType === "heavy") {
    const len = 17.5 * scaleU;
    // Metralhadora pesada / suporte
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.1;
    ctx.fillRect(-2 * scaleU, -2.2 * scaleU, len * 0.78, 5.2 * scaleU);
    ctx.strokeRect(-2 * scaleU, -2.2 * scaleU, len * 0.78, 5.2 * scaleU);

    // Cano duplo/reforçado e tambor/caixa de munições
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2.3 * scaleU;
    ctx.beginPath();
    ctx.moveTo(4 * scaleU, -0.4 * scaleU);
    ctx.lineTo(len, -0.4 * scaleU);
    ctx.stroke();

    ctx.fillStyle = "#334155";
    ctx.fillRect(1.5 * scaleU, 2.8 * scaleU, 4.4 * scaleU, 4.2 * scaleU);
  } else if (weaponType === "pistol") {
    const len = 8.5 * scaleU;
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3.2 * scaleU;
    ctx.beginPath();
    ctx.moveTo(-1 * scaleU, 0.8 * scaleU);
    ctx.lineTo(len, -0.4 * scaleU);
    ctx.stroke();

    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1.5 * scaleU;
    ctx.beginPath();
    ctx.moveTo(0, 0.5 * scaleU);
    ctx.lineTo(len - 0.5 * scaleU, -0.3 * scaleU);
    ctx.stroke();
  } else {
    // Espingarda de assalto com carregador curvo e mira superior
    const len = 15 * scaleU;
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3.6 * scaleU;
    ctx.beginPath();
    ctx.moveTo(-2.5 * scaleU, 1.2 * scaleU);
    ctx.lineTo(len, -0.8 * scaleU);
    ctx.stroke();

    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1.7 * scaleU;
    ctx.beginPath();
    ctx.moveTo(-1 * scaleU, 0.8 * scaleU);
    ctx.lineTo(len - 0.8 * scaleU, -0.7 * scaleU);
    ctx.stroke();

    // Carregador
    ctx.fillStyle = "#475569";
    ctx.fillRect(4.2 * scaleU, 1.2 * scaleU, 2.4 * scaleU, 4.2 * scaleU);

    // Mira holográfica
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(3.2 * scaleU, -3.2 * scaleU, 3.2 * scaleU, 1.6 * scaleU);
  }

  ctx.restore();
}

function drawIsoSoldierSprite(ctx, sx, sy, w, h, unit, isSelected, coverLevel = 0, animState = null) {
  const prof = getSoldierVisualProfile(unit);
  const isDown = unit.hp <= 0;
  const dirX = animState?.dirX >= 0 ? 1 : -1;
  const stridePhase = animState?.stridePhase || 0;
  const isMoving = Boolean(animState?.isMoving);
  const isFiring = Boolean(animState?.isFiring);
  const recoil = animState?.recoil || 0;
  const nowSec = performance.now() * 0.001;
  const breath = (!isMoving && !isFiring && !isDown) ? Math.sin(nowSec * 2.4 + (unit.x + unit.y)) * 1.15 : 0;

  // Sombra projetada suave + sombra de contacto sob as botas
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(sx + w * 0.16, sy + h * 0.10, w * 0.38 * prof.bulk, h * 0.26, -0.24, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.42)";
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(sx, sy + h * 0.02, w * 0.26 * prof.bulk, h * 0.16, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.62)";
  ctx.fill();
  ctx.restore();

  if (isSelected && !isDown) {
    drawTacticalCornerBrackets(ctx, sx, sy, w * 0.98, h * 0.98, prof.accent || "#4ef2a1", 2.0);
  }
  if (coverLevel > 0 && !isDown && (isSelected || isMoving || isFiring || unit.crouched || unit.hunker)) {
    drawCoverShieldBadge(ctx, sx + w * 0.30, sy - 7, coverLevel, isSelected);
  }

  const crouchOffset = (unit.crouched || unit.hunker) ? 5.6 : 0;
  const sprintTilt = isMoving ? (unit.crouched ? 0.06 : 0.14) * dirX : prof.lean * dirX;
  const bobOffset = isMoving ? Math.abs(Math.sin(stridePhase)) * (unit.crouched ? 1.9 : 3.6) : 0;
  const scaleU = Math.max(1.06, w / 36) * prof.bulk;
  const bodyH = Math.round(22 * scaleU);
  const headR = Math.max(4.6, 5.1 * scaleU);
  const footY = sy - 1;
  const hipY = footY - bodyH * 0.40 + crouchOffset * 0.55 - bobOffset * 0.35;
  const shoulderY = footY - bodyH * 0.88 + crouchOffset - bobOffset + breath;
  const headY = shoulderY - headR - 1.5;

  if (isDown) {
    // Animação de queda quando eliminado
    ctx.save();
    ctx.translate(sx, sy - 2);
    ctx.rotate(dirX * 1.25);
    ctx.fillStyle = prof.uniform;
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.2;
    ctx.fillRect(-10 * scaleU, -3 * scaleU, 20 * scaleU, 6 * scaleU);
    ctx.strokeRect(-10 * scaleU, -3 * scaleU, 20 * scaleU, 6 * scaleU);
    ctx.beginPath();
    ctx.arc(12 * scaleU, 0, headR * 0.9, 0, Math.PI * 2);
    ctx.fillStyle = prof.helmet;
    ctx.fill();
    ctx.restore();
    return;
  }

  ctx.save();
  // Inclinação subtil do corpo na corrida/avanço
  ctx.translate(sx, hipY);
  ctx.rotate(sprintTilt);
  ctx.translate(-sx, -hipY);

  const swing = isMoving ? Math.sin(stridePhase) * 5.8 * scaleU : 0;

  // 1. Mochila militar e arma secundária/reserva às costas
  const packX = sx - dirX * (6.8 * scaleU);
  ctx.fillStyle = prof.pack;
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(packX - 2.8 * scaleU, shoulderY + 0.5, 5.6 * scaleU, bodyH * 0.48, 2) : ctx.rect(packX - 2.8 * scaleU, shoulderY + 0.5, 5.6 * scaleU, bodyH * 0.48);
  ctx.fill();
  ctx.stroke();

  // Silhueta de arma transportada às costas quando não em modo de tiro
  if (!isFiring) {
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2.0 * scaleU;
    ctx.beginPath();
    ctx.moveTo(packX - dirX * 1.5 * scaleU, shoulderY - 2.5 * scaleU);
    ctx.lineTo(packX + dirX * 2.5 * scaleU, shoulderY + bodyH * 0.52);
    ctx.stroke();
  }

  // 2. Pernas articuladas + joelheiras + botas militares
  const leftFootX = sx - 2.6 * scaleU + swing;
  const leftFootY = footY - Math.max(0, Math.cos(stridePhase)) * (isMoving ? 2.4 * scaleU : 0);
  const rightFootX = sx + 2.8 * scaleU - swing;
  const rightFootY = footY - Math.max(0, -Math.cos(stridePhase)) * (isMoving ? 2.4 * scaleU : 0);

  ctx.strokeStyle = prof.uniform;
  ctx.lineWidth = 3.5 * scaleU;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(sx - 2.2 * scaleU, hipY);
  ctx.lineTo(leftFootX, leftFootY);
  ctx.moveTo(sx + 2.2 * scaleU, hipY);
  ctx.lineTo(rightFootX, rightFootY);
  ctx.stroke();

  // Joelheiras táticas
  ctx.fillStyle = prof.armor;
  ctx.fillRect(leftFootX - 1.6 * scaleU, (hipY + leftFootY) * 0.5 - 1.2 * scaleU, 3.2 * scaleU, 2.4 * scaleU);
  ctx.fillRect(rightFootX - 1.6 * scaleU, (hipY + rightFootY) * 0.5 - 1.2 * scaleU, 3.2 * scaleU, 2.4 * scaleU);

  // Botas militares em contacto com o solo
  ctx.fillStyle = "#1e293b";
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 0.9;
  ctx.fillRect(leftFootX - 2.2 * scaleU, leftFootY - 2.5 * scaleU, 4.6 * scaleU, 2.8 * scaleU);
  ctx.fillRect(rightFootX - 2.2 * scaleU, rightFootY - 2.5 * scaleU, 4.6 * scaleU, 2.8 * scaleU);

  // 3. Tronco, colete balístico, placas de armadura e bolsas de equipamento
  const rw = 13.8 * scaleU;
  const rh = bodyH * 0.56;
  const rx = sx - rw * 0.5;
  const ry = shoulderY;

  ctx.fillStyle = isSelected ? prof.armor : prof.vest;
  ctx.strokeStyle = isSelected ? (prof.accent || "#86efac") : "#cbd5e1";
  ctx.lineWidth = 1.25;
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(rx, ry, rw, rh, 3) : ctx.rect(rx, ry, rw, rh);
  ctx.fill();
  ctx.stroke();

  // Placa balística frontal e ombreiras de armadura
  ctx.fillStyle = prof.armor;
  ctx.fillRect(rx + 2.2 * scaleU, ry + 1.5 * scaleU, rw - 4.4 * scaleU, rh * 0.54);

  // Cinto tático e bolsas de munição/equipamento
  ctx.strokeStyle = "#eab308";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(rx + 1.2, ry + rh * 0.80);
  ctx.lineTo(rx + rw - 1.2, ry + rh * 0.80);
  ctx.stroke();

  ctx.fillStyle = "#64748b";
  ctx.fillRect(rx + 1.8 * scaleU, ry + rh * 0.66, 2.8 * scaleU, 3.2 * scaleU);
  ctx.fillRect(rx + rw - 4.6 * scaleU, ry + rh * 0.66, 2.8 * scaleU, 3.2 * scaleU);

  // 4. Cabeça, capacete diferenciado por perfil e viseira tática
  ctx.beginPath();
  ctx.arc(sx, headY, headR, 0, Math.PI * 2);
  ctx.fillStyle = isSelected ? (prof.helmet || "#cbd5e1") : prof.helmet;
  ctx.fill();
  ctx.strokeStyle = isSelected ? (prof.accent || "#4ef2a1") : "#0f172a";
  ctx.lineWidth = 1.25;
  ctx.stroke();

  if (prof.helmetType === "heavy") {
    // Proteção lateral reforçada no capacete pesado
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(sx, headY, headR + 0.8, Math.PI * 0.15, Math.PI * 0.85);
    ctx.stroke();
  } else if (prof.helmetType === "medic") {
    // Emblema discreto de apoio médico no capacete
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(sx - 1.6 * scaleU, headY - headR * 0.72, 3.2 * scaleU, 1.3 * scaleU);
  }

  // Viseira ótica orientada
  ctx.fillStyle = prof.visor;
  const visorW = headR * 0.94;
  const visorX = dirX >= 0 ? sx - 0.4 * scaleU : sx - visorW + 0.4 * scaleU;
  ctx.fillRect(visorX, headY - 1.6 * scaleU, visorW, 2.5 * scaleU);

  // 5. Braços articulados + arma militar (espingarda, precisão, pesado ou pistola)
  const armSwing = isMoving ? -swing * 0.65 : 0;
  const isAiming = Boolean(isFiring || unit.overwatch);

  // Braço de apoio
  ctx.strokeStyle = prof.uniform;
  ctx.lineWidth = 2.8 * scaleU;
  ctx.beginPath();
  ctx.moveTo(sx - dirX * 2.5 * scaleU, shoulderY + 3.2 * scaleU);
  ctx.lineTo(sx + dirX * (isAiming ? 6.5 * scaleU : 3.5 * scaleU + armSwing), shoulderY + (isAiming ? 4.2 * scaleU : 8.5 * scaleU));
  ctx.stroke();

  drawDetailedWeapon(ctx, sx, shoulderY, dirX, scaleU, prof.weaponType, isAiming, recoil);

  ctx.restore();

  // Indicador compacto apenas quando selecionado ou em combate ativo
  if ((isSelected || isFiring) && !isDown) {
    const barW = Math.max(28, Math.round(30 * scaleU));
    const barH = 4.2;
    const barX = sx - barW * 0.5;
    const barY = headY - headR - 9;
    const ratio = Math.max(0, Math.min(1, unit.hp / Math.max(1, unit.maxHp)));

    ctx.fillStyle = "rgba(2, 6, 12, 0.88)";
    ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
    ctx.fillStyle = ratio > 0.5 ? "#22c55e" : ratio > 0.25 ? "#eab308" : "#ef4444";
    ctx.fillRect(barX, barY, barW * ratio, barH);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 8.5px monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${unit.name.split(" ")[0]} ${unit.hp}`, sx, barY - 3);
  }
}

function drawIsoAlienSprite(ctx, sx, sy, w, h, enemy, isTargeted) {
  // Sombra projetada no chão
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(sx + w * 0.12, sy + h * 0.08, w * 0.34, h * 0.24, -0.3, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.58)";
  ctx.fill();
  ctx.restore();

  if (isTargeted) {
    drawIsoDiamond(ctx, sx, sy, w * 0.94, h * 0.94, "rgba(255, 209, 102, 0.25)", "#ffd166", 1.8);
  } else {
    drawIsoDiamond(ctx, sx, sy, w * 0.68, h * 0.68, "rgba(239, 68, 68, 0.14)", "rgba(248, 113, 113, 0.5)", 1.0);
  }

  const isBig = enemy.archetypeId === "brute" || enemy.archetypeId === "overlord";
  const isPsycher = enemy.archetypeId === "psycher";
  const scaleE = Math.max(0.85, w / 44) * (isBig ? 1.24 : 1.0);
  const bodyH = Math.round(16 * scaleE);
  const headR = Math.max(3.8, 4.5 * scaleE);
  const footY = sy - 1;
  const hipY = footY - bodyH * 0.36;
  const shoulderY = footY - bodyH * 0.86;
  const headY = shoulderY - headR - 1.2;

  // Aura psiónica para Psycher/Overlord
  if (isPsycher || enemy.archetypeId === "overlord") {
    ctx.beginPath();
    ctx.arc(sx, shoulderY, 11 * scaleE, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(168, 85, 247, 0.18)";
    ctx.fill();
  }

  // Membros alienígenas articulados
  ctx.strokeStyle = "#f87171";
  ctx.lineWidth = (isBig ? 3.2 : 2.3) * scaleE;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(sx - 3.5 * scaleE, hipY);
  ctx.lineTo(sx - 5.2 * scaleE, footY);
  ctx.moveTo(sx + 3.5 * scaleE, hipY);
  ctx.lineTo(sx + 5.2 * scaleE, footY);
  ctx.stroke();

  // Carapaça Xeno
  ctx.fillStyle = isBig ? "#7f1d1d" : isPsycher ? "#581c87" : "#991b1b";
  ctx.strokeStyle = isTargeted ? "#fde047" : "#fca5a5";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(sx, shoulderY - 2 * scaleE);
  ctx.lineTo(sx + 7.5 * scaleE, hipY);
  ctx.lineTo(sx, footY - 2);
  ctx.lineTo(sx - 7.5 * scaleE, hipY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Crânio alienígena alongado + olhos bioluminescentes
  ctx.beginPath();
  ctx.arc(sx, headY, headR, 0, Math.PI * 2);
  ctx.fillStyle = isPsycher ? "#c084fc" : "#ef4444";
  ctx.fill();
  ctx.strokeStyle = "#fecaca";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#fef08a";
  ctx.beginPath();
  ctx.arc(sx - 2 * scaleE, headY - 0.5, 1.5 * scaleE, 0, Math.PI * 2);
  ctx.arc(sx + 1.5 * scaleE, headY - 0.5, 1.3 * scaleE, 0, Math.PI * 2);
  ctx.fill();

  if (isTargeted) {
    const barW = Math.max(28, Math.round(30 * scaleE));
    const barH = 4.2;
    const barX = sx - barW * 0.5;
    const barY = headY - headR - 9;
    const ratio = Math.max(0, Math.min(1, enemy.hp / Math.max(1, enemy.maxHp)));

    ctx.fillStyle = "rgba(2, 6, 12, 0.88)";
    ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(barX, barY, barW * ratio, barH);

    ctx.fillStyle = "#fde047";
    ctx.font = "bold 8.5px monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${enemy.archetypeId.slice(0, 5).toUpperCase()} ${enemy.hp}`, sx, barY - 3);
  }
}

function drawBattleVfxLayer(ctx, battle, m) {
  if (!battle || !Array.isArray(battle.vfxQueue) || battle.vfxQueue.length === 0) return;
  const now = performance.now();

  battle.vfxQueue.forEach((vfx) => {
    const elapsed = now - vfx.createdAt;
    const t = Math.max(0, Math.min(1, elapsed / vfx.duration));

    if (vfx.type === "shot") {
      const from = worldToIso(vfx.fromX, vfx.fromY, battle, m);
      const to = worldToIso(vfx.toX, vfx.toY, battle, m);
      const fy = from.sy - 12;
      const ty = to.sy - 10;

      // Flash na boca do cano
      if (t < 0.35) {
        const flashR = (1 - t / 0.35) * 14;
        ctx.save();
        ctx.beginPath();
        ctx.arc(from.sx, fy, flashR, 0, Math.PI * 2);
        ctx.fillStyle = vfx.color || "rgba(250, 204, 21, 0.85)";
        ctx.fill();
        ctx.restore();
      }

      // Projétil / feixe traçante
      const headT = Math.min(1, t * 1.45);
      const tailT = Math.max(0, headT - 0.32);
      const hx = from.sx + (to.sx - from.sx) * headT;
      const hy = fy + (ty - fy) * headT;
      const tx = from.sx + (to.sx - from.sx) * tailT;
      const ty2 = fy + (ty - fy) * tailT;

      ctx.save();
      ctx.strokeStyle = vfx.color || "#38bdf8";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tx, ty2);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      ctx.restore();

      // Faíscas no impacto
      if (t > 0.55) {
        const impT = (t - 0.55) / 0.45;
        ctx.save();
        ctx.beginPath();
        ctx.arc(to.sx, ty, 4 + impT * 14, 0, Math.PI * 2);
        ctx.strokeStyle = vfx.hit ? `rgba(248, 113, 113, ${1 - impT})` : `rgba(148, 163, 184, ${1 - impT})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
    } else if (vfx.type === "explosion") {
      const center = worldToIso(vfx.x, vfx.y, battle, m);
      const maxR = m.tileW * 1.25;
      const curR = 8 + t * maxR;
      const alpha = 1 - t;

      ctx.save();
      // Onda de choque isométrica no chão
      drawIsoDiamond(
        ctx,
        center.sx,
        center.sy,
        m.tileW * (1.2 + t * 1.9),
        m.tileH * (1.2 + t * 1.9),
        `rgba(249, 115, 22, ${alpha * 0.28})`,
        `rgba(253, 224, 71, ${alpha * 0.9})`,
        2.2
      );

      // Núcleo incandescente da explosão
      const grad = ctx.createRadialGradient(center.sx, center.sy - 8, 2, center.sx, center.sy - 8, curR);
      grad.addColorStop(0, `rgba(254, 249, 195, ${alpha})`);
      grad.addColorStop(0.45, `rgba(249, 115, 22, ${alpha * 0.85})`);
      grad.addColorStop(1, "rgba(127, 29, 29, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(center.sx, center.sy - 8, curR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (vfx.type === "floater") {
      const pos = worldToIso(vfx.x, vfx.y, battle, m);
      const floatY = pos.sy - 26 - t * 24;
      const alpha = t < 0.7 ? 1 : (1 - t) / 0.3;

      ctx.save();
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.85})`;
      ctx.fillText(vfx.text, pos.sx + 1, floatY + 1);
      ctx.fillStyle = vfx.color || "#facc15";
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillText(vfx.text, pos.sx, floatY);
      ctx.restore();
    }
  });
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
      transform:translateZ(0);
      -webkit-transform:translateZ(0);
      backface-visibility:hidden;
      border:1px solid rgba(78, 242, 161, 0.34);
      background:radial-gradient(circle at 50% 25%, #16283b 0%, #09111a 75%, #05090f 100%);
      box-shadow:inset 0 0 24px rgba(0, 0, 0, 0.72);
    `;
    gridEl.parentElement.insertBefore(stage, gridEl);

    const canvas = document.createElement("canvas");
    canvas.id = "iso-battle-canvas";
    canvas.style.cssText = "width:100%;height:100%;display:block;touch-action:none;user-select:none;-webkit-user-select:none;cursor:pointer;transform:translateZ(0);-webkit-transform:translateZ(0);backface-visibility:hidden;";
    stage.appendChild(canvas);

    // Navegação tátil estável (sem cintilação): arrasto livre em qualquer zoom, pinça de 2 dedos e toque simples
    const activePointers = new Map();
    let isPanning = false;
    let totalMoved = 0;
    let startClientX = 0;
    let startClientY = 0;
    let lastClientX = 0;
    let lastClientY = 0;
    let pinchStartDist = 0;
    let pinchStartZoom = 1;
    let pinchAnchorX = 0;
    let pinchAnchorY = 0;
    let pinchLastMidX = 0;
    let pinchLastMidY = 0;
    let rafId = null;

    function scheduleBattleRender() {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (state.battle) renderBattle();
      });
    }

    function getPinchInfo() {
      const pts = Array.from(activePointers.values());
      if (pts.length < 2) return null;
      const [p1, p2] = pts;
      const rect = canvas.getBoundingClientRect();
      return {
        dist: Math.max(1, Math.hypot(p2.clientX - p1.clientX, p2.clientY - p1.clientY)),
        midX: ((p1.clientX + p2.clientX) * 0.5) - rect.left,
        midY: ((p1.clientY + p2.clientY) * 0.5) - rect.top
      };
    }

    canvas.addEventListener("pointerdown", (ev) => {
      if (!state.battle) return;
      activePointers.set(ev.pointerId, { clientX: ev.clientX, clientY: ev.clientY });

      if (activePointers.size >= 2) {
        const pInfo = getPinchInfo();
        if (pInfo) {
          pinchStartDist = pInfo.dist;
          pinchStartZoom = getBattleZoom(state.battle);
          pinchAnchorX = pInfo.midX;
          pinchAnchorY = pInfo.midY;
          pinchLastMidX = pInfo.midX;
          pinchLastMidY = pInfo.midY;
          isPanning = false;
          totalMoved = 999;
        }
        return;
      }

      isPanning = true;
      totalMoved = 0;
      startClientX = ev.clientX;
      startClientY = ev.clientY;
      lastClientX = ev.clientX;
      lastClientY = ev.clientY;
          });

    canvas.addEventListener("pointermove", (ev) => {
      if (!state.battle) return;
      if (activePointers.has(ev.pointerId)) {
        activePointers.set(ev.pointerId, { clientX: ev.clientX, clientY: ev.clientY });
      }

      if (activePointers.size >= 2) {
        const pInfo = getPinchInfo();
        if (pInfo && pinchStartDist > 4) {
          const factor = pInfo.dist / pinchStartDist;
          const targetZoom = Math.max(0.65, Math.min(2.6, Number((pinchStartZoom * factor).toFixed(2))));
          const panDeltaX = pInfo.midX - pinchLastMidX;
          const panDeltaY = pInfo.midY - pinchLastMidY;
          pinchLastMidX = pInfo.midX;
          pinchLastMidY = pInfo.midY;
          state.battle.panX = (state.battle.panX || 0) + panDeltaX;
          state.battle.panY = (state.battle.panY || 0) + panDeltaY;
          state.battle.zoom = targetZoom;
          const m = getIsoMetrics(canvas, true);
          clampBattlePan(state.battle, m);
          scheduleBattleRender();
        }
        return;
      }

      if (isPanning) {
        totalMoved = Math.hypot(ev.clientX - startClientX, ev.clientY - startClientY);
        if (totalMoved > 6) {
          const dx = ev.clientX - lastClientX;
          const dy = ev.clientY - lastClientY;
          lastClientX = ev.clientX;
          lastClientY = ev.clientY;
          const m = getIsoMetrics(canvas, true);
          state.battle.panX = (state.battle.panX || 0) + dx;
          state.battle.panY = (state.battle.panY || 0) + dy;
          clampBattlePan(state.battle, m);
          scheduleBattleRender();
          return;
        }
      }

      if (state.battle.mode === "frag" || state.battle.mode === "smoke") {
        const rect = canvas.getBoundingClientRect();
        const px = ev.clientX - rect.left;
        const py = ev.clientY - rect.top;
        const m = getIsoMetrics(canvas);
        const hit = isoToWorld(px, py, state.battle, m);
        const prev = state.battle.hoverTile;
        const same = (!prev && !hit) || (prev && hit && prev.x === hit.x && prev.y === hit.y);
        if (!same) {
          state.battle.hoverTile = hit;
          scheduleBattleRender();
        }
      } else if (state.battle.hoverTile) {
        state.battle.hoverTile = null;
        scheduleBattleRender();
      }
    });

    const finishPointer = (ev) => {
      const wasPinching = activePointers.size >= 2;
      activePointers.delete(ev.pointerId);
      if (activePointers.size < 2) {
        pinchStartDist = 0;
      }
      if (!isPanning && !wasPinching) return;
      isPanning = false;

      if (!wasPinching && activePointers.size === 0 && totalMoved <= 14 && state.battle) {
        const rect = canvas.getBoundingClientRect();
        const px = ev.clientX - rect.left;
        const py = ev.clientY - rect.top;
        const m = getIsoMetrics(canvas);
        const hit = isoToWorld(px, py, state.battle, m);
        if (hit) handleCellClick(hit.x, hit.y);
      }
    };

    window.addEventListener("pointerup", finishPointer);
    window.addEventListener("pointercancel", finishPointer);

    canvas.addEventListener("wheel", (ev) => {
      if (!state.battle) return;
      ev.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const px = ev.clientX - rect.left;
      const py = ev.clientY - rect.top;
      const step = ev.deltaY < 0 ? 0.16 : -0.16;
      setBattleZoom(step, px, py);
    }, { passive: false });
  }

  return document.getElementById("iso-battle-canvas");
}

function ensureTacticalExtras() {
  const tactical = document.getElementById("tactical");
  if (!tactical) return;

  const logEl = document.getElementById("battle-log");
  const sideEl = document.querySelector("#tactical .battle-side");
  if (logEl && sideEl && logEl.parentElement !== sideEl) {
    sideEl.insertBefore(logEl, sideEl.firstChild);
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
      min-width:195px;
      max-width:255px;
    `;
    const parent = canvas && canvas.parentElement ? canvas.parentElement : document.getElementById("tactical");
    if (parent) {
      if (getComputedStyle(parent).position === "static") {
        parent.style.position = "relative";
      }
      parent.appendChild(pop);
    }
  }

  const targetingModes = ["move", "fire", "frag", "smoke"];
  if (!battle || battle.phase !== "player" || targetingModes.includes(battle.mode) || battle.ordersMinimized || !selUnit || !canvas || !m) {
    pop.style.setProperty("display", "none", "important");
    return;
  }

  const camX = battle.camera ? battle.camera.x : 0;
  const camY = battle.camera ? battle.camera.y : 0;
  const vx = selUnit.x - camX;
  const vy = selUnit.y - camY;

  if (vx < 0 || vx >= ISO_VIEW_W || vy < 0 || vy >= ISO_VIEW_H) {
    pop.style.setProperty("display", "none", "important");
    return;
  }

  const parent = pop.parentElement;
  if (!parent) {
    pop.style.setProperty("display", "none", "important");
    return;
  }

  if (!battle.orderTab) battle.orderTab = "mov";
  const tab = battle.orderTab;

  const unitIso = worldToIso(selUnit.x, selUnit.y, battle, m);
  const parentRect = parent.getBoundingClientRect();

  const tabBtnStyle = (active) => `
    flex:1;
    font-size:0.66em;
    padding:3px 4px;
    border-radius:4px;
    border:1px solid ${active ? "#4ef2a1" : "rgba(148,163,184,0.28)"};
    background:${active ? "rgba(78,242,161,0.24)" : "rgba(15,23,42,0.85)"};
    color:${active ? "#ecfdf5" : "#94a3b8"};
    cursor:pointer;
    font-weight:${active ? "bold" : "normal"};
  `;

  let bodyHtml = "";
  if (tab === "mov") {
    bodyHtml = `
      <button type="button" data-float-act="move" class="primary" style="font-size:0.72em;padding:4px 8px;">MOVER (${getUnitMoveRange(selUnit)})</button>
      <button type="button" data-float-act="crouch" class="${selUnit.crouched ? "primary" : "secondary"}" style="font-size:0.72em;padding:4px 8px;">${selUnit.crouched ? "LEVANTAR" : "AGACHAR"}</button>
      <button type="button" data-float-act="hunker" class="secondary" style="font-size:0.72em;padding:4px 8px;">HUNKER</button>
    `;
  } else if (tab === "act") {
    bodyHtml = `
      <button type="button" data-float-act="fire" class="primary" style="font-size:0.72em;padding:4px 8px;">DISPARAR</button>
      <button type="button" data-float-act="overwatch" class="secondary" style="font-size:0.72em;padding:4px 8px;">VIGILÂNCIA</button>
      <button type="button" data-float-act="reload" class="secondary" style="font-size:0.72em;padding:4px 8px;">RECARREGAR (${selUnit.ammo}/${selUnit.maxAmmo})</button>
    `;
  } else {
    bodyHtml = `
      <button type="button" data-float-act="frag" class="secondary" style="font-size:0.72em;padding:4px 8px;">FRAG (${selUnit.frags})</button>
      <button type="button" data-float-act="smoke" class="secondary" style="font-size:0.72em;padding:4px 8px;">FUMO (${selUnit.smokes})</button>
      <button type="button" data-float-act="medkit" class="secondary" style="font-size:0.72em;padding:4px 8px;">CURAR (${selUnit.medkits})</button>
    `;
  }

  pop.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:5px;font-size:0.71em;color:#4ef2a1;">
      <b>${selUnit.name.split(" ")[0]} · ${selUnit.ap} PA</b>
      <button type="button" id="close-floating-orders" style="background:none;border:none;color:#fff;cursor:pointer;font-size:1em;padding:0 2px;">✕</button>
    </div>
    <div style="display:flex;gap:3px;margin-bottom:6px;">
      <button type="button" data-order-tab="mov" style="${tabBtnStyle(tab === "mov")}">MOVIMENTOS</button>
      <button type="button" data-order-tab="act" style="${tabBtnStyle(tab === "act")}">AÇÃO</button>
      <button type="button" data-order-tab="eqp" style="${tabBtnStyle(tab === "eqp")}">EQUIPAMENTO</button>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;">
      ${bodyHtml}
    </div>
  `;

  const popSig = `${selUnit.id}:${selUnit.ap}:${selUnit.crouched}:${selUnit.ammo}:${selUnit.frags}:${selUnit.smokes}:${selUnit.medkits}:${tab}`;
  const contentChanged = pop.dataset.ozPopSig !== popSig;
  if (contentChanged) {
    pop.dataset.ozPopSig = popSig;
  }

  if (contentChanged || !pop.dataset.ozPopW) {
    pop.style.setProperty("visibility", "hidden", "important");
    pop.style.setProperty("display", "block", "important");
    pop.style.bottom = "auto";
    pop.style.right = "auto";
    pop.style.maxWidth = "255px";
    pop.style.left = "0px";
    pop.style.top = "0px";
    const r0 = pop.getBoundingClientRect();
    pop.dataset.ozPopW = String(Math.round(r0.width || 210));
    pop.dataset.ozPopH = String(Math.round(r0.height || 92));
  }
  const popW = Number(pop.dataset.ozPopW) || 210;
  const popH = Number(pop.dataset.ozPopH) || 92;

  let left = unitIso.sx - popW / 2;
  left = Math.max(6, Math.min(parentRect.width - popW - 6, left));

  let top = unitIso.sy - popH - 26;
  if (top < 6) {
    top = unitIso.sy + 18;
  }
  top = Math.max(6, Math.min(parentRect.height - popH - 6, top));

  pop.style.bottom = "auto";
  pop.style.right = "auto";
  pop.style.maxWidth = "255px";
  pop.style.left = "0px";
  pop.style.top = "0px";
  pop.style.transform = `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
  pop.style.setProperty("visibility", "visible", "important");
  pop.style.setProperty("display", "block", "important");

  const closeBtn = pop.querySelector("#close-floating-orders");
  if (closeBtn) {
    closeBtn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      battle.selectedUnitId = null;
      renderBattle();
    });
  }

  pop.querySelectorAll("[data-order-tab]").forEach((tBtn) => {
    tBtn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      battle.orderTab = tBtn.getAttribute("data-order-tab");
      renderBattle();
    });
  });

  pop.querySelectorAll("[data-float-act]").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const act = btn.getAttribute("data-float-act");
      if (act === "move") {
        hideFloatingOrdersNow();
        toggleMoveModeSelectedUnit();
      } else if (act === "crouch") {
        toggleCrouchSelectedUnit();
      } else if (act === "fire") {
        if (selUnit.ap < 1) {
          addBattleLog(`${selUnit.name} não tem Pontos de Ação suficientes.`);
          return;
        }
        if (selUnit.ammo <= 0) {
          addBattleLog(`${selUnit.name} está sem munições! Usa RECARREGAR.`);
          return;
        }
        battle.mode = "fire";
        battle.ordersMinimized = true;
        hideFloatingOrdersNow();
        addBattleLog("Modo DISPARO: toca num inimigo no campo para confirmar o tiro.");
        renderBattle();
      } else if (act === "frag") {
        if (selUnit.ap < 1 || selUnit.frags <= 0) {
          addBattleLog("Sem PA ou sem granadas de fragmentação disponíveis.");
          return;
        }
        battle.mode = "frag";
        battle.ordersMinimized = true;
        hideFloatingOrdersNow();
        addBattleLog("Modo GRANADA FRAG: toca na área do campo onde queres lançar.");
        renderBattle();
      } else if (act === "smoke") {
        if (selUnit.ap < 1 || selUnit.smokes <= 0) {
          addBattleLog("Sem PA ou sem granadas de fumo disponíveis.");
          return;
        }
        battle.mode = "smoke";
        battle.ordersMinimized = true;
        hideFloatingOrdersNow();
        addBattleLog("Modo GRANADA FUMO: toca na área do campo onde queres lançar.");
        renderBattle();
      } else if (act === "overwatch") {
        overwatchSelectedUnit();
      } else if (act === "hunker") {
        hunkerSelectedUnit();
      } else if (act === "reload") {
        reloadSelectedUnit();
        battle.selectedUnitId = null;
        battle.mode = "normal";
        battle.ordersMinimized = false;
        hideFloatingOrdersNow();
        renderBattle();
      } else if (act === "medkit") {
        useMedkitSelectedUnit();
      }
    });
  });
}

function ensureEndTurnVisible(battle) {
  const endTurnBtn = document.getElementById("end-turn");
  const retreatBtn = document.getElementById("retreat");
  const battleSide = document.querySelector("#tactical .battle-side");
  if (!endTurnBtn || !battleSide) return;

  let actionRow = document.getElementById("oz-bottom-actions");
  if (!actionRow) {
    actionRow = document.createElement("div");
    actionRow.id = "oz-bottom-actions";
    battleSide.appendChild(actionRow);
  }

  if (endTurnBtn.parentElement !== actionRow) {
    actionRow.appendChild(endTurnBtn);
  }
  if (retreatBtn && retreatBtn.parentElement !== actionRow) {
    actionRow.appendChild(retreatBtn);
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

let __ozRenderQueued = false;
let __ozInsideInnerRender = false;
function renderBattle() {
  const b = state.battle;
  if (!b) return;
  if (__ozInsideInnerRender) {
    _renderBattleInner(b);
    return;
  }
  if (__ozRenderQueued) return;
  __ozRenderQueued = true;
  requestAnimationFrame(() => {
    __ozRenderQueued = false;
    const cur = state.battle;
    if (!cur) return;
    __ozInsideInnerRender = true;
    try {
      _renderBattleInner(cur);
    } catch (err) {
      addBattleLog("Aviso de renderização tática: " + (err && err.message ? err.message : "erro"));
    } finally {
      __ozInsideInnerRender = false;
    }
  });
}

function _renderBattleInner(b) {
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
    const stageParent = canvas.parentElement;

    let topHud = document.getElementById("iso-top-hud");
    if (!topHud) {
      topHud = document.createElement("div");
      topHud.id = "iso-top-hud";
      topHud.style.cssText = `
        position:absolute;
        top:8px;
        left:8px;
        right:8px;
        z-index:16;
        display:flex;
        align-items:flex-start;
        justify-content:space-between;
        gap:8px;
        pointer-events:none;
      `;
      stageParent.appendChild(topHud);
    }

    const selUForHud = getSelectedUnit();
    const selEForHud = getSelectedEnemy();
    const curZoomPct = Math.round(getBattleZoom(b) * 100);
    const tgtText = selEForHud
      ? `${selEForHud.name} (${selEForHud.hp}HP${selUForHud ? ` · ${calculateHitChance(selUForHud, selEForHud, b)}%` : ""})`
      : "SEM ALVO";

    let hudInfoBox = document.getElementById("iso-top-info-box");
    if (!hudInfoBox) {
      topHud.innerHTML = `
        <div id="iso-top-info-box" style="pointer-events:auto;background:rgba(7,14,22,0.82);border:1px solid rgba(78,242,161,0.35);border-radius:10px;padding:6px 9px;max-width:48%;">
          <div id="iso-hud-title" style="font-size:0.7em;font-weight:bold;letter-spacing:0.6px;color:#4ef2a1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></div>
          <div id="iso-hud-sub" style="font-size:0.64em;color:#e2e8f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;"></div>
          <div style="display:flex;align-items:center;gap:4px;margin-top:5px;">
            <button type="button" id="iso-zoom-out" style="background:rgba(15,23,42,0.92);color:#e2e8f0;border:1px solid rgba(148,163,184,0.4);border-radius:5px;padding:2px 7px;font-size:0.68em;font-weight:bold;cursor:pointer;">−</button>
            <button type="button" id="iso-zoom-reset" style="background:rgba(15,23,42,0.92);color:#4ef2a1;border:1px solid rgba(78,242,161,0.4);border-radius:5px;padding:2px 6px;font-size:0.64em;font-weight:bold;cursor:pointer;">100%</button>
            <button type="button" id="iso-zoom-in" style="background:rgba(15,23,42,0.92);color:#e2e8f0;border:1px solid rgba(148,163,184,0.4);border-radius:5px;padding:2px 7px;font-size:0.68em;font-weight:bold;cursor:pointer;">+</button>
            <button type="button" id="iso-pan-left" style="background:rgba(15,23,42,0.92);color:#cbd5e1;border:1px solid rgba(148,163,184,0.3);border-radius:5px;padding:2px 5px;font-size:0.64em;cursor:pointer;">◀</button>
            <button type="button" id="iso-pan-up" style="background:rgba(15,23,42,0.92);color:#cbd5e1;border:1px solid rgba(148,163,184,0.3);border-radius:5px;padding:2px 5px;font-size:0.64em;cursor:pointer;">▲</button>
            <button type="button" id="iso-pan-down" style="background:rgba(15,23,42,0.92);color:#cbd5e1;border:1px solid rgba(148,163,184,0.3);border-radius:5px;padding:2px 5px;font-size:0.64em;cursor:pointer;">▼</button>
            <button type="button" id="iso-pan-right" style="background:rgba(15,23,42,0.92);color:#cbd5e1;border:1px solid rgba(148,163,184,0.3);border-radius:5px;padding:2px 5px;font-size:0.64em;cursor:pointer;">▶</button>
            <button type="button" id="iso-fullscreen-btn" title="Alternar Ecrã Inteiro" style="background:rgba(15,23,42,0.92);color:#4ef2a1;border:1px solid rgba(78,242,161,0.45);border-radius:5px;padding:2px 6px;font-size:0.64em;font-weight:bold;cursor:pointer;">⛶</button>
          </div>
        </div>
        <div id="iso-squad-strip" style="pointer-events:auto;display:flex;flex-wrap:wrap;gap:5px;max-width:50%;justify-content:flex-end;"></div>
      `;

      const zoomOutBtn = topHud.querySelector("#iso-zoom-out");
      const zoomInBtn = topHud.querySelector("#iso-zoom-in");
      const zoomResetBtn = topHud.querySelector("#iso-zoom-reset");
      const panLeftBtn = topHud.querySelector("#iso-pan-left");
      const panRightBtn = topHud.querySelector("#iso-pan-right");
      const panUpBtn = topHud.querySelector("#iso-pan-up");
      const panDownBtn = topHud.querySelector("#iso-pan-down");

      if (zoomOutBtn) zoomOutBtn.addEventListener("click", (ev) => { ev.stopPropagation(); setBattleZoom(-0.22); });
      if (zoomInBtn) zoomInBtn.addEventListener("click", (ev) => { ev.stopPropagation(); setBattleZoom(0.22); });
      if (zoomResetBtn) zoomResetBtn.addEventListener("click", (ev) => { ev.stopPropagation(); resetBattleView(); });

      const nudgePan = (dx, dy) => {
        const m = canvas ? getIsoMetrics(canvas, true) : null;
        b.panX = (b.panX || 0) + dx;
        b.panY = (b.panY || 0) + dy;
        if (m) clampBattlePan(b, m);
        renderBattle();
      };
      if (panLeftBtn) panLeftBtn.addEventListener("click", (ev) => { ev.stopPropagation(); nudgePan(48, 0); });
      if (panRightBtn) panRightBtn.addEventListener("click", (ev) => { ev.stopPropagation(); nudgePan(-48, 0); });
      if (panUpBtn) panUpBtn.addEventListener("click", (ev) => { ev.stopPropagation(); nudgePan(0, 40); });
      if (panDownBtn) panDownBtn.addEventListener("click", (ev) => { ev.stopPropagation(); nudgePan(0, -40); });
      const fsIsoBtn = topHud.querySelector("#iso-fullscreen-btn");
      if (fsIsoBtn) fsIsoBtn.addEventListener("click", (ev) => { ev.stopPropagation(); toggleGameFullscreen(); });
    }

    const hudTitleEl = document.getElementById("iso-hud-title");
    const hudSubEl = document.getElementById("iso-hud-sub");
    const hudZoomEl = document.getElementById("iso-zoom-reset");
    if (hudTitleEl) hudTitleEl.textContent = `${formatMissionNumber(b.mission.number)}. ${b.mission.title.toUpperCase()}`;
    if (hudSubEl) hudSubEl.textContent = selUForHud ? `${selUForHud.name.split(" ")[0]}: ${selUForHud.hp}HP · ${selUForHud.ap}PA · ${selUForHud.ammo}M` : `ALVO: ${tgtText}`;
    if (hudZoomEl) hudZoomEl.textContent = `${curZoomPct}%`;

    const squadBar = document.getElementById("iso-squad-strip");
    if (squadBar) {
      const aliveUnits = b.units.filter((u) => u.hp > 0);
      const squadSig = aliveUnits
        .map((u) => `${u.id}:${u.ap}:${b.selectedUnitId === u.id ? 1 : 0}`)
        .join("|") + `|${b.phase}`;
      if (squadBar.dataset.ozSig !== squadSig) {
        squadBar.dataset.ozSig = squadSig;
        squadBar.innerHTML = "";
        aliveUnits.forEach((u) => {
          const isAct = b.selectedUnitId === u.id;
          const chip = document.createElement("button");
          chip.type = "button";
          chip.textContent = `${u.name.split(" ")[0]} · ${u.ap}PA`;
          chip.style.cssText = `
            font-size:0.64em;
            font-weight:bold;
            padding:4px 7px;
            border-radius:999px;
            border:1px solid ${isAct ? "#4ef2a1" : u.ap > 0 ? "rgba(125,211,252,0.55)" : "rgba(148,163,184,0.25)"};
            background:${isAct ? "rgba(78,242,161,0.28)" : "rgba(7,14,22,0.82)"};
            color:${isAct ? "#ecfdf5" : "#e2e8f0"};
            cursor:pointer;
          `;
          chip.addEventListener("click", (ev) => {
            ev.stopPropagation();
            if (b.phase !== "player") return;
            b.selectedUnitId = isAct ? null : u.id;
            b.mode = "normal";
            b.ordersMinimized = false;
            addBattleLog(isAct ? `Ordens de ${u.name} recolhidas.` : `Operacional selecionado: ${u.name}.`);
            renderBattle();
          });
          squadBar.appendChild(chip);
        });
      }
    }

    const existingBottomHud = document.getElementById("iso-bottom-hud");
    if (existingBottomHud && existingBottomHud.parentElement) {
      existingBottomHud.parentElement.removeChild(existingBottomHud);
    }
  }
  const selUnit = getSelectedUnit();
  const selEnemy = getSelectedEnemy();

  let isoMetrics = null;
  if (canvas) {
    const m = getIsoMetrics(canvas);
    isoMetrics = m;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const rw = Math.round(m.w);
    const rh = Math.round(m.h);
    const targetW = Math.round(rw * dpr);
    const targetH = Math.round(rh * dpr);
    if (Math.abs(canvas.width - targetW) > 1 || Math.abs(canvas.height - targetH) > 1) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#081019";
    ctx.fillRect(0, 0, rw, rh);

    drawIsoBoardSkirt(ctx, b, m);

    const maxMoveRange = getUnitMoveRange(selUnit);
    const isForestMission = b.missionIndex === 0;

    // 1. Terreno contínuo 2.5D sem linhas de grelha permanentes (Y-sorting)
    for (let sum = 0; sum <= ISO_VIEW_W + ISO_VIEW_H - 2; sum++) {
      for (let vy = 0; vy < ISO_VIEW_H; vy++) {
        const vx = sum - vy;
        if (vx < 0 || vx >= ISO_VIEW_W) continue;
        const gx = b.camera.x + vx;
        const gy = b.camera.y + vy;
        const { sx, sy, elev } = worldToIso(gx, gy, b, m);

        const tileType = b.grid[gy][gx];
        const unitHere = b.units.find((u) => u.x === gx && u.y === gy && u.hp > 0);
        const enemyHere = b.enemies.find((e) => e.x === gx && e.y === gy && e.hp > 0);
        const hostageHere = (b.hostages || []).find((h) => !h.rescued && h.x === gx && h.y === gy);
        const smokeHere = isInSmoke(b, gx, gy);

        const distFromSel = selUnit ? Math.abs(selUnit.x - gx) + Math.abs(selUnit.y - gy) : 99;
        const canMoveHere =
          b.phase === "player" &&
          b.mode === "move" &&
          selUnit &&
          selUnit.ap >= 1 &&
          !unitHere &&
          !enemyHere &&
          !hostageHere &&
          tileType !== 3 &&
          distFromSel > 0 &&
          distFromSel <= maxMoveRange;

        const surfaceType = getCellTerrainSurface(b, gx, gy);
        const coverAtMoveTile = canMoveHere ? getTileCoverAt(b, gx, gy) : 0;
        drawIsoTerrainColumn(ctx, sx, sy, m.tileW, m.tileH, elev, surfaceType, gx, gy, canMoveHere, b.mode === "move", smokeHere, coverAtMoveTile);

        if (b.hoverTile && (b.mode === "frag" || b.mode === "smoke")) {
          const hx = b.hoverTile.x;
          const hy = b.hoverTile.y;
          if (b.mode === "frag") {
            if (Math.abs(gx - hx) <= 1 && Math.abs(gy - hy) <= 1) {
              const isCenter = gx === hx && gy === hy;
              drawIsoDiamond(
                ctx,
                sx,
                sy,
                m.tileW,
                m.tileH,
                isCenter ? "rgba(239, 68, 68, 0.42)" : "rgba(251, 146, 60, 0.28)",
                isCenter ? "#ff4d4d" : "#fb923c",
                isCenter ? 1.8 : 1.3
              );
            }
          } else if (b.mode === "smoke") {
            if (gy === hy && Math.abs(gx - hx) <= 1) {
              const isCenter = gx === hx;
              drawIsoDiamond(
                ctx,
                sx,
                sy,
                m.tileW,
                m.tileH,
                isCenter ? "rgba(226, 232, 240, 0.44)" : "rgba(148, 163, 184, 0.28)",
                "#f8fafc",
                isCenter ? 1.8 : 1.3
              );
            }
          }
        }
      }
    }

    // 2. Linha de visão apenas quando o jogador aponta para um inimigo (modo disparar ou alvo apontado)
    const pointedEnemy = (b.mode === "fire" && selEnemy) ? selEnemy : null;
    if (selUnit && pointedEnemy) {
      const uPos = worldToIso(selUnit.x, selUnit.y, b, m);
      const ePos = worldToIso(pointedEnemy.x, pointedEnemy.y, b, m);
      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = "rgba(250, 204, 21, 0.86)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(uPos.sx, uPos.sy - 14);
      ctx.lineTo(ePos.sx, ePos.sy - 14);
      ctx.stroke();
      ctx.restore();
    }

    // 3. Y-Sorting de edifícios, obstáculos, caixas, soldados 2D e alienígenas 2D
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

        if (tileType === 1 || tileType === 2 || tileType === 3 || tileType === 4) {
          drawIsoCoverBlock(ctx, sx, sy, m.tileW, m.tileH, m.wallH, tileType, isForestMission, gx, gy);
        }

        const hostageSpriteHere = (b.hostages || []).find((h) => !h.rescued && h.x === gx && h.y === gy);
        if (hostageSpriteHere) {
          drawTacticalCornerBrackets(ctx, sx, sy, m.tileW * 0.9, m.tileH * 0.9, "#facc15", 1.8);
          drawIsoSoldierSprite(ctx, sx, sy, m.tileW, m.tileH, { ...hostageSpriteHere, crouched: true }, false, 0);
          ctx.fillStyle = "#fde047";
          ctx.font = "bold 8px monospace";
          ctx.textAlign = "center";
          ctx.fillText("SOS", sx, sy - m.tileH * 0.95);
        }

        if (unitHere) {
          const snap = getCoverSnapOffset(b, gx, gy, m.tileW, m.tileH);
          const isUnitSel = Boolean(selUnit && selUnit.id === unitHere.id);
          const activeMoveAnim = (b.vfxQueue || []).find((v) => v.type === "move_anim" && v.unitId === unitHere.id);
          const activeFireAnim = (b.vfxQueue || []).find((v) => v.type === "shot" && v.shooterId === unitHere.id);
          let drawSx = sx + snap.ox;
          let drawSy = sy + snap.oy;
          const animState = {
            dirX: unitHere.facingX || 1,
            stridePhase: 0,
            isMoving: false,
            isFiring: Boolean(activeFireAnim),
            recoil: 0
          };
          if (activeMoveAnim) {
            const p = Math.min(1, (performance.now() - activeMoveAnim.createdAt) / activeMoveAnim.duration);
            const fromPt = worldToIso(activeMoveAnim.fromX, activeMoveAnim.fromY, b, m);
            const toPt = worldToIso(gx, gy, b, m);
            drawSx = fromPt.sx + (toPt.sx - fromPt.sx) * p;
            drawSy = fromPt.sy + (toPt.sy - fromPt.sy) * p;
            animState.isMoving = true;
            animState.stridePhase = p * Math.PI * 5;
            animState.dirX = (toPt.sx - fromPt.sx) >= 0 ? 1 : -1;
          }
          if (activeFireAnim) {
            const p = Math.min(1, (performance.now() - activeFireAnim.createdAt) / activeFireAnim.duration);
            animState.recoil = p < 0.35 ? (1 - p / 0.35) : 0;
          }
          drawIsoSoldierSprite(ctx, drawSx, drawSy, m.tileW, m.tileH, unitHere, isUnitSel, snap.coverLevel, animState);
        }

        if (enemyHere) {
          drawIsoAlienSprite(ctx, sx, sy, m.tileW, m.tileH, enemyHere, Boolean(selEnemy && selEnemy.id === enemyHere.id));
        }
      }
    }

    // 4. Camada de efeitos visuais 2.5D (disparos traçantes, explosões e dano flutuante)
    drawBattleVfxLayer(ctx, b, m);

    ctx.restore();
  }

  renderFloatingUnitOrders(b, selUnit, canvas, isoMetrics);

  if (canvas && canvas.parentElement) {
    let modePill = document.getElementById("iso-mode-pill");
    if (!modePill) {
      modePill = document.createElement("div");
      modePill.id = "iso-mode-pill";
      modePill.style.cssText = `
        position:absolute;
        bottom:8px;
        left:50%;
        transform:translateX(-50%);
        z-index:22;
        display:none;
        align-items:center;
        gap:8px;
        padding:5px 10px;
        border-radius:999px;
        background:rgba(9,17,26,0.94);
        border:1px solid #4ef2a1;
        color:#ecfdf5;
        font-size:0.72em;
        box-shadow:0 6px 18px rgba(0,0,0,0.55);
        white-space:nowrap;
      `;
      canvas.parentElement.appendChild(modePill);
    }

    const activeTargetModes = ["move", "fire", "frag", "smoke"];
    if (b.phase === "player" && selUnit && (activeTargetModes.includes(b.mode) || b.ordersMinimized)) {
      modePill.style.display = "inline-flex";
      if (b.mode === "move") {
        modePill.innerHTML = `
          <span>MOVER <b>${selUnit.name.split(" ")[0]}</b> (alc. ${getUnitMoveRange(selUnit)}) · toca num losango</span>
          <button type="button" id="cancel-mode-pill-btn" style="background:#1e293b;color:#f8fafc;border:1px solid rgba(255,255,255,0.25);border-radius:999px;padding:2px 8px;font-size:0.9em;cursor:pointer;">CANCELAR</button>
        `;
      } else if (b.mode === "fire") {
        const tgt = getSelectedEnemy();
        if (tgt) {
          const chance = calculateHitChance(selUnit, tgt, b);
          const dmg = estimateUnitDamage(selUnit, tgt);
          modePill.innerHTML = `
            <span>ALVO: <b>${tgt.name}</b> (${chance}% · ~${dmg}D)</span>
            <button type="button" id="confirm-fire-pill-btn" style="background:#16a34a;color:#fff;border:1px solid #4ef2a1;border-radius:999px;padding:2px 9px;font-size:0.9em;font-weight:bold;cursor:pointer;">DISPARAR</button>
            <button type="button" id="cancel-mode-pill-btn" style="background:#1e293b;color:#f8fafc;border:1px solid rgba(255,255,255,0.25);border-radius:999px;padding:2px 7px;font-size:0.9em;cursor:pointer;">✕</button>
          `;
        } else {
          modePill.innerHTML = `
            <span>MIRA <b>${selUnit.name.split(" ")[0]}</b> · toca num inimigo no campo</span>
            <button type="button" id="cancel-mode-pill-btn" style="background:#1e293b;color:#f8fafc;border:1px solid rgba(255,255,255,0.25);border-radius:999px;padding:2px 8px;font-size:0.9em;cursor:pointer;">CANCELAR</button>
          `;
        }
      } else if (b.mode === "frag") {
        modePill.innerHTML = `
          <span>FRAG <b>${selUnit.name.split(" ")[0]}</b> · toca no alvo no campo</span>
          <button type="button" id="cancel-mode-pill-btn" style="background:#1e293b;color:#f8fafc;border:1px solid rgba(255,255,255,0.25);border-radius:999px;padding:2px 8px;font-size:0.9em;cursor:pointer;">CANCELAR</button>
        `;
      } else if (b.mode === "smoke") {
        modePill.innerHTML = `
          <span>FUMO <b>${selUnit.name.split(" ")[0]}</b> · toca onde lançar</span>
          <button type="button" id="cancel-mode-pill-btn" style="background:#1e293b;color:#f8fafc;border:1px solid rgba(255,255,255,0.25);border-radius:999px;padding:2px 8px;font-size:0.9em;cursor:pointer;">CANCELAR</button>
        `;
      } else {
        modePill.innerHTML = `
          <span>ORDENS OCULTAS · campo livre</span>
          <button type="button" id="restore-orders-pill-btn" style="background:rgba(78,242,161,0.22);color:#4ef2a1;border:1px solid #4ef2a1;border-radius:999px;padding:2px 8px;font-size:0.9em;cursor:pointer;">MOSTRAR</button>
        `;
      }

      const firePillBtn = modePill.querySelector("#confirm-fire-pill-btn");
      if (firePillBtn) {
        firePillBtn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          b.mode = "normal";
          b.ordersMinimized = false;
          fireAtTarget();
        });
      }

      const cBtn = modePill.querySelector("#cancel-mode-pill-btn");
      if (cBtn) {
        cBtn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          b.mode = "normal";
          b.hoverTile = null;
          b.ordersMinimized = false;
          renderBattle();
        });
      }

      const rBtn = modePill.querySelector("#restore-orders-pill-btn");
      if (rBtn) {
        rBtn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          b.ordersMinimized = false;
          renderBattle();
        });
      }
    } else {
      modePill.style.display = "none";
    }
  }

  const setText = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  ensureEndTurnVisible(b);

  const unitHpEl = document.getElementById("unit-hp");
  const unitApEl = document.getElementById("unit-ap");
  const unitAmmoEl = document.getElementById("unit-ammo");
  const hitChanceEl = document.getElementById("hit-chance");

  if (selUnit) {
    const maxMove = getUnitMoveRange(selUnit);
    const postureName = selUnit.crouched ? "AGACHADO" : "DE PÉ (CORRER)";
    setText("selected-unit", `${selUnit.name} (${selUnit.role}) · ${postureName}`);
    if (unitHpEl && unitApEl && unitAmmoEl) {
      unitHpEl.textContent = `${selUnit.hp}/${selUnit.maxHp} HP`;
      unitApEl.textContent = `${selUnit.ap}/${selUnit.maxAp} PA · MOV ${maxMove}`;
      unitAmmoEl.textContent = `${selUnit.ammo}/${selUnit.maxAmmo} MUN`;
    } else {
      setText("unit-hp", `${selUnit.hp}/${selUnit.maxHp} HP · ${selUnit.ap}/${selUnit.maxAp} PA · ${selUnit.ammo}/${selUnit.maxAmmo} MUN`);
    }
  } else {
    setText("selected-unit", "SEM OPERACIONAL");
    if (unitHpEl && unitApEl && unitAmmoEl) {
      unitHpEl.textContent = "0 HP";
      unitApEl.textContent = "0 PA";
      unitAmmoEl.textContent = "0 MUN";
    } else {
      setText("unit-hp", "0 HP · 0 PA · 0 MUN");
    }
  }

  if (selUnit && selEnemy) {
    const chance = calculateHitChance(selUnit, selEnemy, b);
    const cover = getTileCoverAt(b, selEnemy.x, selEnemy.y);
    const coverText = cover === 2 ? "COB. PESADA" : cover === 1 ? "MEIA COB." : "SEM COB.";
    const estDmg = estimateUnitDamage(selUnit, selEnemy);
    setText("target-info", `${selEnemy.name} (${selEnemy.hp} HP · ${coverText})`);
    const chanceStr = `CHANCE: ${chance}% · DANO EST.: ~${estDmg}`;
    if (hitChanceEl) {
      hitChanceEl.textContent = chanceStr;
    } else {
      setText("target-info", `${selEnemy.name} (${selEnemy.hp} HP · ${coverText}) · ${chanceStr}`);
    }
  } else if (selEnemy) {
    const cover = getTileCoverAt(b, selEnemy.x, selEnemy.y);
    const coverText = cover === 2 ? "COB. PESADA" : cover === 1 ? "MEIA COB." : "SEM COB.";
    setText("target-info", `${selEnemy.name} (${selEnemy.hp} HP · ${coverText})`);
    const chanceStr = "CHANCE: --% · DANO EST.: --";
    if (hitChanceEl) {
      hitChanceEl.textContent = chanceStr;
    } else {
      setText("target-info", `${selEnemy.name} (${selEnemy.hp} HP · ${coverText}) · ${chanceStr}`);
    }
  } else {
    setText("target-info", "NENHUM ALVO");
    if (hitChanceEl) hitChanceEl.textContent = "CHANCE: --% · DANO EST.: --";
  }

  const logEl = document.getElementById("battle-log");
  if (logEl) logEl.textContent = b.log;
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
    if (b.mode === "fire" && selUnit) {
      const chance = calculateHitChance(selUnit, enemyHere, b);
      const dmg = estimateUnitDamage(selUnit, enemyHere);
      addBattleLog(`Mira trancada em ${enemyHere.name} (${chance}% acerto · ~${dmg} dano) — confirma DISPARAR.`);
    } else {
      addBattleLog(`Alvo selecionado: ${enemyHere.name} (${enemyHere.archetypeId.toUpperCase()}).`);
    }
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
      b.ordersMinimized = false;
      b.orderTab = "mov";
      unitHere.overwatch = false;
      centerCameraOnUnit(unitHere);
      addBattleLog(`Operacional selecionado: ${unitHere.name} (${unitHere.crouched ? "Agachado/Cauteloso: 2" : "Em pé/Correr: 4"}).`);
    }
    renderBattle();
    return;
  }

  const hostageAtClick = (b.hostages || []).find((h) => !h.rescued && h.x === x && h.y === y);
  if (hostageAtClick) {
    addBattleLog(`${hostageAtClick.name} [SOS] aguarda resgate — aproxima um operacional a 1 casa.`);
    return;
  }

  if (selUnit && selUnit.ap >= 1 && b.grid[y][x] !== 3) {
    const dist = Math.abs(selUnit.x - x) + Math.abs(selUnit.y - y);
    const maxStep = getUnitMoveRange(selUnit);
    if (dist > 0 && dist <= maxStep) {
      const prevX = selUnit.x;
      const prevY = selUnit.y;
      const moveType = selUnit.crouched ? "avançou cautelosamente" : "correu";
      selUnit.facingX = (x - prevX) >= 0 ? 1 : -1;
      selUnit.x = x;
      selUnit.y = y;
      spawnBattleVfx({
        type: "move_anim",
        unitId: selUnit.id,
        fromX: prevX,
        fromY: prevY,
        duration: selUnit.crouched ? 460 : 340
      });
      centerCameraOnUnit(selUnit);
      selUnit.ap -= 1;
      selUnit.hunker = false;
      selUnit.stunned = false;
      if (b.mode === "move") { b.mode = "normal"; b.ordersMinimized = false; }

      let rescuedMsg = "";
      if (b.hostages && b.hostages.length) {
        b.hostages.forEach((h) => {
          if (!h.rescued && Math.abs(selUnit.x - h.x) + Math.abs(selUnit.y - h.y) <= 1) {
            h.rescued = true;
            b.units.push({
              id: h.id,
              name: h.name,
              codename: "RESGATE",
              role: h.role,
              side: "player",
              x: h.x,
              y: h.y,
              hp: h.hp,
              maxHp: h.maxHp,
              ap: 2,
              maxAp: 2,
              ammo: 10,
              maxAmmo: 10,
              aim: h.aim,
              dodge: 14,
              medkits: h.role === "Médico" ? 2 : 0,
              frags: 1,
              smokes: 1,
              overwatch: false,
              hunker: false,
              crouched: false,
              stunned: false
            });
            rescuedMsg = ` | RESGATE: ${h.name} estabilizado e ativo na equipa!`;
          }
        });
      }

      addBattleLog(`${selUnit.name} ${moveType} para (${x + 1},${y + 1}).${rescuedMsg}`);
      renderBattle();
      checkBattleOutcome();
    }
  }
}

function throwFragGrenade(unit, tx, ty) {
  const b = state.battle;
  if (!b || !unit || unit.ap < 1 || unit.frags <= 0) return;

  unit.ap -= 1;
  unit.frags -= 1;
  b.mode = "normal";
  b.hoverTile = null;
  b.ordersMinimized = false;

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

  spawnBattleVfx({ type: "explosion", x: tx, y: ty, duration: 640 });
  spawnBattleVfx({ type: "floater", x: tx, y: ty, text: hits > 0 ? `BOOM! (${hits})` : "EXPLOSÃO", color: "#fb923c", duration: 760 });
  addBattleLog(`${unit.name} lançou granada de fragmentação em (${tx + 1},${ty + 1}) — ${hits} inimigo(s) atingido(s).`);
  renderBattle();
  checkBattleOutcome();
}

function throwSmokeGrenade(unit, tx, ty) {
  const b = state.battle;
  if (!b || !unit || unit.ap < 1 || unit.smokes <= 0) return;

  unit.ap -= 1;
  unit.smokes -= 1;
  b.mode = "normal";
  b.hoverTile = null;
  b.ordersMinimized = false;

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
    unit.facingX = (target.x - unit.x) >= 0 ? 1 : -1;
    spawnBattleVfx({ type: "shot", shooterId: unit.id, fromX: unit.x, fromY: unit.y, toX: target.x, toY: target.y, color: "#38bdf8", hit: true, duration: 420 });
    spawnBattleVfx({ type: "floater", x: target.x, y: target.y, text: `-${finalDmg} HP`, color: "#4ef2a1", duration: 750 });
    addBattleLog(`${unit.name} acertou em ${target.name} (${chance}%) — ${finalDmg} de dano!`);
  } else {
    spawnBattleVfx({ type: "shot", fromX: unit.x, fromY: unit.y, toX: target.x, toY: target.y, color: "#94a3b8", hit: false, duration: 380 });
    spawnBattleVfx({ type: "floater", x: target.x, y: target.y, text: "FALHOU", color: "#cbd5e1", duration: 680 });
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
      const steps = Math.min(en.moveRange || 2, dist - 2);
      for (let s = 0; s < steps; s++) {
        const candidates = [
          [en.x + Math.sign(target.x - en.x), en.y],
          [en.x, en.y + Math.sign(target.y - en.y)],
          [en.x, en.y - 1],
          [en.x, en.y + 1],
          [en.x - 1, en.y]
        ];
        let moved = false;
        for (const [nx, ny] of candidates) {
          if (nx === en.x && ny === en.y) continue;
          if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) continue;
          if (b.grid[ny][nx] === 3) continue;
          if (b.units.some((u) => u.x === nx && u.y === ny && u.hp > 0)) continue;
          if (b.enemies.some((other) => other.id !== en.id && other.x === nx && other.y === ny && other.hp > 0)) continue;
          if ((b.hostages || []).some((h) => !h.rescued && h.x === nx && h.y === ny)) continue;
          en.x = nx;
          en.y = ny;
          moved = true;
          break;
        }
        if (!moved) break;
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
      spawnBattleVfx({ type: "shot", fromX: en.x, fromY: en.y, toX: target.x, toY: target.y, color: "#f87171", hit: true, duration: 420 });
      spawnBattleVfx({ type: "floater", x: target.x, y: target.y, text: `-${dmg} HP`, color: "#f87171", duration: 750 });
      addBattleLog(`${en.name} atingiu ${target.name} por ${dmg} HP!`);
    } else {
      spawnBattleVfx({ type: "shot", fromX: en.x, fromY: en.y, toX: target.x, toY: target.y, color: "#fca5a5", hit: false, duration: 380 });
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
  checkBattleOutcome();
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


function toggleGameFullscreen() {
  const docEl = document.documentElement;
  const isFs = Boolean(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
  try {
    if (!isFs) {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  } catch (_) {}
}

function ensureGlobalResponsiveShell() {
  setTacticalViewportLock(Boolean(state.battle && document.getElementById("tactical")?.classList.contains("active")));
  if (!document.getElementById("oz-fullscreen-toggle-btn") && document.body) {
    const fsBtn = document.createElement("button");
    fsBtn.id = "oz-fullscreen-toggle-btn";
    fsBtn.type = "button";
    fsBtn.textContent = "⛶ ECRÃ INTEIRO";
    fsBtn.addEventListener("click", toggleGameFullscreen);
    document.body.appendChild(fsBtn);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ensureGlobalResponsiveShell();
  let resizeTimer = null;
  const handleViewportChange = () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (state.battle) {
        const canvas = document.getElementById("iso-battle-canvas");
        if (canvas) clampBattlePan(state.battle, getIsoMetrics(canvas, true));
        renderBattle();
      }
    }, 60);
  };
  window.addEventListener("resize", handleViewportChange);
  window.addEventListener("orientationchange", handleViewportChange);
  document.addEventListener("fullscreenchange", handleViewportChange);
  document.addEventListener("webkitfullscreenchange", handleViewportChange);
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
