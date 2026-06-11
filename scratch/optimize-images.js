import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = 'client/public/images';
const publicDir = 'client/public';

async function optimizeImages() {
  try {
    // 1. Process images in client/public/images
    const files = fs.readdirSync(imagesDir);
    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const filePath = path.join(imagesDir, file);
        const baseName = path.parse(file).name;
        const outputPath = path.join(imagesDir, `${baseName}.webp`);

        let width = 800; // default for others
        if (baseName.includes('globe') || baseName.includes('map')) {
          width = 900;
        }

        console.log(`Processing ${file} (width: ${width})...`);

        // Convert to WebP and resize
        await sharp(filePath)
          .resize({ width })
          .webp({ quality: 80 }) // target quality 80 first
          .toFile(outputPath);

        // Check if output is under 150KB. If not, compress more.
        let stats = fs.statSync(outputPath);
        let quality = 80;
        while (stats.size > 150 * 1024 && quality > 10) {
          quality -= 5;
          console.log(`File size ${stats.size} is over 150KB. Retrying with quality ${quality}...`);
          await sharp(filePath)
            .resize({ width })
            .webp({ quality })
            .toFile(outputPath);
          stats = fs.statSync(outputPath);
        }

        console.log(`Created ${baseName}.webp: ${(stats.size / 1024).toFixed(2)} KB`);
      }
    }

    // 2. Create 64x64 logo-small.png from logo.png
    const logoPath = path.join(publicDir, 'logo.png');
    const logoSmallPath = path.join(publicDir, 'logo-small.png');
    if (fs.existsSync(logoPath)) {
      console.log('Creating logo-small.png (64x64)...');
      await sharp(logoPath)
        .resize(64, 64)
        .png()
        .toFile(logoSmallPath);
      const stats = fs.statSync(logoSmallPath);
      console.log(`Created logo-small.png: ${(stats.size / 1024).toFixed(2)} KB`);
    } else {
      console.warn('logo.png not found!');
    }

  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();
