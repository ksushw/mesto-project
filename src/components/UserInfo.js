import { getUserInfo } from '../components/api'

const profilePicture = document.querySelector('.profile__photo-img');

export default class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._nameSelector = nameSelector;
        this._descriptionSelector = descriptionSelector;
        this._name = '';
        this._description = '';
        this._userId = '';
    }

    getUserInfo() {
        return getUserInfo()
            .then((responceUserInfo) => {
                this._name = responceUserInfo.name;
                this._description = responceUserInfo.about;
                this._userId = responceUserInfo._id;

                document.querySelector(this._nameSelector).textContent = this._name;
                document.querySelector(this._descriptionSelector).textContent = this._description;

                return responceUserInfo
            })

    }

    getUserId() {
        return this._userId
    }

    setUserInfo(name, job) {
        editUserInfo(name, job)
        .then((userInfo) => {
            document.querySelector(this._nameSelector).textContent = userInfo.name;
            document.querySelector(this._descriptionSelector).textContent = userInfo.about;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            unsetWaitingButton(popupAvatar);
        });
    }


}