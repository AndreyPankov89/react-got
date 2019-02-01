import React, {Component} from 'react';
import ItemList from '../../itemList';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService';
import {withRouter} from 'react-router-dom';
import './bookPage.css'


class BookPage extends Component{
 
    gotService = new gotService();

    state = {
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


    render(){
        if (this.state.error){
            return (
                <ErrorMessage code={'fatal'}/>
            )
        }

     
        return(
            <ItemList 
                        onItemSelected={(itemId)=>{
                            this.props.history.push(itemId)
                        }}
                        onError={this.onError}
                        getData={this.gotService.getAllBooks}
                        renderItem= {(item) => item.name}
                    />
        )
    }
}

export default withRouter(BookPage);