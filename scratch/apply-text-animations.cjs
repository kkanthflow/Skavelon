const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../client/src/pages');
const pages = ['About.tsx', 'LePort.tsx', 'LeTech.tsx', 'Services.tsx', 'GlobalReach.tsx', 'Contact.tsx'];

pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace h1 in Hero
  content = content.replace(/<h1 className="([^"]*)">/, (match, classes) => {
    return `<motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="${classes}"
                >`;
  });
  content = content.replace(/<\/h1>/, '</motion.h1>');

  // Replace the first two <p> tags with motion.p
  let pCount = 0;
  content = content.replace(/<p className="([^"]*)">/g, (match, classes) => {
    pCount++;
    if (pCount === 1) {
      return `<motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="${classes}"
                >`;
    } else if (pCount === 2) {
      return `<motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="${classes}"
                >`;
    }
    return match; // leave rest unchanged
  });
  
  // Replace the corresponding closing tags for the first two p tags
  let pCloseCount = 0;
  content = content.replace(/<\/p>/g, (match) => {
    pCloseCount++;
    if (pCloseCount <= 2) {
      return '</motion.p>';
    }
    return match;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Updated text animations on ${page}`);
});
