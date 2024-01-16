import React, { useEffect, useState } from 'react'
import Pizza from '../components/Pizza';

const NewOrder = () => {

    const [pizzas, setPizzas] = useState([]);
    const [order, setOrder] = useState([]);

    const getPizzas = async () => {
        const response = await fetch("http://localhost:1337/api/pizzas").then(res => res.json());
        setPizzas(response.data);
    }
    
    useEffect(() => {
        getPizzas();
    }, [])

    const addToOrder = (pizza) => {
        setOrder()
    }

    const pizzasList = pizzas.map(pizza => {
        console.log(pizza);
        return (
            <Pizza 
                key={pizza.id}
                name={pizza.attributes.name}
                image={pizza.attributes.image}
                action={() => addToOrder(pizza)}
            />
        )
    })

    return (
        <div>{pizzasList}</div>
    )
}

export default NewOrder