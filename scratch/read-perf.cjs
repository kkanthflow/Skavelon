const fs = require('fs');
if (!fs.existsSync('lh-mobile.json')) {
  console.log('Report not found yet.');
  process.exit(1);
}
const report = JSON.parse(fs.readFileSync('lh-mobile.json', 'utf8'));

const cat = report.categories['performance'];
console.log(`\n=== PERFORMANCE ===`);
console.log(`Score: ${Math.round(cat.score * 100)}`);

cat.auditRefs.forEach(ref => {
  const audit = report.audits[ref.id];
  if (audit && audit.score !== null && audit.score < 1) {
    if (ref.weight > 0) {
      console.log(`\n- [${Math.round(audit.score * 100)}] ${audit.title} (Weight: ${ref.weight})`);
      console.log(`  ${audit.displayValue || ''}`);
    }
  }
});
