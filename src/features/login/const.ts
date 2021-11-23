export enum RegisterStep {
    EMAIL_AND_PASSWORD = 'email-and-password',
    USERNAME = 'username',
    LOCATION = 'location',
    ABILITY = 'ability'
}

export type UserCreateBody = {
    email: string;
    password: string;
    username: string;
    location: string;
    ability: string[];
};