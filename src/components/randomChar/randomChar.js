import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage/';

export default class RandomChar extends Component {


    constructor(props){
        super(props);
        this.updateChar();
    }

    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        error: false, 
        errorCode:""
    };

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    updateChar(){
        const id = Math.floor(Math.random()*1400000 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch((error) =>{this.onError(error)});
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
            errorCode: err.message
        })
    }

    render() {

        const {visibility} = this.props;
        const {char, loading, error, errorCode} = this.state;
        let clazz = "random-block rounded";
        if (!visibility)
            clazz += " hide";
        let content = loading ? <Spinner/> : <View char={char}/>;
        content = error ? <ErrorMessage code={errorCode}/> : content;
        return (

            <div className={clazz}>
                {content}
            </div>
        );
    }
}




const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
                <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </>
    )
}