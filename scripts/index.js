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
]

const content = document.querySelector('.content'); // контент
const popup = content.querySelector('.popup'); // попап

const popupProfile = content.querySelector('.popup__edit-profile'); // попап с редактированием данных профиля
const popupNewCard = content.querySelector('.popup__new-item'); // попап с добавлением новой карточки
const popupImage = content.querySelector('.popup__image') // попап с открытие картинки

const inputName = popupProfile.querySelector('.popup__entry-field_account-name'); // поле ввода имени в профайле
const inputDescription = popupProfile.querySelector('.popup__entry-field_account-description'); // поле ввода описания в профайле
const profileName = content.querySelector('.profile__text-name'); // текст в HTML в имени в профайле
const profileDescription = content.querySelector('.profile__text-description'); // текст в HTML в описании в профайле

const formPopupProfile = popupProfile.querySelector('.popup__container'); // форма в HTML в профайле
const formPopupNewCard = popupNewCard.querySelector('.popup__container'); // форма в HTML в новой карточке

const openPopupProfileButton = content.querySelector('.profile__text-edit'); // кнопка открытия попапап профайл
const openPopupNewCardButton = content.querySelector('.profile__add-button'); // кнопка открытия попапа новая карточка

const closePopupProfileButton = popupProfile.querySelector('.popup__close-button'); // кнопка закрытия попапа профайла
const closePopupNewCardButton = popupNewCard.querySelector('.popup__close-button'); // кнопка закрытия попапа новая карточка
const closePopupImageButton = popupImage.querySelector('.popup__close-button'); // кнопка закрытия попапа картинки

const cardList = content.querySelector('.elements__list'); // список карточек

const cardTemplate = content.querySelector('.element-template'); // шаблон карточек
const inputCardName = popupNewCard.querySelector('.popup__entry-field_item-name'); // поле ввода названия карточки
const inputCardImage = popupNewCard.querySelector('.popup__entry-field_item-image-url'); // поле ввода ссылки для карточки

function popupToggle (popup) {                  // функция для открытия и закрытия попапа
    popup.classList.toggle('popup_opened');     // добавляем/удаляем модификатор для открытия/закрытия попапа
};

function profileFormSubmitHandler (evt) {                      // функция для переноса нового текста, при внесении изменений в текстовые поля в попапа
    evt.preventDefault();                                       // отменяем стандартную отправку формы, теперь можем определить свою логику отправки формы
    profileName.textContent = inputName.value;                  // вставляем в текстовые поля измененный текст в секции popup
    profileDescription.textContent = inputDescription.value;
    popupToggle(popupProfile);                                  // закрываем попап
};

openPopupProfileButton.addEventListener('click', function () {  // открываем секцию popup при нажатии кнопки
    popupToggle(popupProfile);
    inputName.value = profileName.textContent;                  // при открытии секции popup в поля ввода переносится текущий текст
    inputDescription.value = profileDescription.textContent;
});

openPopupNewCardButton.addEventListener('click', function () {
    popupToggle(popupNewCard);
    formPopupNewCard.reset();
});

formPopupProfile.addEventListener('submit', profileFormSubmitHandler);      // заменяем текст и закрываем секцию popup при нажатии кнопки

closePopupProfileButton.addEventListener('click', function () { // закрываем секцию popup при нажатии кнопки
    popupToggle(popupProfile);
});

closePopupNewCardButton.addEventListener('click', function () {
    popupToggle(popupNewCard);
});

closePopupImageButton.addEventListener('click', function () {
    popupToggle(popupImage);
});

function removeCard (evt) {                         // функция удаления карточки
    const item = evt.target.closest('.element');
    item.remove();
}

function addCard (item) {                                               // функция создания новой карточки с функциональностями
    const card = cardTemplate.content.cloneNode(true);
    const removeCardButton = card.querySelector('.element__remove');
    const cardLikeButton = card.querySelectorAll('.element__like');
    const cardImage = card.querySelector('.element__image');
    const cardName = card.querySelector('.element__description');
    cardName.textContent = item.name;
    cardImage.alt = item.name;
    cardImage.src = item.link;
    removeCardButton.addEventListener('click', removeCard);
    cardLikeButton.forEach(function (cardLike) {                                        // функция добавления лайка при нажатии на кнопку лайк
        cardLike.addEventListener('click', function (event) {
            const like = event.target;
            like.classList.toggle('element__like_liked');
        });
    })
    cardImage.addEventListener('click', function (evt) {                                // функция открытия картинки по нажатию на нее
        event.target.closest('.element__image');
        content.querySelector('.popup__item-image').src = cardImage.src;
        content.querySelector('.popup__item-name').textContent = cardName.textContent;
        popupToggle(popupImage);
    });
    cardList.prepend(card);
}

function newCardFormSubmitHandler (evt) {           // функция добавления значений полей ввода в новую карточку
    evt.preventDefault();
    let name = inputCardName.value;
    let link = inputCardImage.value;
    let cardElements = {name, link}
    addCard(cardElements);
    popupToggle(popupNewCard);
}

formPopupNewCard.addEventListener('submit', newCardFormSubmitHandler);  // создаем новую карточку

initialCards.forEach(card => addCard(card));        // рендер карточек
