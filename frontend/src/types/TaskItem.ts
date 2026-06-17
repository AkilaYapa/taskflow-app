export type TaskStatus = "Pending" | "In Progress" | "Completed";

export type TaskPriority = "Low" | "Medium" | "High";

export type TaskItem = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
};

export type CreateTaskRequest = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
};

export type UpdateTaskRequest = Partial<CreateTaskRequest>;

export type TaskFilter = {
  status: "All" | TaskStatus;
  priority: "All" | TaskPriority;
};