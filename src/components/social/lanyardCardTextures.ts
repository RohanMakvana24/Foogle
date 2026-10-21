/**
 * Ultra-realistic, High-Resolution (1536x2160) Procedural Badge & QR Generator.
 * Crystal-clear typography, sharp vector graphics, and realistic QR matrices.
 */

function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) + 4321;
}

function createSeededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Draw a sharp, realistic QR Code
function drawRealisticQRCode(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  type: 'google' | 'instagram' | 'facebook',
  payload: string
) {
  const modules = 31;
  const modSize = size / modules;
  const startX = cx - size / 2;
  const startY = cy - size / 2;

  ctx.save();
  const pad = modSize * 2.2;
  const qx = startX - pad;
  const qy = startY - pad;
  const qw = size + pad * 2;
  const qh = size + pad * 2;

  // White base
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(qx, qy, qw, qh, 32);
  ctx.fill();

  ctx.lineWidth = 4;
  ctx.strokeStyle = '#E2E8F0';
  ctx.stroke();

  // Grid
  const grid: boolean[][] = Array.from({ length: modules }, () => Array(modules).fill(false));
  const isProtected: boolean[][] = Array.from({ length: modules }, () => Array(modules).fill(false));

  const setFinder = (row: number, col: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = row + r;
        const nc = col + c;
        if (nr >= 0 && nr < modules && nc >= 0 && nc < modules) {
          isProtected[nr][nc] = true;
          if (r >= 0 && r < 7 && c >= 0 && c < 7) {
            const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
            const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
            grid[nr][nc] = isBorder || isCenter;
          } else {
            grid[nr][nc] = false;
          }
        }
      }
    }
  };

  setFinder(0, 0);
  setFinder(0, modules - 7);
  setFinder(modules - 7, 0);

  // Alignment pattern
  const ar = modules - 9;
  const ac = modules - 9;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const nr = ar + r;
      const nc = ac + c;
      if (nr >= 0 && nr < modules && nc >= 0 && nc < modules) {
        isProtected[nr][nc] = true;
        const isBorder = Math.abs(r) === 2 || Math.abs(c) === 2;
        const isCenter = r === 0 && c === 0;
        grid[nr][nc] = isBorder || isCenter;
      }
    }
  }

  // Timing patterns
  for (let i = 8; i < modules - 8; i++) {
    isProtected[6][i] = true;
    grid[6][i] = i % 2 === 0;
    isProtected[i][6] = true;
    grid[i][6] = i % 2 === 0;
  }

  // Center logo reservation
  const mid = Math.floor(modules / 2);
  for (let r = mid - 3; r <= mid + 3; r++) {
    for (let c = mid - 3; c <= mid + 3; c++) {
      isProtected[r][c] = true;
      grid[r][c] = false;
    }
  }

  // Populate data
  const rand = createSeededRandom(stringToSeed(payload));
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      if (!isProtected[r][c]) {
        grid[r][c] = rand() > 0.47;
      }
    }
  }

  // Draw modules
  ctx.fillStyle = '#0F172A';
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      if (grid[r][c]) {
        const mx = startX + c * modSize;
        const my = startY + r * modSize;
        ctx.beginPath();
        ctx.roundRect(mx, my, modSize * 0.95, modSize * 0.95, modSize * 0.18);
        ctx.fill();
      }
    }
  }

  // Center Logo Emblem
  const iconBoxSize = modSize * 7.8;
  const ix = cx - iconBoxSize / 2;
  const iy = cy - iconBoxSize / 2;

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(ix, iy, iconBoxSize, iconBoxSize, 18);
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = '#0F172A';
  ctx.stroke();

  ctx.save();
  ctx.translate(cx, cy);

  if (type === 'google') {
    const rad = iconBoxSize * 0.33;
    ctx.lineWidth = rad * 0.38;
    ctx.lineCap = 'butt';

    ctx.strokeStyle = '#4285F4';
    ctx.beginPath();
    ctx.arc(0, 0, rad, -0.2 * Math.PI, 0.25 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = '#4285F4';
    ctx.fillRect(0, -rad * 0.19, rad * 0.92, rad * 0.38);

    ctx.strokeStyle = '#34A853';
    ctx.beginPath();
    ctx.arc(0, 0, rad, 0.25 * Math.PI, 0.75 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = '#FBBC05';
    ctx.beginPath();
    ctx.arc(0, 0, rad, 0.75 * Math.PI, 1.25 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = '#EA4335';
    ctx.beginPath();
    ctx.arc(0, 0, rad, 1.25 * Math.PI, 1.8 * Math.PI);
    ctx.stroke();
  } else if (type === 'instagram') {
    const s = iconBoxSize * 0.36;
    const igGrad = ctx.createLinearGradient(-s, s, s, -s);
    igGrad.addColorStop(0, '#FFD521');
    igGrad.addColorStop(0.5, '#F50000');
    igGrad.addColorStop(1, '#B900B4');

    ctx.strokeStyle = igGrad;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(-s, -s, s * 2, s * 2, s * 0.45);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, s * 0.46, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = igGrad;
    ctx.beginPath();
    ctx.arc(s * 0.52, -s * 0.52, s * 0.14, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'facebook') {
    const s = iconBoxSize * 0.38;
    ctx.fillStyle = '#1877F2';
    ctx.beginPath();
    ctx.roundRect(-s, -s, s * 2, s * 2, 14);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.round(s * 1.6)}px "Inter", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('f', s * 0.15, s * 0.1);
  }

  ctx.restore();
  ctx.restore();
}

// ----------------------------------------------------
// GOOGLE REVIEW BADGE
// ----------------------------------------------------

export function createGoogleFrontCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 2160;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 1536, 2160);
  bg.addColorStop(0, '#0F1E2E');
  bg.addColorStop(0.5, '#14293D');
  bg.addColorStop(1, '#0A1521');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1536, 2160);

  // Gold Double Rim
  ctx.lineWidth = 20;
  ctx.strokeStyle = '#D4AF37';
  ctx.beginPath();
  ctx.roundRect(60, 60, 1416, 2040, 90);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.beginPath();
  ctx.roundRect(86, 86, 1364, 1988, 72);
  ctx.stroke();

  // Top Verified Tag Pill
  ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
  ctx.beginPath();
  ctx.roundRect(438, 250, 660, 80, 40);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#D4AF37';
  ctx.stroke();

  ctx.fillStyle = '#F59E0B';
  ctx.font = '700 32px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '4px';
  ctx.fillText('★ VERIFIED GOOGLE DINING ★', 768, 290);

  // Big Crisp Google "G" Emblem
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(768, 490, 110, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#E2E8F0';
  ctx.stroke();

  const rad = 60;
  ctx.lineWidth = 20;
  ctx.lineCap = 'butt';

  ctx.strokeStyle = '#4285F4';
  ctx.beginPath();
  ctx.arc(768, 490, rad, -0.2 * Math.PI, 0.25 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = '#4285F4';
  ctx.fillRect(768, 490 - 10, rad * 0.92, 20);

  ctx.strokeStyle = '#34A853';
  ctx.beginPath();
  ctx.arc(768, 490, rad, 0.25 * Math.PI, 0.75 * Math.PI);
  ctx.stroke();

  ctx.strokeStyle = '#FBBC05';
  ctx.beginPath();
  ctx.arc(768, 490, rad, 0.75 * Math.PI, 1.25 * Math.PI);
  ctx.stroke();

  ctx.strokeStyle = '#EA4335';
  ctx.beginPath();
  ctx.arc(768, 490, rad, 1.25 * Math.PI, 1.8 * Math.PI);
  ctx.stroke();

  // Brand Name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 72px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Foogle Cafe & Resto', 768, 690);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 36px "Inter", sans-serif';
  ctx.fillText('Panchwati, Udaipur · Rajasthan', 768, 760);

  // Big 4.9 Score Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.beginPath();
  ctx.roundRect(328, 850, 880, 300, 50);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 140px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('4.9', 640, 1020);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 50px "Inter", sans-serif';
  ctx.fillText('/ 5.0', 820, 1010);

  // 5 Stars
  const starStartX = 510;
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = '#F59E0B';
    ctx.font = '54px sans-serif';
    ctx.fillText('★', starStartX + i * 58, 1090);
  }

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '700 38px "Inter", sans-serif';
  ctx.fillText('1,200+ Ratings on Google & Zomato', 768, 1250);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = 'italic 500 36px "Inter", Georgia, serif';
  ctx.fillText('“Best woodfired sourdough pizzas & specialty brews in Udaipur”', 768, 1370);

  ctx.fillStyle = '#FBBF24';
  ctx.font = '700 30px "Inter", sans-serif';
  ctx.fillText('— Rated 5 Stars by Verified Diners', 768, 1440);

  // Flip Hint Button Pill
  const pillGrad = ctx.createLinearGradient(300, 1620, 1236, 1620);
  pillGrad.addColorStop(0, '#B45309');
  pillGrad.addColorStop(0.5, '#F59E0B');
  pillGrad.addColorStop(1, '#D97706');

  ctx.fillStyle = pillGrad;
  ctx.beginPath();
  ctx.roundRect(318, 1620, 900, 130, 65);
  ctx.fill();

  ctx.fillStyle = '#0F172A';
  ctx.font = '900 42px "Inter", sans-serif';
  ctx.fillText('↻ CLICK OR TAP TO FLIP FOR QR CODE', 768, 1700);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 32px "Inter", sans-serif';
  ctx.fillText('Scan QR on reverse to write your review', 768, 1830);

  return canvas;
}

export function createGoogleBackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 2160;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 1536, 2160);
  bg.addColorStop(0, '#0F1E2E');
  bg.addColorStop(0.5, '#14293D');
  bg.addColorStop(1, '#0A1521');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1536, 2160);

  ctx.lineWidth = 20;
  ctx.strokeStyle = '#D4AF37';
  ctx.beginPath();
  ctx.roundRect(60, 60, 1416, 2040, 90);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.beginPath();
  ctx.roundRect(86, 86, 1364, 1988, 72);
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = 'rgba(66, 133, 244, 0.2)';
  ctx.beginPath();
  ctx.roundRect(438, 230, 660, 80, 40);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#4285F4';
  ctx.stroke();

  ctx.fillStyle = '#60A5FA';
  ctx.font = '700 32px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GOOGLE REVIEW QR CODE', 768, 270);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 66px "Inter", sans-serif';
  ctx.fillText('Review Foogle on Google', 768, 380);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 34px "Inter", sans-serif';
  ctx.fillText('Point your phone camera at this QR code', 768, 445);

  drawRealisticQRCode(
    ctx,
    768,
    970,
    760,
    'google',
    'https://www.google.com/maps/search/?api=1&query=Foogle+Cafe+Panchwati+Udaipur'
  );

  // Short URL Box
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(318, 1470, 900, 110, 36);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.stroke();

  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 42px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('g.page/foogle-cafe-udaipur', 768, 1535);

  ctx.fillStyle = '#F59E0B';
  ctx.font = '54px sans-serif';
  ctx.fillText('★★★★★', 768, 1660);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 36px "Inter", sans-serif';
  ctx.fillText('Tap to Leave Your 5-Star Rating', 768, 1730);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 30px "Inter", sans-serif';
  ctx.fillText('↻ Click card again to flip back', 768, 1830);

  return canvas;
}

// ----------------------------------------------------
// INSTAGRAM BADGE
// ----------------------------------------------------

export function createInstagramFrontCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 2160;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 1536, 2160);
  bg.addColorStop(0, '#2D0A24');
  bg.addColorStop(0.5, '#400D28');
  bg.addColorStop(1, '#1A0618');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1536, 2160);

  ctx.lineWidth = 20;
  ctx.strokeStyle = '#F472B6';
  ctx.beginPath();
  ctx.roundRect(60, 60, 1416, 2040, 90);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.beginPath();
  ctx.roundRect(86, 86, 1364, 1988, 72);
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = 'rgba(244, 114, 182, 0.15)';
  ctx.beginPath();
  ctx.roundRect(438, 250, 660, 80, 40);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#F472B6';
  ctx.stroke();

  ctx.fillStyle = '#F472B6';
  ctx.font = '700 32px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '4px';
  ctx.fillText('★ OFFICIAL INSTAGRAM FEED ★', 768, 290);

  // Big Instagram Camera Emblem
  const ix = 768;
  const iy = 490;
  const is = 110;

  const igGrad = ctx.createLinearGradient(ix - is, iy + is, ix + is, iy - is);
  igGrad.addColorStop(0, '#FFDC80');
  igGrad.addColorStop(0.25, '#F77737');
  igGrad.addColorStop(0.5, '#F56040');
  igGrad.addColorStop(0.75, '#FD1D1D');
  igGrad.addColorStop(1, '#C13584');

  ctx.fillStyle = igGrad;
  ctx.beginPath();
  ctx.arc(ix, iy, is, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(ix - is * 0.58, iy - is * 0.58, is * 1.16, is * 1.16, is * 0.32);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(ix, iy, is * 0.28, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(ix + is * 0.32, iy - is * 0.32, is * 0.09, 0, Math.PI * 2);
  ctx.fill();

  // Handle
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 76px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('@fooglecafe', 768, 690);

  // Verified Badge
  ctx.fillStyle = '#0095F6';
  ctx.beginPath();
  ctx.arc(1060, 665, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('✓', 1060, 674);

  ctx.fillStyle = '#FDA4AF';
  ctx.font = '600 36px "Inter", sans-serif';
  ctx.fillText('Courtyard Pizza & Specialty Coffee · Udaipur', 768, 760);

  // Stats Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.beginPath();
  ctx.roundRect(248, 850, 1040, 300, 50);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(244, 114, 182, 0.4)';
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 68px "Inter", sans-serif';
  ctx.fillText('420+', 430, 960);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 32px "Inter", sans-serif';
  ctx.fillText('Posts', 430, 1030);

  ctx.fillStyle = '#F43F5E';
  ctx.font = '900 80px "Inter", sans-serif';
  ctx.fillText('18.5K', 768, 960);
  ctx.fillStyle = '#FDA4AF';
  ctx.font = '700 34px "Inter", sans-serif';
  ctx.fillText('Followers', 768, 1030);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 68px "Inter", sans-serif';
  ctx.fillText('99.2%', 1100, 960);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 32px "Inter", sans-serif';
  ctx.fillText('Positive', 1100, 1030);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = 'italic 500 36px "Inter", Georgia, serif';
  ctx.fillText('“Tag @fooglecafe in your reels & dining stories”', 768, 1260);

  ctx.fillStyle = '#FB7185';
  ctx.font = '700 34px "Inter", sans-serif';
  ctx.fillText('#FoogleMoments · #UdaipurCafe · #CourtyardVibes', 768, 1340);

  // Flip Hint Button Pill
  const pillGrad = ctx.createLinearGradient(300, 1620, 1236, 1620);
  pillGrad.addColorStop(0, '#E1306C');
  pillGrad.addColorStop(0.5, '#F56040');
  pillGrad.addColorStop(1, '#C13584');

  ctx.fillStyle = pillGrad;
  ctx.beginPath();
  ctx.roundRect(318, 1620, 900, 130, 65);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 42px "Inter", sans-serif';
  ctx.fillText('↻ CLICK OR TAP TO FLIP FOR QR CODE', 768, 1700);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 32px "Inter", sans-serif';
  ctx.fillText('Scan QR on reverse to follow us on Instagram', 768, 1830);

  return canvas;
}

export function createInstagramBackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 2160;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 1536, 2160);
  bg.addColorStop(0, '#2D0A24');
  bg.addColorStop(0.5, '#400D28');
  bg.addColorStop(1, '#1A0618');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1536, 2160);

  ctx.lineWidth = 20;
  ctx.strokeStyle = '#F472B6';
  ctx.beginPath();
  ctx.roundRect(60, 60, 1416, 2040, 90);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.beginPath();
  ctx.roundRect(86, 86, 1364, 1988, 72);
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = 'rgba(225, 48, 108, 0.2)';
  ctx.beginPath();
  ctx.roundRect(438, 230, 660, 80, 40);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#E1306C';
  ctx.stroke();

  ctx.fillStyle = '#F472B6';
  ctx.font = '700 32px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('INSTAGRAM PROFILE QR CODE', 768, 270);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 66px "Inter", sans-serif';
  ctx.fillText('Follow @fooglecafe', 768, 380);

  ctx.fillStyle = '#FDA4AF';
  ctx.font = '500 34px "Inter", sans-serif';
  ctx.fillText('Scan with phone camera or Instagram app', 768, 445);

  drawRealisticQRCode(
    ctx,
    768,
    970,
    760,
    'instagram',
    'https://instagram.com/fooglecafe'
  );

  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(318, 1470, 900, 110, 36);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.stroke();

  ctx.fillStyle = '#F43F5E';
  ctx.font = '700 42px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('instagram.com/fooglecafe', 768, 1535);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 36px "Inter", sans-serif';
  ctx.fillText('Join 18,500+ Foodies in Udaipur', 768, 1660);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 30px "Inter", sans-serif';
  ctx.fillText('↻ Click card again to flip back', 768, 1780);

  return canvas;
}

// ----------------------------------------------------
// FACEBOOK BADGE
// ----------------------------------------------------

export function createFacebookFrontCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 2160;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 1536, 2160);
  bg.addColorStop(0, '#091A36');
  bg.addColorStop(0.5, '#0E2954');
  bg.addColorStop(1, '#061329');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1536, 2160);

  ctx.lineWidth = 20;
  ctx.strokeStyle = '#3B82F6';
  ctx.beginPath();
  ctx.roundRect(60, 60, 1416, 2040, 90);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.beginPath();
  ctx.roundRect(86, 86, 1364, 1988, 72);
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
  ctx.beginPath();
  ctx.roundRect(438, 250, 660, 80, 40);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#3B82F6';
  ctx.stroke();

  ctx.fillStyle = '#60A5FA';
  ctx.font = '700 32px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '4px';
  ctx.fillText('★ FACEBOOK COMMUNITY ★', 768, 290);

  // Big Facebook 'f' Emblem
  const ix = 768;
  const iy = 490;
  const is = 110;

  ctx.fillStyle = '#1877F2';
  ctx.beginPath();
  ctx.arc(ix, iy, is, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 150px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('f', ix + 16, iy + 55);

  // Brand Name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 72px "Inter", sans-serif';
  ctx.fillText('Foogle Cafe Community', 768, 690);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '600 36px "Inter", sans-serif';
  ctx.fillText('Panchwati, Udaipur · Rajasthan', 768, 760);

  // 99% Recommendation Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.beginPath();
  ctx.roundRect(328, 850, 880, 300, 50);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
  ctx.stroke();

  ctx.fillStyle = '#38BDF8';
  ctx.font = '900 140px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('99%', 570, 1030);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 44px "Inter", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Recommended', 730, 980);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 34px "Inter", sans-serif';
  ctx.fillText('By 1,400+ Guests', 730, 1040);
  ctx.textAlign = 'center';

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '700 38px "Inter", sans-serif';
  ctx.fillText('14,000+ Likes & Check-ins on Facebook', 768, 1250);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = 'italic 500 36px "Inter", Georgia, serif';
  ctx.fillText('“Hosted our family dinner in the courtyard — extraordinary food!”', 768, 1370);

  ctx.fillStyle = '#60A5FA';
  ctx.font = '700 30px "Inter", sans-serif';
  ctx.fillText('— Verified Facebook Guest Recommendation', 768, 1440);

  // Flip Hint Button Pill
  const pillGrad = ctx.createLinearGradient(300, 1620, 1236, 1620);
  pillGrad.addColorStop(0, '#1D4ED8');
  pillGrad.addColorStop(0.5, '#2563EB');
  pillGrad.addColorStop(1, '#1E40AF');

  ctx.fillStyle = pillGrad;
  ctx.beginPath();
  ctx.roundRect(318, 1620, 900, 130, 65);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 42px "Inter", sans-serif';
  ctx.fillText('↻ CLICK OR TAP TO FLIP FOR QR CODE', 768, 1700);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 32px "Inter", sans-serif';
  ctx.fillText('Scan QR on reverse to view Facebook page', 768, 1830);

  return canvas;
}

export function createFacebookBackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 2160;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 1536, 2160);
  bg.addColorStop(0, '#091A36');
  bg.addColorStop(0.5, '#0E2954');
  bg.addColorStop(1, '#061329');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1536, 2160);

  ctx.lineWidth = 20;
  ctx.strokeStyle = '#3B82F6';
  ctx.beginPath();
  ctx.roundRect(60, 60, 1416, 2040, 90);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.beginPath();
  ctx.roundRect(86, 86, 1364, 1988, 72);
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = 'rgba(24, 119, 242, 0.2)';
  ctx.beginPath();
  ctx.roundRect(438, 230, 660, 80, 40);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#1877F2';
  ctx.stroke();

  ctx.fillStyle = '#60A5FA';
  ctx.font = '700 32px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FACEBOOK PAGE QR CODE', 768, 270);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 66px "Inter", sans-serif';
  ctx.fillText('Join Foogle on Facebook', 768, 380);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 34px "Inter", sans-serif';
  ctx.fillText('Point your phone camera to check-in & like page', 768, 445);

  drawRealisticQRCode(
    ctx,
    768,
    970,
    760,
    'facebook',
    'https://facebook.com/fooglecafe'
  );

  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(318, 1470, 900, 110, 36);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.stroke();

  ctx.fillStyle = '#60A5FA';
  ctx.font = '700 42px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('facebook.com/fooglecafe', 768, 1535);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 36px "Inter", sans-serif';
  ctx.fillText('👍 14,000+ Likes · 99% Positive Reviews', 768, 1660);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 30px "Inter", sans-serif';
  ctx.fillText('↻ Click card again to flip back', 768, 1780);

  return canvas;
}

// ----------------------------------------------------
// STRAP TEXTURE GENERATOR
// ----------------------------------------------------

export function createStrapCanvas(type: 'google' | 'instagram' | 'facebook'): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 192;
  canvas.height = 768;
  const ctx = canvas.getContext('2d')!;

  let bgColor = '#0B1624';
  let accentColor = '#D4AF37';
  let text = '★ FOOGLE CAFE · 4.9★ GOOGLE REVIEWS ★';

  if (type === 'google') {
    bgColor = '#0B1624';
    accentColor = '#D4AF37';
    text = '★ FOOGLE CAFE · GOOGLE 4.9★ · UDAIPUR ★';
  } else if (type === 'instagram') {
    bgColor = '#23081E';
    accentColor = '#F472B6';
    text = '📷 @FOOGLECAFE · REELS & STORIES · UDAIPUR 📷';
  } else if (type === 'facebook') {
    bgColor = '#071830';
    accentColor = '#3B82F6';
    text = '👍 FOOGLE CAFE · 99% RECOMMENDED · UDAIPUR 👍';
  }

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 192, 768);

  ctx.fillStyle = accentColor;
  for (let y = 0; y < 768; y += 16) {
    ctx.fillRect(8, y, 4, 10);
    ctx.fillRect(180, y, 4, 10);
  }

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(20, 768);
  ctx.moveTo(172, 0);
  ctx.lineTo(172, 768);
  ctx.stroke();

  ctx.save();
  ctx.translate(96, 0);
  ctx.rotate(Math.PI / 2);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '3px';

  for (let x = 190; x < 900; x += 380) {
    ctx.fillText(text, x, 0);
  }

  ctx.restore();

  return canvas;
}

// Data URL Fallbacks for backwards compatibility
export const generateGoogleFrontCard = () => createGoogleFrontCanvas().toDataURL('image/png');
export const generateGoogleBackCard = () => createGoogleBackCanvas().toDataURL('image/png');
export const generateInstagramFrontCard = () => createInstagramFrontCanvas().toDataURL('image/png');
export const generateInstagramBackCard = () => createInstagramBackCanvas().toDataURL('image/png');
export const generateFacebookFrontCard = () => createFacebookFrontCanvas().toDataURL('image/png');
export const generateFacebookBackCard = () => createFacebookBackCanvas().toDataURL('image/png');
export const generateStrapTexture = (type: 'google' | 'instagram' | 'facebook') => createStrapCanvas(type).toDataURL('image/png');
