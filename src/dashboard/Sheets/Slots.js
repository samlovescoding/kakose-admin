import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import SlotSingle from "./SlotSingle";

function Slots({ sheet, slots }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    let _bookings = [];
    for (let i = 0; i < slots.max; i++) {
      _bookings.push({});
    }
    setBookings(_bookings);
  }, []);
  return (
    <CRow>
      {bookings.map((booking, key) => (
        <CCol key={key}>
          <SlotSingle sheet={sheet} booking={booking} player={null} />
        </CCol>
      ))}
    </CRow>
  );
}

export default Slots;
