import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from '@angular/fire/firestore';
import { combineLatest, map, merge, Observable, switchMap } from 'rxjs';
import { StudentWithSubmissions } from '../models/students/StudentWithSubmissions';
import { STUDENT_COLLECTION, StudentsService } from './students.service';
import { studentConverter, Students } from '../models/students/Student';
import {
  Submissions,
  submissionsConverter,
} from '../models/submissions/Submissions';
import { Category } from '../models/submissions/Category';
import { SubmissionWithStudent } from '../models/submissions/SubmissionWithStudent';

export const SUBMISSIONS_COLLECTIONS = 'submissions';
@Injectable({
  providedIn: 'root',
})
export class SubmissionsService {
  constructor(
    private firestore: Firestore,
    private studentService: StudentsService
  ) {}

  getAllSubmissions(): Observable<Submissions[]> {
    const q = query(
      collection(this.firestore, SUBMISSIONS_COLLECTIONS).withConverter(
        submissionsConverter
      ),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q);
  }
  getSttudentWithSubmissions(): Observable<StudentWithSubmissions[]> {
    let students$: Observable<Students[]> = this.studentService.getAllStudent();
    let submissions$: Observable<Submissions[]> = this.getAllSubmissions();

    return combineLatest([students$, submissions$]).pipe(
      map(([students, submissions]) => {
        return students.map((student) => {
          let studentSub = submissions.filter(
            (submission) => submission.studentID === student.id
          );
          // Calculate the highest points per level
          let levelPoints: { [levelId: string]: number } = {};

          studentSub.forEach((submission) => {
            let levelId = submission.quizInfo?.levels?.id;
            if (levelId) {
              levelPoints[levelId] = Math.max(
                levelPoints[levelId] || 0,
                submission.performance.earning
              );
            }
          });

          let totalPoints = Object.values(levelPoints).reduce(
            (sum, points) => sum + points,
            0
          );
          return {
            student: student,
            submissions: studentSub,
            totalMatches: studentSub.length,
            points: totalPoints,
          };
        });
      })
    );
  }

  getSubmissionWithStudent(): Observable<SubmissionWithStudent[]> {
    const submissionQuery = query(
      collection(this.firestore, SUBMISSIONS_COLLECTIONS).withConverter(
        submissionsConverter
      ),
      orderBy('createdAt', 'desc')
    );
    const submissions = collectionData(submissionQuery) as Observable<
      Submissions[]
    >;

    return new Observable<SubmissionWithStudent[]>((observer) => {
      submissions
        .pipe(
          map(async (data) => {
            const submissionWithStudents: SubmissionWithStudent[] = [];
            for (const e of data) {
              const studentID = e.studentID ?? '';
              const studentDoc = await getDoc(
                doc(
                  this.firestore,
                  STUDENT_COLLECTION,
                  studentID
                ).withConverter(studentConverter)
              );
              const student = studentDoc.exists() ? studentDoc.data() : null;

              if (student) {
                submissionWithStudents.push({
                  submission: e,
                  students: student,
                });
              }
            }
            observer.next(submissionWithStudents);
            observer.complete();
          })
        )
        .subscribe();
    });
  }

  getSubmissionsByQuiz(quizID: string): Observable<SubmissionWithStudent[]> {
    const submissionQuery = query(
      collection(this.firestore, SUBMISSIONS_COLLECTIONS).withConverter(
        submissionsConverter
      ),
      where('quizInfo.id', '==', quizID),
      orderBy('createdAt', 'desc')
    );

    return collectionData(submissionQuery).pipe(
      switchMap((submissions: Submissions[]) => {
        const studentObservables = submissions.map(async (submission) => {
          const sid = submission.studentID;
          if (sid == null) {
            return {
              submission: submission,
              students: null,
            };
          }

          const studentDoc = await getDoc(
            doc(this.firestore, STUDENT_COLLECTION, sid).withConverter(
              studentConverter
            )
          );
          const student = studentDoc.data() ?? null;

          return {
            submission: submission,
            students: student,
          } as SubmissionWithStudent;
        });

        return combineLatest(studentObservables);
      })
    );
  }
}
