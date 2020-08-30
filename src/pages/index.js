import {
    cardTemplateSelector,
    cardListSection
} from '../utils/constants.js';
import { config } from '../utils/config.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
import './index.css';

// объявляем переменные
const content = document.querySelector('.content'); // контент

const popupProfile = content.querySelector('.popup__edit-profile'); // попап с редактированием данных профиля
const popupNewCard = content.querySelector('.popup__new-item'); // попап с добавлением новой карточки
const popupImage = content.querySelector('.popup__image') // попап с открытие картинки
const popupEditAvatar = content.querySelector('.popup__update-avatar'); // попап редактирования аватара
const popupDeleteCard = content.querySelector('.popup__delete-item'); // попап удаления карточки

const formPopupProfile = popupProfile.querySelector('.popup__container'); // форма в HTML в профайле
const formPopupNewCard = popupNewCard.querySelector('.popup__container'); // форма в HTML в новой карточке
const formPopupEditAvatar = popupEditAvatar.querySelector('.popup__container') // форма в HTML в редакторе аватара

const profileName = content.querySelector('.profile__text-name'); // текст в HTML в имени в профайле
const profileDescription = content.querySelector('.profile__text-description'); // текст в HTML в описании в профайле
const profileAvatar = content.querySelector('.profile__avatar-image'); // ссылка в HTML на картинку в аватаре профайла

const inputProfileName = formPopupProfile.querySelector('.popup__entry-field_account-name'); // поле ввода имени в профайле
const inputProfileDescription = formPopupProfile.querySelector('.popup__entry-field_account-description'); // поле ввода описания в профайле
const inputProfileAvatarUrl = formPopupEditAvatar.querySelector('.popup__entry-field_avatar-image-url') // поле ввода ссылки на картинку аватара

const buttonOpenPopupProfile = content.querySelector('.profile__text-edit'); // кнопка открытия попапап профайл
const buttonOpenPopupNewCard = content.querySelector('.profile__add-button'); // кнопка открытия попапа новая карточка
const buttonOpenPopupEditAvatar = content.querySelector('.profile__avatar-edit'); // кнопка открытия попапа редактора аватара

let myID        // переменная с Id пользователя

const formPopupProfileValidator = new FormValidator(config, formPopupProfile);  // экземпляр класса для валидации форм в модальном окне "Profile"
const formPopupNewCardValidator = new FormValidator(config, formPopupNewCard);  // экземпляр класса для валидации форм в модальном окне "NewCard"
const formPopupEditAvatarValidation = new FormValidator(config, formPopupEditAvatar);   // экземпляр класса для валидации форм в модальном окне "EditAvatar"

formPopupProfileValidator.enableValidation();                                   // вызываем публичный метод включения валидации
formPopupNewCardValidator.enableValidation();
formPopupEditAvatarValidation.enableValidation();

const api = new Api({                                                       // экземпляр класса для общения с сервером
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        authorization: 'e85ea904-e4e6-4bf9-b3e5-7844a7dfa51b',
        'Content-Type': 'application/json'
    }
});

const renderLoading = loading => {                                          // функция изменения надписи кнопки во время отправки данных на сервер
    const openedPopup = document.querySelector('.popup_opened');
    const submitButton = openedPopup.querySelector('.popup__submit-button');

    submitButton.textContent = loading ? 'Сохранение...' : 'Сохранить';
}

const userInfo = new UserInfo({                                             // экземпляр класса для определения значений полей формы модального окна "Profile" и "EditAvatar"
    data: {
        name: profileName,
        about: profileDescription,
        avatar: profileAvatar
    } 
});

const main = ([userData, cards]) => {                                       // функция для отображения полученных данных пользователя и полученных карточек
    userInfo.setUserInfo(userData)
    myID = userData._id;
    cardList.renderItems(cards);                                            // вызываем публичный метод для рендера карточек на странице
}

Promise.all([                                                               // единовременно получаем данные о пользователе и о карточках
    api.getUserInfo(),
    api.getInitialCards(),
])
    .then(main)
    .catch((err) => {
        console.log(err);
    });

function addUserInfo() {                                                    // функция для заполнения полей ввода формы модального окна "Profile" при открытии модального окна
    const userData = userInfo.getUserInfo();                                // записываем объект со данными пользователя в переменную
    
    inputProfileName.value = userData.name;                                 // подставляем в поля значения из переменной
    inputProfileDescription.value = userData.about;
    inputProfileAvatarUrl.value = userData.avatar
}

const profile = new PopupWithForm({                                         // экземпляр класса для создания модального окна профайла
    popupSelector: popupProfile, 
    handlerFormSubmit: (data) => {
        renderLoading(true);
        api.sendUserInfo(data)                                              // вызываем публичный метод для отправки данных на сервер и получения ответа с новыми данными
            .then((res) => {
                profileName.textContent = res.name;
                profileDescription.textContent = res.about;
            })
            .then(() => profile.close())
            .catch((err) => {
                console.log(err);
            });
    }
});

profile.setEventListeners();                                                // вызываем публичный метод добавления слушателей

buttonOpenPopupProfile.addEventListener('click', function () {              // функция открытия модального окна "Profile" при нажатии кнопки
    profile.open();                                                         // вызываем публичный метод открытия модального окна
    renderLoading(false);
    addUserInfo();                                                          // вызываем публичный метод добавления текущих текстовых значений в поля ввода формы
    formPopupProfileValidator.resetInputValidation();                       // вызываем публичный метод для сброса ошибок валидации полей формы
    formPopupProfileValidator.resetButtonValidation();                      // вызываем публичный метод для сброса ошибок валидации кнопки 'submit'
})

const avatar = new PopupWithForm({                                          // экземпляр класса для создания модального окна редактора аватара
    popupSelector: popupEditAvatar, 
    handlerFormSubmit: (data) => {
        renderLoading(true);
        api.sendUserAvatar(data)                                            // вызываем публичный метод для отправки данных на сервер и получения ответа с новыми данными
            .then((res) => {
                profileAvatar.src = res.avatar;
            })
            .then(() => avatar.close())
            .catch((err) => {
                console.log(err);
            });
    }
});

avatar.setEventListeners();                                                 // вызываем публичный метод добавления слушателей

buttonOpenPopupEditAvatar.addEventListener('click', function () {           // функция открытия модального окна "EditAvatar" при нажатии кнопки
    avatar.open();                                                          // вызываем публичный метод открытия модального окна
    renderLoading(false);
    addUserInfo();                                                          // вызываем публичный метод добавления текущих текстовых значений в поля ввода формы
    formPopupEditAvatarValidation.resetInputValidation();                   // вызываем публичный метод для сброса ошибок валидации полей формы
    formPopupEditAvatarValidation.resetButtonValidation();                  // вызываем публичный метод для сброса ошибок валидации кнопки 'submit'
})

const deleteCardPopup = new PopupDeleteCard(popupDeleteCard);               // экземпляр класса для модального окна "DeleteCard"

deleteCardPopup.setEventListeners();                                        // вызываем публичный метод добавления слушателей

const openPopupImage = new PopupWithImage(popupImage);                      // экземпляр класса для открытия модального окна "CardImage"

openPopupImage.setEventListeners();                                         // вызываем публичный метод добавления слушателей

const addCard = (item) => {
    const card = new Card({
        data: item,
        myID,
        handlerCardClick: () => {
            openPopupImage.open(item);
        },
        handlerLikeClick: () => {
            const isLiked = card.isLiked();

            if(isLiked) {
                api.deleteLikeCard(item._id)
                    .then(item => card.updateLikeCount(item.likes))
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                api.likeCard(item._id)
                    .then(item => card.updateLikeCount(item.likes))
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        handlerDeleteIconClick: () => {
            deleteCardPopup.open();
            deleteCardPopup.setSubmitHandler(() => {
                api.deleteCard(item._id)
                    .then(() => {
                        card.removeCard();
                        deleteCardPopup.close();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
        }
    }, cardTemplateSelector);
    const cardElement = card.generateCard();                                // вызываем публичный метод для создания карточки
    
    return cardElement;
}

const cardList = new Section({                                              // экземпляр класса для добавления элементов в разметку
    renderer: (data) => {
        cardList.addItem(addCard(data));                                    // вызываем публичный метод для добавления карточки в разметку
    }
},
cardListSection);

const newCard = new PopupWithForm({                                         // экземпляр класса для создания новой карточки
    popupSelector: popupNewCard, 
    handlerFormSubmit: (data) => {
        renderLoading(true);
        api.sendCard(data)
            .then((res) => {
                cardList.addItem(addCard(res));
            })
            .then(() => newCard.close())
            .catch((err) => {
                console.log(err);
            });
    }
});

newCard.setEventListeners();                                                // вызываем публичный метод добавления слушателей

buttonOpenPopupNewCard.addEventListener('click', function () {              // функция открытия модального окна "NewCard" при нажатии кнопки
    newCard.open();                                                         // вызываем публичный метод открытия модального окна
    renderLoading(false);
    formPopupNewCardValidator.resetInputValidation();                       // вызываем публичный метод для сброса ошибок валидации полей формы
    formPopupNewCardValidator.inactiveButton();                             // вызываем публичный метод для деактивации кнопки 'submit'
})
