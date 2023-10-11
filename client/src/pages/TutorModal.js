import React, { useState } from 'react';
import "./TutorModal.css";
import SearchTutor from "./SearchTutor";
import { TutorTileCard } from "./TutorTile";

export default function TutorModal(props) {
  const { toggle, action } = props;

  return (
    <div className={`container-modal ${toggle ? "active" : ""}`}>
      <div className="modal">
        <div className="close" onClick={action}>hi</div>
      </div>
    </div>
  );
}
