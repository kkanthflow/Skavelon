const fs = require('fs');
const report = JSON.parse(fs.readFileSync('lh-mobile.json', 'utf8'));

const ttfb = report.audits['server-response-time'].displayValue;
const fcp = report.audits['first-contentful-paint'].displayValue;
const lcp = report.audits['largest-contentful-paint'].displayValue;
console.log(`TTFB: ${ttfb}`);
console.log(`FCP: ${fcp}`);
console.log(`LCP: ${lcp}`);
