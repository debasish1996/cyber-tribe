import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/model/account.model';
import { AlertService } from 'src/app/service/alert.service';
import { ContactService } from 'src/app/service/contact.service';
import { MeMenu } from 'src/app/snowpath/model/me.model';
import { Status } from '../../../model/account.model';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent implements OnInit {
  @Input() friendList: Array<Profile> = [];
  @Input() activeNav: string = MeMenu.ONLINE;

  menu = MeMenu;

  status = Status;
  constructor(
    private contact: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  ngOnInit(): void {}

  acceptReq(event: Event, uid: string) {
    event.stopPropagation();
    this.contact
      .acceptFriendReq(uid)
      .then((res) => {
        this.alert.success('Added to Friend List');
      })
      .catch((err) => {
        this.alert.error('Some Internal Error');
      });
  }

  openMessage(uid: string) {
    if (this.activeNav == MeMenu.PENDING) return;
    this.router.navigate([uid], { relativeTo: this.route });
  }
}
