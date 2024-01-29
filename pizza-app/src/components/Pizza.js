import React from 'react';

const Pizza = ({ name, price, image, addToOrder }) => {
    
    // Reformatage du prix
    price = price.toLocaleString(navigator.language, { minimumFractionDigits: 2 });

    return (
        <div className="pizza-wrapper" onClick={addToOrder}>
            <div className="pizza">
                <img src={require(`../img/pizzas/${image}`)} alt="" className="pizza-image" />
                <div className="pizza-text">
                    <h3>{name}</h3>
                    <div className="pizza-price">{price}€</div>
                </div>
            </div>
        </div>
    );
};

export default Pizza;
