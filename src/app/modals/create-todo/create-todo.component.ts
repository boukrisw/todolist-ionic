import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {

  todoForm: FormGroup;
  public idList;

  constructor(private modalController: ModalController,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      nameTodo: ['', Validators.required],
      descriptionTodo: ['', Validators.required],
      isDoneTodo: [false]
    });
  }

  public addTodo(): void {
    if(this.todoForm.valid){
      //this.listService.addTodo(this.idList, {name: this.todoForm.get('nameTodo').value, description: this.todoForm.get('descriptionTodo').value, isDone: this.todoForm.get('isDoneTodo').value})
      this.modalController.dismiss().then(r => {});
    }
  }

  public exit(): void {
    this.modalController.dismiss().then(r => {});
  }
}
