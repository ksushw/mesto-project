export default class Section {
    constructor({ data, renderer }, container) {
        this._data = data;
        this._renderer = renderer;
        this._container = container;
    }

    setItems(element) {
       this._container.prepend(element);
    }

    renderItem() {
        this._renderer(this._data);
    }

    renderItems() {
        this._data.reverse();
        this._data.forEach(card => {
            this._renderer(card);
        });
    }
}

