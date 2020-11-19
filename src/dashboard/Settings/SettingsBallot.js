import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSwitch,
} from "@coreui/react";
import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import RSelect from "react-select";
import * as yup from "yup";
import axios from "../../services/axios";

function SettingsBallot({ club }) {
  // Stateful Hooks
  const initialValues = {
    ballot: club.ballot,
    days: [],
    automaticDays: club.ballotDays,
  };

  const validationSchema = yup.object({
    ballot: yup.bool().required(),
    days: yup.array().of(yup.string()).label("Days"),
    automaticDays: yup.number().integer().label("Automatic Ballot"),
  });

  // Effects and Events

  async function handleUpdate(values) {
    try {
      await axios.patch("/admin/club-settings", {
        ballot: values.ballot,
        ballotDays: values.automaticDays,
      });
    } catch (e) {
      console.error(e.response.data.error.message);
    }
  }

  function createOption(value) {
    return { label: value, value };
  }

  function createOptionList(...values) {
    return [...values.map(createOption)];
  }

  function createOptionListFromArray(arr) {
    return [...arr.map(createOption)];
  }

  return (
    <CCard>
      <CCardHeader>Ballot Settings</CCardHeader>
      <CCardBody>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleUpdate}>
          {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
            <CForm onSubmit={handleSubmit}>
              <CFormGroup className="d-flex">
                <CLabel className="mr-5">Use Ballot</CLabel>
                <CSwitch
                  color="primary"
                  checked={values.ballot}
                  onChange={(e) => {
                    const value = e.target.checked;
                    setFieldValue("ballot", value);
                  }}
                />
                <ErrorMessage name="ballot" component="div" className="text-danger" />
              </CFormGroup>
              {values.ballot ? (
                <div>
                  <CFormGroup style={{ display: "none" }}>
                    <CLabel>Ballot Days</CLabel>
                    <RSelect
                      isMulti={true}
                      options={createOptionList(
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                      )}
                      value={createOptionListFromArray(values.days)}
                      onChange={(options) => {
                        setFieldValue(
                          "days",
                          options.map((option) => option.value)
                        );
                      }}
                    />
                    <ErrorMessage name="days" component="div" className="text-danger" />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Automatic Ballot after how many days</CLabel>
                    <Field as={CInput} name="automaticDays" type="number" />
                    <ErrorMessage name="automaticDays" component="div" className="text-danger" />
                  </CFormGroup>
                </div>
              ) : null}
              <CFormGroup>
                <CButton color={isSubmitting ? "secondary" : "primary"} type="submit">
                  {isSubmitting ? "Saving" : "Save"}
                </CButton>
              </CFormGroup>
            </CForm>
          )}
        </Formik>
      </CCardBody>
    </CCard>
  );
}

export default SettingsBallot;
