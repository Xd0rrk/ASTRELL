const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(
  /  const \[email, setEmail\] = React\.useState\(''\);/,
  `  const [portfolioFilter, setPortfolioFilter] = React.useState<'all' | 'web' | 'brand' | 'package'>('all');\n  const [clientName, setClientName] = React.useState('');\n  const [email, setEmail] = React.useState('');`
);

fs.writeFileSync('app/page.tsx', code);
