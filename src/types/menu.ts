export type MenuCategoryId =
  | 'all'
  | 'pizza'
  | 'sandwiches'
  | 'pasta'
  | 'sides-snacks'
  | 'cafe-specials'
  | 'desserts';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  iconName?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  categoryId: MenuCategoryId;
  categoryLabel: string;
  description: string;
  dietary?: 'veg' | 'jain-available';
  price?: string; // Optional: only if verified
  imageSlug?: string;
  imageUrl?: string;
  tabletopCardPlacement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  tabletopMaterial?: string;
  accentColor?: string; // One of the 4 Google-inspired brand accents or forest green
}
