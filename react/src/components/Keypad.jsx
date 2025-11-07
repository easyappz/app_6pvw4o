import React from 'react';

const Button = ({ children, onClick, ariaLabel, variant = 'default', dataTag, dataRole }) => {
  const base = 'h-14 rounded-xl text-lg font-medium focus-visible:ring-2 focus-visible:ring-blue-300 transition-colors select-none';
  const variants = {
    default: 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-900',
    op: 'bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700',
    equal: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white',
    danger: 'bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-700',
    subtle: 'bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-700'
  };
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
      data-role={dataRole}
      data-easytag={dataTag}
    >
      {children}
    </button>
  );
};

const Keypad = ({
  clearLabel,
  onDigit,
  onDot,
  onOperator,
  onEqual,
  onPercent,
  onToggleSign,
  onBackspace,
  onClear,
  onAllClear,
}) => {
  const onClearClick = () => {
    if (clearLabel === 'AC') onAllClear();
    else onClear();
  };

  return (
    <div className="grid grid-cols-4 gap-2" data-easytag="id1-react/src/components/Keypad.jsx">
      {/* Row 1 */}
      <Button ariaLabel="очистить" variant="danger" onClick={onClearClick} dataRole="clear" dataTag="id2-react/src/components/Keypad.jsx">{clearLabel}</Button>
      <Button ariaLabel="удалить символ" variant="subtle" onClick={onBackspace} dataRole="backspace" dataTag="id3-react/src/components/Keypad.jsx">⌫</Button>
      <Button ariaLabel="процент" variant="subtle" onClick={onPercent} dataRole="percent" dataTag="id4-react/src/components/Keypad.jsx">%</Button>
      <Button ariaLabel="делить" variant="op" onClick={() => onOperator('/')} dataRole="operator" dataTag="id5-react/src/components/Keypad.jsx">÷</Button>

      {/* Row 2 */}
      <Button ariaLabel="семь" onClick={() => onDigit('7')} dataRole="digit" dataTag="id6-react/src/components/Keypad.jsx">7</Button>
      <Button ariaLabel="восемь" onClick={() => onDigit('8')} dataRole="digit" dataTag="id7-react/src/components/Keypad.jsx">8</Button>
      <Button ariaLabel="девять" onClick={() => onDigit('9')} dataRole="digit" dataTag="id8-react/src/components/Keypad.jsx">9</Button>
      <Button ariaLabel="умножить" variant="op" onClick={() => onOperator('*')} dataRole="operator" dataTag="id9-react/src/components/Keypad.jsx">×</Button>

      {/* Row 3 */}
      <Button ariaLabel="четыре" onClick={() => onDigit('4')} dataRole="digit" dataTag="id10-react/src/components/Keypad.jsx">4</Button>
      <Button ariaLabel="пять" onClick={() => onDigit('5')} dataRole="digit" dataTag="id11-react/src/components/Keypad.jsx">5</Button>
      <Button ariaLabel="шесть" onClick={() => onDigit('6')} dataRole="digit" dataTag="id12-react/src/components/Keypad.jsx">6</Button>
      <Button ariaLabel="минус" variant="op" onClick={() => onOperator('-')} dataRole="operator" dataTag="id13-react/src/components/Keypad.jsx">−</Button>

      {/* Row 4 */}
      <Button ariaLabel="один" onClick={() => onDigit('1')} dataRole="digit" dataTag="id14-react/src/components/Keypad.jsx">1</Button>
      <Button ariaLabel="два" onClick={() => onDigit('2')} dataRole="digit" dataTag="id15-react/src/components/Keypad.jsx">2</Button>
      <Button ariaLabel="три" onClick={() => onDigit('3')} dataRole="digit" dataTag="id16-react/src/components/Keypad.jsx">3</Button>
      <Button ariaLabel="плюс" variant="op" onClick={() => onOperator('+')} dataRole="operator" dataTag="id17-react/src/components/Keypad.jsx">+</Button>

      {/* Row 5 */}
      <Button ariaLabel="сменить знак" onClick={onToggleSign} dataRole="toggle-sign" dataTag="id18-react/src/components/Keypad.jsx">±</Button>
      <Button ariaLabel="ноль" onClick={() => onDigit('0')} dataRole="digit" dataTag="id19-react/src/components/Keypad.jsx">0</Button>
      <Button ariaLabel="точка" onClick={onDot} dataRole="dot" dataTag="id20-react/src/components/Keypad.jsx">.</Button>
      <Button ariaLabel="равно" variant="equal" onClick={onEqual} dataRole="equal" dataTag="id21-react/src/components/Keypad.jsx">=</Button>
    </div>
  );
};

export default Keypad;
