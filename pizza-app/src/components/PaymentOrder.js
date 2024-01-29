import React, { useState } from 'react';
import Header from './Header';
import OrderList from './OrderList';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setOrderPaid } from '../slices';
import Layout from './Layout';

const PaymentOrder = () => {
    const [selectedOrder, setSelectedOrder] = useState({});
    const { pizzas, orders } = useSelector(state => state.data);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleChange = (event) => {
        const id = event.target.value;
        const order = orders.find(order => {
            return order.id === id;
        });
        setSelectedOrder(order);
    }

    const setPaid = () => {
        dispatch(setOrderPaid(selectedOrder.id));

        setSelectedOrder({});
        // ou
        //navigate("/");
    }

    const selectedOrderDisplay = () => {
        if (Object.keys(selectedOrder).length > 0) {
            return (
                <div className="order-details">
                    <h2>Détail de la commande n°{selectedOrder.id}</h2>
                    <OrderList
                        paid
                        setPaid={() => setPaid()}
                        pizzas={pizzas}
                        orderPizzas={selectedOrder.pizzas}
                        total={selectedOrder.total}
                    />
                </div>
            );
        }
    }

    const ordersList = orders.filter(order => !order.paid).map(order => {
        return (
            <option key={order.id} value={order.id}>{order.id} - {order.total}€</option>
        );
    });

    return (
        <Layout>
            <div className="payment-wrapper">
                <div className="order-selection">
                    <label htmlFor="orderSelect">Sélectionner la commande à encaisser</label>
                    <select id="orderSelect" onChange={e => handleChange(e)}>
                        <option value=""></option>
                        {ordersList}
                    </select>
                </div>

                <div className="payment-order">
                    <div className="order-details-wrapper">
                        {selectedOrderDisplay()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PaymentOrder;