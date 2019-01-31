import React, {Component} from 'react';
import RowBlock from '../../rowBlock'
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService'
import './bookPage.css'


export default class BookPage extends Component{
 
    gotService = new gotService();

    state = {
        selectedBook: null,
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
            selectedBook: id
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
                        getData={this.gotService.getAllBooks}
                        renderItem= {(item) => item.name}
                    />
        )


        const itemDetails = (
            
                    <ItemDetails 
                        itemId={this.state.selectedBook}
                        getItem={this.gotService.getBook}
                        what="book"
                        >

                        <Field field='numberOfPages' label='Pages'/>
                        <Field field='publisher' label='Publisher'/>
                        <Field field='released' label='Released'/>
                        
                    </ItemDetails>
        )

        return(
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}