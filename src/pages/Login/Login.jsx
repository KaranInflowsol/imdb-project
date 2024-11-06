import { useState } from "react";
import { supabase } from "../../client";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(formData);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (data.user != null) {
        navigate("/homepage");
        setToken(data);
      }
      if (error) throw error;
      console.log(data);
    } catch (error) {
      formData.email = "";
      formData.password = "";
      alert(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
          />

          <input
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-black bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-gray-600">
          Dont have an account?{" "}
          <Link to="/singup" className="text-blue-500 hover:underline">
            SingUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
