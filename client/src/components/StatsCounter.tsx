import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import type { StudioStat } from "@shared/schema";
import { Users, Gamepad2, Trophy, PlayCircle } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

import { useLanguage } from "@/contexts/LanguageContext";

// Icon map helper
const iconMap: Record<string, any> = {
  users: Users,
  gamepad: Gamepad2,
  trophy: Trophy,
  play: PlayCircle
};

interface StatsCounterProps {
  stat: StudioStat;
  index: number;
}

function Counter({ value }: { value: string }) {
  // Simple parser to handle "1.5M+" or "50K" strings
  const numberMatch = value.match(/[\d.]+/);
  const suffixMatch = value.match(/[KkMmB]+.?/);
  
  const target = numberMatch ? parseFloat(numberMatch[0]) : 0;
  const suffix = suffixMatch ? suffixMatch[0] : "";
  
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => 
    `${current.toFixed(target % 1 !== 0 ? 1 : 0)}${suffix}`
  );

  useEffect(() => {
    if (inView) {
      spring.set(target);
    }
  }, [inView, target, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function StatsCounter({ stat, index }: StatsCounterProps) {
  const { t } = useLanguage();
  const Icon = iconMap[stat.icon] || Trophy;

  const labelMap = {
    "Group Members": t.stats.members,
    "Total Visits": t.stats.visits,
    "Active Players": t.stats.players
  };
  const label = labelMap[stat.label as keyof typeof labelMap] || stat.label;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring" }}
      className="flex flex-col items-center p-6 bg-zinc-900/50 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors group"
    >
      <div className="mb-4 p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.1)] group-hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]">
        <Icon size={32} />
      </div>
      
      <div className="text-4xl font-display font-bold text-white mb-1 group-hover:text-glow transition-all">
        <Counter value={stat.value} />
      </div>
      
      <div className="text-sm text-zinc-500 font-medium uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}
