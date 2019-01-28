export default class GotService{
    constructor(){
        this._apiBase = "https://anapioficeandfire.com/api/";
    }

    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`);

        //проверяем на ошибки сервера

        if (!res.ok){
            throw new Error(res.status);
        }

        return await res.json();
    }

    async getAllCharacters(){
        const res = await this.getResource("/characters?page=5&pageSize=10");
        return res.map(this._tranfornChar);
    }
    
    async getCharacter(id){
        const res = await this.getResource(`/characters/${id}`);
        return this._tranfornChar(res);
    }

    async getAllBooks(){
        const res = await this.getResource("/books");
        return res.map(this._transformBook)
    }
    
    async getBook(id){
        const res = await this.getResource(`/books/${id}`);
        return this._transformBook(res);
    }
    async getAllHouses(){
        const res = await this.getResource("/houses");
        return res.map(this._transformHouse);
    }
    
    async getHouse(id){
        const res = await this.getResource(`/houses/${id}`);
        return this._transformHouse(res);
    }

    _tranfornChar(char){
        return{
            name: char.name,
            gender: char.gender || "нет данных",
            born: char.born || "нет данных",
            died: char.died || "нет данных",
            culture: char.culture || "нет данных"
        }
    }

    _transformHouse(house){
        return{
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons,
        }
    }

    _transformBook(book){
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}