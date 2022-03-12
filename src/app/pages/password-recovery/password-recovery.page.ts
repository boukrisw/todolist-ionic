import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  passwordRecoveryForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              public fireAuth: AngularFireAuth) {}

  ngOnInit() {
    this.passwordRecoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  recoverPassword(): void {
    const email = this.passwordRecoveryForm.get('email').value;
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent!
        this.passwordRecoveryForm.setValue({email: ''});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  redirectToLogin(): void{
    this.router.navigate(['/login']).then((r) => {});
  }
}
