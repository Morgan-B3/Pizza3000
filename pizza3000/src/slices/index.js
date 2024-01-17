import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const initialState = {
    orders: []
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
            })
        }
    }
})

export const { add } = dataSlice.actions;

export default dataSlice.reducer;