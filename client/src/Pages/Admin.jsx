import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleComplete = (id, completed) => {
    Axios.put(`http://localhost:3001/tasks/${id}`, { completed: !completed })
      .then((res) => {
        const updatedTask = {
          ...tasks.find((task) => task.id === id),
          completed: !completed,
        };
        Axios.post(`http://localhost:3001/tasks/${id}`, updatedTask)
          .then((res) => {
            setTasks(
              tasks.map((task) =>
                task.id === id ? { ...task, completed: !completed } : task
              )
            );
            toast.success(
              `Task ${!completed ? "completed" : "marked incomplete"}`
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/tasks/${id}`)
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id));
        // location.reload();
        toast.success("Task deleted successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg p-8 shadow">
        <h2 className="text-2xl font-bold mb-4">Task List</h2>
        <div className="flex justify-end mb-4">
          <Link to="/create">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Add Task +
            </button>
          </Link>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4 text-left">ID</th>
              <th className="border-b p-4 text-left">Title</th>
              <th className="border-b p-4 text-left">Description</th>
              <th className="border-b p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td className="border-b p-4">{task.id}</td>
                <td className="border-b p-4">{task.title}</td>
                <td className="border-b p-4">{task.description}</td>
                <td className="border-b p-4">
                  {task.completed ? "Marked as Completed" : "Incomplete"}
                </td>

                <td className="border-b p-4">
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
