"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, Zap, Calendar, Timer, ArrowRight, Lock } from "lucide-react";
import { tabAnim } from "@/lib/animations/dashboard";

interface Game {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  available: boolean;
  gradient: string;
  iconBg: string;
  accentColor: string;
}

const GAMES: Game[] = [
  {
    id: "quiz",
    emoji: "🧠",
    title: "Quizzes",
    description:
      "Test your knowledge with AI-generated multiple-choice questions tailored to your enrolled subjects and grade.",
    tags: ["Multiple Choice", "Timed", "Subject-based"],
    href: "/dashboard/gamify/quiz",
    available: false,
    gradient: "from-violet-50 to-purple-50",
    iconBg: "bg-violet-100",
    accentColor: "text-violet-700",
  },
  {
    id: "compete",
    emoji: "⚡",
    title: "Compete",
    description:
      "Go head-to-head with other students in real-time academic battles. Climb the leaderboard and earn XP!",
    tags: ["Multiplayer", "Real-time", "Leaderboard"],
    href: "/dashboard/gamify/compete",
    available: false,
    gradient: "from-amber-50 to-orange-50",
    iconBg: "bg-amber-100",
    accentColor: "text-amber-700",
  },
  {
    id: "daily",
    emoji: "📅",
    title: "Daily Challenge",
    description:
      "A fresh handpicked question every day. Answer correctly to extend your streak and earn bonus XP.",
    tags: ["Daily", "Streak Bonus", "Handpicked"],
    href: "/dashboard/gamify/daily",
    available: false,
    gradient: "from-sky-50 to-blue-50",
    iconBg: "bg-sky-100",
    accentColor: "text-sky-700",
  },
  {
    id: "speed",
    emoji: "⏱️",
    title: "Speed Round",
    description:
      "60 seconds. As many correct answers as possible. Pure adrenaline-fuelled learning at its best.",
    tags: ["60 Seconds", "High Score", "Fast-paced"],
    href: "/dashboard/gamify/speed",
    available: false,
    gradient: "from-rose-50 to-pink-50",
    iconBg: "bg-rose-100",
    accentColor: "text-rose-700",
  },
];

const STAT_ITEMS = [
  { icon: Trophy, label: "Rank", value: "—", color: "text-amber-500 bg-amber-50" },
  { icon: Zap,    label: "XP Earned", value: "0", color: "text-violet-500 bg-violet-50" },
  { icon: Calendar, label: "Games Played", value: "0", color: "text-sky-500 bg-sky-50" },
  { icon: Timer,  label: "Best Streak", value: "—", color: "text-rose-500 bg-rose-50" },
];

export default function GamifyHub() {
  return (
    <motion.div key="gamify" {...tabAnim} className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-3xl p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🏆</span>
            <span className="text-xs font-extrabold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
              Game Zone
            </span>
          </div>
          <h1
            className="text-4xl font-extrabold mb-2 leading-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Level Up Your Learning
          </h1>
          <p className="text-white/75 text-sm max-w-sm font-medium">
            Earn XP, beat your classmates, and make studying feel like a game.
            Pick a mode and start playing!
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-8 -top-8 text-[120px] opacity-10 pointer-events-none select-none rotate-12">
          🎮
        </div>
        <div className="absolute right-12 bottom-0 text-[80px] opacity-10 pointer-events-none select-none -rotate-6">
          🌟
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STAT_ITEMS.map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center gap-3"
          >
            <div className={`${color} p-2 rounded-xl`}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p
                className="font-extrabold text-lg leading-none text-[#1B1C17]"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {value}
              </p>
              <p className="text-[10px] text-[#75796C] font-semibold mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Game cards */}
      <div>
        <h2
          className="text-xl font-extrabold text-[#1B1C17] mb-4"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Choose Your Game Mode
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GAMES.map((game, idx) => (
            <GameCard key={game.id} game={game} index={idx} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function GameCard({ game, index }: { game: Game; index: number }) {
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className={`relative group bg-gradient-to-br ${game.gradient} rounded-2xl p-6 border border-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-200 ${
        game.available
          ? "hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer"
          : "opacity-90 cursor-default"
      }`}
    >
      {/* Coming Soon badge */}
      {!game.available && (
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-gray-200/80 text-[#44483D] text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
          <Lock className="h-2.5 w-2.5" />
          Coming Soon
        </div>
      )}

      {/* Emoji + title */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`${game.iconBg} rounded-2xl p-3 text-2xl flex-shrink-0 shadow-sm`}>
          {game.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-xl font-extrabold text-[#1B1C17] leading-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {game.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#44483D] font-medium leading-relaxed mb-4">
        {game.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {game.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-bold bg-white/70 border border-white text-[#44483D] px-2.5 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      {game.available ? (
        <div
          className={`flex items-center gap-2 font-extrabold text-sm ${game.accentColor}`}
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Play Now
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm font-bold text-[#44483D]/50">
          <Lock className="h-4 w-4" />
          Launching soon
        </div>
      )}
    </motion.div>
  );

  if (game.available) {
    return <Link href={game.href}>{cardContent}</Link>;
  }

  return <div>{cardContent}</div>;
}
