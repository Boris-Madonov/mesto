// объявляем переменные

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

function openPopup(popup) {                 // функция для открытия попапа
    popup.classList.add('popup_opened');
}

function closePopup(popup) {                 // функция для закрытия попапа
    popup.classList.remove('popup_opened');
}

function handlerSubmitFormProfile(evt) {                       // функция для переноса нового текста, при внесении изменений в текстовые поля в попапа
    evt.preventDefault();                                       // отменяем стандартную отправку формы, теперь можем определить свою логику отправки формы
    profileName.textContent = inputProfileName.value;                  // вставляем в текстовые поля измененный текст в секции popup
    profileDescription.textContent = inputProfileDescription.value;
    closePopup(popupProfile);                                  // закрываем попап
}

buttonOpenPopupProfile.addEventListener('click', function () {  // открываем секцию popup при нажатии кнопки
    openPopup(popupProfile);
    inputProfileName.value = profileName.textContent;                  // при открытии секции popup в поля ввода переносится текущий текст
    inputProfileDescription.value = profileDescription.textContent;
})

buttonOpenPopupNewCard.addEventListener('click', function () {  // открываем секцию popup при нажатии кнопки
    openPopup(popupNewCard);
    formPopupNewCard.reset();                                   // сброс текста в полях ввода
})

formPopupProfile.addEventListener('submit', handlerSubmitFormProfile);      // заменяем текст и закрываем секцию popup при нажатии кнопки

// код для закрытия попапа по нажатию 'Esape'

/*function closePopupEscape (evt) {
    evt.key === 'Escape'
    const openedPopup = content.querySelector('.popup_opened');
    console.log(openedPopup);
}

if (evt.target.classList.contains('popup') {

}

content.addEventListener('click', closePopupEscape); */

// конец кода

function closePopupProfileOverlay(evt) {                                    // функции закрытия попапов при нажатии по оверлею
    if(evt.target.classList.contains('popup')) {
        closePopup(popupProfile);
    }
}

function closePopupNewCardOverlay(evt) {
    if(evt.target.classList.contains('popup')) {
        closePopup(popupNewCard);
    }
}

function closePopupImageOverlay(evt) {
    if(evt.target.classList.contains('popup')) {
        closePopup(popupImage);
    }
}

popupProfile.addEventListener('mousedown', closePopupProfileOverlay);       // слушатели нажатия по оверлэю для закрытия попапов

popupNewCard.addEventListener('mousedown', closePopupNewCardOverlay);

popupImage.addEventListener('mousedown', closePopupImageOverlay);

buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));    // закрываем секцию popup при нажатии кнопки

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

function openPopupImage(cardImage, cardName) {                                // функция открытия попапа с картинкой по нажатию на нее
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
    openPopup(popupNewCard);
}

formPopupNewCard.addEventListener('submit', handlerSubmitFormNewCard);  // создаем новую карточку

initialCards.forEach(function(card) {           // рендер карточек
    cardList.prepend(addCard(card));
});


// дальше код валидации полей форм

const formElement = content.querySelector('.popup__container') // форма в попапе
const inputElement = formElement.querySelector('.popup__entry-field') // поле ввода в форме


const showInputError = (formElement, inputElement, errorMessage) =>{                // функция показа ошибки валидации
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);    // выбираем элемент с ошибкой - у которого id заканчивается на -error
    inputElement.classList.add('popup__entry-field_type_error');                    // добавляем полю ввода класс для отображения ошибки
    errorElement.textContent = errorMessage;                                        // добавляем текст ошибки
    errorElement.classList.add('popup__entry-field-error_active');                  // добавляем стилизацию текста ошибки
};

const hideInputError = (formElement, inputElement) => {                             // функция скрытия ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);    // выбираем элемент с ошибкой - у которого id заканчивается на -error
    inputElement.classList.remove('popup__entry-field_type_error');                 // удаляем стилизацию поля ввода для отображения ошибки
    errorElement.classList.remove('popup__entry-field-error_active');               // удаляем стилизацию текста ошибки
    errorElement.textContent = '';                                                  // удаляем текст ошибки
};

const hasInvalidInput = (inputList) => {                                            // функция для определения валидности полей ввода
    return inputList.some((inputElement) => {                                       // определяем есть ли хоть одно поле в форме невалидное
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {                           // функция переключения активности кнопки 'submit'
    if (hasInvalidInput(inputList)) {                                               // условие если поле невалидное - кнопка должна быть не активной
        buttonElement.classList.add('popup__submit-button_disabled');
    } else {                                                                        // если нет не валидных полей - то кнопка должна быть активной
        buttonElement.classList.remove('popup__submit-button_disabled');
    }
};

const isValid = (formElement, inputElement) => {                                    // функция показа / скрытия ошибки валидации
    if (!inputElement.validity.valid) {                                             // условие если поле формы не валидно то запускаем функцию показа ошибки 
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {                                                                        // если поле валидно - то запускаем функцию скрятия ошибки
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {                                                // слушатель по форме
    const inputList = Array.from(formElement.querySelectorAll('.popup__entry-field'));      // список (массив) всех полей в форме
    const buttonElement = formElement.querySelector('.popup__submit-button');               // кнопка 'submit'
    toggleButtonState(inputList, buttonElement);                                            // вызываем функцию переключения состояния кнопки 'submit' чтобы при открытии формы кнопка была неактивна
    inputList.forEach((inputElement) => {                                                   // для каждого поля списка запускаем слушатель по нажатию кнопки, тем самым проверяем валидность полей
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);                                    // вызываем функцию переключения остояния кнопки 'submit' для ее включения в случае валидности всех полей
        });
    });
};

const enableValidation = () => {                                                    // функцию для перебора форм на валидацию
    const formList = Array.from(document.querySelectorAll('.popup__container'));    // список (массив) всех форм в документе
    formList.forEach((formElement) => {                                             // для каждой формы вызываем функцию слушателя форм
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

enableValidation();                                                                 // вызываем функцию для перебора форм на валидацию
