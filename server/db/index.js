const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

// Убедимся, что директория data существует
const dataDir = path.join(__dirname, "../../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Путь к файлу базы данных
const dbPath = path.join(dataDir, "todos.db");

// Создаем подключение к базе данных
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Ошибка при подключении к базе данных:", err.message);
  } else {
    console.log("Подключение к базе данных SQLite установлено");

    // Читаем SQL схему из файла
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");

    // Выполняем SQL запрос для создания таблицы
    db.exec(schema, (err) => {
      if (err) {
        console.error("Ошибка при создании таблицы:", err.message);
      } else {
        console.log("Таблица todos создана или уже существует");
      }
    });
  }
});

// Функция для закрытия соединения с базой данных
const closeDatabase = () => {
  db.close((err) => {
    if (err) {
      console.error("Ошибка при закрытии базы данных:", err.message);
    } else {
      console.log("Соединение с базой данных закрыто");
    }
  });
};

// Обработка сигналов завершения для корректного закрытия базы данных
process.on("SIGINT", closeDatabase);
process.on("SIGTERM", closeDatabase);

module.exports = db;
