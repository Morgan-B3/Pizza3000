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
            localStorage.setItem("orders", JSON.stringify([...state.orders, {
                id: payload.id,
                total: payload.total,
                pizzas: payload.pizzas,
                paid: false,
            }]));
        },
        remove: (state, {payload}) => {
            state.orders = [];
            localStorage.removeItem("orders");
        }
    }
})

export const { add, remove } = dataSlice.actions;

export default dataSlice.reducer;