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
import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import * as yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";

import axios from "../services/axios";
import { useHistory } from "react-router-dom";
import useUser from "../hooks/useUser";

function ClubUsersNew() {
  const [error, setError] = useState(null);
  const { user } = useUser();
  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required().label("Name"),
    email: yup.string().email().required().label("Email"),
    password: yup
      .string()
      .min(8)
      .required()
      .label("Password"),
  });

  return (
    <DashboardLayout>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Club User Registration
            </CCardHeader>
            <CCardBody>
              {error ? (
                <CAlert color="danger">{error}</CAlert>
              ) : null}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const response = await axios.put(
                      "/users/register",
                      {
                        ...values,
                        club: user.club,
                      }
                    );
                    history.push("/users");
                    resetForm();
                  } catch (e) {
                    setError(e.response.data.error.message);
                    console.error(e.response.data.error);
                  }
                }}
              >
                {({ handleSubmit, isSubmitting }) => (
                  <CForm onSubmit={handleSubmit}>
                    <CFormGroup>
                      <CLabel>Name</CLabel>
                      <Field name="name" as={CInput} />
                      <ErrorMessage
                        name="name"
                        className="text-danger"
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Email</CLabel>
                      <Field name="email" as={CInput} />
                      <ErrorMessage
                        name="email"
                        className="text-danger"
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Password</CLabel>
                      <Field
                        name="password"
                        type="password"
                        as={CInput}
                      />
                      <ErrorMessage
                        name="password"
                        className="text-danger"
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CButton
                        type="submit"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Creating"
                          : "Create"}
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

export default ClubUsersNew;
