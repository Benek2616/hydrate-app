const ring = document.getElementById('ring');
const currentAmountEl = document.getElementById('current-amount');
const goalDisplay = document.getElementById('goal-display');
const percentEl = document.getElementById('percent');
const todayLog = document.getElementById('today-log');
const goalInput = document.getElementById('goal-input');
const customMl = document.getElementById('custom-ml');
const CIRCUMFERENCE = 2 * Math.PI * 88; // ≈ 553

let state = {
  goal: 2000,
  logs: [],       // { ml, time }
  date: null
};

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function load() {
  const saved = JSON.parse(localStorage.getItem('hydrate') || '{}');
  const today = todayStr();
  
  if (saved.date === today) {
    state = { ...state, ...saved };
  } else {
    state = {
      goal: saved.goal || 2000,
      logs: [],
      date: today
    };
  }
  
  goalInput.value = state.goal;
  goalDisplay.textContent = state.goal;
  render();
}

function save() {
  state.date = todayStr();
  localStorage.setItem('hydrate', JSON.stringify(state));
}

function totalMl() {
  return state.logs.reduce((sum, l) => sum + l.ml, 0);
}

function render() {
  const total = totalMl();
  const pct = Math.min(100, Math.round((total / state.goal) * 100));
  
  currentAmountEl.textContent = total;
  percentEl.textContent = pct + '%';
  
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
  ring.style.strokeDashoffset = offset;
  
  // Log
  if (state.logs.length === 0) {
    todayLog.innerHTML = '<div class="empty-log">Brak wpisów. Dodaj pierwszą szklankę!</div>';
  } else {
    todayLog.innerHTML = state.logs
      .slice()
      .reverse()
      .map(l => `
        <div class="log-item">
          <span class="ml">+${l.ml} ml</span>
          <span class="time">${l.time}</span>
        </div>
      `).join('');
  }
}

function addWater(ml) {
  if (!ml || ml <= 0) return;
  
  const now = new Date();
  const time = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  
  state.logs.push({ ml: Math.round(ml), time });
  save();
  render();
  
  // Mała animacja
  currentAmountEl.classList.remove('pop');
  void currentAmountEl.offsetWidth;
  currentAmountEl.classList.add('pop');
}

// Quick buttons
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    addWater(parseInt(btn.dataset.ml));
  });
});

// Custom
document.getElementById('custom-btn').addEventListener('click', () => {
  const val = parseInt(customMl.value);
  if (val > 0) {
    addWater(val);
    customMl.value = '';
  }
});

customMl.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    document.getElementById('custom-btn').click();
  }
});

// Undo
document.getElementById('undo-btn').addEventListener('click', () => {
  if (state.logs.length > 0) {
    state.logs.pop();
    save();
    render();
  }
});

// Goal
document.getElementById('save-goal').addEventListener('click', () => {
  const val = parseInt(goalInput.value);
  if (val >= 500 && val <= 6000) {
    state.goal = val;
    goalDisplay.textContent = val;
    save();
    render();
    
    const btn = document.getElementById('save-goal');
    btn.textContent = 'Zapisano!';
    setTimeout(() => btn.textContent = 'Zapisz cel', 1200);
  }
});

// Init ring
ring.style.strokeDasharray = CIRCUMFERENCE;

load();