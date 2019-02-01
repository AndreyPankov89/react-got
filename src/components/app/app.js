import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage/'
import BookPage from '../pages/bookPage/';
import HousePage from '../pages/housePage/';
import BooksItem from '../pages/booksItem/';
import MainPage from '../pages/mainPage';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './app.css';
export default class  App extends Component {
    

    gotService = new gotService();

    state = {
        visible: false,
        visibleButtonText: 'on',
        selectedChar: null,
        error: false
    }

    componentDidCatch(){
        this.setState({error: true})
    }

    toggleVisible = () => {
        this.setState(({visible}) => {
            return {
                visible: !visible,
                visibleButtonText: visible ? 'on' : 'off'
            }
        });
        
    }

    onCharSelected = (id) =>{
        this.setState({
            selectedChar: id
        })
    }

    render(){
        const {visible, visibleButtonText} = this.state;

        if (this.state.error){
            return (
                <ErrorMessage code={'fatal'}/>
            )
        }

        const RandomCharComp = visible ? <RandomChar/> : null;
        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header 
                            onToggleVisible={this.toggleVisible}
                            visibleButtonText={visibleButtonText}
                            />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {RandomCharComp}
                            </Col>
                        </Row>
                        <Switch>
                            <Route path='/' exact component={MainPage}/>
                            <Route path="/characters" component={CharacterPage}/>
                            <Route path="/houses" component={HousePage}/>
                            <Route path="/books" exact component={BookPage}/>
                            <Route path="/books/:id" render={
                                ({match}) => { 
                                    const {id} = match.params;
                                    return <BooksItem bookId={id}/>
                                }
                                
                            }/>
                            <Route render={
                                () => {
                                    return(
                                        <div className='home-error'>
                                        <Link to='/'>Go home</Link>
                                        <ErrorMessage code='404'/>
                                        </div>
                                    )
                                }
                            }/>

                        </Switch>
                        {/* <CharacterPage/>
                        <BookPage/>
                        <HousePage/> */}
                    </Container>
                </div>
            </Router>
        );
    }
};