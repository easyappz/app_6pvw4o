const PRECISION = 15;

export const initialState = {
  displayValue: '0',
  prevValue: null,
  operator: null,
  waitingForOperand: false,
  lastOperator: null,
  lastOperand: null,
  error: false,
};

export function normalizeNumber(n) {
  if (n === null || n === undefined) return '0';
  if (typeof n === 'string') {
    const x = Number(n);
    if (!Number.isFinite(x)) return n;
    n = x;
  }
  if (!Number.isFinite(n)) return 'Error';
  const s = Number.parseFloat(Number(n).toPrecision(PRECISION)).toString();
  if (s.indexOf('e') >= 0 || s.indexOf('E') >= 0) return s;
  let out = s;
  if (out.indexOf('.') >= 0) {
    // trim trailing zeros
    while (out.length > 0 && out[out.length - 1] === '0') {
      out = out.slice(0, -1);
    }
    if (out[out.length - 1] === '.') {
      out = out.slice(0, -1);
    }
  }
  if (out === '-0') out = '0';
  return out;
}

function toNum(s) {
  if (typeof s === 'number') return s;
  if (s === 'Error') return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

function add(a, b) { return toNum(normalizeNumber(toNum(a) + toNum(b))); }
function sub(a, b) { return toNum(normalizeNumber(toNum(a) - toNum(b))); }
function mul(a, b) { return toNum(normalizeNumber(toNum(a) * toNum(b))); }
function div(a, b) {
  if (toNum(b) === 0) return 'Error';
  return toNum(normalizeNumber(toNum(a) / toNum(b)));
}

export function compute(a, b, op) {
  if (op === '+') return normalizeNumber(add(a, b));
  if (op === '-') return normalizeNumber(sub(a, b));
  if (op === '*') return normalizeNumber(mul(a, b));
  if (op === '/') {
    const res = div(a, b);
    return typeof res === 'string' ? res : normalizeNumber(res);
  }
  return normalizeNumber(b);
}

export function applyPercent(currentStr, prevValue, operator) {
  const current = toNum(currentStr || '0');
  if (prevValue !== null && operator) {
    const percentValue = (toNum(prevValue) * current) / 100;
    return normalizeNumber(percentValue);
  }
  return normalizeNumber(current / 100);
}

export function toggleSignStr(str) {
  if (!str || str === '0') return '0';
  if (str[0] === '-') return str.slice(1);
  return '-' + str;
}

export function backspaceStr(str) {
  if (!str) return '0';
  if (str.length <= 1) return '0';
  const next = str.slice(0, -1);
  if (next === '-' || next === '') return '0';
  return next;
}

export function reducer(state, action) {
  if (state.error && action.type !== 'allClear') {
    // lock until AC
    return state;
  }

  switch (action.type) {
    case 'digit': {
      const d = action.payload;
      if (state.waitingForOperand) {
        return {
          ...state,
          displayValue: d === '0' ? '0' : d,
          waitingForOperand: false,
        };
      }
      if (state.displayValue === '0') {
        return { ...state, displayValue: d };
      }
      return { ...state, displayValue: state.displayValue + d };
    }
    case 'dot': {
      if (state.waitingForOperand) {
        return { ...state, displayValue: '0.', waitingForOperand: false };
      }
      if (state.displayValue.indexOf('.') >= 0) return state;
      return { ...state, displayValue: state.displayValue + '.' };
    }
    case 'operator': {
      const op = action.payload; // '+', '-', '*', '/'
      const current = state.displayValue;

      if (state.operator && state.waitingForOperand) {
        // replace operator
        return { ...state, operator: op };
      }

      if (state.prevValue === null) {
        return {
          ...state,
          prevValue: normalizeNumber(current),
          operator: op,
          waitingForOperand: true,
          lastOperator: null,
          lastOperand: null,
        };
      }

      if (state.operator && !state.waitingForOperand) {
        const res = compute(state.prevValue, current, state.operator);
        if (res === 'Error') {
          return { ...initialState, displayValue: 'Error', error: true };
        }
        return {
          ...state,
          prevValue: res,
          displayValue: res,
          operator: op,
          waitingForOperand: true,
          lastOperator: null,
          lastOperand: null,
        };
      }

      return { ...state, operator: op, waitingForOperand: true };
    }
    case 'equals': {
      const current = state.displayValue;
      if (state.operator && state.prevValue !== null && !state.waitingForOperand) {
        const res = compute(state.prevValue, current, state.operator);
        if (res === 'Error') {
          return { ...initialState, displayValue: 'Error', error: true };
        }
        return {
          ...state,
          displayValue: res,
          prevValue: res,
          operator: null,
          waitingForOperand: true,
          lastOperator: state.operator,
          lastOperand: current,
        };
      }
      if (!state.operator && state.lastOperator) {
        const res = compute(state.displayValue, state.lastOperand, state.lastOperator);
        if (res === 'Error') {
          return { ...initialState, displayValue: 'Error', error: true };
        }
        return {
          ...state,
          displayValue: res,
          prevValue: res,
          waitingForOperand: true,
        };
      }
      return state;
    }
    case 'percent': {
      const next = applyPercent(state.displayValue, state.prevValue, state.operator);
      return { ...state, displayValue: next, waitingForOperand: false };
    }
    case 'toggleSign': {
      return { ...state, displayValue: toggleSignStr(state.displayValue) };
    }
    case 'backspace': {
      if (state.waitingForOperand) return state;
      return { ...state, displayValue: backspaceStr(state.displayValue) };
    }
    case 'clear': {
      return { ...state, displayValue: '0', waitingForOperand: false };
    }
    case 'allClear': {
      return { ...initialState };
    }
    default:
      return state;
  }
}
