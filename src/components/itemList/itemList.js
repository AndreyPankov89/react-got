import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
    import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
export default class ItemList extends Component {

    
    state = {
        itemList: null,
        error: false
    };

    componentDidMount(){
        const {getData} = this.props;

        getData()
            .then( (itemList) =>{
                this.setState({
                    itemList
                })
            })
            .catch((error) =>{this.onError(error)});
    }


    onError = (err) => {
        this.props.onError(err)
    }


    renderItems(arr){
        return arr.map((item,i) =>{
            const {id} = item;

            const label = this.props.renderItem(item)

            return(
                <li 
                    key={id} 
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {label}
                </li>
            )
        })
    }

    render() {

        const {itemList,error, errorCode} = this.state;

        const content = error ? <ErrorMessage code={errorCode}/> : ( !itemList ? <Spinner/> : this.renderItems(itemList));

        return (
            <ul className="item-list list-group">
                {content}
            </ul>
        );
    }
}