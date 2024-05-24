import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface Quiz {
  id: string;
  title: string;
  desc: string;
  cover_photo: string;
  subject: Subjects;
  type: QuizType;
  timer: number;
  createdAt: Date;
}

export enum QuizType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

export enum Subjects {
  MATH = 'MATH',
  ENGLISH = 'ENGLISH',
}
export const quizConverter = {
  toFirestore: (data: Quiz) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const quiz = snap.data() as Quiz;
    quiz.createdAt = (quiz.createdAt as any).toDate();
    return quiz;
  },
};
