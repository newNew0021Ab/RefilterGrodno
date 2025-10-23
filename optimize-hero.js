import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'client/src/assets/hero.png';
const outputDir = 'client/src/assets';

async function optimizeHero() {
  console.log('Optimizing hero image with aggressive compression...');
  
  // Read the input image
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);
  
  // AVIF with very aggressive compression to get under 50KB
  await image
    .clone()
    .avif({ 
      quality: 40,  // Even lower quality for smaller file size
      effort: 4,    // Moderate compression effort (faster)
      chromaSubsampling: '4:2:0'
    })
    .toFile(path.join(outputDir, 'hero-optimized.avif'));
  
  // Check file size
  const avifSize = fs.statSync(path.join(outputDir, 'hero-optimized.avif')).size;
  
  console.log(`\nOptimized AVIF size: ${(avifSize / 1024).toFixed(2)} KB`);
  
  if (avifSize < 60000) {
    console.log('✓ Target achieved! Replacing original hero.avif');
    fs.copyFileSync(
      path.join(outputDir, 'hero-optimized.avif'),
      path.join(outputDir, 'hero.avif')
    );
  } else {
    console.log(`✗ File still too large (target: <60KB). Try lower quality.`);
  }
}

optimizeHero().catch(console.error);
