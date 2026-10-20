import sharp from 'sharp';

async function processCutout() {
  const { data, info } = await sharp('public/assets/aistudio/image_9b8ca323.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const output = Buffer.from(data);

  // We want an RGBA buffer
  // Let us check if channels === 4, if not convert
  console.log(`Dimensions: ${width}x${height}, channels: ${channels}`);

  // Mask: 0 = background (transparent), 1 = foreground (girl)
  // Let us find the girl boundary.
  // Her center is around x = 460.
  // Let us check pixels.
  // Any pixel at x < 220 or x > 690 that is cream background OR brown letter is outside!
  // Any pixel at y < 90 that is cream background or brown letter is outside!
  
  // Create an alpha mask array of width * height
  const mask = new Uint8Array(width * height);
  // Default: mark everything as 1 (keep)
  mask.fill(1);

  // Helper to get RGB
  const getRGB = (x, y) => {
    const idx = (y * width + x) * channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  };

  const isCreamBackground = (r, g, b) => {
    return r > 235 && g > 218 && b > 195;
  };

  const isBrownLetter = (r, g, b) => {
    // Brown color of the text: R around 70-130, G around 20-55, B around 10-40
    return r > 50 && r < 145 && g > 15 && g < 65 && b > 5 && b < 50;
  };

  // Breadth-First-Search (BFS) flood fill starting from all 4 boundaries
  const visited = new Uint8Array(width * height);
  const queue = [];

  const enqueue = (x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    visited[idx] = 1;
    queue.push([x, y]);
  };

  // Seed boundary pixels
  for (let x = 0; x < width; x++) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  // Define what the background flood fill can pass through:
  // It can pass through cream background, and through outer letters / floating items
  // It MUST NOT pass through:
  // - Dark afro hair (r < 60, g < 60, b < 60)
  // - Green sweater (g > r && g > b) or dark green
  // - Skin (r > 130, g around 80-140, b around 60-120)
  // - Yellow noodles / bowl (y > 200, near center)
  let headIdx = 0;
  while (headIdx < queue.length) {
    const [cx, cy] = queue[headIdx++];
    const [r, g, b] = getRGB(cx, cy);

    // Is this pixel part of the girl?
    // The girl is roughly within x: 235 to 680, y: 120 to 475.
    const inGirlBoundingBox = cx >= 240 && cx <= 675 && cy >= 120 && cy <= 475;

    // Check hair color: dark black/brownish
    const isDarkHair = inGirlBoundingBox && (r < 55 && g < 55 && b < 55);
    // Check green sweater: dark forest green
    const isGreenSweater = inGirlBoundingBox && (g > 45 && g > r && g > b && cy >= 240);
    // Check skin tone
    const isSkin = inGirlBoundingBox && (r > 120 && g > 65 && b > 50 && r > g && g > b);
    // Check bowl / food
    const isFood = inGirlBoundingBox && (cy >= 220 && (r > 160 && g > 130));

    if (inGirlBoundingBox && (isDarkHair || isGreenSweater || isSkin || isFood)) {
      // Barrier reached! Do not traverse further.
      continue;
    }

    // Otherwise, this pixel is background/text/floating item outside the girl
    const pIdx = cy * width + cx;
    mask[pIdx] = 0; // Make transparent

    // Traverse 4 neighbours
    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx]) {
          visited[nIdx] = 1;
          queue.push([nx, ny]);
        }
      }
    }
  }

  // Now apply mask to output RGBA buffer
  const rgbaBuffer = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const inIdx = i * channels;
    const outIdx = i * 4;
    rgbaBuffer[outIdx] = data[inIdx];
    rgbaBuffer[outIdx + 1] = data[inIdx + 1];
    rgbaBuffer[outIdx + 2] = data[inIdx + 2];
    // If mask is 0 -> alpha = 0. If mask is 1 -> alpha = 255
    rgbaBuffer[outIdx + 3] = mask[i] ? 255 : 0;
  }

  // Save to public/images/hero-girl-clean.png
  await sharp(rgbaBuffer, {
    raw: {
      width,
      height,
      channels: 4,
    }
  })
    .png()
    .toFile('public/images/hero-girl-clean.png');

  console.log('Saved to public/images/hero-girl-clean.png');
}

processCutout().catch(console.error);
