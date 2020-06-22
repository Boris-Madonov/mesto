// объявляем переменные

let content = document.querySelector('.content');
let popup = content.querySelector('.popup');
let editProfileTextButton = content.querySelector('.profile__text-edit');
let closePopupButton = popup.querySelector('.popup__close-button');
let inputName = popup.querySelector('.popup__entry-field_account-name');
let inputDescription = popup.querySelector('.popup__entry-field_account-description');
let profileName = content.querySelector('.profile__text-name');
let profileDescription = content.querySelector('.profile__text-description');
let formElement = popup.querySelector('.popup__container');

// функция для открытия секции popup
function popupOpen () {

    // добавляем модификатор для открытия секции popup
    popup.classList.add('popup_opened');

    // при открытии секции popup в поля ввода переносится текущий текст
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
};

// открываем секцию popup при нажатии кнопки
editProfileTextButton.addEventListener('click', popupOpen);

// функция для закрятия секции popup
function popupClose () {

    // удаляем модификатор для открытия секции popup
    popup.classList.remove('popup_opened');
};

// закрываем секцию popup при нажатии кнопки
closePopupButton.addEventListener('click', popupClose);

// функция для переноса нового текста, при внесении изменений в текстовые поля в секции popup
function formSubmitHandler (evt) {

    // отменяем стандартную отправку формы, теперь можем определить свою логику отправки формы
    evt.preventDefault();   

    // вставляем в текстовые поля измененный текст в секции popup
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;

    // при выполнении даннйо функции секция popup должна закрываться
    popupClose ();
};

// заменяем текст и закрываем секцию popup при нажатии кнопки
formElement.addEventListener('submit', formSubmitHandler);
