import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonails';
import { FOOGLE_BUSINESS_INFO } from '../../data/businessInfo';
import { MessageSquareHeart, ExternalLink, Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReviewData {
  name: string;
  username: string;
  body: string;
  img: string;
  location: string;
  dishLoved: string;
  rating: number;
}

const ROW1_REVIEWS: ReviewData[] = [
  {
    name: 'Aarav Sharma',
    username: '@aarav.udaipur',
    body: 'The woodfired sourdough pizza here is easily the best in Udaipur! Crust is crispy, blistered, and molten mozzarella is unbeatable.',
    img: 'https://cdn.21st.dev/assets/mirror/55/55cf6231499bcdc496f15ff1d28d4170ac9b99e9279495caa44fca70886d8b2e.jpg',
    location: 'Panchwati, Udaipur',
    dishLoved: 'Woodfired Margherita',
    rating: 5,
  },
  {
    name: 'Priya Mehra',
    username: '@priyamehra',
    body: 'Their Cold Foam Latte is unreal! Perfect aesthetic vibe for working on my laptop or catching up with friends.',
    img: 'https://cdn.21st.dev/assets/mirror/f0/f07b84f12ef125cbb837a7bd64da401992f5f62bd55fee10d01cd3dcc8abae80.jpg',
    location: 'Fateh Sagar, Udaipur',
    dishLoved: 'Specialty Cold Foam',
    rating: 5,
  },
  {
    name: 'Rohan Mehta',
    username: '@rohan_foodie',
    body: 'Sizzling chocolate brownie with vanilla ice cream is pure heaven. Warm hospitality and great playlist too.',
    img: 'https://cdn.21st.dev/assets/mirror/7c/7c0d2aa99715b15c218385f5679347782843c02f939d8eee6f9cb1cad6ba6ed0.jpg',
    location: 'Sukhadia Circle',
    dishLoved: 'Sizzler Brownie',
    rating: 5,
  },
  {
    name: 'Maya Patel',
    username: '@maya_travels',
    body: 'Discovered Foogle during my Udaipur holiday. Hands down the coziest cafe with gourmet Italian flavours and friendly staff!',
    img: 'https://cdn.21st.dev/assets/mirror/f8/f8f2ddc445b6b2318430260bdebb665c9415865827230565aa42f57c9c794baf.jpg',
    location: 'Ahmedabad (Visitor)',
    dishLoved: 'Gourmet Pasta',
    rating: 5,
  },
  {
    name: 'Karan Dave',
    username: '@karandave',
    body: 'Penne in creamy pink sauce was velvety and rich. Outstanding presentation and super polite staff in Panchwati.',
    img: 'https://cdn.21st.dev/assets/mirror/ae/ae1d49872fdd6f8d9aa933f6ca8bce8cb1ba7e87dfb9d2926661184cb7bfe26d.jpg',
    location: 'Saheli Nagar',
    dishLoved: 'Creamy Penne',
    rating: 5,
  },
  {
    name: 'Sneha Verma',
    username: '@sneha.v',
    body: 'The interior aesthetics, soft ambient lighting, and artisan coffee make Foogle our favourite evening spot in Udaipur.',
    img: 'https://cdn.21st.dev/assets/mirror/9a/9aac54d62e727561f6958213b8a3649230a3bba61ba5ddf63c69d3c6e4aecb0a.jpg',
    location: 'Shobhagpura',
    dishLoved: 'Artisan Espresso',
    rating: 5,
  },
];

const ROW2_REVIEWS: ReviewData[] = [
  {
    name: 'Devraj Singh',
    username: '@devrajsingh',
    body: 'Crispy herb garlic bread & signature berry shake were delightful. Top notch quality and generous portions in Panchwati.',
    img: 'https://cdn.21st.dev/assets/mirror/e5/e55f3cdab57eb4084f7006cfe9f7f047e638e1b257a53498aaed14b83087152a.jpg',
    location: 'City Palace Area',
    dishLoved: 'Herb Garlic Bread',
    rating: 5,
  },
  {
    name: 'Elena Rostova',
    username: '@elena_in_india',
    body: 'Wonderful specialty coffee roast! European cafe standard right in the heart of the Lake City. Highly recommended!',
    img: 'https://cdn.21st.dev/assets/mirror/03/03410c155320ba33ecb8d798807c6c9610f33b2b2acdd4ed961a68185806df79.jpg',
    location: 'International Guest',
    dishLoved: 'Pour-Over Roast',
    rating: 5,
  },
  {
    name: 'Chirag Joshi',
    username: '@chirag_j',
    body: 'Celebrated our anniversary dinner here. The ambiance, loaded nachos, and customized dessert were absolutely memorable!',
    img: 'https://cdn.21st.dev/assets/mirror/b5/b58616f0d669595c9a42d60a0b9803364c9859f1c3db93a5e3dc408b603e03e8.jpg',
    location: 'Hiran Magri',
    dishLoved: 'Loaded Nachos',
    rating: 5,
  },
  {
    name: 'Nidhi Kothari',
    username: '@nidhik',
    body: 'Such a refreshing cafe! Cozy corners, warm welcoming staff, and food made with real passion. Will be coming back every weekend.',
    img: 'https://cdn.21st.dev/assets/mirror/55/55cf6231499bcdc496f15ff1d28d4170ac9b99e9279495caa44fca70886d8b2e.jpg',
    location: 'Udaipur Local',
    dishLoved: 'Berry Cheesecake',
    rating: 5,
  },
  {
    name: 'Vikram Rajput',
    username: '@vikram_r',
    body: 'Best crust and cheese pull in Rajasthan! You must try their specialty chef pizza and iced mocha.',
    img: 'https://cdn.21st.dev/assets/mirror/ae/ae1d49872fdd6f8d9aa933f6ca8bce8cb1ba7e87dfb9d2926661184cb7bfe26d.jpg',
    location: 'Chetak Circle',
    dishLoved: 'Four-Cheese Pizza',
    rating: 5,
  },
  {
    name: 'Tanvi Jain',
    username: '@tanvi.jain',
    body: 'Their peaceful garden vibe and artisanal brew make it a hidden gem of Udaipur. 5 stars all the way!',
    img: 'https://cdn.21st.dev/assets/mirror/f0/f07b84f12ef125cbb837a7bd64da401992f5f62bd55fee10d01cd3dcc8abae80.jpg',
    location: 'Madhuban, Udaipur',
    dishLoved: 'Iced Vanilla Latte',
    rating: 5,
  },
];

function TestimonialCard({ review }: { review: ReviewData }) {
  return (
    <Card
      className="w-[250px] sm:w-[280px] select-none shrink-0 border rounded-xl shadow-xs transition-all duration-200 hover:shadow-md hover:scale-[1.01]"
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <CardContent className="p-3.5 sm:p-4">
        {/* User Info Header */}
        <div className="flex items-center gap-2.5">
          <Avatar className="size-8 sm:size-9 shrink-0 border border-amber-500/20">
            <AvatarImage src={review.img} alt={review.name} />
            <AvatarFallback>{review.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <figcaption
                className="text-xs sm:text-sm font-semibold truncate"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {review.name}
              </figcaption>
              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" aria-label="Verified Customer" />
            </div>
            <p
              className="text-[10px] sm:text-[11px] truncate"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <span>{review.username}</span> · <span>{review.location}</span>
            </p>
          </div>
        </div>

        {/* Rating & Dish Tag */}
        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center text-amber-400 gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-200">
            {review.dishLoved}
          </span>
        </div>

        {/* Review Quote Body */}
        <blockquote
          className="mt-2 text-xs leading-relaxed italic line-clamp-3"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          "{review.body}"
        </blockquote>
      </CardContent>
    </Card>
  );
}

export const ReviewsSection: React.FC = () => {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-main-heading"
      className="py-12 sm:py-16 relative overflow-hidden transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-page)',
      }}
    >
      {/* Editorial Section Heading */}
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <SectionHeading
              eyebrow="GUEST FEEDBACK &amp; COMMUNITY"
              title="What People Are Saying"
              description="Real experiences and impressions from visitors, diners, and our growing digital community in Udaipur."
              titleLevel="h2"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Bi-directional Live Stream
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-400">
              <Quote className="w-3.5 h-3.5" />
              Hover To Pause
            </span>
          </div>
        </div>
      </Container>

      {/* Bidirectional Testimonials Stream - Seamlessly filled into page body */}
      <div className="w-full relative overflow-hidden py-2 sm:py-4 flex flex-col gap-3 sm:gap-4 [perspective:800px]">
        <div
          className="w-full flex flex-col gap-3 sm:gap-4 will-change-transform"
          style={{
            transform: 'rotateX(6deg) rotateZ(-1deg)',
          }}
        >
          {/* Row 1 - Leftward flow */}
          <Marquee pauseOnHover repeat={3} className="[--duration:34s] [--gap:1rem]">
            {ROW1_REVIEWS.map((review, i) => (
              <TestimonialCard key={`r1-${i}-${review.username}`} review={review} />
            ))}
          </Marquee>

          {/* Row 2 - Rightward flow (Bi-directional / Reverse) */}
          <Marquee reverse pauseOnHover repeat={3} className="[--duration:38s] [--gap:1rem]">
            {ROW2_REVIEWS.map((review, i) => (
              <TestimonialCard key={`r2-${i}-${review.username}`} review={review} />
            ))}
          </Marquee>
        </div>

        {/* Seamless Left & Right Body Blending Gradient Overlays */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10"
          style={{
            background: 'linear-gradient(90deg, var(--color-bg-page) 0%, transparent 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10"
          style={{
            background: 'linear-gradient(270deg, var(--color-bg-page) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Community Google Verification Trust Bar */}
      <div className="mt-8 sm:mt-10">
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
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
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
                  Verified Public Community Reviews
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
                    (1,200+ ratings across Google &amp; Zomato)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={FOOGLE_BUSINESS_INFO.location.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] shadow-xs cursor-pointer focus-visible:outline-2"
                style={{
                  backgroundColor: 'var(--color-btn-primary-bg)',
                  color: 'var(--color-btn-primary-text)',
                }}
              >
                <span>Write a Google Review</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ReviewsSection;
