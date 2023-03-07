const formSelectors = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-save',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: '.form__input-error',
    errorClass: '.form__input-error_active'
}

const showInputError = ((formElement, inputElement, validationMessage, formSelectors) => {
    const inputEror = formElement.querySelector(`.${inputElement.id}-error`);
    inputEror.textContent = validationMessage;
    inputEror.classList.add(formSelectors.errorClass)
    inputElement.classList.add(formSelectors.inputErrorClass);
})

const hideInputError = ((formElement, inputElement, formSelectors) => {
    const inputEror = formElement.querySelector(`.${inputElement.id}-error`);
    inputEror.textContent = '';
    inputEror.classList.remove(formSelectors.errorClass)
    inputElement.classList.remove(formSelectors.inputErrorClass);
})

const checkInputValidity = ((formElement, inputElement, formSelectors) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, formSelectors)
    } else {
        hideInputError(formElement, inputElement, formSelectors);
    }
})

const hasInvalidInput = ((inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
})

const enableButton = ((inputList, button, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        button.setAttribute('disabled', true)
        button.classList.add(inactiveButtonClass)
    } else {
        button.removeAttribute('disabled')
        button.classList.remove(inactiveButtonClass)
    }
})

const setDisableButton = ((form) => {
    const button = form.querySelector('.form__button-save');
    button.setAttribute('disabled', true);
    button.classList.add('button_inactive');
})


const setEventListeners = ((formElement, formSelectors) => {
    const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector))
    const button = formElement.querySelector(formSelectors.submitButtonSelector)
    enableButton(inputList, button, formSelectors.inactiveButtonClass)

    inputList.forEach(function (input) {
        input.addEventListener('input', () => {
            checkInputValidity(formElement, input, formSelectors);
            enableButton(inputList, button, formSelectors.inactiveButtonClass)
        })
    })
})


const enableValidation = ((formSelectors) => {
    const forms = Array.from(document.querySelectorAll(formSelectors.formSelector))
    forms.forEach((form) => {
        setEventListeners(form, formSelectors)
    })
})


export { formSelectors, setDisableButton, showInputError, hideInputError, checkInputValidity, hasInvalidInput, enableButton, setEventListeners, enableValidation }