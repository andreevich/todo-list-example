/**
 * Основной компонент приложения
 */
const App = () => {
  // Состояние для хранения списка задач
  const [todos, setTodos] = React.useState([]);

  // Состояние для отображения ошибок
  const [error, setError] = React.useState(null);

  // Состояние для отображения загрузки
  const [loading, setLoading] = React.useState(true);

  // Загрузка задач при монтировании компонента
  React.useEffect(() => {
    fetchTodos();
  }, []);

  // Функция для загрузки задач с сервера
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await TodoAPI.getAll();
      setTodos(data);
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
      setError("Не удалось загрузить задачи. Пожалуйста, попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  // Функция для добавления новой задачи
  const handleAddTodo = async (todo) => {
    try {
      setError(null);

      const newTodo = await TodoAPI.create(todo);
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      setError("Не удалось добавить задачу. Пожалуйста, попробуйте позже.");
    }
  };

  // Функция для изменения статуса задачи
  const handleToggleComplete = async (id, completed) => {
    try {
      setError(null);

      let updatedTodo;

      // Если задача отмечается как выполненная, используем новый эндпоинт
      if (completed) {
        updatedTodo = await TodoAPI.markAsDone(id);
      } else {
        // Если задача отмечается как невыполненная, используем старый эндпоинт
        updatedTodo = await TodoAPI.update(id, { completed });
      }

      // Обновляем список задач
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
      setError("Не удалось обновить задачу. Пожалуйста, попробуйте позже.");
    }
  };

  return (
    <div className="container">
      <h1>Список задач</h1>

      {/* Форма для добавления задачи */}
      <TodoForm onAddTodo={handleAddTodo} />

      {/* Сообщение об ошибке */}
      {error && <div className="message error">{error}</div>}

      {/* Индикатор загрузки */}
      {loading ? (
        <div className="loading">Загрузка задач</div>
      ) : (
        /* Список задач */
        <TodoList todos={todos} onToggleComplete={handleToggleComplete} />
      )}
    </div>
  );
};
