import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.popup__container');
    }

    _setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            if(this._handlerFormSubmit) {
                this._handlerFormSubmit();
            }
        });
    }

    setSubmitHandler(handler) {
        this._handlerFormSubmit = handler;
    }
}