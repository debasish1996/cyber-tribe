import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Direct } from '../model/common.model';
import { MessagePayload, MessageType } from '../model/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private _socket = io(environment.apiUrl);

  constructor(private _zone: NgZone) {}

  getPresence(uid, callback) {
    this.socket.on(uid + 'presence', (state) => {
      callback(state);
    });
  }
  getPresenceSub(uid) {
    return Observable.create((observer) => {
      this.socket.on(uid + 'presence', (state) => {
        this._zone.run(() => {
          observer.next(state);
        });
      });
    });
  }

  getMessageUpdates() {
    return Observable.create((observer) => {
      this.socket.on('message', (message: MessageType) => {
        this._zone.run(() => {
          observer.next(message);
        });
      });
      this.socket.on('message-error', (error: MessageType) => {
        this._zone.run(() => {
          observer.error(error);
        });
      });
    });
  }

  getDirectUpdates() {
    return Observable.create((observer) => {
      this.socket.on('direct-updates', (direct: Direct) => {
        this._zone.run(() => {
          observer.next(direct);
        });
      });
    });
  }

  getContactUpdates() {
    return Observable.create((observer) => {
      this.socket.on('contacts-updates', (contact) => {
        this._zone.run(() => {
          observer.next(contact);
        });
      });
    });
  }

  async joinChannel(fid: string) {
    try {
      this.socket.emit('join-channel', fid);
    } catch (error) {
      console.log(error);
    }
  }
  async sendMessage(fid: string, payload: MessagePayload) {
    try {
      this.socket.emit('message', fid, payload);
    } catch (error) {
      console.log(error);
    }
  }

  get socket() {
    return this._socket;
  }
}
