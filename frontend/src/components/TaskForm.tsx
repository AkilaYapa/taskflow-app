import { useEffect, useState } from "react";
import type {
  CreateTaskRequest,
  TaskItem,
  TaskPriority,
  TaskStatus,
  UpdateTaskRequest,
} from "../types/TaskItem";

type FormErrors = {
  title?: string;
  description?: string;
};

const DESCRIPTION_MAX_LENGTH = 250;

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
  const [errors, setErrors] = useState<FormErrors>({});

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
    setErrors({});
  }, [editingTask]);

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!title.trim()) {
      nextErrors.title = "Task title is required.";
    }

    if (!description.trim()) {
      nextErrors.description = "Task description is required.";
    } else if (description.trim().length > DESCRIPTION_MAX_LENGTH) {
      nextErrors.description = `Task description must be ${DESCRIPTION_MAX_LENGTH} characters or less.`;
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const taskTitle = title.trim();
    const taskDescription = description.trim();

    if (editingTask) {
      await onUpdateTask(editingTask.id, {
        title: taskTitle,
        description: taskDescription,
        status,
        priority,
      });
    } else {
      await onCreateTask({
        title: taskTitle,
        description: taskDescription,
        status: "Pending",
        priority,
      });
    }

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Medium");
    setErrors({});
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
          onChange={(event) => {
            setTitle(event.target.value);
            setErrors((currentErrors) => ({
              ...currentErrors,
              title: undefined,
            }));
          }}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </label>

      <label>
        Description
        <textarea
          placeholder="Enter task description"
          rows={5}
          maxLength={DESCRIPTION_MAX_LENGTH}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setErrors((currentErrors) => ({
              ...currentErrors,
              description: undefined,
            }));
          }}
        />
        {errors.description && (
          <span className="field-error">{errors.description}</span>
        )}
        <span className="character-count">
          {description.length}/{DESCRIPTION_MAX_LENGTH} characters
        </span>
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
