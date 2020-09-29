import React from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CDataTable,
  CInput,
  CFormText,
  CInputGroup,
  CInputGroupAppend,
  CButton,
} from "@coreui/react";

const Members = () => {
  return (
    <>
      <CRow className="mb-3">
        <CCol xs="12" lg="6">
          <CInputGroup>
            <CInput
              id="text-input"
              name="text-input"
              placeholder="Your input query."
              lg="6"
            />
            <CInputGroupAppend>
              <CButton color="primary">Search Members</CButton>
            </CInputGroupAppend>
          </CInputGroup>
          <CFormText>
            Search by membership type, name or phone number.
          </CFormText>
        </CCol>
        <CCol xs="12" lg="6" className="d-flex flex-row justify-content-end">
          <CButton color="success" className="align-self-start">
            Add New
          </CButton>
        </CCol>
      </CRow>
      <CCard>
        <CRow>
          <CCol>
            <CCardHeader>All Members</CCardHeader>
            <CCardBody>
              <CDataTable
                items={[
                  {
                    id: 0,
                    name: "Harsimar Singh",
                    registered: "20 Apr, 2020",
                    membership: "Shareholder",
                    phoneNumber: "7009805942",
                  },
                  {
                    id: 1,
                    name: "Harsimar Singh",
                    registered: "20 Apr, 2020",
                    membership: "Shareholder",
                    phoneNumber: "7009805942",
                  },
                  {
                    id: 2,
                    name: "Harsimar Singh",
                    registered: "20 Apr, 2020",
                    membership: "Shareholder",
                    phoneNumber: "7009805942",
                  },
                ]}
                fields={["name", "registered", "membership", "phoneNumber"]}
                striped
                itemsPerPage={20}
                pagination
              />
            </CCardBody>
          </CCol>
        </CRow>
      </CCard>
    </>
  );
};

export default Members;
