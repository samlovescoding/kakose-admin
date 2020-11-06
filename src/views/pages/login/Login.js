import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "../../../services/axios";

import config from "../../../config";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter a email."),
  password: yup
    .string()
    .required("Please enter a password."),
});

const Login = () => {
  // Stateful Hooks
  const [responseError, setResponseError] = useState(null);
  const history = useHistory();

  // Effects & Events
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      localStorage.clear();
    }
  }, []);

  async function handleLogin(payload) {
    try {
      let request = await axios.post(
        "/users/login",
        payload
      );
      console.log(request.data);
      localStorage.setItem(
        "user",
        JSON.stringify(request.data)
      );
      history.push(config.LOGIN_REDIRECT);
    } catch (e) {
      setResponseError(e.response.data.error);
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(
                      values,
                      { setSubmitting, resetForm }
                    ) => {
                      setResponseError(null);
                      setSubmitting(true);
                      handleLogin(values);
                      resetForm();
                      setSubmitting(false);
                    }}
                  >
                    {({
                      values,
                      isSubmitting,
                      handleSubmit,
                    }) => (
                      <CForm onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <p className="text-muted">
                          Sign In to your account
                        </p>
                        {responseError ? (
                          <CAlert
                            className="mb-3"
                            color="danger"
                          >
                            {responseError}
                          </CAlert>
                        ) : null}
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <Field
                            name="email"
                            type="text"
                            placeholder="Email"
                            as={CInput}
                          />
                        </CInputGroup>

                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            as={CInput}
                          />
                        </CInputGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              type="submit"
                              disabled={isSubmitting}
                              color="primary"
                              className="px-4"
                            >
                              Login
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
