export default class GotService{
    constructor(){
        this._apiBase = "https://anapioficeandfire.com/api/";
        this._noData = "not available";

        
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
        const res = await this.getResource("/characters?page=15&pageSize=10");
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

    _tranfornChar = (char)=>{
        return{
            name: char.name,
            gender: char.gender || this._noData,
            born: char.born || this._noData,
            died: char.died || this._noData,
            culture: char.culture || this._noData,
            url: char.url
        }
    }

    _transformHouse = (house) => {
        return{
            name: house.name,
            region: house.region || this._noData,
            words: house.words || this._noData,
            titles: this._arrayOrEmpty(house.titles),
            overlord: house.overlord || this._noData,
            ancestralWeapons: this._arrayOrEmpty(house.ancestralWeapons),
        }
    }

    _transformBook = (book) => {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages || this._noData,
            publisher: book.publisher || this._noData,
            released: book.released || this._noData
        }
    }

    _arrayOrEmpty(data){
        if (data[0]){
            return data;
        }
        else{
            return [this._noData]
        }
    }
}