import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import CreateTask from "./Pages/CreateTask";
import EditTask from "./Pages/EditTask";
import CompletedTasks from "./Pages/CompletedTasks";
import IncompleteTasks from "./Pages/IncompleteTasks";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/completed" element={<CompletedTasks />} />
          <Route path="/incomplete" element={<IncompleteTasks />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
