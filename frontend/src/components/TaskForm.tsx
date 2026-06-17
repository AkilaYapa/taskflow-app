import { useState } from "react";
import type {
  CreateTaskRequest,
  TaskPriority,
} from "../types/TaskItem";

type TaskFormProps = {
  onCreateTask: (task: CreateTaskRequest) => Promise<void>;
};

function TaskForm({ onCreateTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);

    await onCreateTask({
      title,
      description,
      status: "Pending",
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Create Task</h2>

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

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;