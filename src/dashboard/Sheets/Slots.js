import React, { useEffect, useState } from "react";
import { CCol, CRow } from "@coreui/react";

// Custom Imports
import SlotSingle from "./SlotSingle";
import styled from "styled-components";

const Hidden = styled.div`
  display: none;
`;

function Slots({ sheet, slot }) {
  return (
    <CRow>
      {slot.bookings.map((booking, key) => (
        <CCol key={key}>
          <SlotSingle sheet={sheet} slot={slot} booking={booking} />
        </CCol>
      ))}
    </CRow>
  );
}

export default Slots;
