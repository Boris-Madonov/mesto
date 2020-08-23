import { 
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
} from '../utils/constants.js';
import { config } from '../utils/config.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

const formPopupProfileValidator = new FormValidator(config, formPopupProfile);
const formPopupNewCardValidator = new FormValidator(config, formPopupNewCard);

formPopupProfileValidator.enableValidation();
formPopupNewCardValidator.enableValidation();

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
    formPopupProfileValidator.resetInputValidation();                       // вызываем метод для сброса ошибок валидации полей формы
    formPopupProfileValidator.resetButtonValidation();                      // вызываем метод для сброса ошибок валидации кнопки 'submit'
})

buttonOpenPopupNewCard.addEventListener('click', function () {              // открываем секцию popup при нажатии кнопки
    openPopup(popupNewCard);
    formPopupNewCard.reset();                                               // сброс текста в полях ввода
    formPopupNewCardValidator.resetInputValidation();                       // вызываем метод для сброса ошибок валидации полей формы
    formPopupNewCardValidator.inactiveButton();                             // кнопка 'submit' должна быть всегда неактивной при открытии модального окна
})

formPopupProfile.addEventListener('submit', handlerSubmitFormProfile);      // заменяем текст и закрываем секцию popup при нажатии кнопки

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