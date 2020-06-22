let content = document.querySelector('.content');
let popup = content.querySelector('.popup');
let editProfileTextButton = content.querySelector('.profile__text-edit');
let closePopupButton = popup.querySelector('.popup__close-button');
let inputName = popup.querySelector('.popup__entry-field_account-name');
let inputDescription = popup.querySelector('.popup__entry-field_account-description');
let profileName = content.querySelector('.profile__text-name');
let profileDescription = content.querySelector('.profile__text-description');
let formElement = popup.querySelector('.popup__container');

function popupOpen () {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
};

editProfileTextButton.addEventListener('click', popupOpen);

function popupClose () {
    popup.classList.remove('popup_opened');
};

closePopupButton.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
    evt.preventDefault();   

    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;

    popupClose ();
};

formElement.addEventListener('submit', formSubmitHandler);
