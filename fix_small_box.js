const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Fix the rounded classes
code = code.replace(
  /className="absolute inset-0 bg-neutral-100 text-black border border-neutral-300 rounded-lg flex flex-col justify-between p-4 font-mono text-\[9px\] shadow-lg select-none"/g,
  'className="absolute inset-0 bg-neutral-100 text-black border border-neutral-300 flex flex-col justify-between p-4 font-mono text-[9px] shadow-lg select-none"'
);
code = code.replace(
  /className="absolute inset-0 bg-neutral-200 text-neutral-800 border border-neutral-300 rounded-lg flex flex-col justify-between p-4 font-mono text-\[7px\] select-none"/g,
  'className="absolute inset-0 bg-neutral-200 text-neutral-800 border border-neutral-300 flex flex-col justify-between p-4 font-mono text-[7px] select-none"'
);

fs.writeFileSync('app/page.tsx', code);
