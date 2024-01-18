import React from 'react'
import { LuHeading1 } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { remove, removeAll } from '../slices/index.js';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const orders = useSelector(state => state.data.orders);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ordersList = orders.map((order, index) => {
    let status;
    if (order.paid){
      status = <td className='green'>
        <span >Réglée</span>
        </td>
    } else {
      status = <td className='yellow'>
          <span>En attente de paiement</span>
        </td>
    }

    const secureRemove = () => {
      if (order.paid) {
        dispatch(remove(index));
      } else {
        alert("La commande doit d'abord être reglée !")
      }
    }
    
    const secureUpdate = () => {
      if (order.paid) {
        alert("La commande ne peut plus être modifée")
      } else {
        navigate(`/nouvelle-commande/${order.id}`);
      }
    }

    return(
      <tr key={index}>
        <td>
          {order.id}
        </td>
        <td>
          {order.total}€
        </td>
        {status}
        <td className='buttons'>
          <button className='btn-yellow active' onClick={() => {secureUpdate()}}>Modifier</button>
          <button className='btn-red' onClick={() => {secureRemove()}}>Supprimer</button>
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
        <button onClick={() => dispatch(removeAll()) } className='delete btn-red'>Supprimer Commandes</button>
      </div>
    )
  }
}

export default Orders