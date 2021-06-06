import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/model/account.model';
import { Direct } from 'src/app/model/common.model';
import { AccountService } from 'src/app/service/account.service';
import { AuthService } from 'src/app/service/auth.service';
import { ContactService } from 'src/app/service/contact.service';
import { SocketService } from 'src/app/service/socket.service';
import { Status } from '../../model/account.model';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.scss'],
})
export class MyNavComponent implements OnDestroy {
  account: Profile;
  directs: Array<Direct>;
  states = {};
  status = Status;

  constructor(
    private accountService: AccountService,
    private auth: AuthService,
    private router: Router,
    private contactService: ContactService,
    public socket: SocketService
  ) {
    this.accountService.getMe().then((account: Profile) => {
      this.account = account;
    });
    this.getDirects();
  }

  private async getDirects() {
    this.directs = await this.contactService.getDirects();
    this.states = this.directs.reduce((a, e) => {
      a[e.person.uid] = e.person.state;
      return a;
    }, {});
    this.directs.forEach((d) => {
      this.socket.getPresence(d.person.uid, (state) => {
        this.states[d.person.uid] = state;
      });
    });
    this.socket.getDirectUpdates().subscribe((direct: Direct) => {
      this.directs = this.directs.filter((d) => d.cid !== direct.cid);
      this.directs.push(direct);
      this.contactService.setDirects(this.directs);
    });
  }

  goToChat(fid: string) {
    this.router.navigate(['/app/home/me', fid]);
  }

  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/auth');
  }

  ngOnDestroy(): void {}
}
