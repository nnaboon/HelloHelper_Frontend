import { action, computed, observable } from 'mobx';
import { UsersGetDto } from 'models/UserGetDto';

class UserStore {
  @observable
  userId: string;

  @observable
  me: UsersGetDto;

  @action
  setMe = (user: UsersGetDto) => {
    this.me = user;
  };

  @computed
  get isLoggedIn(): boolean {
    return !!this.userId;
  }

  @action
  setUserId = (newUserId: string) => {
    this.userId = newUserId;
    window.localStorage.setItem('id', newUserId);
  };
}

export const userStore = new UserStore();
