export enum StatusType {
  WAITING = 'waiting',
  PENDING = 'pending',
  COMPLETE = 'complete',
  CANCEL = 'cancel'
}

export const STATUS_MAPPER = {
  [StatusType.WAITING]: {
    status: 'รอดำเนินการ',
    color: '#FFC700'
  },
  [StatusType.PENDING]: {
    status: 'กำลังดำเนินการ',
    color: '#FF7A00'
  },
  [StatusType.COMPLETE]: {
    status: 'สำเร็จ',
    color: '#42C306'
  },
  [StatusType.CANCEL]: {
    status: 'ยกเลิก',
    color: '#E00101'
  }
};
