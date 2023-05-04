export default class UserInfo {
    constructor({ nameSelector, descriptionSelector, imageSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._descriptionElement = document.querySelector(descriptionSelector);
        this._imageElement = document.querySelector(imageSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._descriptionElement.textContent,
            userId: this._userId,
        }
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._nameElement.textContent = name;
        this._descriptionElement.textContent = about;
        this._imageElement.src = avatar;
        this._userId = _id;
    }

}