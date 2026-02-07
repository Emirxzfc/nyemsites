import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useGames } from "@/hooks/use-games";
import { useStats } from "@/hooks/use-stats";
import { GameCard } from "@/components/GameCard";
import { StatsCounter } from "@/components/StatsCounter";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const { data: games, isLoading: gamesLoading } = useGames();
  const { data: stats, isLoading: statsLoading } = useStats();
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);

  const newGames = games?.filter(g => g.isNew).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black z-0" />
        
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/20 rounded-full blur-xl"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 2 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear" 
            }}
            style={{ 
              width: Math.random() * 100 + 50, 
              height: Math.random() * 100 + 50 
            }}
          />
        ))}

        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block"
          >
            <span className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(57,255,20,0.2)]">
              Welcome to the Next Level
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-7xl md:text-9xl font-display font-black text-white mb-6 tracking-tighter"
          >
            NyEm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600 text-glow">Inc.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/games">
              <button className="px-8 py-4 bg-primary text-black font-bold text-lg rounded-xl hover:scale-105 transition-transform duration-200 shadow-[0_0_25px_rgba(57,255,20,0.4)] flex items-center gap-2">
                {t.hero.cta} <ArrowRight size={20} />
              </button>
            </Link>
            <a href="https://roblox.com" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 bg-white/5 text-white font-bold text-lg rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-200 backdrop-blur-sm">
                {t.hero.join}
              </button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      <section className="py-24 bg-black/50 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          {statsLoading ? (
            <div className="flex justify-center gap-4">
               {[1,2,3].map(i => <div key={i} className="w-full h-40 bg-zinc-900/50 rounded-2xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats?.map((stat, idx) => (
                <StatsCounter key={stat.id} stat={stat} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-16"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                {t.games.title}
              </h2>
              <div className="h-1 w-32 bg-primary rounded-full shadow-[0_0_15px_rgba(57,255,20,0.6)]" />
            </div>
            
            <Link href="/games" className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors group">
              {t.games.viewAll} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {gamesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video bg-zinc-900 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newGames.map((game, idx) => (
                <GameCard key={game.id} game={game} index={idx} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link href="/games">
              <button className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors w-full">
                {t.games.viewAll}
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
