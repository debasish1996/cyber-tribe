import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeveloperService } from 'src/app/service/developer.service';
import { MeMenu } from '../../../model/me.model';

@Component({
  selector: 'app-me-nav',
  templateUrl: './me-nav.component.html',
  styleUrls: ['./me-nav.component.scss'],
})
export class MeNavComponent implements OnInit {
  @Input() active: string;
  @Input() isPendingDirty?: boolean = false;
  @Output() activeChange = new EventEmitter<string>();

  navList = [MeMenu.ONLINE, MeMenu.ALL, MeMenu.PENDING, MeMenu.BLOCKED];
  navMenu = MeMenu;
  constructor(private dev: DeveloperService) {}

  changeNav(item) {
    if (item == MeMenu.PENDING) {
      this.isPendingDirty = false;
    }
    this.active = item;
    this.activeChange.emit(this.active);
  }

  resetContact() {
    this.dev.resetContact();
  }
  ngOnInit(): void {}
}
