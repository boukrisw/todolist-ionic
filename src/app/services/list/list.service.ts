import { Injectable } from '@angular/core';
import {List} from '../../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  lists: List[] = [
    { name:'list 1',
      todos:[
        {name:'todo 1',description: 'description 1', isDone: false, id:32},
        {name:'todo 1 23',description: 'description 32', isDone: false, id:332}
      ]
    },
    { name:'list 2',
      todos:[
        {name:'todo 2',description: 'description 2', isDone: false, id:12}
      ]
    }
  ];
  constructor() { }
}
