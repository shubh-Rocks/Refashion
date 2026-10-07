import Image from "next/image";
import { Repeat } from "lucide-react";

export default function DirectExchange() {
  return (
    <section id="how-it-works" className="bg-forest text-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-24">
        <div className="relative aspect-[4/5] w-full max-w-xl overflow-hidden rounded-xl lg:max-w-none">
          <Image
            src="/images/label.jpg"
            alt="Care label on a green linen garment"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <span className="grid size-14 place-items-center rounded-full bg-lime/25 text-lime">
            <Repeat className="size-6" />
          </span>
          <p className="mt-8 text-sm font-bold uppercase text-lime">
            Direct exchange
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            A better match,
            <br />
            without the waste.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75">
            Find someone who loves your piece as much as you love theirs.
            Propose a one-to-one swap, compare sizes and condition, then make
            the exchange.
          </p>
          <ul className="mt-8 space-y-4 font-medium">
            {[
              "Clear condition and sizing details",
              "Community profiles for confident swaps",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="size-2.5 rounded-full bg-mustard" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
