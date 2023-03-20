import React from "react";
import { Link } from "react-router-dom";

function RenderHost({ info }) {
  return (
    <>
      <Link to={`item/${info.id}`}>
        <div key={info.id}>
          <img src={info.url} alt="hostImg" />
          <p> {info.hostName}</p>
          <p> {info.location}</p>
        </div>
      </Link>
    </>
  );
}

export default RenderHost;
