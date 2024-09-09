import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  doc,
  docData,
  endAt,
  endBefore,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  startAt,
  writeBatch,
} from '@angular/fire/firestore';
import { Questions, questionConverter } from '../models/Questions';
import { v4 as uuidv4 } from 'uuid';
import { QUIZ_COLLECTION, QuizService } from './quiz.service';
import {
  Observable,
  catchError,
  combineLatest,
  forkJoin,
  map,
  throwError,
} from 'rxjs';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  Storage,
  deleteObject,
} from '@angular/fire/storage';
import { Quiz, quizConverter } from '../models/Quiz';
import { QuizWithQuestions } from '../models/QuizWithQuestions';
import { HttpClient } from '@angular/common/http';
import { Riddles } from '../models/Riddles';
import { ADMINISTRATOR_COLLECTION, AuthService } from './auth.service';
import {
  QUESTION_SETTINGS_COLLECTION,
  QUESTION_SETTINGS_DOCUMENT,
  QuestionSettings,
  getQuestionType,
  questionSettingsConverter,
} from '../models/QuestionSettings';
export const QUESTION_COLLECTION = 'questions';
export interface QuestionsWithSettings {
  questions: Questions[];
  settings?: QuestionSettings;
}
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private storage: Storage,
    private quizService: QuizService,
    private httpClient: HttpClient
  ) {}

  getQuestionSettings() {
    return docData(
      doc(
        this.firestore,
        QUESTION_SETTINGS_COLLECTION,
        QUESTION_SETTINGS_DOCUMENT
      ).withConverter(questionSettingsConverter)
    );
  }
  getAllQuestionsWithSettings(): Observable<QuestionsWithSettings> {
    const q = query(
      collection(this.firestore, QUESTION_COLLECTION).withConverter(
        questionConverter
      ),
      orderBy('createdAt', 'desc'),
      orderBy('updatedAt', 'asc')
    );

    const listenToQuestions = collectionData(q) as Observable<Questions[]>;
    return combineLatest([listenToQuestions, this.getQuestionSettings()]).pipe(
      map(([questions, settings]) => ({ questions, settings }))
    );
  }
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

  async createQuestion(question: Questions, file: File) {
    return addDoc(collection(this.firestore, QUESTION_COLLECTION), question);

    // try {
    //   const batch = writeBatch(this.firestore);
    //   const docID = doc(collection(this.firestore, QUESTION_COLLECTION)).id;
    //   const url = await this.uploadFile(file);
    //   question.id = docID;
    //   question.question = url;
    //   batch.set(
    //     doc(this.firestore, QUESTION_COLLECTION, question.id),
    //     question
    //   );
    //   let type = getQuestionType(question.type);
    //   batch.update(
    //     doc(
    //       this.firestore,
    //       QUESTION_SETTINGS_COLLECTION,
    //       QUESTION_SETTINGS_DOCUMENT
    //     ),
    //     {
    //       [type]: arrayUnion(question.id),
    //     }
    //   );
    //   return batch.commit();
    // } catch (err) {
    //   throw err;
    // }
  }

  async deleteQuestion(question: Questions) {
    try {
      const batch = writeBatch(this.firestore);
      const type = getQuestionType(question.type);
      await deleteObject(ref(this.storage, question.question));
      batch.delete(doc(this.firestore, QUESTION_COLLECTION, question.id));
      batch.update(
        doc(
          this.firestore,
          QUESTION_SETTINGS_COLLECTION,
          QUESTION_SETTINGS_DOCUMENT
        ),
        {
          [type]: arrayRemove(question.id),
        }
      );
      return batch.commit();
    } catch (err) {
      throw err;
    }
  }
}
