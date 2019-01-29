import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        loading: false,
        errorCode: '',
        error: false
    };

    componentDidMount(){
        this.updateChar();
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    updateChar = () => {
        const {charId} = this.props;
        console.log(charId);
        if (!charId){
            return
        }

        this.setState({loading: true});
        this.gotService.getCharacter(charId)
            .then(this.onCharLoaded)
            .catch((error) =>{this.onError(error)});
    }


    componentDidUpdate(prevProps){
     //   console.log(prevProps.charId, this.props.charId);
        if (this.props.charId !== prevProps.charId){
            this.updateChar();
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
        const {char, loading, error, errorCode} = this.state;

        
        const content = loading ? <Spinner/> : (error ? <ErrorMessage code={errorCode}/> : <View char={char}/>);

        return (
            <div className="char-details rounded">
               {content}
            </div>
        );
    }
}

const View = ({char}) => {   
    if (!char){
        return (
            <span className='select-error'>
                Please, select a character
            </span>
        )
    }
    const {name, gender, born, died, culture} = char;

    return (
        <>
                <h4>{name}</h4>
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