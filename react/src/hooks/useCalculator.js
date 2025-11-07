import { useMemo, useReducer } from 'react';
import { initialState, reducer, normalizeNumber } from '../utils/calculatorEngine.js';

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const inputDigit = (d) => dispatch({ type: 'digit', payload: d });
  const inputDot = () => dispatch({ type: 'dot' });
  const chooseOperator = (op) => dispatch({ type: 'operator', payload: op });
  const calculateEqual = () => dispatch({ type: 'equals' });
  const doPercent = () => dispatch({ type: 'percent' });
  const toggleSign = () => dispatch({ type: 'toggleSign' });
  const doBackspace = () => dispatch({ type: 'backspace' });
  const doClear = () => dispatch({ type: 'clear' });
  const doAllClear = () => dispatch({ type: 'allClear' });

  const clearLabel = useMemo(() => {
    if (state.error) return 'AC';
    if (state.displayValue !== '0') return 'C';
    if (state.prevValue !== null || state.operator) return 'C';
    return 'AC';
  }, [state.displayValue, state.prevValue, state.operator, state.error]);

  const secondaryDisplay = useMemo(() => {
    if (state.error) return '';
    const left = state.prevValue !== null ? normalizeNumber(state.prevValue) : '';
    const op = state.operator || '';
    return `${left} ${op}`.trim();
  }, [state.prevValue, state.operator, state.error]);

  return {
    state,
    clearLabel,
    secondaryDisplay,
    inputDigit,
    inputDot,
    chooseOperator,
    calculateEqual,
    doPercent,
    toggleSign,
    doBackspace,
    doClear,
    doAllClear,
  };
}
