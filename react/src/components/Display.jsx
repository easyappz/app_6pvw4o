import React from 'react';

const Display = ({ value, secondary }) => {
  return (
    <div className="flex flex-col gap-1" data-easytag="id1-react/src/components/Display.jsx">
      <div
        className="text-green-600 text-sm min-h-5 text-right truncate"
        aria-label="secondary expression"
        data-easytag="id2-react/src/components/Display.jsx"
      >
        {secondary}
      </div>
      <div
        className="text-right text-4xl md:text-5xl font-semibold tracking-tight text-green-900 select-none"
        aria-live="polite"
        aria-atomic="true"
        data-easytag="id3-react/src/components/Display.jsx"
      >
        {value}
      </div>
    </div>
  );
};

export default Display;
