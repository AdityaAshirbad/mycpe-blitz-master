const fs = require('fs');
const path = require('path');
const { seedState } = require('./data/seedState');

const STORE_PATH = path.join(__dirname, 'data', 'platform-state.json');

const clone = (value) => JSON.parse(JSON.stringify(value));

const ensureStore = () => {
  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, JSON.stringify(seedState, null, 2));
  }
};

const loadState = () => {
  ensureStore();
  return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'));
};

const saveState = (state) => {
  fs.writeFileSync(STORE_PATH, JSON.stringify(state, null, 2));
  return state;
};

const updateState = (updater) => {
  const state = loadState();
  const nextState = updater(clone(state)) || state;
  return saveState(nextState);
};

module.exports = {
  clone,
  ensureStore,
  loadState,
  saveState,
  updateState,
};
