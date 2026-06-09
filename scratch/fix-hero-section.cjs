const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../client/src/pages');
const pages = ['About.tsx', 'LePort.tsx', 'LeTech.tsx', 'Services.tsx', 'GlobalReach.tsx', 'Contact.tsx'];

pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace only the FIRST occurrence of motion.section that has whileInView with a regular section
  // Since we only want to change the Hero section, we can match the first one.
  
  let replaced = false;
  content = content.replace(/<motion\.section\s+initial=\{\{\s*opacity:\s*0,\s*y:\s*30\s*\}\}\s+whileInView=\{\{\s*opacity:\s*1,\s*y:\s*0\s*\}\}\s+viewport=\{\{\s*once:\s*true,\s*margin:\s*"-100px"\s*\}\}\s+transition=\{\{\s*duration:\s*0\.6\s*\}\}\s+className="([^"]+)"\s*>/, (match, classes) => {
    if (!replaced) {
      replaced = true;
      return `<section className="${classes}">`;
    }
    return match;
  });

  if (replaced) {
    // We also need to replace the very first </motion.section> with </section>
    let endReplaced = false;
    content = content.replace(/<\/motion\.section>/, (match) => {
      if (!endReplaced) {
        endReplaced = true;
        return '</section>';
      }
      return match;
    });
  }

  fs.writeFileSync(filePath, content);
  console.log(`Fixed Hero section on ${page}`);
});
