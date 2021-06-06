import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from '../model/account.model';
import { Contacts, Direct } from '../model/common.model';
import { Conversation } from '../model/conversation.model';
import { AccountService } from '../service/account.service';
import { ContactService } from '../service/contact.service';
import { MessageService } from '../service/message.service';

@Injectable({
  providedIn: 'root',
})
export class AccountResolver implements Resolve<Profile> {
  constructor(private accountService: AccountService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.accountService.getMe(true).catch((err) => {
      console.log('Profile-err:', err);
      this.router.navigateByUrl('/auth/profile');
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class ContactsResolver implements Resolve<Contacts> {
  constructor(private contactService: ContactService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.contactService.getContacts(true);
  }
}

@Injectable({
  providedIn: 'root',
})
export class MessageResolver implements Resolve<Conversation> {
  constructor(private messageService: MessageService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.messageService
      .getConversationWithFid(route.params.uid)
      .catch((err) => {
        console.log('Profile-err:', err);
      });
  }
}

@Injectable({
  providedIn: 'root',
})
export class DirectsResolver implements Resolve<[Direct]> {
  constructor(private contact: ContactService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.contact.getDirects(true).catch((err) => {
      console.log('Profile-err:', err);
      return [];
    });
  }
}
