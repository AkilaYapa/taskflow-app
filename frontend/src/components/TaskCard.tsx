import type {
  TaskItem,
  TaskStatus,
} from "../types/TaskItem";

type TaskCardProps = {
  task: TaskItem;
  onEdit: (task: TaskItem) => void;
  onStatusChange: (id: number, status: TaskStatus) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

function TaskCard({
  task,
  onEdit,
  onStatusChange,
  onDelete,
}: TaskCardProps) {
  const createdDate = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(task.createdAt));

  return (
    <article className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`priority priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <p>{task.description || "No description provided."}</p>
      <p className="task-date">Created {createdDate}</p>

      <div className="task-card-footer">
        <label>
          Status
          <select
            value={task.status}
            onChange={(event) =>
              onStatusChange(task.id, event.target.value as TaskStatus)
            }
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <div className="task-card-actions">
          <button className="edit-button" onClick={() => onEdit(task)}>
            Edit
          </button>

          <button className="delete-button" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
