import React, { useRef, useState } from "react";
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
  CInputFile,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import RSelect from "react-select";
import { Formik, Field, ErrorMessage } from "formik";
import DashboardLayout from "../layouts/DashboardLayout";
import * as yup from "yup";
import axios from "../services/axios";
import { useHistory } from "react-router-dom";

function NewMember() {
  // Stateful Hooks
  const profilePhotoRef = useRef();
  const history = useHistory();
  const memberTypes = [
    "Junior",
    "Shareholder",
    "Somebody Else",
  ];

  const initialValues = {
    name: "",
    email: "",
    password: "",
    sex: "Male",
    address: "",
    postalCode: "",
    phoneNumber: "",
    memberType: memberTypes[0],
    dateOfBirth: "",
    memberSince: "",
    profilePhotoCheck: null,
  };

  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    sex: yup.string().required(),
    address: yup.string().required(),
    postalCode: yup.string().required(),
    phoneNumber: yup.string().required(),
    memberType: yup.string().required(),
    dateOfBirth: yup.date().required(),
    memberSince: yup.date().required(),
    profilePhotoCheck: yup
      .boolean()
      .typeError("Profile photo is required")
      .required(),
  });

  const [error, setError] = useState(null);

  // Effects and Events
  async function handleCreate(values) {
    try {
      const payload = new FormData();
      Object.keys(values).forEach((key) => {
        payload.append(key, values[key]);
      });
      payload.append(
        "profilePhoto",
        profilePhotoRef.current.files[0]
      );

      let response = await axios.put(
        "/members/register",
        payload
      );
      history.push("/members");
    } catch (e) {
      console.log(e);
      setError(e.response.data.error);
    }
  }

  return (
    <DashboardLayout>
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardHeader>
              Member Registration Form
            </CCardHeader>
            <CCardBody>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleCreate}
              >
                {({
                  values,
                  handleSubmit,
                  setFieldValue,
                }) => {
                  return (
                    <CForm onSubmit={handleSubmit}>
                      {error ? (
                        <CAlert color="danger">
                          {error}
                        </CAlert>
                      ) : null}

                      <CFormGroup>
                        <CLabel>Name</CLabel>
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
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
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
                          component="div"
                          className="text-danger"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Sex</CLabel>
                        <Field name="sex" as={CSelect}>
                          <option>Male</option>
                          <option>Female</option>
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger"
                          name="sex"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Address</CLabel>
                        <Field name="address" as={CInput} />
                        <ErrorMessage
                          component="div"
                          className="text-danger"
                          name="address"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Postal Code</CLabel>
                        <Field
                          name="postalCode"
                          as={CInput}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger"
                          name="postalCode"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Phone Number</CLabel>
                        <Field
                          name="phoneNumber"
                          as={CInput}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger"
                          name="phoneNumber"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Profile Photo</CLabel>
                        <input
                          name="profilePhotoCheck"
                          className="form-control"
                          ref={profilePhotoRef}
                          type="file"
                          onChange={(event) => {
                            if (
                              event.target.files[0] != null
                            ) {
                              setFieldValue(
                                "profilePhotoCheck",
                                true
                              );
                            }
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger"
                          name="profilePhoto"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Member Type</CLabel>
                        <Field
                          name="memberType"
                          as={CSelect}
                        >
                          {memberTypes.map(
                            (memberType, key) => (
                              <option key={key}>
                                {memberType}
                              </option>
                            )
                          )}
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger"
                          name="memberType"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Date of Birth</CLabel>
                        <Field
                          name="dateOfBirth"
                          type="date"
                          as={CInput}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger"
                          name="dateOfBirth"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Member Since</CLabel>
                        <Field
                          name="memberSince"
                          type="date"
                          as={CInput}
                        />
                        <ErrorMessage
                          as="div"
                          className="text-danger"
                          name="memberSince"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CButton
                          color="primary"
                          type="submit"
                        >
                          Register
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

export default NewMember;
