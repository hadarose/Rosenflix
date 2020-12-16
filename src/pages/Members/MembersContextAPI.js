import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MembersContext = createContext();
export const MembersContextProvider = (props) => {
  const [restMembers, setRestMembers] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((resp) => setRestMembers(resp.data));
  }, []);

  useEffect(() => {
    setMembers((members) => [...members, ...restMembers]);

    /* // Sorting the members array by name
    members.sort(function (a, b) {
      const keyA = a.name.toLowerCase(),
        keyB = b.name.toLowerCase();

      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;

      return 0;
    });*/
  }, [restMembers]);

  return (
    <MembersContext.Provider value={[members, setMembers]}>
      {props.children}
    </MembersContext.Provider>
  );
};
