import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormGroup, CInput, CLabel, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";

// Custom Imports
import axios from "../../services/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import productCategories from "../../stores/productCategories";

function NewProduct() {
  // Stateful Hooks
  const history = useHistory();

  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    name: "",
    price: "",
    category: [],
    quantity: "",
    unit: "",
  });

  const validationSchema = yup.object({
    name: yup.string().required().label("Name"),
    price: yup.number().positive().required().label("Price"),
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

  // Effects and Events
  async function handleSave(values) {
    try {
      const response = await axios.patch("/products/" + id, values);
      history.push("/products");
    } catch (e) {
      console.error(e.response.data);
    }
  }

  async function loadProduct() {
    try {
      const { data: product } = await axios.get("/products/" + id);

      setInitialValues({
        name: product.name,
        price: product.price,
        category: product.category,
        quantity: product.quantity,
        unit: product.unit,
      });
    } catch (e) {
      console.error(e.response.data);
    }
  }

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <DashboardLayout>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Edit Product</CCardHeader>
            <CCardBody>
              <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSave}
              >
                {({ values, handleSubmit, setFieldValue }) => (
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
                        value={values.category}
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
                      <CButton color="primary" type="submit">
                        Save
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
