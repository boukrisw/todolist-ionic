import { Injectable } from '@angular/core';
import {List} from '../../models/list';
import {UserService} from '../user/user.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentSnapshot,
  QuerySnapshot
} from '@angular/fire/compat/firestore';
import {EMPTY, from, Observable} from 'rxjs';
import {Todo} from '../../models/todo';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public listDocuments$: Observable<QuerySnapshot<List>> = EMPTY; //Array of QueryDocumentSnapshot<List>
  public selectedList: List | undefined = undefined;

  constructor(private userService: UserService,
              private afs: AngularFirestore) {}

  public addList(listName: string){
    const newList: List = {name: listName, owner: this.userService.user.uid, todos:[]};

    this.afs.collection<List>('lists').add(newList)
      .then(() => {
        console.log('List added!');
        this.getListsUser();
      })
      .catch(() => {
        console.error('Error adding list!');
      });
  }

  public async getListsUser(): Promise<void>{
    const refDocList = this.afs.collection<List>('lists').ref;
    const query = refDocList.where('owner', '==', this.userService.user.uid);
    query.get().then((querySnapshot)=>{
      this.listDocuments$ = from([querySnapshot]);
      console.log('Change!');
    });
  }

  public getListDoc(idList: string): AngularFirestoreDocument<List>{
    return this.afs.collection<List>('lists').doc(idList);
  }

  public async deleteList(listId: string): Promise<void>{
    this.afs.collection<List>('lists').doc(listId).delete().then(() => {
      console.log('Document successfully deleted!');
      this.getListsUser();
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }

  public updateListDoc(idList: string, newList: List): void{
    this.afs.collection<List>('lists').doc(idList).update(newList).then(() => {});
  }

  public async addTodo(idList: string, t: Todo): Promise<void> {
    const refDocList = this.afs.collection<List>('lists').doc(idList).ref;

    await refDocList.get().then((d)=>{
      const newList = d.data();
      newList.todos.push(t);
      this.afs.collection<List>('lists').doc(idList).update(newList).then(() => {
        console.log('Document successfully updated!');
        this.getListsUser();
      }).catch((error) => {
        console.error('Error updating document: ', error);
      });
    });
  }
}
