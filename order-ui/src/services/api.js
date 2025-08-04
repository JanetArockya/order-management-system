import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

export const orderService = {
  // Create a new order
  createOrder: async (orderData) => {
    const formData = new FormData();
    formData.append('customerName', orderData.customerName);
    formData.append('orderAmount', orderData.orderAmount);
    formData.append('orderStatus', orderData.orderStatus || 'pending');
    if (orderData.invoiceFile) {
      formData.append('invoiceFile', orderData.invoiceFile);
    }

    const response = await api.post('/orders', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get all orders
  getAllOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },
};

export default api;
