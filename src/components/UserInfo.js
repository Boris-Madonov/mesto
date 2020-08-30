export class UserInfo {
    constructor({ data }) {
        this._userName = data.name;
        this._userAbout = data.about;
        this._userAvatar = data.avatar;
    }

    getUserInfo() {                                                     // публичный метод заполнения полей ввода из разметки при открытии модального окна "Profile"
        this._userInfo = {
            name: this._userName.textContent,
            about: this._userAbout.textContent,
            avatar: this._userAvatar.src
        };

        return this._userInfo;
    }

    setUserInfo(data) {                                                 // публичный метод добавления новых значений в разметку
        this._userName.textContent = data.name;
        this._userAbout.textContent = data.about;
        this._userAvatar.src = data.avatar
    }
}