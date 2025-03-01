"use client";
import { useState } from "react";
import axios from "axios";

export default function AddTaskModal({ setModalOpen, setTasks }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescrip] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const newtask = {
      title: title,
      description: description,
      status: "todo",
      deadline: deadline,
    }
    const res = await axios.post("/api/todolist", newtask);

    // console.log(res);
    // const newTask = await res.json;
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, res.data],
    }));

    setModalOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input className="border p-2 w-full" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" className="border p-2 w-full" value={description} onChange={(e) => setDescrip(e.target.value)} required />
          <input type="date" className="border p-2 w-full" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
        </form>
      </div>
    </div>
  );
}
