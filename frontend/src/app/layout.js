import { Outfit, Figtree } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["500", "600", "700", "800"],
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata = {
  title: "ReWear – Swap your style. Save the circle.",
  description:
    "Trade your unworn treasures directly with people who value them. Earn points for every piece you pass on.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${figtree.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
