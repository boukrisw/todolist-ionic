import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../../models/todo';
import {ActivatedRoute, Router} from '@angular/router';
import {ListService} from '../../services/list/list.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  public listId: number;
  public todoId: number;
  public todo: Todo;

  todoForm: FormGroup;

  constructor( private fb: FormBuilder,
               private listService: ListService,
               private route: ActivatedRoute,
               private router: Router,
               private location: Location) { }

  ngOnInit() {
    this.listId = Number(this.route.snapshot.paramMap.get('listId'));
    this.todoId = Number(this.route.snapshot.paramMap.get('idTodo'));

    this.todo = this.listService.selectedList[this.listId].todos[this.todoId];
    this.todoForm = this.fb.group({
      nameTodo: [this.todo.name, Validators.required],
      descriptionTodo: [this.todo.description, Validators.required],
      isDoneTodo: [this.todo.isDone]
    });
  }

  public updateTodo(): void{
    this.location.back();
    /*this.listService.updateTodo(this.listId,this.todoId, {name: this.todoForm.get('nameTodo').value,
      description: this.todoForm.get('descriptionTodo').value,
      isDone: this.todoForm.get('isDoneTodo').value})*/
    //this.router.navigate(["."]);
  }

  public exit(): void{
    this.location.back();
  }

}
