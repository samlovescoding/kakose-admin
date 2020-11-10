import {
  CButton,
  CCard,
  CCardBody,
  CDataTable,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "../services/axios";

function Products() {
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    try {
      const response = await axios.get("/admin/products");
      setProducts(response.data);
    } catch (e) {
      console.error(e.response.data);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <DashboardLayout>
      <CCard>
        <CCardBody>
          <CDataTable
            items={products}
            fields={[
              "name",
              "price",
              "category",
              "quantity",
              "unit",
              "category",
              "control",
            ]}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            sorter
            pagination
            scopedSlots={{
              control: (item) => (
                <td>
                  <CButton color="warning" className="mr-1">
                    Edit
                  </CButton>
                  <CButton color="danger">Delete</CButton>
                </td>
              ),
              category: (item) => {
                return (
                  <td>
                    {item.category.reduce(
                      (accumulator, current) => {
                        return (
                          accumulator + " " + current.label
                        );
                      },
                      ""
                    )}
                  </td>
                );
              },
            }}
          />
        </CCardBody>
      </CCard>
    </DashboardLayout>
  );
}

export default Products;
