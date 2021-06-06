import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLs } from '../model/url.model';
import { Contacts, Direct } from '../model/common.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contact: Contacts;
  private directs: Array<Direct> = [];
  constructor(private http: HttpClient) {}

  async getContacts(forceUpdate?: boolean): Promise<Contacts> {
    try {
      if (this.contact && !forceUpdate) return this.contact;
      this.contact = await this.http.get<Contacts>(URLs.CONTACTS).toPromise();
      return this.contact;
    } catch (error) {
      console.log(error);
      return this.contact;
    }
  }

  setContact(contact: Contacts) {
    this.contact = contact;
  }

  async sendFriendReq(friendId: string) {
    try {
      return this.http.post(URLs.FRIEND_REQ, { friendId }).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async acceptFriendReq(uid: string) {
    try {
      return this.http.post(URLs.ACCEPT_FRIEND_REQ, { uid }).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async getDirects(forceUpdate?: boolean) {
    try {
      if (this.directs && !forceUpdate) return this.directs;
      this.directs = await this.http.get<[Direct]>(URLs.DIRECTS).toPromise();
      return this.directs;
    } catch (error) {
      console.log(error);
      return this.directs;
    }
  }
  setDirects(directs: Array<Direct>) {
    this.directs = directs;
  }
}
