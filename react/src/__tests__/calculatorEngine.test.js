import { reducer, initialState } from '../utils/calculatorEngine.js';

function run(actions) {
  return actions.reduce((st, a) => reducer(st, a), { ...initialState });
}

function seq(keys) {
  return keys.map((k) => {
    if (k >= '0' && k <= '9') return { type: 'digit', payload: k };
    if (k === '.') return { type: 'dot' };
    if (k === '+' || k === '-' || k === '*' || k === '/') return { type: 'operator', payload: k };
    if (k === '=') return { type: 'equals' };
    if (k === '%') return { type: 'percent' };
    if (k === 'BS') return { type: 'backspace' };
    if (k === 'C') return { type: 'clear' };
    if (k === 'AC') return { type: 'allClear' };
    if (k === '+/-') return { type: 'toggleSign' };
    return { type: 'noop' };
  });
}

test('0.1 + 0.2 ≈ 0.3 with normalization', () => {
  const actions = seq(['0', '.', '1', '+', '0', '.', '2', '=']);
  const st = run(actions);
  expect(st.displayValue).toBe('0.3');
});

test('division by zero -> Error until AC', () => {
  const st1 = run(seq(['6', '/', '0', '=']));
  expect(st1.displayValue).toBe('Error');
  // C should not clear error
  const st2 = run([...seq(['6', '/', '0', '=']), { type: 'clear' }]);
  expect(st2.displayValue).toBe('Error');
  const st3 = run([...seq(['6', '/', '0', '=']), { type: 'allClear' }]);
  expect(st3.displayValue).toBe('0');
});

test('repeat equals repeats last operation', () => {
  const st = run(seq(['5', '+', '2', '=', '=']));
  expect(st.displayValue).toBe('9');
});

test('percent with previous a op b% => a op (a*b/100)', () => {
  const st = run(seq(['2', '0', '0', '+', '1', '0', '%', '=']));
  expect(st.displayValue).toBe('220');
});

test('toggle sign works', () => {
  const st1 = run(seq(['5', '+/-']));
  expect(st1.displayValue).toBe('-5');
  const st2 = run(seq(['5', '+/-', '+/-']));
  expect(st2.displayValue).toBe('5');
});

test('sequence of operators replaces previous operator', () => {
  const st = run(seq(['5', '+', '-', '*', '2', '=']));
  expect(st.displayValue).toBe('10');
});

test('backspace removes last digit', () => {
  const st = run(seq(['1', '2', '3', 'BS', 'BS', 'BS']));
  expect(st.displayValue).toBe('0');
});

test('dot works only once and starts with 0.', () => {
  const st = run(seq(['.', '.', '3']));
  expect(st.displayValue).toBe('0.3');
});
