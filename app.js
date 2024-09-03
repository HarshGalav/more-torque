const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const rateLimit = require('./middleware/rateLimit');
const auth = require('./middleware/auth');

const vehicleRoutes = require('./routes/vehicleRoutes');
const orgRoutes = require('./routes/orgRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/more-torque', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Redis Client
const redisClient = redis.createClient();

// Rate Limiting Middleware
app.use(rateLimit);

// Authentication Middleware
app.use(auth);

// Routes
app.use('/vehicles', vehicleRoutes);
app.use('/orgs', orgRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
