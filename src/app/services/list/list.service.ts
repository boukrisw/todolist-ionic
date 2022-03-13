import { Injectable } from '@angular/core';
import {List} from '../../models/list';
import {UserService} from '../user/user.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {EMPTY, from, Observable} from 'rxjs';

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


}
