export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Pizza' | 'Beverages' | 'Desserts' | 'Pasta' | 'Snacks' | 'Cafe Moments';
  aspectRatio: '16:9' | '4:3' | '1:1' | '3:4';
  spanClass: string; // Grid span for desktop editorial rhythm
  accentColor: string;
  alt: string;
  imageUrl?: string;
  tabletopCardPlacement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  tabletopMaterial?: string;
}
