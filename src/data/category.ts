import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';
import { faSwimmer } from '@fortawesome/free-solid-svg-icons';
import { faMedkit } from '@fortawesome/free-solid-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faTractor } from '@fortawesome/free-solid-svg-icons';
import { faPlug } from '@fortawesome/free-solid-svg-icons';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTv } from '@fortawesome/free-solid-svg-icons';
import { faChild } from '@fortawesome/free-solid-svg-icons';

export const CATEGORY = [
  {
    id: 'food',
    name: 'ด้านการจัดหาอาหาร',
    icon: faHamburger as IconProp,
    sub: [
      {
        id: 'food',
        name: 'ด้านอาหารคาว',
        icon: faHamburger as IconProp
      },
      {
        id: 'dessert',
        name: 'ด้านขนมหวาน',
        icon: faHamburger as IconProp
      },
      {
        id: 'season',
        name: 'ด้านเครื่องปรุง',
        icon: faHamburger as IconProp
      }
    ]
  },
  {
    id: 'cloth',
    name: 'ด้านเครื่องแต่งกาย',
    icon: faTshirt as IconProp,
    sub: [
      {
        id: 'cloth',
        name: 'ด้านเสื้อผ้า',
        icon: faHamburger as IconProp
      },
      {
        id: 'bottom',
        name: 'ด้านกางเกง',
        icon: faHamburger as IconProp
      },
      {
        id: 'shoes',
        name: 'ด้านรองเท้า',
        icon: faHamburger as IconProp
      },
      {
        id: 'underwear',
        name: 'ด้านชุดชั้นใน',
        icon: faHamburger as IconProp
      },
      {
        id: 'exercise',
        name: 'ด้านชุดออกกำลัง',
        icon: faHamburger as IconProp
      },
      {
        id: 'jewelry',
        name: 'ด้านเครื่องประดับ',
        icon: faHamburger as IconProp
      }
    ]
  },
  {
    id: 'furniture',
    name: 'ด้านเครื่องใช้ในบ้าน',
    icon: faCouch as IconProp,
    sub: [
      {
        id: 'furniture',
        name: 'ด้านห้องนั่งเล่น',
        icon: faHamburger as IconProp
      },
      {
        id: 'kitchen',
        name: 'ด้านห้องครัว',
        icon: faHamburger as IconProp
      },
      {
        id: 'bathroom',
        name: 'ด้านห้องน้ำ',
        icon: faHamburger as IconProp
      },
      {
        id: 'bedroom',
        name: 'ด้านห้องนอน',
        icon: faHamburger as IconProp
      }
    ]
  },
  {
    id: 'electronic',
    name: 'ด้านเครื่องใช้ไฟฟ้า',
    icon: faPlug as IconProp
  },
  {
    id: 'agriculture',
    name: 'ด้านการเกษตร',
    icon: faTractor as IconProp
  },

  {
    id: 'anime',
    name: 'ด้านการ์ตูน',
    icon: faTv as IconProp
  },
  {
    id: 'stationary',
    name: 'ด้านหนังสือและเครื่องเขียน',
    icon: faPencilAlt as IconProp
  },
  {
    id: 'music',
    name: 'ด้านเพลงและดนตรี',
    icon: faMusic as IconProp
  },
  {
    id: 'mobile',
    name: 'ด้านมือถือและอุปกรณ์เสริม',
    icon: faMobile as IconProp
  },
  {
    id: 'sports',
    name: 'ด้านกีฬา',
    icon: faSwimmer as IconProp
  },
  {
    id: 'health',
    name: 'ด้านสุขภาพและความงาม',
    icon: faMedkit as IconProp
  },
  {
    id: 'toy',
    name: 'ด้านของเล่น',
    icon: faChild as IconProp
  }
];
