/**
 * Компонент для отображения отдельной задачи
 */
const TodoItem = ({ todo, onToggleComplete }) => {
  // Форматирование даты создания
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id, !todo.completed)}
      />
      <span className="todo-item-text">{todo.title}</span>
      <span className="created-at">{formatDate(todo.created_at)}</span>
    </li>
  );
};
