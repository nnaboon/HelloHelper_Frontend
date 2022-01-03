import { LocationDto } from './LocationDto';

export type RequesterUserIdGetDto = {
  userId: string;
  status: string;
};

export type ProvideGetDto = {
  id: string;
  title: string;
  location: LocationDto;
  imageUrl: string;
  description: string;
  provideSum: number;
  rating: number;
  serviceCharge: number;
  payment: string;
  userId: string;
  communityId: string;
  category: Array<string>;
  hashtag: Array<string>;
  requesterUserId: Array<RequesterUserIdGetDto>;
  visibility: boolean;
};
