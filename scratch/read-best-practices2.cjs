const fs = require('fs');
if (!fs.existsSync('lh-report2.json')) {
  console.log('Report not found yet.');
  process.exit(1);
}
const report = JSON.parse(fs.readFileSync('lh-report2.json', 'utf8'));

const cat = report.categories['best-practices'];
console.log(`\n=== BEST-PRACTICES ===`);
console.log(`Score: ${Math.round(cat.score * 100)}`);

cat.auditRefs.forEach(ref => {
  const audit = report.audits[ref.id];
  if (audit && audit.score !== null && audit.score < 1) {
    console.log(`\n- [${Math.round(audit.score * 100)}] ${audit.title}`);
    if (audit.details && audit.details.items) {
      audit.details.items.forEach(item => {
        console.log(`  -> ${JSON.stringify(item)}`);
      });
    }
  }
});
