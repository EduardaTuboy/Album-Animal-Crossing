import React from "react";
import female from "../assets/female.png";
import male from "../assets/male.png";

function Sticker(props) {
  return (
    <div className="sticker">
      <div className="line">
        <span
          style={{
            backgroundColor:
              props.amount > 0 ? "var(--text)" : "var(--secondary)",
            color: props.amount > 0 ? "var(--secondary)" : "var(--text)",
          }}
        >
          {props.number.toString().padStart(3, "0")}
        </span>
        <div
          className={`${props.personality} autograph`}
          style={{ visibility: props.autograph ? "visible" : "hidden" }}
        >
          {props.catchphrase}
        </div>
        <div
          className="badge"
          style={{ visibility: props.amount > 1 ? "visible" : "hidden" }}
        >
          {props.amount}
        </div>
      </div>
      <img src={props.image} alt="image URL" />
      <div
        className={"card chip"}
        style={{
          backgroundColor: props.amount > 0 ? "var(--text)" : "var(--primary)",
        }}
      >
        <div className="name_gender">
          <h3>{props.name}</h3>
          <img
            src={props.gender === "female" ? female : male}
            alt={props.gender}
            style={{ visibility: props.amount > 0 ? "visible" : "hidden" }}
          />
        </div>
        <p className="description">{props.description}</p>
      </div>
    </div>
  );
}

export default Sticker;
