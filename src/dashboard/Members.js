import {
  CButton,
  CCard,
  CCardBody,
  CDataTable,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import config from "../config";
import { useHistory } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
function Members() {
  // Stateful Hooks
  const [members, setMembers] = useState([]);
  const history = useHistory();

  // Effects and Events
  async function loadMembers() {
    try {
      const response = await axios.get("/admin/members");
      setMembers(response.data);
    } catch (e) {
      console.error(e.response.data);
    }
  }

  async function deleteMember(id) {
    try {
      const response = await axios.delete("/members/" + id);
    } catch (e) {
      console.log(e.response.data);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <DashboardLayout>
      <CCard>
        <CCardBody>
          <CDataTable
            items={members}
            fields={[
              "name",
              "email",
              "sex",
              "address",
              "postalCode",
              "phoneNumber",
              "memberType",
              "profilePhoto",
              "controls",
            ]}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            sorter
            pagination
            scopedSlots={{
              profilePhoto: (item, index) => {
                if (item.profilePhoto == null) {
                  return <td></td>;
                }
                return (
                  <td>
                    <img
                      width="60"
                      src={item.profilePhoto}
                      alt="File Not Found"
                    />
                  </td>
                );
              },
              controls: (item, index) => {
                return (
                  <td>
                    <CButton
                      color="primary"
                      className="mr-1"
                      onClick={(e) => {
                        history.push(
                          "/members/" + item._id + "/edit"
                        );
                      }}
                    >
                      Edit
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={async (e) => {
                        await deleteMember(item._id);
                        await loadMembers();
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

export default Members;
