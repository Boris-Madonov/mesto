export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {                                                                                // публичный метод открытия модального окна
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);                         // слушатель для возможности закрытия попапа по нажатию 'Escape'
    }

    close() {                                                                               // публичный метод закрытия модального окна
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);                      // удаление слушателя для возможности закрытия попапа по нажатию 'Escape'
    }

    _handleEscClose(evt) {                                                                  // приватный метод закрытия модального окна по нажатию 'Escape'
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened')
            if (openedPopup) {
                this.close();
            }
        }
    }

    _handelOverlayClose(evt) {                                                              // приватный метод закрытия модального окна при нажатии на overlay
        if(evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {                                                                   // публичный метод слушателей модального окна
        this.buttonClosePopup = this._popupSelector.querySelector('.popup__close-button');  // находим кнопку крестика
        
        this._popupSelector.addEventListener('mousedown', () => {                           // слушатель нажатия на overlay
            this._handelOverlayClose
        });
        this.buttonClosePopup.addEventListener('click', () => {                             // слушатель нажатия на кнопку крестика
            this.close();
        });
    }
}