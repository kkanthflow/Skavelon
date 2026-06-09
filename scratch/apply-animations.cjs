const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../client/src/pages');
const pages = ['About.tsx', 'LePort.tsx', 'LeTech.tsx', 'Services.tsx', 'GlobalReach.tsx', 'Contact.tsx'];

pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Add framer-motion import if not present
  if (!content.includes("from 'framer-motion'")) {
    content = content.replace(/(import .*;\n)+/, match => match + `import { motion } from 'framer-motion';\n`);
  }

  // Replace <section className="..."> with <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="...">
  content = content.replace(/<section className="([^"]+)">/g, (match, classes) => {
    // If it's a Hero section, maybe give it bg-[#050505] instead of background
    let newClasses = classes;
    newClasses = newClasses.replace(/bg-background/g, 'bg-[#0a0a0a]');
    newClasses = newClasses.replace(/bg-gradient-to-br from-background via-background to-card/g, 'bg-[#050505]');
    newClasses = newClasses.replace(/bg-card/g, 'bg-[#111]');

    return `<motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="${newClasses}"
      >`;
  });

  // Replace </section> with </motion.section>
  content = content.replace(/<\/section>/g, '</motion.section>');

  // Also update standard backgrounds in cards/divs
  content = content.replace(/bg-background/g, 'bg-[#0a0a0a]');
  content = content.replace(/bg-card/g, 'bg-[#111]');
  
  // Give cards a hover animation if they have glass-effect
  content = content.replace(/className="([^"]*glass-effect[^"]*)"/g, (match, classes) => {
    return `className="${classes} hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-500"`;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${page}`);
});
