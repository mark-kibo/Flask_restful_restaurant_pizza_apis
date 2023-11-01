import PizzaCard from '../PizzaCard'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const Pizza = () => {
    const [resData, setResData] = useState([]);

  const getPizzas = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/pizzas/');
      return response.data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPizzas();
        setResData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderCards = () => {
    return resData.map((pizza) => (
      <PizzaCard key={pizza.id} pizza={pizza} />
    ));
  };
  return (
    <div className='flex flex-col justify-center items-center'>
        {renderCards()}
    </div>
  )
}

export default Pizza