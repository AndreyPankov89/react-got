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

    getAllCharacters = async () => {
        const res = await this.getResource("/characters?page=15&pageSize=10");
        return res.map(this._tranfornChar);
    }
    
    getCharacter = async (id) => {
        const res = await this.getResource(`/characters/${id}`);
        return this._tranfornChar(res);
    }

    getAllBooks = async () => {
        const res = await this.getResource("/books");
        return res.map(this._transformBook)
    }
    
    getBook = async (id) => {
        const res = await this.getResource(`/books/${id}`);
        return this._transformBook(res);
    }
    getAllHouses = async () => {
        const res = await this.getResource("/houses");
        return res.map(this._transformHouse);
    }
    
    getHouse = async (id) => {
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
            id: this._getId(char.url)
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
            id: this._getId(house.url)
        }
    }

    _transformBook = (book) => {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages || this._noData,
            publisher: book.publisher || this._noData,
            released: book.released || this._noData,
            id: this._getId(book.url)
        }
    }

    _getId(str){
        const regex = /([1-9,0]+?)$/;
        let m;
        
        if ((m = regex.exec(str)) !== null) {
            return m[0];       
        }
    }

    _arrayOrEmpty(data){
        if (data[0]){
            return data.join(", ");
        }
        else{
            return this._noData
        }
    }
}