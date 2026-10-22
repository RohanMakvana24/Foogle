import React, { useState } from 'react';
import ThreeDParallaxUnfurlingGallery from '@/components/ui/3d-parallax-unfurling-gallery';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { GalleryLightbox } from './GalleryLightbox';
import { GALLERY_ITEMS } from '../../data/galleryData';
import { GalleryItem } from '../../types/gallery';
import { Sparkles, Camera, MapPin, MousePointerClick, Utensils } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Extract all high-res photography URLs from verified menu items
  const galleryImageUrls = GALLERY_ITEMS.map((item) => item.imageUrl || '');

  const handleImageClick = (src: string, index: number) => {
    const matched = GALLERY_ITEMS.find((item) => item.imageUrl === src) || GALLERY_ITEMS[index % GALLERY_ITEMS.length];
    if (matched) {
      setSelectedItem(matched);
    } else {
      setSelectedItem({
        id: `gallery-item-${index}`,
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

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-main-heading"
      className="relative scroll-mt-20 transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-page)',
      }}
    >
      {/* Editorial Section Intro */}
      <div className="pt-16 pb-10 sm:pt-20 sm:pb-12">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <SectionHeading
                eyebrow="GENUINE FOOGLE MENU &amp; MOMENTS"
                title="Good Food, Good Moments"
                description="Explore real culinary creations straight from Foogle's kitchen in Panchwati, Udaipur — authentic woodfired pizzas, loaded pastas, crispy snacks, decadent waffles, and specialty shakes in an unfurling 3D parallax showcase."
                titleLevel="h2"
              />
            </div>

            {/* Interactive Feature Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                <Utensils className="w-3.5 h-3.5 text-emerald-500" />
                Real Menu Dishes
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                3D Parallax Unfurling
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-400">
                <MousePointerClick className="w-3.5 h-3.5" />
                Scroll Down To Unfurl
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* 3D Parallax Unfurling Gallery (Window scroll linked) */}
      <div className="w-full relative">
        <ThreeDParallaxUnfurlingGallery
          images={galleryImageUrls}
          useWindowScroll={true}
          heightClass="h-[380vh] sm:h-[440vh] md:h-[500vh]"
          onImageClick={handleImageClick}
        />
      </div>

      {/* Verified Dishes Showcase Info Card */}
      <div className="py-8">
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
