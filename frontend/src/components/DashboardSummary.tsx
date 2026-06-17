import type { TaskItem } from "../types/TaskItem";

type DashboardSummaryProps = {
  tasks: TaskItem[];
};

function DashboardSummary({ tasks }: DashboardSummaryProps) {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <section className="dashboard">
      <div className="dashboard-card">
        <h3>Total</h3>
        <p>{totalTasks}</p>
      </div>

      <div className="dashboard-card">
        <h3>Pending</h3>
        <p>{pendingTasks}</p>
      </div>

      <div className="dashboard-card">
        <h3>In Progress</h3>
        <p>{inProgressTasks}</p>
      </div>

      <div className="dashboard-card">
        <h3>Completed</h3>
        <p>{completedTasks}</p>
      </div>
    </section>
  );
}

export default DashboardSummary;