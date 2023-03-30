class Pokemon {

    #name;
    #id;
    #sprite;

    constructor(name, id, sprite) {
        this.#name = name;
        this.#id = id;
        this.#sprite = sprite;
    }


    toJson() {
        return {"name" : this.#name, "id" : this.#id, "sprites" : {"front_default": this.#sprite}};
    }
}

module.exports = Pokemon;