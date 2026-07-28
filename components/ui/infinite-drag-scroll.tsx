import {
  animate,
  cubicBezier,
  motion,
  useMotionValue,
  wrap,
} from "motion/react";
import {
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

//Types
type variants = "default" | "masonry" | "polaroid";

// Create Context
const GridVariantContext = createContext<variants | undefined>(undefined);

//Motion Variants
const rowVariants = {
  initial: { opacity: 0, scale: 0.6 },
  animate: () => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: Math.random() * 0.3 + 0.1,
      duration: 0.8,
      ease: cubicBezier(0.18, 0.71, 0.11, 1),
    },
  }),
};

export const DraggableContainer = ({
  className,
  children,
  variant,
}: {
  className?: string;
  children: React.ReactNode;
  variant?: variants;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isDragging, setIsDragging] = useState(false);
  const handleIsDragging = () => setIsDragging(true);
  const handleIsNotDragging = () => setIsDragging(false);

  const dimsRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const updateDims = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        dimsRef.current = { width: rect.width, height: rect.height };
      }
    };

    updateDims();
    const observer = new ResizeObserver(updateDims);
    observer.observe(ref.current);

    const xDrag = x.on("change", (latest) => {
      const w = dimsRef.current.width;
      if (w <= 0) return;
      const halfW = w / 2;
      const wrappedX = wrap(-halfW, 0, latest);
      if (Math.abs(wrappedX - latest) > 0.5) {
        x.set(wrappedX);
      }
    });

    const yDrag = y.on("change", (latest) => {
      const h = dimsRef.current.height;
      if (h <= 0) return;
      const halfH = h / 2;
      const wrappedY = wrap(-halfH, 0, latest);
      if (Math.abs(wrappedY - latest) > 0.5) {
        y.set(wrappedY);
      }
    });

    const handleWheelScroll = (event: WheelEvent) => {
      if (!isDragging) {
        animate(y, y.get() - event.deltaY * 2.2, {
          type: "tween",
          duration: 0.8,
          ease: cubicBezier(0.18, 0.71, 0.11, 1),
        });
      }
    };

    window.addEventListener("wheel", handleWheelScroll, { passive: true });
    return () => {
      observer.disconnect();
      xDrag();
      yDrag();
      window.removeEventListener("wheel", handleWheelScroll);
    };
  }, [x, y, isDragging]);

  return (
    <GridVariantContext.Provider value={variant}>
      <div className="h-dvh w-dvw overflow-hidden select-none touch-none bg-[#0a0a0a]">
        <motion.div
          className="h-dvh w-dvw overflow-hidden [transform:translateZ(0)]"
        >
          <motion.div
            className={cn(
              "grid h-fit w-fit cursor-grab grid-cols-[repeat(2,1fr)] bg-[#0a0a0a] active:cursor-grabbing will-change-transform [transform:translateZ(0)] [backface-visibility:hidden]",
              className
            )}
            drag
            dragElastic={0}
            dragMomentum={true}
            dragTransition={{
              timeConstant: 160,
              power: 0.22,
              restDelta: 0.5,
              bounceStiffness: 0,
            }}
            onMouseDown={handleIsDragging}
            onMouseUp={handleIsNotDragging}
            onMouseLeave={handleIsNotDragging}
            onTouchStart={handleIsDragging}
            onTouchEnd={handleIsNotDragging}
            style={{ x, y }}
            ref={ref}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </GridVariantContext.Provider>
  );
};

export const GridItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const variant = useContext(GridVariantContext);

  const gridItemStyles = cva(
    "overflow-hidden hover:cursor-pointer w-full h-full will-change-transform [transform:translateZ(0)] [backface-visibility:hidden]",
    {
      variants: {
        variant: {
          default: "rounded-md shadow-md sm:shadow-lg",
          masonry: "even:mt-[40%] sm:even:mt-[60%] rounded-md shadow-md sm:shadow-lg",
          polaroid:
            "border-4 border-b-14 sm:border-8 sm:border-b-24 border-white shadow-lg sm:shadow-2xl even:rotate-2 sm:even:rotate-3 odd:-rotate-1 sm:odd:-rotate-2 hover:rotate-0 transition-transform ease-out duration-300 even:mt-[40%] sm:even:mt-[60%]",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  );

  return (
    <motion.div
      className={cn(gridItemStyles({ variant, className }))}
      variants={rowVariants}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
};

export const GridBody = memo(
  ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const variant = useContext(GridVariantContext);

    const gridBodyStyles = cva("grid grid-cols-[repeat(6,1fr)] h-fit w-fit", {
      variants: {
        variant: {
          default: "gap-6 p-4 sm:gap-14 sm:p-7 md:gap-28 md:p-14",
          masonry: "gap-x-6 px-4 sm:gap-x-14 sm:px-7 md:gap-x-28 md:px-14",
          polaroid: "gap-x-6 px-4 sm:gap-x-14 sm:px-7 md:gap-x-28 md:px-14",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    });

    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cn(gridBodyStyles({ variant, className }))}
          >
            {children}
          </div>
        ))}
      </>
    );
  }
);

GridBody.displayName = "GridBody";


