import { CButton, CCard, CCardBody } from "@coreui/react";
import React, { useEffect, useState } from "react";
import axios from "../../services/axios";

function SlotSingle({ sheet, slot, booking }) {
  // Stateful Hooks
  const [member, setMember] = useState();
  const [deleted, setDeleted] = useState(false);

  // Effects and Events
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/members/" + booking.member);
        setMember(response.data);
      } catch (e) {
        console.error(e.response.data.error.message);
      }
    })();
  }, []);

  async function deleteBooking(event) {
    const _member = event.target.getAttribute("member");
    const _sheet = event.target.getAttribute("sheet");
    try {
      const response = await axios.patch("/admin/bookings-delete", {
        member: _member,
        sheet: _sheet,
        slot: slot.code,
      });
      setDeleted(true);
    } catch (e) {
      console.error(e.response.data.error.message);
    }
  }

  function readableDate(dateString) {
    let date = new Date(dateString);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  return deleted === false ? (
    <CCard style={{ maxWidth: "250px" }}>
      <CCardBody>
        {member ? (
          <>
            <div>{member.name}</div>
            <div>
              <strong>
                {member.memberType.name} <small>Since {readableDate(member.memberSince)}</small>
              </strong>
            </div>
            <div className="mt-2">
              <CButton color="danger" onClick={deleteBooking} sheet={sheet._id} member={member._id}>
                Delete
              </CButton>
            </div>
          </>
        ) : (
          booking.member
        )}
      </CCardBody>
    </CCard>
  ) : null;
}

export default SlotSingle;
