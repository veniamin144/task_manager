const STATUSES = ['new', 'in_progress', 'done'];

export default function TaskTable({ tasks, onStatusChange, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Статус</th>
          <th>Создано</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </td>
            <td>{new Date(task.created_at).toLocaleString()}</td>
            <td>
              <button onClick={() => onDelete(task.id)}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}