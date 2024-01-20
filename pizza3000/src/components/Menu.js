import { Card } from 'antd'
import React from 'react'


const Menu = ({action, title, subtitle, icon, color}) => {
    const className = `${color} card`;

    return (
        <section onClick={action} className={className} >
            <div className='card-body'>
                <span className='icon'>    
                    {icon}
                </span>
                <h2>{title}</h2>        
                <p>{subtitle}</p>   
            </div>
        </section>
    )
}

export default Menu