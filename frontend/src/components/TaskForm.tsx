import { useEffect, useState } from "react";
import type {
  CreateTaskRequest,
  TaskItem,
  TaskPriority,
  TaskStatus,
  UpdateTaskRequest,
} from "../types/TaskItem";

type TaskFormProps = {
  editingTask: TaskItem | null;
  onCreateTask: (task: CreateTaskRequest) => Promise<void>;
  onUpdateTask: (id: number, task: UpdateTaskRequest) => Promise<void>;
  onCancelEdit: () => void;
};

function TaskForm({
  editingTask,
  onCreateTask,
  onUpdateTask,
  onCancelEdit,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("Pending");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = editingTask !== null;

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
      return;
    }

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Medium");
  }, [editingTask]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);

    if (editingTask) {
      await onUpdateTask(editingTask.id, {
        title,
        description,
        status,
        priority,
      });
    } else {
      await onCreateTask({
        title,
        description,
        status: "Pending",
        priority,
      });
    }

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Medium");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{isEditMode ? "Edit Task" : "Create Task"}</h2>

      <label>
        Title
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <label>
        Description
        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      {isEditMode && (
        <label>
          Status
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as TaskStatus)
            }
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
      )}

      <label>
        Priority
        <select
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as TaskPriority)
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? isEditMode
              ? "Saving..."
              : "Adding..."
            : isEditMode
              ? "Save Changes"
              : "Add Task"}
        </button>

        {isEditMode && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
