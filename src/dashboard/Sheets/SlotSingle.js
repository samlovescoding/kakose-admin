import { CCard, CCardBody } from "@coreui/react";
import React from "react";

function PlayerRenderer({ player }) {
  return <div>{player.name}</div>;
}

function SlotSingle({ player = null }) {
  return (
    <CCard>
      <CCardBody>{player ? <PlayerRenderer /> : "Empty Slot"}</CCardBody>
    </CCard>
  );
}

export default SlotSingle;
