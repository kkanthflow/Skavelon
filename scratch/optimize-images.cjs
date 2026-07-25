const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const publicDir = path.join(process.cwd(), 'client', 'public');
  
  // 1. Optimize Logo
  const logoPath = path.join(publicDir, 'logo.png');
  if (fs.existsSync(logoPath)) {
    console.log('Optimizing logo.png...');
    const buffer = await sharp(logoPath)
      .resize({ width: 512, withoutEnlargement: true }) // Scale down to reasonable size
      .png({ quality: 80, compressionLevel: 9 }) // Max compression
      .toBuffer();
    
    fs.writeFileSync(logoPath, buffer);
    console.log('Logo optimized successfully!');
  }

  // 2. Optimize Hero Images (if they are huge 8k renders, scale them down to standard HD)
  const imagesDir = path.join(publicDir, 'images');
  const heroImages = ['cybersecurity_hero.png', 'app_development_hero.png'];
  
  for (const imgName of heroImages) {
    const imgPath = path.join(imagesDir, imgName);
    if (fs.existsSync(imgPath)) {
      console.log(`Optimizing ${imgName}...`);
      const buffer = await sharp(imgPath)
        .resize({ width: 1920, withoutEnlargement: true }) // Standard web hero width
        .png({ quality: 80, compressionLevel: 9 })
        .toBuffer();
      
      fs.writeFileSync(imgPath, buffer);
      console.log(`${imgName} optimized successfully!`);
    }
  }
}

optimizeImages().catch(console.error);
