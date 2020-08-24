export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {                                                                                // публичный метод открытия модального окна
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);                         // слушатель для возможности закрытия попапа по нажатию 'Escape'
        this._popupSelector.addEventListener('mousedown', this._handelOverlayClose);
    }

    close() {                                                                               // публичный метод закрытия модального окна
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);                      // удаление слушателя для возможности закрытия попапа по нажатию 'Escape'
        this._popupSelector.removeEventListener('mousedown', this._handelOverlayClose);
    }

    _handleEscClose = (evt) => {                                                            // приватный метод закрытия модального окна по нажатию 'Escape'
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handelOverlayClose = (evt) => {                                                        // приватный метод закрытия модального окна при нажатии на overlay
        if(evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {                                                                   // публичный метод слушателя закрытия модального окна по нажатию кнопки крестика
        this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => this.close());
        // находим кнопку крестика и добавляем к ней слушатель по нажатию
    }
}