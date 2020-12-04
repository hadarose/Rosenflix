import React, { useState, useEffect, useContext } from "react";
import { MembersContext } from "./MembersContextAPI";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getLastId } from "../../shared/id-utils";
import { isValidEmail } from "../../shared/email-utils";
import SuccessMsg from "../SuccessMsg";
import "../../index.css";

function AddNewMember() {
  const history = useHistory();
  const [members, setMembers] = useContext(MembersContext);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isEmailEmpty, setEmailEmpty] = useState(true);
  const [isAllValid, setIsAllValid] = useState(true);

  const saveNewEmail = (evt) => {
    if (isValidEmail(evt.target.value)) {
      setEmail(evt.target.value);
    } else {
      setEmailEmpty(false);
    }
  };

  const addMember = () => {
    setEmailEmpty(true);

    // Getting last Id from members
    let lastMemberId = getLastId(members);
    let newMember = {
      id: lastMemberId + 1,
      name: name,
      email: email,
      address: { city: city },
    };
    setMembers([...members, newMember]);
    setIsAdded(!isAdded);
    setShowForm(!showForm);
  };

  useEffect(() => {
    const checkValid = () => {
      if (name !== "" && city !== "" && isValidEmail(email)) {
        setIsAllValid(false);
      }
    };

    checkValid();
  }, [name, email, city]);

  const goToMembers = () => {
    // Redirect to members so it renders after addition
    history.push("/rosenflix/members");
  };

  return (
    <div>
      {showForm ? (
        <div>
          <form className="form" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(evt) => setName(evt.target.value)}
            />
            <br />

            {isEmailEmpty ? (
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                placeholder="e.g. hr@rosenwoman.com"
                onChange={saveNewEmail}
              ></TextField>
            ) : (
              <TextField
                error
                id="outlined-error-helper-text"
                label="Email"
                variant="outlined"
                helperText="Format: hr@rosenwoman.com"
                placeholder="e.g. hr@rosenwoman.com"
                onChange={saveNewEmail}
              ></TextField>
            )}
            <br />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              onChange={(evt) => setCity(evt.target.value)}
            />
            <br />
          </form>
        </div>
      ) : (
        ""
      )}

      {isAdded ? (
        <SuccessMsg type="Member" name={name.toUpperCase()} action="Added" />
      ) : (
        ""
      )}
      <br />

      <Button
        variant="contained"
        color="secondary"
        style={{ marginRight: "10px" }}
        disabled={isAllValid}
        onClick={addMember}
      >
        Add Member
      </Button>
      <br />
      <br />

      <Button
        variant="contained"
        color="secondary"
        style={{ marginRight: "10px" }}
        onClick={goToMembers}
      >
        Back To Members
      </Button>
    </div>
  );
}

export default AddNewMember;
