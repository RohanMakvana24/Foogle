import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-01-utils/marquee";

const reviews = [
  {
    name: "Ken Masters",
    username: "@kmasters",
    body: "“Our productivity has nearly doubled since onboarding. Automation features removed repetitive tasks, allowing our team to focus on building instead of managing operations.”",
    profile: "https://cdn.21st.dev/assets/mirror/b5/b539abc60701ab924b178ba9d8db1946.jpg",
  },
  {
    name: "Ryu Hoshi",
    username: "@ryu_focus",
    body: "“The transition was seamless. We’ve cut down deployment cycles by 40% and our engineering team feels significantly more agile now.”",
    profile: "https://cdn.21st.dev/assets/mirror/92/92476579b29cb115aa0cbccbd48f76d4.jpg",
  },
  {
    name: "Chun-Li Zhang",
    username: "@chunli_ops",
    body: "“Customer satisfaction ratings jumped within weeks. The interface is intuitive, and our support team resolve issues faster than ever.”",
    profile: "https://cdn.21st.dev/assets/mirror/e6/e6ba157c917246ba7ee0a4ecbf6aa431.jpg",
  },
  {
    name: "Guile",
    username: "@major_guile",
    body: "“Rock-solid reliability. Even during peak traffic surges, performance remained uncompromised. It simply works when you need it most.”",
    profile: "https://cdn.21st.dev/assets/mirror/40/409dca8bbca0f3a696eeaa501066d926.jpg",
  },
  {
    name: "Cammy White",
    username: "@cammy_security",
    body: "“Security compliance used to be a headache. Now everything is streamlined, auditable, and stress-free for our compliance audits.”",
    profile: "https://cdn.21st.dev/assets/mirror/5a/5a9147f1c3f91da6bc86e24db498a5e3.jpg",
  },
  {
    name: "Dhalsim",
    username: "@dhalsim_zen",
    body: "“Brought harmony to cross-department collaboration. Marketing, product, and sales are finally in sync and working with clarity.”",
    profile: "https://cdn.21st.dev/assets/mirror/8b/8b24da44ec5e96a2fa8087959082216d.jpg",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

function ReviewCard({
  profile,
  name,
  username,
  body,
}: {
  profile: string;
  name: string;
  username: string;
  body: string;
}) {
  return (
    <Card className="w-80 cursor-pointer overflow-hidden border transition-all duration-300 hover:shadow-md hover:border-emerald-600/40">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover border border-stone-200 dark:border-stone-700"
            alt={name}
            src={profile}
            loading="lazy"
            onError={(e) => {
              // Resilient fallback avatar if external asset fails to load
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23183B2B'/%3E%3Ctext x='50%25' y='55%25' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-size='14' dy='.3em'%3E" +
                name.charAt(0) +
                "%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="flex flex-col">
            <figcaption className="text-sm font-semibold text-foreground">
              {name}
            </figcaption>
            <p className="text-xs font-normal text-muted-foreground">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-xs sm:text-sm text-foreground/85 leading-relaxed italic">
          {body}
        </blockquote>
      </CardContent>
    </Card>
  );
}

export function MarqueeDemo({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl py-4 ${
        className || ""
      }`}
    >
      <Marquee pauseOnHover className="[--duration:24s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:24s] mt-2">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      {/* Edge Gradients */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-bg-page), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l"
        style={{
          backgroundImage:
            "linear-gradient(to left, var(--color-bg-page), transparent)",
        }}
      />
    </div>
  );
}

export default MarqueeDemo;
