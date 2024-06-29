import React, { useState } from "react";
import MyContext from "./myContext";
import axios from "axios";

function MyState(props) {
  // const [loading, setLoading] = useState(false);
  const [allNotes, setAllNotes] = useState([]);

  const getAllNotes = async () => {
    // setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:400/api/notes/fetchallnotes",
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setAllNotes(res.data);
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };

  return (
    <MyContext.Provider value={{ allNotes, getAllNotes , setAllNotes }}>
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
