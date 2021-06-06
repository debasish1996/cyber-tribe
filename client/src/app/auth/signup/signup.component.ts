import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  signUp() {
    if (this.signupForm.valid) {
      this.auth.signup(this.signupForm.value).then((res) => {
        this.router.navigate(['../', 'profile'], { relativeTo: this.route });
      });
    }
  }

  goToLogin() {
    this.router.navigate(['../', 'login'], { relativeTo: this.route });
  }
}
