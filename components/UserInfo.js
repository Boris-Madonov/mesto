import { Popup } from './Popup.js';
import { inputProfileName, inputProfileDescription, } from '../utils/constants.js'

export class UserInfo extends Popup {                                   // класс на основе класса Popup
    constructor({ data }, popupSelector) {
        super(popupSelector);
        this._userName = data.userName;
        this._userInfo = data.userInfo;
    }

    getUserInfo() {                                                     // публичный метод заполнения полей ввода из разметки при открытии модального окна "Profile"
        inputProfileName.value = this._userName.textContent;
        inputProfileDescription.value = this._userInfo.textContent;
    }

    setUserInfo() {                                                     // публичный метод добавления новых значений в разметку
        this._userName.textContent = inputProfileName.value;
        this._userInfo.textContent = inputProfileDescription.value;
    }
}