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
      status = <td className='green'>
        <span >Réglé</span>
        </td>
    } else {
      status = <td className='yellow'>
          <span>En attente de paiement</span>
        </td>
    }
    return(
      <tr>
        <td>
          {order.id}
        </td>
        <td>
          {order.total}€
        </td>
        {status}
        <td>
          <button>Modifier</button>
          <button>Supprimer</button>
        </td>
      </tr>
    )
  })

  if (orders.length === 0) {
    return (
      <div className='ordersList'>
        <h1>Liste des commandes</h1>
        <h2>Aucune commande pour le moment</h2>
      </div>
    )
  } else {
    return (
      <div className='ordersList'>
        <h1>Liste des commandes</h1>
        <table > 
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
        <button onClick={() => dispatch(remove()) } className='delete red'>Supprimer Commandes</button>
      </div>
    )
  }
}

export default Orders