import React from 'react'
// import { Card } from "antd"
import { FaFireFlameCurved, FaShoppingCart, BsFillClipboard2PlusFill } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import {useSelector } from "react-redux";
import Menu from "../components/Menu"
import menus from '../menus'

const Home = () => {
    
    const navigate = useNavigate();

    const navigateMenu = (route) => {
        if (route === "nouvelle-commande"){
            route = `nouvelle-commande/${Date.now()}`
        }
        navigate(`/${route}`)
    }

    const menusList = menus.map((menu, index) => {
        return (
            <Menu 
                key={index}
                title={menu.title} 
                subtitle={menu.subtitle}  
                action={() => navigateMenu(menu.slug)}
                icon={menu.icon}
                color={menu.color}
            />
        )
    });

    return (
        <div className="menusList" >
            {menusList}
        </div>
    )
}

export default Home