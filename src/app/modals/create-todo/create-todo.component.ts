import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListService} from '../../services/list/list.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {

  todoForm: FormGroup;
  public listId;

  constructor(private modalController: ModalController,
              private fb: FormBuilder,
              public listService: ListService) { }

  ngOnInit() {

    this.todoForm = this.fb.group({
      nameTodo: ['', Validators.required],
      descriptionTodo: ['', Validators.required],
      isDoneTodo: [false]
    });
  }

  public addTodo(): void {
    if(this.todoForm.valid){
      this.listService.addTodo(this.listId, {name: this.todoForm.get('nameTodo').value, description: this.todoForm.get('descriptionTodo').value, isDone: this.todoForm.get('isDoneTodo').value})
        .then(()=> {
          this.listService.getListsUser();
          this.modalController.dismiss().then(r => {
          });
        }
     );
    }
  }

  public exit(): void {
    this.modalController.dismiss().then(r => {});
  }
}
