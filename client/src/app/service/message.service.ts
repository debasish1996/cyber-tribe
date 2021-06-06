import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLs } from '../model/url.model';
import { Conversation, MessageType } from '../model/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageSource: EventSource;
  constructor(private http: HttpClient) {}

  async getConversationWithFid(fid: string): Promise<Conversation> {
    try {
      const url = `${URLs.CONVERSATIONS}/${fid}`;
      return this.http.get<Conversation>(url).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async getMessagesWithFid(fid: string): Promise<[MessageType]> {
    try {
      const url = `${URLs.MESSAGES}/${fid}`;
      return this.http.get<[MessageType]>(url).toPromise();
    } catch (error) {
      console.log(error);
    }
  }
}
