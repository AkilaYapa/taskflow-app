import { useState } from "react";

type TaskItem = {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
};

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 1,
      title: "Create React TypeScript frontend",
      description: "Start TaskFlow frontend using Vite",
      status: "Pending",
      priority: "High",
    },
    {
      id: 2,
      title: "Connect frontend to .NET API",
      description: "This will be done after backend is ready",
      status: "Pending",
      priority: "Medium",
    },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = () => {
    if (!title.trim()) return;

    const newTask: TaskItem = {
      id: tasks.length + 1,
      title,
      description,
      status: "Pending",
      priority: "Medium",
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  return (
    <main style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>TaskFlow</h1>
      <p>Simple task management app for DevOps practice.</p>

      <section style={{ marginBottom: "24px" }}>
        <h2>Create Task</h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", width: "100%", padding: "8px", marginBottom: "8px" }}
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: "block", width: "100%", padding: "8px", marginBottom: "8px" }}
        />

        <button onClick={addTask}>Add Task</button>
      </section>

      <section>
        <h2>Task List</h2>

        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "6px",
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;