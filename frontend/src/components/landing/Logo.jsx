import Image from "next/image";

export default function Logo({ showText = true }) {
  return (
    <a href="/" className="flex items-center">
      <Image src="/logo.png" alt="Company Logo" width={100} height={40} />
      {showText && (
        <span className="font-display text-2xl font-bold tracking-tight text-forest">
          ReFashion
        </span>
      )}
    </a>
  );
}
