import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, SignupComponent, ProfileComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
  providers: [AuthService],
})
export class AuthModule {}
