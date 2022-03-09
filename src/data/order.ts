export type OrderProps = {
  id: string;
  chatId: string;
  orderReferenceType: string;
  orderReferenceId: string;
  title: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  number: number;
  price: number;
  serviceCharge: number;
  payment: string;
  description: string;
  receiver: {
    name: string;
    address: string;
    phoneNumber: string;
  };
  providerUserId: string;
  requesterUserId: string;
  rating: string;
  providerRating: number;
  requesterRating: number;
  status: string;
};

export const ORDER_DATA = [
  {
    orderId: 'abcde12345',
    orderReferenceType: 'provide',
    orderReferenceId: 'aabbccrt',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: {
      name: 'มหาวิทยาลัยเกษตรศาสตร์',
      lat: 13.8476,
      lng: 100.5696
    },
    amount: 2,
    price: 100,
    serviceCharge: 30,
    payment: 'โอน',
    description: 'ไส้ครีม',
    receiver: {
      receiverName: 'นกกระยาง สีขาว',
      receiverAddress: '',
      receiverPhoneNumber: '0811111111'
    },
    providerUserId: 'abcde',
    requesterUserId: 'abcdf',
    status: 'pending'
  },
  {
    orderId: 'abcdf12345',
    orderReferenceType: 'provide',
    orderReferenceId: 'aabbccfg',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: {
      name: 'มหาวิทยาลัยเกษตรศาสตร์',
      lat: 13.8476,
      lng: 100.5696
    },
    amount: 2,
    price: 100,
    serviceCharge: 30,
    payment: 'โอน',
    description: 'ไส้ครีม',
    receiver: {
      receiverName: 'นกกระยาง สีขาว',
      receiverAddress: '',
      receiverPhoneNumber: '0811111111'
    },
    providerUserId: 'abcde',
    requesterUserId: 'abcdg',
    status: 'waiting'
  },
  {
    orderId: 'abcdg12345',
    orderReferenceType: 'request',
    orderReferenceId: '12345qw',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: {
      name: 'มหาวิทยาลัยเกษตรศาสตร์',
      lat: 13.8476,
      lng: 100.5696
    },
    amount: 2,
    price: 100,
    serviceCharge: 30,
    payment: 'โอน',
    description: 'ไส้ครีม',
    receiver: {
      receiverName: 'นกกระยาง สีขาว',
      receiverAddress: '',
      receiverPhoneNumber: '0811111111'
    },
    providerUserId: 'abcdh',
    requesterUserId: 'abcdf',
    status: 'pending'
  },
  {
    orderId: 'abcdi12345',
    orderReferenceType: 'request',
    orderReferenceId: '12345ww',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: {
      name: 'มหาวิทยาลัยเกษตรศาสตร์',
      lat: 13.8476,
      lng: 100.5696
    },
    amount: 2,
    price: 100,
    serviceCharge: 30,
    payment: 'โอน',
    description: 'ไส้ครีม',
    receiver: {
      receiverName: 'นกกระยาง สีขาว',
      receiverAddress: '',
      receiverPhoneNumber: '0811111111'
    },
    providerUserId: 'abcdg',
    requesterUserId: 'abcde',
    status: 'pending'
  },
  {
    orderId: 'abcdj12345',
    orderReferenceType: 'request',
    orderReferenceId: '12345aa',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: {
      name: 'มหาวิทยาลัยเกษตรศาสตร์',
      lat: 13.8476,
      lng: 100.5696
    },
    amount: 2,
    price: 100,
    serviceCharge: 30,
    payment: 'โอน',
    description: 'ไส้ครีม',
    receiver: {
      receiverName: 'นกกระยาง สีขาว',
      receiverAddress: '',
      receiverPhoneNumber: '0811111111'
    },
    providerUserId: 'abcdg',
    requesterUserId: 'abcde',
    status: 'waiting'
  }
];
