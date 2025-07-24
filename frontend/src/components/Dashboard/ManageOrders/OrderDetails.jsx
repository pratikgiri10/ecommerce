import { DollarSign, Mail, MapPin, Phone, User, XCircle } from 'lucide-react'
import { motion } from 'framer-motion';
import React from 'react'

const OrderDetails = ({selectedOrder, setShowOrderDetails, statusConfig, isLoading}) => {
  return (
    <div>
         <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowOrderDetails(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        Order Details
                      </h2>
                      <p className="text-gray-600">{selectedOrder._id}</p>
                    </div>
                    <button
                      onClick={() => setShowOrderDetails(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <XCircle className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{selectedOrder.customer.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{selectedOrder.customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{selectedOrder.shipping_address.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">{selectedOrder.shipping_address.address_line1}, {selectedOrder.shipping_address.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(statusConfig).map(([status, config]) => (
                        <motion.button
                          key={status}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        //   onClick={() => updateOrderStatus(selectedOrder.id, status)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                            selectedOrder.order_status === status
                              ? config.color + ' shadow-md'
                              : 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                          disabled={isLoading}
                        >
                          <config.icon className="w-4 h-4" />
                          {config.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Products */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Products</h3>
                    <div className="space-y-3">
                      {selectedOrder.order_items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{item.product.title}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-900">${item.product.priceAfterDiscount.toFixed(2)}</p>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                        <p className="text-lg font-semibold text-gray-900">Total</p>
                        <p className="text-xl font-bold text-gray-900">${selectedOrder.order_price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium">{selectedOrder.payment_method}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
    </div>
  )
}

export default OrderDetails