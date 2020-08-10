import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup, content, popupProfile, popupNewCard } from './utils.js';

// объявляем переменные

const formPopupProfile = popupProfile.querySelector('.popup__container'); // форма в HTML в профайле
const formPopupNewCard = popupNewCard.querySelector('.popup__container'); // форма в HTML в новой карточке

const inputProfileName = formPopupProfile.querySelector('.popup__entry-field_account-name'); // поле ввода имени в профайле
const inputProfileDescription = formPopupProfile.querySelector('.popup__entry-field_account-description'); // поле ввода описания в профайле

const profileName = content.querySelector('.profile__text-name'); // текст в HTML в имени в профайле
const profileDescription = content.querySelector('.profile__text-description'); // текст в HTML в описании в профайле

const buttonOpenPopupProfile = content.querySelector('.profile__text-edit'); // кнопка открытия попапап профайл
const buttonOpenPopupNewCard = content.querySelector('.profile__add-button'); // кнопка открытия попапа новая карточка
const buttonSubmitPopupNewCard = popupNewCard.querySelector('.popup__submit-button'); // кнопка 'submit' в модальном окне Новая карточка

const cardList = content.querySelector('.elements__list'); // список карточек
const inputCardName = popupNewCard.querySelector('.popup__entry-field_item-name'); // поле ввода названия карточки
const inputCardImage = popupNewCard.querySelector('.popup__entry-field_item-image-url'); // поле ввода ссылки для карточки

const cardTemplateSelector = '.element-template'; // шаблон для создания карточки

const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__entry-field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputElementErrorClass: 'popup__entry-field_type_error',
    errorClass: 'popup__entry-field-error_active'
};

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

function addCard(item) {                                                    // функция добавления новой карточки с помощью класса Card
    const card = new Card(item, cardTemplateSelector);
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