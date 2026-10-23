import React, { useState } from 'react';
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from '@/components/ui/animated-gallery';
import { Container } from '../common/Container';
import { GalleryLightbox } from './GalleryLightbox';
import { GALLERY_ITEMS } from '../../data/galleryData';
import { GalleryItem } from '../../types/gallery';
import { buildSrcSet, buildAvifSrcSet } from '../../lib/imageSrcSet';
import { Sparkles, Camera, MapPin, Utensils, Maximize2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Clean curated Foogle food photography
const IMAGES_1 = [
  '/images/photos/woodfired-pizza.webp',
  '/images/photos/garlic-bread.webp',
  '/images/photos/cold-coffee.webp',
  '/images/photos/aloo-tikki-burger.webp',
];

const IMAGES_2 = [
  '/images/photos/paneer-tabasco-pizza.webp',
  '/images/photos/pink-sauce-pasta.webp',
  '/images/photos/sizzling-brownie.webp',
  '/images/photos/nachos.webp',
];

const IMAGES_3 = [
  '/images/photos/nutella-waffle.webp',
  '/images/photos/white-penne-pasta.webp',
  '/images/photos/blue-lagoon-mojito.webp',
  '/images/photos/pav-bhaji.webp',
];

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const handleImageClick = (src: string) => {
    const matched = GALLERY_ITEMS.find((item) => item.imageUrl === src);
    if (matched) {
      setSelectedItem(matched);
    } else {
      setSelectedItem({
        id: 'gallery-custom',
        title: 'Foogle Cafe Creation',
        subtitle: 'Prepared fresh with premium ingredients at Panchwati, Udaipur',
        category: 'Pizza',
        aspectRatio: '16:9',
        spanClass: 'col-span-1',
        accentColor: '#D97706',
        imageUrl: src,
        tabletopMaterial: 'Rustic cafe tabletop setting',
        alt: 'Foogle Cafe authentic menu specialty',
      });
    }
  };

  const renderCard = (src: string, index: number, alt: string = 'Foogle Specialty') => (
    <div
      key={`${src}-${index}`}
      onClick={() => handleImageClick(src)}
      className="group relative w-full aspect-[4/3] sm:aspect-[16/10] cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10 transition-all duration-300 hover:scale-[1.03] shadow-md hover:shadow-2xl"
      style={{
        backgroundColor: 'var(--color-bg-surface)',
      }}
    >
      <picture className="contents">
        <source
          type="image/avif"
          srcSet={buildAvifSrcSet(src)}
          sizes="(max-width: 640px) 33vw, 420px"
        />
        <img
          src={src}
          srcSet={buildSrcSet(src)}
          sizes="(max-width: 640px) 33vw, 420px"
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </picture>

      {/* Hover reveal overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-2.5 sm:p-3 pointer-events-none">
        <span className="text-[10px] sm:text-xs font-semibold text-white drop-shadow-sm truncate">
          View Detail
        </span>
        <div className="p-1 sm:p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white">
          <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-main-heading"
      className="relative scroll-mt-20 transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-page)',
      }}
    >
      {/* Editorial Header Section */}
      <div className="pt-16 pb-4 sm:pt-20 sm:pb-6 relative z-20">
        <ContainerStagger className="text-center max-w-3xl mx-auto px-4 flex flex-col items-center">
          <ContainerAnimated>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 mb-3">
              <Utensils className="w-3.5 h-3.5 text-amber-500" />
              <span>GENUINE FOOGLE MENU &amp; MOMENTS</span>
            </div>
          </ContainerAnimated>

          <ContainerAnimated>
            <h2
              id="gallery-main-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              Good Food,{' '}
              <span className="font-serif italic text-amber-600 dark:text-amber-400">
                Good Moments
              </span>
            </h2>
          </ContainerAnimated>

          <ContainerAnimated className="my-2.5 sm:my-3">
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-xl">
              Authentic woodfired pizzas, loaded pastas, decadent waffles, and artisanal coolers crafted fresh daily in Panchwati, Udaipur.
            </p>
          </ContainerAnimated>

          <ContainerAnimated className="flex items-center justify-center gap-3">
            <a href="#menu">
              <Button className="gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-md">
                Explore Full Menu <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium px-3 py-1.5 rounded-full border border-black/5 dark:border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Scroll down to tilt 3D gallery
            </span>
          </ContainerAnimated>
        </ContainerStagger>
      </div>

      {/* 
        3D ContainerScroll (h-[260vh]):
        Starts as a 3D floor plane in perspective, tilts upright as user scrolls into view!
      */}
      <ContainerScroll className="relative h-[250vh] sm:h-[270vh]">
        <ContainerSticky className="h-[calc(100vh-72px)] top-[72px] flex items-center justify-center px-3 sm:px-6 md:px-8">
          <div className="w-full max-w-6xl mx-auto py-2">
            <GalleryContainer className="w-full max-h-[82vh]">
              {/* Column 1 */}
              <GalleryCol yRange={['-12%', '4%']} className="-mt-3">
                {IMAGES_1.map((src, idx) => renderCard(src, idx, 'Foogle Specialty'))}
              </GalleryCol>

              {/* Column 2 (Offset center with opposing parallax like demo) */}
              <GalleryCol className="mt-[-28%] sm:mt-[-35%]" yRange={['16%', '0%']}>
                {IMAGES_2.map((src, idx) => renderCard(src, idx, 'Foogle Specialty'))}
              </GalleryCol>

              {/* Column 3 */}
              <GalleryCol yRange={['-12%', '4%']} className="-mt-3">
                {IMAGES_3.map((src, idx) => renderCard(src, idx, 'Foogle Specialty'))}
              </GalleryCol>
            </GalleryContainer>
          </div>
        </ContainerSticky>
      </ContainerScroll>

      {/* Verified Dishes Showcase Info Card */}
      <div className="py-8 relative z-10">
        <Container>
          <div
            className="p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-xs"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                  100% Authentic Foogle Menu Selection
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Featuring Woodfired Pizzas, Corn &amp; Cheese Garlic Bread, Pink &amp; White Sauce Pastas, Aloo Tikki Burgers, Nutella Waffles, Sizzling Brownies &amp; Cold Brews. Click any dish to view recipe details!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-medium text-amber-700 dark:text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
              <MapPin className="w-3.5 h-3.5" />
              <span>Panchwati, Udaipur</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Enlarged Photo Lightbox Modal */}
      <GalleryLightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

export default GallerySection;
