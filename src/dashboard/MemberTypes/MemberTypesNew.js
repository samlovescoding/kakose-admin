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
import { ErrorMessage, Field, Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function MemberTypesNew() {
  // Stateful Hooks
  const initialValues = {
    name: "",
    priorityPercentage: "",
  };
  const validationSchema = yup.object({
    name: yup.string().required().label("Name"),
    priorityPercentage: yup.number().min(0).max(100).required().label("Priority"),
  });
  const [error, setError] = useState(null);
  const history = useHistory();

  // Effects and Events
  async function handleCreate(values) {
    try {
      let response = await axios.post("/admin/memberTypes", values);
      history.push("/member-types");
    } catch (e) {
      setError(e.response.data.error.message);
    }
  }

  return (
    <DashboardLayout>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>New Member Type</CCardHeader>
            <CCardBody>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleCreate}>
                {({ handleSubmit }) => (
                  <CForm onSubmit={handleSubmit}>
                    {error ? <CAlert color="danger">{error}</CAlert> : null}
                    <CFormGroup>
                      <CLabel>Type Name</CLabel>
                      <Field name="name" as={CInput} />
                      <ErrorMessage className="text-danger" component="div" name="name" />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Priority (0-100) (in percents)</CLabel>
                      <Field name="priorityPercentage" type="number" as={CInput} />
                      <ErrorMessage className="text-danger" component="div" name="priorityPercentage" />
                    </CFormGroup>
                    <CFormGroup>
                      <CButton color="primary" type="submit">
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

export default MemberTypesNew;
