import { useGetOrderQuery } from '@/api/order';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
const OrderHistory = () => {


  const { data: order, isSuccess } = useGetOrderQuery()

  if (isSuccess)
    console.log(order);



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
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'sancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-6">New Order</h1>
        {isSuccess && (
          <div className='space-y-4'>
            {order?.data?.data?.map((order) => (
              <div key={order._id} className="p-2 border rounded-lg overflow-hidden bg-white shadow-sm">
                <div
                  onClick={() => toggleOrderDetails(order._id)}
                  className='flex justify-between mb-2'>
                  <div className=''>
                    <div className='flex items-center gap-2'>
                      <span className='text-foreground font-medium'>Order Id - {order._id}</span>
                      <span className={`rounded-full px-2 py-1 text- font-medium ${getStatusColor(order.order_status)}`}>{order.order_status}</span>
                    </div>
                    <span className='text-muted-foreground text-sm'>{formatDate(order.createdAt)}</span>
                  </div>
                  <div className='flex gap-4 items-center' >
                    <div className='flex flex-col'>
                      <span className='text-foreground font-medium'>Rs. {order.order_price}</span>
                      <span className='text-muted-foreground text-sm'>{order.order_items.length} item{order.order_items.length > 1 && 's'}</span>
                    </div>
                    {expandedOrder === order._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>

                </div>
                {/* order details */}
                {expandedOrder === order._id && <div className='p-2 space-y-4 rounded bg-gray-50 shadow mb-2'>
                  <h1 className='text-foreground font-medium '>Order Items</h1>
                  {order.order_items.map((item) => (
                    <div key={item._id} className='flex justify-between'>
                      <div className='flex items-center gap-2'>
                        <img
                          src={item.product.imageUrl[0].url}
                          className='w-10 h-10 object-cover rounded'
                          alt="" />
                        <div>
                          <h1 className='text-foreground font-medium'>{item.product.title}</h1>
                          <span className='text-muted-foreground'>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div>
                        <span className='text-foreground font-medium'>Rs. {item.product.priceAfterDiscount * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>}
              </div>
            ))
            }
          </div>
        )}

      </div>

    </div>
  );
};

export default OrderHistory;