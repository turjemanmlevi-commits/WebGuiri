import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ThreeDMarqueeProps {
  images: string[];
  className?: string;
}

export function ThreeDMarquee({ images, className }: ThreeDMarqueeProps) {
  // 4 columns, duplicate for seamless loop
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, i) =>
    images.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  return (
    <div
      className={cn('relative w-full h-full overflow-hidden', className)}
      style={{ perspective: '800px' }}
    >
      {/* 3D grid container */}
      <div
        className="absolute inset-0 flex flex-row items-start justify-center gap-4 px-4"
        style={{
          transform: 'rotateX(18deg) rotateZ(-12deg) scale(1.3)',
          transformStyle: 'preserve-3d',
          transformOrigin: '50% 30%',
          top: '-10%',
          height: '120%',
        }}
      >
        {chunks.map((chunk, colIdx) => (
          <motion.div
            key={colIdx}
            className="flex flex-col gap-4 shrink-0"
            style={{ width: '160px' }}
            animate={{ y: colIdx % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
            transition={{
              duration: 12 + colIdx * 4,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            {[...chunk, ...chunk].map((src, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl shrink-0"
                style={{ width: '160px', height: '110px' }}
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

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#0C1E35] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0C1E35] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0C1E35] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0C1E35] to-transparent pointer-events-none z-10" />
    </div>
  );
}
