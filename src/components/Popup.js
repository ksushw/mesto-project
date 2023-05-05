class Popup {
    constructor(selector) {
        this.popup = selector;
        this.closeIcon = this.popup.querySelector('.popup__button-close');
        this.overlay = this.popup.querySelector('.popup__overlay');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this.popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        document.removeEventListener('keyup', this._handleEscClose);
        this.popup.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this.closeIcon.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
    }
}

export { Popup }
