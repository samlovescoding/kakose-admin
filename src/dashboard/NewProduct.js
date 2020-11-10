import {
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
import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import CreatableSelect from "react-select/creatable";
import { ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import axios from "../services/axios";
import { useHistory } from "react-router-dom";

const productCategories = [
  { label: "Food", value: "Food" },
];

function NewProduct() {
  const history = useHistory();

  const initialValues = {
    name: "",
    price: 1,
    category: [],
    quantity: 1,
    unit: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required().label("Name"),
    price: yup
      .number()
      .positive()
      .required()
      .label("Price"),
    category: yup
      .array()
      .of(
        yup.object({
          label: yup.string(),
          value: yup.string(),
        })
      )
      .min(1)
      .required()
      .label("Category"),
    quantity: yup.number().required().label("Quantity"),
    unit: yup.string().required(),
  });

  async function handleCreate(values) {
    try {
      const response = await axios.post(
        "/products",
        values
      );
      history.push("/products");
      console.log(response.data);
    } catch (e) {
      console.error(e.response.data);
    }
  }

  return (
    <DashboardLayout>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Add New Product to Pro Shop
            </CCardHeader>
            <CCardBody>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleCreate}
              >
                {({ handleSubmit, setFieldValue }) => (
                  <CForm onSubmit={handleSubmit}>
                    <CFormGroup>
                      <CLabel>Name</CLabel>
                      <Field name="name" as={CInput} />
                      <ErrorMessage name="name" />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Price</CLabel>
                      <Field name="price" as={CInput} />
                      <ErrorMessage name="price" />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Category</CLabel>
                      <CreatableSelect
                        isMulti
                        onChange={(value) => {
                          setFieldValue("category", value);
                        }}
                        options={productCategories}
                      />
                      <ErrorMessage name="category" />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Stock</CLabel>
                      <Field name="quantity" as={CInput} />
                      <ErrorMessage name="quantity" />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Units (Plural)</CLabel>
                      <Field name="unit" as={CInput} />
                      <ErrorMessage name="unit" />
                    </CFormGroup>
                    <CFormGroup>
                      <CButton
                        color="primary"
                        type="submit"
                      >
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

export default NewProduct;
