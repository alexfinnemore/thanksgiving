const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = './public';
const files = fs.readdirSync(directory).filter(file => file.endsWith('.png'));

// Approximate colors for the checkerboard (white and light grey)
// We'll treat pixels close to these as transparent
const targetColors = [
    { r: 255, g: 255, b: 255 }, // White
    { r: 204, g: 204, b: 204 }, // Light Grey (common in checkerboards)
    { r: 238, g: 238, b: 238 }, // Another common grey
    { r: 192, g: 192, b: 192 }, // Another common grey
];

const threshold = 10; // Tolerance

async function processImages() {
    for (const file of files) {
        if (file === 'sad_cat.png') continue; // Skip sad cat if it's different

        const inputPath = path.join(directory, file);
        const outputPath = path.join(directory, 'processed_' + file);

        console.log(`Processing ${file}...`);

        try {
            const { data, info } = await sharp(inputPath)
                .ensureAlpha()
                .raw()
                .toBuffer({ resolveWithObject: true });

            const pixelArray = new Uint8ClampedArray(data);

            for (let i = 0; i < pixelArray.length; i += 4) {
                const r = pixelArray[i];
                const g = pixelArray[i + 1];
                const b = pixelArray[i + 2];

                // Check if pixel matches any of the background colors
                const isBackground = targetColors.some(c =>
                    Math.abs(r - c.r) < threshold &&
                    Math.abs(g - c.g) < threshold &&
                    Math.abs(b - c.b) < threshold
                );

                if (isBackground) {
                    pixelArray[i + 3] = 0; // Set alpha to 0
                }
            }

            await sharp(pixelArray, {
                raw: {
                    width: info.width,
                    height: info.height,
                    channels: 4
                }
            })
                .png()
                .toFile(inputPath); // Overwrite original

            console.log(`Fixed ${file}`);
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }
}

processImages();
