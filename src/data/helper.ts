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
    rank: 'platinum',
    rating: 5,
    owner: {
      userId: '',
      imageUrl: '',
      name: '',
      rank: '',
      rating: 5
    }
  },
  {
    id: 'qwer31',
    type: 'provide',
    userId: 'qeweqa',
    name: 'กระทิง สีทอง',
    imageUrl: '',
    userImageUrl: '',
    title: 'ขนมปังสังขยา ร้านนายเฮ็ง โชคชัย4',
    location: 'หมู่บ้าน vive',
    helpSum: 400,
    serviceCharge: '30 บาท',
    category: ['food'],
    hashtag: ['ขนมปัง', 'สังขยา', 'โชคชัย4'],
    message: 'หากรับหิ้วมากกว่า 10 ชิ้น บวกค่าบริการเพิ่มชิ้นละ 10 บาท',
    payment: 'โอน',
    rank: 'gold',
    rating: 4
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
    rank: 'diamond',
    rating: 4
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
    rank: 'platinum',
    rating: 3
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
    rank: 'platinum',
    rating: 3
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
    rank: 'platinum',
    rating: 3.5
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
    rank: 'platinum',
    rating: 5
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
    rank: 'platinum',
    rating: 5
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
    rank: 'classic',
    rating: 2
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
    rank: 'silver',
    rating: 4.5
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
    rank: 'platinum',
    rating: 4
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
    rank: 'gold',
    rating: 4
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
    rank: 'platinum',
    rating: 4
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
    rank: 'platinum',
    rating: 4.5
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
    rank: 'platinum',
    rating: 5
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
    rank: 'platinum',
    rating: 5
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
    rank: 'platinum',
    rating: 4.5
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
    rank: 'platinum',
    rating: 5
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
    rank: 'platinum',
    rating: 4
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
    rank: 'platinum',
    rating: 5
  }
];
