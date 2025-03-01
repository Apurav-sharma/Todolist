"use client";
import TaskCard from "./taskcard";

export default function TaskColumn({ title, tasks, setTasks }) {
  return (
    <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div className="space-y-2">
        {tasks && tasks.map((task) => (
          <TaskCard key={task._id} task={task} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
}
