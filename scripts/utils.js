// объявляем переменные

const content = document.querySelector('.content'); // контент

const popupProfile = content.querySelector('.popup__edit-profile'); // попап с редактированием данных профиля
const popupNewCard = content.querySelector('.popup__new-item'); // попап с добавлением новой карточки
const popupImage = content.querySelector('.popup__image') // попап с открытие картинки

const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-button'); // кнопка закрытия попапа профайла
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__close-button'); // кнопка закрытия попапа новая карточка
const buttonClosePopupImage = popupImage.querySelector('.popup__close-button'); // кнопка закрытия попапа картинки

function openPopup(popup) {                                 // функция для открытия попапа
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);     // слушатель для возможности закрытия попапа по нажатию 'Escape'
}

function closePopup(popup) {                                // функция для закрытия попапа
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);  // удаление слушателя для возможности закрытия попапа по нажатию 'Escape'
}

function handleEscape(evt) {                                                // функция закрытия попапа по нажатию кнопки 'Escape'
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function openPopupImage(cardImage, cardName) {                          // функция открытия попапа с картинкой по нажатию на нее
    const image = document.querySelector('.popup__item-image');
    const name = document.querySelector('.popup__item-name');
    image.src = cardImage;
    image.alt = cardName;
    name.textContent = cardName;
    openPopup(popupImage);
}

function closePopupProfileOverlay(evt) {                                    // функции закрытия попапов при нажатии по оверлею
    if(evt.target.classList.contains('popup')) {
        closePopup(popupProfile);
    };
}

function closePopupNewCardOverlay(evt) {
    if(evt.target.classList.contains('popup')) {
        closePopup(popupNewCard);
    };
}

function closePopupImageOverlay(evt) {
    if(evt.target.classList.contains('popup')) {
        closePopup(popupImage);
    };
}

popupProfile.addEventListener('mousedown', closePopupProfileOverlay);       // слушатели нажатия по оверлею для закрытия попапов

popupNewCard.addEventListener('mousedown', closePopupNewCardOverlay);

popupImage.addEventListener('mousedown', closePopupImageOverlay);

buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));    // закрываем секцию popup при нажатии кнопки крестика

buttonClosePopupNewCard.addEventListener('click', () => closePopup(popupNewCard));

buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));


export { openPopup, closePopup, openPopupImage, content, popupProfile, popupNewCard };