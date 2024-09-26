import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  loginType: string = '';
  alert:boolean=false;

  handleLoginType(_loginType: string) {
    this.loginType = _loginType;
  }

  myForm: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]+$')]),
    password: new FormControl('',[Validators.required,Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]+$')]),
  });

  user: any = null;

  get userVal(){
    return this.myForm.get('username');
  }

  get passVal(){
    return this.myForm.get('password');
  }

  closeAlert(){
      this.alert=false
  }
  onSubmit(form: FormGroup) {
    const { username, password } = form.value;
    this.authService.validateUser(username, password, this.loginType).subscribe(
      (data) => {
        this.user = data;
         if (this.user.data) {
          this.user = this.user.data;
          console.log(this.user);
          this.authService.persistUser(this.user); // save user to local storage

          if (this.user.role === 'student') {
            this.router.navigate(['/student']);
          } else if (this.user.role === 'teacher') {
            this.router.navigate(['/home']);
          } else {
            console.log('invalid credentials');
          }
        }
      },
      (err) => {
        this.alert=true
        console.log(err);
      }
    );
  }
}
