import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { Questions, questionConverter } from '../models/Questions';
import { v4 as uuidv4 } from 'uuid';
import { QUIZ_COLLECTION, QuizService } from './quiz.service';
import {
  Observable,
  catchError,
  combineLatest,
  forkJoin,
  throwError,
} from 'rxjs';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  Storage,
} from '@angular/fire/storage';
import { Quiz, quizConverter } from '../models/Quiz';
import { QuizWithQuestions } from '../models/QuizWithQuestions';
export const QUESTION_COLLECTION = 'questions';
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private quizService: QuizService
  ) {}

  async uploadFile(file: File) {
    try {
      const fireRef = ref(
        this.storage,
        `${QUIZ_COLLECTION}/questions/${uuidv4()}`
      );
      await uploadBytes(fireRef, file);
      const downloadURL = await getDownloadURL(fireRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
  addQuestion(quizID: string, question: Questions) {
    question.id = uuidv4();
    let ref = collection(
      this.firestore,
      `${QUIZ_COLLECTION}/${quizID}/${QUESTION_COLLECTION}`
    );
    return setDoc(doc(ref, question.id), question);
  }

  getAllQuestions(quizID: string): Observable<Questions[]> {
    let ref = collection(
      this.firestore,
      `${QUIZ_COLLECTION}/${quizID}/${QUESTION_COLLECTION}`
    ).withConverter(questionConverter);
    return collectionData(ref) as Observable<Questions[]>;
  }

  getQuizWithQuestions(quizID: string): Observable<QuizWithQuestions> {
    return combineLatest({
      quiz: this.quizService.getQuizById(quizID),
      questions: this.getAllQuestions(quizID),
    }) as Observable<QuizWithQuestions>;
  }
}
