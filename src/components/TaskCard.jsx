function TasksCard({ task, onComplete, onEdit, onDelete }) {
  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        task.status === "completed" ? "text-decoration-line-through bg-light text-success"  : " "
      }`}
    >
      <div>
        <strong>{task.taskName}</strong> ({task.category})<br />
        <small>{task.description}</small><br /> 
        <small>
  🗓 Due:{" "}
  {task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-GB") // Format: DD/MM/YYYY
    : "Not set"}
</small>
        <span className="badge bg-secondary">{task.status || "pending"}</span>
      </div>
      <div>
        <button onClick={() => onEdit(task)}>✏️ Update</button>
        <button onClick={() => onComplete(task)}>✅ Mark Complete</button>
        <button onClick={() => onDelete(task._id)}>🗑 Delete</button>
      </div>
    </li>
  );
}

export default TasksCard;
