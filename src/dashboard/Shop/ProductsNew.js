import React, { useEffect, useState } from "react";
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
import { ErrorMessage, Field, Formik } from "formik";
import CreatableSelect from "react-select/creatable";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function NewProduct() {
  // Stateful Hooks
  const history = useHistory();

  const [productCategories, setProductCategories] = useState([]);

  const initialValues = {
    name: "",
    price: "",
    category: [],
    quantity: "",
    unit: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required().label("Name"),
    price: yup
      .number()
      .positive()
      .required()
      .label("Price")
      .typeError("Please enter a number"),
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
  async function handleCreate(values) {
    try {
      const {
        data: {
          product: { _id: id },
        },
      } = await axios.post("/products", values);
      history.push("/products/" + id + "/edit");
    } catch (e) {
      console.error(e.response.data);
    }
  }

  async function loadProductCategories() {
    const response = await axios.get("/admin/product-types");
    setProductCategories(response.data);
  }

  useEffect(() => {
    loadProductCategories();
  }, []);

  return (
    <DashboardLayout>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Add New Product to Pro Shop</CCardHeader>
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
                      <ErrorMessage
                        component="div"
                        className="text-danger"
                        name="name"
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Price</CLabel>
                      <Field name="price" as={CInput} />
                      <ErrorMessage
                        component="div"
                        className="text-danger"
                        name="price"
                      />
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
                      <ErrorMessage
                        component="div"
                        className="text-danger"
                        name="category"
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Stock</CLabel>
                      <Field name="quantity" as={CInput} />
                      <ErrorMessage
                        component="div"
                        className="text-danger"
                        name="quantity"
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Units (Plural)</CLabel>
                      <Field name="unit" as={CInput} />
                      <ErrorMessage
                        component="div"
                        className="text-danger"
                        name="unit"
                      />
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

export default NewProduct;
