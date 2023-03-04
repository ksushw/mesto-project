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
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
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
        button.setAttribute('disabled', true)
        button.classList.add('button_inactive')
    } else {
        button.removeAttribute('disabled')
        button.classList.remove('button_inactive')
    }
})

const setEventListeners = ((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'))
    const button = formElement.querySelector('.form__button-save')
    enableButton(inputList, button)

    inputList.forEach(function (input) {
        input.addEventListener('input', () => {
            checkInputValidity(formElement, input);
            enableButton(inputList, button)
        })
    })
})

const enableValidation = (() => {
    const forms = Array.from(document.querySelectorAll('.form'))
    forms.forEach((form) => {
        setEventListeners(form)
    })
})

export { showInputError, hideInputError, checkInputValidity, hasInvalidInput, enableButton, setEventListeners, enableValidation }