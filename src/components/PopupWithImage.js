import { Popup } from './Popup'

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

export { PopupWithImage }