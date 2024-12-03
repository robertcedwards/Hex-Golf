import { motion, AnimatePresence } from 'framer-motion';
import { GameMove } from '../types/game';
import { Trophy, X } from 'lucide-react';

interface GameStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;  // New prop for explicit reset
  score: number;
  par: number;
  moves: GameMove[];
}

const GameStatsModal: React.FC<GameStatsModalProps> = ({
  isOpen,
  onClose,
  onReset,
  score,
  par,
  moves,
}) => {
  const overPar = score - par;
  const parText = overPar === 0 ? "Par" : overPar > 0 ? `+${overPar}` : `${overPar}`;
  
  // Calculate statistics
  const successfulShots = moves.filter(move => move.success).length;
  const accuracy = moves.length > 0 ? Math.round((successfulShots / moves.length) * 100) : 0;
  
  // Count shots by club
  const shotsByClub = moves.reduce((acc: Record<string, number>, move) => {
    acc[move.club] = (acc[move.club] || 0) + 1;
    return acc;
  }, {});

  const handleClose = () => {
    onClose();
    onReset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-500 p-6 text-white relative">
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <Trophy className="w-12 h-12 mb-3" />
              <h2 className="text-2xl font-bold">Hole Completed!</h2>
              <p className="text-blue-100">Great game! Here are your stats.</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Main stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{score}</div>
                  <div className="text-sm text-gray-600">Strokes</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{parText}</div>
                  <div className="text-sm text-gray-600">To Par</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{accuracy}%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
              </div>

              {/* Club usage */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Clubs Used</h3>
                <div className="space-y-2">
                  {Object.entries(shotsByClub).map(([club, count]) => (
                    <div key={club} className="flex justify-between items-center">
                      <span className="text-gray-600">{club}</span>
                      <span className="font-semibold text-gray-800">{count} shots</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t">
              <button
                onClick={handleClose}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameStatsModal;