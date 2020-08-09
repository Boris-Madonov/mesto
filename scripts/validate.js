const showInputError = (config, formSelector, inputElement, errorMessage) =>{       // функция показа ошибки валидации
    const errorElement = formSelector.querySelector(`#${inputElement.id}-error`);   // выбираем элемент с ошибкой - у которого id заканчивается на -error
    inputElement.classList.add(config.inputElementErrorClass);                      // добавляем полю ввода класс для отображения ошибки
    errorElement.textContent = errorMessage;                                        // добавляем текст ошибки
    errorElement.classList.add(config.errorClass);                                  // добавляем стилизацию текста ошибки
};

const hideInputError = (config, formSelector, inputElement) => {                    // функция скрытия ошибки
    const errorElement = formSelector.querySelector(`#${inputElement.id}-error`);   // выбираем элемент с ошибкой - у которого id заканчивается на -error
    inputElement.classList.remove(config.inputElementErrorClass);                   // удаляем стилизацию поля ввода для отображения ошибки
    errorElement.classList.remove(config.errorClass);                               // удаляем стилизацию текста ошибки
    errorElement.textContent = '';                                                  // удаляем текст ошибки
};

const hasInvalidInput = (inputList) => {                                            // функция для определения валидности полей ввода
    return inputList.some((inputElement) => {                                       // определяем есть ли хоть одно поле в форме невалидное
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (config, inputList, buttonElement) => {                           // функция переключения активности кнопки 'submit'  
    if (hasInvalidInput(inputList)) {                                                       // условие если поле невалидное - кнопка должна быть не активной
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {                                                                                // если нет не валидных полей - то кнопка должна быть активной
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

const isValid = (config, formSelector, inputElement) => {                                   // функция показа / скрытия ошибки валидации
    if (!inputElement.validity.valid) {                                                     // условие если поле формы не валидно то запускаем функцию показа ошибки 
        showInputError(config, formSelector, inputElement, inputElement.validationMessage);
    } else {                                                                                // если поле валидно - то запускаем функцию скрытия ошибки
        hideInputError(config, formSelector, inputElement);
    }
};

const setEventListeners = (config, formSelector) => {                                       // слушатель по форме
    const inputList = Array.from(formSelector.querySelectorAll(config.inputElement));       // список (массив) всех полей в форме
    const buttonElement = formSelector.querySelector(config.submitButtonSelector);          // кнопка 'submit'
    inputList.forEach((inputElement) => {                                                   // для каждого поля списка запускаем слушатель по нажатию кнопки, тем самым проверяем валидность полей
        inputElement.addEventListener('input', () => {
            isValid(config, formSelector, inputElement);
            toggleButtonState(config, inputList, buttonElement);                            // вызываем функцию переключения состояния кнопки 'submit' для ее включения в случае валидности всех полей
        });
    });
};

const enableValidation = (config) => {                                                      // функцию для перебора форм на валидацию
    const formList = Array.from(document.querySelectorAll(config.formSelector));            // список (массив) всех форм в документе
    formList.forEach((formElement) => {                                                     // для каждой формы вызываем функцию слушателя форм
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(config, formElement);
    });
};
