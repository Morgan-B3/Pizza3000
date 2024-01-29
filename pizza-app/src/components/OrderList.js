import React, { Fragment } from 'react';

const OrderList = ({ pizzas, orderPizzas, total, paid = false, setPaid = false }) => {
    
    const pizzasList = Object.keys(orderPizzas).map(key => {
        const totalPizzaPrice = Math.round((pizzas[key].price * orderPizzas[key]) * 10) / 10;
        return (
            <div className="order-details-item" key={key}>
                <div className="pizza-details">
                    <span>{pizzas[key].name}</span>
                    <span>{totalPizzaPrice}€</span>
                </div>
                <div className="price-details">({orderPizzas[key]} x {pizzas[key].price}€)</div>
            </div>
        );
    });

    return (
        <Fragment>
            <div className="order-details-list">
                {pizzasList}
            </div>
            <div className="order-summary">
                <div className="order-total">
                    Soit un total de : <strong>{total}€</strong>
                </div>
                {paid ? <button className="order-paid-button" onClick={setPaid}>Encaisser la commande</button> : ""}
            </div>
        </Fragment>
    )
};

export default OrderList;