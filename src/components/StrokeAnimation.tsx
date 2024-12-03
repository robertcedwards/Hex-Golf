import { motion, AnimatePresence } from 'framer-motion';

interface StrokeAnimationProps {
  isVisible: boolean;
  success: boolean;
  onComplete?: () => void;
}

const StrokeAnimation: React.FC<StrokeAnimationProps> = ({ isVisible, success, onComplete }) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
        >
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            transition={{ duration: 0.5 }}
            className={`
              p-8 rounded-full
              ${success ? 'bg-green-500' : 'bg-red-500'}
              shadow-lg text-white font-bold text-2xl
            `}
          >
            {success ? 'Great Shot!' : 'Miss!'}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StrokeAnimation;