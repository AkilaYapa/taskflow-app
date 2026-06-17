import type {
  CreateTaskRequest,
  TaskItem,
  UpdateTaskRequest,
} from "../types/TaskItem";
import { USE_MOCK_API } from "./apiConfig";

const STORAGE_KEY = "taskflow_tasks";

const initialTasks: TaskItem[] = [
  {
    id: 1,
    title: "Create React TypeScript frontend",
    description: "Organize frontend using pages, components, api, and types.",
    status: "Pending",
    priority: "High",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Connect frontend to .NET API",
    description: "This will be done after the backend is ready.",
    status: "Pending",
    priority: "Medium",
    createdAt: new Date().toISOString(),
  },
];

function delay(ms: number = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readTasks(): TaskItem[] {
  const storedTasks = localStorage.getItem(STORAGE_KEY);

  if (!storedTasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
    return initialTasks;
  }

  return JSON.parse(storedTasks) as TaskItem[];
}

function saveTasks(tasks: TaskItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export async function getTasks(): Promise<TaskItem[]> {
  if (!USE_MOCK_API) {
    throw new Error("Backend API is not connected yet.");
  }

  await delay();
  return readTasks();
}

export async function createTask(
  request: CreateTaskRequest
): Promise<TaskItem> {
  if (!USE_MOCK_API) {
    throw new Error("Backend API is not connected yet.");
  }

  await delay();

  const tasks = readTasks();

  const newTask: TaskItem = {
    id: Date.now(),
    title: request.title,
    description: request.description,
    status: request.status,
    priority: request.priority,
    createdAt: new Date().toISOString(),
  };

  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);

  return newTask;
}

export async function updateTask(
  id: number,
  request: UpdateTaskRequest
): Promise<TaskItem> {
  if (!USE_MOCK_API) {
    throw new Error("Backend API is not connected yet.");
  }

  await delay();

  const tasks = readTasks();

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    throw new Error("Task not found");
  }

  const updatedTask: TaskItem = {
    ...task,
    ...request,
  };

  const updatedTasks = tasks.map((item) =>
    item.id === id ? updatedTask : item
  );

  saveTasks(updatedTasks);

  return updatedTask;
}

export async function deleteTask(id: number): Promise<void> {
  if (!USE_MOCK_API) {
    throw new Error("Backend API is not connected yet.");
  }

  await delay();

  const tasks = readTasks();
  const updatedTasks = tasks.filter((task) => task.id !== id);

  saveTasks(updatedTasks);
}
