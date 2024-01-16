import React from 'react'
import menus from '../menus'
import { Card } from "antd"
import { FaFireFlameCurved, FaShoppingCart, BsFillClipboard2PlusFill } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
// import "../App.scss"

const Home = () => {
    const navigate = useNavigate();
    const menusList = menus.map(menu => {
        // const Icon = menu.icon;
        return (
            <Card onClick={() => navigate(`/${menu.slug}`)} >
                {/* <span><Icon /></span> */}
                <h2>{menu.title}</h2>
                <p>{menu.subtitle}</p>

            </Card>
        )
    });

    return (
        <div className="menusList" >{menusList}</div>
    )
}

export default Home