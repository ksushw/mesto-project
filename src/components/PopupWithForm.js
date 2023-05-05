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

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
            evt.target.reset();
            this.close();
        })
    }
}

export { PopupWithForm }