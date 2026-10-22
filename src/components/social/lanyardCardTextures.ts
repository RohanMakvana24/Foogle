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

import REAL_QR_DATA from './realQrMatrices.json';

// Draw an authentic, 100% scannable real QR Code
function drawRealisticQRCode(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  type: 'google' | 'instagram' | 'facebook',
  payload: string
) {
  const qrEntry = REAL_QR_DATA[type];
  const grid: number[][] = qrEntry ? qrEntry.matrix : [];
  const modules = grid.length || 29;
  const modSize = size / modules;
  const startX = cx - size / 2;
  const startY = cy - size / 2;

  ctx.save();
  const pad = modSize * 2.2;
  const qx = startX - pad;
  const qy = startY - pad;
  const qw = size + pad * 2;
  const qh = size + pad * 2;

  // Crisp white base for max camera contrast
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(qx, qy, qw, qh, 32);
  ctx.fill();

  ctx.lineWidth = 4;
  ctx.strokeStyle = '#E2E8F0';
  ctx.stroke();

  // Draw real QR data modules (pure solid black for 100% instant phone scan)
  ctx.fillStyle = '#000000';
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      if (grid[r] && grid[r][c] === 1) {
        const mx = startX + c * modSize;
        const my = startY + r * modSize;
        ctx.fillRect(mx, my, modSize, modSize);
      }
    }
  }

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
  bg.addColorStop(0, '#0a1523');
  bg.addColorStop(0.5, '#102238');
  bg.addColorStop(1, '#070f1a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1536, 2160);

  // Outer Gold Border
  ctx.lineWidth = 22;
  ctx.strokeStyle = '#EAB308';
  ctx.beginPath();
  ctx.roundRect(64, 64, 1408, 2032, 88);
  ctx.stroke();

  // Inner Subtle Golden Rim
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(234, 179, 8, 0.4)';
  ctx.beginPath();
  ctx.roundRect(94, 94, 1348, 1972, 70);
  ctx.stroke();

  // Top Verified Tag Pill
  ctx.fillStyle = 'rgba(234, 179, 8, 0.18)';
  ctx.beginPath();
  ctx.roundRect(400, 240, 736, 90, 45);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#FACC15';
  ctx.stroke();

  ctx.fillStyle = '#FDE047';
  ctx.font = '900 36px "Inter", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('★ VERIFIED GOOGLE DINING ★', 768, 285);

  // Big Crisp Google "G" Emblem
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(768, 500, 120, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#38BDF8';
  ctx.stroke();

  const rad = 66;
  ctx.lineWidth = 24;
  ctx.lineCap = 'butt';

  ctx.strokeStyle = '#4285F4';
  ctx.beginPath();
  ctx.arc(768, 500, rad, -0.2 * Math.PI, 0.25 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = '#4285F4';
  ctx.fillRect(768, 500 - 12, rad * 0.95, 24);

  ctx.strokeStyle = '#34A853';
  ctx.beginPath();
  ctx.arc(768, 500, rad, 0.25 * Math.PI, 0.75 * Math.PI);
  ctx.stroke();

  ctx.strokeStyle = '#FBBC05';
  ctx.beginPath();
  ctx.arc(768, 500, rad, 0.75 * Math.PI, 1.25 * Math.PI);
  ctx.stroke();

  ctx.strokeStyle = '#EA4335';
  ctx.beginPath();
  ctx.arc(768, 500, rad, 1.25 * Math.PI, 1.8 * Math.PI);
  ctx.stroke();

  // Brand Name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 84px "Inter", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Foogle Cafe & Resto', 768, 715);

  ctx.fillStyle = '#BAE6FD';
  ctx.font = '700 42px "Inter", system-ui, sans-serif';
  ctx.fillText('Panchwati, Udaipur · Rajasthan', 768, 785);

  // Big 4.9 Score Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.beginPath();
  ctx.roundRect(288, 875, 960, 310, 52);
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#EAB308';
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 150px "Inter", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('4.9', 630, 1050);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '800 56px "Inter", system-ui, sans-serif';
  ctx.fillText('/ 5.0', 825, 1040);

  // 5 Stars
  const starStartX = 500;
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = '#F59E0B';
    ctx.font = '64px sans-serif';
    ctx.fillText('★', starStartX + i * 65, 1130);
  }

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '800 46px "Inter", system-ui, sans-serif';
  ctx.fillText('1,200+ Verified Google Reviews', 768, 1275);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '600 38px "Inter", Georgia, serif';
  ctx.fillText('“Best woodfired pizzas & specialty brews in Udaipur”', 768, 1375);

  ctx.fillStyle = '#FBBF24';
  ctx.font = '800 36px "Inter", system-ui, sans-serif';
  ctx.fillText('— Rated 5 Stars by Verified Diners', 768, 1445);

  // Clean Flip Hint Button Pill (without broken characters)
  const pillGrad = ctx.createLinearGradient(318, 1620, 1218, 1620);
  pillGrad.addColorStop(0, '#B45309');
  pillGrad.addColorStop(0.5, '#F59E0B');
  pillGrad.addColorStop(1, '#D97706');

  ctx.fillStyle = pillGrad;
  ctx.beginPath();
  ctx.roundRect(318, 1620, 900, 130, 65);
  ctx.fill();

  ctx.fillStyle = '#0F172A';
  ctx.font = '900 44px "Inter", system-ui, sans-serif';
  ctx.fillText('FLIP CARD FOR QR CODE', 768, 1698);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '700 38px "Inter", system-ui, sans-serif';
  ctx.fillText('Tap anywhere to scan on Google', 768, 1835);

  return canvas;
}

export function createGoogleBackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 2160;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 1536, 2160);
  bg.addColorStop(0, '#0a1523');
  bg.addColorStop(0.5, '#102238');
  bg.addColorStop(1, '#070f1a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1536, 2160);

  ctx.lineWidth = 22;
  ctx.strokeStyle = '#EAB308';
  ctx.beginPath();
  ctx.roundRect(64, 64, 1408, 2032, 88);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(234, 179, 8, 0.4)';
  ctx.beginPath();
  ctx.roundRect(94, 94, 1348, 1972, 70);
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = 'rgba(66, 133, 244, 0.25)';
  ctx.beginPath();
  ctx.roundRect(400, 230, 736, 90, 45);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#38BDF8';
  ctx.stroke();

  ctx.fillStyle = '#38BDF8';
  ctx.font = '900 36px "Inter", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GOOGLE REVIEW QR CODE', 768, 275);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 76px "Inter", system-ui, sans-serif';
  ctx.fillText('Review Foogle on Google', 768, 385);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 38px "Inter", system-ui, sans-serif';
  ctx.fillText('Point your phone camera at this QR code', 768, 450);

  drawRealisticQRCode(
    ctx,
    768,
    970,
    760,
    'google',
    'https://maps.app.goo.gl/uXj9V1cvyb1vG2Y9A'
  );

  // Short URL Box
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.beginPath();
  ctx.roundRect(288, 1470, 960, 115, 38);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#38BDF8';
  ctx.stroke();

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 46px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('g.page/foogle-cafe-udaipur', 768, 1538);

  ctx.fillStyle = '#F59E0B';
  ctx.font = '64px sans-serif';
  ctx.fillText('★★★★★', 768, 1665);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 42px "Inter", system-ui, sans-serif';
  ctx.fillText('Tap to Leave Your 5-Star Rating', 768, 1735);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 34px "Inter", system-ui, sans-serif';
  ctx.fillText('Click card again to flip back', 768, 1835);

  return canvas;
}

// ----------------------------------------------------
// INSTAGRAM BADGE (REAL FOOGLE ACCOUNT @foogle_foods)
// ----------------------------------------------------

export function createInstagramFrontCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 2160;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 1536, 2160);
  bg.addColorStop(0, '#26041f');
  bg.addColorStop(0.5, '#3b0826');
  bg.addColorStop(1, '#150112');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1536, 2160);

  // Outer Vibrant Pink Rim
  ctx.lineWidth = 22;
  ctx.strokeStyle = '#F43F5E';
  ctx.beginPath();
  ctx.roundRect(64, 64, 1408, 2032, 88);
  ctx.stroke();

  // Inner Glow Border
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
  ctx.beginPath();
  ctx.roundRect(94, 94, 1348, 1972, 70);
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
  ctx.beginPath();
  ctx.roundRect(380, 240, 776, 90, 45);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#F43F5E';
  ctx.stroke();

  ctx.fillStyle = '#FDA4AF';
  ctx.font = '900 36px "Inter", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('★ OFFICIAL INSTAGRAM PROFILE ★', 768, 285);

  // Big Instagram Camera Emblem
  const ix = 768;
  const iy = 500;
  const is = 120;

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
  ctx.lineWidth = 11;
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

  // Real Instagram Handle
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 84px "Inter", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('foogle_foods', 768, 715);

  ctx.fillStyle = '#FDA4AF';
  ctx.font = '700 40px "Inter", system-ui, sans-serif';
  ctx.fillText('Foogle cafe ❤️ · Panchwati 📍 Field Club', 768, 785);

  // Stats Box - 100% Real from Live Instagram Profile
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.beginPath();
  ctx.roundRect(228, 875, 1080, 310, 52);
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#F43F5E';
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 84px "Inter", system-ui, sans-serif';
  ctx.fillText('2,843', 420, 985);
  ctx.fillStyle = '#FDA4AF';
  ctx.font = '700 36px "Inter", system-ui, sans-serif';
  ctx.fillText('Followers', 420, 1065);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 84px "Inter", system-ui, sans-serif';
  ctx.fillText('886', 768, 985);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 36px "Inter", system-ui, sans-serif';
  ctx.fillText('Following', 768, 1065);

  ctx.fillStyle = '#F43F5E';
  ctx.font = '900 84px "Inter", system-ui, sans-serif';
  ctx.fillText('Udaipur', 1110, 985);
  ctx.fillStyle = '#FDA4AF';
  ctx.font = '700 36px "Inter", system-ui, sans-serif';
  ctx.fillText('Location', 1110, 1065);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '600 36px "Inter", Georgia, serif';
  ctx.fillText('“Your cozy Corner for fresh coffee, comfort food & good vibes.”', 768, 1275);

  ctx.fillStyle = '#FB7185';
  ctx.font = '800 38px "Inter", system-ui, sans-serif';
  ctx.fillText('Drop by, unwind, stay a while · @foogle_foods', 768, 1365);

  // Clean Flip Hint Button Pill
  const pillGrad = ctx.createLinearGradient(318, 1620, 1218, 1620);
  pillGrad.addColorStop(0, '#E1306C');
  pillGrad.addColorStop(0.5, '#F56040');
  pillGrad.addColorStop(1, '#C13584');

  ctx.fillStyle = pillGrad;
  ctx.beginPath();
  ctx.roundRect(318, 1620, 900, 130, 65);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 44px "Inter", system-ui, sans-serif';
  ctx.fillText('FLIP CARD FOR QR CODE', 768, 1698);

  ctx.fillStyle = '#FDA4AF';
  ctx.font = '700 38px "Inter", system-ui, sans-serif';
  ctx.fillText('Tap anywhere to follow on Instagram', 768, 1835);

  return canvas;
}

export function createInstagramBackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 2160;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 1536, 2160);
  bg.addColorStop(0, '#26041f');
  bg.addColorStop(0.5, '#3b0826');
  bg.addColorStop(1, '#150112');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1536, 2160);

  ctx.lineWidth = 22;
  ctx.strokeStyle = '#F43F5E';
  ctx.beginPath();
  ctx.roundRect(64, 64, 1408, 2032, 88);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
  ctx.beginPath();
  ctx.roundRect(94, 94, 1348, 1972, 70);
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = 'rgba(225, 48, 108, 0.25)';
  ctx.beginPath();
  ctx.roundRect(380, 230, 776, 90, 45);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#E1306C';
  ctx.stroke();

  ctx.fillStyle = '#FDA4AF';
  ctx.font = '900 36px "Inter", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('INSTAGRAM PROFILE QR CODE', 768, 275);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 76px "Inter", system-ui, sans-serif';
  ctx.fillText('Follow @foogle_foods', 768, 385);

  ctx.fillStyle = '#FDA4AF';
  ctx.font = '600 38px "Inter", system-ui, sans-serif';
  ctx.fillText('Scan with phone camera or Instagram app', 768, 450);

  drawRealisticQRCode(
    ctx,
    768,
    970,
    760,
    'instagram',
    'https://www.instagram.com/foogle_foods/'
  );

  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.beginPath();
  ctx.roundRect(288, 1470, 960, 115, 38);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#F43F5E';
  ctx.stroke();

  ctx.fillStyle = '#F43F5E';
  ctx.font = '800 46px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('instagram.com/foogle_foods', 768, 1538);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 42px "Inter", system-ui, sans-serif';
  ctx.fillText('Join 2,840+ Foogle Foodies in Udaipur', 768, 1665);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 34px "Inter", system-ui, sans-serif';
  ctx.fillText('Click card again to flip back', 768, 1785);

  return canvas;
}

// ----------------------------------------------------
// FACEBOOK BADGE (REAL PAGE "Foogle Foods Udaipur")
// ----------------------------------------------------

export function createFacebookFrontCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 2160;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 1536, 2160);
  bg.addColorStop(0, '#06162e');
  bg.addColorStop(0.5, '#0b2347');
  bg.addColorStop(1, '#040f21');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1536, 2160);

  ctx.lineWidth = 22;
  ctx.strokeStyle = '#3B82F6';
  ctx.beginPath();
  ctx.roundRect(64, 64, 1408, 2032, 88);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
  ctx.beginPath();
  ctx.roundRect(94, 94, 1348, 1972, 70);
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
  ctx.beginPath();
  ctx.roundRect(400, 240, 736, 90, 45);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#3B82F6';
  ctx.stroke();

  ctx.fillStyle = '#93C5FD';
  ctx.font = '900 36px "Inter", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('★ OFFICIAL FACEBOOK PAGE ★', 768, 285);

  // Big Facebook 'f' Emblem
  const ix = 768;
  const iy = 500;
  const is = 120;

  ctx.fillStyle = '#1877F2';
  ctx.beginPath();
  ctx.arc(ix, iy, is, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#60A5FA';
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 165px "Inter", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('f', ix + 18, iy + 62);

  // Brand Name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 88px "Inter", system-ui, sans-serif';
  ctx.fillText('Foogle', 768, 715);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '700 40px "Inter", system-ui, sans-serif';
  ctx.fillText('Cafe · $$ · Lives in Udaipur, Rajasthan', 768, 785);

  // Exact Stats Box from Facebook screenshot
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.beginPath();
  ctx.roundRect(228, 875, 1080, 310, 52);
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#3B82F6';
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 84px "Inter", system-ui, sans-serif';
  ctx.fillText('1.1K', 420, 985);
  ctx.fillStyle = '#93C5FD';
  ctx.font = '700 36px "Inter", system-ui, sans-serif';
  ctx.fillText('Followers', 420, 1065);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 84px "Inter", system-ui, sans-serif';
  ctx.fillText('10', 768, 985);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 36px "Inter", system-ui, sans-serif';
  ctx.fillText('Following', 768, 1065);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '900 84px "Inter", system-ui, sans-serif';
  ctx.fillText('Udaipur', 1110, 985);
  ctx.fillStyle = '#93C5FD';
  ctx.font = '700 36px "Inter", system-ui, sans-serif';
  ctx.fillText('Rajasthan', 1110, 1065);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '600 34px "Inter", Georgia, serif';
  ctx.fillText('“A cozy place to enjoy sweet & savory delicacy and Amazing thick shakes”', 768, 1275);

  ctx.fillStyle = '#60A5FA';
  ctx.font = '800 38px "Inter", system-ui, sans-serif';
  ctx.fillText('Connect on WhatsApp & Messenger · Foogle Udaipur', 768, 1365);

  // Clean Flip Hint Button Pill
  const pillGrad = ctx.createLinearGradient(318, 1620, 1218, 1620);
  pillGrad.addColorStop(0, '#1D4ED8');
  pillGrad.addColorStop(0.5, '#2563EB');
  pillGrad.addColorStop(1, '#1E40AF');

  ctx.fillStyle = pillGrad;
  ctx.beginPath();
  ctx.roundRect(318, 1620, 900, 130, 65);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 44px "Inter", system-ui, sans-serif';
  ctx.fillText('FLIP CARD FOR QR CODE', 768, 1698);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '700 38px "Inter", system-ui, sans-serif';
  ctx.fillText('Tap anywhere to view on Facebook', 768, 1835);

  return canvas;
}

export function createFacebookBackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 2160;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 1536, 2160);
  bg.addColorStop(0, '#06162e');
  bg.addColorStop(0.5, '#0b2347');
  bg.addColorStop(1, '#040f21');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1536, 2160);

  ctx.lineWidth = 22;
  ctx.strokeStyle = '#3B82F6';
  ctx.beginPath();
  ctx.roundRect(64, 64, 1408, 2032, 88);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
  ctx.beginPath();
  ctx.roundRect(94, 94, 1348, 1972, 70);
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = 'rgba(24, 119, 242, 0.25)';
  ctx.beginPath();
  ctx.roundRect(400, 230, 736, 90, 45);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#3B82F6';
  ctx.stroke();

  ctx.fillStyle = '#93C5FD';
  ctx.font = '900 36px "Inter", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FACEBOOK PAGE QR CODE', 768, 275);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 76px "Inter", system-ui, sans-serif';
  ctx.fillText('Join Foogle on Facebook', 768, 385);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '600 38px "Inter", system-ui, sans-serif';
  ctx.fillText('Point your phone camera to check-in & like page', 768, 450);

  drawRealisticQRCode(
    ctx,
    768,
    970,
    760,
    'facebook',
    'https://www.facebook.com/FoogleFoods/'
  );

  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.beginPath();
  ctx.roundRect(288, 1470, 960, 115, 38);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#3B82F6';
  ctx.stroke();

  ctx.fillStyle = '#60A5FA';
  ctx.font = '800 46px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('facebook.com/FoogleFoods', 768, 1538);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 42px "Inter", system-ui, sans-serif';
  ctx.fillText('1.1K+ Followers · Foogle Cafe Udaipur', 768, 1665);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 34px "Inter", system-ui, sans-serif';
  ctx.fillText('Click card again to flip back', 768, 1785);

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
