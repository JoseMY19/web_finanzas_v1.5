const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const transactionRoutes = require('./routes/transaction.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);
app.use('/dashboard', dashboardRoutes);

// Verificación de estado
app.get('/', (req, res) => {
  res.send('Personal Finance API is running');
});

module.exports = app;
