import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/team", label: "Team" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 px-6 backdrop-blur-md bg-black/50 border-b border-white/5">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="text-2xl font-display font-bold text-white tracking-wider cursor-pointer flex items-center gap-2 group">
            <span className="text-primary group-hover:text-glow transition-all duration-300">NyEm</span>
            <span className="text-white/80">Inc.</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="relative group cursor-pointer">
              <span className={cn(
                "font-display font-medium text-lg transition-colors duration-300",
                location === link.href ? "text-primary text-glow" : "text-zinc-400 group-hover:text-white"
              )}>
                {link.label}
              </span>
              {location === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(57,255,20,0.8)]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-zinc-900 border-b border-white/10 p-4 flex flex-col gap-4"
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              <span className={cn(
                "block py-3 px-4 rounded-lg font-display text-lg",
                location === link.href 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-zinc-400 hover:bg-white/5"
              )}>
                {link.label}
              </span>
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
