import { motion } from "framer-motion";
import type { TeamMember } from "@shared/schema";
import { ExternalLink } from "lucide-react";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export function TeamCard({ member, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex items-center gap-4 p-4 bg-zinc-900/40 border border-white/5 rounded-xl hover:bg-zinc-900/80 hover:border-primary/30 transition-all duration-300"
    >
      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-colors">
        <img 
          src={member.avatarUrl} 
          alt={member.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-bold font-display text-white group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="text-sm text-zinc-400 font-medium">
          {member.role}
        </p>
      </div>

      {member.profileUrl && (
        <a 
          href={member.profileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 text-zinc-500 hover:text-white transition-colors"
        >
          <ExternalLink size={18} />
        </a>
      )}
      
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
    </motion.div>
  );
}
