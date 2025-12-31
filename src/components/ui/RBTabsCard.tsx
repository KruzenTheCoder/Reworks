"use client";

import clsx from "clsx";

type TabsProps = {
  direction?: "vertical" | "horizontal";
  tabs: string[];
  activeTab: number;
  onTabChange: (ix: number) => void;
  tabClass?: string;
  activeTabClass?: string;
  inactiveTabClass?: string;
};

export function Tabs({
  direction = "vertical",
  tabs,
  activeTab,
  onTabChange,
  tabClass = "",
  activeTabClass = "",
  inactiveTabClass = "",
}: TabsProps) {
  const isVertical = direction === "vertical";
  return (
    <div className={clsx(isVertical ? "flex flex-col gap-3" : "flex gap-3")}>
      {tabs.map((label, idx) => (
        <button
          key={label}
          onClick={() => onTabChange(idx)}
          onMouseEnter={() => onTabChange(idx)}
          className={clsx(
            "transition-all duration-200 border rounded-md",
            "px-4 py-3 text-sm font-medium",
            tabClass,
            activeTab === idx
              ? activeTabClass || "bg-gradient-to-r from-primary-blue/10 to-accent-blue/10 text-primary-blue border-primary-blue/40 shadow-sm"
              : inactiveTabClass || "bg-white/70 text-text-base border-slate-200 hover:bg-white"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

type CardProps = {
  className?: string;
  hover?: boolean;
  children: React.ReactNode;
};

export function Card({ className = "", hover = false, children }: CardProps) {
  return (
    <div
      className={clsx(
        "luxury-card glass-card rounded-xl",
        hover && "transition-shadow duration-300 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

