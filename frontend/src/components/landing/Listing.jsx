import Image from "next/image";
import { Heart } from "lucide-react";

const items = [
  {
    title: "Oversized Wool Blazer",
    size: "M",
    by: "maya.green",
    cond: "Excellent",
    pts: 180,
    swap: true,
    img: "/images/blazer.jpg",
  },
  {
    title: "Raw Denim Trousers",
    size: "32",
    by: "denim.days",
    cond: "Like new",
    pts: 240,
    swap: false,
    img: "/images/denim.jpg",
  },
  {
    title: "Chunky Mohair Knit",
    size: "L",
    by: "knits.by.eva",
    cond: "Good",
    pts: 150,
    swap: true,
    img: "/images/knit.jpg",
  },
  {
    title: "Vintage Silk Scarf",
    size: "One size",
    by: "silkroad",
    cond: "Excellent",
    pts: 90,
    swap: false,
    img: "/images/scarf.jpg",
  },
];

export default function Listings() {
  return (
    <section id="browse" className="bg-sand">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-sage">
              Fresh from the community
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-forest sm:text-5xl">
              Active listings
            </h2>
          </div>
          <a
            href="/browse"
            className="border-b-2 border-mustard pb-1 font-semibold text-forest"
          >
            View all pieces
          </a>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <li key={it.title}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-moss/40">
                <Image
                  src={it.img}
                  alt={it.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-md bg-cream px-3 py-1.5 text-xs font-bold uppercase text-forest">
                  {it.cond}
                </span>
                <button
                  aria-label={`Save ${it.title}`}
                  className="absolute right-4 top-4 grid size-11 place-items-center rounded-md bg-cream text-forest transition hover:bg-mustard"
                >
                  <Heart className="size-5" />
                </button>
                <span className="absolute bottom-0 right-0 rounded-tl-md rounded-br-xl bg-forest px-4 py-2.5 text-sm font-bold text-cream">
                  {it.pts} pts
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-forest">
                {it.title}
              </h3>
              <p className="mt-1 text-sage">
                Size {it.size} · Listed by @{it.by}
              </p>
              <span
                className={`mt-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase ${
                  it.swap
                    ? "bg-mustard/30 text-forest"
                    : "border border-moss text-sage"
                }`}
              >
                {it.swap ? "Swap active" : "Points only"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
