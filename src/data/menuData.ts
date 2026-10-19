import { MenuCategory, MenuItem } from '../types/menu';

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'all', label: 'All Items' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'sandwiches', label: 'Sandwiches' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'sides-snacks', label: 'Sides & Snacks' },
  { id: 'cafe-specials', label: 'Cafe Specials' },
  { id: 'desserts', label: 'Desserts' },
];

/**
 * Verified menu data with commercial cafe photography, tabletop material specifications,
 * and FOOGLE brand card placement.
 */
export const MENU_ITEMS: MenuItem[] = [
  // Pizza
  {
    id: 'pizza-margherita',
    name: 'Margherita Pizza',
    categoryId: 'pizza',
    categoryLabel: 'Pizza',
    description: 'Classic crisp crust topped with vibrant tomato sauce, melted mozzarella, and fresh basil leaves.',
    imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Warm Italian travertine stone slab with subtle natural veining',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#EA4335', // Red
  },
  {
    id: 'pizza-paneer-tikka',
    name: 'Paneer Tikka Pizza',
    categoryId: 'pizza',
    categoryLabel: 'Pizza',
    description: 'Marinated spiced paneer cubes, crisp capsicum, and onions baked with rich melted cheese.',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Rustic reclaimed dark oak wood table with warm natural grain',
    tabletopCardPlacement: 'bottom-left',
    accentColor: '#FBBC05', // Yellow
  },
  {
    id: 'pizza-exotic',
    name: 'Exotic Pizza',
    categoryId: 'pizza',
    categoryLabel: 'Pizza',
    description: 'Loaded with a vibrant medley of colourful bell peppers, black olives, sweet corn, and herbs.',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Textured matte beige ceramic tabletop with linen napkin corner',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#34A853', // Green
  },
  {
    id: 'pizza-foogle-special',
    name: 'Foogle Special Pizza',
    categoryId: 'pizza',
    categoryLabel: 'Pizza',
    description: 'Chef-crafted signature crust featuring house specialty toppings and a double blend of melted cheese.',
    imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Polished charcoal slate table with warm rim light reflections',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#4285F4', // Blue
  },
  {
    id: 'pizza-jain-special',
    name: 'Jain Special Pizza',
    categoryId: 'pizza',
    categoryLabel: 'Pizza',
    description: 'Specially prepared without root vegetables, using fresh herbs, tomatoes, bell peppers, and cheese.',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Clean light travertine table with fresh herb sprig nearby',
    tabletopCardPlacement: 'bottom-left',
    accentColor: '#34A853', // Green
  },

  // Sandwiches
  {
    id: 'sandwich-veg',
    name: 'Veg Sandwich',
    categoryId: 'sandwiches',
    categoryLabel: 'Sandwich',
    description: 'Freshly sliced garden cucumbers, ripe tomatoes, and house seasoning layered in soft cafe bread.',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Light honey oak cafe tabletop with soft linen texture',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#34A853', // Green
  },
  {
    id: 'sandwich-grilled',
    name: 'Grilled Sandwich',
    categoryId: 'sandwiches',
    categoryLabel: 'Sandwich',
    description: 'Golden toasted bread stuffed with seasoned vegetable filling and melted cheese, served crisp and warm.',
    imageUrl: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Rustic dark slate board on warm wooden table',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#FBBC05', // Yellow
  },

  // Pasta
  {
    id: 'pasta-arrabbiata',
    name: 'Arrabbiata Pasta',
    categoryId: 'pasta',
    categoryLabel: 'Pasta',
    description: 'Penne tossed in a fiery, garlic-infused San Marzano tomato sauce with chilli flakes and Italian herbs.',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281292?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Warm terracotta stone tabletop with rustic charm',
    tabletopCardPlacement: 'bottom-left',
    accentColor: '#EA4335', // Red
  },
  {
    id: 'pasta-alfredo',
    name: 'Alfredo Pasta',
    categoryId: 'pasta',
    categoryLabel: 'Pasta',
    description: 'Creamy, velvety white sauce simmered with butter, herbs, and finely grated cheese coating tender pasta.',
    imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Dark walnut dining table with soft depth',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#FBBC05', // Yellow
  },
  {
    id: 'pasta-mix-sauce',
    name: 'Mix Sauce Pasta',
    categoryId: 'pasta',
    categoryLabel: 'Pasta',
    description: 'The best of both worlds — a rich pink blend of zesty red marinara and silky creamy white sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Cream travertine tabletop with warm natural light',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#4285F4', // Blue
  },

  // Sides & Snacks
  {
    id: 'sides-garlic-bread',
    name: 'Garlic Bread',
    categoryId: 'sides-snacks',
    categoryLabel: 'Sides & Snacks',
    description: 'Artisanal baguette slices brushed generously with fragrant garlic butter and toasted to golden perfection.',
    imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Rustic olive wood platter on dark cafe table',
    tabletopCardPlacement: 'bottom-left',
    accentColor: '#FBBC05', // Yellow
  },
  {
    id: 'sides-french-fries',
    name: 'French Fries',
    categoryId: 'sides-snacks',
    categoryLabel: 'Sides & Snacks',
    description: 'Classic golden potato batons fried until crisp on the outside and tender inside, lightly salted.',
    imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Industrial matte black zinc cafe table with dip ramekin',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#FBBC05', // Yellow
  },
  {
    id: 'sides-nachos',
    name: 'Nachos',
    categoryId: 'sides-snacks',
    categoryLabel: 'Sides & Snacks',
    description: 'Crunchy corn tortilla chips served with warm melted cheese drizzle and house tomato salsa.',
    imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Rustic dark slate platter on travertine cafe table',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#EA4335', // Red
  },

  // Cafe Specials
  {
    id: 'special-maggi',
    name: 'Maggi',
    categoryId: 'cafe-specials',
    categoryLabel: 'Cafe Special',
    description: 'Classic spiced cafe noodles prepared hot and piping with aromatic herbs and mild masala blend.',
    imageUrl: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Warm cafe wooden table with steaming cup of chai in background',
    tabletopCardPlacement: 'bottom-left',
    accentColor: '#FBBC05', // Yellow
  },
  {
    id: 'special-misal-pav',
    name: 'Misal Pav',
    categoryId: 'cafe-specials',
    categoryLabel: 'Cafe Special',
    description: 'Spicy sprouted lentil curry topped with crunchy farsan and diced onions, served with soft buttered pav.',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Handcrafted ceramic serving tray on stone table',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#EA4335', // Red
  },
  {
    id: 'special-butter-garlic-mushroom',
    name: 'Butter Garlic Mushroom',
    categoryId: 'cafe-specials',
    categoryLabel: 'Cafe Special',
    description: 'Fresh button mushrooms sautéed in rich garlic butter with freshly cracked black pepper and parsley.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Rustic cast-iron pan on dark wood trivet',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#34A853', // Green
  },
  {
    id: 'special-hummus-pita',
    name: 'Hummus with Pita',
    categoryId: 'cafe-specials',
    categoryLabel: 'Cafe Special',
    description: 'Smooth, creamy chickpea and tahini dip drizzled with olive oil, accompanied by warm pita bread wedges.',
    imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Mediterranean stone tabletop with warm natural daylight',
    tabletopCardPlacement: 'bottom-left',
    accentColor: '#4285F4', // Blue
  },

  // Desserts
  {
    id: 'dessert-waffles',
    name: 'Waffles',
    categoryId: 'desserts',
    categoryLabel: 'Dessert',
    description: 'Freshly baked Belgian-style waffles with crisp golden pockets, served with rich chocolate or maple drizzle.',
    imageUrl: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Sunlit marble cafe table with powdered sugar dusting',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#FBBC05', // Yellow
  },
  {
    id: 'dessert-sizzling-brownie',
    name: 'Sizzling Brownie',
    categoryId: 'desserts',
    categoryLabel: 'Dessert',
    description: 'Warm fudge brownie served on a piping hot iron sizzler plate topped with cold vanilla scoop and chocolate sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Rustic wooden trivet holding cast-iron sizzler on dark cafe table',
    tabletopCardPlacement: 'bottom-left',
    accentColor: '#EA4335', // Red
  },
  {
    id: 'dessert-ice-cream-tacos',
    name: 'Ice Cream Tacos',
    categoryId: 'desserts',
    categoryLabel: 'Dessert',
    description: 'Crisp waffle taco shells filled with scoops of premium ice cream, sprinkled with crunchy toppings.',
    imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&auto=format&fit=crop&q=80',
    tabletopMaterial: 'Contemporary bright cafe surface with colorful napkin',
    tabletopCardPlacement: 'bottom-right',
    accentColor: '#4285F4', // Blue
  },
];
