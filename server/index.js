const express = require("express");
const cors = require("cors");
const path = require("path");
const todosRoutes = require("./routes/todos");

// Инициализация базы данных
require("./db");

// Создание экземпляра приложения Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Разрешаем кросс-доменные запросы
app.use(express.json()); // Парсинг JSON в теле запроса

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Маршруты API
app.use("/api/todos", todosRoutes);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Что-то пошло не так!" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`API доступно по адресу: http://localhost:${PORT}/api/todos`);
});

// Обработка сигналов завершения
process.on("SIGINT", () => {
  console.log("Сервер завершает работу");
  process.exit(0);
});
