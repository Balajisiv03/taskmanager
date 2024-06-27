import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    Axios.get(`https://taskmanager-fg8y.onrender.com/${id}`)
      .then((res) => {
        setValues({
          ...values,
          title: res.data[0].title,
          description: res.data[0].description,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    Axios.put(`https://taskmanager-fg8y.onrender.com/tasks/${id}`, values)
      .then((res) => {
        navigate("/home");
        toast.success("Task updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow">
        <form onSubmit={handleUpdate}>
          <h2 className="text-2xl font-bold mb-4">Update Task</h2>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              className="w-full px-4 py-2 border rounded"
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              placeholder="Enter description"
              className="w-full px-4 py-2 border rounded"
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
              required
            />
          </div>
          <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
