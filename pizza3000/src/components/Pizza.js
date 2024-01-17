import { Card } from 'antd'
import React from 'react'

const Pizza = ({name, price, image, action}) => {
  return (
    <Card>
      <div className='image' onClick={action} title={name}>
        <img src={image} alt={name} />
      </div>
      <span>
        <h2>{name}</h2>
        <p>{price} €</p>
      </span>
    </Card>
  )
}

export default Pizza