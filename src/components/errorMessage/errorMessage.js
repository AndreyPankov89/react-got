import React from 'react';
import './errorMessage.css'

const ErrorMessage = () => {
    return (
        <>
            <img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='error'/>>
            <span>Something was Wrong</span>
        </>
    )
}

export default ErrorMessage;