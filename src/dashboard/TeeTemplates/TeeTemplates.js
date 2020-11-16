import { CButton, CCard, CCardBody, CCardHeader, CDataTable } from "@coreui/react";
import React, { useEffect, useState } from "react";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "../../services/axios";

function TeeTemplates() {
  // Stateful Hooks
  const [templates, setTemplates] = useState([]);

  // Effects and Events
  async function loadTemplates() {
    try {
      const response = await axios.get("/templates");
      setTemplates(response.data);
    } catch (e) {
      console.error(e.response.data);
    }
  }

  async function deleteTemplate(id) {
    try {
      await axios.delete("/templates/" + id);
      loadTemplates();
    } catch (e) {
      console.error(e.response.data);
    }
  }

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <DashboardLayout>
      <CCard>
        <CCardBody>
          <CDataTable
            items={templates}
            fields={["name", "type", "players", "startTime", "endTime", "intervalTime" /*, "controls" */]}
            tableFilter
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
                      deleteTemplate(item._id);
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
    </DashboardLayout>
  );
}

export default TeeTemplates;
