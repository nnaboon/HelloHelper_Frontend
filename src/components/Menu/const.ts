export enum HelpMenu {
  PROVIDE = 'provide',
  REQUEST = 'request'
}

export enum SearchMenu {
  PROVIDE = 'provide',
  REQUEST = 'request',
  USER = 'user'
}

export enum ProfileMenu {
  HOME = 'home',
  PROVIDE = 'provide',
  REQUEST = 'request'
}

export const HELP_MENU_MAPPER = {
  [HelpMenu.PROVIDE]: 'ให้ความช่วยเหลือ',
  [HelpMenu.REQUEST]: 'ขอความช่วยเหลือ'
};

export const SEARCH_MENU_MAPPER = {
  [SearchMenu.PROVIDE]: 'ให้ความช่วยเหลือ',
  [SearchMenu.REQUEST]: 'ขอความช่วยเหลือ',
  [SearchMenu.USER]: 'ผู้ใช้งาน'
};

export const PROFILE_MENU_MAPPER = {
  [HelpMenu.PROVIDE]: 'รายการให้ความช่วยเหลือของฉัน',
  [HelpMenu.REQUEST]: 'รายการขอความช่วยเหลือของฉัน'
};

export const PROFILE_MOBILE_MENU_MAPPER = {
  [ProfileMenu.HOME]: 'หน้าแรก',
  [ProfileMenu.PROVIDE]: 'ให้ความช่วยเหลือ',
  [ProfileMenu.REQUEST]: 'ขอความช่วยเหลือ'
};

export enum CommunityMenu {
  PROVIDE = 'provide',
  REQUEST = 'request',
  MEMBER = 'member'
}

export enum CommunitySettingMenu {
  MANAGE = 'manage',
  EDIT = 'edit'
}

export enum InfoMenu {
  INFO = 'info',
  HELPER_LIST = 'helper_list'
}

export const COMMUNITY_MENU_MAPPER = {
  [CommunityMenu.PROVIDE]: 'รายการให้ความช่วยเหลือ',
  [CommunityMenu.REQUEST]: 'รายการขอความช่วยเหลือ',
  [CommunityMenu.MEMBER]: 'สมาชิก'
};

export const COMMUNITY_MOBILE_MENU_MAPPER = {
  [CommunityMenu.PROVIDE]: 'ให้ความช่วยเหลือ',
  [CommunityMenu.REQUEST]: 'ขอความช่วยเหลือ',
  [CommunityMenu.MEMBER]: 'สมาชิก'
};

export const COMMUNITY_SETTING_MENU_MAPPER = {
  [CommunitySettingMenu.MANAGE]: 'จัดการสมาชิกในชุมชน',
  [CommunitySettingMenu.EDIT]: 'แก้ไขข้อมูลชุมชน'
};

export const INFO_MENU_MAPPER = {
  [InfoMenu.INFO]: 'ข้อมูลความช่วยเหลือ',
  [InfoMenu.HELPER_LIST]: 'ผู้ต้องการช่วยเหลือ'
};
