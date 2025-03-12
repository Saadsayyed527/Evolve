const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contact');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.get('/',(req,res)=>{
//     res.send("nnc")
// })
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', contactRoutes);

app.use('/api/food', require('./routes/foodRoutes'));
app.use('/api/pickup', require('./routes/pickupRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));