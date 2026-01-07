"use client";
import Link from "next/link";
import { ComponentProps, ReactNode, useRef, isValidElement, cloneElement, Children } from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { animate } from "motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "luxury" | "glow";

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
};

type ButtonProps = BaseProps & (Omit<HTMLMotionProps<"button">, "ref"> & { href?: undefined });
type LinkProps = BaseProps & { href: string } & ComponentProps<typeof Link>;

function getVariantClasses(variant: ButtonVariant = "primary", size: "sm" | "md" | "lg" = "md") {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3"
  };

  const base = `relative overflow-hidden inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 btn-shimmer ${sizeClasses[size]}`;
  
  const map: Record<ButtonVariant, string> = {
    // Blue-forward palette unified to match Navbar "Start Hiring" gradient
    primary: "bg-gradient-to-r from-slate-700 via-primary-blue to-accent-blue text-white shadow-xl hover:shadow-2xl hover:brightness-110 hover:saturate-125 relative overflow-hidden border-0 bg-[length:200%_auto]",
    secondary: "border-2 border-primary-blue text-primary-blue bg-white hover:bg-gradient-to-r hover:from-primary-blue hover:to-accent-blue hover:text-white shadow-md hover:shadow-lg hover:ring-2 hover:ring-primary-blue/30",
    ghost: "text-white bg-gradient-to-r from-[#ff9442] via-[#cc6f24] to-[#0a0a0a] shadow-sm hover:shadow-lg hover:brightness-110 hover:saturate-125 border-0 bg-[length:200%_auto]",
    luxury: "bg-gradient-to-r from-slate-700 via-primary-blue to-accent-blue text-white shadow-xl hover:shadow-2xl hover:brightness-110 hover:saturate-125 relative overflow-hidden border-0 bg-[length:200%_auto]",
    glow: "bg-gradient-to-r from-primary-blue to-accent-blue text-white shadow-lg hover:shadow-xl hover:brightness-110 hover:saturate-125 pulse-glow border-0 bg-[length:200%_auto]"
  };
  
  return `${base} ${map[variant]}`;
}

const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1,
    transition: { type: "tween", duration: 0.2 } as const
  },
  tap: { 
    scale: 0.98,
    transition: { type: "tween", duration: 0.1 } as const
  }
};

const luxuryVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1,
    transition: { type: "tween", duration: 0.2 } as const
  },
  tap: { 
    scale: 0.98,
    transition: { type: "tween", duration: 0.1 } as const
  }
};

export default function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${getVariantClasses(variant, size)} ${className}`.trim();
  const variants = variant === "luxury" ? luxuryVariants : buttonVariants;
  const inkRef = useRef<HTMLSpanElement | null>(null);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Strip emojis from button text but preserve all normal characters
  // Uses Unicode Extended_Pictographic property (broad emoji coverage) and common modifiers
  const removeEmojisKeepText = (text: string) =>
    text
      .replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "")
      .replace(/\s{2,}/g, " ")
      .trim();

  // Deeply sanitize any nested children to remove emojis from text nodes only
  const sanitizeChildrenDeep = (node: ReactNode): ReactNode => {
    if (typeof node === "string") return removeEmojisKeepText(node);
    if (typeof node === "number") return node;
    if (Array.isArray(node)) {
      // Normalize to a keyed array to avoid React key warnings
      const keyed = Children.toArray(node);
      return keyed.map(sanitizeChildrenDeep) as any;
    }
    if (isValidElement(node)) {
      const child = (node.props as any)?.children;
      const sanitized = child !== undefined ? sanitizeChildrenDeep(child) : child;
      // cloneElement preserves the original element key if not overridden
      return cloneElement(node, { ...(node.props as any), children: sanitized });
    }
    return node;
  };
  const cleanChildren = sanitizeChildrenDeep(children);

  const ButtonContent = () => (
    <>
      {/* Luxury ink hover highlight using Motion One */}
      <span
        ref={inkRef}
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          opacity: 0,
          background:
            (variant === "luxury" || variant === "primary")
              ? "radial-gradient(120% 120% at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)"
              : "radial-gradient(120% 120% at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
          transform: "scale(0.98)",
        }}
      />
      <span className="relative z-10 flex items-center">{cleanChildren}</span>
    </>
  );

  const handleEnter = () => {
    if (!inkRef.current || prefersReduced) return;
    animate(
      inkRef.current,
      { opacity: [0, 0.35, 0.22], transform: ["scale(0.98)", "scale(1.05)", "scale(1)"] } as any,
      { duration: 0.6 } as any
    );
  };

  const handleLeave = () => {
    if (!inkRef.current || prefersReduced) return;
    animate(inkRef.current, { opacity: 0, transform: "scale(0.98)" } as any, { duration: 0.35 } as any);
  };

  if ("href" in props && props.href) {
    const { href, size: _, variant: _variant, className: _className, children: _children, ...rest } = props as LinkProps;
    return (
      <motion.div
        variants={variants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="inline-block"
      >
        <Link href={href} {...rest} className={classes} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          <ButtonContent />
        </Link>
      </motion.div>
    );
  }

  const { size: _, variant: _variant, className: _className, children: _children, ...rest } = props as ButtonProps;
  return (
    <motion.button
      {...rest}
      className={classes}
      variants={variants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <ButtonContent />
    </motion.button>
  );
}
