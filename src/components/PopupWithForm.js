import { Popup } from './Popup';

class PopupWithForm extends Popup {
    constructor(selector, formSubmit, beforeOpen) {
        super(selector);
        this._formSubmit = formSubmit;
        this._beforeOpen = beforeOpen;
        this._form = this.popup.querySelector('.form');
        this._submitButton = this._form.querySelector('.form__button-save');
        this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
    }

    toggleButtonText(isLoading, initialText, loadingText) {
        if (isLoading) {
            this._submitButton.textContent = loadingText;
        } else {
            this._submitButton.textContent = initialText;
        }
    }    

    _getInputValues() {
        const values = {};
        this._inputList.forEach((input) => {
            values[input.name] = input.value;
        });

        return values;
    }

    open() {
        if (this._beforeOpen) {
            this._beforeOpen();
        }
        super.open();
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
        });
    }
}

export { PopupWithForm }
