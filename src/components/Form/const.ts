export type RequestFormBody = {
  type: string;
  title: string;
  location: string;
  message: string;
  maxServiceCharge: string;
  maxPrice: string;
  payment: string;
  category: string[];
  hashtag: string[];
  image: string;
};

export type OrderFormBody = {
  title: string;
  location: string;
  amount: number;
  message: string;
  maxServiceCharge: string;
  maxPrice: string;
  payment: string;
  helper: {
    name: string;
    phoneNumber: string;
  };
  requester: {
    name: string;
    address: string;
    phoneNumber: string;
  };
};
