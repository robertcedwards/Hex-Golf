import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import { ScoreRecord } from '../types/game';

interface ScoreBannerProps {
  scores: ScoreRecord[];
}

const ScoreBanner: React.FC<ScoreBannerProps> = ({ scores }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || scores.length === 0) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="bg-blue-50 border-b border-blue-100"
    >
      <div className="max-w-6xl mx-auto p-4 relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-4 text-blue-400 hover:text-blue-600 transition-colors"
        >
          <X size={20} />
        </button>
        
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Previous Rounds</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-blue-600">
                <th className="px-4 py-2 text-left">Course</th>
                <th className="px-4 py-2 text-left">Score</th>
                <th className="px-4 py-2 text-left">Par</th>
                <th className="px-4 py-2 text-left">To Par</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {scores.slice().reverse().map((score, index) => {
                const toPar = score.score - score.par;
                const toParText = toPar === 0 ? "E" : toPar > 0 ? `+${toPar}` : toPar;
                
                return (
                  <tr key={index} className="text-blue-700">
                    <td className="px-4 py-2">{score.courseName}</td>
                    <td className="px-4 py-2">{score.score}</td>
                    <td className="px-4 py-2">{score.par}</td>
                    <td className="px-4 py-2">{toParText}</td>
                    <td className="px-4 py-2">
                      {new Date(score.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreBanner;