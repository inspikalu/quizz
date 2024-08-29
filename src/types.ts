export enum QuestionType {
  MultipleChoice = 1,
  TrueOrFalse,
}

export interface QuizzInterface {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  type: QuestionType;
}
