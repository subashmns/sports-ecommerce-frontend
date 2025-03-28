import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './card/Cards';
import { CartContext } from './card/cartContext';

const FetchCustomerApi = () => {
  const [data, setData] = useState([]);  // Change state variable to 'data'
  const { search } = useContext(CartContext);

  const fetching = async () => {
    try {
      const response = await axios.get('https://sports-ecommerce-backend-phi.vercel.app/products');
      console.log("API Response: ", response.data);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  const filtering = data.filter((product) => {  // Use 'data' here
    const matchesSearch =
      search.toLowerCase() === ''
        ? product
        : product.name.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      {data.length === 0 && <p>Loading...</p>}  {/* Use 'data' for length check */}
      <div className="container-fluid mt-4">
        <div className="row g-4"> {/* Add gap between rows and columns */}
          {filtering.map((item) => (
            <div
              key={item._id}
              className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
            >
              <Cards
                name={item.name}
                images={item.images}
                category={item.category}
                price={item.price}
                quantity={item.quantity}
                rating={item.rating}
                id={item._id}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FetchCustomerApi;
