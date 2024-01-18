import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const initialState = {
    orders: JSON.parse(localStorage.getItem("orders")) || []
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        add: (state, { payload }) => {
            state.orders.push({
                id: payload.id,
                total: payload.total,
                pizzas: payload.pizzas,
                paid: false,
            });
            localStorage.setItem("orders", JSON.stringify([...state.orders]));
        },
        remove: (state, { payload }) => {
            state.orders.splice(payload, 1);
            localStorage.setItem("orders", JSON.stringify([...state.orders]));
        },
        removeAll: (state, {payload}) => {
            state.orders = [];
            localStorage.removeItem("orders");
        },
        update: (state, { payload }) => {
            const index = state.orders.map(order => order.id).indexOf(payload.id);
            state.orders[index] = {
                id: payload.id,
                total: payload.total,
                pizzas: payload.pizzas,
                paid: false,
            };
            localStorage.setItem("orders", JSON.stringify([...state.orders]));
        },
        pay: (state, { payload }) => {
            const order = state.orders.find((order) => order.id === payload);
            order.paid = true;
            localStorage.setItem("orders", JSON.stringify([...state.orders]));
        }
    }
})

export const { add, remove, removeAll, pay, update } = dataSlice.actions;

export default dataSlice.reducer;