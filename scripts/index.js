// объявляем переменные

const content = document.querySelector('.content'); // контент
const popup = content.querySelector('.popup'); // попап

const popupProfile = content.querySelector('.popup__edit-profile'); // попап с редактированием данных профиля
const popupNewCard = content.querySelector('.popup__new-item'); // попап с добавлением новой карточки
const popupImage = content.querySelector('.popup__image') // попап с открытие картинки

const formPopupProfile = popupProfile.querySelector('.popup__container'); // форма в HTML в профайле
const formPopupNewCard = popupNewCard.querySelector('.popup__container'); // форма в HTML в новой карточке

const inputProfileName = formPopupProfile.querySelector('.popup__entry-field_account-name'); // поле ввода имени в профайле
const inputProfileDescription = formPopupProfile.querySelector('.popup__entry-field_account-description'); // поле ввода описания в профайле
const profileName = content.querySelector('.profile__text-name'); // текст в HTML в имени в профайле
const profileDescription = content.querySelector('.profile__text-description'); // текст в HTML в описании в профайле

const buttonOpenPopupProfile = content.querySelector('.profile__text-edit'); // кнопка открытия попапап профайл
const buttonOpenPopupNewCard = content.querySelector('.profile__add-button'); // кнопка открытия попапа новая карточка

const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-button'); // кнопка закрытия попапа профайла
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__close-button'); // кнопка закрытия попапа новая карточка
const buttonClosePopupImage = popupImage.querySelector('.popup__close-button'); // кнопка закрытия попапа картинки

const cardList = content.querySelector('.elements__list'); // список карточек
const cardTemplate = content.querySelector('.element-template'); // шаблон карточек
const inputCardName = popupNewCard.querySelector('.popup__entry-field_item-name'); // поле ввода названия карточки
const inputCardImage = popupNewCard.querySelector('.popup__entry-field_item-image-url'); // поле ввода ссылки для карточки

const config = {
    formSelector: '.popup__container',
    inputElement: '.popup__entry-field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputElementErrorClass: 'popup__entry-field_type_error',
    errorClass: 'popup__entry-field-error_active'
};

function openPopup(popup) {                                 // функция для открытия попапа
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);     // слушатель для возможности закрытия попапа по нажатию 'Escape'
}

function closePopup(popup) {                                // функция для закрытия попапа
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);  // удаление слушателя для возможности закрытия попапа по нажатию 'Escape'
}

function handlerSubmitFormProfile(evt) {                                    // функция для переноса нового текста, при внесении изменений в текстовые поля в попапа
    evt.preventDefault();                                                   // отменяем стандартную отправку формы, теперь можем определить свою логику отправки формы
    profileName.textContent = inputProfileName.value;                       // вставляем в текстовые поля измененный текст в секции popup
    profileDescription.textContent = inputProfileDescription.value;
    closePopup(popupProfile);                                               // закрываем попап
}

buttonOpenPopupProfile.addEventListener('click', function () {              // открываем секцию popup при нажатии кнопки
    openPopup(popupProfile);
    inputProfileName.value = profileName.textContent;                       // при открытии секции popup в поля ввода переносится текущий текст
    inputProfileDescription.value = profileDescription.textContent;
})

buttonOpenPopupNewCard.addEventListener('click', function () {              // открываем секцию popup при нажатии кнопки
    openPopup(popupNewCard);
    formPopupNewCard.reset();                                               // сброс текста в полях ввода
})

formPopupProfile.addEventListener('submit', handlerSubmitFormProfile);      // заменяем текст и закрываем секцию popup при нажатии кнопки

function handleEscape(evt) {                                                // функция закрытия попапа по нажатию кнопки 'Escape'
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
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

popupProfile.addEventListener('mousedown', closePopupProfileOverlay);       // слушатели нажатия по оверлэю для закрытия попапов

popupNewCard.addEventListener('mousedown', closePopupNewCardOverlay);

popupImage.addEventListener('mousedown', closePopupImageOverlay);

buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));    // закрываем секцию popup при нажатии кнопки крестика

buttonClosePopupNewCard.addEventListener('click', () => closePopup(popupNewCard));

buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));

function removeCard(evt) {                          // функция удаления карточки
    const item = evt.target.closest('.element');
    item.remove();
}

function likeCard(evt) {                            // функция добавления лайка при нажатии на кнопку лайк
    const like = evt.target;
    like.classList.toggle('element__like_liked');
}

function openPopupImage(cardImage, cardName) {                          // функция открытия попапа с картинкой по нажатию на нее
    const image = content.querySelector('.popup__item-image');
    const name = content.querySelector('.popup__item-name');
    image.src = cardImage.src;
    image.alt = cardImage.alt;
    name.textContent = cardName.textContent;
    openPopup(popupImage);
}

function addCard(item) {                                               // функция создания новой карточки
    const card = cardTemplate.content.cloneNode(true);
    const buttonRemoveCard = card.querySelector('.element__remove');
    const buttonCardLike = card.querySelector('.element__like');
    const cardImage = card.querySelector('.element__image');
    const cardName = card.querySelector('.element__description');
    cardName.textContent = item.name;
    cardImage.alt = item.name;
    cardImage.src = item.link;
    buttonRemoveCard.addEventListener('click', removeCard);
    buttonCardLike.addEventListener('click', likeCard);
    cardImage.addEventListener('click',  () => openPopupImage(cardImage, cardName));
    return card;
}

function handlerSubmitFormNewCard(evt) {           // функция добавления значений полей ввода в новую карточку
    evt.preventDefault();
    const newCard = {
        name: inputCardName.value,
        link: inputCardImage.value
    };
    cardList.prepend(addCard(newCard));
    closePopup(popupNewCard);
}

formPopupNewCard.addEventListener('submit', handlerSubmitFormNewCard);  // создаем новую карточку

initialCards.forEach(function(card) {           // рендер карточек
    cardList.prepend(addCard(card));
});

enableValidation(config);                                                                   // вызываем функцию для перебора форм на валидацию
