import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useGames } from "@/hooks/use-games";
import { GameCard } from "@/components/GameCard";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Games() {
  const { t } = useLanguage();
  const { data: games, isLoading } = useGames();
  const [search, setSearch] = useState("");

  const filteredGames = games?.filter(game => 
    game.title.toLowerCase().includes(search.toLowerCase()) || 
    game.description.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            {t.nav.games}
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Explore our collection of immersive experiences. From action-packed adventures to social hangouts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16 relative"
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500">
            <Search size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search for a game..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-white placeholder:text-zinc-600 transition-all shadow-lg backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-4 flex items-center text-zinc-500">
            <SlidersHorizontal size={20} />
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/3] bg-zinc-900 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game, idx) => (
              <GameCard key={game.id} game={game} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-display font-bold text-zinc-500">No games found</h3>
            <p className="text-zinc-600 mt-2">Try searching for something else.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
