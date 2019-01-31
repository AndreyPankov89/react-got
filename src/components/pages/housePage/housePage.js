import React, {Component} from 'react';
import RowBlock from '../../rowBlock'
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService'
import './housePage.css'


export default class HouserPage extends Component{
 
    gotService = new gotService();

    state = {
        selectedHouse: null,
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
            selectedHouse: id
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
                        getData={this.gotService.getAllHouses}
                        renderItem= {(item) => item.name}
                    />
        )


        const itemDetails = (
            
                    <ItemDetails 
                        itemId={this.state.selectedHouse}
                        getItem={this.gotService.getHouse}
                        what="house"
                    >
                        <Field field='region' label='Region'/>
                        <Field field='words' label='Words'/>
                        <Field field='titles' label='Titles'/>
                        <Field field='overlord' label='Overlord'/>
                        <Field field='ancestralWeapons' label='Ancestral Weapone'/>
                    </ItemDetails>
        )

        return(
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}