export type TileType = 'tee' | 'fairway' | 'rough' | 'bunker' | 'water' | 'green' | 'hole';

export interface HexTile {
  id: string;
  type: TileType;
  x: number;
  y: number;
}

export interface Card {
  id: string;
  name: string;
  distance: number;
  accuracy: number;
}

export interface GameState {
  playerPosition: { x: number; y: number };
  cards: Card[];
  currentScore: number;
  ballPosition: { x: number; y: number };
  holePosition: { x: number; y: number };
  moves: GameMove[];
}

export interface Position {
  x: number;
  y: number;
}

export interface GameMove {
  club: string;
  roll: number;
  success: boolean;
  directionRoll: number;
}

export interface ScoreRecord {
  courseName: string;
  score: number;
  par: number;
  timestamp: number;
}