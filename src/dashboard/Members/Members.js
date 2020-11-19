import { CButton, CCard, CCardBody, CDataTable } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Custom Imports
import axios from "../../services/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import useUser from "../../hooks/useUser";
import dateFormat from "../../services/dateFormat";

function MembershipInfo({ membership }) {
  const [expires, setExpires] = useState();

  useEffect(() => {
    if (membership) {
      function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

      let expiryDate = addDays(membership.since, membership.validity);
      let toDate = new Date();
      const diff = Math.floor((expiryDate.getTime() - toDate.getTime()) / (1000 * 60 * 60 * 24));
      setExpires(diff);
    }
  }, [membership]);

  return (
    <>
      {membership ? (
        <>
          <div>{membership.type.name}</div>
          <div>Since {dateFormat(membership.since)}</div>
          <div>{expires > 0 ? `Expires in ${expires} days` : "Not a member"}</div>
        </>
      ) : null}
    </>
  );
}

function Members() {
  // Stateful Hooks
  const [members, setMembers] = useState([]);
  const history = useHistory();
  const { user } = useUser();

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
            fields={["name", "sex", "email", "phoneNumber", "membershipInfo", "profilePhoto", "controls"]}
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
                    <img width="60" src={item.profilePhoto} alt="File Not Found" />
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
                        history.push("/members/" + item._id + "/book");
                      }}
                    >
                      Book
                    </CButton>
                    <CButton
                      color="warning"
                      className="mr-1"
                      onClick={(e) => {
                        history.push("/members/" + item._id + "/edit");
                      }}
                    >
                      Edit
                    </CButton>
                    {item.membership.length > 1 ? null : (
                      <CButton
                        color="danger"
                        onClick={async (e) => {
                          await deleteMember(item._id);
                          await loadMembers();
                        }}
                      >
                        Delete
                      </CButton>
                    )}
                  </td>
                );
              },
              membershipInfo: (item) => {
                let membership = null;
                item.membership.forEach((ms) => {
                  if (ms.club === user.club) {
                    membership = ms;
                  }
                });
                return (
                  <td>
                    <MembershipInfo membership={membership} />
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
