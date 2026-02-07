import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import type { Game } from "@shared/schema";

import { useLanguage } from "@/contexts/LanguageContext";

interface GameCardProps {
  game: Game;
  index: number;
}

export function GameCard({ game, index }: GameCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 shadow-xl"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
        <motion.img 
          src={game.imageUrl} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          {game.isNew && (
            <span className="px-3 py-1 text-xs font-bold bg-primary text-black rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(57,255,20,0.5)]">
              <Sparkles size={12} /> NEW
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative z-20">
        <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {game.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-6 line-clamp-2">
          {game.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">{t.games.playing}</span>
            <span className="text-sm font-mono text-white">{game.playing}</span>
          </div>
          
          <a 
            href={game.gameUrl}
            target="_blank"
            rel="noopener noreferrer" 
            className="px-5 py-2.5 bg-white/10 hover:bg-primary hover:text-black rounded-lg text-white font-medium transition-all duration-300 flex items-center gap-2 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.4)]"
          >
            <Play size={16} fill="currentColor" /> {t.hero.cta}
          </a>
        </div>
      </div>
      
      {/* Animated Border Gradient on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl pointer-events-none transition-colors duration-300" />
    </motion.div>
  );
}
