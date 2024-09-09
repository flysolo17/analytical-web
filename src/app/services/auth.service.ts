import { Injectable } from '@angular/core';
import {
  Auth,
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signOut,
  updatePassword,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from '@angular/fire/firestore';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  Administrators,
  administratorConverter,
} from '../models/Administrator';
import { each } from 'chart.js/dist/helpers/helpers.core';
export const ADMINISTRATOR_COLLECTION = 'administrators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private adminSubject: BehaviorSubject<Administrators | null> =
    new BehaviorSubject<Administrators | null>(null);
  public administrator$: Observable<Administrators | null> =
    this.adminSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  setAdmin(admin: Administrators | null) {
    this.adminSubject.next(admin);
  }

  async getAdminInfo(email: string): Promise<Administrators | null> {
    const q = query(
      collection(this.firestore, ADMINISTRATOR_COLLECTION).withConverter(
        administratorConverter
      ),
      where('email', '==', email),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    } else {
      return querySnapshot.docs[0].data();
    }
  }

  forgotPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  async changePassword(oldPassword: string, newPassword: string) {
    try {
      const user = this.auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(
          user.email || '',
          oldPassword
        );

        let result = await reauthenticateWithCredential(user, credential);

        return updatePassword(result.user, newPassword);
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      throw new Error('Error changing password:');
    }
  }
  listenToAdmin(email: string): Observable<Administrators | null> {
    const q = query(
      collection(this.firestore, ADMINISTRATOR_COLLECTION).withConverter(
        administratorConverter
      ),
      where('email', '==', email),
      limit(1)
    );
    return collectionData(q, { idField: 'id' }).pipe(
      map((admins) => {
        if (admins.length === 0) {
          return null;
        } else {
          return admins[0];
        }
      })
    );
  }
}
