import React, { useEffect, useState } from "react";
import RSelect from "react-select";
import * as yup from "yup";
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CForm, CFormGroup, CInput, CLabel } from "@coreui/react";
import { ErrorMessage, Field, Formik } from "formik";
import { useHistory } from "react-router-dom";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function MemberImport() {
  const [memberTypes, setMemberTypes] = useState([]);
  const [error, setError] = useState();
  const history = useHistory();

  const initialValues = {
    email: "",
    type: "",
    since: new Date().toISOString().substr(0, 10),
  };

  const validationSchema = yup.object({
    email: yup.string().email().required().label("Email"),
    type: yup.string().required(),
    since: yup.date().required().typeError("Please enter a date."),
  });

  // Effects and Events

  async function handleImport(values) {
    try {
      setError();
      console.log(values);
      const response = await axios.patch("/admin/import-member", {
        email: values.email,
        membership: {
          since: values.since,
          validity: 30,
          expired: false,
          banned: false,
          type: values.type.value,
        },
      });
      history.push("/members");
    } catch (e) {
      console.error(e);
      if (e.response.data) {
        setError(e.response.data.error.message);
      }
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
      <CCard>
        <CCardHeader>Import Member</CCardHeader>
        <CCardBody>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleImport}>
            {({ values, handleSubmit, setFieldValue }) => (
              <CForm onSubmit={handleSubmit}>
                {error ? <CAlert color="danger">{error}</CAlert> : null}
                <CFormGroup>
                  <CLabel>Email</CLabel>
                  <Field as={CInput} name="email" type="email" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Member Type</CLabel>
                  <Field
                    name="type"
                    as={RSelect}
                    options={memberTypes}
                    selected={values.type}
                    onChange={(type) => {
                      setFieldValue("type", type);
                    }}
                  />
                  <ErrorMessage component="div" className="text-danger" name="type" />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Member Since</CLabel>
                  <Field name="since" type="date" as={CInput} />
                  <ErrorMessage component="div" className="text-danger" name="since" />
                </CFormGroup>
                <CFormGroup>
                  <CButton color="primary" type="submit">
                    Import
                  </CButton>
                </CFormGroup>
              </CForm>
            )}
          </Formik>
        </CCardBody>
      </CCard>
    </DashboardLayout>
  );
}

export default MemberImport;
