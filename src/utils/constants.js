const content = document.querySelector('.content'); // контент

const popupProfile = content.querySelector('.popup__edit-profile'); // попап с редактированием данных профиля
const popupNewCard = content.querySelector('.popup__new-item'); // попап с добавлением новой карточки
const popupImage = content.querySelector('.popup__image') // попап с открытие картинки
const popupEditAvatar = content.querySelector('.popup__update-avatar'); // попап редактирования аватара
const popupDeleteCard = content.querySelector('.popup__delete-item'); // попап удаления карточки

const formPopupProfile = popupProfile.querySelector('.popup__container'); // форма в HTML в профайле
const formPopupNewCard = popupNewCard.querySelector('.popup__container'); // форма в HTML в новой карточке
const formPopupEditAvatar = popupEditAvatar.querySelector('.popup__container') // форма в HTML в редакторе аватара

const inputProfileName = formPopupProfile.querySelector('.popup__entry-field_account-name'); // поле ввода имени в профайле
const inputProfileDescription = formPopupProfile.querySelector('.popup__entry-field_account-description'); // поле ввода описания в профайле
const inputProfileAvatarUrl = formPopupEditAvatar.querySelector('.popup__entry-field_avatar-image-url') // поле ввода ссылки на картинку аватара

const profileName = content.querySelector('.profile__text-name'); // текст в HTML в имени в профайле
const profileDescription = content.querySelector('.profile__text-description'); // текст в HTML в описании в профайле
const profileAvatar = content.querySelector('.profile__avatar-image'); // ссылка в HTML на картинку в аватаре профайла

const buttonOpenPopupProfile = content.querySelector('.profile__text-edit'); // кнопка открытия попапап профайл
const buttonOpenPopupNewCard = content.querySelector('.profile__add-button'); // кнопка открытия попапа новая карточка
const buttonOpenPopupEditAvatar = content.querySelector('.profile__avatar-edit'); // кнопка открытия попапа редактора аватара

const cardListSection = '.elements__list'; // секция с карточками

const cardTemplateSelector = '.element-template'; // шаблон для создания карточки

export { 
    popupProfile, 
    popupNewCard, 
    popupImage,
    popupEditAvatar,
    popupDeleteCard,
    formPopupProfile, 
    formPopupNewCard,
    formPopupEditAvatar, 
    inputProfileName, 
    inputProfileDescription,
    inputProfileAvatarUrl, 
    profileName, 
    profileDescription,
    profileAvatar,
    buttonOpenPopupProfile,
    buttonOpenPopupNewCard,
    buttonOpenPopupEditAvatar,
    cardTemplateSelector,
    cardListSection
};