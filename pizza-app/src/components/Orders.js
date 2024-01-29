import React from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrder } from '../slices';
import Icon from './Icon';
import Layout from './Layout';

const Orders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector(state => state.data.orders);

    const ordersList = orders.map(order => {
        return (
            <tr key={order.id}>
                <td>Commande n°{order.id}</td>
                <td>{order.total}€</td>
                <td className={order.paid ? "bg-success" : "bg-warning"}>{order.paid ? "Réglé" : "En attente de paiement"}</td>
                <td className={order.paid ? "order-actions hidden" : "order-actions"}>
                    <button
                        className="order-action-edit"
                        onClick={() => navigate(`/order/${order.id}`)}
                    >
                        <Icon type="FiEdit" size="2rem" />
                    </button>
                    <button
                        className="order-action-delete"
                        onClick={() => dispatch(deleteOrder(order.id))}
                    >
                        <Icon type="FiXCircle" size="2rem" />
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <Layout>
            <div className="orders-list">
                <h2>Liste des commandes</h2>
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
            </div>
        </Layout>
    )
}

export default Orders;