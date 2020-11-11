import { CBadge, CButton, CCard, CCardBody, CDataTable } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function Products() {
  // Stateful Hooks
  const [products, setProducts] = useState([]);
  const history = useHistory();

  // Effects and Events
  async function loadProducts() {
    try {
      const response = await axios.get("/admin/products");
      setProducts(response.data);
    } catch (e) {
      console.error(e.response.data);
    }
  }
  async function deleteProduct(id) {
    try {
      const response = await axios.patch("/admin/product-delete", { id });
      loadProducts();
    } catch (e) {
      console.error(e.response.data);
    }
  }

  function editProduct(id) {
    history.push("/products/" + id + "/edit");
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
            fields={["name", "price", "category", "quantity", "unit", "control"]}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            sorter
            pagination
            scopedSlots={{
              control: (item) => (
                <td>
                  <CButton
                    color="warning"
                    className="mr-1"
                    onClick={(e) => {
                      editProduct(item._id);
                    }}
                  >
                    Edit
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={(e) => {
                      deleteProduct(item._id);
                    }}
                  >
                    Delete
                  </CButton>
                </td>
              ),
              category: (item) => {
                return (
                  <td>
                    {item.category.map((tax, key) => (
                      <CBadge color="primary" shape="pill" className="mr-1" key={key}>
                        {tax.label}
                      </CBadge>
                    ))}
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
