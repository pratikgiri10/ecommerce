import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  Eye, 
  Edit3, 
  Trash2, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  Clock,
  ChevronDown,
  RefreshCw
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGetAllOrdersQuery } from '@/api/order';
import OrderDetails from './OrderDetails';
import EditOrder from './EditOrder';
import { exportToPdf } from '@/utils/exportToPdf';

const Orders = () => {
    const {data: orders, isLoading, isError} = useGetAllOrdersQuery()
  

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showEditOrder, setShowEditOrder] = useState(false)
//   const [isLoading, setIsLoading] = useState(false);

  const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-600 bg-yellow-50 border-yellow-200', label: 'Pending' },
    processing: { icon: Package, color: 'text-blue-600 bg-blue-50 border-blue-200', label: 'Processing' },
    shipped: { icon: Truck, color: 'text-purple-600 bg-purple-50 border-purple-200', label: 'Shipped' },
    delivered: { icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200', label: 'Delivered' },
    cancelled: { icon: XCircle, color: 'text-red-600 bg-red-50 border-red-200', label: 'Cancelled' }
  };

  const filteredOrders = useMemo(() => {
    if(!orders) return []
    return orders.data.data.filter(order => {
      const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.order_status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);
// console.log(filteredOrders);


//   const updateOrderStatus = (orderId, newStatus) => {
//     // setIsLoading(true);
//     setTimeout(() => {
//       setOrders(prev => prev.map(order => 
//         order.id === orderId ? { ...order, status: newStatus } : order
//       ));
//       setIsLoading(false);
//     }, 500);
//   };

//   const deleteOrder = (orderId) => {
//     setOrders(prev => prev.filter(order => order.id !== orderId));
//     setShowOrderDetails(false);
//   };

//   const refreshOrders = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   };
const handleExport = () => {
  console.log('exporting');
  
  const title = 'Orders'
  const columns = ['Order Id', 'Customer', 'Date', 'Status', 'Total', 'Items']
  const rows = filteredOrders.map((order) => order)
  exportToPdf(title, columns, rows)
}



  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Management</h1>
              <p className="text-gray-600">Manage and track all customer orders</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            //   onClick={refreshOrders}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders, customers, or emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-4 pr-8 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <motion.button
              onClick={handleExport}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-yellow-400 border-b border-gray-100">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-900">Order ID</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Customer</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Total</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Items</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                   {filteredOrders.map((order, index) => {
                    const StatusIcon = statusConfig[order.order_status].icon;
                    return (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <span className="font-medium text-gray-900">{order._id}</span>
                        </td>
                        <td className="p-4">
                          
                            <p className="font-medium text-gray-900">{order.customer.name}</p>
                            <p className="text-sm text-gray-500">{order.customer.email}</p>
                          
                        </td>
                        <td className="p-4 text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border ${statusConfig[order.order_status].color}`}>
                            <StatusIcon className="w-4 h-4" />
                            {statusConfig[order.order_status].label}
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-gray-900">
                          Rs. {order.order_price.toFixed(2)}
                        </td>
                        <td className="p-4 text-gray-600">
                          {order.order_items.length} items
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowOrderDetails(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setSelectedOrder(order)
                                setShowEditOrder(true)
                              }}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit Order"
                            >
                              <Edit3 className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            //   onClick={() => deleteOrder(order.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Order"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                 
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders found matching your criteria</p>
            </div>
          )}
        </motion.div>
          {/* edit order  */}
          <AnimatePresence>
            {showEditOrder && 
            <EditOrder selectedOrder={selectedOrder} setShowEditOrder={setShowEditOrder}/>
            }
          </AnimatePresence>
        {/* Order Details Modal */}
        <AnimatePresence>
          {showOrderDetails && selectedOrder && (
            <OrderDetails 
            setShowOrderDetails={setShowOrderDetails}
            selectedOrder={selectedOrder}
            statusConfig={statusConfig}
            isLoading={isLoading}
            />
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Updating order...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Orders;