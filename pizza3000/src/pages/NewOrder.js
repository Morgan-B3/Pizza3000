import React, { useEffect, useState } from 'react'
import Pizza from '../components/Pizza';
import { useParams } from 'react-router-dom';

const NewOrder = () => {

    const { id } = useParams();

    const [pizzas, setPizzas] = useState([]);
    const [order, setOrder] = useState({
        id,
        total: 0,
        pizzas: [],
    });

    const getPizzas = async () => {
        const response = await fetch("http://localhost:1337/api/pizzas").then(res => res.json());
        setPizzas(response.data);
    }
    
    useEffect(() => {
        getPizzas();
    }, [])

    const addToOrder = (pizza) => {
        setOrder({
            pizzas: [...order.pizzas, pizza],
            total: Math.round((order.total + pizza.attributes.price) * 100)/100,
        });
    }

    const pizzasList = pizzas.map(pizza => {
        return (
            <Pizza 
                key={pizza.id}
                name={pizza.attributes.name}
                image={pizza.attributes.image}
                price={pizza.attributes.price}
                action={() => addToOrder(pizza)}
            />
        )
    })

    const orderedPizzas = pizzas.map((pizza, index) => {
        const samePizzas = order.pizzas.filter( orderedPizza => orderedPizza.attributes.name === pizza.attributes.name);
        const quantity = samePizzas.length;
        const totalPrice = Math.round(pizza.attributes.price * quantity * 100)/100;
            if (quantity > 0) {
                return (
                    <div key={index} className='pizzaItem'>
                        <span>
                            <h3>{pizza.attributes.name}</h3>
                            <p>({quantity} x {pizza.attributes.price}€)</p>
                        </span>
                        <p>{totalPrice}€</p>
                    </div>
            )
        }
    })

    return (
        <>
        <section className='pizzasList'>
            {pizzasList}
        </section>
        <section className='order'>
            <h1>Détail de la commande n°{id}</h1>
            <span className='orderList'>
                {orderedPizzas}
            </span>
            <button>
                Total : {order.total}€
            </button>
        </section>
        </>
    )
}

export default NewOrder