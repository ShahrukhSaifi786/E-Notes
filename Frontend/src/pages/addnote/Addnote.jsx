import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "../../Services/AxiosInterception.js";

function Addnote() {
  const user = {
    title: "",
    tags: "",
    description: "",
  };
  const [addNote, setAddNote] = useState(user);
  const navigate = useNavigate();
  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/notes/addnotes",
        addNote,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message, { position: "top-right" });
        navigate("/");
      }
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setAddNote({ ...addNote, [name]: value });
  };
  return (
    <Layout>
      <div className=" lg:mx-[6em] mt-16 lg:mt-0 flex justify-center items-center h-screen">
        <div className=" bg-[#d2cbbf] lg:w-[60em] lg:h-[35em]  rounded-xl p-10   ">
          <div className="">
            {/* Top Heading  */}
            <div className=" mb-5">
              <h1 className="text-center text-black text-xl  font-bold">
                Add Note
              </h1>
            </div>
            <form action="" onSubmit={handleAddNote}>
              {/* Input 1  */}
              <div>
                <input
                  type="text"
                  name="title"
                  onChange={handleInput}
                  className="inputShadow
                                 mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black outline-none"
                  placeholder="Title"
                />
              </div>

              {/* Input 2  */}
              <div>
                <input
                  type="text"
                  name="tags"
                  onChange={handleInput}
                  className="inputShadow
                                  mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black outline-none"
                  placeholder="Tag"
                />
              </div>

              {/* TextArea 3  */}
              <div>
                <textarea
                  name="description"
                  id=""
                  cols="30"
                  rows="10"
                  onChange={handleInput}
                  className="inputShadow
                                  mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black outline-none"
                  placeholder="Description"
                ></textarea>
              </div>

              {/* Button  */}
              <div className=" flex justify-center mb-3">
                <button
                  type="submit"
                  className=" bg-[#000000] w-full text-white font-bold  px-2 
                                py-2.5 rounded-md"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Addnote;
