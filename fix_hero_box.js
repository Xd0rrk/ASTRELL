const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Fix the rounded classes
code = code.replace(
  /<div className="absolute inset-0 bg-neutral-900 border border-neutral-700\/60 rounded flex flex-col justify-between p-6 font-mono text-\[10px\] shadow-2xl overflow-hidden"/g,
  '<div className="absolute inset-0 bg-neutral-900 border border-neutral-700/60 flex flex-col justify-between p-6 font-mono text-[10px] shadow-2xl overflow-hidden"'
);
code = code.replace(
  /<div className="absolute inset-0 bg-neutral-900 border border-neutral-700\/60 rounded flex flex-col items-center justify-center p-6 font-mono text-\[9px\] overflow-hidden"/g,
  '<div className="absolute inset-0 bg-neutral-900 border border-neutral-700/60 flex flex-col items-center justify-center p-6 font-mono text-[9px] overflow-hidden"'
);

// Fix the rotation jump and allow full rotation
code = code.replace(
  /setHeroRotX\(Math\.max\(-80, Math\.min\(80, heroDragStartRot\.current\.x - dy \* 0\.5\)\)\);/,
  'setHeroRotX(heroDragStartRot.current.x - dy * 0.5);'
);

code = code.replace(
  /transform: \`rotateX\(\$\{heroRotX \+ \(isDraggingHero \? 0 : mouseCoords\.y \* -15\)\}deg\) rotateY\(\$\{heroRotY \+ \(isDraggingHero \? 0 : mouseCoords\.x \* 25\)\}deg\)\`/,
  'transform: `rotateX(${heroRotX}deg) rotateY(${heroRotY}deg)`'
);

// We should also let the box spin continuously maybe? Or just keep it draggable 360 degrees.
// "When the cursor drags or hovers over it, it moves 360 degrees."
// Let's add an auto-spin effect if we are not dragging! 

fs.writeFileSync('app/page.tsx', code);
