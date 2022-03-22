import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {CreateListComponent} from '../modals/create-list/create-list.component';
import {List} from '../models/list';
import {ListService} from '../services/list/list.service';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  constructor(private router: Router,
              private userService: UserService,
              public listService: ListService,
              public fireAuth: AngularFireAuth,
              private modalController: ModalController) {}


  async ngOnInit(): Promise<void> {
    await this.listService.getListsUser().then(()=>{
      console.log(this.listService.listDocuments$);

      this.listService.listDocuments$.subscribe((d)=>{
        console.log('d.data()  :',d.docs);
        /*d.map((e,i)=>{
          console.log('i :' ,i,' => ', e.data());
        });*/
      });
    });
  }

  public selectList(todoId: string): void {
    this.router.navigate(['/list-details', { id: todoId }]);
  }

  public delete(listId: string): void{
    //this.listService.deleteList(l);
    //this.list = this.listService.getAll(); // PAS BESOIN Mais pour etre sur!
    console.log(' HomePage Delete');
    this.listService.deleteList(listId);
  }

  async openModal(){
    const modal = await this.modalController.create({
      component: CreateListComponent
    });
    await modal.present();
  }

  logOut(){
    firebase.auth().signOut().then(() => {
      this.userService.user = undefined;
      this.router.navigate(['/login']).then(() =>{});
    });
  }
}
