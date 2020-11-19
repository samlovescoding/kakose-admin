import { CAlert, CButton, CCard, CCardBody, CForm, CFormGroup, CInput, CLabel, CSelect } from "@coreui/react";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import * as yup from "yup";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function BookingNew() {
  // Stateful Hooks
  const history = useHistory();
  const [error, setError] = useState();
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);

  const { member } = useParams();

  const initialValues = {
    day: date2stamp(new Date()),
    slot: "",
    type: "locked",
  };

  const validationSchema = yup.object({
    day: yup.string().required().label("Day"),
    slot: yup.string().required().label("Slot"),
    type: yup.string().required().label("Booking Type"),
  });

  // Effects and Events

  function date2stamp(date) {
    let _date = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    const stamp = `${year}-${month}-${_date}`;
    return stamp;
  }

  async function handleCreate(values) {
    try {
      setError(null);
      const response = await axios.post("/admin/booking", { ...values, member });
      history.push("/sheets");
    } catch (e) {
      setError(e.response.data.error.message);
      console.error(e.response.data);
    }
  }

  async function loadSlots(date) {
    try {
      setError(null);
      const response = await axios.get("/admin/slots/" + date2stamp(date));
      setSlots(response.data);
    } catch (e) {
      if (e.response) {
        setError(e.response.data.error.message);
      } else {
        setError(e.message);
      }
    }
  }

  useEffect(() => {
    loadSlots(date);
  }, [date]);

  return (
    <DashboardLayout>
      <CCard>
        <CCardBody>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleCreate}>
            {({ handleSubmit, setFieldValue }) => (
              <CForm onSubmit={handleSubmit}>
                {error ? <CAlert color="danger">{error}</CAlert> : null}
                <CFormGroup>
                  <DatePicker
                    inline
                    onChange={(value) => {
                      setFieldValue("day", date2stamp(value));
                      setDate(value);
                    }}
                    value={date}
                  />

                  <ErrorMessage component="div" className="text-danger" name="day" />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Time Slot</CLabel>
                  <Field
                    as={CSelect}
                    name="slot"
                    onChange={(e) => {
                      setFieldValue("slot", parseInt(e.target.value));
                    }}
                  >
                    <option value="">Please choose a slot</option>
                    {slots
                      .filter((slot) => {
                        if (slot.available <= 0) {
                          return false;
                        }
                        return true;
                      })
                      .map((slot) => {
                        return {
                          label: `${slot.time} Remaining Slots ${slot.available}`,
                          value: slot.code,
                        };
                      })
                      .map((slot, key) => (
                        <option key={key} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage component="div" className="text-danger" name="slot" />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Booking Type</CLabel>
                  <Field as={CSelect} name="type">
                    <option value="locked">Locked</option>
                    <option value="ballot">Ballot</option>
                  </Field>
                  <ErrorMessage component="div" className="text-danger" name="type" />
                </CFormGroup>
                <CFormGroup>
                  <CButton color="primary" type="submit">
                    Book
                  </CButton>
                </CFormGroup>
              </CForm>
            )}
          </Formik>
        </CCardBody>
      </CCard>
    </DashboardLayout>
  );
}

export default BookingNew;
