import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pay } from '../slices/index.js';
import { useNavigate } from 'react-router-dom';
import OrderRecap from './OrderRecap.js';

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState()
  // const [pizzas, setPizzas] = useState()
  const pizzas = useSelector(state => state.data.pizzas);
  const orders = useSelector(state => state.data.orders).filter((order)=>!order.paid);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const getPizzas = async () => {
  //     const response = await fetch("http://localhost:1337/api/pizzas").then(res => res.json());
  //     setPizzas(response.data);
  // }

  // useEffect(() => {
  //     getPizzas();
  // }, [])

  const payOrder = (orderIndex) => {
    dispatch(pay(orderIndex));
    navigate('/');
  }
  
  const orderSelect = (orderIndex => {
      if(orderIndex >= 0){
        const selectedOrder = orders.find((order) => order.id === orderIndex);
        console.log(selectedOrder);
        console.log(orderIndex);

        const pizzas2 = pizzas.map((pizza, index) => {
          const selectedOrder = orders.find((order) => order.id === orderIndex);
          const samePizzas = selectedOrder.pizzas.filter(orderedPizza => orderedPizza.attributes.name === pizza.attributes.name);
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
                  </div>
              )
          }
        })
        return(
          <div>
             <OrderRecap key={Date.now()} id={selectedOrder.id} pizzas={pizzas2} total={selectedOrder.total} action={()=>{payOrder(orderIndex)}} newOrder={false} />
          </div>
        )
      } else {
        return (
          <section className='order'>
            <h1> Choisissez une commande </h1>
          </section>
        )
      }
    })

  const ordersOptions = orders.map((order, index) => {
    return (
      <option key={index} value={order.id}>N°{order.id}</option>
    )
  }) 
  return (
    <section className='payment'>
        <select onChange={e => {setSelectedOption(e.target.value)}} value={selectedOption}>
          <option>Choisir une commande</option>
          {ordersOptions}
        </select>
        {orderSelect(selectedOption)}
    </section>
  )
}

export default Payment