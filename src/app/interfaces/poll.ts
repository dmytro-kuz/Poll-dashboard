import { Questions } from './questions';

export interface Poll {
  id: string;
  questions: Questions[];
}
