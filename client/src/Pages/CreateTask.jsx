import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateTask = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("https://taskmanager-fg8y.onrender.com/tasks", values)
      .then((res) => {
        navigate("/home");
        toast.success("Task created successsfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Add Task</h2>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              placeholder="Enter description"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
              required
            />
          </div>
          <button className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
