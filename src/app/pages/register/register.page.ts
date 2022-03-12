import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {FirestoreUserService} from '../../services/user/firestore-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              public fireAuth: AngularFireAuth,
              private firestoreUserService: FirestoreUserService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  async register(): Promise<void> {
    const fullName = this.registerForm.get('fullName').value;
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    const confirmPassword = this.registerForm.get('confirmPassword').value;
    if(password === confirmPassword){
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if(userCredential){
        const user = userCredential.user;
        this.firestoreUserService.addUser({uid: user.uid, email: user.email, imageUrl: null, name: fullName});
        await firebase.auth().currentUser.sendEmailVerification();
        await firebase.auth().currentUser.updateProfile({displayName: fullName});
        await firebase.auth().signOut();
        await this.router.navigate(['/login']);
      }
    }
  }

  redirectToLogin(): void{
    this.router.navigate(['/login']).then((r) => {});
  }
}
