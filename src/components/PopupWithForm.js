import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {                          // класс на основе класса "Popup"
    constructor({ popupSelector, handlerFormSubmit }) {
        super(popupSelector);
        this._handlerFormSubmit = handlerFormSubmit;                // функция обработчик 'submit' формы
    }

    _getInputValues() {                                                                                 // приватный метод получения значений полей формы
        this._inputList = this._popupSelector.querySelectorAll('.popup__entry-field');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name]= input.value;
        });
        return this._formValues;
    }

    close() {
        super.close();
        this._popupSelector.querySelector('.popup__container').reset();                                 // вызываем метод сброса значений полей формы
    }

    _handlerSubmitButton = (evt) => {                                                                   // приватный метод обработки нажатия кнопки 'submit'
        evt.preventDefault();
        this._handlerFormSubmit(this._getInputValues());
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.querySelector('.popup__container').addEventListener('submit', this._handlerSubmitButton);    // слушатель по кнопки 'submit' формы с вызовом функции обработчика
    }

    _removeEventListeners() {
        super._removeEventListeners();
        this._popupSelector.querySelector('.popup__container').removeEventListener('submit', this._handlerSubmitButton);
    }
}