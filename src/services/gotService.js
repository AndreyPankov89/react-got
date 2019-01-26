export default class GotService{
    constructor(){
        this._apiBase = "https://anapioficeandfire.com/api/";
    }

    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`);

        //проверяем на ошибки сервера

        if (!res.ok){
            throw new Error(`Couldn't fetch ${this._apiBase}${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters(){
        return this.getResource("/characters?page=5&pageSize=10");
    }
    getCharacter(id){
        return this.getResource(`/characters/${id}`);
    }

    getAllBooks(){
        return this.getResource("/books");
    }
    
    getBook(id){
        return this.getResource(`/books/${id}`);
    }
    getAllHouses(){
        return this.getResource("/houses");
    }
    
    getHouse(id){
        return this.getResource(`/houses/${id}`);
    }
}