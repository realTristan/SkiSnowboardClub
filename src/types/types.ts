export interface ClubEvent extends ClubEventInfo {
  id: string;
  image: string;
  formUrl: string;
}

export interface ClubEventInfo {
  title: string;
  description: string;
  location: string;
  date: string;
  price: number;
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
