"use client";
import axios from "axios";
import {MenuItem, Select} from "@mui/material";

export default function TaskCard({ task, setTasks }) {
  async function handleDelete() {
    try {
      await axios.delete(`/api/todolist?id=${task._id}`);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [task.status]: prevTasks[task.status].filter((t) => t._id !== task._id),
      }));
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  async function handleStatusChange(e) {
    const newStatus = e.target.value;
    try {
      const res = await axios.patch(`/api/todolist`, { id: task._id, status: newStatus });
      const updatedTask = res.data;

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };

        newTasks[task.status] = newTasks[task.status].filter((t) => t._id !== task._id);

        newTasks[newStatus] = [...newTasks[newStatus], updatedTask];

        return newTasks;
      });
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  }

  return (
    <div className="p-3 bg-gray-200 rounded-md shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
      </div>
      
      <Select value={task.status} onChange={handleStatusChange} inpu className="p-1 border rounded" autoWidth>
        <MenuItem value="todo">To Do</MenuItem>
        <MenuItem value="inProgress">In Progress</MenuItem>
        <MenuItem value="done">Done</MenuItem>
      </Select>

      <button className="text-red-500" onClick={handleDelete}>✖</button>
    </div>
  );
}
