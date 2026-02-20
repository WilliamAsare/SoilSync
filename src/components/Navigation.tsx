"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Leaf, LayoutDashboard, Camera, ChevronRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/analyze", label: "Analyze Soil", icon: Camera },
  { href: "/dashboard", label: "My Farm", icon: LayoutDashboard },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-green-800 tracking-tight">
              Soil<span className="text-amber-600">Sync</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "bg-green-50 text-green-700"
                    : "text-stone-600 hover:text-green-700 hover:bg-green-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/analyze"
              className="hidden sm:flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Camera className="w-4 h-4" />
              Analyze Now
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-green-50"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-green-100 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "bg-green-50 text-green-700"
                      : "text-stone-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {link.label}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>
              );
            })}
            <Link
              href="/analyze"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg mt-2"
            >
              <Camera className="w-4 h-4" />
              Analyze My Soil
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
