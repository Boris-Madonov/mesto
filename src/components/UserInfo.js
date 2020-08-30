const profileName = document.querySelector('.profile__text-name'); // текст в HTML в имени в профайле
const profileDescription = document.querySelector('.profile__text-description'); // текст в HTML в описании в профайле
const profileAvatar = document.querySelector('.profile__avatar-image'); // ссылка в HTML на картинку в аватаре профайла

class UserInfo {
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
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        profileAvatar.src = data.avatar
    }
}

export { profileName, profileDescription, profileAvatar, UserInfo }