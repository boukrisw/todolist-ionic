import {Todo} from './todo';

export class List {
  public name: string;
  public todos: Todo[];

    constructor(name: string) {
      this.name = name;
      this.todos = [];
    }
}
