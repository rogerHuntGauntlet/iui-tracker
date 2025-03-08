const sharp = require('sharp');
const fs = require('fs').promises;

const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#2D3B8E" d="M7.5,4A5.5,5.5 0 0,0 2,9.5C2,10 2.09,10.5 2.22,11H6.3L7.57,7.63C7.87,6.83 9.05,6.75 9.43,7.63L11.5,13L12.09,11.58C12.22,11.25 12.57,11 13,11H21.78C21.91,10.5 22,10 22,9.5A5.5,5.5 0 0,0 16.5,4C14.64,4 13,4.93 12,6.34C11,4.93 9.36,4 7.5,4V4M3,12.5A1,1 0 0,0 2,13.5A1,1 0 0,0 3,14.5H5.44L11,20C12,20.9 12,20.9 13,20L18.56,14.5H21A1,1 0 0,0 22,13.5A1,1 0 0,0 21,12.5H13.4L12.47,14.8C12.07,15.81 10.92,15.67 10.55,14.83L8.5,9.5L7.54,12.1C7.39,12.45 7.05,12.66 6.68,12.66H3Z"/>
</svg>
`;

async function generateLogos() {
  // Generate logo192.png
  await sharp(Buffer.from(svgIcon))
    .resize(192, 192)
    .toFile('public/logo192.png');

  // Generate logo512.png
  await sharp(Buffer.from(svgIcon))
    .resize(512, 512)
    .toFile('public/logo512.png');

  // Generate og-image.png from the og-image.svg
  const ogSvg = await fs.readFile('public/og-image.svg');
  await sharp(ogSvg)
    .resize(1200, 630)
    .toFile('public/og-image.png');

  console.log('Generated all logo files successfully!');
}

generateLogos().catch(console.error); 