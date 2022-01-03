import { LocationDto } from './LocationDto';

export type UsersGetDto = {
  userId: string;
  loginType: number;
  username: string;
  email: string;
  verifiedEmailStatus: string;
  location: LocationDto;
  imageUrl: string;
  address: string;
  phoneNumber: string;
  recommend: boolean;
  rank: string;
  rating: number;
  communityId: Array<string>;
  category: Array<string>;
  requestSum: number;
  provideSum: number;
  followingUserId: Array<string>;
  followerUserId: Array<string>;
  provideId: Array<string>;
  requestId: Array<string>;
  dataStatus: boolean;
};
