import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiceRollProps {
  value: number;
  onRoll: () => void;
  disabled?: boolean;
  isRolling: boolean;
}

const DiceRoll: React.FC<DiceRollProps> = ({ value, onRoll, disabled, isRolling }) => {
  const getDiceIcon = () => {
    switch (value) {
      case 1: return <Dice1 size={48} />;
      case 2: return <Dice2 size={48} />;
      case 3: return <Dice3 size={48} />;
      case 4: return <Dice4 size={48} />;
      case 5: return <Dice5 size={48} />;
      case 6: return <Dice6 size={48} />;
      default: return <Dice1 size={48} />;
    }
  };

  return (
    <motion.button
      onClick={onRoll}
      disabled={disabled}
      className={`
        p-4 rounded-lg bg-white shadow-md
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
        transition-shadow
      `}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={value + (isRolling ? '-rolling' : '')}
          initial={{ rotateY: 0 }}
          animate={isRolling ? {
            rotateY: 360,
            transition: {
              duration: 0.5,
              repeat: 2,
              ease: "linear"
            }
          } : {
            rotateY: 0,
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
        >
          {getDiceIcon()}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default DiceRoll;