import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import * as yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";
import axios from "../services/axios";
import useUser from "../hooks/useUser";
import { useHistory } from "react-router-dom";

function ChangePassword() {
  const { removeUser } = useUser();

  const [error, setError] = useState();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object({
    currentPassword: yup
      .string()
      .required()
      .label("Current Password"),
    newPassword: yup
      .string()
      .required()
      .min(8)
      .label("New Password"),
    confirmPassword: yup
      .string()
      .required()
      .oneOf(
        [yup.ref("newPassword"), null],
        "Password confirmation is incorrect."
      )
      .label("Confirm Password"),
  });

  async function handleChangePassword(values) {
    try {
      await axios.patch("/admin/update-password", values);
      removeUser();
      window.location = "/";
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error.message);
    }
  }

  return (
    <CCard>
      <CCardHeader>Change Password</CCardHeader>
      <CCardBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {({ values, handleSubmit }) => (
            <CForm onSubmit={handleSubmit}>
              {error ? (
                <CAlert color="danger">{error}</CAlert>
              ) : null}
              <CFormGroup>
                <CLabel>Current Password</CLabel>
                <Field
                  name="currentPassword"
                  as={CInput}
                  type="password"
                />
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className="text-danger"
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>New Password</CLabel>
                <Field
                  name="newPassword"
                  as={CInput}
                  type="password"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-danger"
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Confirm Password</CLabel>
                <Field
                  name="confirmPassword"
                  as={CInput}
                  type="password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger"
                />
              </CFormGroup>
              <CFormGroup style={{ display: "flex" }}>
                <CButton color="primary" type="submit">
                  Change Password
                </CButton>
                <div className="text-warning mt-2 ml-2">
                  You will need to re-login after
                  successfully changing password.
                </div>
              </CFormGroup>
            </CForm>
          )}
        </Formik>
      </CCardBody>
    </CCard>
  );
}

function ProfileSettingsWithoutPassword() {
  const { removeUser } = useUser();

  const [error, setError] = useState(null);

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
  });

  const validationSchema = yup.object({
    name: yup.string().required().label("Name"),
    email: yup.string().email().required().label("Email"),
  });

  async function loadProfile() {
    try {
      const response = await axios.get("/admin/profile");
      setInitialValues({
        name: response.data.name,
        email: response.data.email,
      });
    } catch (e) {
      console.error(e.response.data);
    }
  }

  async function handleUpdateProfile(values) {
    try {
      await axios.patch("/admin/update-profile", values);
      removeUser();
      window.location = "/";
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error.message);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <CCard>
      <CCardHeader>Profile Settings</CCardHeader>
      <CCardBody>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleUpdateProfile}
        >
          {({ handleSubmit, values }) => (
            <CForm onSubmit={handleSubmit}>
              {error ? (
                <CAlert color="danger">{error}</CAlert>
              ) : null}
              <CFormGroup>
                <CLabel>Your Name</CLabel>
                <Field name="name" as={CInput} />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Email</CLabel>
                <Field
                  name="email"
                  type="email"
                  as={CInput}
                  disabled={true}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </CFormGroup>
              <CFormGroup style={{ display: "flex" }}>
                <CButton color="primary" type="submit">
                  Update
                </CButton>
                <div className="text-warning mt-2 ml-2">
                  You will need to re-login after update.
                </div>
              </CFormGroup>
            </CForm>
          )}
        </Formik>
      </CCardBody>
    </CCard>
  );
}

function ProfileSettings() {
  return (
    <DashboardLayout>
      <CRow>
        <CCol>
          <ProfileSettingsWithoutPassword />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <ChangePassword />
        </CCol>
      </CRow>
    </DashboardLayout>
  );
}

export default ProfileSettings;
