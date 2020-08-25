import { profileName, profileDescription } from '../utils/constants.js';

export class UserInfo {
    constructor({ data }) {
        this._userName = data.name;
        this._userAbout = data.about;
    }

    getUserInfo() {                                                     // публичный метод заполнения полей ввода из разметки при открытии модального окна "Profile"
        this._userInfo = {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        };

        return this._userInfo;
    }

    setUserInfo(data) {                                                 // публичный метод добавления новых значений в разметку
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
    }
}