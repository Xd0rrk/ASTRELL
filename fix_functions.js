const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const regex = /  const handleBoxMouseUpOrLeave = \(\) => \{[\s\S]*?  const handleBoxTouchEnd = \(\) => \{[\s\S]*?  \};\n/g;
code = code.replace(regex, '');

fs.writeFileSync('app/page.tsx', code);
