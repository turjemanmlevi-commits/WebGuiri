import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ThreeDMarqueeProps {
  images: string[];
  className?: string;
}

export function ThreeDMarquee({ images, className }: ThreeDMarqueeProps) {
  // Split images into 4 columns
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, i) =>
    images.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  return (
    <div
      className={cn('relative overflow-hidden w-full h-full', className)}
      style={{ perspective: '1000px' }}
    >
      <div
        className="flex flex-row gap-3 items-start justify-center w-full h-full"
        style={{
          transform: 'rotateX(20deg) rotateZ(-10deg)',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        {chunks.map((chunk, colIdx) => (
          <motion.div
            key={colIdx}
            className="flex flex-col gap-3 shrink-0"
            animate={{ y: colIdx % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
            transition={{
              duration: 14 + colIdx * 3,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            {[...chunk, ...chunk].map((src, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden border border-white/15 shadow-xl shrink-0"
                style={{ width: '110px', height: '75px' }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0C1E35] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0C1E35] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0C1E35] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0C1E35] to-transparent pointer-events-none z-10" />
    </div>
  );
}
