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
  imageUrl: string;
  amount: number;
  maxPrice: string;
  maxServiceCharge: string;
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

export const SUGGESTED_REQUEST_DATA = [
  {
    id: '12345qw',
    name: 'นก หัวขวาน',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    amount: '2',
    message: 'ซอสชานม ซอสสังขยา 5',
    maxPrice: '300บาท',
    maxServiceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    helper: [
      {
        id: 'abcde',
        name: 'กระทิง สีแดง',
        imageUrl: ''
      },
      {
        id: 'abcdf',
        name: 'กระทิง สีทอง',
        imageUrl: ''
      }
    ]
  },
  {
    id: '12345ww',
    name: 'กระทิง สีทอง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    amount: '2',
    message: 'ซอสชานม ซอสสังขยา 5',
    maxPrice: '300บาท',
    maxServiceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    helper: [
      {
        id: 'abcde',
        name: 'กระทิง สีแดง',
        imageUrl: ''
      },
      {
        id: 'abcdf',
        name: 'กระทิง สีทอง',
        imageUrl: ''
      }
    ]
  },
  {
    id: '12345aa',
    name: 'นก หัวขวาน',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    amount: '2',
    message: 'ซอสชานม ซอสสังขยา 5',
    maxPrice: '300บาท',
    maxServiceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'diamond',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    helper: [
      {
        id: 'abcde',
        name: 'กระทิง สีแดง',
        imageUrl: ''
      },
      {
        id: 'abcdf',
        name: 'กระทิง สีทอง',
        imageUrl: ''
      }
    ]
  },
  {
    id: '12345pf',
    name: 'นก หัวขวาน',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    amount: '2',
    message: 'ซอสชานม ซอสสังขยา 5',
    maxPrice: '300บาท',
    maxServiceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'gold',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    helper: [
      {
        id: 'abcde',
        name: 'กระทิง สีแดง',
        imageUrl: ''
      },
      {
        id: 'abcdf',
        name: 'กระทิง สีทอง',
        imageUrl: ''
      }
    ]
  },
  {
    id: 'abceo3',
    name: 'นก หัวขวาน',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    amount: '2',
    message: 'ซอสชานม ซอสสังขยา 5',
    maxPrice: '300บาท',
    maxServiceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'silver',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    helper: [
      {
        id: 'abcde',
        name: 'กระทิง สีแดง',
        imageUrl: ''
      },
      {
        id: 'abcdf',
        name: 'กระทิง สีทอง',
        imageUrl: ''
      }
    ]
  },
  {
    id: '12345er',
    name: 'นก หัวขวาน',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    amount: '2',
    message: 'ซอสชานม ซอสสังขยา 5',
    maxPrice: '300บาท',
    maxServiceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    helper: [
      {
        id: 'abcde',
        name: 'กระทิง สีแดง',
        imageUrl: ''
      },
      {
        id: 'abcdf',
        name: 'กระทิง สีทอง',
        imageUrl: ''
      }
    ]
  },
  {
    id: '12345mj',
    name: 'นก หัวขวาน',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    amount: '2',
    message: 'ซอสชานม ซอสสังขยา 5',
    maxPrice: '300บาท',
    maxServiceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    helper: [
      {
        id: 'abcde',
        name: 'กระทิง สีแดง',
        imageUrl: ''
      },
      {
        id: 'abcdf',
        name: 'กระทิง สีทอง',
        imageUrl: ''
      }
    ]
  },
  {
    id: '12345na',
    name: 'นก หัวขวาน',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    amount: '2',
    message: 'ซอสชานม ซอสสังขยา 5',
    maxPrice: '300บาท',
    maxServiceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'gold',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    helper: [
      {
        id: 'abcde',
        name: 'กระทิง สีแดง',
        imageUrl: ''
      },
      {
        id: 'abcdf',
        name: 'กระทิง สีทอง',
        imageUrl: ''
      }
    ]
  },
  {
    id: '12345qn',
    name: 'นก หัวขวาน',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    amount: '2',
    message: 'ซอสชานม ซอสสังขยา 5',
    maxPrice: '300บาท',
    maxServiceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'silver',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    helper: [
      {
        id: 'abcde',
        name: 'กระทิง สีแดง',
        imageUrl: ''
      },
      {
        id: 'abcdf',
        name: 'กระทิง สีทอง',
        imageUrl: ''
      }
    ]
  },
  {
    id: '12345ab',
    name: 'นก หัวขวาน',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    amount: '2',
    message: 'ซอสชานม ซอสสังขยา 5',
    maxPrice: '300บาท',
    maxServiceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'classic',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    helper: [
      {
        id: 'abcde',
        name: 'กระทิง สีแดง',
        imageUrl: ''
      },
      {
        id: 'abcdf',
        name: 'กระทิง สีทอง',
        imageUrl: ''
      }
    ]
  }
];

export const REQUEST_MAPPER: RequestListProps[] = [
  {
    id: 'aabbccrt',
    status: 'waiting',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: 'มหาลัยเกษตรศาสตร์ บางเขน',
    amount: '2',
    price: '100',
    serviceCharge: '30',
    payment: 'โอน',
    message: 'ไส้ครีม',
    helperName: 'นกกระยาง สีขาว',
    phoneNumber: '0811111111'
  },
  {
    id: 'aabbccfg',
    status: 'cancel',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: 'มหาลัยเกษตรศาสตร์ บางเขน',
    amount: '2',
    price: '100',
    serviceCharge: '30',
    payment: 'โอน',
    message: 'ไส้ครีม',
    helperName: 'นกกระยาง สีขาว',
    phoneNumber: '0811111111'
  },
  {
    id: 'aabbccop',
    status: 'cancel',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: 'มหาลัยเกษตรศาสตร์ บางเขน',
    amount: '2',
    price: '100',
    serviceCharge: '30',
    payment: 'โอน',
    message: 'ไส้ครีม',
    helperName: 'นกกระยาง สีขาว',
    phoneNumber: '0811111111'
  },
  {
    id: 'aabbccuu',
    status: 'complete',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: 'มหาลัยเกษตรศาสตร์ บางเขน',
    amount: '2',
    price: '100',
    serviceCharge: '30',
    payment: 'โอน',
    message: 'ไส้ครีม',
    helperName: 'นกกระยาง สีขาว',
    phoneNumber: '0811111111'
  },
  {
    id: 'aabbccrsa',
    status: 'waiting',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: 'มหาลัยเกษตรศาสตร์ บางเขน',
    amount: '2',
    price: '100',
    serviceCharge: '30',
    payment: 'โอน',
    message: 'ไส้ครีม',
    helperName: 'นกกระยาง สีขาว',
    phoneNumber: '0811111111'
  },
  {
    id: 'aabbcckm',
    status: 'complete',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: 'มหาลัยเกษตรศาสตร์ บางเขน',
    amount: '2',
    price: '100',
    serviceCharge: '30',
    payment: 'โอน',
    message: 'ไส้ครีม',
    helperName: 'นกกระยาง สีขาว',
    phoneNumber: '0811111111'
  },
  {
    id: 'aabbccll',
    status: 'waiting',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: 'มหาลัยเกษตรศาสตร์ บางเขน',
    amount: '2',
    price: '100',
    serviceCharge: '30',
    payment: 'โอน',
    message: 'ไส้ครีม',
    helperName: 'นกกระยาง สีขาว',
    phoneNumber: '0811111111'
  },
  {
    id: 'aabbccny',
    status: 'pending',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: 'มหาลัยเกษตรศาสตร์ บางเขน',
    amount: '2',
    price: '100',
    serviceCharge: '30',
    payment: 'โอน',
    message: 'ไส้ครีม',
    helperName: 'นกกระยาง สีขาว',
    phoneNumber: '0811111111'
  },
  {
    id: 'aabbcciu',
    status: 'complete',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: 'มหาลัยเกษตรศาสตร์ บางเขน',
    amount: '2',
    price: '100',
    serviceCharge: '30',
    payment: 'โอน',
    message: 'ไส้ครีม',
    helperName: 'นกกระยาง สีขาว',
    phoneNumber: '0811111111'
  },
  {
    id: 'aabbcerm',
    status: 'complete',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: 'มหาลัยเกษตรศาสตร์ บางเขน',
    amount: '2',
    price: '100',
    serviceCharge: '30',
    payment: 'โอน',
    message: 'ไส้ครีม',
    helperName: 'นกกระยาง สีขาว',
    phoneNumber: '0811111111'
  },
  {
    id: 'aabbccpx',
    status: 'pending',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: 'มหาลัยเกษตรศาสตร์ บางเขน',
    amount: '2',
    price: '100',
    serviceCharge: '30',
    payment: 'โอน',
    message: 'ไส้ครีม',
    helperName: 'นกกระยาง สีขาว',
    phoneNumber: '0811111111'
  },
  {
    id: 'aabbccds',
    status: 'pending',
    title: 'ขนมปังสังขยา โชคชัย4',
    location: 'มหาลัยเกษตรศาสตร์ บางเขน',
    amount: '2',
    price: '100',
    serviceCharge: '30',
    payment: 'โอน',
    message: 'ไส้ครีม',
    helperName: 'นกกระยาง สีขาว',
    phoneNumber: '0811111111'
  }
];
