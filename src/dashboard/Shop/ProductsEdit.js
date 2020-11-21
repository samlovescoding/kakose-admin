import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CImg,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";

// Custom Imports
import axios from "../../services/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import config from "../../config";

function ProductImage({ product, setProduct }) {
  const file = useRef();
  const [error, setError] = useState();

  async function handleUpload() {
    try {
      setError();
      if (file.current.files[0]) {
        let payload = new FormData();
        payload.append("photo", file.current.files[0]);
        const {
          data: { product: updatedProduct },
        } = await axios.put("/products/" + product._id, payload);
        setProduct(updatedProduct);
      } else {
        throw new Error("Please attach a file before submitting.");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data.error.message) {
          setError(e.response.data.error.message);
        } else {
          setError(e.response.data.error);
        }
      } else {
        setError(e.message);
      }
    }
  }

  return (
    <CCard>
      <CCardHeader>Product Image</CCardHeader>
      <CCardBody>
        {error ? <CAlert color="danger">{error}</CAlert> : null}

        {product && product.photo ? (
          <CImg
            className="mb-3"
            style={{ width: "100%" }}
            src={
              config.BACKEND_URL +
              "/" +
              product.photo.destination +
              product.photo.filename
            }
          />
        ) : (
          <CAlert color="warning">Please upload a photo.</CAlert>
        )}
        <CFormGroup>
          <input className="form-control" ref={file} type="file" />
        </CFormGroup>
        <CFormGroup>
          <CButton color="primary" onClick={handleUpload}>
            Upload
          </CButton>
        </CFormGroup>
      </CCardBody>
    </CCard>
  );
}

function ProductEdit() {
  // Stateful Hooks
  const [product, setProduct] = useState();
  const [productCategories, setProductCategories] = useState([]);

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
  async function handleSave(values) {
    try {
      const { data } = await axios.patch("/products/" + id, values);
      console.log(data);
      //history.push("/products");
    } catch (e) {
      console.error(e.response.data);
    }
  }

  async function loadProduct() {
    try {
      const { data } = await axios.get("/products/" + id);

      setInitialValues({
        name: data.name,
        price: data.price,
        category: data.category,
        quantity: data.quantity,
        unit: data.unit,
      });
      setProduct(data);
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
    loadProduct();
  }, []);

  return (
    <DashboardLayout>
      <CRow>
        <CCol md={9}>
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
                        value={values.category}
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
                        Save
                      </CButton>
                    </CFormGroup>
                  </CForm>
                )}
              </Formik>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <ProductImage product={product} setProduct={setProduct} />
        </CCol>
      </CRow>
    </DashboardLayout>
  );
}

export default ProductEdit;
