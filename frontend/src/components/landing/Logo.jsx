import { Leaf } from "lucide-react";
 
export default function Logo({ showText = true }) {
  return (
    <a href="/" className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full bg-lime text-forest">
        <Leaf className="size-5 -rotate-12" />
      </span>
      {showText && <span className="font-display text-2xl font-bold tracking-tight text-forest">REWEAR</span>}
    </a>
  );
}
 
