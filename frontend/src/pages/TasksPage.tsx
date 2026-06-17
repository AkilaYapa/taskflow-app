import { useEffect, useMemo, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../api/taskApi";
import DashboardSummary from "../components/DashboardSummary";
import TaskCard from "../components/TaskCard";
import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm";
import type {
  CreateTaskRequest,
  TaskFilter,
  TaskItem,
  TaskStatus,
} from "../types/TaskItem";

function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filters, setFilters] = useState<TaskFilter>({
    status: "All",
    priority: "All",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const taskList = await getTasks();
      setTasks(taskList);
    } catch {
      setErrorMessage("Failed to load tasks.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (request: CreateTaskRequest) => {
    try {
      const newTask = await createTask(request);
      setTasks((currentTasks) => [...currentTasks, newTask]);
    } catch {
      setErrorMessage("Failed to create task.");
    }
  };

  const handleStatusChange = async (id: number, status: TaskStatus) => {
    try {
      const updatedTask = await updateTask(id, { status });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch {
      setErrorMessage("Failed to update task.");
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch {
      setErrorMessage("Failed to delete task.");
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        filters.status === "All" || task.status === filters.status;

      const matchesPriority =
        filters.priority === "All" || task.priority === filters.priority;

      return matchesStatus && matchesPriority;
    });
  }, [tasks, filters]);

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="page">
      <header className="page-header">
        <h1>TaskFlow</h1>
        <p>A simple task management app for DevOps practice.</p>
      </header>

      <DashboardSummary tasks={tasks} />

      <TaskForm onCreateTask={handleCreateTask} />

      <TaskFilters filters={filters} onFilterChange={setFilters} />

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <section>
          <h2>Tasks</h2>

          {filteredTasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            <div className="task-list">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default TasksPage;