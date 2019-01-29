import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
    import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
export default class ItemList extends Component {

    gotService = new gotService();
    state = {
        charList: null,
        error: false
    };

    componentDidMount(){
        this.gotService.getAllCharacters()
            .then( (charList) =>{
                this.setState({
                    charList
                })
            })
            .catch((error) =>{this.onError(error)});
    }


    onError = (err) => {
        // this.setState({
        //     error: true,
        //     loading: false,
        //     errorCode: err.message
        // })
        this.props.onError(err)
    }


    getId(url){
        const regex = /((.+?)\/characters\/)/gmi;
        const result = url.replace(regex, '');

        return result;
    }

    renderItems(arr){
        return arr.map((item,i) =>{
            const id = this.getId(item.url);
            return(
                <li 
                    key={id} 
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(id)}
                    >
                    {item.name}
                </li>
            )
        })
    }

    render() {

        const {charList,error, errorCode} = this.state;

        const content = error ? <ErrorMessage code={errorCode}/> : ( !charList ? <Spinner/> : this.renderItems(charList));

        return (
            <ul className="item-list list-group">
                {content}
            </ul>
        );
    }
}