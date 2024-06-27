import { useState } from "react";
import { useNavigate } from "react-router-dom";
import taskimage from "../assets/taskimage.jpg";

import Axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [signup, setSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handlebtn = () => {
    setSignup(!signup);
  };

  const gotohome = () => {
    navigate("/home");
  };

  const gotoadmin = () => {
    navigate("admin");
  };

  const Submitdata = (e) => {
    e.preventDefault();
    console.log("form data:", { name, email, password });

    //for signup
    if (signup) {
      if (!name || !password || !email) {
        alert("enter the name,email and password");
      } else {
        Axios.post("http://localhost:3001/signup", {
          name,
          email,
          password,
        })
          .then((response) => {
            if (!response.data.error) {
              console.log("insert successful:", response.data);
              gotohome();
              toast.success("Sign up success");
            } else {
              toast.error(`Error: ${response.data.Error}`);
            }
          })
          .catch((error) => {
            console.error("error inserting data:", error);
          });
      }
    }

    //forlogin

    if (!signup) {
      console.log(email.password, 1);

      //admin login
      if (email === "admin@gmail.com" && password === "admin") {
        gotoadmin();
      }

      //userlogin
      else {
        Axios.post("http://localhost:3001/login", {
          email,
          password,
        })
          .then((response) => {
            if (response.data && response.data.Status === "Success") {
              gotohome();
              toast.success("Login successful");
            } else {
              toast.error(`Error: ${response.data.Error}`);
            }
          })
          .catch((error) => {
            console.error("error inserting data", error);
          });
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen ">
      <div
        className="hidden md:flex md:w-1/2 m-7"
        style={{
          backgroundImage: `url(${taskimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="flex flex-col justify-center w-full md:w-1/2 p-4 bg-gray-200">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-3xl text-center font-semibold mb-7">
            {signup ? "SignUp" : "SignIn"}
          </h1>
          <form
            onSubmit={Submitdata}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            {signup && (
              <input
                type="text"
                placeholder="username"
                id="username"
                className="p-3 rounded-lg focus:ring focus:border-blue-300"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            )}
            <input
              type="email"
              placeholder="email"
              id="email"
              className="p-3 rounded-lg focus:ring focus:border-blue-300"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              className="p-3 rounded-lg focus:ring focus:border-blue-300"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="bg-slate-600 text-white p-3 text-lg rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              type="submit"
            >
              {signup ? "SignUp" : "Login"}
            </button>
          </form>
          <div className="flex gap-2 mt-5">
            <p>
              {signup ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button className="text-blue-700" onClick={handlebtn} type="button">
              {signup ? "Login" : "SignUp"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
