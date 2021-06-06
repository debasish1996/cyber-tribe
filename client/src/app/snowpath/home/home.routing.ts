import { MeComponent } from './me/me.component';
import { HomeComponent } from './home.component';
import {
  AccountResolver,
  ContactsResolver,
  DirectsResolver,
  MessageResolver,
} from 'src/app/util/data-resolver';
import { MessageComponent } from './message/message.component';

export const homeRouting = [
  {
    path: 'home',
    resolve: {
      user: AccountResolver,
      contacts: ContactsResolver,
      directs: DirectsResolver,
    },
    component: HomeComponent,
    children: [
      {
        path: 'me',
        component: MeComponent,
      },
      {
        path: 'me/:uid',
        resolve: { convo: MessageResolver },
        component: MessageComponent,
      },
      {
        path: '**',
        redirectTo: 'me',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
