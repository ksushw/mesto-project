const showInputError = ((formElement, inputElement, validationMessage) => {
    const inputEror = formElement.querySelector(`.${inputElement.id}-error`);
    inputEror.textContent = validationMessage;
    inputEror.classList.add = ('form__input-error_active')
    inputElement.classList.add('.form__input-error');
})

const hideInputError = ((formElement, inputElement) => {
    const inputEror = formElement.querySelector(`.${inputElement.id}-error`);
    inputEror.textContent = '';
    inputEror.classList.remove('form__input-error_active')
    inputElement.classList.remove('.form__input-error');
})

const checkInputValidity = ((formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity('Поля могут содержать только латинские буквы, кириллические буквы, знаки дефиса и пробелы.');
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError(formElement, inputElement);
    }
})

const hasInvalidInput = ((inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
})

const enableButton = ((inputList, button) => {
    if (hasInvalidInput(inputList)) {
        button.classList.add('button_inactive')
    } else {
        button.classList.remove('button_inactive')
    }
})

const setEventListeners = ((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
    const button = formElement.querySelector('.popup__button-save')
    enableButton(inputList, button)

    inputList.forEach(function (input) {//maybe there is error function report
        input.addEventListener('change', () => {
            checkInputValidity(formElement, input);
            enableButton(inputList, button)
        })
    })
})

const enableValidation = (() => {
    const forms = Array.from(document.querySelectorAll('.popup__form'))
    forms.forEach((form) => {
        setEventListeners(form)
    })
})

export { showInputError, hideInputError, checkInputValidity, hasInvalidInput, enableButton, setEventListeners, enableValidation }