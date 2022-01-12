import { LocationDto } from './LocationDto';

export type ReceiverDto = {
  receiverName: string;
  receiverAddress: string;
  receiverPhoneNumber: string;
};

export type OrderGetDto = {
  id: string;
  orderReferenceType: string;
  orderReferenceId: string;
  title: string;
  location: LocationDto;
  description: string;
  number: number;
  price: number;
  serviceCharge: number;
  rating: number;
  receiver: ReceiverDto;
  requesterUserId: string;
  providerUserId: string;
  payment: string;
  status: string;
};
