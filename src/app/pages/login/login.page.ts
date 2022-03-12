import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import firebase from 'firebase/compat/app';
import {UserService} from '../../services/user/user.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup ;

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              public fireAuth: AngularFireAuth) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async doLoginEmailPassword(): Promise<void>{
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    if(userCredential){
      const user = userCredential.user;
      // get from firestore!
      this.userService.user = {uid: user.uid, email: user.email, imageUrl: user.photoURL, name: user.displayName};
      await this.router.navigate(['/home']);
    }
  }

  redirectToRegister(): void{
    this.router.navigate(['/register']).then((r) => {});
  }

  redirectToPasswordRecovery(): void{
    this.router.navigate(['/password-recovery']).then((r) => {});
  }
}
