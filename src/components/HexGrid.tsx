import { useMemo } from 'react';
import { HexTile } from '../types/game';

interface HexGridProps {
  tiles: HexTile[];
  ballPosition: { x: number; y: number };
  holePosition: { x: number; y: number };
  validMoves?: { x: number; y: number; requiredRoll: number }[];
  selectedTarget?: { x: number; y: number } | null;
  onTileClick?: (x: number, y: number) => void;
}

const HexGrid: React.FC<HexGridProps> = ({ 
  tiles, 
  ballPosition, 
  holePosition, 
  validMoves = [], 
  selectedTarget,
  onTileClick 
}) => {
  const hexSize = 40;
  
  // Updated hex-to-pixel conversion for pointy-topped hexagons
  const hexToPixel = (q: number, r: number) => {
    const x = hexSize * (Math.sqrt(3) * q + Math.sqrt(3)/2 * r);
    const y = hexSize * (3/2 * r);
    return { x, y };
  };

  const getTileColor = (type: HexTile['type']) => {
    switch (type) {
      case 'tee': return 'fill-emerald-400 stroke-emerald-600';
      case 'fairway': return 'fill-green-400 stroke-green-600';
      case 'rough': return 'fill-green-700 stroke-green-800';
      case 'bunker': return 'fill-yellow-200 stroke-yellow-600';
      case 'water': return 'fill-blue-400 stroke-blue-600';
      case 'green': return 'fill-emerald-300 stroke-emerald-500';
      case 'hole': return 'fill-gray-800 stroke-gray-900';
      default: return 'fill-green-400 stroke-green-600';
    }
  };

  // Updated hexPoints for pointy-topped hexagons
  const hexPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angleDeg = 60 * i - 30; // Start at -30 degrees for pointy-top
      const angleRad = (Math.PI / 180) * angleDeg;
      points.push([
        hexSize * Math.cos(angleRad),
        hexSize * Math.sin(angleRad)
      ]);
    }
    return points.map(point => point.join(',')).join(' ');
  }, [hexSize]);

  const getValidMove = (x: number, y: number) => {
    return validMoves.find(move => move.x === x && move.y === y);
  };

  const isSelectedTarget = (x: number, y: number) => {
    return selectedTarget?.x === x && selectedTarget?.y === y;
  };

  // Calculate bounds for better centering
  const bounds = useMemo(() => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    tiles.forEach(tile => {
      const pos = hexToPixel(tile.x, tile.y);
      minX = Math.min(minX, pos.x);
      maxX = Math.max(maxX, pos.x);
      minY = Math.min(minY, pos.y);
      maxY = Math.max(maxY, pos.y);
    });
    return { minX, maxX, minY, maxY };
  }, [tiles]);

  const width = bounds.maxX - bounds.minX + hexSize * 3;
  const height = bounds.maxY - bounds.minY + hexSize * 3;
  const centerX = (bounds.maxX + bounds.minX) / 2;
  const centerY = (bounds.maxY + bounds.minY) / 2;

  return (
    <svg 
      className="w-full h-[500px]" 
      viewBox={`${centerX - width/2} ${centerY - height/2} ${width} ${height}`}
    >
      {tiles.map((tile) => {
        const pos = hexToPixel(tile.x, tile.y);
        const validMove = getValidMove(tile.x, tile.y);
        const isSelected = isSelectedTarget(tile.x, tile.y);

        return (
          <g 
            key={tile.id} 
            transform={`translate(${pos.x}, ${pos.y})`}
            onClick={() => validMove && onTileClick?.(tile.x, tile.y)}
            className={validMove ? 'cursor-pointer' : ''}
          >
            {/* Base hex tile */}
            <polygon
              points={hexPoints}
              className={`${getTileColor(tile.type)} stroke-2`}
            />
            
            {/* Valid move indicator */}
            {validMove && (
              <polygon
                points={hexPoints}
                className={`${isSelected 
                  ? 'fill-blue-500 opacity-40 stroke-blue-600' 
                  : 'fill-blue-300 opacity-30 stroke-blue-500'
                } stroke-2`}
              />
            )}
            
            {/* Required roll display for valid moves */}
            {validMove && (
              <text
                x="0"
                y="0"
                textAnchor="middle"
                alignmentBaseline="middle"
                className="text-[14px] fill-gray-900 font-bold select-none"
              >
                {validMove.requiredRoll}+
              </text>
            )}
            
            {/* Tile type label (only show if not a valid move) */}
            {!validMove && (
              <text
                x="0"
                y="0"
                textAnchor="middle"
                alignmentBaseline="middle"
                className="text-[10px] fill-gray-700 font-semibold select-none"
              >
                {tile.type.charAt(0).toUpperCase()}
              </text>
            )}
          </g>
        );
      })}
      
      {/* Ball */}
      <g transform={`translate(${hexToPixel(ballPosition.x, ballPosition.y).x}, ${hexToPixel(ballPosition.x, ballPosition.y).y})`}>
        <circle
          r="8"
          className="fill-white stroke-gray-800 stroke-2"
        />
        <circle
          r="6"
          className="fill-white"
        />
      </g>
      
      {/* Hole */}
      <g transform={`translate(${hexToPixel(holePosition.x, holePosition.y).x}, ${hexToPixel(holePosition.x, holePosition.y).y})`}>
        <circle
          r="6"
          className="fill-black"
        />
        <circle
          r="4"
          className="fill-gray-900"
        />
      </g>
    </svg>
  );
};

export default HexGrid;