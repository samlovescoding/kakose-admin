import React, { useEffect, useRef, useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CImg,
  CInput,
  CInputFile,
  CInputGroup,
  CInputGroupAppend,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import { Formik, Field, ErrorMessage } from "formik";
import RSelect from "react-select";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function MemberProfilePhoto({ member, loadMember }) {
  const fileInputRef = useRef();
  const [error, setError] = useState(null);

  async function uploadProfilePhoto() {
    setError(null);
    const file = fileInputRef.current.files[0];
    if (file) {
      const payload = new FormData();
      payload.append("profilePhoto", file);
      const response = await axios.patch("/admin/member-photo/" + member._id, payload);
      loadMember();
    } else {
      setError("Please select a file first.");
    }
  }

  return (
    <CCard>
      <CCardHeader>Member Profile Photo</CCardHeader>
      <CCardBody>
        {member ? <CImg src={member.profilePhoto} style={{ width: "100%" }} /> : <span>Loading</span>}
        <CForm encType="multipart/form-data">
          {error ? (
            <CAlert className="mt-3" color="danger">
              {error}
            </CAlert>
          ) : null}
          <CInputGroup className="mt-3">
            <input className="form-control" ref={fileInputRef} type="file" />
            <CInputGroupAppend>
              <CButton color="primary" onClick={uploadProfilePhoto}>
                Upload
              </CButton>
            </CInputGroupAppend>
          </CInputGroup>
        </CForm>
      </CCardBody>
    </CCard>
  );
}

function MembersEdit() {
  // Stateful Hooks
  const profilePhotoRef = useRef();
  const history = useHistory();
  const [memberTypes, setMemberTypes] = useState([]);
  const [initialValues, setInitialValues] = useState();
  const [member, setMember] = useState(null);

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

  async function loadMember() {
    const response = await axios.get("/members/" + id);
    setMember(response.data);
    setInitialValues({
      name: response.data.name,
      email: response.data.email,
      sex: response.data.sex,
      address: response.data.address,
      postalCode: response.data.postalCode,
      phoneNumber: response.data.phoneNumber,
      memberType: {
        label: response.data.memberType.name,
        value: response.data.memberType._id,
      },
    });
  }

  useEffect(() => {
    loadMemberTypes();
    loadMember();
  }, []);

  async function handleEdit(values) {
    try {
      const payload = new FormData();
      Object.keys(values).forEach((key) => {
        payload.append(key, values[key]);
      });

      let response = await axios.patch("/members/" + id, payload);
    } catch (e) {
      console.log(e);
      setError(e.response.data.error);
    }
  }

  return (
    <DashboardLayout>
      <CRow>
        <CCol md="9">
          <CCard>
            <CCardHeader>Member Editing Form</CCardHeader>
            <CCardBody>
              {initialValues ? (
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleEdit}>
                  {({ values, handleSubmit, setFieldValue, isSubmitting }) => {
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
                          <CLabel>Member Type</CLabel>
                          {/* <Field name="memberType" as={CSelect}>
                            {memberTypes.map((memberType, key) => (
                              <option key={key}>{memberType}</option>
                            ))}
                          </Field> */}
                          <Field
                            as={RSelect}
                            name="memberType"
                            options={memberTypes}
                            onChange={(type) => {
                              setFieldValue("memberType", type.value);
                            }}
                            defaultValue={values.memberType}
                            value={memberTypes[values["memberType"]]}
                          />
                          <ErrorMessage component="div" className="text-danger" name="memberType" />
                        </CFormGroup>
                        <CFormGroup>
                          <CButton color={isSubmitting ? "secondary" : "primary"} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Updating" : "Update"}
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

        <CCol md="3">
          <MemberProfilePhoto member={member} loadMember={loadMember} />
        </CCol>
      </CRow>
    </DashboardLayout>
  );
}

export default MembersEdit;
