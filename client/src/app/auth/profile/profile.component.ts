import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
  });
  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.profileForm.valid) return;
    this.auth.createProfile(this.profileForm.value).then((res) => {
      this.router.navigateByUrl('./app');
    });
  }

  ngOnInit(): void {}
}
