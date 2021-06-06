import { Profile } from './account.model';

export class MessagePayload {
  message: string;
}

export class MessageType {
  _id: string;
  cid: string;
  createdBy: Profile;
  message: string;
  time: number;
}

export class Conversation {
  members: Array<Profile>;
  isGroup: boolean;
  lastUpdated: number;
}
