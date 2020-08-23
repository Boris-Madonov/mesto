import { 
    initialCards, 
    popupProfile, 
    popupNewCard, 
    popupImage, 
    formPopupProfile, 
    formPopupNewCard,
    profileName, 
    profileDescription,
    buttonOpenPopupProfile,
    buttonOpenPopupNewCard,
    cardList,
    inputCardName,
    inputCardImage,
    cardTemplateSelector 
} from '../utils/constants.js';
import { config } from '../utils/config.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

const formPopupProfileValidator = new FormValidator(config, formPopupProfile);  // экземпляр класса для валидации форм в модальном окне "Profile"
const formPopupNewCardValidator = new FormValidator(config, formPopupNewCard);  // экземпляр класса для валидации форм в модальном окне "NewCard"

formPopupProfileValidator.enableValidation();                                   // вызываем публичного метода включения валидации
formPopupNewCardValidator.enableValidation();

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

buttonOpenPopupNewCard.addEventListener('click', function () {              // открываем секцию popup при нажатии кнопки
    openPopup(popupNewCard);
    formPopupNewCard.reset();                                               // сброс текста в полях ввода
    formPopupNewCardValidator.resetInputValidation();                       // вызываем метод для сброса ошибок валидации полей формы
    formPopupNewCardValidator.inactiveButton();                             // кнопка 'submit' должна быть всегда неактивной при открытии модального окна
})




const openPopupImage = new PopupWithImage(popupImage);

function handelCardClick(link, name) {
    openPopupImage.open(link,name);
}

function addCard(item) {                                                    // функция добавления новой карточки с помощью класса Card
    const card = new Card(item, cardTemplateSelector, handelCardClick);
    const cardElement = card.generateCard();

    cardList.prepend(cardElement);
}

function handlerSubmitFormNewCard(evt) {                                    // функция добавления значений полей ввода в новую карточку
    evt.preventDefault();
    const item = {
        name: inputCardName.value,
        link: inputCardImage.value
    };

    addCard(item);
    closePopup(popupNewCard);
}

formPopupNewCard.addEventListener('submit', handlerSubmitFormNewCard);      // слушатель нажатия на кнопку "Создать" в модальном окне "Новая карточка"

initialCards.forEach((item) => {                                            // рендер базовых карточек с помощью класса Card
    addCard(item);
});