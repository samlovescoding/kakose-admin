import React, { useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import { ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "../services/axios";
import { useHistory } from "react-router-dom";

const initialValues = {
  name: "",
  slug: "",
  tee_time_length: 30,
  tee_time_max_bookings: 4,
};

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Club Name must be greater than 3 characters.")
    .required("Club name is required")
    .label("Name"),
  slug: yup
    .string()
    .required()
    .lowercase()
    .min(3)
    .max(12)
    .label("Slug"),
  tee_time_length: yup.number().required().label("Length"),
  tee_time_max_bookings: yup
    .number()
    .required()
    .label("Max Bookings"),
});

function NewClub() {
  const [error, setError] = useState(null);
  const history = useHistory();

  async function handleCreate(values) {
    try {
      setError(null);
      await axios.post("/clubs", values);
      history.push("/clubs");
    } catch (e) {
      setError(e.response.data.error.message);
    }
  }

  return (
    <DashboardLayout>
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardHeader>
              Club Registration Form
            </CCardHeader>
            <CCardBody>
              {error ? (
                <CAlert color="danger">{error}</CAlert>
              ) : null}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleCreate}
              >
                {({ handleSubmit }) => (
                  <CForm onSubmit={handleSubmit}>
                    <CFormGroup>
                      <CLabel>Name</CLabel>
                      <Field
                        name="name"
                        placeholder="Club Name"
                        as={CInput}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Slug</CLabel>
                      <Field
                        name="slug"
                        placeholder="Club Slug"
                        as={CInput}
                      />
                      <ErrorMessage
                        name="slug"
                        component="div"
                        className="text-danger"
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>
                        Tee Time Length (in minutes)
                      </CLabel>
                      <Field
                        as={CInput}
                        name="tee_time_length"
                        type="number"
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
                      <CButton
                        color="primary"
                        type="submit"
                      >
                        Create
                      </CButton>
                    </CFormGroup>
                  </CForm>
                )}
              </Formik>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </DashboardLayout>
  );
}

export default NewClub;
