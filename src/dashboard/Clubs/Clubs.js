import React, { useEffect, useState } from "react";
import { CButton, CCard, CCardBody, CDataTable } from "@coreui/react";
import { useHistory } from "react-router-dom";

// Custom Imports
import axios from "../../services/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Clubs() {
  // Stateful Hooks
  const [clubs, setClubs] = useState([]);
  const history = useHistory();

  // Effects and Events
  async function loadClubs() {
    try {
      const response = await axios.get("/clubs");
      setClubs(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteClub(id) {
    try {
      const response = await axios.delete("/clubs", {
        _id: id,
      });
      loadClubs();
      console.log("Club Deleted");
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadClubs();
  }, []);

  return (
    <DashboardLayout>
      <CCard>
        <CCardBody>
          <CDataTable
            items={clubs}
            fields={["name", "slug", "createdAt", "control"]}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            sorter
            pagination
            scopedSlots={{
              control: (item, index) => {
                return (
                  <td>
                    <CButton
                      color="warning"
                      onClick={(e) => {
                        history.push("/clubs/" + item._id + "/user-create");
                      }}
                      className="mr-1"
                    >
                      Add User
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={(e) => {
                        deleteClub(item._id);
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
    </DashboardLayout>
  );
}

export default Clubs;
