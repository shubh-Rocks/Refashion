"use client";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { label: "Browse", href: "#browse" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Community", href: "#community" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-moss/40 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-medium text-forest/80 transition hover:text-forest"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <a href="/login" className="font-medium text-forest">
            Log in
          </a>
          <a
            href="/list"
            className="inline-flex items-center gap-2 rounded-md bg-forest px-5 py-3 font-semibold text-cream transition hover:bg-forest/90"
          >
            List item <ArrowRight className="size-4" />
          </a>
        </div>
        <button
          className="grid size-10 place-items-center rounded-md text-forest md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-moss/40 bg-cream px-6 pb-6 md:hidden">
          <nav className="flex flex-col py-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 font-medium text-forest"
              >
                {l.label}
              </a>
            ))}
            <a href="/login" className="py-3 font-medium text-forest">
              Log in
            </a>
          </nav>
          <a
            href="/list"
            className="flex items-center justify-center gap-2 rounded-md bg-forest px-5 py-3 font-semibold text-cream"
          >
            List item <ArrowRight className="size-4" />
          </a>
        </div>
      )}
    </header>
  );
}
