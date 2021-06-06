import { Profile } from './account.model';
import { Conversation } from './conversation.model';

export class Contacts {
  friends: Array<Profile>;
  pending: Array<Profile>;
  blocked: Array<Profile>;
}

export class Direct {
  cid: string;
  uid: string;
  person: Profile;
  lastUpdated: number;
  isGroup: boolean;
  unseen: number;
}

export enum AlertTypes {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn',
  ALERT = 'alert',
}

export enum AlertPositions {
  FROM_RIGHT = 'fromRight',
  FROM_LEFT = 'fromLeft',
  SCALE = 'scale',
  ROTATE = 'rotate',
}
