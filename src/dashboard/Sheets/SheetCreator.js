import { CButton, CCard, CCardBody, CCardHeader, CForm, CFormGroup, CLabel, CSelect } from "@coreui/react";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import * as yup from "yup";
import axios from "../../services/axios";

function SheetCreator({ date, reloadSheet }) {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState();
  const [club, setClub] = useState();

  const [initialValues, setInitialValues] = useState({
    template: "",
    ballot: "true",
    ballotRunDate: date,
  });

  const validationSchema = yup.object({
    template: yup.string().required().label("Template"),
    ballot: yup.string().oneOf(["true", "false"]).label("Using ballot"),
    ballotRunDate: yup.date().label("Ballot run date"),
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
      if (club == null) {
        throw new Error("Club information was not loaded!");
      }
      if (template == null) {
        throw new Error("Template information was not loaded!");
      }

      const otherData = {
        ballot: values.ballot === "true" ? true : false,
        ballotRunDate: values.ballotRunDate,
        sheetType: template.type,
        ballotEntries: [],
      };
      const stamp = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
      await axios.post("/sheets/" + stamp, { ...values, slots: createSlots(template), ...otherData });
      reloadSheet();
    } catch (e) {
      alert(e.message);
      console.error(e);
    }
  }

  async function loadClub() {
    try {
      const response = await axios.get("/admin/club-settings");
      setClub(response.data);
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

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  useEffect(() => {
    loadClub();
    loadTemplates();
  }, []);

  useEffect(() => {
    if (club)
      setInitialValues({
        template: "",
        ballot: club.ballot ? "true" : "false",
        ballotRunDate: addDays(date, -club.ballotDays),
      });
  }, [club, date]);

  return (
    <CCard>
      <CCardHeader>
        Create Tee Sheet for {date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()}
      </CCardHeader>
      <CCardBody>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
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
              {club && club.ballot && club.ballot === true && addDays(date, -club.ballotDays) > new Date() ? (
                <>
                  <CFormGroup>
                    <CLabel>Use Ballot</CLabel>
                    <Field as={CSelect} name="ballot">
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Field>
                    <ErrorMessage name="ballot" component="div" className="text-danger" />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Ballot Run Date</CLabel>
                    <Field
                      as={ReactDatePicker}
                      className="form-control"
                      name="ballotRunDate"
                      selected={values.ballotRunDate}
                      onChange={(value) => {
                        setFieldValue("ballotRunDate", value);
                      }}
                    />
                    <ErrorMessage name="ballotRunDate" component="div" className="text-danger" />
                  </CFormGroup>
                </>
              ) : null}
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
