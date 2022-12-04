import { Data } from './data';

export interface Questions {
  data: Data[];
  questionId: string;
  question: string;
  total: number;
}
