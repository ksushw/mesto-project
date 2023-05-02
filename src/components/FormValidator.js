const formSelectors = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-save',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: '.form__input-error',
    errorClass: '.form__input-error_active'
}

class FormValidator {
    constructor(formSelectors, formElement) {
        this.formSelectors = formSelectors;
        this.formElement = formElement;
    }

    _showInputError(formElement, inputElement, validationMessage, formSelectors) {
        const inputEror = formElement.querySelector(`.${inputElement.id}-error`);
        inputEror.textContent = validationMessage;
        inputEror.classList.add(formSelectors.errorClass);
        inputElement.classList.add(formSelectors.inputErrorClass);
    }

    _checkInputValidity(formElement, inputElement, formSelectors) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity('');
        }

        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, formSelectors)
        } else {
            this.hideInputError(formElement, inputElement, formSelectors);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _enableButton(inputList, button, inactiveButtonClass) {
        if (this._hasInvalidInput(inputList)) {
            button.setAttribute('disabled', true)
            button.classList.add(inactiveButtonClass)
        } else {
            button.removeAttribute('disabled')
            button.classList.remove(inactiveButtonClass)
        }
    }

    _setEventListeners(formElement, formSelectors) {
        const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector))
        const button = formElement.querySelector(formSelectors.submitButtonSelector)
        this._enableButton(inputList, button, formSelectors.inactiveButtonClass)

        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(formElement, input, formSelectors);
                this._enableButton(inputList, button, formSelectors.inactiveButtonClass)
            })
        })
    }

    hideInputError(formElement, inputElement, formSelectors) {
        const inputEror = formElement.querySelector(`.${inputElement.id}-error`);
        inputEror.textContent = '';
        inputEror.classList.remove(formSelectors.errorClass)
        inputElement.classList.remove(formSelectors.inputErrorClass);
    }

    setDisableButton() {
        const button = this.formElement.querySelector(this.formSelectors.submitButtonSelector);
        button.setAttribute('disabled', true);
        button.classList.add(this.formSelectors.inactiveButtonClass);
    }

    enableValidation() {
        this._setEventListeners(this.formElement, this.formSelectors);
    }
}

export { FormValidator, formSelectors }