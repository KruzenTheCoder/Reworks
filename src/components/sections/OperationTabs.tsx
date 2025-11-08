"use client";

import { Tabs, Card } from "@/components/ui/RBTabsCard";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from 'lucide-react';

type Operation = {
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  icon?: LucideIcon;
};

export default function OperationTabs({ operations }: { operations: Operation[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
      {/* Tabs on the left wrapped in a Card to match height */}
      <Card className="p-3 sm:p-4 md:p-6 bg-white/70 backdrop-blur-md h-full relative overflow-hidden">
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-blue to-accent-blue" />
        <Tabs
          direction="vertical"
          tabs={operations.map((op) => op.title)}
          activeTab={active}
          onTabChange={setActive}
          tabClass="px-2 py-2 rounded-md text-xs sm:text-sm font-medium"
          activeTabClass="bg-gradient-to-r from-primary-blue/10 to-accent-blue/10 text-primary-blue border-primary-blue/40 shadow-sm"
          inactiveTabClass="bg-white/70 text-text-base border-slate-200 hover:bg-white"
        />
      </Card>

      {/* Content on the right */}
      <Card className="lg:col-span-2 p-4 sm:p-6 md:p-8 relative overflow-hidden bg-white/70 backdrop-blur-md h-full" hover>
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-blue to-accent-blue" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="mb-4 md:mb-8 text-center space-y-3 md:space-y-6">
              {operations[active].icon && (
                <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary-blue/15 to-accent-blue/15 flex items-center justify-center">
                  {(() => {
                    const Icon = operations[active].icon!;
                    return <Icon className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 text-primary-blue" />;
                  })()}
                </div>
              )}
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 text-center">
                {operations[active].title}
              </h4>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {[
                { label: "The problem", text: operations[active].problem, color: "text-red-600" },
                { label: "The solution", text: operations[active].solution, color: "text-blue-600" },
                { label: "The outcome", text: operations[active].outcome, color: "text-green-600" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Card className="p-3 sm:p-4 md:p-6 text-center relative overflow-hidden" hover>
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-primary-blue to-accent-blue" />
                    </div>
                    <h5 className={`text-sm sm:text-base md:text-lg font-semibold mb-2 md:mb-3 ${item.color}`}>
                      {item.label}
                    </h5>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
}

