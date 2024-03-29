import React, { useEffect, useState } from 'react'
import Pizza from '../components/Pizza';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "../slices";
import OrderRecap from './OrderRecap.js';

const NewOrder = () => {

    const { id } = useParams();

    const stateOrder  = useSelector(state => state.data.orders).find(order => order.id === id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [pizzas, setPizzas] = useState([]);
    const pizzas = useSelector(state => state.data.pizzas);

    const [order, setOrder] = useState({
        id,
        total: 0,
        pizzas: [],
    });
    
    useEffect(() => {
        if (stateOrder){
            setOrder({
                id,
                total: stateOrder.total,
                pizzas: stateOrder.pizzas,
            })
        }
    }, []);

    let paid;
    if (stateOrder){
        paid = stateOrder.paid;
    } else {
        paid = false;
    } 
        
    // const getPizzas = async () => {
    //     const response = await fetch("http://localhost:1337/api/pizzas").then(res => res.json());
    //     setPizzas(response.data);
    // }
    
    // useEffect(() => {
    //     getPizzas();
    // }, [])


    const addToOrder = (pizza) => {
        if (paid) {
            alert("La commande ne peut plus être modifiée");
          } else {
            setOrder({
                id,
                pizzas: [...order.pizzas, pizza],
                total: Math.round((order.total + pizza.attributes.price) * 100)/100,
            });
        }
    }


    const removePizzas = (selectedPizza) => {
        if (paid) {
            alert("La commande ne peut plus être modifiée");
        } else {
            const pizzaType = pizzas.find(pizza => pizza.attributes.name === selectedPizza.attributes.name)
            const selectedPizzas = order.pizzas.filter( selection => selection.attributes.name != selectedPizza.attributes.name);
            const remainingPizzas = order.pizzas.filter(selection => selection.attributes.name === selectedPizza.attributes.name);
            remainingPizzas.pop();
    
            setOrder({
                id,
                pizzas: selectedPizzas.concat(remainingPizzas),
                total: Math.round((order.total - (pizzaType.attributes.price)) * 100)/100,
            })
        }
    }

    const validateOrder = () => {
        if (paid) {
            alert("La commande ne peut plus être modifiée");
          } else {
            if (order.pizzas.length === 0) {
                alert("Veuillez selectionner au moins une pizza.")
            } else if (stateOrder) {
                dispatch(update(order));
                console.log(order);
                navigate("/");
            } else {
                dispatch(add(order));
                navigate("/");
            }
        }
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
        const samePizzas = order.pizzas.filter(orderedPizza => orderedPizza.attributes.name === pizza.attributes.name);
        const quantity = samePizzas.length;
        const totalPrice = Math.round(pizza.attributes.price * quantity * 100)/100;
        if (quantity > 0) {
            return (
                <div key={index} className='pizzaItem'>
                    <div className='title'>
                        <span>
                            <h3>{pizza.attributes.name}</h3>
                            <p>({quantity} x {pizza.attributes.price}€)</p>
                        </span>
                        <p>{totalPrice}€</p>
                    </div>
                    <div className='adjust'>
                        <button 
                        className='btn-red'
                        onClick={() => removePizzas(pizza)}
                        title='Supprimer'
                        > - </button>
                        <span>
                            {quantity}
                        </span>
                        <button className='btn-blue' 
                        onClick={() => addToOrder(pizza)}
                        title='Ajouter'
                        > + </button>
                    </div>
                </div>
            )
        }
    })
    
    return (
        <>
        <section className='pizzasList'>
            {pizzasList}
        </section>

        <OrderRecap key={Date.now()} id={id} pizzas={orderedPizzas} total={order.total} action={()=>{validateOrder()}} newOrder={true} />
        </>
    )
}

export default NewOrder