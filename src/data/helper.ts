export type ProvideType = {
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
  payment: string;
  serviceCharge: string;
  category: string[];
  hashtag: string[];
};

export const POPULAR_REQUEST_DATA = [
  {
    id: 'qwer21',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 600,
    serviceCharge: '30 บาท',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    message: 'หากรับหิ้วมากกว่า 10 ชิ้น บวกค่าบริการเพิ่มชิ้นละ 10 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'qwer31',
    name: 'กระทิง สีทอง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 400,
    serviceCharge: '30 บาท',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    message: 'หากรับหิ้วมากกว่า 10 ชิ้น บวกค่าบริการเพิ่มชิ้นละ 10 บาท',
    payment: 'โอน',
    rank: 'gold'
  },
  {
    id: 'qwer90',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 270,
    serviceCharge: '30 บาท',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    message: 'หากรับหิ้วมากกว่า 10 ชิ้น บวกค่าบริการเพิ่มชิ้นละ 10 บาท',
    payment: 'โอน',
    rank: 'diamond'
  },
  {
    id: 'qwer92',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 260,
    serviceCharge: '30 บาท',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    message: 'หากรับหิ้วมากกว่า 10 ชิ้น บวกค่าบริการเพิ่มชิ้นละ 10 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'qwer45',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 250,
    serviceCharge: '30 บาท',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    message: 'หากรับหิ้วมากกว่า 10 ชิ้น บวกค่าบริการเพิ่มชิ้นละ 10 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'qwer88',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 260,
    serviceCharge: '30 บาท',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    message: 'หากรับหิ้วมากกว่า 10 ชิ้น บวกค่าบริการเพิ่มชิ้นละ 10 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'qwer32',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 250,
    serviceCharge: '30 บาท',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    message: 'หากรับหิ้วมากกว่า 6 ชิ้น บวกค่าบริการเพิ่มชิ้นละ 10 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'qwer40',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 260,
    serviceCharge: '30 บาท',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    message: 'หากรับหิ้วมากกว่า 10 ชิ้น บวกค่าบริการเพิ่มชิ้นละ 40 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'qwer67',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 250,
    serviceCharge: '30 บาท',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    message: 'หากรับหิ้วมากกว่า 10 ชิ้น บวกค่าบริการเพิ่มชิ้นละ 40 บาท',

    payment: 'โอน',
    rank: 'classic'
  },
  {
    id: 'qwer11',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 250,
    serviceCharge: '30 บาท',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    payment: 'โอน',
    rank: 'silver'
  }
];

export const TOP_TEN_REQUEST_DATA = [
  {
    id: 'abcdefg9',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 600,
    serviceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'abcdefi1',
    name: 'กระทิง สีทอง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 400,
    serviceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'gold'
  },
  {
    id: 'abcdefa3',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 270,
    serviceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'abcdefz9',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 260,
    serviceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'abcdefo9',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 250,
    serviceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'abcdefg8',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 260,
    serviceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'abcdefc9',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 250,
    serviceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'abcdefw4',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 260,
    serviceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'abcdefa2',
    name: 'กระทิง สีแดง',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 250,
    serviceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum'
  },
  {
    id: 'abcdefd1',
    name: 'กระทิง สีแดงเลือดหมู',
    imageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 250,
    serviceCharge: '30 บาท',
    payment: 'โอน',
    rank: 'platinum'
  }
];
