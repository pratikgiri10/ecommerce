import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  // Sample order data - in a real application, this would come from an API
  const [orders, setOrders] = useState([
    {
      id: "ORD-5678",
      date: "2025-03-15",
      total: 129.99,
      status: "Delivered",
      items: [
        { id: 1, name: "Wireless Headphones", price: 89.99, quantity: 1 },
        { id: 2, name: "Phone Case", price: 20.00, quantity: 2 }
      ]
    },
    {
      id: "ORD-4567",
      date: "2025-02-28",
      total: 349.99,
      status: "Delivered",
      items: [
        { id: 3, name: "Smart Watch", price: 249.99, quantity: 1 },
        { id: 4, name: "Watch Band", price: 49.99, quantity: 2 }
      ]
    },
    {
      id: "ORD-3456",
      date: "2025-01-15",
      total: 1299.99,
      status: "Delivered",
      items: [
        { id: 5, name: "Laptop", price: 1199.99, quantity: 1 },
        { id: 6, name: "Laptop Sleeve", price: 49.99, quantity: 2 }
      ]
    },
    {
      id: "ORD-2345",
      date: "2025-03-18",
      total: 75.98,
      status: "Processing",
      items: [
        { id: 7, name: "T-Shirt", price: 24.99, quantity: 2 },
        { id: 8, name: "Jeans", price: 49.99, quantity: 1 }
      ]
    }
  ]);

  useEffect(() => {
    const getUser = async () => {
        const response = await axios.get(`${import.meta.env.VITE_DOMAIN}/users/getuser`, {
          withCredentials: true
        })
       
        return response.data.data[0]._id
      }
     
    // service.getOrderHistory(getUser).then((data) => {
    //     console.log(data.documents)
    // })
  },[])
  
  // State for expanded order details
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Function to determine status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold mb-6">New Order</h1>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
         {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
              {/* Order Header */}
              <div 
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="flex flex-col mb-2 sm:mb-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">{formatDate(order.date)}</span>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                  <div className="flex flex-col items-end">
                    <span className="font-bold">${order.total.toFixed(2)}</span>
                    <span className="text-gray-500 text-sm">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                  </div>
                  <svg 
                    className={`w-5 h-5 ml-4 text-gray-500 transform transition-transform duration-200 ${expandedOrder === order.id ? 'rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Order Details */}
              {expandedOrder === order.id && (
                <div className="border-t px-4 py-3 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Order Items</h3>
                  <ul className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="py-3 flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 pt-4 border-t flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">${order.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row gap-2">
                    <button className="w-full sm:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Track Order
                    </button>
                    {order.status === 'Delivered' && (
                      <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Buy Again
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      </div>
      
      
     
    </div>
  );
};

export default OrderHistory;