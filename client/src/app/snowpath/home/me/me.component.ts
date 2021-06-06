import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Profile } from 'src/app/model/account.model';
import { Contacts } from 'src/app/model/common.model';
import { AlertService } from 'src/app/service/alert.service';
import { ContactService } from 'src/app/service/contact.service';
import { SocketService } from 'src/app/service/socket.service';
import { MeMenu } from '../../model/me.model';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
})
export class MeComponent implements OnDestroy {
  @ViewChild('userIdInput') userIdInput: ElementRef;
  activeNav = MeMenu.ONLINE;
  menu = MeMenu;
  onlineList: Array<Profile> = [];
  allList: Array<Profile> = [];
  blockedList: Array<Profile> = [];
  pendingList: Array<Profile> = [];
  isPendingDirty = false;
  constructor(
    private contactService: ContactService,
    private socket: SocketService,
    private alert: AlertService
  ) {
    this.init();
  }

  private async init() {
    this.assignContacts(await this.contactService.getContacts());
    this.socket.getContactUpdates().subscribe((contact) => {
      this.contactService.setContact(contact);
      this.assignContacts(contact);
    });
  }

  private assignContacts(contacts: Contacts) {
    if (this.pendingList.length < contacts.pending.length)
      this.isPendingDirty = true;
    this.allList = contacts.friends;
    this.blockedList = contacts.blocked;
    this.pendingList = contacts.pending;
  }

  async sendFriendReq() {
    try {
      const friendId = this.userIdInput.nativeElement.value;
      switch (true) {
        case friendId[0] !== '#':
          this.alert.error('User id must start with #');
          return;
        case friendId.length !== 7:
          this.alert.error('User id must be 7 chanracters long. (#000000)');
          return;
        default:
          const res = await this.contactService.sendFriendReq(friendId);
          this.alert.success(res['status']);
          break;
      }
    } catch (res) {
      this.alert.error(res.error);
    }
  }

  ngOnDestroy(): void {
  }
}
