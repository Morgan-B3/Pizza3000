import { Card } from 'antd'
import React from 'react'
import { FaShoppingCart, } from "react-icons/fa";
import { FaFireFlameCurved } from "react-icons/fa6";
import { LuClipboardSignature } from "react-icons/lu";


const Menu = ({action, title, subtitle, icon, color}) => {
    let iconItem;
    
    if (icon === "<FaFireFlameCurved />"){
        iconItem = <FaFireFlameCurved size={50}/>
    } else if (icon === "<FaShoppingCart />") {
        iconItem = <FaShoppingCart size={50}/>
    } else if (icon === "<LuClipboardSignature />") {
        iconItem = <LuClipboardSignature size={50}/>
    }
    
    const className = `${color} card`;

    return (
        <section onClick={action} className={className} >
            <div className='card-body'>
                <span className='icon'>    
                    {iconItem}
                </span>
                <h2>{title}</h2>        
                <p>{subtitle}</p>   
            </div>
        </section>
    )
}

export default Menu