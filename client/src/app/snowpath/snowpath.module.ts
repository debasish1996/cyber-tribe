import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerNavComponent } from './server-nav/server-nav.component';
import { SnowpathComponent } from './snowpath.component';
import { SnowpathRoutingModule } from './snowpath.routing';
import { HomeComponent } from './home/home.component';
import { MyNavComponent } from './home/my-nav/my-nav.component';
import { MeComponent } from './home/me/me.component';
import { PannelComponent } from './components/pannel/pannel.component';
import { MeNavComponent } from './home/me/me-nav/me-nav.component';
import { FriendListComponent } from './home/me/friend-list/friend-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { MarkerComponent } from './components/marker/marker.component';
import { MessageComponent } from './home/message/message.component';
import { ChannelHeaderComponent } from './components/channel-header/channel-header.component';
import { SocketService } from '../service/socket.service';
import { OrderModule } from 'ngx-order-pipe';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ServerNavComponent,
    SnowpathComponent,
    HomeComponent,
    MyNavComponent,
    MeComponent,
    PannelComponent,
    MeNavComponent,
    FriendListComponent,
    MarkerComponent,
    MessageComponent,
    ChannelHeaderComponent,
  ],
  imports: [
    CommonModule,
    SnowpathRoutingModule,
    MatMenuModule,
    OrderModule,
    PickerModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [SocketService],
})
export class SnowpathModule {}
