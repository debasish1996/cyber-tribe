import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/model/account.model';
import { Conversation, MessageType } from 'src/app/model/conversation.model';
import { AccountService } from 'src/app/service/account.service';
import { MessageService } from 'src/app/service/message.service';
import { SocketService } from 'src/app/service/socket.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnDestroy {
  header: Profile;
  members: Array<Profile>;
  membersMap;
  me: Profile;
  data;
  messages: Array<MessageType>;

  name = 'CyberTribe';
  message = '';
  showEmojiPicker = false;
  set = 'twitter';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private accountService: AccountService,
    private socket: SocketService
  ) {
    this.route.data.subscribe(async ({ convo }) => {
      const conversation: Conversation = convo;
      this.members = conversation.members;
      this.membersMap = this.members.reduce((a, e) => {
        a[e.uid] = e;
        return a;
      }, {});
      this.getHeaderData(this.membersMap);
    });
    this.getMessages();
    this.socket.getMessageUpdates().subscribe((message: MessageType) => {
      this.messages = [message, ...this.messages];
    });
  }

  private async getHeaderData(members) {
    this.route.params.subscribe(({ uid }) => {
      this.header = members[uid];
    });
  }

  private async getMessages() {
    this.me = await this.accountService.getMe();
    this.route.params.subscribe(async ({ uid }) => {
      this.socket.joinChannel(uid);
      this.messages = await this.messageService.getMessagesWithFid(uid);
      this.messages = this.messages.sort((a, b) => b.time - a.time);
    });
  }

  isSameDate(a, b) {
    return a && b && new Date(a.time).getDate() === new Date(b.time).getDate();
  }
  isShowDp(a, b) {
    return a?.createdBy === b.createdBy && this.isSameDate(a, b);
  }

  send(event: Event) {
    const { message } = this;
    this.message = '';
    this.socket.sendMessage(this.header.uid, { message });
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    const { message } = this;
    const text = `${message}${event.emoji.native}`;
    this.message = text;
    this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur');
  }

  ngOnDestroy(): void {}
}
