import React, { useState } from "react";
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
import * as yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";
import { useHistory, useParams } from "react-router-dom";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function ClubUsersNew() {
  // Stateful Hooks
  const [error, setError] = useState(null);

  const history = useHistory();

  const { id } = useParams();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required().label("Name"),
    email: yup.string().email().required().label("Email"),
    password: yup.string().min(8).required().label("Password"),
    confirmPassword: yup
      .string()
      .min(8)
      .required()
      .oneOf([yup.ref("password"), null], "Password Confirmation is incorrect.")
      .label("Password Confirmation"),
  });

  return (
    <DashboardLayout>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Club Admin Registration</CCardHeader>
            <CCardBody>
              {error ? <CAlert color="danger">{error}</CAlert> : null}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const response = await axios.put("/users/register", {
                      ...values,
                      club: id,
                      role: "club_admin",
                    });
                    history.push("/clubs");
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
                      <ErrorMessage component="div" name="name" className="text-danger" />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Email</CLabel>
                      <Field name="email" as={CInput} />
                      <ErrorMessage component="div" name="email" className="text-danger" />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Password</CLabel>
                      <Field name="password" type="password" as={CInput} />
                      <ErrorMessage component="div" name="password" className="text-danger" />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Confirm Password</CLabel>
                      <Field type="password" name="confirmPassword" as={CInput} />
                      <ErrorMessage component="div" name="confirmPassword" className="text-danger" />
                    </CFormGroup>
                    <CFormGroup>
                      <CButton type="submit" color="primary" disabled={isSubmitting}>
                        {isSubmitting ? "Creating" : "Create"}
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
