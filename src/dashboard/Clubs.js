import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CDataTable,
  CPagination,
} from "@coreui/react";
import axios from "../services/axios";

function Clubs() {
  // Stateful Hooks
  const [clubs, setClubs] = useState([]);

  // Events and Effects
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
      console.log("Club Deleted");
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadClubs();
  }, []);

  return (
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
                    color="danger"
                    onClick={(e) => {
                      deleteClub(item._id);
                      loadClubs();
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
  );
}

export default Clubs;
