import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pay } from '../slices/index.js';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState()
  const orders = useSelector(state => state.data.orders).filter((order)=>!order.paid);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const payOrder = (orderIndex) => {
    dispatch(pay(orderIndex));
    navigate('/');
  }

  const orderSelect = (orderIndex => {
      if(orderIndex >= 0){
        const selectedOrder = orders.find((order) => order.id === orderIndex);
        console.log(selectedOrder);
        console.log(orderIndex);
        const pizzas = selectedOrder.pizzas.map((pizza, index) => {
          return(
            <tr key={index}>
              <td className='img'>
                <img src={pizza.attributes.image}/>
              </td>
              <td>
                {pizza.attributes.name}
              </td>
              <td>
                {pizza.attributes.price}€
              </td>
            </tr>
          )
        })
        return(
          <div>
            <table > 
              <thead>
                <tr>
                  <th>Commande N°{selectedOrder.id}</th>
                  <th>Total Commande : </th>
                  <th>{selectedOrder.total}€</th>
                  <th>
                    <button className='green' onClick={()=>{payOrder(orderIndex)}}>Encaisser</button>
                  </th>
                </tr>
              </thead>
            </table>
            <table > 
              <tbody>
                {pizzas}
              </tbody>
            </table>
          </div>
        )
      } else {
        return (
            <table > 
              <thead>
                <tr>
                  <th className='title' >Choisissez une commande</th>
                </tr>
              </thead>
            </table>
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