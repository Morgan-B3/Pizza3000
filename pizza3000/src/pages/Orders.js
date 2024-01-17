import React from 'react'
import { LuHeading1 } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../slices/index.js';

const Orders = () => {
  const orders = useSelector(state => state.data.orders);
  console.log(orders);

  const dispatch = useDispatch()

  const ordersList = orders.map(order => {
    let status;
    if (order.paid){
      status = <span className='green'>Réglé</span>
    } else {
      status = <span className='yellow'>En attente de paiement</span>
    }
    return(
      <tr>
        <td>
          {order.id}
        </td>
        <td>
          {order.total}€
        </td>
        <td>
          {status}
        </td>
        <td>
          <button>Modifier</button>
          <button>Supprimer</button>
        </td>
      </tr>
    )
  })

  return (
    <div className='ordersList'>
      <h1>Liste des commandes</h1>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Total Commande</th>
            <th>Statut Commande</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ordersList}
        </tbody>
      </table>
      <button onClick={() => dispatch(remove()) }>supprimer commandes</button>
    </div>
  )
}

export default Orders