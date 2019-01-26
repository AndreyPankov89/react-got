import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/gotService'

const service = new GotService();

service.getAllCharacters()
    .then(res => {res.forEach( item => console.log('charackters: ', item.name))});
service.getCharacter(100)
    .then(res => {console.log('character, ', res.name)});

service.getAllBooks()
    .then(res => {res.forEach( item => console.log('books: ',item.name))});
service.getBook(5)
    .then(res => {console.log('book, ',res.name)});
service.getAllHouses()
    .then(res => {res.forEach( item => console.log('houses: ', item.name))});
service.getHouse(5)
    .then(res => {console.log('house, ',res.name)});

const App = () => {
    return (
        <> 
            <Container>
                <Header />
            </Container>
            <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                        <RandomChar/>
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <ItemList />
                    </Col>
                    <Col md='6'>
                        <CharDetails />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;