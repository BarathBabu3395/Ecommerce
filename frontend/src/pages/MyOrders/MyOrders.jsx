import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
        {data.length > 0 ? (
          data.map((order) => (
            <div key={order.id} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>
                {order.items.map((item, index) => (
                  <span key={item.id}>
                    {item.name} x {item.quantity}
                    {index < order.items.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        ) : (
          <p>No orders found.</p> // Display a message when no orders are present
        )}
      </div>
    </div>
  );
};

// Add PropTypes for validation if needed
MyOrders.propTypes = {
  url: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default MyOrders;
