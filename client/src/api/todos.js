/**
 * API клиент для работы с задачами
 */
const TodoAPI = {
  // Базовый URL API
  baseUrl: "http://localhost:3001/api/todos",

  /**
   * Получить все задачи
   * @returns {Promise<Array>} Массив задач
   */
  getAll: async () => {
    try {
      const response = await fetch(TodoAPI.baseUrl);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
      throw error;
    }
  },

  /**
   * Создать новую задачу
   * @param {Object} todo Объект задачи
   * @param {string} todo.title Название задачи
   * @returns {Promise<Object>} Созданная задача
   */
  create: async (todo) => {
    try {
      const response = await fetch(TodoAPI.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
      throw error;
    }
  },

  /**
   * Обновить статус задачи
   * @param {number} id ID задачи
   * @param {Object} updates Объект с обновлениями
   * @param {boolean} updates.completed Статус выполнения
   * @returns {Promise<Object>} Обновленная задача
   */
  update: async (id, updates) => {
    try {
      const response = await fetch(`${TodoAPI.baseUrl}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
      throw error;
    }
  },

  /**
   * Отметить задачу как выполненную
   * @param {number} id ID задачи
   * @returns {Promise<Object>} Обновленная задача
   */
  markAsDone: async (id) => {
    try {
      const response = await fetch(`${TodoAPI.baseUrl}/${id}/done`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Ошибка при отметке задачи как выполненной:", error);
      throw error;
    }
  },
};
