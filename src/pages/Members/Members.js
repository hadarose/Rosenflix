import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MembersContext } from "./MembersContextAPI";
import Member from "./Member";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../../index.css";

function Members() {
  const history = useHistory();
  const [members] = useContext(MembersContext);
  const [showMembers, setShowMembers] = useState(members);

  useEffect(() => {
    if (members) {
      setShowMembers(members);
    }
  }, [members]);

  const filterMembersByMemberName = (memberName) => {
    const filteredResults = members.filter((member) =>
      member.name.toLowerCase().includes(memberName.toLowerCase())
    );

    setShowMembers(filteredResults);
  };

  members.sort(function (a, b) {
    const keyA = a.name.toLowerCase(),
      keyB = b.name.toLowerCase();
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;

    return 0;
  });

  const goToAddMember = () => {
    history.push("/rosenflix/add-new-member");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginRight: "10px" }}
        onClick={goToAddMember}
      >
        Add A New Member
      </Button>

      <TextField
        id="outlined-margin-dense"
        size="small"
        label="Search By Name"
        variant="outlined"
        style={{ top: "-2px", marginRight: "10px", marginBottom: "10px" }}
        onChange={({ target }) => filterMembersByMemberName(target.value)}
      />

      {showMembers.length > 0 ? (
        <div className="membersDiv">
          <Grid container spacing={3}>
            {showMembers.map((member) => (
              <Paper key={member.email}>
                <Member member={member} />
              </Paper>
            ))}
          </Grid>
        </div>
      ) : (
        <h2 className="addNewMsg">
          Sorry, didn't find what you were looking for, try again!
        </h2>
      )}
    </div>
  );
}

export default Members;
