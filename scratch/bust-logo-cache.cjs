const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'client/src/pages/Home.tsx',
  'client/index.html',
  'client/src/components/Navigation.tsx',
  'client/src/components/SplashScreen.tsx',
  'client/src/components/Footer.tsx'
];

for (const relPath of filesToUpdate) {
  const filePath = path.join(process.cwd(), relPath);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\/logo\.png/g, '/logo-new.png');
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${relPath}`);
  }
}
