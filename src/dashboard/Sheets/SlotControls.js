import { CButton, CCol, CFormGroup, CLabel, CRow, CSwitch } from "@coreui/react";
import React, { useEffect, useState } from "react";
import axios from "../../services/axios";

function SlotControls({ sheet, slot, reloadSheet }) {
  const [hidden, setHidden] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setHidden(slot.hidden);
    setLocked(slot.locked);
  }, []);

  async function updateSlot() {
    try {
      await axios.patch("/admin/sheet-update", {
        sheet: sheet._id,
        slot: slot.code,
        hidden,
        locked,
      });
    } catch (e) {
      console.error(e.response.data.error.message);
    }
  }

  return (
    <CRow>
      <CCol>
        <CFormGroup className="d-flex">
          <CLabel className="mr-2">Hidden</CLabel>
          <CSwitch
            name="hidden"
            id="hidden"
            checked={hidden}
            onChange={(e) => {
              setHidden(!hidden);
            }}
            color="primary"
          />
        </CFormGroup>
        <CFormGroup className="d-flex">
          <CLabel className="mr-2">Locked</CLabel>
          <CSwitch
            name="locked"
            id="locked"
            checked={locked}
            onChange={(e) => {
              setLocked(!locked);
            }}
            color="primary"
          />
        </CFormGroup>
      </CCol>
      <CCol>
        <CButton color="primary" onClick={updateSlot}>
          Save
        </CButton>
      </CCol>
    </CRow>
  );
}

export default SlotControls;
