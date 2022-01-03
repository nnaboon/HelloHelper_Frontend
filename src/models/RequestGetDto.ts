import { LocationDto } from './LocationDto';

export type ProvidedUserIdGetDto = {
  id: string;
  status: string;
};

export type RequesterUserIdGetDto = {
  userId: string;
};

export type RequestGetDto = {
  id: string;
  title: string;
  location: LocationDto;
  imageUrl: string;
  description: string;
  price: number;
  serviceCharge: number;
  number: number;
  payment: string;
  userId: string;
  communityId: string;
  category: Array<string>;
  hashtag: Array<string>;
  providedUserId: string;
  requesterUserId: string;
  visibility: boolean;
};
