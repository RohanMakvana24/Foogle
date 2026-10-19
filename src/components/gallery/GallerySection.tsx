import React, { useState } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { GalleryVisual } from './GalleryVisual';
import { GalleryLightbox } from './GalleryLightbox';
import { GALLERY_ITEMS } from '../../data/galleryData';
import { GalleryItem } from '../../types/gallery';
import { Maximize2, Info } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-main-heading"
      className="py-16 sm:py-24 border-t scroll-mt-20 transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-page)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <Container>
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="MOMENTS &amp; FLAVOURS"
            title="Good Food, Good Moments"
            description="A little visual taste of the Foogle experience."
            titleLevel="h2"
          />
        </div>

        {/* Editorial CSS Grid: 2 columns on mobile, 4 columns / bento layout on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[180px] sm:auto-rows-[220px]">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
              onClick={() => setSelectedItem(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedItem(item);
                }
              }}
              className={`
                group relative overflow-hidden rounded-2xl border cursor-pointer select-none
                transition-all duration-300 hover:shadow-lg focus-visible:outline-2
                ${item.spanClass}
              `}
              style={{
                borderColor: 'var(--color-card-border)',
                backgroundColor: 'var(--color-bg-surface)',
              }}
            >
              {/* Visual Culinary Image Frame */}
              <GalleryVisual item={item} className="transition-transform duration-500 group-hover:scale-105" />

              {/* Restrained Hover Scrim & Quick Action Indicator */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 pointer-events-none">
                <div className="flex justify-end">
                  <div className="p-1.5 rounded-full bg-black/60 text-white/90 backdrop-blur-sm">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-white drop-shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-white/80">
                    {item.category}
                  </span>
                  <span className="text-xs sm:text-sm font-bold block truncate">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Photoshoot Specification Banner */}
        <div
          className="mt-10 p-4 sm:p-5 rounded-xl border flex items-center gap-3 text-xs"
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <Info className="w-4 h-4 shrink-0" style={{ color: 'var(--color-brand-primary)' }} />
          <span>
            Curated commercial food photoshoot collection showcasing cafe moments, handcrafted woodfired pizzas,
            artisan brews, and desserts paired with signature tabletop FOOGLE branding in Panchwati, Udaipur.
          </span>
        </div>
      </Container>

      {/* Lightbox Modal */}
      <GalleryLightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};
