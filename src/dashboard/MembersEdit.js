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
import DashboardLayout from "../layouts/DashboardLayout";
import * as yup from "yup";
import axios from "../services/axios";
import { useHistory, useParams } from "react-router-dom";
import dateFormat from "../services/dateFormat";

function MembersEdit() {
  // Stateful Hooks
  const profilePhotoRef = useRef();
  const history = useHistory();
  const memberTypes = [
    "Junior",
    "Shareholder",
    "Somebody Else",
  ];
  const [initialValues, setInitialValues] = useState();
  // {
  //   name: "",
  //   email: "",
  //   password: "",
  //   sex: "Male",
  //   address: "",
  //   postalCode: "",
  //   phoneNumber: "",
  //   memberType: memberTypes[0],
  //   dateOfBirth: "",
  //   memberSince: "",
  // }
  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    sex: yup.string().required(),
    address: yup.string().required(),
    postalCode: yup.string().required(),
    phoneNumber: yup.string().required(),
    memberType: yup.string().required(),
  });
  const [error, setError] = useState(null);
  const { id } = useParams();

  // Effects and Events
  useEffect(() => {
    (async () => {
      const response = await axios.get("/members/" + id);
      setInitialValues({
        name: response.data.name,
        email: response.data.email,
        sex: response.data.sex,
        address: response.data.address,
        postalCode: response.data.postalCode,
        phoneNumber: response.data.phoneNumber,
        memberType: response.data.memberType,
      });
    })();
  }, []);

  async function handleEdit(values) {
    try {
      const payload = new FormData();
      Object.keys(values).forEach((key) => {
        payload.append(key, values[key]);
      });

      let response = await axios.patch(
        "/members/" + id,
        payload
      );
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
            <CCardHeader>Member Editing Form</CCardHeader>
            <CCardBody>
              {initialValues ? (
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleEdit}
                >
                  {({
                    values,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
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
                          <Field
                            name="address"
                            as={CInput}
                          />
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
                          <CButton
                            color={
                              isSubmitting
                                ? "secondary"
                                : "primary"
                            }
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting
                              ? "Updating"
                              : "Update"}
                          </CButton>
                        </CFormGroup>
                      </CForm>
                    );
                  }}
                </Formik>
              ) : (
                <div>Loading</div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </DashboardLayout>
  );
}

export default MembersEdit;
