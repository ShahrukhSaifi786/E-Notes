import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import myContext from "../../context/data/myContext";

function Profile() {
  const [user, setUser] = useState({});
  const context = useContext(myContext);
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:400/api/auth/getuser", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Layout>
      <div className="  mt-32 lg:mt-20 lg:mx-[30em]">
        <div className="flex items-center justify-center  mb-2">
          <img
            className=" w-20"
            src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
            alt="img"
          />
        </div>
        <h1 className="text-center font-semibold">{user.name}</h1>
        <h1 className="text-center font-semibold">{user.email}</h1>
        <h1 className="text-center font-semibold">Total Notes Created : {context.allNotes.length}</h1>
      </div>
    </Layout>
  );
}

export default Profile;
