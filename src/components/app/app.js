import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

export default class  App extends Component {
    

    state = {
        visible: true,
        visibleButtonText: 'off'
    }

    toggleVisible = () => {
        this.setState(({visible}) => {
            return {
                visible: !visible,
                visibleButtonText: visible ? 'on' : 'off'
            }
        });
    
    }

    render(){
        const {visible, visibleButtonText} = this.state;
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
                            <RandomChar visibility={visible}/>
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
    }
};