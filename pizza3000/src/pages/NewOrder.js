import React, { useEffect, useState } from 'react'
import Pizza from '../components/Pizza';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "../slices";

const NewOrder = () => {

    const { id } = useParams();

    const stateOrder  = useSelector(state => state.data.orders).find(order => order.id === id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [pizzas, setPizzas] = useState([]);
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
    }, [])
        
    const getPizzas = async () => {
        const response = await fetch("http://localhost:1337/api/pizzas").then(res => res.json());
        setPizzas(response.data);
    }
    
    useEffect(() => {
        getPizzas();
    }, [])

    // const saveToLocalSotrage = (order) => {
    //     localStorage.setItem("order", JSON.stringify(order));
    //     setOrder(order);
    // };

    // const clearLocalStorage = () => {
    //     localStorage.removeItem("order");
    //     setOrder({
    //         id,
    //         total: 0,
    //         pizzas: [],
    //     });
    // }

    // const addToOrder = (pizza) => {
    //     saveToLocalSotrage({
    //         id,
    //         pizzas: [...order.pizzas, pizza],
    //         total: Math.round((order.total + pizza.attributes.price) * 100)/100,
    //     });
    // }

    const addToOrder = (pizza) => {
        setOrder({
            id,
            pizzas: [...order.pizzas, pizza],
            total: Math.round((order.total + pizza.attributes.price) * 100)/100,
        });
    }


    const removePizzas = (selectedPizza) => {
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

    const validateOrder = () => {
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
                        className='red'
                        onClick={() => removePizzas(pizza)}
                        title='Supprimer'
                        > - </button>
                        <span>
                            {quantity}
                        </span>
                        <button className='blue' 
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
        <section className='order'>
            <h1>Détail de la commande n°{id}</h1>
            <span className='orderList'>
                {orderedPizzas}
            </span>
            <span className='buttons'>
                <button className='green' onClick={() => validateOrder()}>
                    Total : {order.total}€
                </button>
            </span>
        </section>
        </>
    )
}

export default NewOrder