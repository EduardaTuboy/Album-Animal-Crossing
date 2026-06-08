import React from "react";
import female from "../assets/female.png";
import male from "../assets/male.png";

function Sticker(props) {
  return (
    <div className="sticker">
      <img src={props.image} alt="image URL" />
      <div className="card chip">
        <div className="name_gender">
          <h3>{props.name}</h3>
          <img
            src={props.gender === "female" ? female : male}
            alt={props.gender}
          ></img>
        </div>
        <p className="description">{props.description}</p>
      </div>
    </div>
  );
}

export default Sticker;
