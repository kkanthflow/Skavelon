const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'client/src/components/SplashScreen.tsx',
  'client/src/components/Navigation.tsx',
  'client/src/components/Footer.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\/logo\.webp/g, '/logo.png');
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
