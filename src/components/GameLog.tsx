import React from 'react';
import { GameMove } from '../types/game';

interface GameLogProps {
  moves: GameMove[];
}

const GameLog: React.FC<GameLogProps> = ({ moves }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">Game Log</h2>
      <div className="overflow-auto max-h-[300px]">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Turn</th>
              <th className="px-4 py-2 text-left">Club</th>
              <th className="px-4 py-2 text-left">Accuracy</th>
              <th className="px-4 py-2 text-left">Direction</th>
              <th className="px-4 py-2 text-left">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {moves.map((move, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{move.club}</td>
                <td className="px-4 py-2">{move.roll}</td>
                <td className="px-4 py-2">{move.directionRoll}</td>
                <td className="px-4 py-2">
                  {move.success ? (
                    <span className="text-green-600">Success</span>
                  ) : (
                    <span className="text-red-600">Miss</span>
                  )}
                </td>
              </tr>
            ))}
            {moves.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                  No moves yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameLog;