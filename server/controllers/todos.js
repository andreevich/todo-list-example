const Todo = require("../models/todo");

/**
 * Контроллер для работы с задачами
 */
const TodoController = {
  /**
   * Получить все задачи
   * @param {Object} req Объект запроса Express
   * @param {Object} res Объект ответа Express
   */
  getAllTodos: async (req, res) => {
    try {
      const todos = await Todo.getAll();
      res.json(todos);
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
      res.status(500).json({ error: "Ошибка при получении задач" });
    }
  },

  /**
   * Создать новую задачу
   * @param {Object} req Объект запроса Express
   * @param {Object} res Объект ответа Express
   */
  createTodo: async (req, res) => {
    try {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Название задачи обязательно" });
      }

      const todo = await Todo.create({ title });
      res.status(201).json(todo);
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
      res.status(500).json({ error: "Ошибка при создании задачи" });
    }
  },

  /**
   * Обновить статус задачи
   * @param {Object} req Объект запроса Express
   * @param {Object} res Объект ответа Express
   */
  updateTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const { completed } = req.body;

      if (completed === undefined) {
        return res.status(400).json({ error: "Статус выполнения обязателен" });
      }

      const todo = await Todo.update(id, { completed });
      res.json(todo);
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);

      if (error.message === "Задача не найдена") {
        return res.status(404).json({ error: "Задача не найдена" });
      }

      res.status(500).json({ error: "Ошибка при обновлении задачи" });
    }
  },
  /**
   * Отметить задачу как выполненную
   * @param {Object} req Объект запроса Express
   * @param {Object} res Объект ответа Express
   */
  markTodoAsDone: async (req, res) => {
    try {
      const { id } = req.params;

      const todo = await Todo.update(id, { completed: true });
      res.json(todo);
    } catch (error) {
      console.error("Ошибка при отметке задачи как выполненной:", error);

      if (error.message === "Задача не найдена") {
        return res.status(404).json({ error: "Задача не найдена" });
      }

      res
        .status(500)
        .json({ error: "Ошибка при отметке задачи как выполненной" });
    }
  },
};

module.exports = TodoController;
