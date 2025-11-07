import React, { useCallback, useEffect } from 'react';
import Display from './Display.jsx';
import Keypad from './Keypad.jsx';
import { useCalculator } from '../hooks/useCalculator.js';

const Calculator = () => {
  const {
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
  } = useCalculator();

  const handleKeyDown = useCallback((e) => {
    const key = e.key;
    if (key >= '0' && key <= '9') {
      e.preventDefault();
      inputDigit(key);
      return;
    }
    if (key === '.') {
      e.preventDefault();
      inputDot();
      return;
    }
    if (key === '+' || key === '-' || key === '*' || key === '/') {
      e.preventDefault();
      chooseOperator(key);
      return;
    }
    if (key === 'Enter' || key === '=') {
      e.preventDefault();
      calculateEqual();
      return;
    }
    if (key === 'Backspace') {
      e.preventDefault();
      doBackspace();
      return;
    }
    if (key === 'Escape') {
      e.preventDefault();
      doAllClear();
      return;
    }
    if (key === '%') {
      e.preventDefault();
      doPercent();
    }
  }, [inputDigit, inputDot, chooseOperator, calculateEqual, doBackspace, doAllClear, doPercent]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section
      className="rounded-2xl bg-white shadow-soft overflow-hidden border border-slate-200"
      data-easytag="id1-react/src/components/Calculator.jsx"
    >
      <div className="p-4" data-easytag="id2-react/src/components/Calculator.jsx">
        <Display
          value={state.displayValue}
          secondary={secondaryDisplay}
        />
      </div>
      <div className="px-3 pb-3" data-easytag="id3-react/src/components/Calculator.jsx">
        <Keypad
          clearLabel={clearLabel}
          onDigit={inputDigit}
          onDot={inputDot}
          onOperator={chooseOperator}
          onEqual={calculateEqual}
          onPercent={doPercent}
          onToggleSign={toggleSign}
          onBackspace={doBackspace}
          onClear={doClear}
          onAllClear={doAllClear}
        />
      </div>
    </section>
  );
};

export default Calculator;
