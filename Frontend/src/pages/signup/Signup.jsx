import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
function Signup() {
  const users = {
    name: "",
    email: "",
    password: "",
  };
  const [signUpUser, setSignUpUser] = useState(users);
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://e-notes-8cl5.onrender.com/api/auth/signup",
        signUpUser
      );
      if (res.status === 201) {
        toast.success(
          res.data.message,
          { position: "top-right" },
          { duration: 1000 }
        );
        navigate("/login");
      } else {
        toast.error(
          res.data.message,
          { position: "top-right" },
          { duration: 1000 }
        );
      }
    } catch (error) {
      toast.error(
        error.response.data.message,
        { position: "top-right" },
        { duration: 1000 }
      );
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setSignUpUser({ ...signUpUser, [name]: value });
  };
  return (
    <div className=" flex justify-center items-center h-screen">
      {/* main div  */}
      <div className=" bg-[#d2cbbf] shadow-md px-10 py-10 rounded-xl ">
        {/* Top Heading  */}
        <div className="">
          <h1 className="text-center text-black text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <form action="" onSubmit={handleSignUp}>
          {/* Input 1 Name  */}
          <div>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              className=" bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
              placeholder="Name"
            />
          </div>

          {/* Input 2 Email  */}
          <div>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              className=" bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
              placeholder="Email"
            />
          </div>

          {/* Input 3 Password  */}
          <div>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              className="bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
              placeholder="Password"
            />
          </div>

          {/* Button For Signup  */}
          <div className=" flex justify-center mb-3">
            <button
              type="submit"
              className=" bg-red-700 w-full text-white font-bold  px-2 py-2 rounded-lg"
            >
              Signup
            </button>
          </div>
        </form>

        {/* Link For Login  */}
        <div>
          <h2 className="text-black">
            Have an account{" "}
            <Link className=" text-green-700 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
