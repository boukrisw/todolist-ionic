import { Component } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router,
              private userService: UserService,
              public fireAuth: AngularFireAuth) {}

  logOut(){
    firebase.auth().signOut().then(() => this.router.navigate(['/login']) );
  }
}
