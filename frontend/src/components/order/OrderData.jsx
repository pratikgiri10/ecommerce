
import PlaceOrder from "./PlaceOrder";

export const OrderData = () => {
    

// Example usage
const orderData = {
    orderNumber: "ORD-38291",
    subtotal: 109.97,
    shipping: 5.99,
    tax: 9.27,
    total: 125.23,
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "90210",
      country: "USA"
    },
    paymentMethod: {
      type: "card",
      cardType: "Visa",
      lastFour: "4242"
    },
    estimatedDelivery: "March 21 - March 24, 2025"
  };
  
  return <PlaceOrder {...orderData} />
}