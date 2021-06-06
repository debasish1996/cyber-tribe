import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/account.model';

@Component({
  selector: 'app-channel-header',
  templateUrl: './channel-header.component.html',
  styleUrls: ['./channel-header.component.scss'],
})
export class ChannelHeaderComponent implements OnInit {
  @Input() friend: Profile;

  constructor() {}

  ngOnInit(): void {}
}
