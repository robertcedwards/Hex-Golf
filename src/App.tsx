import { useState, useEffect } from 'react';
import './index.css';
import HexGrid from './components/HexGrid';
import Card from './components/Card';
import DiceRoll from './components/DiceRoll';
import DirectionDice from './components/DirectionDice';
import GameLog from './components/GameLog';
import CourseSelect from './components/CourseSelect';
import StrokeAnimation from './components/StrokeAnimation';
import BallAnimation from './components/BallAnimation';
import GameStatsModal from './components/GameStatsModal';
import ScoreBanner from './components/ScoreBanner';
import { GameState, Card as CardType, Position, GameMove, ScoreRecord } from './types/game';
import { courses } from './data/courses';
import GameLegend from './components/GameLegend';

const INITIAL_CARDS: CardType[] = [
  { id: '1', name: 'Driver', distance: 3, accuracy: 2 },
  { id: '2', name: 'Iron', distance: 2, accuracy: 3 },
  { id: '3', name: 'Wedge', distance: 1, accuracy: 4 },
  { id: '4', name: 'Putter', distance: 1, accuracy: 5 },
];

function App() {
  const [currentCourse, setCurrentCourse] = useState(courses[0]);
  const [gameState, setGameState] = useState<GameState>({
    playerPosition: currentCourse.startPosition,
    cards: INITIAL_CARDS,
    currentScore: 0,
    ballPosition: currentCourse.startPosition,
    holePosition: currentCourse.holePosition,
    moves: [],
  });

  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [accuracyDiceValue, setAccuracyDiceValue] = useState<number>(1);
  const [directionDiceValue, setDirectionDiceValue] = useState<number>(1);
  const [canRoll, setCanRoll] = useState<boolean>(false);
  const [validMoves, setValidMoves] = useState<Array<Position & { requiredRoll: number }>>([]);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [showStrokeAnimation, setShowStrokeAnimation] = useState<boolean>(false);
  const [lastStrokeSuccess, setLastStrokeSuccess] = useState<boolean>(false);
  const [selectedTarget, setSelectedTarget] = useState<Position | null>(null);
  const [showBallAnimation, setShowBallAnimation] = useState<boolean>(false);
  const [ballAnimationTarget, setBallAnimationTarget] = useState<Position | null>(null);
  const [showStatsModal, setShowStatsModal] = useState<boolean>(false);
  const [scoreHistory, setScoreHistory] = useState<ScoreRecord[]>([]);

  useEffect(() => {
    // Load score history from localStorage on mount
    const savedScores = localStorage.getItem('golfScores');
    if (savedScores) {
      setScoreHistory(JSON.parse(savedScores));
    }
  }, []);

  const saveScore = (score: number, par: number) => {
    const newScore: ScoreRecord = {
      courseName: currentCourse.name,
      score,
      par,
      timestamp: Date.now(),
    };
    
    const updatedScores = [...scoreHistory, newScore];
    setScoreHistory(updatedScores);
    localStorage.setItem('golfScores', JSON.stringify(updatedScores));
  };

  const calculateValidMoves = (card: CardType): Array<Position & { requiredRoll: number }> => {
    const { x, y } = gameState.ballPosition;
    const positions: Array<Position & { requiredRoll: number }> = [];
    
    for (let dx = -card.distance; dx <= card.distance; dx++) {
      for (let dy = -card.distance; dy <= card.distance; dy++) {
        if (Math.abs(dx) + Math.abs(dy) > card.distance) continue;
        
        const newX = x + dx;
        const newY = y + dy;
        
        const tile = currentCourse.tiles.find(t => t.x === newX && t.y === newY);
        if (tile && tile.type !== 'water') {
          let requiredRoll = card.accuracy;
          
          if (tile.type === 'rough') requiredRoll -= 1;
          if (tile.type === 'bunker') requiredRoll -= 2;
          
          requiredRoll = Math.max(1, Math.min(6, requiredRoll));
          
          positions.push({ x: newX, y: newY, requiredRoll });
        }
      }
    }
    
    return positions;
  };

  const calculateFinalPosition = (targetPos: Position, directionRoll: number): Position => {
    const { x: startX, y: startY } = gameState.ballPosition;
    const { x: targetX, y: targetY } = targetPos;
    
    let deviation = 0;
    if (directionRoll <= 2) deviation = -1;
    else if (directionRoll >= 5) deviation = 1;
    
    const dx = targetX - startX;
    const dy = targetY - startY;
    
    let finalX = targetX;
    let finalY = targetY;
    
    if (deviation !== 0) {
      if (Math.abs(dx) > Math.abs(dy)) {
        finalY += deviation;
      } else {
        finalX += deviation;
      }
    }
    
    const isFinalPositionValid = currentCourse.tiles.some(
      t => t.x === finalX && t.y === finalY && t.type !== 'water'
    );
    
    return isFinalPositionValid ? { x: finalX, y: finalY } : targetPos;
  };

  const handleCardSelect = (card: CardType) => {
    setSelectedCard(card);
    setSelectedTarget(null);
    setCanRoll(false);
    setValidMoves(calculateValidMoves(card));
  };

  const handleTileClick = (x: number, y: number) => {
    if (!selectedCard) return;
    
    const targetMove = validMoves.find(move => move.x === x && move.y === y);
    if (targetMove) {
      setSelectedTarget(targetMove);
      setCanRoll(true);
    }
  };

  const handleCourseSelect = (course: typeof currentCourse) => {
    setCurrentCourse(course);
    resetGame(course);
  };

  const resetGame = (course = currentCourse) => {
    setGameState({
      playerPosition: course.startPosition,
      cards: INITIAL_CARDS,
      currentScore: 0,
      ballPosition: course.startPosition,
      holePosition: course.holePosition,
      moves: [],
    });
    setSelectedCard(null);
    setSelectedTarget(null);
    setAccuracyDiceValue(1);
    setDirectionDiceValue(1);
    setCanRoll(false);
    setValidMoves([]);
    setIsRolling(false);
    setShowStrokeAnimation(false);
    setShowBallAnimation(false);
  };

  const handleStatsModalClose = () => {
    setShowStatsModal(false);
  };

  const handleDiceRoll = () => {
    if (!selectedCard || !selectedTarget || !canRoll) return;

    setIsRolling(true);
    setCanRoll(false);

    setTimeout(() => {
      const accuracyRoll = Math.floor(Math.random() * 6) + 1;
      const directionRoll = Math.floor(Math.random() * 6) + 1;
      
      setAccuracyDiceValue(accuracyRoll);
      setDirectionDiceValue(directionRoll);

      const targetMove = validMoves.find(
        move => move.x === selectedTarget.x && move.y === selectedTarget.y
      );
      
      const success = targetMove && accuracyRoll >= targetMove.requiredRoll;
      setLastStrokeSuccess(!!success);
      
      const finalPosition = calculateFinalPosition(selectedTarget, directionRoll);
      setBallAnimationTarget(finalPosition);
      
      const newMove: GameMove = {
        club: selectedCard.name,
        roll: accuracyRoll,
        success: !!success,
        directionRoll,
      };

      setShowStrokeAnimation(true);

      if (success) {
        setTimeout(() => {
          setShowStrokeAnimation(false);
          setShowBallAnimation(true);
          
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              ballPosition: finalPosition,
              currentScore: prev.currentScore + 1,
              moves: [...prev.moves, newMove],
            }));
            
            // Check for hole completion immediately after updating position
            if (
              finalPosition.x === gameState.holePosition.x &&
              finalPosition.y === gameState.holePosition.y
            ) {
              saveScore(gameState.currentScore + 1, currentCourse.par);
              setShowStatsModal(true);
            }
            
            setShowBallAnimation(false);
            setIsRolling(false);
            setSelectedTarget(null);
            setValidMoves([]);
            setSelectedCard(null);
          }, 1000);
        }, 1000);
      } else {
        setTimeout(() => {
          setShowStrokeAnimation(false);
          setGameState(prev => ({
            ...prev,
            currentScore: prev.currentScore + 1,
            moves: [...prev.moves, newMove],
          }));
          
          setIsRolling(false);
          setSelectedTarget(null);
          setValidMoves([]);
          setSelectedCard(null);
        }, 1000);
      }
    }, 1500);
  };

  // Effect to check for game completion
  useEffect(() => {
    const isBallInHole = 
      gameState.ballPosition.x === gameState.holePosition.x &&
      gameState.ballPosition.y === gameState.holePosition.y;
    
    if (isBallInHole) {
      saveScore(gameState.currentScore, currentCourse.par);
      setShowStatsModal(true);
    }
  }, [gameState.ballPosition, gameState.holePosition, gameState.currentScore, currentCourse.par]);

  return (
    <div className="min-h-screen bg-slate-50">
      <ScoreBanner scores={scoreHistory} />
      
      <div className="p-8">
        <StrokeAnimation 
          isVisible={showStrokeAnimation} 
          success={lastStrokeSuccess}
          onComplete={() => setShowStrokeAnimation(false)}
        />
        
        <GameStatsModal
          isOpen={showStatsModal}
          onClose={handleStatsModalClose}
          onReset={resetGame}
          score={gameState.currentScore}
          par={currentCourse.par}
          moves={gameState.moves}
        />
        
        {showBallAnimation && ballAnimationTarget && (
          <BallAnimation
            isVisible={showBallAnimation}
            start={gameState.ballPosition}
            end={ballAnimationTarget}
            success={lastStrokeSuccess}
            onComplete={() => setShowBallAnimation(false)}
          />
        )}
        
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">Hex Golf</h1>
            <div className="flex gap-4 items-center">
              <span className="text-xl font-semibold text-gray-700">
                Strokes: {gameState.currentScore} (Par {currentCourse.par})
              </span>
              <button
                onClick={() => resetGame()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Reset Hole
              </button>
            </div>
          </div>

          <CourseSelect
            courses={courses}
            selectedCourse={currentCourse}
            onSelectCourse={handleCourseSelect}
          />

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 bg-white rounded-xl shadow-lg p-4">
              <HexGrid
                tiles={currentCourse.tiles}
                ballPosition={gameState.ballPosition}
                holePosition={gameState.holePosition}
                validMoves={validMoves}
                selectedTarget={selectedTarget}
                onTileClick={handleTileClick}
              />
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Select Club</h3>
                    <div className="flex gap-4">
                      {gameState.cards.map(card => (
                        <Card
                          key={card.id}
                          card={card}
                          onSelect={() => handleCardSelect(card)}
                          isSelected={selectedCard?.id === card.id}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2 text-center">Roll Dice</h3>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block mb-1">Accuracy</span>
                        <DiceRoll
                          value={accuracyDiceValue}
                          onRoll={handleDiceRoll}
                          disabled={!canRoll || !selectedCard || !selectedTarget}
                          isRolling={isRolling}
                        />
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block mb-1">Direction</span>
                        <DirectionDice
                          value={directionDiceValue}
                          onRoll={handleDiceRoll}
                          disabled={!canRoll || !selectedCard || !selectedTarget}
                          isRolling={isRolling}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-1 space-y-4">
              <GameLegend />
              <GameLog moves={gameState.moves} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;