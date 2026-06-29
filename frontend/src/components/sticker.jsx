import React, { useState, useEffect } from "react";
import female from "../assets/female.png";
import male from "../assets/male.png";
import {
  useUpdateSticker,
  useAddSticker,
  useDeleteSticker,
} from "../api/stickersQueries.js";
import "../styles/stickers.css";

function Sticker(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [draftAmount, setDraftAmount] = useState(props.amount || 0);
  const [draftAutograph, setDraftAutograph] = useState(!!props.autograph);

  useEffect(() => {
    setDraftAmount(props.amount || 0);
  }, [props.amount]);

  useEffect(() => {
    setDraftAutograph(!!props.autograph);
  }, [props.autograph]);

  const { mutate: addSticker, isPending: isAdding } = useAddSticker();
  const { mutate: updateSticker, isPending: isUpdating } = useUpdateSticker();
  const { mutate: deleteSticker, isPending: isDeleting } = useDeleteSticker();

  const isPending = isAdding || isUpdating || isDeleting;

  let currentStatus = "MISSING";
  if (draftAmount === 1) currentStatus = "UNLOCKED";
  if (draftAmount >= 2) currentStatus = "REPEATING";

  const handleConfirm = (e) => {
    e.stopPropagation();
    const currentAmount = props.amount || 0;

    const payload = {
      email: props.email,
      number: props.number,
      amount: draftAmount,
      autograph: draftAutograph,
    };

    if (currentAmount === 0 && draftAmount > 0) {
      addSticker(payload, { onSuccess: () => setIsExpanded(false) });
    } else if (currentAmount > 0 && draftAmount === 0) {
      deleteSticker(
        { email: props.email, number: props.number },
        { onSuccess: () => setIsExpanded(false) },
      );
    } else if (
      (currentAmount > 0 && draftAmount > 0 && draftAmount !== currentAmount) ||
      draftAutograph !== !!props.autograph
    ) {
      updateSticker(payload, { onSuccess: () => setIsExpanded(false) });
    } else {
      setIsExpanded(false);
    }
  };
  const handleCancel = (e) => {
    e.stopPropagation();
    setDraftAmount(props.amount || 0);
    setDraftAutograph(!!props.autograph);
    setIsExpanded(false);
  };

  return (
    <div
      className={`sticker ${isExpanded ? "expanded" : ""}`}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
    >
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

        {/* Hidden Edition */}
        {isExpanded && (
          <div className="edit-section" onClick={(e) => e.stopPropagation()}>
            <span>{currentStatus}</span>

            <div className="amount-control">
              <button
                onClick={() => setDraftAmount((prev) => Math.max(0, prev - 1))}
              >
                -
              </button>

              <span>{draftAmount}</span>

              <button onClick={() => setDraftAmount((prev) => prev + 1)}>
                +
              </button>
            </div>

            <label
              className={`switch-button ${draftAutograph ? "active" : "inactive"}`}
            >
              <input
                type="checkbox"
                className="switch-input"
                checked={draftAutograph}
                onChange={(e) => setDraftAutograph(e.target.checked)}
              />
              Autograph
            </label>

            <div className="cancel-confirm">
              <button
                onClick={handleCancel}
                disabled={isPending}
                className="cancel"
              >
                CANCEL
              </button>
              <button
                className="confirm"
                onClick={handleConfirm}
                disabled={
                  isPending ||
                  (draftAmount === (props.amount || 0) &&
                    draftAutograph === !!props.autograph)
                }
              >
                {isPending ? "Loading..." : "CONFIRM"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sticker;
