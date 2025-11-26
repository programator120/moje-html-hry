const TOTAL_LAPS = 3;
let currentLang = 'sk';
let players = [];
let currentPlayerIndex = 0;
const events = [];

const translations = {
  en: {
    title: 'Tabletop Dostihy',
    subtitle: 'Race around the paddock with lightweight HTML sprites.',
    languageLabel: 'Language',
    playersLabel: 'Riders',
    startButton: 'Start race',
    rollButton: 'Roll dice',
    boardHeading: 'Race track',
    boardHint: 'Hover squares to see where your horse gallops.',
    scoreboardHeading: 'Stables',
    scoreboardHint: 'Tokens show the position and laps of each rider.',
    logHeading: 'Race log',
    logHint: 'Every die roll is written down.',
    footerNote: 'Open index.html in your browser, choose riders and start. First rider to finish all laps wins.',
    lapsInfo: laps => `Finish ${laps} laps to win.`,
    turnInfo: name => `${name} is up next.`,
    lapStatus: (lap, total) => `Lap ${lap}/${total}`,
    tileTitles: {
      start: 'Start Gate',
      flats: 'Fast Flats',
      jump: 'Hedged Jump',
      water: 'Water Ditch',
      meadow: 'Meadow',
      fans: 'Grandstand'
    },
    colorNames: {
      red: 'Red Mare',
      blue: 'Blue Stallion',
      green: 'Green Pony',
      yellow: 'Golden Charger'
    },
    logs: {
      start: count => `The race readies ${count} riders at the start gate.`,
      roll: (name, roll) => `${name} rolls a ${roll}.`,
      lap: (name, lap) => `${name} completes lap ${lap}.`,
      win: name => `${name} wins the tabletop Dostihy!`
    }
  },
  sk: {
    title: 'Dostihy na stole',
    subtitle: 'Pretekaj okolo dráhy a sleduj sprity koníkov.',
    languageLabel: 'Jazyk',
    playersLabel: 'Jazdci',
    startButton: 'Začať hru',
    rollButton: 'Hodiť kockou',
    boardHeading: 'Dostihová dráha',
    boardHint: 'Prejdi kurzorom na políčko a zistíš jeho názov.',
    scoreboardHeading: 'Stajne',
    scoreboardHint: 'Čipy zobrazujú polohu jazdcov a počet kôl.',
    logHeading: 'Denník pretekov',
    logHint: 'Každý hod kockou sa zapisuje.',
    footerNote: 'Otvor index.html v prehliadači, nastav jazdcov a stlač „Začať hru“. Víťazom je ten, kto prvý dokončí všetky kolá.',
    lapsInfo: laps => `Víťaz musí dokončiť ${laps} kolá.`,
    turnInfo: name => `Na ťahu je ${name}.`,
    lapStatus: (lap, total) => `Kolo ${lap}/${total}`,
    tileTitles: {
      start: 'Štart',
      flats: 'Rovina',
      jump: 'Prekážka',
      water: 'Vodná priekopa',
      meadow: 'Lúka',
      fans: 'Tribúna'
    },
    colorNames: {
      red: 'Červená kobyla',
      blue: 'Modrý žrebec',
      green: 'Zelený poník',
      yellow: 'Zlatý tátoš'
    },
    logs: {
      start: count => `Na štart sa stavia ${count} jazdcov.`,
      roll: (name, roll) => `${name} hodil ${roll}.`,
      lap: (name, lap) => `${name} dokončil ${lap}. kolo.`,
      win: name => `${name} vyhráva dostihy!`
    }
  },
  cs: {
    title: 'Dostihy na stole',
    subtitle: 'Závod kolem oválu s lehkými HTML sprity.',
    languageLabel: 'Jazyk',
    playersLabel: 'Jezdci',
    startButton: 'Spustit závod',
    rollButton: 'Hodit kostkou',
    boardHeading: 'Dostihová dráha',
    boardHint: 'Najeď na pole a zjistíš jeho název.',
    scoreboardHeading: 'Stáje',
    scoreboardHint: 'Žetony ukazují pozici jezdců a počet kol.',
    logHeading: 'Zápis závodu',
    logHint: 'Každý hod kostkou se zapisuje.',
    footerNote: 'Otevři index.html v prohlížeči, nastav jezdce a spusť závod. Vyhrává první, kdo dokončí všechna kola.',
    lapsInfo: laps => `Pro výhru jsou potřeba ${laps} kola.`,
    turnInfo: name => `Na tahu je ${name}.`,
    lapStatus: (lap, total) => `${lap}. kolo z ${total}`,
    tileTitles: {
      start: 'Start',
      flats: 'Rovina',
      jump: 'Překážka',
      water: 'Vodní příkop',
      meadow: 'Louka',
      fans: 'Tribuna'
    },
    colorNames: {
      red: 'Červená kobyla',
      blue: 'Modrý hřebec',
      green: 'Zelený poník',
      yellow: 'Zlatý oř'
    },
    logs: {
      start: count => `Na start nastupuje ${count} jezdců.`,
      roll: (name, roll) => `${name} hodil ${roll}.`,
      lap: (name, lap) => `${name} dokončil ${lap}. kolo.`,
      win: name => `${name} vítězí!`
    }
  }
};

const tiles = [
  { key: 'start', type: 'start' },
  { key: 'flats', type: 'flats' },
  { key: 'jump', type: 'jump' },
  { key: 'meadow', type: 'meadow' },
  { key: 'water', type: 'water' },
  { key: 'flats', type: 'flats' },
  { key: 'fans', type: 'flats' },
  { key: 'jump', type: 'jump' },
  { key: 'meadow', type: 'meadow' },
  { key: 'water', type: 'water' },
  { key: 'flats', type: 'flats' },
  { key: 'flats', type: 'flats' },
  { key: 'jump', type: 'jump' },
  { key: 'meadow', type: 'meadow' },
  { key: 'fans', type: 'flats' },
  { key: 'water', type: 'water' }
];

const coordinates = [
  { row: 5, col: 1 },
  { row: 5, col: 2 },
  { row: 5, col: 3 },
  { row: 5, col: 4 },
  { row: 5, col: 5 },
  { row: 4, col: 5 },
  { row: 3, col: 5 },
  { row: 2, col: 5 },
  { row: 1, col: 5 },
  { row: 1, col: 4 },
  { row: 1, col: 3 },
  { row: 1, col: 2 },
  { row: 1, col: 1 },
  { row: 2, col: 1 },
  { row: 3, col: 1 },
  { row: 4, col: 1 }
];

const startButton = document.getElementById('startButton');
const rollButton = document.getElementById('rollButton');
const languageSelector = document.getElementById('languageSelector');
const playersCount = document.getElementById('playersCount');
const board = document.getElementById('board');
const playerList = document.getElementById('playerList');
const logList = document.getElementById('logList');
const lapsInfo = document.getElementById('lapsInfo');
const turnInfo = document.getElementById('turnInfo');

function getTranslation(key) {
  return translations[currentLang][key];
}

function playerName(player) {
  const name = translations[currentLang].colorNames[player.color];
  return name || player.color;
}

function buildBoard() {
  board.innerHTML = '';
  tiles.forEach((tile, idx) => {
    const tileEl = document.createElement('div');
    tileEl.className = `tile ${tile.type}`;
    tileEl.style.gridRow = coordinates[idx].row;
    tileEl.style.gridColumn = coordinates[idx].col;

    const index = document.createElement('div');
    index.className = 'tile-index';
    index.textContent = idx + 1;

    const name = document.createElement('div');
    name.className = 'tile-name';
    name.textContent = translations[currentLang].tileTitles[tile.key];

    const occupants = document.createElement('div');
    occupants.className = 'occupants';
    occupants.dataset.index = idx.toString();

    tileEl.append(index, name, occupants);
    board.appendChild(tileEl);
  });
  updateBoardState();
}

function createPlayers(count) {
  const colors = ['red', 'blue', 'green', 'yellow'];
  players = [];
  for (let i = 0; i < count; i += 1) {
    players.push({
      id: i,
      color: colors[i],
      position: 0,
      lap: 0
    });
  }
}

function updateBoardState() {
  document.querySelectorAll('.occupants').forEach(el => (el.innerHTML = ''));
  players.forEach(player => {
    const holder = board.querySelector(`.occupants[data-index="${player.position}"]`);
    if (holder) {
      const icon = document.createElement('div');
      icon.className = `horse-icon ${player.color}`;
      icon.title = playerName(player);
      holder.appendChild(icon);
    }
  });
}

function updatePlayerList() {
  playerList.innerHTML = '';
  players.forEach((player, idx) => {
    const li = document.createElement('li');
    li.className = 'player-card';
    if (idx === currentPlayerIndex && rollButton.disabled === false) {
      li.classList.add('active');
    }

    const chip = document.createElement('div');
    chip.className = `chip ${player.color}`;

    const label = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'player-name';
    name.textContent = playerName(player);

    const meta = document.createElement('div');
    meta.className = 'player-meta';
    const tileName = translations[currentLang].tileTitles[tiles[player.position].key];
    meta.textContent = `${tileName} • ${translations[currentLang].lapStatus(player.lap, TOTAL_LAPS)}`;

    label.append(name, meta);

    const badge = document.createElement('div');
    badge.className = 'roll-badge';
    badge.textContent = `${player.position + 1}/${tiles.length}`;

    li.append(chip, label, badge);
    playerList.appendChild(li);
  });
}

function addLog(type, payload) {
  events.unshift({ type, payload });
  if (events.length > 18) events.pop();
  renderLog();
}

function renderLog() {
  logList.innerHTML = '';
  events.forEach(event => {
    const li = document.createElement('li');
    let message = '';
    const t = translations[currentLang].logs;
    switch (event.type) {
      case 'start':
        message = t.start(event.payload.count);
        break;
      case 'roll':
        message = t.roll(playerName(event.payload.player), event.payload.roll);
        break;
      case 'lap':
        message = t.lap(playerName(event.payload.player), event.payload.lap);
        break;
      case 'win':
        message = t.win(playerName(event.payload.player));
        break;
      default:
        message = '';
    }
    li.textContent = message;
    logList.appendChild(li);
  });
}

function startGame() {
  const count = Math.min(4, Math.max(2, Number(playersCount.value) || 2));
  playersCount.value = count;
  createPlayers(count);
  currentPlayerIndex = 0;
  rollButton.disabled = false;
  events.length = 0;
  addLog('start', { count });
  updateBoardState();
  updatePlayerList();
  updateTurnInfo();
}

function movePlayer(player, roll) {
  const nextRaw = player.position + roll;
  if (nextRaw >= tiles.length) {
    player.lap += 1;
    addLog('lap', { player, lap: player.lap });
  }
  player.position = nextRaw % tiles.length;
}

function rollDice() {
  const player = players[currentPlayerIndex];
  const roll = Math.floor(Math.random() * 6) + 1;
  addLog('roll', { player, roll });
  movePlayer(player, roll);
  updateBoardState();
  updatePlayerList();

  if (player.lap >= TOTAL_LAPS) {
    addLog('win', { player });
    rollButton.disabled = true;
    updateTurnInfo(true);
    return;
  }

  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  updateTurnInfo();
}

function updateTurnInfo(hasWinner = false) {
  if (hasWinner) {
    const winner = players[currentPlayerIndex];
    turnInfo.textContent = translations[currentLang].logs.win(playerName(winner));
    return;
  }
  const player = players[currentPlayerIndex];
  if (!player) {
    turnInfo.textContent = '';
    return;
  }
  turnInfo.textContent = translations[currentLang].turnInfo(playerName(player));
}

function applyStaticTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = translations[currentLang][key];
    if (typeof value === 'string') {
      el.textContent = value;
    }
  });
  lapsInfo.textContent = translations[currentLang].lapsInfo(TOTAL_LAPS);
  buildBoard();
  updatePlayerList();
  renderLog();
  updateTurnInfo();
}

startButton.addEventListener('click', startGame);
rollButton.addEventListener('click', rollDice);
languageSelector.addEventListener('change', event => {
  currentLang = event.target.value;
  document.documentElement.lang = currentLang;
  applyStaticTranslations();
});

window.addEventListener('DOMContentLoaded', () => {
  applyStaticTranslations();
  updateBoardState();
});
