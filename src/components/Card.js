export class Card {                                     // класс для создания карточек с фотографиями и подписями
    constructor(data, cardSelector, handlerCardClick, handlerLikeClick, handlerDeleteIconClick) {  // передаем к класс объект data с необходимыми параметрами, селектор выбора карточки, обработчик нажатия по карточке
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._cardSelector = cardSelector;
        this._handlerCardClick = handlerCardClick;
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
        this._cardLikes = this._cardElement.querySelector('.element__like-counter');
        this._setEventListeners();                                                      // вызов приватного метода со слушателями карточки

        this._cardName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardLikes.textContent = this._likes.length;

        return this._cardElement;                                                       // возвращаем готовую карточку
    }

    _toggleLike() {                                                                                         // приватный метод переключения кнопки лайка карточки
        this._cardElement.querySelector('.element__like').classList.toggle('element__like_liked');
    }

    _handlerDeleteIconClick() {                                                                               // приватный метод обработчика кнопки удаления карточки
        this._cardElement.remove();
        this._cardElement = null;
    }

    _setEventListeners() {                                                                              // приватный метод слушателей карточки
        this._cardElement.querySelector('.element__like').addEventListener('click', () => {             // слушатель нажатия кнопки лайка карточки
            this._handlerLikeClick(this._id);                                                                    // вызов приватного метода обработчика кнопки лайка карточки
            this._toggleLike();
        });

        this._cardElement.querySelector('.element__remove').addEventListener('click', () => {           // слушатель нажатия на кнопку удаления карточки
            this._handlerDeleteIconClick();                                                                  // вызов приватного метода обработчика кнопки удаления карточки
        });

        this._cardElement.querySelector('.element__image').addEventListener('click', () => {            // слушатель нажатия на картинку карточки
            this._handlerCardClick(this._link, this._name);                                             // вызов приватного метода обработчика нажатия на карточку
        });
    }
}