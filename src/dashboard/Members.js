import {
  CButton,
  CCard,
  CCardBody,
  CDataTable,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import config from "../config";
function Members() {
  // Stateful Hooks
  const [members, setMembers] = useState([]);

  // Effects and Events
  async function loadMembers() {
    try {
      const response = await axios.get("/members");
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
                    src={
                      config.BACKEND_URL +
                      "/uploads/" +
                      item.profilePhoto.filename
                    }
                    alt="File Not Found"
                  />
                </td>
              );
            },
            controls: (item, index) => {
              return (
                <td>
                  <CButton
                    onClick={async (e) => {
                      await deleteMember(item._id);
                      await loadMembers();
                    }}
                    color="danger"
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

export default Members;
