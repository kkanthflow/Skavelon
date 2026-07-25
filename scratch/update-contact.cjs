const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'client/src/pages/Contact.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace email
content = content.replace(/leakqoara@gmail\.com/g, 'skavelontechnologies@gmail.com');

// Replace company name in description
content = content.replace(/Leakqoara Group/g, 'Skavelon');
content = content.replace(/global export trade facilitation \(LePort\)/g, 'app development');
content = content.replace(/enterprise cybersecurity solutions \(LeTech\)/g, 'cybersecurity solutions');

// Replace union types and variable names
content = content.replace(/'LePort' \| 'LeTech' \| 'Both'/g, "'AppDevelopment' | 'Cybersecurity' | 'Both'");
content = content.replace(/=== 'LePort'/g, "=== 'AppDevelopment'");
content = content.replace(/=== 'LeTech'/g, "=== 'Cybersecurity'");

// Replace division map
content = content.replace(/'LePort': 'LePort - Export & Trade',/g, "'AppDevelopment': 'App Development',");
content = content.replace(/'LeTech': 'LeTech - Cybersecurity & IT Solutions',/g, "'Cybersecurity': 'Cybersecurity',");

// Replace request type map
content = content.replace(/'LeTech': 'Demo Request',/g, "'Cybersecurity': 'Demo Request',");
content = content.replace(/'LePort': 'Appointment Request',/g, "'AppDevelopment': 'Consultation Request',");

// Replace SelectItem values
content = content.replace(/<SelectItem value="LePort">LePort - Export & Trade<\/SelectItem>/g, '<SelectItem value="AppDevelopment">App Development</SelectItem>');
content = content.replace(/<SelectItem value="LeTech">LeTech - Cybersecurity & IT Solutions<\/SelectItem>/g, '<SelectItem value="Cybersecurity">Cybersecurity</SelectItem>');

fs.writeFileSync(filePath, content);
console.log('Contact.tsx updated successfully');
