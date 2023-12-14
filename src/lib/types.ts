export interface ClubEvent {
  title: string;
  description: string;
  payment_url: string;
  id: string;
  image: string;
  disabled: boolean;
  date: number;
  attendees: UserInfo[]; // The info is stored in the database as a JSON strong
}

export interface User extends UserInfo {
  id: number;
  secret: string;
  purchasedEventIds: string[];
}

export interface UserInfo {
  email: string;
  name: string;
}
