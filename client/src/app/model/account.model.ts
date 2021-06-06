export class AuthCredential {
  email: string;
  password: string;
}

export class CreateProfile {
  name: string;
  imageUrl?: String;
}

export class Profile {
  name: string;
  imageUrl: string;
  email: string;
  userId: string;
  uid: string;
  state: string;
}

export class UserState {
  uid: string;
  emial: string;
  isLoggedIn: string;
}
