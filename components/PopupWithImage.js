import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {                                         // класс на основе класса Popup
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(cardImage, cardName) {                                                     // публичный метод открытия попапа с картинкой по нажатию на нее
        const image = this._popupSelector.querySelector('.popup__item-image');
        const name = this._popupSelector.querySelector('.popup__item-name');

        image.src = cardImage;
        image.alt = cardName;
        name.textContent = cardName;

        super.open();
    }
}