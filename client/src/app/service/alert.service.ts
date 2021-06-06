import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private ns: NotificationsService) {}
  nsConfig = {
    type: 'success',
    title: 'This is just a title',
    content: 'This is just some content',
    timeOut: 3000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    animate: 'fromRight',
  };

  success(message: string, title: string = '', position: string = 'fromRight') {
    this.nsConfig.animate = position;
    this.ns.create(title, message, 'success' as any, this.nsConfig);
  }

  error(message: string, title: string = '', position: string = 'fromRight') {
    this.nsConfig.animate = position;
    this.ns.create(title, message, 'error' as any, this.nsConfig);
  }
}
