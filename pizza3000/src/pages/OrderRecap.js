import React from 'react'

const OrderRecap = ({ id, pizzas, total, action, newOrder }) => {

    let buttons;
    if(newOrder) {
        buttons = <span className='buttons'>
        <button className='btn-green' onClick={action}>Total : {total}€
        </button>
    </span>
    } else {
        buttons = <span className='buttons'>
        <button className='nope red'>Total : {total}€</button>
        <button className='btn-green' onClick={action}>Encaisser
        </button>
    </span>
    }

    return (
        <section className='order'>
            <h1>Détail de la commande n°{id}</h1>
            <span className='orderList'>
                {pizzas}
            </span>
            {buttons}
        </section>
    )
}

export default OrderRecap