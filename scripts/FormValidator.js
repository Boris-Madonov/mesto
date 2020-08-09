export class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputElementErrorClass = config.inputElementErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorMessage) {                                               // приватный метод показа ошибки валидации
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);      // выбираем элемент с ошибкой - у которого id заканчивается на -error
        
        inputElement.classList.add(this._inputElementErrorClass);                               // добавляем полю ввода класс для отображения ошибки
        errorElement.textContent = errorMessage;                                                // добавляем текст ошибки
        errorElement.classList.add(this._errorClass);                                           // добавляем стилизацию текста ошибки
    };
    
    _hideInputError(inputElement) {                                                             // приватный метод скрытия ошибки валидации
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);      // выбираем элемент с ошибкой - у которого id заканчивается на -error
        
        inputElement.classList.remove(this._inputElementErrorClass);                            // удаляем стилизацию поля ввода для отображения ошибки
        errorElement.classList.remove(this._errorClass);                                        // удаляем стилизацию текста ошибки
        errorElement.textContent = '';                                                          // удаляем текст ошибки
    };

    _hasInvalidInput(inputList) {                                                               // приватный метод определения валидности полей ввода
        return inputList.some((inputElement) => {                                               // определяем есть ли хоть одно поле в форме невалидное
            return !inputElement.validity.valid;
        })
    };

    _isValid(inputElement) {                                                                    // приватный метод показа / скрытия ошибки валидации
        if (!inputElement.validity.valid) {                                                     // условие если поле формы не валидно то запускаем функцию показа ошибки 
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {                                                                                // если поле валидно - то запускаем функцию скрытия ошибки
            this._hideInputError(inputElement);
        }
    };

    _toggleButtonState(inputList, buttonElement) {                                              // приватный метод переключения активности кнопки 'submit'  
        if (this._hasInvalidInput(inputList)) {                                                 // условие если поле невалидное - кнопка должна быть не активной
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', 'disabled');
        } else {                                                                                // если нет не валидных полей - то кнопка должна быть активной
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    };

    _setEventListeners() {                                                                      // приватный метод слушателей по форме
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));  // список (массив) всех полей в форме
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);      // кнопка 'submit'
        
        inputList.forEach((inputElement) => {                                                   // для каждого поля списка запускаем слушатель по нажатию кнопки, тем самым проверяем валидность полей
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);                              // вызываем функцию переключения состояния кнопки 'submit' для ее включения в случае валидности всех полей
            });
        });
    };

    enableValidation() {                                                                        // публичный метод добавления обработчиков для форм 
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();                                                              // вызываем приватный метод слушателей по форме
    };

    resetForm() {                                                                               // публичный метод для сброса ошибок валидации
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));  // список (массив) всех полей в форме 
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);      // кнопка 'submit'

        inputList.forEach((inputElement) => {                                                   // для каждого поля в форме запускаем приватный метод по скрытию ошибок валидации
            this._hideInputError(inputElement)
        });

        buttonElement.classList.remove(this._inactiveButtonClass);                              // удаление класса неактивной кнопки
        buttonElement.removeAttribute('disabled');                                              // удаление атрибута disabled у кнопки
    }
}