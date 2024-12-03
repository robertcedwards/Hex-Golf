import { HexTile, TileType } from '../types/game';

const GameLegend = () => {
  const tileTypes: { type: TileType; description: string }[] = [
    { type: 'tee', description: 'Starting position' },
    { type: 'fairway', description: 'Easy terrain' },
    { type: 'rough', description: '-1 accuracy' },
    { type: 'bunker', description: '-2 accuracy' },
    { type: 'water', description: 'Hazard - avoid!' },
    { type: 'green', description: 'Near the hole' },
    { type: 'hole', description: 'Target' },
  ];

  const getTileColor = (type: TileType) => {
    switch (type) {
      case 'tee': return 'bg-emerald-400 border-emerald-600';
      case 'fairway': return 'bg-green-400 border-green-600';
      case 'rough': return 'bg-green-700 border-green-800';
      case 'bunker': return 'bg-yellow-200 border-yellow-600';
      case 'water': return 'bg-blue-400 border-blue-600';
      case 'green': return 'bg-emerald-300 border-emerald-500';
      case 'hole': return 'bg-gray-800 border-gray-900';
      default: return 'bg-green-400 border-green-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-3">How to Play</h2>
      
      <div className="mb-4">
        <p className="text-gray-600 mb-2">1. Select a club (affects distance and accuracy)</p>
        <p className="text-gray-600 mb-2">2. Click a valid hex within range</p>
        <p className="text-gray-600 mb-2">3. Roll the dice - need to match or exceed the number shown</p>
        <p className="text-gray-600">4. Direction die affects final position (1-2 left, 3-4 straight, 5-6 right)</p>
      </div>

      <h3 className="font-semibold mb-2">Terrain Types</h3>
      <div className="grid grid-cols-1 gap-2">
        {tileTypes.map(({ type, description }) => (
          <div key={type} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded border ${getTileColor(type)}`} />
            <span className="text-sm">
              <span className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              {' - '}
              <span className="text-gray-600">{description}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLegend; 