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

export { Popup }