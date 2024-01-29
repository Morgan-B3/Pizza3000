import { createSlice } from "@reduxjs/toolkit";
import pizzas from '../pizzas';

const initialState = {
    pizzas,
    orders: JSON.parse(localStorage.getItem('orders')) || []
};

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addOrder: (state, { payload }) => {
            const order = {
                id: payload,
                pizzas: {},
                total: 0,
                paid: false
            }
            // Mise à jour du localStorage
            localStorage.setItem('orders', JSON.stringify([...state.orders, order]));
            // Mise à jour du state global
            state.orders.push(order);
        },
        addPizzaOrder: (state, { payload }) => {
            const oid = payload.oid;
            const pid = payload.pid;

            const index = state.orders.findIndex(order => {
                return order.id === oid;
            });

            const currentOrder = state.orders[index];

            if (!currentOrder.pizzas[pid]) {
                currentOrder.pizzas[pid] = 1;
            } else {
                currentOrder.pizzas[pid]++;
            }

            currentOrder.total = Math.round((currentOrder.total + state.pizzas[pid].price) * 10) / 10;

            state.orders[index] = currentOrder;
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
        deleteOrder: (state, { payload }) => {

            const index = state.orders.findIndex(order => {
                return order.id === payload;
            });
            state.orders.splice(index, 1);

            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
        setOrderPaid: (state, {payload}) => {
            const index = state.orders.findIndex(order => {
                return order.id === payload;
            });
            state.orders[index].paid = true;
            
            localStorage.setItem('orders', JSON.stringify(state.orders));
        }
    }
});

export const { addOrder, addPizzaOrder, deleteOrder, setOrderPaid } = dataSlice.actions;

export default dataSlice.reducer;