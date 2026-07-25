const fs = require('fs');
const path = require('path');

const files = [
  'client/src/pages/Cybersecurity.tsx',
  'client/src/pages/AppDevelopment.tsx'
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\/images\/cybersecurity_security\.webp/g, '/images/cybersecurity_hero.png');
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
