import RequestImage from 'images/request.jpeg';

export type helperType = {
  id: string;
  name: string;
  imageUrl: string;
};

export type RequestType = {
  id: string;
  title: string;
  owner: {
    id: string;
    name: string;
    imageUrl: string;
    rank: string;
  };
  location: string;
  message: string;
  imageUrl: any;
  amount: number;
  price: string;
  serviceCharge: string;
  category: string[];
  hashtag: string[];
  helper: helperType[];
};

export type RequestListProps = {
  id: string;
  status: string;
  title: string;
  location: string;
  amount: string;
  price: string;
  serviceCharge: string;
  payment: string;
  message: string;
  helperName: string;
  phoneNumber: string;
};

export const REQUEST_MAPPER = [
  {
    requestId: '12345qw',
    userId: 'abcdf',
    imageUrl: RequestImage,
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: {
      name: 'เซ็นทรัล ลาดพร้าว',
      lat: 13.8163,
      lng: 100.5608
    },
    amount: 2,
    description: 'ซอสชานม ซอสสังขยา 5',
    price: 300,
    serviceCharge: 30,
    payment: 'โอน',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    provideUserId: ['abcdh', 'abcdg']
  },
  {
    requestId: '12345pp',
    userId: 'abcdf',
    imageUrl: RequestImage,
    title: 'เกี๊ยวกุ้ง สุโขทัย แม่อีพิม',
    location: {
      name: 'เซ็นทรัล ลาดพร้าว',
      lat: 13.8163,
      lng: 100.5608
    },
    amount: 2,
    description: '5 ถุงใหญ่',
    price: 300,
    serviceCharge: 30,
    payment: 'โอน',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    provideUserId: ['abcdh', 'abcdg']
  },
  {
    requestId: '12345er',
    userId: 'abcdf',
    imageUrl: RequestImage,
    title: 'ขนมปังสังขยา ไส้ทะลัก โชคชัย5',
    location: {
      name: 'เซ็นทรัล ลาดพร้าว',
      lat: 13.8163,
      lng: 100.5608
    },
    amount: 2,
    description: 'ซอสชานม ซอสสังขยา 5',
    price: 300,
    serviceCharge: 30,
    payment: 'โอน',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    provideUserId: ['abcdh', 'abcdg']
  },
  {
    requestId: '12345rt',
    userId: 'abcdf',
    imageUrl: RequestImage,
    title: 'ทะเลเผา กุ้งถังกุ้งเต้น',
    location: {
      name: 'เซ็นทรัล ลาดพร้าว',
      lat: 13.8163,
      lng: 100.5608
    },
    amount: 2,
    description: 'ซอสชานม ซอสสังขยา 5',
    price: 300,
    serviceCharge: 30,
    payment: 'โอน',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    provideUserId: ['abcdh', 'abcdg']
  },
  {
    requestId: '12345en',
    userId: 'abcdf',
    imageUrl: RequestImage,
    title: 'ทะเลทอด',
    location: {
      name: 'เซ็นทรัล ลาดพร้าว',
      lat: 13.8163,
      lng: 100.5608
    },
    amount: 2,
    description: 'ซอสชานม ซอสสังขยา 5',
    price: 300,
    serviceCharge: 30,
    payment: 'โอน',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    provideUserId: ['abcdh', 'abcdg']
  },
  {
    requestId: '12345ww',
    userId: 'abcde',
    imageUrl: RequestImage,
    title: 'เค้กไข่ ไต้หวัน สาธร',
    location: {
      name: 'เซ็นทรัล ลาดพร้าว',
      lat: 13.8163,
      lng: 100.5608
    },
    amount: 2,
    description: 'ซอสชานม ซอสสังขยา 5',
    price: 300,
    serviceCharge: 30,
    payment: 'โอน',
    // rank: 'platinum',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    provideUserId: ['abcdf', 'abcdh', 'abcdg']
  },
  {
    requestId: '12345aa',
    userId: 'abcde',
    imageUrl: RequestImage,
    title: 'ขนมไทย บ้านขนมไทย',
    location: {
      name: 'เซ็นทรัล ลาดพร้าว',
      lat: 13.8163,
      lng: 100.5608
    },
    amount: 2,
    description: 'ซอสชานม ซอสสังขยา 5',
    price: 300,
    serviceCharge: 30,
    payment: 'โอน',
    // rank: 'platinum',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    provideUserId: ['abcdf', 'abcdh', 'abcdg']
  }
];
