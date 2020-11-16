import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CContainer, CDataTable } from "@coreui/react";
import Slots from "./Slots";

function SheetRenderer({ sheet, reloadSheet }) {
  return (
    <>
      <CCard>
        <CCardHeader>Tee Sheet for {sheet.stamp}</CCardHeader>
        <CCardBody>
          <CDataTable
            items={sheet.slots}
            fields={["time", "teeTimes", "available"]}
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
                    <CContainer fluid>
                      <Slots slot={slot} sheet={sheet} />
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
    </>
  );
}

export default SheetRenderer;
