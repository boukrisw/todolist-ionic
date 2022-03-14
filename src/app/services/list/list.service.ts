import { Injectable } from '@angular/core';
import {List} from '../../models/list';
import {UserService} from '../user/user.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {EMPTY, from, Observable} from 'rxjs';
import {Todo} from "../../models/todo";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  lists: List[] = [];// To delete
  public lists$: Observable<List[]> = EMPTY;

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

  public async getListsUser(): Promise<List[]>{
    const refDocList = this.afs.collection<List>('lists').ref;
    const query = refDocList.where('owner', '==', this.userService.user.uid);

    const res = query.get().then((querySnapshot)=>{
      return querySnapshot.docs.map((d)=>{
        return d.data();
      });
    }).then((data)=>{
      this.lists$ = from([data]);
      return data;
    });
    return res;
  }

  public async deleteList(l: List): Promise<void>{
    const refDocList = this.afs.collection<List>('lists').ref;
    const query = refDocList.where('owner', '==', this.userService.user.uid);

    const docRef = await query.get().then((querySnapshot)=>{
      return querySnapshot.docs
        .filter((d)=> d.data().name === l.name && d.data().owner === l.owner && d.data().todos.length === l.todos.length)
        .map((d)=>{ return d.id; });
    });

    if (docRef.length > 0){
      this.afs.collection<List>('lists').doc(docRef[0]).delete().then(() => {
        console.log('Document successfully deleted!');
        this.getListsUser();
      }).catch((error) => {
        console.error('Error removing document: ', error);
      });
    }
  }

  public async addTodo(listId: string, t: Todo): Promise<void> {
    const refDocList = this.afs.collection<List>('lists').ref;
    const query = refDocList.where('owner', '==', this.userService.user.uid);
    let l;
    this.lists$.subscribe((lists)=>{
      l = lists[listId];
    });
    const docRef = await query.get().then((querySnapshot)=>{
      return querySnapshot.docs
        .filter((d)=> d.data().name === l.name && d.data().owner === l.owner && d.data().todos.length === l.todos.length)
        .map((d)=>{ return d.id; });
    });

    if (docRef.length > 0){
      this.afs.collection<List>('lists').doc(docRef[0]).get().subscribe((l)=>{
        const newList = l.data();
        newList.todos.push(t);
        this.afs.collection<List>('lists').doc(docRef[0]).update(newList).then(() => {
          console.log('Document successfully updated!');
          this.getListsUser();
        }).catch((error) => {
          console.error('Error updating document: ', error);
        });
      });
    }

  }
}
