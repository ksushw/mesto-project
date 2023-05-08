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
            this._inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
            this._submitButton = formElement.querySelector(formSelectors.submitButtonSelector);
        }

        _showInputError(inputElement, validationMessage) {
            const inputError = this.formElement.querySelector(`.${inputElement.id}-error`);
            inputError.textContent = validationMessage;
            inputError.classList.add(this.formSelectors.errorClass);
            inputElement.classList.add(this.formSelectors.inputErrorClass);
        }

        _checkInputValidity(inputElement) {
            if (inputElement.validity.patternMismatch) {
                inputElement.setCustomValidity(inputElement.dataset.errorMessage);
            } else {
                inputElement.setCustomValidity('');
            }

            if (!inputElement.validity.valid) {
                this._showInputError(inputElement, inputElement.validationMessage)
            } else {
                this.hideInputError(inputElement);
            }
        }

        _hasInvalidInput() {
            return this._inputList.some((inputElement) => {
                return !inputElement.validity.valid;
            });
        }

        _toggleButtonState() {
            if (this._hasInvalidInput()) {
                this.disableButton();
            } else {
                this._submitButton.removeAttribute('disabled');
                this._submitButton.classList.remove(this.formSelectors.inactiveButtonClass);
            }
        }
        

        _setEventListeners() {
            this._toggleButtonState()

            this._inputList.forEach((input) => {
                input.addEventListener('input', () => {
                    this._checkInputValidity(input);
                    this._toggleButtonState()
                })
            })
        }

        hideInputError(inputElement) {
            const inputError = this.formElement.querySelector(`.${inputElement.id}-error`);
            inputError.textContent = '';
            inputError.classList.remove(this.formSelectors.errorClass)
            inputElement.classList.remove(this.formSelectors.inputErrorClass);
        }

        disableButton() {
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.add(this.formSelectors.inactiveButtonClass);
        }

        enableValidation() {
            this._setEventListeners();
        }
    }

    export { FormValidator, formSelectors }
