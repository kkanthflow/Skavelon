const fs = require('fs');
if (!fs.existsSync('lh-report.json')) {
  console.log('Report not found yet.');
  process.exit(1);
}
const report = JSON.parse(fs.readFileSync('lh-report.json', 'utf8'));

const categories = ['accessibility', 'best-practices', 'seo'];

categories.forEach(cat => {
  console.log(`\n=== ${cat.toUpperCase()} ===`);
  const category = report.categories[cat];
  if (!category) return;
  console.log(`Score: ${Math.round(category.score * 100)}`);
  
  category.auditRefs.forEach(ref => {
    const audit = report.audits[ref.id];
    if (audit && audit.score !== null && audit.score < 1) {
      console.log(`- [${Math.round(audit.score * 100)}] ${audit.title}`);
      if (audit.details && audit.details.items && audit.details.items.length > 0) {
        audit.details.items.forEach(item => {
          if (item.node) console.log(`    -> Node: ${item.node.snippet}`);
          else if (item.url) console.log(`    -> URL: ${item.url}`);
        });
      }
    }
  });
});
