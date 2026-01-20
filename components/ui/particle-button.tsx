"use client" 

import * as React from "react"
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";

interface ParticleButtonProps extends ButtonProps {
    onSuccess?: () => void;
    successDuration?: number;
}

function SuccessParticles({
    buttonRef,
}: {
    buttonRef: React.RefObject<HTMLButtonElement>;
}) {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return (
        <AnimatePresence>
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="fixed w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[100]"
                    style={{ 
                        left: centerX, 
                        top: centerY,
                        boxShadow: "0 0 10px rgba(34, 211, 238, 0.8)"
                    }}
                    initial={{
                        scale: 0,
                        x: 0,
                        y: 0,
                    }}
                    animate={{
                        scale: [0, 1.2, 0],
                        x: [0, (Math.random() - 0.5) * 150],
                        y: [0, (Math.random() - 0.5) * 150],
                    }}
                    transition={{
                        duration: 0.8,
                        delay: Math.random() * 0.1,
                        ease: "circOut",
                    }}
                />
            ))}
        </AnimatePresence>
    );
}

function ParticleButton({
    children,
    onClick,
    onSuccess,
    successDuration = 800,
    className,
    ...props
}: ParticleButtonProps) {
    const [showParticles, setShowParticles] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowParticles(true);
        if (onClick) onClick(e);

        setTimeout(() => {
            setShowParticles(false);
        }, successDuration);
    };

    return (
        <>
            {showParticles && <SuccessParticles buttonRef={buttonRef as React.RefObject<HTMLButtonElement>} />}
            <Button
                ref={buttonRef}
                onClick={handleClick}
                className={cn(
                    "relative overflow-hidden",
                    showParticles && "scale-95 shadow-inner",
                    "transition-all duration-100",
                    className
                )}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>
                {showParticles && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-cyan-400/20 mix-blend-overlay pointer-events-none"
                    />
                )}
            </Button>
        </>
    );
}

export { ParticleButton }