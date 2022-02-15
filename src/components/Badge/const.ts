export const RANK_BADGE = {
  platinum: {
    name: 'platinum',
    color:
      'linear-gradient(270deg, #FFE200 -34.75%, #EF8227 27.67%, #DB4D99 102.99%, rgba(255, 184, 0, 0) 103.01%);'
  },
  diamond: {
    name: 'diamond',
    color:
      'linear-gradient(270deg, #FFC700 7.02%, rgba(239, 130, 39, 0.95) 45.17%, #EE5600 103.01%);'
  },
  gold: {
    name: 'gold',
    color: '#FFB800'
  },
  silver: {
    name: 'silver',
    color: '#C0C0C0'
  },
  classic: {
    name: 'classic',
    color: '#885548'
  }
};

export enum StatusType {
  WAITING = 'waiting',
  PENDING = 'pending',
  PROGRESS = 'progress',
  COMPLETE = 'complete'
}

export const STATUS_MAPPER = {
  [StatusType.PENDING]: {
    status: 'รอดำเนินการ',
    color: '#FFC700'
  },
  [StatusType.PROGRESS]: {
    status: 'กำลังดำเนินการ',
    color: '#FF7A00'
  },
  [StatusType.COMPLETE]: {
    status: 'สำเร็จ',
    color: '#42C306'
  }
};
