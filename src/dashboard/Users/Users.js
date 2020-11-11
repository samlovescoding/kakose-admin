import React, { useEffect, useState } from "react";
import { CButton, CCard, CCardBody, CCol, CDataTable, CRow } from "@coreui/react";

// Custom Imports
import useUser from "../../hooks/useUser";
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function ClubAdmins() {
  // Stateful Hooks
  const [admins, setAdmins] = useState([]);

  const { user } = useUser();

  // Effects and Events
  async function loadAdmins() {
    try {
      let response = await axios.get("/admin/users");
      setAdmins(response.data);
    } catch (e) {
      console.error(e.response.data);
    }
  }

  async function handleDelete(id) {
    try {
      let response = await axios.patch("/admin/users-delete", {
        id,
      });
      loadAdmins();
    } catch (e) {
      console.log(e.response.data);
    }
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  return (
    <DashboardLayout>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CDataTable
                items={admins}
                fields={["name", "email", "createdAt", "control"]}
                tableFilter
                itemsPerPageSelect
                itemsPerPage={10}
                hover
                sorter
                pagination
                scopedSlots={{
                  control: (item, index) => {
                    if (item.role !== "club_admin") {
                      if (item._id === user.id) {
                        return <td></td>;
                      }
                    }
                    return (
                      <td>
                        <CButton
                          color="danger"
                          onClick={(e) => {
                            handleDelete(item._id);
                          }}
                        >
                          Delete
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </DashboardLayout>
  );
}

export default ClubAdmins;
