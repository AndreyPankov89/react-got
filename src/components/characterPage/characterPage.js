import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';


export default class CharacterPage extends Component{
 
    state = {
        selectedChar: null,
        error: false
    }
    
    componentDidCatch(){
        this.setState({error: true})
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
            errorCode: err.message
        })
    }

    onCharSelected = (id) =>{
        this.setState({
            selectedChar: id
        })
    }

    render(){
        if (this.state.error){
            return (
                <ErrorMessage code={'fatal'}/>
            )
        }

        return(
            <Row>
                <Col md='6'>
                    <ItemList 
                        onCharSelected={this.onCharSelected}
                        onError={this.onError}
                    />
                </Col>
                <Col md='6'>
                    <CharDetails charId={this.state.selectedChar}/>
                </Col>
            </Row>
        )
    }
}