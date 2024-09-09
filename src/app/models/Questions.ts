import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface Questions {
  id: string;
  question: string;
  answer: string;
  choices: string[];
  type: 'REBUS_PUZZLE' | 'RIDDLES' | 'WORD_PUZZLE' | 'MATH_LOGIC_PUZZLE';
  createdAt: Date;
  updatedAt: Date;
}

export const questionConverter = {
  toFirestore: (data: Questions) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const question = snap.data() as Questions;
    question.createdAt = (question.createdAt as any).toDate();
    question.updatedAt = (question.updatedAt as any).toDate();
    return question;
  },
};
