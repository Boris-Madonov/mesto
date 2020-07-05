// объявляем переменные

const content = document.querySelector('.content');
const popup = content.querySelector('.popup');
const inputName = popup.querySelector('.popup__entry-field_account-name');
const inputDescription = popup.querySelector('.popup__entry-field_account-description');
const profileName = content.querySelector('.profile__text-name');
const profileDescription = content.querySelector('.profile__text-description');
const formElement = popup.querySelector('.popup__container');

const popupEditProfileText = content.querySelector('.popup__edit-profile');
const popupNewItemAdd = content.querySelector('.popup__new-item');

const editProfileTextButton = content.querySelector('.profile__text-edit');
const addNewItemButton = content.querySelector('.profile__add-button');

const closePopupEditProfileTextButton = popupEditProfileText.querySelector('.popup__close-button');
const closePopupNewItemAddButton = popupNewItemAdd.querySelector('.popup__close-button');
const closePopupImageButton = content.querySelector('.popup__close-button');

// функция для открытия секции popup
function popupOpen (popupType) {

    // добавляем модификатор для открытия секции popup
    popupType.classList.add('popup_opened');

    // при открытии секции popup в поля ввода переносится текущий текст
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
};

// функция для закрятия секции popup
function popupClose (popupType) {

    // удаляем модификатор для открытия секции popup
    popupType.classList.remove('popup_opened');  
};


// функция для переноса нового текста, при внесении изменений в текстовые поля в секции popup
function formSubmitHandler (evt) {

    // отменяем стандартную отправку формы, теперь можем определить свою логику отправки формы
    evt.preventDefault();   

    // вставляем в текстовые поля измененный текст в секции popup
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;

    // при выполнении данной функции секция popup должна закрываться
    popupClose (popupEditProfileText);
};



// открываем секцию popup при нажатии кнопки
editProfileTextButton.addEventListener('click', function () {
    popupOpen (popupEditProfileText);
});

addNewItemButton.addEventListener('click', function () {
    popupOpen (popupNewItemAdd);
});



// закрываем секцию popup при нажатии кнопки
closePopupEditProfileTextButton.addEventListener('click', function () {
    popupClose (popupEditProfileText);
});

closePopupNewItemAddButton.addEventListener('click', function () {
    popupClose (popupNewItemAdd);
});



// заменяем текст и закрываем секцию popup при нажатии кнопки
formElement.addEventListener('submit', formSubmitHandler);
