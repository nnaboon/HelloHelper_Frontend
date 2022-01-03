import { LocationDto } from './LocationDto';

export type JoinedRequestGetDto = {
  userId: string;
  status: string;
};

export type MemberGetDto = {
  id: string;
  status: string;
  role: boolean;
  requestSum: number;
  provideSum: number;
};

export type CommunityGetDto = {
  id: string;
  communityCode: string;
  communityName: string;
  imageUrl: string;
  location: LocationDto;
  description: string;
  joinedRequestUserId: Array<JoinedRequestGetDto>;
  member: Array<MemberGetDto>;
};
