import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  orderBy,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { Quiz, quizConverter } from '../models/Quiz';
import { v4 as uuidv4 } from 'uuid';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
export const QUIZ_COLLECTION = 'quiz';
@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  createQuiz(quiz: Quiz) {
    quiz.id = uuidv4();
    return setDoc(
      doc(this.firestore, QUIZ_COLLECTION, quiz.id).withConverter(
        quizConverter
      ),
      quiz
    );
  }

  async uploadFile(file: File) {
    try {
      const fireRef = ref(this.storage, `${QUIZ_COLLECTION}/${uuidv4()}`);
      await uploadBytes(fireRef, file);
      const downloadURL = await getDownloadURL(fireRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  getAllQuiz(): Observable<Quiz[]> {
    const q = query(
      collection(this.firestore, QUIZ_COLLECTION).withConverter(quizConverter),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q) as Observable<Quiz[]>;
  }

  getQuizById(quizID: string): Observable<Quiz> {
    return docData(
      doc(this.firestore, QUIZ_COLLECTION, quizID)
    ) as Observable<Quiz>;
  }
}
