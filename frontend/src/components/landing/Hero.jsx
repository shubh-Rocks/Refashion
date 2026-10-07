import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-28">
      <div>
        <span className="inline-flex items-center gap-2 rounded-md bg-sand px-4 py-3 text-sm font-bold uppercase text-forest">
          <Sparkles className="size-4" /> The new standard of pre-loved
        </span>
        <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-forest sm:text-6xl lg:text-7xl">
          Swap your style.
          <br />
          Save the circle.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-sage sm:text-xl">
          Trade your unworn treasures directly with people who value them. Earn
          points for every piece you pass on.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#browse"
            className="inline-flex items-center gap-2 rounded-md bg-forest px-6 py-4 font-semibold text-cream transition hover:bg-forest/90"
          >
            Browse marketplace <ArrowRight className="size-4" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center rounded-md border-2 border-forest px-6 py-4 font-semibold text-forest transition hover:bg-forest hover:text-cream"
          >
            How swapping works
          </a>
        </div>
      </div>

      <div className="relative pb-10 pl-0 sm:pl-10 lg:pl-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
          <Image
            src="/images/hero.jpg"
            alt="Friends swapping clothes"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-4 max-w-[17rem] rounded-lg bg-mustard p-6 shadow-xl sm:left-0 sm:p-8">
          <p className="font-display text-2xl font-bold text-forest">
            Pass it on
          </p>
          <p className="mt-3 text-sm font-medium uppercase leading-relaxed text-forest">
            Every swap keeps good clothing in motion
          </p>
        </div>
      </div>
    </section>
  );
}
