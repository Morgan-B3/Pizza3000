import React from 'react'
import { FaPizzaSlice } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate()
    return (
        <header>
            <span onClick={() => navigate("/")} ><FaPizzaSlice />Pizza 3000</span>
        </header>
    )
}

export default Header