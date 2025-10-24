import { lazy, Suspense, ComponentType } from "react";
import type { MotionProps } from "framer-motion";

const MotionDiv = lazy(() => import("framer-motion").then(m => ({ 
  default: m.motion.div as ComponentType<MotionProps & { children?: React.ReactNode; className?: string }> 
})));

export function LazyMotion({ children, fallback = null, ...props }: MotionProps & { children?: React.ReactNode; className?: string; fallback?: React.ReactNode }) {
  return (
    <Suspense fallback={fallback || <div className={props.className}>{children}</div>}>
      <MotionDiv {...props}>
        {children}
      </MotionDiv>
    </Suspense>
  );
}

export { motion } from "framer-motion";
