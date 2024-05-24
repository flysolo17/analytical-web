import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface Questions {
  id: string;
  question: string;
  desc: string;
  photo: string;
  answer: string;
  points: number;
  choices: string[];
}

export const questionConverter = {
  toFirestore: (data: Questions) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const question = snap.data() as Questions;
    return question;
  },
};
