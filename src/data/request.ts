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
    id: '12345kl',
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
