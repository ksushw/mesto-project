import { Popup } from './Popup';

class PopupWithForm extends Popup {
    constructor(selector, formSubmit) {
        super(selector);
        this._formSubmit = formSubmit;
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
        const formName = this._form.getAttribute('name');
        if (formName === 'edit-profile') {
            const inputName = this._form.querySelector('.form__input_name');
            const inputSurname = this._form.querySelector('.form__input_job');
            const profileName = document.querySelector('.profile__name').textContent;
            const profileSurname = document.querySelector('.profile__description').textContent;

            inputName.value = profileName;
            inputSurname.value = profileSurname;
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
