import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function ClubSettings() {
  // Stateful hooks
  const [initialValues, setInitialValues] = useState({
    tee_time_length: 0,
    tee_time_max_bookings: 0,
    club_opening_time: 0,
    club_closing_time: 0,
  });
  const [error, setError] = useState(null);
  const validationSchema = yup.object({
    tee_time_length: yup.number().required().label("Length"),
    tee_time_max_bookings: yup.number().required().label("Max Bookings"),
    club_opening_time: yup.number().required().label("Opening Time"),
    club_closing_time: yup.number().required().label("Closing Time"),
  });

  // Effects and Events
  async function loadClubSettings() {
    try {
      const { data: club } = await axios.get("/admin/club-settings");
      setInitialValues({
        tee_time_length: club.tee_time_length,
        tee_time_max_bookings: club.tee_time_max_bookings,
        club_opening_time: club.club_opening_time,
        club_closing_time: club.club_closing_time,
      });
    } catch (e) {
      console.error(e);
      setError(e.response.data.error.message);
    }
  }

  async function handleUpdate(values) {
    try {
      let response = await axios.patch("/admin/club-settings", values);
      console.log(response.data);
    } catch (e) {
      console.error(e);
      setError(e.response.data.error.message);
    }
  }

  useEffect(() => {
    loadClubSettings();
  }, []);

  return (
    <DashboardLayout>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Club Settings</CCardHeader>
            <CCardBody>
              <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleUpdate}
              >
                {({ values, handleSubmit, setFieldValue, isSubmitting }) => {
                  function getTimeFieldAsNumeric(key) {
                    const value = values[key];
                    let hours = Math.floor(value / 60);
                    let minutes = Math.floor(value % 60);
                    if (hours < 10) {
                      hours = "0" + hours;
                    }
                    if (hours === 24) {
                      hours = "00";
                    }
                    if (minutes < 10) {
                      minutes = "0" + minutes;
                    }
                    return hours + ":" + minutes;
                  }

                  function setTimeFieldAsNumeric(event) {
                    const [hours, minutes] = event.target.value.split(":");

                    const value = parseInt(hours) * 60 + parseInt(minutes);

                    setFieldValue(event.target.getAttribute("name"), value);
                  }

                  return (
                    <CForm onSubmit={handleSubmit}>
                      {error ? <CAlert color="danger">{error}</CAlert> : null}
                      <CFormGroup>
                        <CLabel>Tee Time Length (in minutes)</CLabel>
                        <Field as={CInput} name="tee_time_length" disabled />
                        <ErrorMessage name="tee_time_length" component="div" className="text-danger" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Tee Time Max Bookings per Slot</CLabel>
                        <Field as={CInput} name="tee_time_max_bookings" disabled />
                        <ErrorMessage name="tee_time_max_bookings" component="div" className="text-danger" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Club Opening Time</CLabel>
                        <Field
                          as={CInput}
                          name="club_opening_time"
                          type="time"
                          onChange={setTimeFieldAsNumeric}
                          value={getTimeFieldAsNumeric("club_opening_time")}
                        />
                        <ErrorMessage name="club_opening_time" component="div" className="text-danger" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Club Closing Time</CLabel>
                        <Field
                          as={CInput}
                          name="club_closing_time"
                          type="time"
                          onChange={setTimeFieldAsNumeric}
                          value={getTimeFieldAsNumeric("club_closing_time")}
                        />
                        <ErrorMessage name="club_closing_time" component="div" className="text-danger" />
                      </CFormGroup>
                      <CFormGroup>
                        <CButton color="primary" type="submit" disabled={isSubmitting}>
                          Save
                        </CButton>
                      </CFormGroup>
                    </CForm>
                  );
                }}
              </Formik>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </DashboardLayout>
  );
}

export default ClubSettings;
