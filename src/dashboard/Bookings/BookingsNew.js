import { CAlert, CButton, CCard, CCardBody, CForm, CFormGroup, CInput, CLabel, CSelect } from "@coreui/react";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import * as yup from "yup";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function BookingNew() {
  // Stateful Hooks
  const [error, setError] = useState();
  const [day, setDay] = useState(new Date());
  const [slots, useSlots] = useState([]);

  const { member } = useParams();

  const initialValues = {
    day: "",
    slot: "",
    type: "locked",
  };

  const validationSchema = yup.object({
    day: yup.string().required().label("Day"),
    slot: yup.string().required().label("Slot"),
    type: yup.string().required().label("Booking Type"),
  });

  // Effects and Events

  function handleCreate(values) {
    try {
      console.log({ ...values, member });
    } catch (e) {
      console.error(e.response.data);
    }
  }

  async function loadSlots() {
    try {
      setError(null);
      let date = day.getDate();
      if (date < 10) date = `0${date}`;
      let month = day.getMonth();
      if (month < 10) month = `0${month}`;
      let year = day.getFullYear();
      const stamp = `${year}-${month}-${date}`;
      const response = await axios.get("/admin/slots/" + stamp);
      console.log(response.data);
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error.message);
    }
  }

  useEffect(() => {
    loadSlots();
  }, [day]);

  return (
    <DashboardLayout>
      <CCard>
        <CCardBody>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleCreate}>
            {({ handleSubmit, values, setFieldValue }) => (
              <CForm onSubmit={handleSubmit}>
                {error ? <CAlert color="danger">{error}</CAlert> : null}
                <CFormGroup>
                  <DatePicker
                    inline
                    onChange={(value) => {
                      let date = value.getDate();
                      if (date < 10) date = `0${date}`;
                      let month = value.getMonth();
                      if (month < 10) month = `0${month}`;
                      let year = value.getFullYear();
                      setFieldValue("day", `${year}-${month}-${date}`);
                      setDay(value);
                    }}
                    value={day}
                  />

                  <ErrorMessage component="div" className="text-danger" name="day" />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Time Slot</CLabel>
                  <Field as={CSelect} name="slot">
                    {slots.map((slot, key) => (
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
                    <option value="queue">Queue</option>
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
