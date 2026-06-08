import React from "react";
import female from "../assets/female.png";
import male from "../assets/male.png";

function Sticker(props) {
  return (
    <div className="sticker">
      <img src={props.image} alt="image URL" />
      <div
        className={"card chip"}
        style={{
          backgroundColor: props.amount > 0 ? "var(--text)" : "var(--primary)",
        }}
      >
        <div className="name_gender">
          <h3>{props.name}</h3>
          {props.amount > 0 ? (
            <img
              src={props.gender === "female" ? female : male}
              alt={props.gender}
            ></img>
          ) : null}
        </div>
        <p className="description">{props.description}</p>
      </div>
    </div>
  );
}

export default Sticker;
