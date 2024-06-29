import { Link, useNavigate } from "react-router-dom";
import axios from "../../Services/AxiosInterception.js";
import { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const user = {
    email: "",
    password: "",
  };
  const [loginUser, setLoginUser] = useState(user);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/auth/login",
        loginUser
      );
      if (res.status === 200) {
        toast.success(res.data.message, { position: "top-right" });
        navigate("/");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
      }
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };
  return (
    <div className=" flex justify-center items-center h-screen">
      {/* main div  */}
      <div className=" bg-[#d2cbbf] shadow-md px-10 py-10 rounded-xl ">
        {/* Top Heading  */}
        <div className="">
          <h1 className="text-center text-black text-xl mb-4 font-bold">
            Login
          </h1>
        </div>

        <form action="" onSubmit={handleLogin}>
          {/* Input 1 Email  */}
          <div>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              className=" bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
              placeholder="Email"
            />
          </div>

          {/* Input 2 Password  */}
          <div>
            <input
              type="password"
              onChange={handleInput}
              name="password"
              className="bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
              placeholder="Password"
            />
          </div>

          {/* Button For Login  */}
          <div className=" flex justify-center mb-3">
            <button
              type="submit"
              className=" bg-green-700 w-full text-white font-bold  px-2 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </form>

        {/* Link for Signup  */}
        <div>
          <h2 className="text-black">
            Don't have an account{" "}
            <Link className=" text-red-700 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
