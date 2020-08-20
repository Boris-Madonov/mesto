import { openPopupImage } from '../utils/utils.js';

export class Card {                                     // класс для создания карточек с фотографиями и подписями
    constructor(data, cardSelector) {                   // передаем к класс объект data с необходимыми параметрами и селектор выбора карточки
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {                                    // приватный метод создания карточки на основе шаблона из переданного селектора
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;                             // возвращаем заготовку карточки
    }

    generateCard() {                                                                    // публичный метод создания карточки на основе заготовки карточки
        this._cardElement = this._getTemplate();
        this._cardName = this._cardElement.querySelector('.element__description');
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._setEventListeners();                                                      // вызов приватного метода со слушателями карточки

        this._cardName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        
        return this._cardElement;                                                       // возвращаем готовую карточку
    }

    _handelLikeCard() {                                                                                 // приватный метод обработчика кнопки лайка карточки
        this._cardElement.querySelector('.element__like').classList.toggle('element__like_liked');
    }

    _handelRemoveCard() {                                                                               // приватный метод обработчика кнопки удаления карточки
        this._cardElement.remove();
    }

    _setEventListeners() {                                                                              // приватный метод слушателей карточки
        this._cardElement.querySelector('.element__like').addEventListener('click', () => {             // слушатель нажатия кнопки лайка карточки
            this._handelLikeCard();                                                                     // вызов приватного метода обработчика кнопки лайка карточки
        });

        this._cardElement.querySelector('.element__remove').addEventListener('click', () => {           // слушатель нажатия на кнопку удаления карточки
            this._handelRemoveCard();                                                                   // вызов приватного метода обработчика кнопки удаления карточки
        });

        this._cardElement.querySelector('.element__image').addEventListener('click', () => {            // слушатель нажатия на картинку карточки
            openPopupImage(this._link, this._name);                                                     // вызов функции открытия модального окна с картинкой
        });
    }
}