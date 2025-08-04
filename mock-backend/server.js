const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8081; // Changed to 8081

// In-memory storage for orders
let orders = [];

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')){
    fs.mkdirSync('uploads');
}

// Routes

// Create a new order
app.post('/orders', upload.single('invoiceFile'), (req, res) => {
  try {
    const { customerName, orderAmount, orderStatus } = req.body;
    
    // Validation
    if (!customerName || !orderAmount) {
      return res.status(400).json({ error: 'Customer name and order amount are required' });
    }

    if (isNaN(orderAmount) || parseFloat(orderAmount) <= 0) {
      return res.status(400).json({ error: 'Order amount must be a positive number' });
    }

    // Valid order statuses
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    const status = orderStatus && validStatuses.includes(orderStatus.toLowerCase()) 
      ? orderStatus.toLowerCase() 
      : 'pending';

    const order = {
      orderId: uuidv4(),
      customerName: customerName.trim(),
      orderAmount: parseFloat(orderAmount),
      orderStatus: status,
      orderDate: new Date().toISOString(),
      invoiceFileUrl: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : null
    };

    orders.push(order);

    // Mock SNS notification
    console.log('=== MOCK SNS NOTIFICATION ===');
    console.log('New Order Created!');
    console.log(`Order ID: ${order.orderId}`);
    console.log(`Customer: ${order.customerName}`);
    console.log(`Amount: $${order.orderAmount.toFixed(2)}`);
    console.log(`Status: ${order.orderStatus.toUpperCase()}`);
    console.log('==============================');

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Get order by ID
app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// Update order status
app.put('/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!status || !validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Invalid status. Valid statuses are: ' + validStatuses.join(', ') 
      });
    }

    const orderIndex = orders.findIndex(o => o.orderId === req.params.id);
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    orders[orderIndex].orderStatus = status.toLowerCase();
    
    // Mock SNS notification for status update
    console.log('=== MOCK SNS NOTIFICATION ===');
    console.log('Order Status Updated!');
    console.log(`Order ID: ${orders[orderIndex].orderId}`);
    console.log(`Customer: ${orders[orderIndex].customerName}`);
    console.log(`New Status: ${status.toUpperCase()}`);
    console.log('==============================');

    res.json(orders[orderIndex]);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/actuator/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock Order Management Backend running on http://localhost:${PORT}`);
  console.log(`📊 Swagger UI would be available at: http://localhost:${PORT}/swagger-ui.html`);
  console.log(`💡 This is a Node.js mock backend - use this for demo purposes`);
  console.log(`🔄 Orders are stored in memory and will reset when server restarts`);
});

// Error handling
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});
