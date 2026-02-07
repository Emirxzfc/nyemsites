import { Link } from "wouter";
import { Twitter, Youtube, Gamepad2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-12 px-6 mt-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/">
            <div className="text-2xl font-display font-bold text-white tracking-wider cursor-pointer">
              <span className="text-primary">NyEm</span> Inc.
            </div>
          </Link>
          <p className="text-zinc-500 text-sm">
            Crafting immersive Roblox experiences since 2024.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all duration-300 text-zinc-400">
            <Twitter size={20} />
          </a>
          <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all duration-300 text-zinc-400">
            <Youtube size={20} />
          </a>
          <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all duration-300 text-zinc-400">
            <Gamepad2 size={20} />
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center md:text-left text-zinc-600 text-xs">
        © {new Date().getFullYear()} NyEm Inc. All rights reserved.
      </div>
    </footer>
  );
}
