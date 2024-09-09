import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface Administrators {
  id: string;
  name: string;
  email: string;
  profile: string;
}

export const administratorConverter = {
  toFirestore: (data: Administrators) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const admin = snap.data() as Administrators;
    return admin;
  },
};
