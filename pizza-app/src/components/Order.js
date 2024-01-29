import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Pizza from './Pizza';
import OrderList from './OrderList';
import { addPizzaOrder } from '../slices';
import Layout from './Layout';

const Order = () => {
    const dispatch = useDispatch();
    // avec du destructuring : const { pizzas, order } = useSelector(state => state.data);
    const pizzas = useSelector(state => state.data.pizzas);
    const orders = useSelector(state => state.data.orders);
    // Equivalent d'un this.props.match.params.oid dans React Router v5 avec un composant stateful
    const { oid } = useParams()

    const handleClick = (oid, id) => {
        dispatch(addPizzaOrder({oid, pid: id}));
    }

    const index = orders.findIndex(order => order.id === oid);

    const listPizzas = Object.keys(pizzas).map(key => {
        return (
            <Pizza
                key={key}
                name={pizzas[key].name}
                price={pizzas[key].price}
                image={pizzas[key].image}
                addToOrder={() => handleClick(oid, key)}
            />
        );
    });

    return (
        <Layout>
            <div className="order">
                <div className="pizzas-wrapper">
                    {listPizzas}
                </div>
                <div className="order-details-wrapper">
                    <div className="order-details">
                        <h2>Détail de la commande n°{oid}</h2>
                        <OrderList
                            pizzas={pizzas}
                            orderPizzas={orders[index].pizzas}
                            total={orders[index].total}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Order