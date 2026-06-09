const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../client/src/pages');
const pages = ['About.tsx', 'LePort.tsx', 'LeTech.tsx', 'Services.tsx', 'GlobalReach.tsx', 'Contact.tsx', 'Home.tsx'];

pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace delays in the Hero sections so they wait for the PageTransition to finish (0.6s)
  content = content.replace(/delay:\s*0\.1/g, 'delay: 0.5');
  content = content.replace(/delay:\s*0\.2/g, 'delay: 0.6');
  content = content.replace(/delay:\s*0\.3/g, 'delay: 0.7');
  content = content.replace(/delay:\s*0\.4/g, 'delay: 0.8');

  fs.writeFileSync(filePath, content);
  console.log(`Updated text animation delays on ${page}`);
});
