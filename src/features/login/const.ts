export enum RegisterStep {
  EMAIL_AND_PASSWORD = 'email-and-password',
  USERNAME = 'username',
  LOCATION = 'location',
  ABILITY = 'ability'
}

export enum LoginStep {
  LOGIN = 'login',
  REGISTER = 'register'
}

export type LocationType = {
  name: string;
  latitude?: number;
  longitude?: number;
};

export type UserCreateBody = {
  userId?: string;
  email: string;
  password: string;
  username: string;
  location: LocationType;
  ability: string[];
};
