export interface ClubEvent extends ClubEventInfo {
  payment_url: string;
  id: string;
  image: string;
  attendees: UserInfo[]; // The info is stored in the database as a JSON strong
}

export interface ClubEventInfo {
  title: string;
  description: string;
  location: string;
  date: number;
}

export interface User extends UserInfo {
  id: number;
  secret: string;
  image: string;
  purchasedEventIds: string[];
  permissions: Permission[];
}

export interface UserInfo {
  email: string;
  name: string;
}

export enum Permission {
  DEFAULT,
  POST_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  ADMIN,
}

export enum Status {
  IDLE,
  SUCCESS,
  ERROR,
  LOADING,
}
