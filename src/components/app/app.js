import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage/'
import BookPage from '../pages/bookPage/'
import HousePage from '../pages/housePage/'
import ErrorMessage from '../errorMessage';

import gotService from '../../services/gotService'
export default class  App extends Component {
    

    gotService = new gotService();

    state = {
        visible: true,
        visibleButtonText: 'off',
        selectedChar: null,
        error: false
    }

    componentDidCatch(){
        this.setState({error: true})
    }

    toggleVisible = () => {
        this.setState(({visible}) => {
            return {
                visible: !visible,
                visibleButtonText: visible ? 'on' : 'off'
            }
        });
        
    }

    onCharSelected = (id) =>{
        this.setState({
            selectedChar: id
        })
    }

    render(){
        const {visible, visibleButtonText} = this.state;

        if (this.state.error){
            return (
                <ErrorMessage code={'fatal'}/>
            )
        }

        const RandomCharComp = visible ? <RandomChar/> : null;
        return (
            <> 
                <Container>
                    <Header 
                        onToggleVisible={this.toggleVisible}
                        visibleButtonText={visibleButtonText}
                        />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {RandomCharComp}
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <BookPage/>
                    <HousePage/>
                    {/*<Row>
                     <Col md='6'>
                        <ItemList 
                            onCharSelected={this.onCharSelected}
                            onError={this.onError}
                            getData={this.gotService.getAllBooks}
                        />
                    </Col>
                    <Col md='6'>
                        <CharDetails charId={this.state.selectedChar}/>
                    </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onCharSelected={this.onCharSelected}
                                onError={this.onError}
                                getData={this.gotService.getAllHouses}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row> */}
                    
                </Container>
            </>
        );
    }
};