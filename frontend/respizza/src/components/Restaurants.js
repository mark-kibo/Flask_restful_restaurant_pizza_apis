

import { Card } from 'flowbite-react';
function RestaurantsCard(props) {
  return (
    <Card className="max-w-sm mb-2" imgSrc="/images/blog/image-4.jpg" horizontal>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Address
      </h5>
      <p>
        {props.restaurant.address}
      </p>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Restaurant Name
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.restaurant.name}
      </p>
    </Card>
  );
}


export default RestaurantsCard;
