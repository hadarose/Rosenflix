import React from "react";

function SuccessMsg(props) {
  return (
    <div>
      <h1>
        The {props.type} '<em className="addNewMsg">{props.name}</em>'<br />
        Was {props.action} Successfully
      </h1>
      <br />
    </div>
  );
}

export default SuccessMsg;
