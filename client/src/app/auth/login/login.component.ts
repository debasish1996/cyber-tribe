import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private ns: AlertService
  ) {}

  ngOnInit(): void {}

  async signIn() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      try {
        await this.auth.login(this.loginForm.value);
        this.isLoading = false;
        this.router.navigateByUrl('/app');
      } catch (error) {
        this.isLoading = false;
        this.ns.error('Wrong Password.');
        console.log(error);
      }
    }
  }

  goToCreate() {
    this.router.navigate(['../', 'signup'], { relativeTo: this.route });
  }
}
