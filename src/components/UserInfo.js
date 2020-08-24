import { profileName, profileDescription } from '../utils/constants.js'

export class UserInfo {
    constructor({ data }) {
        this._userName = data.userName;
        this._userInfo = data.userInfo;
    }

    getUserInfo() {                                                     // публичный метод заполнения полей ввода из разметки при открытии модального окна "Profile"
        this._userName.value = profileName.textContent;
        this._userInfo.value = profileDescription.textContent;
    }

    setUserInfo() {                                                     // публичный метод добавления новых значений в разметку
        profileName.textContent = this._userName;
        profileDescription.textContent = this._userInfo;
    }
}