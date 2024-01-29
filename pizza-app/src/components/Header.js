import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

const Header = ({ isHome = false }) => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
    }
    
    return (
        <header className="App-header">
            { !isHome ? <Icon type="BiLeftArrowAlt" size="8rem" className="back-button" action={() => goToHome()} /> : "" }
            <div className="title-wrapper">
                <Icon type="CiPizza" size="8rem" />
                <h1>Pizza 3000</h1>
            </div>
        </header>
    )
}

export default Header;
