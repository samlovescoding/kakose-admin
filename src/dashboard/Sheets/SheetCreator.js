import { CButton, CCard, CCardBody, CCardHeader, CForm, CFormGroup, CLabel, CSelect } from "@coreui/react";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "../../services/axios";

function SheetCreator({ date, reloadSheet }) {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState();

  const initialValues = {
    template: "",
  };

  const validationSchema = yup.object({
    template: yup.string().required().label("Template"),
  });

  // Effects and Events

  function createSlots(template) {
    let { startTime, endTime, intervalTime, players } = template;
    let [startHours, startMinutes] = startTime.split(":");
    let [endHours, endMinutes] = endTime.split(":");
    let totalStartMinutes = parseInt(startHours) * 60 + parseInt(startMinutes);
    let totalEndMinutes = parseInt(endHours) * 60 + parseInt(endMinutes);
    let _slots = [];
    let currentMinutes = totalStartMinutes;
    while (currentMinutes < totalEndMinutes) {
      let currentHours = Math.floor(currentMinutes / 60);
      if (currentHours < 10) {
        currentHours = "0" + currentHours;
      }
      let currentMin = Math.floor(currentMinutes % 60);
      if (currentMin < 10) {
        currentMin = "0" + currentMin;
      }
      const time = currentHours + ":" + currentMin;
      _slots.push({
        time,
        code: currentMinutes,
        max: players,
        bookings: [],
        requests: [],
        available: players,
        locked: false,
        hidden: false,
      });
      currentMinutes += intervalTime;
    }
    return _slots;
  }

  async function handleCreate(values) {
    try {
      const stamp = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
      const response = await axios.post("/sheets/" + stamp, { ...values, slots: createSlots(template) });
      reloadSheet();
    } catch (e) {
      console.error(e);
    }
  }

  async function loadTemplates() {
    try {
      const response = await axios.get("/templates");
      setTemplates(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function loadTemplate(id) {
    try {
      const response = await axios.get("/templates/" + id);
      setTemplate(response.data);
    } catch (e) {
      alert("Cannot load template information.");
      console.error(e);
    }
  }

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <CCard>
      <CCardHeader>
        Create Tee Sheet for {date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()}
      </CCardHeader>
      <CCardBody>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleCreate}>
          {({ values, handleSubmit, setFieldValue }) => (
            <CForm onSubmit={handleSubmit}>
              <CFormGroup>
                <CLabel>Sheet Template</CLabel>
                <Field
                  name="template"
                  as={CSelect}
                  onChange={(e) => {
                    setFieldValue("template", e.target.value);
                    loadTemplate(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Please select a template
                  </option>
                  {templates.map((template, key) => (
                    <option value={template._id} key={key}>
                      {template.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="template" component="div" className="text-danger" />
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
  );
}

export default SheetCreator;
