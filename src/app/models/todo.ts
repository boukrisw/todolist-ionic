export class Todo {
  public name: string;
  public description: string;
  public isDone: boolean;
  public id: number;

  constructor(name: string, description: string, isDone: boolean, id: number) {
    this.name = name;
    this.description = description;
    this.isDone = isDone;
    this.id = id;
  }
}
