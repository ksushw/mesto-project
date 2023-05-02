//const popupEdit = document.querySelector('.popup_type_edit');
//const buttonsClose = document.querySelectorAll('.popup__button-close');
//const popupAvatar = document.querySelector('.popup_type_avatar-edit');



/* const closeByEsc = ((evt) => {
    if (evt.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_opened')
        closePopup(popupOpen)
    }
})

//оТКРЫВАЕТ ПОПАП, БЛОКИРУЕТ КНОПКУ ОТПРАВКИ, ВЕШАЕТ СЛУШАТЕЛИ ЗАКРЫТИЯ
const openPopup = ((popup) => {
    popup.classList.add('popup_opened');
    const overlay = popup.querySelector('.popup__overlay');
    document.addEventListener('keyup', closeByEsc);
    overlay.addEventListener('click', handlerEventListenerOverlay);
})

function handlerEventListenerOverlay() {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen)
}

const closePopup = ((popup) => {
    const overlay = popup.querySelector('.popup__overlay');
    document.removeEventListener('keyup', closeByEsc)
    overlay.removeEventListener('click', handlerEventListenerOverlay);
    popup.classList.remove('popup_opened');
})

const popupCloseHandler = (function () {
    buttonsClose.forEach(function (button) {
        const popup = button.closest('.popup');
        button.addEventListener('click', function () {
            closePopup(popup)
        });
    })
})

const setWaitingButton = ((popup)=>{
    const button = popup.querySelector('.form__button-save')
    button.setAttribute('disabled', true);
    button.textContent = "Сохранение..."
})

const unsetWaitingButton = ((popup)=>{
    const button = popup.querySelector('.form__button-save')
    button.textContent = "Сохранение"
})

*/

class Popup {
    constructor(selector) {
        this.popup = selector;
        this.closeIcon = this.popup.querySelector('.popup__button-close');
        this.overlay = this.popup.querySelector('.popup__overlay');
    }

    open() {
        this.popup.classList.add('popup_opened');
        this.overlay.addEventListener('click', () => this.close());
        this.setEventListeners()
    }

    close() {
        document.removeEventListener('keyup', (evt) => this._handlerEscClose(evt))
        this.overlay.removeEventListener('click', () => this.close());
        this.closeIcon.removeEventListener('click', () => this.close());
        this.popup.classList.remove('popup_opened');
    }

    _handlerEscClose(evt) {
        if (evt.key === 'Escape' && this.popup.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        this.closeIcon.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        document.addEventListener('keyup', (evt) => this._handlerEscClose(evt));
    }
}

class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._image = this.popup.querySelector('.popup__image');
        this._caption = this.popup.querySelector('.popup__capture');
    }


    open(imageSrc, imageCaption) {
        this._image.src = imageSrc;
        this._image.alt = imageCaption;
        this._caption.textContent = imageCaption;
        super.open();
    }


}

class PopupWithForm extends Popup {
    constructor(selector, formSubmit) {
        super(selector);
        this._formSubmit = formSubmit;
        this._form = this.popup.querySelector('.form');
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

export { Popup, PopupWithForm, PopupWithImage }