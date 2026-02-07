import { motion } from "framer-motion";
import { useTeam } from "@/hooks/use-team";
import { TeamCard } from "@/components/TeamCard";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Team() {
  const { t } = useLanguage();
  const { data: team, isLoading } = useTeam();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">The Minds Behind The Magic</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            {t.team.title}
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We are a group of passionate developers, designers, and creators pushing the boundaries of what's possible on Roblox.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 bg-zinc-900 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team?.map((member, idx) => (
              <TeamCard key={member.id} member={member} index={idx} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
