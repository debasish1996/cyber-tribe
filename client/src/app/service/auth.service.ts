import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthCredential,
  CreateProfile,
  UserState,
} from '../model/account.model';
import { URLs } from '../model/url.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  async signup(cred: AuthCredential) {
    return await this.http.post(URLs.SIGN_UP, cred).toPromise();
  }

  async login(cred: AuthCredential) {
    return await this.http.post(URLs.LOG_IN, cred).toPromise();
  }

  async logout() {
    return await this.http.get(URLs.LOG_OUT).toPromise();
  }

  async createProfile(payload: CreateProfile) {
    return await this.http.post(URLs.PROFILE, payload).toPromise();
  }

  async getUserState(): Promise<UserState> {
    return await this.http.get<UserState>(URLs.USER_STATE).toPromise();
  }
}
