import React, { useState } from 'react';
import ThreeDParallaxUnfurlingGallery from '@/components/ui/3d-parallax-unfurling-gallery';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { GalleryLightbox } from './GalleryLightbox';
import { GALLERY_ITEMS } from '../../data/galleryData';
import { GalleryItem } from '../../types/gallery';
import { Sparkles, Camera, MapPin, Eye, MousePointerClick } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // High-resolution curated cafe food & ambiance photos
  const galleryImageUrls = [
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop&q=80', // Artisanal Woodfired Pizza
    'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',  // Specialty Cold Foam Latte
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',  // Sizzling Hot Brownie
    'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&auto=format&fit=crop&q=80',  // Pan-tossed Penne Pasta
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',  // Cafe Ambience & Lighting
    'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80',  // Espresso Extraction
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',  // Cheesy Garlic Bread
    'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&auto=format&fit=crop&q=80',  // Chilled Berry Frappe
    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=80',  // Fluffy Stack Pancakes
    'https://images.unsplash.com/photo-1550614000-4b95d4ed798a?auto=format&fit=crop&w=600&q=80',   // Cafe Pastry
    'https://cdn.21st.dev/assets/mirror/a9/a9c2900d44fe6288b344f447cb12a05f7e64c439479a8ccb977d3b20eb371156.jpg',
    'https://cdn.21st.dev/assets/mirror/29/29cf6ad39eb198c05b8d915fca0becfd3d270d510d32eaec1b886c426c681c67.jpg',
    'https://cdn.21st.dev/assets/mirror/61/6154958e9df110914005256ff2319d43a2c2e0fc8bb54e9f8bce7b91fdce5df1.jpg',
    'https://cdn.21st.dev/assets/mirror/6d/6db92aff3c02cce69e2c672a6dd4e99cbf5c55d68fbf08c460527e6c7c5b64ba.jpg',
    'https://cdn.21st.dev/assets/mirror/42/42ad2d0680dba697d578434e5af5620c7ab1c7c55bc36cec3b55eec8b7a79cbf.jpg',
    'https://cdn.21st.dev/assets/mirror/cd/cd3dc09b1bbed97cfc879e2c5e62fdbc68dc4070b6105e476410d70e31d1e459.jpg',
  ];

  const handleImageClick = (src: string, index: number) => {
    // If matching item in GALLERY_ITEMS, open modal with its details, else create a modal view
    const matched = GALLERY_ITEMS.find((item) => item.imageUrl === src);
    if (matched) {
      setSelectedItem(matched);
    } else {
      setSelectedItem({
        id: `gallery-3d-${index}`,
        title: 'Foogle Cafe Moment',
        subtitle: 'Artisanal cafe creation crafted fresh daily in Udaipur',
        category: 'Cafe Moments',
        aspectRatio: '16:9',
        spanClass: 'col-span-1',
        accentColor: '#D97706',
        imageUrl: src,
        tabletopMaterial: 'Rustic tabletop setting in Panchwati, Udaipur',
        alt: 'Foogle Cafe culinary moment and handcrafted specialty',
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
                eyebrow="MOMENTS &amp; FLAVOURS"
                title="Good Food, Good Moments"
                description="Experience the 3D parallax unfolding perspective of Foogle Cafe — woodfired crusts, velvety espresso micro-foam, and relaxed cafe vibes in Udaipur."
                titleLevel="h2"
              />
            </div>

            {/* Interactive Feature Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                3D Parallax Unfurling
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-400">
                <MousePointerClick className="w-3.5 h-3.5" />
                Scroll Down To Explore
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
          heightClass="h-[360vh] sm:h-[420vh] md:h-[480vh]"
          onImageClick={handleImageClick}
        />
      </div>

      {/* Photoshoot Spec Banner */}
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
                  Curated Cafe Photoshoot Collection
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Handcrafted woodfired pizzas, artisan roasts, layered cold brews, and desserts paired with signature Foogle cafe aesthetics.
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
