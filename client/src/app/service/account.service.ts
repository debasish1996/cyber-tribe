import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../model/account.model';
import { URLs } from '../model/url.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  account: Profile;
  constructor(private http: HttpClient) {}

  async getMe(forceUpdate?: boolean) {
    if (this.account && !forceUpdate) return this.account;
    this.account = await this.http.get<Profile>(URLs.ME).toPromise();
    return this.account;
  }

  async getUserProfile(uid: string) {
    const URL = `${URLs.PROFILE}/${uid}`;
    return await this.http.get<Profile>(URL).toPromise();
  }
}
