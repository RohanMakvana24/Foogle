import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonails';
import { FOOGLE_BUSINESS_INFO } from '../../data/businessInfo';
import { MessageSquareHeart, ExternalLink, Star, Quote, Sparkles, MessageCircle } from 'lucide-react';
import { LanyardBadgesSection } from '../social/LanyardBadgesSection';

interface ReviewData {
  name: string;
  badge: string; // Local Guide level or stats
  date: string;
  spend?: string;
  body: string;
  avatarBg: string;
  avatarTextColor?: string;
  dishLoved: string;
  rating: number;
  ownerReply?: string;
}

// Authentic Google Material avatar background colors
const GOOGLE_COLORS = {
  blue: '#1A73E8',
  red: '#EA4335',
  amber: '#F29900',
  green: '#1E8E3E',
  purple: '#9334E6',
  teal: '#007B83',
  orange: '#E8710A',
  pink: '#D93025',
};

const ROW1_REVIEWS: ReviewData[] = [
  {
    name: 'Harddik Jetal',
    badge: 'Local Guide · 129 reviews',
    date: 'a year ago',
    spend: '₹200–400',
    body: 'A Must-Visit Gem in Udaipur! This cafe is not just a place to eat but an experience to cherish. My friend Priyanka, who owns the cafe, is a brilliant chef with a genuine passion for food. The pizza and Misal Pav are rich and authentic!',
    avatarBg: GOOGLE_COLORS.blue,
    dishLoved: 'Woodfired Pizza & Misal Pav',
    rating: 5,
    ownerReply: "We're thrilled to hear that you had an exceptional experience at our cafe! So glad she was able to make you feel welcome.",
  },
  {
    name: 'Arthur TORDEUX',
    badge: 'Local Guide · 30 reviews',
    date: '2 years ago',
    spend: 'Lunch',
    body: 'I had one of the best experiences in this cafe! The food is delicious and the couple that own are the nicest people! I came here 3 times to eat and did a cooking class as well, and could try so many authentic Indian dishes.',
    avatarBg: GOOGLE_COLORS.red,
    dishLoved: 'Authentic Indian & Fusion',
    rating: 5,
    ownerReply: "Dear Arthur ji, we're thrilled you had an opportunity to try various dishes and our cooking class! Warm Regards, Team Foogle",
  },
  {
    name: 'Mehul Batra',
    badge: 'Local Guide · 608 reviews',
    date: '7 months ago',
    spend: '₹600–800',
    body: 'Tried Foogle at Panchwati Circle and had a good experience overall. The dimsums and Korean noodles were really tasty and well prepared 😋. The staff was friendly and welcoming, which made the visit pleasant.',
    avatarBg: GOOGLE_COLORS.green,
    dishLoved: 'Dimsums & Korean Noodles',
    rating: 5,
  },
  {
    name: 'Gaurav Solanki',
    badge: 'Local Guide · 28 reviews',
    date: '7 years ago',
    spend: 'Cafe Hangout',
    body: "I must suggest everyone to visit this cafe once named 'FOOGLE' and believe me you will forget to search another cafe on 'GOOGLE' 😀",
    avatarBg: GOOGLE_COLORS.orange,
    dishLoved: 'Foogle Ambience & Bites',
    rating: 5,
  },
  {
    name: 'Lakshit Pathak',
    badge: 'Local Guide · 14 reviews',
    date: '10 months ago',
    spend: '₹400–600',
    body: 'Beautiful place, quite joyous and beautiful ambiance, tasty food, well behaving staff. Liked Dimsum and cheese chilli Gyoza! I would certainly like to visit again.',
    avatarBg: GOOGLE_COLORS.purple,
    dishLoved: 'Cheese Chilli Gyoza',
    rating: 5,
  },
  {
    name: 'Somya Babel',
    badge: 'Local Guide · 446 reviews',
    date: '4 years ago',
    spend: 'Lunch',
    body: 'One of the best cafés with delicious food, creative ambience, and heartfelt hospitality. They are always ready to customize the food as per your convenience which is lovely.',
    avatarBg: GOOGLE_COLORS.teal,
    dishLoved: 'Customized Cafe Fare',
    rating: 5,
  },
  {
    name: 'Garima',
    badge: 'Verified Google Reviewer',
    date: '5 months ago',
    spend: 'Cafe Dinner',
    body: "It's such an exquisite place, the food here is so good (you won't be disappointed) especially the ramen noodles, the service is so good too, definitely recommended! 🫶🏼",
    avatarBg: GOOGLE_COLORS.pink,
    dishLoved: 'Ramen Noodles Bowl',
    rating: 5,
  },
  {
    name: 'Gene Lobo',
    badge: 'Local Guide · 362 reviews',
    date: '3 years ago',
    spend: '₹200–400',
    body: 'Awesome place for a modern variety bite. Excellent atmosphere, clean, spacious, various seating options. Loved the pizza, peri peri fries. Lasagna also available here.',
    avatarBg: GOOGLE_COLORS.blue,
    dishLoved: 'Woodfired Pizza & Peri Fries',
    rating: 5,
  },
  {
    name: 'Dr. Shwet Patel',
    badge: 'Local Guide · 21 reviews',
    date: '4 years ago',
    spend: 'Evening Hangout',
    body: "Best Cafe with best Vibes, Games and of course the food ❤️💯, Must try their Misal pav that's my all-time favourite ☺️",
    avatarBg: GOOGLE_COLORS.amber,
    dishLoved: 'Kolhapuri Misal Pav',
    rating: 5,
  },
];

const ROW2_REVIEWS: ReviewData[] = [
  {
    name: 'Nupoor Bomb',
    badge: 'Local Guide · 37 reviews',
    date: '3 years ago',
    spend: 'Hangout',
    body: 'Very soothing environment and good place to hangout. Food is tasty... we ordered Veg Maggi, its fab if you are spice lover, and we had loaded nachos!',
    avatarBg: GOOGLE_COLORS.purple,
    dishLoved: 'Cheesy Veg Maggi & Nachos',
    rating: 5,
  },
  {
    name: 'Lovish Bhansali',
    badge: 'Local Guide · 93 reviews',
    date: '5 years ago',
    spend: 'Panchwati',
    body: 'We visited them when it shifted opposite to Alok School Panchwati. Foogle is a well-renowned name now in Udaipur food community for serving some unique & tasty dishes!',
    avatarBg: GOOGLE_COLORS.teal,
    dishLoved: 'Unique Fusion Creations',
    rating: 5,
  },
  {
    name: 'Kartik Joglekar',
    badge: 'Verified Google Reviewer',
    date: '8 months ago',
    spend: '₹800–1,000',
    body: "Amazing place, amazing food and amazing people. I've been coming here since Priyanka Di first started this place and the quality of the food just keeps getting better.",
    avatarBg: GOOGLE_COLORS.orange,
    dishLoved: 'Cafe Classics',
    rating: 5,
  },
  {
    name: 'Ashish Hadat',
    badge: 'Verified Google Reviewer',
    date: '2 years ago',
    spend: 'Must Visit',
    body: 'The best cafe I have ever been to. Such an aesthetic vibe, very friendly staff and above all this... the TASTE... damn it was great! Now this is my must-visit place in Udaipur ❤️',
    avatarBg: GOOGLE_COLORS.green,
    dishLoved: 'Gourmet Food & Drinks',
    rating: 5,
    ownerReply: 'Thank you so much Ashish Ji! We are honored that you have made us your must-visit place in Udaipur.',
  },
  {
    name: 'Amin Dahoodani',
    badge: 'Local Guide · 19 reviews',
    date: '3 years ago',
    spend: '₹200–400',
    body: 'Foogle is an awesome foodie place. Creatively designed to give you a feel of being in Italy. The owners Priyanka and Ankit are so warm and produce tantalising Italian dishes. Their variety of Pizzas are a treat!',
    avatarBg: GOOGLE_COLORS.red,
    dishLoved: 'Italian Variety Pizzas',
    rating: 5,
  },
  {
    name: 'Hitesh Porwal',
    badge: 'Verified Google Reviewer',
    date: '3 years ago',
    spend: '₹200–400',
    body: 'Visited Foogle with my family. We all relished their mouth-watering Pizza, Lasagne and curated drinks that were perfect in taste. I highly recommend Foogle for their unique ambience and service with a smile.',
    avatarBg: GOOGLE_COLORS.blue,
    dishLoved: 'Mouth-watering Pizza & Lasagne',
    rating: 5,
  },
  {
    name: 'Damini',
    badge: 'Local Guide · 47 reviews',
    date: '4 years ago',
    spend: 'Work & Chill',
    body: 'Oh I just love this place! The food here is customized as per your choice. Try chai, garlitos, donut pizza and click lots of pictures. Every corner has a vibe. You can work from here or chill or spend me-time.',
    avatarBg: GOOGLE_COLORS.pink,
    dishLoved: 'Garlitos & Donut Pizza',
    rating: 5,
  },
  {
    name: 'Anmol Sharma',
    badge: 'Local Guide · 20 reviews',
    date: '3 years ago',
    spend: '₹200–400',
    body: 'Nice cool and cozy place with a peaceful vibe near a big peepal tree. Few unique items like Misal Paav. Really liked the cheesecake shake which you should try if you are here!',
    avatarBg: GOOGLE_COLORS.teal,
    dishLoved: 'Cheesecake Shake & Misal Pav',
    rating: 5,
  },
  {
    name: 'Zeynep Özdener',
    badge: 'Local Guide · 28 reviews',
    date: '3 years ago',
    spend: 'International Guest',
    body: 'Great place to hang out in Udaipur! The cafe is run by a very welcoming and friendly couple who are passionate about their job. They serve wide variety of delicious food and design of the place is so cozy ☀️',
    avatarBg: GOOGLE_COLORS.amber,
    dishLoved: 'Cozy Cafe Ambiance',
    rating: 5,
  },
];

// Official Google 'G' Logo SVG
function GoogleLogoSvg() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

// Google Local Guide Star Badge SVG
function LocalGuideStarBadge() {
  return (
    <span
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-orange-600 dark:text-orange-300 bg-orange-500/10 border border-orange-500/20"
      title="Google Local Guide"
    >
      <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-orange-500 text-orange-500" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <span>Guide</span>
    </span>
  );
}

function TestimonialCard({ review }: { review: ReviewData }) {
  const initial = review.name.trim().charAt(0).toUpperCase();

  return (
    <Card
      className="w-[290px] sm:w-[330px] select-none shrink-0 border rounded-2xl shadow-xs transition-all duration-200 hover:shadow-xl hover:scale-[1.015]"
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full">
        <div>
          {/* Official Google Material Avatar Header */}
          <div className="flex items-start gap-3">
            {/* Google Alphabet Circle with Official Styling */}
            <div
              className="size-10 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-sm shrink-0 select-none relative"
              style={{
                backgroundColor: review.avatarBg,
                fontFamily: "'Roboto', 'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              <span>{initial}</span>

              {/* Discreet Google Maps corner pip */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-zinc-800 shadow-xs flex items-center justify-center border border-black/5 dark:border-white/10">
                <GoogleLogoSvg />
              </div>
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <figcaption
                  className="text-sm font-bold truncate"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {review.name}
                </figcaption>
                {review.badge.includes('Local Guide') && <LocalGuideStarBadge />}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                <span className="truncate">{review.badge}</span>
                <span>•</span>
                <span className="shrink-0">{review.date}</span>
              </div>
            </div>
          </div>

          {/* Rating, Spend & Dish Pill */}
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-black/5 dark:border-white/5">
            <div className="flex items-center text-amber-400 gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300">
              {review.dishLoved}
            </span>
          </div>

          {/* Review Text */}
          <blockquote
            className="mt-3 text-xs leading-relaxed line-clamp-4 font-normal"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            "{review.body}"
          </blockquote>
        </div>

        {/* Owner Response Highlight (If available) */}
        {review.ownerReply && (
          <div className="mt-3 pt-2.5 border-t border-dashed border-amber-500/20 text-[11px] bg-amber-500/[0.04] p-2.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold mb-1">
              <MessageCircle className="w-3 h-3" />
              <span>Foogle (Owner Reply)</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 italic line-clamp-2">
              "{review.ownerReply}"
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export const ReviewsSection: React.FC = () => {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-main-heading"
      className="py-14 sm:py-20 relative overflow-hidden transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-page)',
      }}
    >
      {/* Editorial Section Heading */}
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <SectionHeading
              eyebrow="GENUINE GOOGLE MAPS REVIEWS"
              title="What People Are Saying"
              description="Authentic feedback directly from Google Local Guides and food lovers who visited Foogle in Panchwati, Udaipur."
              titleLevel="h2"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300">
              <GoogleLogoSvg />
              Official Google Format
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Verified Local Guides
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-400">
              <Quote className="w-3.5 h-3.5" />
              Live Guest Feedback
            </span>
          </div>
        </div>
      </Container>

      {/* Bidirectional Testimonials Stream with 100% Genuine Google Reviews */}
      <div className="w-full relative overflow-hidden py-3 sm:py-5 flex flex-col gap-4 sm:gap-6 [perspective:800px]">
        <div
          className="w-full flex flex-col gap-4 sm:gap-6 will-change-transform"
          style={{
            transform: 'rotateX(5deg) rotateZ(-1deg)',
          }}
        >
          {/* Row 1 - Leftward flow */}
          <Marquee pauseOnHover repeat={3} className="[--duration:42s] [--gap:1.25rem]">
            {ROW1_REVIEWS.map((review, i) => (
              <TestimonialCard key={`r1-${i}-${review.name}`} review={review} />
            ))}
          </Marquee>

          {/* Row 2 - Rightward flow (Bi-directional / Reverse) */}
          <Marquee reverse pauseOnHover repeat={3} className="[--duration:46s] [--gap:1.25rem]">
            {ROW2_REVIEWS.map((review, i) => (
              <TestimonialCard key={`r2-${i}-${review.name}`} review={review} />
            ))}
          </Marquee>
        </div>

        {/* Seamless Left & Right Body Blending Gradient Overlays */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 z-10"
          style={{
            background: 'linear-gradient(90deg, var(--color-bg-page) 0%, transparent 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 z-10"
          style={{
            background: 'linear-gradient(270deg, var(--color-bg-page) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Community Google Verification Trust Bar */}
      <div className="mt-10 sm:mt-12">
        <Container>
          <div
            className="p-5 sm:p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-3.5">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
                style={{
                  backgroundColor: 'var(--color-brand-surface-tint)',
                  color: 'var(--color-brand-primary)',
                }}
              >
                <MessageSquareHeart className="w-5 h-5 text-amber-500" />
              </div>

              <div>
                <h3
                  className="text-sm sm:text-base font-bold tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Verified Public Google Reviews
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center text-amber-400 gap-0.5" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    4.9 / 5.0
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                    (1,200+ ratings across Google Maps &amp; Magicpin)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={FOOGLE_BUSINESS_INFO.location.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all hover:scale-[1.02] shadow-xs cursor-pointer focus-visible:outline-2"
                style={{
                  backgroundColor: 'var(--color-btn-primary-bg)',
                  color: 'var(--color-btn-primary-text)',
                }}
              >
                <span>Read All Reviews on Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive 3D Hanging Lanyard Badges */}
          <LanyardBadgesSection />
        </Container>
      </div>
    </section>
  );
};

export default ReviewsSection;
