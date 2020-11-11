import { CButton, CCard, CCardBody, CCol, CDataTable, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function BookingNew() {
  // Stateful Hooks
  const [memberTypes, setMemberTypes] = useState([]);

  // Effects and Events

  async function loadMemberTypes() {
    try {
      const response = await axios.get("/admin/memberTypes");
      setMemberTypes(response.data);
    } catch (e) {
      console.error(e.response.data);
    }
  }

  async function deleteMemberType(id) {
    try {
      await axios.delete("/admin/memberTypes/" + id);
      loadMemberTypes();
    } catch (e) {
      console.error(e.response.data);
    }
  }

  useEffect(() => {
    loadMemberTypes();
  }, []);

  return (
    <DashboardLayout>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CDataTable
                items={memberTypes}
                tableFilter
                fields={["name", "priorityPercentage", "controls"]}
                itemsPerPageSelect
                itemsPerPage={10}
                hover
                sorter
                pagination
                scopedSlots={{
                  controls: (item) => (
                    <td>
                      <CButton
                        color="danger"
                        onClick={(e) => {
                          deleteMemberType(item._id);
                        }}
                      >
                        Delete
                      </CButton>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </DashboardLayout>
  );
}

export default BookingNew;
