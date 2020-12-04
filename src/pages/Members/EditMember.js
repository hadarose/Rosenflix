import React, { useState, useContext, useEffect } from "react";
import { MembersContext } from "./MembersContextAPI";
import { useHistory, useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { isValidEmail } from "../../shared/email-utils";
import "../../index.css";
import SuccessMsg from "../SuccessMsg";

function EditMember() {
  const history = useHistory();
  const [members, setMembers] = useContext(MembersContext);
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [city, setCity] = useState("");
  const [newCity, setNewCity] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEmailChanged, setEmailChanged] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [isEdited, setIsEdited] = useState(false);
  const [isAllValid, setIsAllValid] = useState(true);

  const id = useParams().id;
  let currentMember = members.filter((member) => member.id.toString() === id);

  useEffect(() => {
    setName(currentMember[0] && currentMember[0].name);
    setEmail(currentMember[0] && currentMember[0].email);
    setCity(currentMember[0] && currentMember[0].address.city);
  }, [currentMember]);

  const getEmail = (evt) => {
    setEmailChanged(!isEmailChanged);
    if (isValidEmail(evt.target.value)) {
      setNewEmail(evt.target.value);
    }
  };

  const editMember = () => {
    // Deleting the current Member
    let index = members.findIndex((member) => member.id.toString() === id);
    members.splice(index, 1);

    let newMember = {
      id: id,
      name: newName,
      address: { city: newCity },
      email: newEmail,
    };

    setMembers([...members, newMember]);

    setIsEdited(!isEdited);
    setShowForm(!showForm);
  };

  useEffect(() => {
    const checkValid = () => {
      if (newName !== "" && newCity !== "" && isValidEmail(newEmail)) {
        setIsAllValid(false);
      }
    };
    checkValid();
  }, [newName, newEmail, newCity]);

  const goToMembers = () => {
    // Redirect to subscribers so it renders after addition
    history.push("/rosenflix/members");
  };

  return (
    <div>
      {showForm ? (
        <div className="mainDiv">
          <form className="form" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Update Name"
              variant="outlined"
              placeholder={name}
              onChange={(evt) => setNewName(evt.target.value)}
            />
            <br />
            {isEmailChanged ? (
              <TextField
                error
                id="outlined-error-helper-text"
                label="Update Email"
                helperText="Format: hr@rosenwoman.com"
                variant="outlined"
                placeholder={email}
                onChange={getEmail}
              ></TextField>
            ) : (
              <TextField
                id="outlined-basic"
                label="Update Email"
                variant="outlined"
                placeholder={email}
                onChange={getEmail}
              ></TextField>
            )}
            <br />
            <TextField
              id="outlined-basic"
              label="Update City"
              variant="outlined"
              placeholder={city}
              onChange={(evt) => setNewCity(evt.target.value)}
            />{" "}
            <br />
          </form>
        </div>
      ) : (
        ""
      )}

      {isEdited ? (
        <SuccessMsg type="Member" name={name.toUpperCase()} action="Updated" />
      ) : (
        ""
      )}
      <br />

      <Button
        variant="contained"
        color="secondary"
        disabled={isAllValid}
        onClick={editMember}
      >
        Edit Member
      </Button>
      <br />
      <br />

      <Button variant="contained" color="secondary" onClick={goToMembers}>
        Back To Members
      </Button>
    </div>
  );
}

export default EditMember;
