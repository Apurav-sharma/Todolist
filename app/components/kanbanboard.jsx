"use client";
import { useEffect, useState } from "react";
import TaskColumn from "./taskcolumn";
import AddTaskModal from "./addtaskmodel";
import axios from "axios";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await axios.get("/api/todolist");
        const data = res.data;

        const groupedTasks = {
          todo: data.filter((task) => task.status === "todo"),
          inProgress: data.filter((task) => task.status === "inProgress"),
          done: data.filter((task) => task.status === "done"),
        };
        setTasks(groupedTasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    }
    fetchTasks();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setModalOpen(true)}
      >
        + Add Task
      </button>

      {modalOpen && <AddTaskModal  setModalOpen={setModalOpen} setTasks={setTasks} />}

      <div className="flex gap-4">
        {tasks && Object.entries(tasks).map(([status, items]) => (
          <TaskColumn key={status} title={status} tasks={items} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
}
