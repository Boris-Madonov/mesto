import { 
    initialCards, 
    popupProfile, 
    popupNewCard, 
    popupImage, 
    formPopupProfile, 
    formPopupNewCard, 
    profileName, 
    profileDescription,
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
    // profile.setEventListeners();                                            // вызываем публичный метод слушателей
    userInfo.getUserInfo();                                                 // вызываем публичный метод добавления текущих текстовых значений в поля ввода формы
    formPopupProfileValidator.resetInputValidation();                       // вызываем публичный метод для сброса ошибок валидации полей формы
    formPopupProfileValidator.resetButtonValidation();                      // вызываем публичный метод для сброса ошибок валидации кнопки 'submit'
})

const openPopupImage = new PopupWithImage(popupImage);                      // экземпляр класса для открытия модального окна "CardImage"

function handlerCardClick(link, name) {                                      // функция открытия модального окна "CardImage"
    openPopupImage.open(link, name);                                        // вызываем публичный метод открытия модального окна и передаем данные для "CardImage"
    // openPopupImage.setEventListeners();                                     // вызываем публичный метод слушателей
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
    // newCard.setEventListeners();                                            // вызываем публичный метод слушателей
    formPopupNewCardValidator.resetInputValidation();                       // вызываем публичный метод для сброса ошибок валидации полей формы
    formPopupNewCardValidator.inactiveButton();                             // вызываем публичный метод для деактивации кнопки 'submit'
})

/*
initialCards.forEach((item) => {                                            // рендер базовых карточек с помощью класса Card
    addCard(item);
});
*/


/*

function handlerSubmitFormNewCard(evt) {                                    // функция добавления значений полей ввода в новую карточку
    evt.preventDefault();                                                   // отменяем стандартную отправку формы
    const item = {                                                          // создаем объект с данными для карточки из полей ввода в модальном окне "NewCard"
        name: inputCardName.value,
        link: inputCardImage.value
    };

    addCard(item);                                                          // вызываем функцию добавления новой карточки с помощью класса Card
    openPopupNewCard.close();                                               // вызываем публичный метод закрытия модального окна
}

// код про добавление новых карточек
function addCard(item) {                                                    // функция добавления новой карточки с помощью класса Card
    const card = new Card(item, cardTemplateSelector, handelCardClick);     // экземпляр класса "Card" в который передаем данные карточки, шаблон карточки, функцию открытия модального окна "CardImage"
    const cardElement = card.generateCard();                                // вызываем публичный метод для создания карточки

    cardList.prepend(cardElement);                                          // вставляем карточку в разметку
}


// код про модальное окно "NewCard"
const openPopupNewCard = new PopupWithForm(handlerSubmitFormNewCard, popupNewCard);     // экземпляр класса "PopupWithForm" для модального окна "NewCard"

buttonOpenPopupNewCard.addEventListener('click', function () {              // функция открытия модального окна "NewCard" при нажатии кнопки
    openPopupNewCard.open();                                                // вызываем публичный метод открытия модального окна
    formPopupNewCardValidator.resetInputValidation();                       // вызываем публичный метод для сброса ошибок валидации полей формы
    formPopupNewCardValidator.inactiveButton();                             // вызываем публичный метод для деактивации кнопки 'submit'
})

function handlerSubmitFormNewCard(data) {                                    // функция добавления значений полей ввода в новую карточку
    
    addCard(data);                                                          // вызываем функцию добавления новой карточки с помощью класса Card
}


initialCards.forEach((item) => {                                            // рендер базовых карточек с помощью класса Card
    addCard(item);
});


const openPopupProfile = new UserInfo({                                         // экземпляр класса "UserInfo" для модального окна "Profile"
    data: {                                                                     // передаем объект "data" и селектор модального окна "Profile"
        userName: profileName,
        userInfo: profileDescription
    }
}, popupProfile);

buttonOpenPopupProfile.addEventListener('click', function () {              // функция открытия модального окна "Profile" при нажатии кнопки
    openPopupProfile.open();                                                // вызываем публичный метод открытия модального окна
    openPopupProfile.getUserInfo();                                         // вызываем публичный метод добавления текущих текстовых значений в поля ввода формы
    formPopupProfileValidator.resetInputValidation();                       // вызываем публичный метод для сброса ошибок валидации полей формы
    formPopupProfileValidator.resetButtonValidation();                      // вызываем публичный метод для сброса ошибок валидации кнопки 'submit'
})

function handlerSubmitFormProfile(evt) {                                    // функция для переноса нового текста, при внесении изменений в текстовые поля в попапа
    evt.preventDefault();                                                   // отменяем стандартную отправку формы
    openPopupProfile.setUserInfo();                                         // вызываем публичный метод добавления новых текстовых значений в разметку
    openPopupProfile.close();                                               // вызываем публичный метод для закрытия модального окна
}

formPopupProfile.addEventListener('submit', handlerSubmitFormProfile);      // заменяем текст и закрываем секцию popup при нажатии кнопки "submit"


*/