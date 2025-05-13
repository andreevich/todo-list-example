/**
 * Компонент формы для создания новой задачи
 */
const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем, что название задачи не пустое
    if (title.trim()) {
      // Вызываем функцию добавления задачи
      onAddTodo({ title });

      // Очищаем поле ввода
      setTitle("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Введите название задачи"
        required
      />
      <button type="submit">Добавить</button>
    </form>
  );
};
