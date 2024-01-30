import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../components/services/login.service';
import { RegisterService } from '../components/services/register.service';

const email: any = 'admin@gmail.com';
const password: any = 'admin@1';
@Component({
  selector: 'app-auths',
  templateUrl: './auths.component.html',
  styleUrls: ['./auths.component.css'],
})
export class AuthsComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService, private registerService: RegisterService) {}
  loginForm!: FormGroup;
  registerForm!: FormGroup
  shouldAddClass1 = false;
  shouldAddClass2 = true;
  password = false;
  ngOnInit(): void {
    (window as any).showSignIn = this.showSignIn.bind(this);

    this.createLoginForm();
    this.createRegisterForm();
  }
  // Set your condition to add a class

  togglePassword(input: HTMLInputElement) {
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('email'),
      password: new FormControl('password'),
    });
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('username'),
      email: new FormControl('email'),
      password: new FormControl('password'),
    });
  }
  inputData(data: any) {
    if (data != '') {
      this.shouldAddClass1 = false;
    }
  }
  inputPass(data: any) {
    if (data != '') {
      this.password = false;
    }
  }
  loginSubmit() {
    if (this.loginForm.value.email == '') {
      this.shouldAddClass1 = true;
    } else if (this.loginForm.value.password == '') {
      this.password = true;
    } else {
      this.loginService.login(this.loginForm.value).subscribe(
        (data: any) => {
          console.log('This is data', data);

          if (data.status == 1 ) {
            this.router.navigate(['dashboard']);
            localStorage.setItem(
              'username', data["username"]
            );
            localStorage.setItem('password', data['password']);
            this.succeAlart("Login");
          } else {
            this.failedAlert();
          }
        },
        (error: any) => {
          // Handle errors from the login request
          this.invalidAlart();
          // Perform actions based on the error, such as displaying an error message to the user
        }
      );
      if (
        this.loginForm.value.email === email &&
        this.loginForm.value.password == password
      ) {
      } else {
      }
    }
  }

  // Registration Services
  regSubmit() {
    if (this.registerForm.value.email == '') {
      this.shouldAddClass1 = true;
    } else if (this.registerForm.value.password == '') {
      this.password = true;
    } else {
      this.registerService.register(this.registerForm.value).subscribe(
        (data: any) => {
          console.log('This is data', data);

          if (data.status == 1) {
            this.succeAlart('Registration');
          } else {
            this.failedAlert();
          }
        },
        (error: any) => {
          // Handle errors from the login request
          this.invalidAlart();
          // Perform actions based on the error, such as displaying an error message to the user
        }
      );
      if (
        this.loginForm.value.email === email &&
        this.loginForm.value.password == password
      ) {
      } else {
      }
    }
  }

  succeAlart(name: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: name + ' in successfully',
    });
  }
  invalidAlart() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: 'Invalid Email Or Password',
    });
  }
  failedAlert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: 'Un Authorized',
    });
  }

  showSignIn() {
    const signupToggle = document.querySelector(
      '.signup-toggle'
    ) as HTMLElement;
    const signupForm = document.querySelector('.signupForm') as HTMLElement;
    const policy = document.querySelector('.policy') as HTMLElement;

    if (signupToggle && signupForm && policy) {
      signupToggle.style.display = 'none';
      signupForm.style.display = 'block';
      policy.style.visibility = 'visible';
    }
  }
}
