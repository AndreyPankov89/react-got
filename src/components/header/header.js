import React from 'react';
import './header.css';

const Header = ({onToggleVisible, visibleButtonText}) => {
    
    return (
        <div className="header-block">
            <h3 className="header-title">
                <a href="#">
                Game of Thrones DB
                </a>
            </h3>
            <ul className="header-links">
                <li>
                    <button onClick={onToggleVisible}>Char {visibleButtonText}</button>
                </li>
                <li>
                    <a href="#">Characters</a>
                </li>
                <li>
                    <a href="#">Houses</a>
                </li>
                <li>
                    <a href="#">Books</a>   
                </li>
            </ul>
        </div>
    );
};

export default Header;