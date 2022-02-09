import { action, computed, observable, makeObservable } from 'mobx';
import { UsersGetDto } from 'models/UserGetDto';

class UserStore {
  userId: string = undefined;
  loginType: string = undefined;
  me: UsersGetDto;

  constructor() {
    makeObservable(this, {
      userId: observable,
      me: observable,
      loginType: observable,
      setMe: action,
      setUserId: action,
      setLoginType: action
    });
  }

  setMe = (user: UsersGetDto) => {
    this.me = user;
  };

  setUserId = (newUserId: string) => {
    this.userId = newUserId;
    window.localStorage.setItem('id', newUserId);
  };

  setLoginType = (type: string) => {
    this.loginType = type;
    window.localStorage.setItem('loginType', type);
  };
}

export const userStore = new UserStore();
