import React, { useEffect, useState } from "react";
import { CCard, CCardHeader, CCol, CRow } from "@coreui/react";
import DatePicker from "react-datepicker";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import SheetRenderer from "./SheetRenderer";
import axios from "../../services/axios";
import SheetCreator from "./SheetCreator";
import { useParams } from "react-router-dom";

function Sheets() {
  // Stateful Hooks
  const { stamp } = useParams();
  const [date, setDate] = useState(new Date());
  const [sheet, setSheet] = useState();

  // Effects and Events
  function handleDateChange(newDate) {
    setDate(newDate);
  }

  async function loadSheet() {
    try {
      let stamp = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
      const response = await axios.get("/sheets/" + stamp);
      setSheet(response.data);
    } catch (e) {
      console.error(e.response.data);
    }
  }

  useEffect(() => {
    if (stamp) {
      const [year, month, date] = stamp.split("-");
      setDate(new Date(year, month, date));
    }
  }, []);

  useEffect(() => {
    loadSheet();
  }, [date]);

  return (
    <DashboardLayout>
      <CRow>
        <CCol>
          {sheet ? (
            <SheetRenderer sheet={sheet} date={date} reloadSheet={loadSheet} />
          ) : (
            <SheetCreator date={date} reloadSheet={loadSheet} />
          )}
        </CCol>
        <CCol md="3">
          <DatePicker inline onChange={handleDateChange} value={date} />
        </CCol>
      </CRow>
    </DashboardLayout>
  );
}

export default Sheets;
