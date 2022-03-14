import {Todo} from './todo';

export class List {
  public name: string;
  public todos: Todo[];
  public owner: string;

  constructor(name: string, owner: string) {
    this.name = name;
    this.todos = [];
    this.owner = owner;
  }
}
