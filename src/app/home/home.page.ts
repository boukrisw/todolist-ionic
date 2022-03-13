import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {CreateListComponent} from '../modals/create-list/create-list.component';
import {List} from '../models/list';
import {ListService} from '../services/list/list.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  list: List[] = [];

  constructor(private router: Router,
              private userService: UserService,
              public listService: ListService,
              public fireAuth: AngularFireAuth,
              private modalController: ModalController) {}


  ngOnInit(): void {
    this.list = this.listService.lists;
  }

  public selectList(todoId: number): void {
    this.router.navigate(['/list-details', { id: todoId }]);
  }

  public delete(l: List): void{
    //this.listService.deleteList(l);
    //this.list = this.listService.getAll(); // PAS BESOIN Mais pour etre sur!
  }

  async openModal(){
    const modal = await this.modalController.create({
      component: CreateListComponent
    });
    await modal.present();
    //this.list = this.listService.getAll(); // PAS BESOIN Mais pour etre sur!
    this.list = this.listService.lists;
  }

  logOut(){
    firebase.auth().signOut().then(() => this.router.navigate(['/login']) );
  }

}
