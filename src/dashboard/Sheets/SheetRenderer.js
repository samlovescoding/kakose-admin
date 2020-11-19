import React, { useEffect, useState } from "react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CDataTable, CRow, CSwitch } from "@coreui/react";
import Slots from "./Slots";
import dateFormat from "../../services/dateFormat";
import SlotControls from "./SlotControls";
function SheetRenderer({ sheet, reloadSheet }) {
  function runBallot() {
    console.log(sheet._id);
  }

  function updateSlotControls() {
    console.log();
  }

  return (
    <>
      <CCard>
        <CCardHeader>Tee Sheet for {sheet.stamp}</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="mb-5">
                <h3>Sheet Information</h3>
                <div>Type - {sheet.sheetType ? sheet.sheetType : sheet.template.type}</div>
                <div>Starting Time - {sheet.template.startTime}</div>
                <div>Ending Time - {sheet.template.endTime}</div>
                <div>Interval Time - {sheet.template.intervalTime} minutes</div>
              </div>
            </CCol>
            <CCol>
              {sheet.ballot === true ? (
                <div className="mb-5">
                  <h3>Ballot Information</h3>
                  <div>Ballot Run Date - {dateFormat(sheet.ballotRunDate)}</div>
                  <div>Ballot Entries - {sheet.ballotEntries.length}</div>
                  <CButton color="primary" className="mt-2" onClick={runBallot}>
                    Run Ballot
                  </CButton>
                </div>
              ) : null}
            </CCol>
          </CRow>
          <h3>Tee Times</h3>
          <CDataTable
            items={sheet.slots}
            fields={["time", "teeTimes", "available", "controls"]}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
              teeTimes: (slot) => {
                return (
                  <td>
                    {slot.bookings.length === 0 ? "No bookings" : null}
                    <CContainer fluid>
                      <Slots slot={slot} sheet={sheet} />
                    </CContainer>
                  </td>
                );
              },
              controls: (slot) => {
                return (
                  <td>
                    <SlotControls slot={slot} sheet={sheet} reloadSheet={reloadSheet} />
                  </td>
                );
              },
            }}
          ></CDataTable>
        </CCardBody>
      </CCard>
    </>
  );
}

export default SheetRenderer;
