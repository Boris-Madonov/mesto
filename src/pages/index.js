import { 
    initialCards, 
    popupProfile, 
    popupNewCard, 
    popupImage, 
    formPopupProfile, 
    formPopupNewCard,
    inputProfileName, 
    inputProfileDescription,
    buttonOpenPopupProfile,
    buttonOpenPopupNewCard,
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
import './index.css';

const formPopupProfileValidator = new FormValidator(config, formPopupProfile);  // экземпляр класса для валидации форм в модальном окне "Profile"
const formPopupNewCardValidator = new FormValidator(config, formPopupNewCard);  // экземпляр класса для валидации форм в модальном окне "NewCard"

formPopupProfileValidator.enableValidation();                                   // вызываем публичный метод включения валидации
formPopupNewCardValidator.enableValidation();

const userInfo = new UserInfo({                                             // экземпляр класса для определения значений полей формы модального окна "Profile"
    data: {
        userName: inputProfileName,
        userInfo: inputProfileDescription
    } 
});

const profile = new PopupWithForm({                                         // экземпляр класса для создания новой карточки
    popupSelector: popupProfile, 
    handlerFormSubmit: (data) => {
        const  newUserInfo = new UserInfo({ data });                            // экземпляр класса для обновления значений полей формы модального окна "Profile"

         newUserInfo.setUserInfo();                                             // вызов публичного метода добавления новых значений полей формы в разметку
    }
});

buttonOpenPopupProfile.addEventListener('click', function () {              // функция открытия модального окна "Profile" при нажатии кнопки
    profile.open();                                                         // вызываем публичный метод открытия модального окна
    userInfo.getUserInfo();                                                 // вызываем публичный метод добавления текущих текстовых значений в поля ввода формы
    formPopupProfileValidator.resetInputValidation();                       // вызываем публичный метод для сброса ошибок валидации полей формы
    formPopupProfileValidator.resetButtonValidation();                      // вызываем публичный метод для сброса ошибок валидации кнопки 'submit'
})

const openPopupImage = new PopupWithImage(popupImage);                      // экземпляр класса для открытия модального окна "CardImage"

function handlerCardClick(link, name) {                                      // функция открытия модального окна "CardImage"
    openPopupImage.open(link, name);                                        // вызываем публичный метод открытия модального окна и передаем данные для "CardImage"
}

const cardList = new Section({                                              // экземпляр класса для добавления элементов в разметку
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, cardTemplateSelector, handlerCardClick); // экземпляр класса для создания карточки
        const cardElement = card.generateCard();                            // вызываем публичный метод для создания карточки

        cardList.addItem(cardElement);                                      // вызываем публичный метод для добавления карточки в разметку
    }
},
cardListSection);

cardList.renderItems();                                                     // вызываем публичный метод для добавления карточек в разметку

const newCard = new PopupWithForm({                                         // экземпляр класса для создания новой карточки
    popupSelector: popupNewCard, 
    handlerFormSubmit: (data) => {
        const card = new Card(data, cardTemplateSelector, handlerCardClick);
        const cardElement = card.generateCard();

        cardList.addItem(cardElement);
    }
});

buttonOpenPopupNewCard.addEventListener('click', function () {              // функция открытия модального окна "NewCard" при нажатии кнопки
    newCard.open();                                                         // вызываем публичный метод открытия модального окна
    formPopupNewCardValidator.resetInputValidation();                       // вызываем публичный метод для сброса ошибок валидации полей формы
    formPopupNewCardValidator.inactiveButton();                             // вызываем публичный метод для деактивации кнопки 'submit'
})
