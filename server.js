const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require("./models/Product"); // Подключаем модель Product
const cors = require('cors'); 

const app = express();
const PORT = 3000;
app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); 

// Middleware для отдачи статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для страницы "bag"
app.get('/bag', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bag.html'));
});

// Маршрут для страницы "login"
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Маршрут для страницы "catalog"
app.get('/catalog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'catalog.html'));
});

// Подключение к MongoDB
const DB_URL = 'mongodb+srv://inkarakan:Samsung08@cluster0.ia2l0.mongodb.net/online-shop?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Успешное подключение к MongoDB!');
  })
  .catch((error) => {
    console.error('Ошибка подключения к MongoDB:', error);
  });

// Роут для получения товаров
app.get('/products', async (req, res) => {
  try {
    // Получаем все товары из базы данных
    const products = await Product.find(); // Это работает, если используется mongoose
    res.json(products);  // Отправляем данные на клиентскую сторону в формате JSON
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении товаров" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});
