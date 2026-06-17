import type {
  TaskFilter,
  TaskPriority,
  TaskStatus,
} from "../types/TaskItem";

type TaskFiltersProps = {
  filters: TaskFilter;
  onFilterChange: (filters: TaskFilter) => void;
  onResetFilters: () => void;
};

function TaskFilters({
  filters,
  onFilterChange,
  onResetFilters,
}: TaskFiltersProps) {
  const hasActiveFilters =
    filters.status !== "All" || filters.priority !== "All";

  return (
    <section className="filters">
      <label>
        Status
        <select
          value={filters.status}
          onChange={(event) =>
            onFilterChange({
              ...filters,
              status: event.target.value as "All" | TaskStatus,
            })
          }
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>

      <label>
        Priority
        <select
          value={filters.priority}
          onChange={(event) =>
            onFilterChange({
              ...filters,
              priority: event.target.value as "All" | TaskPriority,
            })
          }
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>

      <button
        type="button"
        className="reset-filters-button"
        onClick={onResetFilters}
        disabled={!hasActiveFilters}
      >
        Reset Filters
      </button>
    </section>
  );
}

export default TaskFilters;
