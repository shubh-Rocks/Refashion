import { ArrowRight } from "lucide-react";
import Logo from "./Logo";

const footerLinks = ["Browse", "How it works", "List an item", "Community"];

export default function CtaFooter() {
  return (
    <>
      <section id="community" className="bg-mustard">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-6 py-16 lg:flex-row lg:items-center lg:px-10 lg:py-24">
          <div>
            <p className="text-sm font-bold uppercase text-forest">
              Community wardrobe
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-forest sm:text-5xl lg:text-6xl">
              Good clothes deserve another story.
            </h2>
          </div>
          <a
            href="/list"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-forest px-7 py-4 font-semibold text-cream transition hover:bg-forest/90"
          >
            List your first item <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <footer className="bg-forest text-cream/70">
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-10">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div className="max-w-md">
              <Logo showText={false} />
              <p className="mt-6 text-lg leading-relaxed">
                A community wardrobe where style stays in circulation and
                quality clothing finds its next person.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-x-16 gap-y-6 self-start">
              {footerLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="transition hover:text-cream">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-16 border-t border-cream/15 pt-8 text-sm">
            © 2026 ReWear. Swap more. Waste less.
          </p>
        </div>
      </footer>
    </>
  );
}
