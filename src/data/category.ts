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

export const CATEGORY = [
  {
    id: 'food',
    name: 'ด้านการจัดหาอาหาร',
    icon: faHamburger
  },
  {
    id: 'cloth',
    name: 'ด้านเครื่องแต่งกาย',
    icon: faTshirt
  },
  {
    id: 'furniture',
    name: 'ด้านเครื่องใช้ในบ้าน',
    icon: faCouch
  },
  {
    id: 'electronic',
    name: 'ด้านเครื่องใช้ไฟฟ้า',
    icon: faPlug
  },
  {
    id: 'agriculture',
    name: 'ด้านอุปกรณ์ทำการเกษตร',
    icon: faTractor
  },
  {
    id: 'stationary',
    name: 'ด้านหนังสือและเครื่องเขียน',
    icon: faPencilAlt
  },
  {
    id: 'music',
    name: 'ด้านเพลงและดนตรี',
    icon: faMusic
  },
  {
    id: 'mobile',
    name: 'ด้านมือถือและอุปกรณ์เสริม',
    icon: faMobile
  },
  {
    id: 'sports',
    name: 'ด้านกีฬาและอุปกรณ์เสริม',
    icon: faSwimmer
  },
  {
    id: 'health',
    name: 'ด้านสุขภาพและความงาม',
    icon: faMedkit
  }
];
