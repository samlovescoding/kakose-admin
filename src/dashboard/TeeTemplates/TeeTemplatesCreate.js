import {
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
  CSelect,
} from "@coreui/react";
import { ErrorMessage, Field, Formik } from "formik";
import { useHistory } from "react-router-dom";
import React from "react";
import * as yup from "yup";
import slugify from "slugify";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function TeeTemplatesCreate() {
  // Stateful Hooks
  const initialValues = {
    name: "",
    slug: "",
    type: "normal",
    players: 4,
    startTime: "09:00",
    endTime: "21:00",
    intervalTime: 30,
  };

  const validationSchema = yup.object({
    name: yup.string().required().label("Name"),
    slug: yup.string().required().label("Template Code"),
    type: yup.string().required().label("Type"),
    players: yup.number().required().label("Players"),
    startTime: yup.string().required().label("Start Time"),
    endTime: yup.string().required().label("End Time"),
    intervalTime: yup.string().required().label("Interval Time"),
  });

  const history = useHistory();

  // Effects and Events
  async function handleCreate(values) {
    try {
      await axios.post("/templates", values);
      history.push("/templates");
    } catch (e) {
      console.error(e.response.data);
    }
  }

  return (
    <DashboardLayout>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Create a Tee Template</CCardHeader>
            <CCardBody>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleCreate}>
                {({ values, handleSubmit, setFieldValue }) => {
                  function getTotalTeeTimes() {
                    const [startHours, startMinutes] = values.startTime.split(":");
                    const [endHours, endMinutes] = values.endTime.split(":");
                    let diff = Math.abs(
                      parseInt(endHours) * 60 +
                        parseInt(endMinutes) -
                        (parseInt(startHours) * 60 + parseInt(startMinutes))
                    );
                    return Math.floor(diff / values.intervalTime);
                  }

                  return (
                    <CForm onSubmit={handleSubmit}>
                      <CRow>
                        <CCol>
                          <CFormGroup>
                            <CLabel>Template Name</CLabel>
                            <Field
                              name="name"
                              as={CInput}
                              onChange={(e) => {
                                setFieldValue("name", e.target.value);
                                setFieldValue("slug", slugify(e.target.value.toLowerCase()));
                              }}
                            />
                            <ErrorMessage component="div" className="text-danger" name="name" />
                          </CFormGroup>
                        </CCol>
                        <CCol>
                          <CFormGroup>
                            <CLabel>Template Code</CLabel>
                            <Field name="slug" as={CInput} />
                            <ErrorMessage component="div" className="text-danger" name="slug" />
                          </CFormGroup>
                        </CCol>
                        <CCol>
                          <CFormGroup>
                            <CLabel>Template Type</CLabel>
                            <Field name="type" as={CSelect}>
                              <option value="normal">Normal</option>
                              <option value="ballot">Ballot</option>
                              <option value="shotgun">Shotgun</option>
                              <option value="crossover">Cross Over</option>
                            </Field>
                            <ErrorMessage component="div" className="text-danger" name="type" />
                          </CFormGroup>
                        </CCol>
                        <CCol>
                          <CFormGroup>
                            <CLabel>Players per Slot</CLabel>
                            <Field name="players" as={CInput} disabled />
                            <ErrorMessage component="div" className="text-danger" name="players" />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <CFormGroup>
                            <CLabel>Starting Time</CLabel>
                            <Field type="time" name="startTime" as={CInput} />
                            <ErrorMessage component="div" className="text-danger" name="startTime" />
                          </CFormGroup>
                        </CCol>
                        <CCol>
                          <CFormGroup>
                            <CLabel>Ending Time</CLabel>
                            <Field type="time" name="endTime" as={CInput} />
                            <ErrorMessage component="div" className="text-danger" name="endTime" />
                          </CFormGroup>
                        </CCol>
                        <CCol>
                          <CFormGroup>
                            <CLabel>Interval Time (Number of Minutes)</CLabel>
                            <Field type="number" name="intervalTime" as={CInput} />
                            <ErrorMessage component="div" className="text-danger" name="intervalTime" />
                          </CFormGroup>
                        </CCol>
                        <CCol>
                          <CFormGroup>
                            <CLabel>Total Tee Times</CLabel>
                            <CInput
                              disabled
                              value={values.startTime && values.endTime && values.intervalTime ? getTotalTeeTimes() : 0}
                              title="This is automatically calculated."
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CFormGroup>
                        <CButton color="primary" type="submit">
                          Create
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

export default TeeTemplatesCreate;
