import { Component, OnInit } from '@angular/core';
import {List} from '../../models/list';
import {ActivatedRoute, Router} from '@angular/router';
import {ListService} from '../../services/list/list.service';
import {CreateTodoComponent} from '../../modals/create-todo/create-todo.component';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

  //public listDetails: List = undefined;
  public listId: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public listService: ListService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('id');
    this.listService.getListDoc(this.listId).get().subscribe((d)=>{
      console.log('d.data() => ',d.data());
      //this.listDetails = d.data();
      this.listService.selectedList = d.data();
    });
  }

  async openModal(){
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        listId: this.listId,
      }
    });
    await modal.present();
  }

  delete(indexTodo: number ): void {
    // Todo: Delete TODO!
    this.listService.selectedList.todos.splice(indexTodo,1);
    this.listService.updateListDoc(this.listId,this.listService.selectedList);
    //this.listService.deleteTodo(this.listDetails,indexTodo);
    //this.listDetails = this.listService.getOne(this.listId);
  }

  public selectTodo(todoId: number): void {
    this.router.navigate(['/todo-details', {idTodo: todoId, idList: this.listId}]).then(() =>{});
  }

  public exit(): void {
    this.listService.selectedList = undefined;
    this.router.navigate(['/home']).then(() => {});
  }
}
