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
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "../services/axios";
import * as yup from "yup";

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
    tee_time_length: yup
      .number()
      .required()
      .label("Length"),
    tee_time_max_bookings: yup
      .number()
      .required()
      .label("Max Bookings"),
    club_opening_time: yup
      .number()
      .required()
      .label("Opening Time"),
    club_closing_time: yup
      .number()
      .required()
      .label("Closing Time"),
  });

  // Effects and Events
  async function loadClubSettings() {
    try {
      const { data: club } = await axios.get(
        "/admin/club-settings"
      );
      setInitialValues({
        tee_time_length: club.tee_time_length,
        tee_time_max_bookings: club.tee_time_max_bookings,
        club_opening_time: club.club_opening_time,
        club_closing_time: club.club_closing_time,
      });
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error.message);
    }
  }

  async function handleUpdate(values) {
    try {
      //
    } catch (e) {
      console.error(e.response.data);
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
                {({
                  values,
                  handleSubmit,
                  setFieldValue,
                }) => {
                  function getTimeFieldAsNumeric(key) {
                    const value = values[key];
                    const hours = value / 60;
                    const minutes = value % 60;
                    const meridiem = "AM";
                    return (
                      hours + ":" + minutes + " " + meridiem
                    );
                  }

                  function setTimeFieldAsNumeric(event) {
                    const [
                      hours,
                      minutes,
                    ] = event.target.value.split(":");

                    const value = hours * 60 + minutes;
                    setFieldValue(
                      event.target.getAttribute("name"),
                      value
                    );
                  }

                  return (
                    <CForm>
                      {/* {JSON.stringify(values, null, 2)} */}
                      {error ? (
                        <CAlert color="danger">
                          {error}
                        </CAlert>
                      ) : null}
                      <CFormGroup>
                        <CLabel>
                          Tee Time Length (in minutes)
                        </CLabel>
                        <Field
                          as={CInput}
                          name="tee_time_length"
                        />
                        <ErrorMessage
                          name="tee_time_length"
                          component="div"
                          className="text-danger"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>
                          Tee Time Max Bookings per Slot
                        </CLabel>
                        <Field
                          as={CInput}
                          name="tee_time_max_bookings"
                          disabled
                        />
                        <ErrorMessage
                          name="tee_time_max_bookings"
                          component="div"
                          className="text-danger"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Club Opening Time</CLabel>
                        <Field
                          as={CInput}
                          name="club_opening_time"
                          type="time"
                          onChange={setTimeFieldAsNumeric}
                          value={getTimeFieldAsNumeric(
                            "club_opening_time"
                          )}
                        />
                        <ErrorMessage
                          name="club_opening_time"
                          component="div"
                          className="text-danger"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Club Closing Time</CLabel>
                        <Field
                          as={CInput}
                          name="club_closing_time"
                          type="time"
                          onChange={setTimeFieldAsNumeric}
                          value={getTimeFieldAsNumeric(
                            "club_closing_time"
                          )}
                        />
                        <ErrorMessage
                          name="club_closing_time"
                          component="div"
                          className="text-danger"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CButton color="primary">
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
