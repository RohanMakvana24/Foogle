/**
 * Business information and contact configuration for Foogle Cafe & Restaurant.
 * Compiled from verified public business & restaurant listings (Panchwati, Udaipur).
 */

export interface DayHours {
  day: string;
  hours: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  category: string;
  location: {
    area: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    fullStreetAddress: string;
    shortAddress: string;
    landmarks: string;
    googleMapsSearchUrl: string;
  };
  contact: {
    phone: string;
    phoneCallHref: string;
    email: string;
    emailMailtoHref: string;
    instagram: string;
    instagramUrl: string;
    facebook: string;
    facebookUrl: string;
    zomatoUrl: string;
    tripadvisorUrl: string;
    restaurantGuruUrl: string;
  };
  dining: {
    estimatedSpend: string;
    dietary: string;
    options: string;
  };
  operatingHours: {
    statusNote: string;
    primaryHours: string;
    schedule: DayHours[];
    sources: { source: string; hours: string }[];
  };
}

export const FOOGLE_BUSINESS_INFO: BusinessInfo = {
  name: 'Foogle',
  tagline: 'Good food. Good mood.',
  category: 'Café · Fast Food, Street Food, Desserts & Beverages',
  location: {
    area: 'Panchwati',
    city: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    pincode: '313004',
    fullStreetAddress:
      'G1, Tirupati Balaji Apartment, behind Lord Shiv Temple, opposite RK Mall, next to Gold’s Gym, Panchwati, Udaipur, Rajasthan 313004, India',
    shortAddress: 'G1, Tirupati Balaji Apartment, Panchwati, Udaipur, Rajasthan 313004',
    landmarks: 'Behind Lord Shiv Temple, opposite RK Mall, next to Gold’s Gym',
    googleMapsSearchUrl:
      'https://www.google.com/maps/search/?api=1&query=Foogle+Cafe+Panchwati+Udaipur',
  },
  contact: {
    phone: '+91 82792 11527',
    phoneCallHref: 'tel:+918279211527',
    email: 'fooglefoods@gmail.com',
    emailMailtoHref: 'mailto:fooglefoods@gmail.com',
    instagram: 'foogle_foods',
    instagramUrl: 'https://www.instagram.com/foogle_foods/',
    facebook: 'FoogleFoods',
    facebookUrl: 'https://www.facebook.com/FoogleFoods/',
    zomatoUrl: 'https://www.zomato.com/udaipur/foogle-panchwati',
    tripadvisorUrl:
      'https://www.tripadvisor.co.uk/Restaurant_Review-g297672-d15100258-Reviews-Foogle-Udaipur_Udaipur_District_Rajasthan.html',
    restaurantGuruUrl: 'https://restaurant-guru.in/Foogle-Udaipur',
  },
  dining: {
    estimatedSpend: '₹200–₹400 per person · ~₹400 for two',
    dietary: 'Vegetarian / Vegetarian-Friendly',
    options: 'Indoor Seating · Takeaway · Delivery',
  },
  operatingHours: {
    statusNote:
      'Public directories show differing schedules (10:30 AM – 1:00 AM / 10:00 AM – 11:00 PM). Please call or message the café to confirm before visiting.',
    primaryHours: '10:30 AM – 1:00 AM (Daily)',
    schedule: [
      { day: 'Monday', hours: '10:30 AM – 1:00 AM' },
      { day: 'Tuesday', hours: '10:30 AM – 1:00 AM' },
      { day: 'Wednesday', hours: '10:30 AM – 1:00 AM' },
      { day: 'Thursday', hours: '10:30 AM – 1:00 AM' },
      { day: 'Friday', hours: '10:30 AM – 1:00 AM' },
      { day: 'Saturday', hours: '10:30 AM – 1:00 AM' },
      { day: 'Sunday', hours: '10:30 AM – 1:00 AM' },
    ],
    sources: [
      { source: 'Restaurant Guru / Wheree', hours: '10:30 AM – 1:00 AM (Daily)' },
      { source: 'Google Business Listing', hours: '10:00 AM – 11:00 PM (Daily)' },
      { source: 'Magicpin', hours: '12:00 PM – 12:00 AM' },
      { source: 'Zomato', hours: '10:00 AM – 12:00 AM (with night block)' },
    ],
  },
};
