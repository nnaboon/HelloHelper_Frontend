export enum HelpMenu {
  PROVIDE = 'provide',
  REQUEST = 'request'
}

export const HELP_MENU_MAPPER = {
  [HelpMenu.PROVIDE]: 'ให้ความช่วยเหลือ',
  [HelpMenu.REQUEST]: 'ขอความช่วยเหลือ'
};

export const PROFILE_MENU_MAPPER = {
  [HelpMenu.PROVIDE]: 'รายการให้ความช่วยเหลือของฉัน',
  [HelpMenu.REQUEST]: 'รายการขอความช่วยเหลือของฉัน'
};
