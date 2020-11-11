import React, { useEffect, useRef, useState } from "react";
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
  CSelect,
} from "@coreui/react";
import RSelect from "react-select";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

// Custom Imports
import axios from "../../services/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function NewMember() {
  // Stateful Hooks
  const profilePhotoRef = useRef();
  const history = useHistory();

  const [memberTypes, setMemberTypes] = useState([]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    sex: "Male",
    address: "",
    postalCode: "",
    phoneNumber: "",
    memberType: "",
    dateOfBirth: "",
    memberSince: "",
    profilePhotoCheck: null,
  };

  const validationSchema = yup.object({
    name: yup.string().required().label("Name"),
    email: yup.string().email().required().label("Email"),
    password: yup.string().required().label("Password"),
    sex: yup.string().required().label("Sex"),
    address: yup.string().required().label("Address"),
    postalCode: yup.string().required().label("Postal Code"),
    phoneNumber: yup.string().required().label("Phone Number"),
    memberType: yup.string().required().label("Member Type"),
    dateOfBirth: yup.date().required().label("Date Of Birth"),
    memberSince: yup.date().required().label("Member Since"),
    profilePhotoCheck: yup.boolean().typeError("Profile Photo is a required file").required(),
  });

  const [error, setError] = useState(null);

  // Effects and Events
  async function handleCreate(values) {
    try {
      const payload = new FormData();
      Object.keys(values).forEach((key) => {
        payload.append(key, values[key]);
      });
      payload.append("profilePhoto", profilePhotoRef.current.files[0]);

      let response = await axios.put("/members/register", payload);
      history.push("/members");
    } catch (e) {
      console.log(e);
      setError(e.response.data.error);
    }
  }

  async function loadMemberTypes() {
    try {
      const response = await axios.get("/admin/memberTypes");
      setMemberTypes(
        response.data.map((type) => {
          return {
            label: type.name,
            value: type._id,
          };
        })
      );
    } catch (e) {
      console.error(e.response.data);
    }
  }

  useEffect(() => {
    loadMemberTypes();
  }, []);

  return (
    <DashboardLayout>
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardHeader>Member Registration Form</CCardHeader>
            <CCardBody>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleCreate}>
                {({ values, handleSubmit, setFieldValue }) => {
                  return (
                    <CForm onSubmit={handleSubmit}>
                      {error ? <CAlert color="danger">{error}</CAlert> : null}

                      <CFormGroup>
                        <CLabel>Name</CLabel>
                        <Field name="name" as={CInput} />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Email</CLabel>
                        <Field name="email" type="email" as={CInput} />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Password</CLabel>
                        <Field name="password" type="password" as={CInput} />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Sex</CLabel>
                        <Field name="sex" as={CSelect}>
                          <option>Male</option>
                          <option>Female</option>
                        </Field>
                        <ErrorMessage component="div" className="text-danger" name="sex" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Address</CLabel>
                        <Field name="address" as={CInput} />
                        <ErrorMessage component="div" className="text-danger" name="address" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Postal Code</CLabel>
                        <Field name="postalCode" as={CInput} />
                        <ErrorMessage component="div" className="text-danger" name="postalCode" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Phone Number</CLabel>
                        <Field name="phoneNumber" as={CInput} />
                        <ErrorMessage component="div" className="text-danger" name="phoneNumber" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Profile Photo</CLabel>
                        <input
                          name="profilePhotoCheck"
                          className="form-control"
                          ref={profilePhotoRef}
                          type="file"
                          onChange={(event) => {
                            if (event.target.files[0] != null) {
                              setFieldValue("profilePhotoCheck", true);
                            }
                          }}
                        />
                        <ErrorMessage component="div" className="text-danger" name="profilePhotoCheck" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Member Type</CLabel>
                        <Field
                          name="memberType"
                          as={RSelect}
                          options={memberTypes}
                          onChange={(type) => {
                            setFieldValue("memberType", type.value);
                          }}
                        />
                        <ErrorMessage component="div" className="text-danger" name="memberType" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Date of Birth</CLabel>
                        <Field name="dateOfBirth" type="date" as={CInput} />
                        <ErrorMessage component="div" className="text-danger" name="dateOfBirth" />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Member Since</CLabel>
                        <Field name="memberSince" type="date" as={CInput} />
                        <ErrorMessage component="div" className="text-danger" name="memberSince" />
                      </CFormGroup>
                      <CFormGroup>
                        <CButton color="primary" type="submit">
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
