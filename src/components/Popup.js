export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    _handlerEscClose = (evt) => {                                                            // приватный метод закрытия модального окна по нажатию 'Escape'
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handlerOverlayClose = (evt) => {                                                        // приватный метод закрытия модального окна при нажатии на overlay
        if(evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    _handlerCloseButton = () => {                                                           // приватный метод закрытия модального окна при нажатии на кнопку крестика
        this.close()
    }

    open() {                                                                                // публичный метод открытия модального окна
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handlerEscClose);                         // слушатель для возможности закрытия попапа по нажатию 'Escape'
        this._popupSelector.addEventListener('mousedown', this._handlerOverlayClose);
    }

    close() {                                                                               // публичный метод закрытия модального окна
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handlerEscClose);                      // удаление слушателя для возможности закрытия попапа по нажатию 'Escape'
        this._popupSelector.removeEventListener('mousedown', this._handlerOverlayClose);
    }

    setEventListeners() {                                                                   // публичный метод слушателя закрытия модального окна по нажатию кнопки крестика
        this._popupSelector.querySelector('.popup__close-button').addEventListener('click', this._handlerCloseButton);
        // находим кнопку крестика и добавляем к ней слушатель по нажатию
    }
}