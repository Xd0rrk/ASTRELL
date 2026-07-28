const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Add hover state
code = code.replace(
  /const \[isDraggingHero, setIsDraggingHero\] = React\.useState\(false\);/,
  `const [isDraggingHero, setIsDraggingHero] = React.useState(false);\n  const [isHoveringHero, setIsHoveringHero] = React.useState(false);\n  const heroSpinRef = React.useRef<number | null>(null);\n\n  React.useEffect(() => {\n    if (!isDraggingHero && isHoveringHero) {\n      const spin = () => {\n        setHeroRotY(prev => prev + 0.5);\n        heroSpinRef.current = requestAnimationFrame(spin);\n      };\n      heroSpinRef.current = requestAnimationFrame(spin);\n    }\n    return () => {\n      if (heroSpinRef.current) cancelAnimationFrame(heroSpinRef.current);\n    };\n  }, [isDraggingHero, isHoveringHero]);`
);

// Add onMouseEnter and onMouseLeave
code = code.replace(
  /onMouseUp=\{handleHeroMouseUpOrLeave\}/,
  `onMouseUp={handleHeroMouseUpOrLeave}\n          onMouseEnter={() => setIsHoveringHero(true)}`
);

code = code.replace(
  /onMouseLeave=\{handleHeroMouseUpOrLeave\}/,
  `onMouseLeave={(e) => {\n            handleHeroMouseUpOrLeave();\n            setIsHoveringHero(false);\n          }}`
);

fs.writeFileSync('app/page.tsx', code);
