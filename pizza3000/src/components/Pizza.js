import { Card } from 'antd'
import React from 'react'

const Pizza = ({name, price, image, action}) => {
  return (
    <div onClick={action} title={name}>
      <Card>
        <div>
          <img src={image} alt={name} />
        </div>
        <span>
          <h2>{name}</h2>
          <p>{price} €</p>
        </span>
      </Card>
    </div>
  )
}

export default Pizza