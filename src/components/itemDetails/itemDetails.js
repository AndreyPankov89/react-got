import React, {Component} from 'react';
import './itemDetails.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
    if (item){
        return (
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">{label}</span>
                <span>{item[field]}</span>
            </li>
        )
    }
    else {
        return null;
    }
}

export {
    Field
}

export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null,
        loading: false,
        errorCode: '',
        error: false
    };

    componentDidMount(){
        this.updateitem();
    }

    onitemLoaded = (item) => {
        this.setState({item, loading: false})
    }

    updateitem = () => {
        const {itemId, getItem} = this.props;
        console.log(itemId);
        if (!itemId){
            return
        }

        
        this.setState({loading: true});
        getItem(itemId)
            .then(this.onitemLoaded)
            .catch((error) =>{this.onError(error)});
    }


    componentDidUpdate(prevProps){
     //   console.log(prevProps.itemId, this.props.itemId);
        if (this.props.itemId !== prevProps.itemId){
            this.updateitem();
        }

    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
            errorCode: err.message
        })
    }
    render() {
        const {item, loading, error, errorCode} = this.state;


        const {what, children} = this.props;
        
        const content = loading ? <Spinner/> : (error ? <ErrorMessage code={errorCode}/> : <View item={item} what={what}>{children}</View>);


        let small = '';

        if (what === 'book'){
            small='small'
        }

        return (
            <div className={`item-details rounded ${small}`}>
               {content}
            </div>
        );
    }
}

class View extends Component {
    render(){   
        const {item, what} = this.props;
        if (!item){
            return (
                <span className='select-error'>
                    Please, select a {what}
                </span>
            )
        }
        const {name} = item;


        return (
            <div>
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement (child, {item})
                            })
                        }
                    </ul>
            </div>
        )
    }    
}