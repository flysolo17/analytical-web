import { Questions } from '../Questions';

export interface Levels {
  id: string;
  name: string;
  questions: number;
  points: number;
  timer: number;
}
