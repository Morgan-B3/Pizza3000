import React from 'react';
import Icon from './Icon';

const Tile = ({ name, description, icon, bgColor, action }) => {
    return (
        <div className="tile" onClick={action} style={{
            backgroundColor: bgColor
        }}>
            <div className="tile-icon">
                <Icon type={ icon } size="7rem" />
            </div>
            <div className="tile-text">
                <h2>{ name }</h2>
                <p>{ description }</p>
            </div>
        </div>
    );
}

export default Tile;
