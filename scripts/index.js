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

const inputName = popupProfile.querySelector('.popup__entry-field_account-name'); // поле ввода имени в профайле
const inputDescription = popupProfile.querySelector('.popup__entry-field_account-description'); // поле ввода описания в профайле
const profileName = content.querySelector('.profile__text-name'); // текст в HTML в имени в профайле
const profileDescription = content.querySelector('.profile__text-description'); // текст в HTML в описании в профайле

const formPopupProfile = popupProfile.querySelector('.popup__container'); // форма в HTML в профайле
const formPopupNewCard = popupNewCard.querySelector('.popup__container'); // форма в HTML в новой карточке

const buttonOpenPopupProfile = content.querySelector('.profile__text-edit'); // кнопка открытия попапап профайл
const buttonOpenPopupNewCard = content.querySelector('.profile__add-button'); // кнопка открытия попапа новая карточка

const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-button'); // кнопка закрытия попапа профайла
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__close-button'); // кнопка закрытия попапа новая карточка
const buttonClosePopupImage = popupImage.querySelector('.popup__close-button'); // кнопка закрытия попапа картинки

const cardList = content.querySelector('.elements__list'); // список карточек
const cardTemplate = content.querySelector('.element-template'); // шаблон карточек
const inputCardName = popupNewCard.querySelector('.popup__entry-field_item-name'); // поле ввода названия карточки
const inputCardImage = popupNewCard.querySelector('.popup__entry-field_item-image-url'); // поле ввода ссылки для карточки

function togglePopup(popup) {                  // функция для открытия и закрытия попапа
    popup.classList.toggle('popup_opened');     // добавляем/удаляем модификатор для открытия/закрытия попапа
}

function handlerSubmitFormProfile(evt) {                       // функция для переноса нового текста, при внесении изменений в текстовые поля в попапа
    evt.preventDefault();                                       // отменяем стандартную отправку формы, теперь можем определить свою логику отправки формы
    profileName.textContent = inputName.value;                  // вставляем в текстовые поля измененный текст в секции popup
    profileDescription.textContent = inputDescription.value;
    togglePopup(popupProfile);                                  // закрываем попап
}

buttonOpenPopupProfile.addEventListener('click', function () {  // открываем секцию popup при нажатии кнопки
    togglePopup(popupProfile);
    inputName.value = profileName.textContent;                  // при открытии секции popup в поля ввода переносится текущий текст
    inputDescription.value = profileDescription.textContent;
})

buttonOpenPopupNewCard.addEventListener('click', function () {  // открываем секцию popup при нажатии кнопки
    togglePopup(popupNewCard);
    formPopupNewCard.reset();                                   // сброс текста в полях ввода
})

formPopupProfile.addEventListener('submit', handlerSubmitFormProfile);      // заменяем текст и закрываем секцию popup при нажатии кнопки

buttonClosePopupProfile.addEventListener('click', () => togglePopup(popupProfile));    // закрываем секцию popup при нажатии кнопки

buttonClosePopupNewCard.addEventListener('click', () => togglePopup(popupNewCard));

buttonClosePopupImage.addEventListener('click', () => togglePopup(popupImage));

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
    togglePopup(popupImage);
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
    togglePopup(popupNewCard);
}

formPopupNewCard.addEventListener('submit', handlerSubmitFormNewCard);  // создаем новую карточку

initialCards.forEach(function(card) {           // рендер карточек
    cardList.prepend(addCard(card));
});


/*

cardImage.addEventListener('click', function() {                                // функция открытия попапа с картинкой по нажатию на нее
        const image = content.querySelector('.popup__item-image');
        const name = content.querySelector('.popup__item-name');
        image.src = cardImage.src;                                  // комментарий для ревью - очень долго бился над тем чтобы вынести эту функцию из слушателя, пока не вышло!
        image.alt = cardImage.alt;
        name.textContent = cardName.textContent;
        togglePopup(popupImage);
    })

*/