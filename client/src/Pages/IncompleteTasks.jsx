import { useEffect, useState } from "react";
import Axios from "axios";

const IncompleteTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    Axios.get("https://taskmanager-fg8y.onrender.com/tasks?completed=false")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl bg-white rounded-lg p-8 shadow">
          <h2 className="text-2xl font-bold mb-4">Incomplete Tasks</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-4 text-left">ID</th>
                <th className="border-b p-4 text-left">Title</th>
                <th className="border-b p-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="border-b p-4">{task.id}</td>
                  <td className="border-b p-4">{task.title}</td>
                  <td className="border-b p-4">{task.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncompleteTasks;
