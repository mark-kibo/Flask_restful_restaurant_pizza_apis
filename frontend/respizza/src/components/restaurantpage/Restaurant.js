import React, { useEffect, useState } from 'react';
import RestaurantsCard from '../Restaurants';
import axios from 'axios';

const Restaurant = () => {
  const [resData, setResData] = useState([]);

  const getRestaurants = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/restaurants/');
      return response.data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRestaurants();
        setResData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderCards = () => {
    return resData.map((restaurant) => (
      <RestaurantsCard key={restaurant.id} restaurant={restaurant} />
    ));
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      {renderCards()}
    </div>
  );
};

export default Restaurant;
