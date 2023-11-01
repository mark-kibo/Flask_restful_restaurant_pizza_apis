import React from 'react'
import { Card } from 'flowbite-react';

const PizzaCard = (props) => {
  return (
    <Card className="max-w-sm mb-2" imgSrc="/images/blog/image-4.jpg" horizontal>
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Name
    </h5>
    <p>{props.pizza.name}</p>
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Ingredients
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">
     {props.pizza.ingredients}
    </p>

    <div className='flex flex-row justify-between'>
        {props.pizza.restaurants ? props.pizza.restaurant.map((restaurant)=>{
                <div className='flex justify-between'>
                    <p>{restaurant.name}</p>
                    <p>{restaurant.address}</p>
                </div>
        }): ""}
    </div>
  </Card>
  )
}

export default PizzaCard