import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {                                         // класс на основе класса Popup
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(data) {                                                     // публичный метод открытия попапа с картинкой по нажатию на нее
        const image = this._popupSelector.querySelector('.popup__item-image');
        const name = this._popupSelector.querySelector('.popup__item-name');

        image.src = data.link;
        image.alt = data.name;
        name.textContent = data.name;

        super.open();
    }
}