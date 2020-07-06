// объявляем переменные

const content = document.querySelector('.content'); // контент
const popup = content.querySelector('.popup'); // попап

const popupProfile = content.querySelector('.popup__edit-profile'); // попап с редактированием данных профиля
const popupNewItem = content.querySelector('.popup__new-item'); // попап с добавлением новой карточки
const popupImage = content.querySelector('.popup__image') // попап с открытие картинки

const inputName = popupProfile.querySelector('.popup__entry-field_account-name'); // поле ввода имени в профайле
const inputDescription = popupProfile.querySelector('.popup__entry-field_account-description'); // поле ввода описания в профайле
const profileName = content.querySelector('.profile__text-name'); // текст в HTML в имени в профайле
const profileDescription = content.querySelector('.profile__text-description'); // текст в HTML в описании в профайле

const formElement = popup.querySelector('.popup__container'); // форма в HTML в профайле

const openPopupProfileButton = content.querySelector('.profile__text-edit'); // кнопка открытия попапап профайл
const openPopupNewItemButton = content.querySelector('.profile__add-button'); // кнопка открытия попапа новая карточка

const closePopupProfileButton = popupProfile.querySelector('.popup__close-button'); // кнопка закрытия попапа профайла
const closePopupNewItemButton = popupNewItem.querySelector('.popup__close-button'); // кнопка закрытия попапа новая карточка
const closePopupImageButton = content.querySelector('.popup__close-button'); // кнопка закрытия попапа картинки

const itemsList = content.querySelector('.elements__list'); // список карточек
const removeItemButton = itemsList.querySelectorAll('.element__remove'); // кнопка удаления карточки


// отсюда идет правильный код

function popupToggle (popup) { // функция для открытия и закрытия попапа
    popup.classList.toggle('popup_opened'); // добавляем/удаляем модификатор для открытия/закрытия попапа
};

const formSubmitHandler = function (evt) { // функция для переноса нового текста, при внесении изменений в текстовые поля в попапа
    evt.preventDefault(); // отменяем стандартную отправку формы, теперь можем определить свою логику отправки формы
    profileName.textContent = inputName.value;  // вставляем в текстовые поля измененный текст в секции popup
    profileDescription.textContent = inputDescription.value;
    popupToggle(popupProfile); // закрываем попап
};

openPopupProfileButton.addEventListener('click', function () { // открываем секцию popup при нажатии кнопки
    popupToggle(popupProfile);
    inputName.value = profileName.textContent; // при открытии секции popup в поля ввода переносится текущий текст
    inputDescription.value = profileDescription.textContent;
});

openPopupNewItemButton.addEventListener('click', function () {
    popupToggle(popupNewItem);
});

formElement.addEventListener('submit', formSubmitHandler);  // заменяем текст и закрываем секцию popup при нажатии кнопки

closePopupProfileButton.addEventListener('click', function () { // закрываем секцию popup при нажатии кнопки
    popupToggle(popupProfile);
});

closePopupNewItemButton.addEventListener('click', function () {
    popupToggle(popupNewItem);
});

removeItemButton.forEach(function (item) {  // выбираем все кнопки удаления карточек
    item.addEventListener('click', function () { // добавляем срабатывание при нажатии кнопки
        const element = item.closest('.element'); // выбираем именно ту карточку, кнопка которой нажата
        element.remove(); // удаляем карточку по нажатию кнопки
    });
})






// ниже идет черновик


/* 


buttonSavePopup.addEventListener('click', formSubmitHandler);







removeItemButton.addEventListener('click', function () {
    const item = removeItemButton.closest('.element');
    item.remove();
});




// создаем функционал добавления новой карточки
const inputItemName = popup.querySelector('.popup__entry-field_item-name');
const inputItemImage = popup.querySelector('.popup__entry-field_item-image-url');


// создаем связь шаблона для элементов (карточек) и наполняем его содержимым

const itemTemplate = content.querySelector('.element-template'); // связываем шаблон для карточки

function addNewItem (item) {

    const newItem = itemTemplate.cloneNode(true); // создаем переменную (Новая карточка) и копируеим в нее шаблон

// создаем поля ввода для занесения данных новой карточки


// наполняем содержимым новую карточку по шаблону
    newItem.querySelector('.element__image').src = item.link;
    newItem.querySelector('.element__description').textContent = item.name;
    itemsList.prepend(newItem);
}
*/