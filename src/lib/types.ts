export interface ClubEvent {
  title: string;
  description: string;
  payment_url: string;
  id: string;
  image: string;
  disabled: boolean;
  date: number;
  location: string;
  attendees: UserInfo[]; // The info is stored in the database as a JSON strong
}

export interface User extends UserInfo {
  id: number;
  secret: string;
  purchasedEventIds: string[];
  permissions: Permission[];
}

export interface UserInfo {
  email: string;
  name: string;
}

export enum Permission {
  POST_EVENT,
  DELETE_EVENT,
  ADMIN,
}
