import { CButton, CCard, CCardBody, CCardHeader, CForm, CFormGroup, CInput, CLabel, CSelect } from "@coreui/react";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import RSelect from "react-select";
import axios from "../../services/axios";
import ReactDatePicker from "react-datepicker";

function Membership({ member, membership }) {
  const [initialValues, setInitialValues] = useState({
    expired: false,
    banned: false,
    since: new Date(),
    type: { value: membership.type._id, label: membership.type.name },
  });
  const [memberTypes, setMemberTypes] = useState([]);

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

  async function updateMembership(values) {
    try {
      await axios.patch("/admin/update-membership/" + member._id + "/" + membership._id, {
        ...values,
        type: values.type.value,
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadMemberTypes();
  }, []);

  return (
    <CCard>
      <CCardHeader>Membership Details</CCardHeader>
      <CCardBody>
        <Formik initialValues={initialValues} onSubmit={updateMembership}>
          {({ values, handleSubmit, setFieldValue, isSubmitting }) => (
            <CForm onSubmit={handleSubmit}>
              <CFormGroup>
                <CLabel>Member Since</CLabel>
                <Field
                  as={ReactDatePicker}
                  className="form-control"
                  selected={values.since}
                  onChange={(date) => setFieldValue("since", date)}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Hard Expire (You will need disable it to allow club membership in future)</CLabel>
                <Field
                  as={CSelect}
                  value={values.expired === true ? "yes" : "no"}
                  onChange={(e) => setFieldValue("expired", e.target.value === "yes" ? true : false)}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Field>
              </CFormGroup>
              <CFormGroup>
                <CLabel>Banned</CLabel>
                <Field
                  as={CSelect}
                  value={values.banned === true ? "yes" : "no"}
                  onChange={(e) => setFieldValue("banned", e.target.value === "yes" ? true : false)}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Field>
              </CFormGroup>
              <CFormGroup>
                <CLabel>Type</CLabel>
                <Field
                  as={RSelect}
                  options={memberTypes}
                  value={values.type}
                  onChange={(option) => setFieldValue("type", option)}
                />
              </CFormGroup>

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

export default Membership;
