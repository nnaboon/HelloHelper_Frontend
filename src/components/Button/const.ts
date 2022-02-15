export enum StatusType {
  WAITING = 'waiting',
  PENDING = 'pending',
  PROGRESS = 'progress',
  COMPLETE = 'complete',
  CANCEL = 'cancel'
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
  },
  [StatusType.CANCEL]: {
    status: 'ยกเลิก',
    color: '#E00101'
  }
};
