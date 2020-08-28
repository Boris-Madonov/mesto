export class Card {
    constructor({ data, myID, handlerCardClick, handlerLikeClick, handlerDeleteIconClick }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._userId = myID;
        this._handlerCardClick = handlerCardClick;
        this._handlerLikeClick = handlerLikeClick;
        this._handlerDeleteIconClick = handlerDeleteIconClick;
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
        this._cardLikes = this._cardElement.querySelector('.element__like-counter');
        this._cardDelete = this._cardElement.querySelector('.element__remove')
        this._setEventListeners();                                                      // вызов приватного метода со слушателями карточки


        if (this._ownerId === this._userId) {                                           // проверка на владельца карточки
            this._cardDelete.style.display = 'block';
        } else {
            this._cardDelete.style.display = 'none';
        }

        this._cardName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardLikes.textContent = this._likes.length;

        return this._cardElement;                                                       // возвращаем готовую карточку
    }

    _getLikeCount() {                                                                   // приватный метод счетчика лайков
        return this._likes.length;
    }

    isLiked() {                                                                         // публичный метод проверки лайка карточки
        return !!this._likes.find(like => like._id === this._userId);
    }

    updateLikeCount(newLikes) {                                                         // публичный метод обновления счетчика лайков
        this._likes = newLikes;
        this._cardElement.querySelector('.element__like-counter').textContent = this._getLikeCount();
        if(this.isLiked()) {
            this._cardElement.querySelector('.element__like').classList.add('element__like_liked');
        } else {
            this._cardElement.querySelector('.element__like').classList.remove('element__like_liked');
        }
    }

    removeCard() {                                                                      // публичный метод удаления карточки
        this._cardElement.remove();
        this._cardElement = null;
    }

    _setEventListeners() {                                                                              // приватный метод слушателей карточки
        this._cardElement.querySelector('.element__like').addEventListener('click', () => {             // слушатель нажатия кнопки лайка карточки
            this._handlerLikeClick(this._cardId);                                                       // вызов приватного метода обработчика кнопки лайка карточки
        });

        this._cardElement.querySelector('.element__remove').addEventListener('click', () => {           // слушатель нажатия на кнопку удаления карточки
            this._handlerDeleteIconClick();                                                             // вызов приватного метода обработчика кнопки удаления карточки
        });

        this._cardElement.querySelector('.element__image').addEventListener('click', () => {            // слушатель нажатия на картинку карточки
            this._handlerCardClick(this._link, this._name);                                             // вызов приватного метода обработчика нажатия на карточку
        });
    }
}