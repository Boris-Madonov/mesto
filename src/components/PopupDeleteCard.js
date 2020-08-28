import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.popup__container');
    }

    setSubmitHandler(handler) {                                                     // публичный метод связи формы модального окна с карточкой
        this._handlerFormSubmit = handler;
    }

    _handlerSubmitButton = (evt) => {                                               // приватный метод обработки нажатия кнопки 'submit'
        evt.preventDefault();
        if(this._handlerFormSubmit) {
            this._handlerFormSubmit();
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (this._handlerSubmitButton));
    }
}