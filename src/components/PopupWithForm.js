import { Popup } from './Popup'

class PopupWithForm extends Popup {
    constructor(selector, formSubmit) {
        super(selector);
        this._formSubmit = formSubmit;
        this._form = this.popup.querySelector('.form');
        this._loadingText = this._form.querySelector('.form__button-save');
    }

    toggleButtonText() {
        if (this._loadingText.textContent === 'Создать') {
            this._loadingText.textContent = 'Создание...';
        } else if (this._loadingText.textContent === 'Сохранить') {
            this._loadingText.textContent = 'Сохранение...';
        } else if (this._loadingText.textContent === 'Создание...') {
            this._loadingText.textContent = 'Создать';
        } else if (this._loadingText.textContent === 'Сохранение...') {
            this._loadingText.textContent = 'Сохранить';
        }
    }

    _getInputValues() {
        this.inputs = Array.from(this._form.querySelectorAll('.form__input'));
        const values = {};
        this.inputs.forEach((input) => {
            values[input.name] = input.value;
        })

        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
            this.close();
        })
    }
}

export { PopupWithForm }