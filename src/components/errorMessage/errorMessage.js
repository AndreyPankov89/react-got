import React, {Component} from 'react';
import './errorMessage.css'

export default class ErrorMessage extends Component{

    
    render(){
        const {code} = this.props;
        let imgName = "/img/error.jpg"
        let errText = `Error ${code}`;
        switch (code){
            case '404':{
                imgName = "/img/error404.jpg";
                errText = "Error 404: resourse not found";
                break;
            }
            case '408':{
                imgName = "/img/error408.jpg";
                errText = "Error 408: reqest timeout";
                break;
            }
            case '410':{
                imgName = "/img/error410.jpg";
                errText = "Error 410: resourse remove";
                break;
            }
            default:{

            }
        }
        return (
            <>
                <span>{errText}</span>
                <img src={process.env.PUBLIC_URL + imgName} alt='error'/>
                
            </>
        )
    }
}

;