export class Todo {
  public name: string;
  public description: string;
  public isDone: boolean;

  constructor(name: string, description: string, isDone: boolean) {
    this.name = name;
    this.description = description;
    this.isDone = isDone;
  }
}
