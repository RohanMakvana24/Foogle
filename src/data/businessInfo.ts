/**
 * Business information and contact configuration for Foogle Cafe & Restaurant.
 * All unverified fields are explicitly marked as null or pending owner confirmation
 * in accordance with anti-hallucination and zero-fake-data policies.
 */

export interface DayHours {
  day: string;
  hours: string | null; // null if unconfirmed
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
    fullStreetAddress: string | null; // Awaiting confirmation
    googleMapsSearchUrl: string;
  };
  contact: {
    phone: string | null; // Set when verified (e.g. "+91XXXXXXXXXX")
    email: string | null; // Set when verified
    instagram: string | null; // Set when verified (e.g. "fooglecafe")
    whatsapp: string | null; // Set when verified
  };
  operatingHours: {
    statusNote: string;
    schedule: DayHours[];
  };
}

export const FOOGLE_BUSINESS_INFO: BusinessInfo = {
  name: 'Foogle',
  tagline: 'Good food. Good mood.',
  category: 'Cafe & Restaurant',
  location: {
    area: 'Panchwati',
    city: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    fullStreetAddress: null, // Detailed street address pending confirmation
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Foogle+Cafe+Panchwati+Udaipur',
  },
  contact: {
    phone: null, // Pending restaurant owner verification
    email: null, // Pending restaurant owner verification
    instagram: null, // Pending restaurant owner verification
    whatsapp: null, // Pending restaurant owner verification
  },
  operatingHours: {
    statusNote: 'Daily service hours are subject to seasonal schedule confirmation by Foogle restaurant management.',
    schedule: [
      { day: 'Monday', hours: null },
      { day: 'Tuesday', hours: null },
      { day: 'Wednesday', hours: null },
      { day: 'Thursday', hours: null },
      { day: 'Friday', hours: null },
      { day: 'Saturday', hours: null },
      { day: 'Sunday', hours: null },
    ],
  },
};
