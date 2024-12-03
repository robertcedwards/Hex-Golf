import { HexTile } from '../types/game';

export interface Course {
  id: string;
  name: string;
  description: string;
  par: number;
  tiles: HexTile[];
  startPosition: { x: number; y: number };
  holePosition: { x: number; y: number };
}

export const courses: Course[] = [
  {
    id: 'classic',
    name: 'Classic Par 4',
    description: 'A straightforward challenge with strategic hazards',
    par: 4,
    startPosition: { x: -4, y: 2 },
    holePosition: { x: 4, y: -2 },
    tiles: [
      // Center tiles
      { id: '1', type: 'tee', x: -4, y: 2 },
      { id: '2', type: 'fairway', x: -3, y: 1 },
      { id: '3', type: 'fairway', x: -2, y: 0 },
      { id: '4', type: 'fairway', x: -1, y: 0 },
      { id: '5', type: 'fairway', x: 0, y: 0 },
      { id: '6', type: 'fairway', x: 1, y: -1 },
      { id: '7', type: 'fairway', x: 2, y: -1 },
      { id: '8', type: 'green', x: 3, y: -2 },
      { id: '9', type: 'hole', x: 4, y: -2 },
      
      // Surrounding hazards and rough
      { id: '10', type: 'rough', x: -3, y: 2 },
      { id: '11', type: 'bunker', x: -2, y: 1 },
      { id: '12', type: 'water', x: -1, y: 1 },
      { id: '13', type: 'rough', x: 0, y: 1 },
      { id: '14', type: 'bunker', x: 1, y: 0 },
      { id: '15', type: 'rough', x: 2, y: -2 },
      { id: '16', type: 'bunker', x: 3, y: -1 },
      { id: '17', type: 'rough', x: 4, y: -1 },
      
      // Additional surrounding tiles
      { id: '18', type: 'rough', x: -4, y: 1 },
      { id: '19', type: 'rough', x: -3, y: 0 },
      { id: '20', type: 'rough', x: -2, y: -1 },
      { id: '21', type: 'rough', x: -1, y: -1 },
      { id: '22', type: 'rough', x: 0, y: -1 },
      { id: '23', type: 'rough', x: 1, y: -2 },
      { id: '24', type: 'rough', x: 2, y: 0 },
    ]
  },
  {
    id: 'island',
    name: 'Island Green',
    description: 'A challenging short hole surrounded by water',
    par: 3,
    startPosition: { x: -2, y: 0 },
    holePosition: { x: 2, y: 0 },
    tiles: [
      { id: '1', type: 'tee', x: -2, y: 0 },
      { id: '2', type: 'fairway', x: -1, y: 0 },
      { id: '3', type: 'green', x: 1, y: 0 },
      { id: '4', type: 'hole', x: 2, y: 0 },
      // Water hazards
      { id: '5', type: 'water', x: 0, y: 1 },
      { id: '6', type: 'water', x: 1, y: 1 },
      { id: '7', type: 'water', x: 2, y: 1 },
      { id: '8', type: 'water', x: 0, y: -1 },
      { id: '9', type: 'water', x: 1, y: -1 },
      { id: '10', type: 'water', x: 2, y: -1 },
      { id: '11', type: 'water', x: 0, y: 0 },
    ]
  },
  {
    id: 'dogleg',
    name: 'Sharp Dogleg',
    description: 'A challenging dogleg right with strategic bunkers',
    par: 4,
    startPosition: { x: -3, y: 0 },
    holePosition: { x: 0, y: 3 },
    tiles: [
      // Main path
      { id: '1', type: 'tee', x: -3, y: 0 },
      { id: '2', type: 'fairway', x: -2, y: 0 },
      { id: '3', type: 'fairway', x: -1, y: 0 },
      { id: '4', type: 'fairway', x: 0, y: 0 },
      { id: '5', type: 'fairway', x: 0, y: 1 },
      { id: '6', type: 'fairway', x: 0, y: 2 },
      { id: '7', type: 'green', x: 0, y: 3 },
      // Hazards
      { id: '8', type: 'bunker', x: -1, y: 1 },
      { id: '9', type: 'water', x: 1, y: 0 },
      { id: '10', type: 'bunker', x: -1, y: 2 },
      { id: '11', type: 'rough', x: 1, y: 1 },
      { id: '12', type: 'rough', x: 1, y: 2 },
      { id: '13', type: 'rough', x: -2, y: 1 },
      { id: '14', type: 'rough', x: -2, y: -1 },
      { id: '15', type: 'rough', x: -1, y: -1 },
      { id: '16', type: 'rough', x: 0, y: -1 },
    ]
  }
];