"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, Award, Eye } from "lucide-react";

const stats = [
  { icon: Globe, label: "Cultures Documented", value: "12" },
  { icon: Award, label: "UNESCO Recognized", value: "8" },
  { icon: TrendingUp, label: "Avg. Rating", value: "4.7" },
  { icon: Eye, label: "Total Reviews", value: "340K+" },
];

export function StatsBar() {
  return (
    <div className="border-b bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {stats.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-3 py-4 px-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{value}</p>
                <p className="text-muted-foreground text-xs">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
