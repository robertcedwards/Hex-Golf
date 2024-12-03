import { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  onSelect: () => void;
  isSelected?: boolean;
}

const Card: React.FC<CardProps> = ({ card, onSelect, isSelected }) => {
  return (
    <button
      onClick={onSelect}
      className={`
        w-32 h-48 rounded-lg p-4 flex flex-col gap-2
        ${isSelected ? 'border-4 border-blue-500' : 'border border-gray-300'}
        bg-white shadow-md hover:shadow-lg transition-shadow
      `}
    >
      <h3 className="font-bold text-lg">{card.name}</h3>
      <div className="text-sm">
        <p>Distance: {card.distance}</p>
        <p>Accuracy: {card.accuracy}</p>
      </div>
    </button>
  );
};

export default Card;