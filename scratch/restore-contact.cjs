const fs = require('fs');
const path = require('path');

// 1. Replace #contact with /contact across files (with specific query params where applicable)
const filesToUpdate = {
  'client/src/pages/Terms.tsx': '/contact',
  'client/src/pages/Services.tsx': '/contact',
  'client/src/pages/Privacy.tsx': '/contact',
  'client/src/pages/Cybersecurity.tsx': '/contact?division=Cybersecurity',
  'client/src/pages/AppDevelopment.tsx': '/contact?division=AppDevelopment',
  'client/src/pages/About.tsx': '/contact',
  'client/src/components/Navigation.tsx': '/contact',
  'client/src/components/home/CTASection.tsx': '/contact',
  'client/src/components/Footer.tsx': '/contact'
};

for (const [f, replacement] of Object.entries(filesToUpdate)) {
  const filePath = path.join(process.cwd(), f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace all #contact back to the correct path
    content = content.replace(/href="#contact"/g, 'href="' + replacement + '"');
    // Specifically for wouter links, change standard <a> back to <Link> if we can,
    // actually wouter's <Link href="..."> with nested <a className="..."></a> was what was there.
    // In our previous script, we turned them into <a href="#contact" ...>...</a>.
    // If they are just <a> tags with href="/contact", standard React will cause a full page reload, which is not ideal for SPA.
    // Let's replace <a href="/contact" ...> with <Link href="/contact"><a ...>
    // Except in Footer where it was originally an <a> tag.
    
    if (f !== 'client/src/components/Footer.tsx') {
      content = content.replace(/<a\s+href="(\/contact[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, '<Link href="$1"><a$2>$3</a></Link>');
    }
    
    // Restore navLinks in Navigation.tsx
    if (f === 'client/src/components/Navigation.tsx' && !content.includes("{ label: 'Contact', href: '/contact' }")) {
      content = content.replace(
        /\{\s*label:\s*'Services',\s*href:\s*'\/services'\s*\}/,
        "{ label: 'Services', href: '/services' },\n    { label: 'Contact', href: '/contact' }"
      );
    }
    
    fs.writeFileSync(filePath, content);
  }
}

// 2. Fix App.tsx (remove ContactModal, re-add Contact page)
const appTsxPath = path.join(process.cwd(), 'client/src/App.tsx');
if (fs.existsSync(appTsxPath)) {
  let appTsx = fs.readFileSync(appTsxPath, 'utf8');
  
  // Remove ContactModal import and component
  appTsx = appTsx.replace(/import ContactModal from "\.\/components\/ContactModal";\n?/, '');
  appTsx = appTsx.replace(/<ContactModal \/>\n?\s*/, '');
  
  // Re-add Contact page import
  if (!appTsx.includes('import("./pages/Contact")')) {
    appTsx = appTsx.replace(
      /const AppDevelopment = lazy\(\(\) => import\("\.\/pages\/AppDevelopment"\)\);/,
      'const AppDevelopment = lazy(() => import("./pages/AppDevelopment"));\nconst Contact = lazy(() => import("./pages/Contact"));'
    );
  }
  
  // Re-add Contact route
  if (!appTsx.includes('path={"/contact"}')) {
    appTsx = appTsx.replace(
      /<Route path=\{"\/about"\} component=\{About\} \/>/,
      '<Route path={"/about"} component={About} />\n            <Route path={"/contact"} component={Contact} />'
    );
  }
  
  fs.writeFileSync(appTsxPath, appTsx);
}

// 3. Delete ContactModal.tsx
const modalPath = path.join(process.cwd(), 'client/src/components/ContactModal.tsx');
if (fs.existsSync(modalPath)) {
  fs.unlinkSync(modalPath);
}

console.log("Contact page fully restored and ContactModal removed.");
