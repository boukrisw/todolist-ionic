import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreUserService {

  constructor(private afs: AngularFirestore) { }

  public addUser(user: User): void{
    this.afs.collection<User>('users').doc(user.uid).set(user)
      .then(() => {
        console.log('User added!');
      })
      .catch(() => {
        console.error('Error adding user!');
      });
  }
}
