import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import homeimg from "../assets/homeimg.jpg";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Axios.get("https://taskmanager-fg8y.onrender.com/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleComplete = (id, completed) => {
    Axios.put(`https://taskmanager-fg8y.onrender.com/tasks/${id}`, {
      completed: !completed,
    })
      .then((res) => {
        const updatedTask = {
          ...tasks.find((task) => task.id === id),
          completed: !completed,
        };
        Axios.post(
          `https://taskmanager-fg8y.onrender.com/tasks/${id}`,
          updatedTask
        )
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
    Axios.delete(`https://taskmanager-fg8y.onrender.com/tasks/${id}`)
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id));
        toast.success("Task deleted successfully");
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* <div
          className="hidden md:flex md:w-1/2 m-7"
          style={{
            backgroundImage: `url(${homeimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div> */}
        <div className="w-full max-w-4xl bg-white rounded-lg p-8 shadow">
          <h2 className="text-2xl font-bold mb-4">Task List</h2>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search by title or description"
              value={search}
              onChange={handleSearch}
              className="px-4 py-2 border rounded w-full max-w-md"
            />
            <Link to="/create">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-4">
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
                <th className="border-b p-4 text-left">Status</th>
                <th className="border-b p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr key={index}>
                  <td className="border-b p-4">{task.id}</td>
                  <td className="border-b p-4">{task.title}</td>
                  <td className="border-b p-4">{task.description}</td>
                  <td className="border-b p-4">
                    {task.completed ? "Completed" : "Incomplete"}
                  </td>
                  <td className="border-b p-4">
                    <div className="flex items-center">
                      <Link to={`/edit/${task.id}`}>
                        <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm ml-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleComplete(task.id, task.completed)}
                        className={`px-2 py-1 ${
                          task.completed ? "bg-gray-400" : "bg-yellow-500"
                        } text-white rounded hover:bg-yellow-600 text-sm ml-2`}
                      >
                        {task.completed ? "Incomplete" : "Complete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
