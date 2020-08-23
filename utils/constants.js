const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const content = document.querySelector('.content'); // контент

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

const cardList = content.querySelector('.elements__list'); // список карточек
const inputCardName = popupNewCard.querySelector('.popup__entry-field_item-name'); // поле ввода названия карточки
const inputCardImage = popupNewCard.querySelector('.popup__entry-field_item-image-url'); // поле ввода ссылки для карточки

const cardTemplateSelector = '.element-template'; // шаблон для создания карточки

export { 
    initialCards, 
    popupProfile, 
    popupNewCard, 
    popupImage, 
    formPopupProfile, 
    formPopupNewCard, 
    inputProfileName, 
    inputProfileDescription, 
    profileName, 
    profileDescription,
    buttonOpenPopupProfile,
    buttonOpenPopupNewCard,
    cardList,
    inputCardName,
    inputCardImage,
    cardTemplateSelector
};