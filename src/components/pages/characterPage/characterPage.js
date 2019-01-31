import React, {Component} from 'react';
import RowBlock from '../../rowBlock'
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService'
import './characterPage.css'


export default class CharacterPage extends Component{
 
    gotService = new gotService();

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

    onItemSelected = (id) =>{
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

        const itemList = (
            <ItemList 
                        onItemSelected={this.onItemSelected}
                        onError={this.onError}
                        getData={this.gotService.getAllCharacters}
                        renderItem= {(item) => item.name}
                    />
        )


        const itemDetails = (
            
                    <ItemDetails 
                        itemId={this.state.selectedChar}
                        getItem={this.gotService.getCharacter}
                        what="character"
                    >
                        <Field field='gender' label='Gender'/>
                        <Field field='born' label='Born'/>
                        <Field field='died' label='Died'/>
                        <Field field='culture' label='Culture'/>
                    </ItemDetails>
        )

        return(
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}