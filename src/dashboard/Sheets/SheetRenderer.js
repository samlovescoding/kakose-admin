import { CCard, CCardBody, CCol, CContainer, CDataTable, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import Slots from "./Slots";

function SheetRenderer({ sheet, reloadSheet }) {
  //Stateful Hooks
  const [slots, setSlots] = useState([]);

  //Effects and Events
  useEffect(() => {
    setSlots(sheet.slots);
    return;
    if (sheet.slots.length === 0) {
      let { template } = sheet;
      let { startTime, endTime, intervalTime } = template;
      let [startHours, startMinutes] = startTime.split(":");
      let [endHours, endMinutes] = endTime.split(":");
      let totalStartMinutes = parseInt(startHours) * 60 + parseInt(startMinutes);
      let totalEndMinutes = parseInt(endHours) * 60 + parseInt(endMinutes);
      let _slots = [];
      let currentMinutes = totalStartMinutes;
      while (currentMinutes < totalEndMinutes) {
        let currentHours = Math.floor(currentMinutes / 60);
        if (currentHours < 10) {
          currentHours = "0" + currentHours;
        }
        let currentMin = Math.floor(currentMinutes % 60);
        if (currentMin < 10) {
          currentMin = "0" + currentMin;
        }
        const time = currentHours + ":" + currentMin;
        _slots.push({
          time,
          code: currentMinutes,
          max: sheet.template.players,
          bookings: [],
          requests: [],
          available: sheet.template.players,
          locked: false,
          hidden: false,
        });
        currentMinutes += intervalTime;
      }
      setSlots(_slots);
    } else {
      setSlots(sheet.slots);
    }
  }, []);

  useEffect(() => {
    return;
    if (sheet.slots.length === 0) {
      if (slots.length !== 0) {
        (async () => {
          console.log("Generating Sheet");
          try {
            // await axios.patch("/sheets/" + sheet._id, { slots });
            // reloadSheet();
            console.error("Archaeic Technology");
          } catch (e) {
            console.error(e.response.data.error);
          }
        })();
      }
    }
  }, [slots]);

  return (
    <>
      <CCard>
        <CCardBody>
          <CDataTable
            items={slots}
            fields={["time", "players"]}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
              players: (slot) => {
                return (
                  <td>
                    <CContainer fluid>
                      <Slots slots={slot} sheet={sheet} />
                    </CContainer>
                  </td>
                );
              },
              bookings: (slot) => {
                return <td>No Bookings Pending</td>;
              },
            }}
          ></CDataTable>
        </CCardBody>
      </CCard>
      <pre>{JSON.stringify(sheet, null, 2)}</pre>
      <pre>{JSON.stringify(slots, null, 2)}</pre>
    </>
  );
}

export default SheetRenderer;
