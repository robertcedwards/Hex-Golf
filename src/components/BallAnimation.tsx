import { motion, AnimatePresence } from 'framer-motion';
import { Position } from '../types/game';

interface BallAnimationProps {
  isVisible: boolean;
  start: Position;
  end: Position;
  success: boolean;
  onComplete: () => void;
}

const BallAnimation: React.FC<BallAnimationProps> = ({ 
  isVisible, 
  start, 
  end, 
  success,
  onComplete 
}) => {
  const hexToPixel = (q: number, r: number) => {
    const hexSize = 40;
    const x = hexSize * (Math.sqrt(3) * q + Math.sqrt(3)/2 * r);
    const y = hexSize * (3/2 * r);
    return { x, y };
  };

  const startPos = hexToPixel(start.x, start.y);
  const endPos = hexToPixel(end.x, end.y);

  // Calculate control point for curved trajectory
  const controlX = (startPos.x + endPos.x) / 2;
  const controlY = Math.min(startPos.y, endPos.y) - 100; // Arc height

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
        >
          <svg className="w-full h-full">
            <motion.circle
              cx={startPos.x}
              cy={startPos.y}
              r="8"
              className="fill-white stroke-2 stroke-gray-800"
              initial={{ 
                cx: startPos.x, 
                cy: startPos.y,
                opacity: 1
              }}
              animate={{
                opacity: [1, 1, 0],
                cx: [startPos.x, controlX, endPos.x],
                cy: [startPos.y, controlY, endPos.y],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
              onAnimationComplete={onComplete}
            />
            <motion.path
              d={`M ${startPos.x} ${startPos.y} Q ${controlX} ${controlY} ${endPos.x} ${endPos.y}`}
              className={`stroke-2 ${success ? 'stroke-green-500' : 'stroke-red-500'} fill-none`}
              initial={{ pathLength: 0, opacity: 0.5 }}
              animate={{ pathLength: 1, opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BallAnimation;