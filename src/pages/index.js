import { 
    popupProfile, 
    popupNewCard, 
    popupImage,
    popupEditAvatar,
    popupDeleteCard,
    formPopupProfile, 
    formPopupNewCard,
    formPopupEditAvatar,
    profileName,
    profileDescription,
    profileAvatar,
    inputProfileName, 
    inputProfileDescription,
    inputProfileAvatarUrl,
    buttonOpenPopupProfile,
    buttonOpenPopupNewCard,
    buttonOpenPopupEditAvatar,
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
// import './index.css';

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


api.getUserInfo()                                                           // вызываем публичный метод
    .then((res) => {
        profileName.textContent = res.name;
        profileDescription.textContent = res.about;
        profileAvatar.src = res.avatar
    })


const userInfo = new UserInfo({                                             // экземпляр класса для определения значений полей формы модального окна "Profile" и "EditAvatar"
    data: {
        name: profileName,
        about: profileDescription,
        avatar: profileAvatar
    } 
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
        api.sendUserInfo(data)                                              // вызываем публичный метод для отправки данных на сервер и получения ответа с новыми данными
            .then((res) => {
                profileName.textContent = res.name;
                profileDescription.textContent = res.about;
            })
    }
});

profile.setEventListeners();                                                // вызываем публичный метод добавления слушателей

buttonOpenPopupProfile.addEventListener('click', function () {              // функция открытия модального окна "Profile" при нажатии кнопки
    profile.open();                                                         // вызываем публичный метод открытия модального окна
    addUserInfo();                                                          // вызываем публичный метод добавления текущих текстовых значений в поля ввода формы
    formPopupProfileValidator.resetInputValidation();                       // вызываем публичный метод для сброса ошибок валидации полей формы
    formPopupProfileValidator.resetButtonValidation();                      // вызываем публичный метод для сброса ошибок валидации кнопки 'submit'
})

const avatar = new PopupWithForm({                                          // экземпляр класса для создания модального окна редактора аватара
    popupSelector: popupEditAvatar, 
    handlerFormSubmit: (data) => {
        api.sendUserAvatar(data)                                            // вызываем публичный метод для отправки данных на сервер и получения ответа с новыми данными
            .then((res) => {
                profileAvatar.src = res.avatar;
            })
    }
});

avatar.setEventListeners();                                                 // вызываем публичный метод добавления слушателей

buttonOpenPopupEditAvatar.addEventListener('click', function () {           // функция открытия модального окна "EditAvatar" при нажатии кнопки
    avatar.open();                                                          // вызываем публичный метод открытия модального окна
    addUserInfo();                                                          // вызываем публичный метод добавления текущих текстовых значений в поля ввода формы
    formPopupEditAvatarValidation.resetInputValidation();                   // вызываем публичный метод для сброса ошибок валидации полей формы
    formPopupEditAvatarValidation.resetButtonValidation();                  // вызываем публичный метод для сброса ошибок валидации кнопки 'submit'
})


const deleteCardPopup = new PopupDeleteCard(popupDeleteCard);               // экземпляр класса для модального окна "DeleteCard"

deleteCardPopup.setEventListeners();                                        // вызываем публичный метод добавления слушателей

deleteCardPopup.setSubmitHandler(() => deleteCard());

const openPopupImage = new PopupWithImage(popupImage);                      // экземпляр класса для открытия модального окна "CardImage"

openPopupImage.setEventListeners();                                         // вызываем публичный метод добавления слушателей

function handlerCardClick(link, name) {                                     // функция открытия модального окна "CardImage"
    openPopupImage.open(link, name);                                        // вызываем публичный метод открытия модального окна и передаем данные для "CardImage"
}

function handlerLikeClick() {
    api.likeCard(data)
        .then((res) => {

        })
}

function addCard(data) {                                                    // функция для создания карточки
    console.log(data);
    const card = new Card(data, cardTemplateSelector, handlerCardClick);    // экземпляр класса для создания карточки
    const cardElement = card.generateCard();                                // вызываем публичный метод для создания карточки
    
    return cardElement;
}

const cardList = new Section({                                              // экземпляр класса для добавления элементов в разметку
    renderer: (data) => {
        cardList.addItem(addCard(data));                                    // вызываем публичный метод для добавления карточки в разметку
    }
},
cardListSection);

api.getInitialCards()
    .then((res) => {
        cardList.renderItems(res);                                          // вызываем публичный метод для добавления карточек в разметку
    });

const newCard = new PopupWithForm({                                         // экземпляр класса для создания новой карточки
    popupSelector: popupNewCard, 
    handlerFormSubmit: (data) => {
        api.sendCard(data)
            .then((res) => {
                cardList.addItem(addCard(res));
            })
    }
});

newCard.setEventListeners();                                                // вызываем публичный метод добавления слушателей

buttonOpenPopupNewCard.addEventListener('click', function () {              // функция открытия модального окна "NewCard" при нажатии кнопки
    newCard.open();                                                         // вызываем публичный метод открытия модального окна
    formPopupNewCardValidator.resetInputValidation();                       // вызываем публичный метод для сброса ошибок валидации полей формы
    formPopupNewCardValidator.inactiveButton();                             // вызываем публичный метод для деактивации кнопки 'submit'
})
