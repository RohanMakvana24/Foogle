import * as THREE from 'three';

export interface BadgeThemeConfig {
  id: string;
  name: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  badgeTag: string;
  ratingText: string;
  subRating: string;
  handle: string;
  quote: string;
  author: string;
  btnText: string;
  bandText: string;
  bandBg: string;
}

export const BADGE_THEMES: Record<string, BadgeThemeConfig> = {
  google: {
    id: 'google',
    name: 'Google Reviews',
    tagline: '4.9 ★★★★★ · 2,480+ Reviews',
    primaryColor: '#1A73E8',
    accentColor: '#F59E0B',
    badgeTag: 'VERIFIED GOOGLE DINER',
    ratingText: '4.9',
    subRating: '2,480+ Verified Reviews on Google',
    handle: 'FOOGLE CAFE & RESTO',
    quote: '"Best woodfired pizza & specialty coffee in Udaipur. Cozy courtyard atmosphere with 5-star hospitality!"',
    author: '— Aarav Sharma · Local Guide (Level 7)',
    btnText: 'READ GOOGLE REVIEWS ↗',
    bandText: '✦ FOOGLE CAFE · 4.9★ GOOGLE RATED · PANCHWATI, UDAIPUR ✦',
    bandBg: '#132338',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram Feed',
    tagline: '@fooglecafe · 18.5K Followers',
    primaryColor: '#E1306C',
    accentColor: '#FD1D1D',
    badgeTag: 'TRENDING COURTYARD REELS',
    ratingText: '18.5K',
    subRating: 'Followers · 420 Posts · Udaipur',
    handle: '@fooglecafe · Udaipur',
    quote: '"Golden hour in the sun-drenched courtyard with sourdough margherita and iced espresso tonic."',
    author: '— Priya Mehra · Food & Travel Creator',
    btnText: 'FOLLOW ON INSTAGRAM ↗',
    bandText: '✦ @FOOGLECAFE · COURTYARD REELS & STORIES · UDAIPUR ✦',
    bandBg: '#3b1228',
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook Community',
    tagline: '99% Recommended · 14K Likes',
    primaryColor: '#1877F2',
    accentColor: '#3B82F6',
    badgeTag: 'COMMUNITY RECOMMENDATION',
    ratingText: '99%',
    subRating: 'Recommended by 1,400+ Guests',
    handle: 'Foogle Cafe Udaipur',
    quote: '"Hosted our family anniversary dinner in the courtyard garden. Warm hospitality and phenomenal pizzas!"',
    author: '— Vikram & Meera R. · Verified Diners',
    btnText: 'VISIT FACEBOOK PAGE ↗',
    bandText: '✦ FOOGLE CAFE UDAIPUR · 99% RECOMMENDED COMMUNITY ✦',
    bandBg: '#0f294a',
  },
  twitter: {
    id: 'twitter',
    name: 'X (Twitter)',
    tagline: '@foogle_udaipur · Live Crust Talk',
    primaryColor: '#0F172A',
    accentColor: '#0EA5E9',
    badgeTag: 'LIVE PASS BROADCAST',
    ratingText: '450°C',
    subRating: 'Stone Oven Fired · 340+ Live Updates',
    handle: '@foogle_udaipur · Live',
    quote: '"450°C stone oven fired up early today. 48-hr slow fermented sourdough batches ready for service!"',
    author: '— Chef Pass · Head Pizzaiolo',
    btnText: 'FOLLOW ON X ↗',
    bandText: '✦ @FOOGLE_UDAIPUR · 450°C STONE OVEN LIVE PASS ✦',
    bandBg: '#1e293b',
  },
};

// Helper: draw a rounded rectangle
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Draw fake clean QR code
function drawCleanQr(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string
) {
  const half = size / 2;
  const startX = cx - half;
  const startY = cy - half;
  const cells = 15;
  const cell = size / cells;

  // Background white box
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(startX - 12, startY - 12, size + 24, size + 24);

  ctx.fillStyle = color;

  // Corner markers
  const drawCorner = (ox: number, oy: number) => {
    ctx.fillRect(ox, oy, cell * 5, cell * 5);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(ox + cell, oy + cell, cell * 3, cell * 3);
    ctx.fillStyle = color;
    ctx.fillRect(ox + cell * 1.5, oy + cell * 1.5, cell * 2, cell * 2);
  };

  drawCorner(startX, startY);
  drawCorner(startX + cell * 10, startY);
  drawCorner(startX, startY + cell * 10);

  // Pattern dots
  const pattern = [
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
    [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 7], [6, 8], [6, 9], [6, 10],
    [7, 1], [8, 2], [9, 3], [7, 7], [8, 8], [7, 9], [8, 10], [9, 9], [10, 8],
    [11, 7], [12, 8], [13, 9], [14, 10], [10, 12], [11, 13], [12, 14], [8, 12],
    [2, 8], [3, 9], [4, 8], [2, 12], [3, 13], [4, 14], [8, 13], [9, 14],
  ];

  pattern.forEach(([px, py]) => {
    ctx.fillRect(startX + px * cell, startY + py * cell, cell * 0.9, cell * 0.9);
  });
}

/**
 * Creates an ultra-clean, vector-sharp 1024x1024 CanvasTexture for a 3D badge.
 * Card mapping layout:
 *   Left half (x: 16..484, y: 16..736): FRONT of badge
 *   Right half (x: 516..984, y: 16..736): BACK of badge
 */
export function createCleanBadgeCanvasTexture(configId: string): THREE.CanvasTexture {
  const theme = BADGE_THEMES[configId] || BADGE_THEMES.google;
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Clear canvas with neutral dark transparent background
  ctx.clearRect(0, 0, 1024, 1024);

  // ─────────────────────────────────────────────────────────────
  // 1. FRONT OF BADGE (Left half: x: 16..484, y: 16..736)
  // ─────────────────────────────────────────────────────────────
  const fx = 20;
  const fy = 20;
  const fw = 464;
  const fh = 712;
  const fradius = 30;

  // Crisp White Acrylic Card Base
  drawRoundedRect(ctx, fx, fy, fw, fh, fradius);
  const cardGrad = ctx.createLinearGradient(fx, fy, fx, fy + fh);
  cardGrad.addColorStop(0, '#FFFFFF');
  cardGrad.addColorStop(0.85, '#FAF8F5');
  cardGrad.addColorStop(1, '#F3EFE8');
  ctx.fillStyle = cardGrad;
  ctx.fill();

  // Subtle Outer Border Rim (Metallic/Accent glow)
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = theme.primaryColor;
  ctx.stroke();

  // Thin Inner Inset Highlight
  drawRoundedRect(ctx, fx + 5, fy + 5, fw - 10, fh - 10, fradius - 4);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(0,0,0,0.06)';
  ctx.stroke();

  // Top Lanyard Hole (Center at x: 252, y: 56, radius 18)
  ctx.beginPath();
  ctx.arc(fx + fw / 2, fy + 38, 17, 0, Math.PI * 2);
  ctx.fillStyle = '#E5E0D5';
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#B3A895';
  ctx.stroke();

  // ── Front Header: Brand Logo & Title ──
  const contentY = fy + 80;

  // Top platform pill badge
  ctx.fillStyle = theme.primaryColor + '15';
  drawRoundedRect(ctx, fx + 28, contentY, fw - 56, 36, 18);
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = theme.primaryColor + '40';
  ctx.stroke();

  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = theme.primaryColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`✦ ${theme.badgeTag} ✦`, fx + fw / 2, contentY + 18);

  // Big Rating Number & Stars
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  if (theme.id === 'google') {
    // Google Logo 4-color circle
    ctx.beginPath();
    ctx.arc(fx + 56, contentY + 98, 24, 0, Math.PI * 2);
    ctx.fillStyle = '#F8FAFC';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#E2E8F0';
    ctx.stroke();

    // Google G in center
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.fillStyle = '#4285F4';
    ctx.textAlign = 'center';
    ctx.fillText('G', fx + 56, contentY + 106);

    // 4.9 rating
    ctx.textAlign = 'left';
    ctx.font = '900 48px system-ui, sans-serif';
    ctx.fillStyle = '#111827';
    ctx.fillText('4.9', fx + 96, contentY + 104);

    // Stars
    ctx.font = '24px system-ui, sans-serif';
    ctx.fillStyle = '#F59E0B';
    ctx.fillText('★★★★★', fx + 192, contentY + 86);

    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillStyle = '#4B5563';
    ctx.fillText('2,480+ Reviews on Google', fx + 194, contentY + 106);

    // 4-color Google bar
    const barY = contentY + 128;
    const barW = (fw - 56) / 4;
    const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
    colors.forEach((col, idx) => {
      ctx.fillStyle = col;
      ctx.fillRect(fx + 28 + idx * barW, barY, barW, 4);
    });
  } else {
    // Custom platform header
    ctx.font = '900 44px system-ui, sans-serif';
    ctx.fillStyle = '#111827';
    ctx.fillText(theme.ratingText, fx + 36, contentY + 96);

    ctx.font = '22px system-ui, sans-serif';
    ctx.fillStyle = theme.accentColor;
    ctx.fillText('★★★★★', fx + 190, contentY + 80);

    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillStyle = '#4B5563';
    ctx.fillText(theme.subRating, fx + 190, contentY + 100);

    // Accent bar
    const barY = contentY + 120;
    ctx.fillStyle = theme.primaryColor;
    ctx.fillRect(fx + 28, barY, fw - 56, 4);
  }

  // Brand Name & Location
  const brandY = contentY + 162;
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.fillStyle = '#111827';
  ctx.fillText(theme.handle, fx + 32, brandY);

  ctx.font = 'bold 12px system-ui, sans-serif';
  ctx.fillStyle = '#059669';
  ctx.fillText('📍 Panchwati, Udaipur · Rajasthan', fx + 32, brandY + 22);

  // Review Quote Box (Clean warm inset)
  const quoteY = brandY + 44;
  const quoteH = 160;
  drawRoundedRect(ctx, fx + 28, quoteY, fw - 56, quoteH, 18);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#E5E7EB';
  ctx.stroke();

  // Quote mark
  ctx.font = 'bold 36px serif';
  ctx.fillStyle = theme.primaryColor + '40';
  ctx.fillText('“', fx + 42, quoteY + 40);

  // Quote text (wrapped)
  ctx.font = 'italic 15px system-ui, Georgia, serif';
  ctx.fillStyle = '#1F2937';
  
  if (theme.id === 'google') {
    ctx.fillText('Best woodfired pizza & pour-over coffee', fx + 44, quoteY + 60);
    ctx.fillText('in Udaipur. Cozy courtyard atmosphere with', fx + 44, quoteY + 84);
    ctx.fillText('warm, unhurried 5-star hospitality!', fx + 44, quoteY + 108);
  } else if (theme.id === 'instagram') {
    ctx.fillText('Golden hour in the sun-drenched courtyard', fx + 44, quoteY + 60);
    ctx.fillText('with sourdough margherita and iced latte.', fx + 44, quoteY + 84);
    ctx.fillText('Udaipur’s coziest cafe aesthetic!', fx + 44, quoteY + 108);
  } else if (theme.id === 'facebook') {
    ctx.fillText('Hosted our family dinner in the courtyard.', fx + 44, quoteY + 60);
    ctx.fillText('Warm hospitality, live weekend music, and', fx + 44, quoteY + 84);
    ctx.fillText('phenomenal artisanal gourmet pizzas!', fx + 44, quoteY + 108);
  } else {
    ctx.fillText('450°C stone oven fired up early today.', fx + 44, quoteY + 60);
    ctx.fillText('48-hr slow fermented sourdough batches', fx + 44, quoteY + 84);
    ctx.fillText('ready for dinner. Grab a fresh slice!', fx + 44, quoteY + 108);
  }

  // Author
  ctx.font = 'bold 12px system-ui, sans-serif';
  ctx.fillStyle = '#4B5563';
  ctx.fillText(theme.author, fx + 44, quoteY + 138);

  // Bottom CTA Pill Button
  const btnY = quoteY + quoteH + 28;
  const btnH = 50;
  drawRoundedRect(ctx, fx + 28, btnY, fw - 56, btnH, 25);
  ctx.fillStyle = theme.primaryColor;
  ctx.fill();

  ctx.font = 'bold 14px system-ui, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(theme.btnText, fx + fw / 2, btnY + 31);

  // Verified Footnote
  ctx.font = '10px system-ui, sans-serif';
  ctx.fillStyle = '#9CA3AF';
  ctx.fillText('FOOGLE CAFE · OFFICIAL VERIFIED EXPERIENCE', fx + fw / 2, btnY + 70);

  // ─────────────────────────────────────────────────────────────
  // 2. BACK OF BADGE (Right half: x: 516..984, y: 16..736)
  // ─────────────────────────────────────────────────────────────
  const bx = 520;
  const by = 20;
  const bw = 464;
  const bh = 712;

  // Crisp White Card Base
  drawRoundedRect(ctx, bx, by, bw, bh, fradius);
  ctx.fillStyle = cardGrad;
  ctx.fill();

  ctx.lineWidth = 3.5;
  ctx.strokeStyle = theme.primaryColor;
  ctx.stroke();

  // Inset highlight
  drawRoundedRect(ctx, bx + 5, by + 5, bw - 10, bh - 10, fradius - 4);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(0,0,0,0.06)';
  ctx.stroke();

  // Top Hole (Center at x: 752, y: 56)
  ctx.beginPath();
  ctx.arc(bx + bw / 2, by + 38, 17, 0, Math.PI * 2);
  ctx.fillStyle = '#E5E0D5';
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#B3A895';
  ctx.stroke();

  // Back Content
  ctx.textAlign = 'center';

  // Title
  ctx.font = '900 20px system-ui, sans-serif';
  ctx.fillStyle = '#111827';
  ctx.fillText('SCAN TO CONNECT & REVIEW', bx + bw / 2, by + 120);

  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = '#4B5563';
  ctx.fillText('Share your Foogle experience or follow live menu updates', bx + bw / 2, by + 144);

  // Clean Vector QR code
  drawCleanQr(ctx, bx + bw / 2, by + 280, 210, theme.primaryColor);

  // Handle / Link Box
  const linkY = by + 420;
  drawRoundedRect(ctx, bx + 48, linkY, bw - 96, 42, 21);
  ctx.fillStyle = '#F3F4F6';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#E5E7EB';
  ctx.stroke();

  ctx.font = 'bold 14px monospace';
  ctx.fillStyle = theme.primaryColor;
  ctx.fillText(theme.id === 'google' ? 'g.page/foogle-cafe-udaipur' : 'instagram.com/fooglecafe', bx + bw / 2, linkY + 26);

  // Information footer
  const infoY = linkY + 76;
  ctx.font = 'bold 13px system-ui, sans-serif';
  ctx.fillStyle = '#111827';
  ctx.fillText('Foogle Cafe · Panchwati, Udaipur', bx + bw / 2, infoY);

  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.fillText('Opposite Big Bazaar · Rajasthan 313001', bx + bw / 2, infoY + 22);
  ctx.fillText('Open Daily: 10:00 AM – 11:00 PM', bx + bw / 2, infoY + 44);

  // Bottom Award ribbon
  const awardY = infoY + 80;
  drawRoundedRect(ctx, bx + 48, awardY, bw - 96, 42, 12);
  ctx.fillStyle = '#FEF3C7';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#FDE68A';
  ctx.stroke();

  ctx.font = 'bold 12px system-ui, sans-serif';
  ctx.fillStyle = '#B45309';
  ctx.fillText('★  UDAIPUR’S TOP RATED CAFE 2026  ★', bx + bw / 2, awardY + 26);

  // Create & configure Three.js CanvasTexture
  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.needsUpdate = true;

  return texture;
}

/**
 * Creates a clean 1200x200 woven lanyard ribbon texture for Three.js.
 */
export function createCleanBandCanvasTexture(configId: string): THREE.CanvasTexture {
  const theme = BADGE_THEMES[configId] || BADGE_THEMES.google;
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Woven silk ribbon background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 200);
  grad.addColorStop(0, theme.bandBg);
  grad.addColorStop(0.5, theme.primaryColor);
  grad.addColorStop(1, theme.bandBg);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 200);

  // Subtle border stitch lines
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 16);
  ctx.lineTo(1200, 16);
  ctx.moveTo(0, 184);
  ctx.lineTo(1200, 184);
  ctx.stroke();

  // Repeating crisp lettering
  ctx.font = 'bold 44px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = 6;
  ctx.fillText(theme.bandText, 600, 100);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.needsUpdate = true;

  return texture;
}
