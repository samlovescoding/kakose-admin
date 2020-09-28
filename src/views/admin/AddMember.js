import React from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CFormGroup,
  CInputGroup,
  CInput,
  CInputGroupAppend,
  CInputGroupText,
  CButton,
  CSelect,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";

const Members = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <CCard>
        <CRow>
          <CCol>
            <CCardHeader>Add New Member</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow>
                  <CCol lg="6" xs="12">
                    <CFormGroup>
                      <CInputGroup>
                        <CInput
                          id="name"
                          name="name"
                          placeholder="Member Full Name"
                          autoComplete="name"
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CInputGroup>
                        <CInput
                          id="username"
                          name="username"
                          placeholder="Username"
                          autoComplete="username"
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CInputGroup>
                        <CInput
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                          autoComplete="email"
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>
                            <CIcon name="cil-envelope-closed" />
                          </CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CInputGroup>
                        <CInput
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          autoComplete="phone"
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CInputGroup>
                        <CInput
                          id="address"
                          name="address"
                          placeholder="Address"
                          autoComplete="address"
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup className="form-actions">
                      <CButton type="submit" size="sm" color="secondary">
                        Submit
                      </CButton>
                    </CFormGroup>
                  </CCol>
                  <CCol lg="6" xs="12">
                    <CFormGroup>
                      <CInputGroup>
                        <CSelect custom name="select" id="select">
                          <option value="0">Select</option>
                          <option value="1">Option #1</option>
                          <option value="2">Option #2</option>
                          <option value="3">Option #3</option>
                        </CSelect>
                        <CInputGroupAppend>
                          <CInputGroupText>Membership Type</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CInputGroup>
                        <CInput
                          type="date"
                          id="memberSince"
                          name="memberSince"
                          placeholder="Member Since"
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>Member Since</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CInputGroup>
                        <CInput
                          type="date"
                          id="membershipExpiry"
                          name="membershipExpiry"
                          placeholder="Membership Expiry"
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>Membership Expiry</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CInputGroup>
                        <CInput
                          type="password"
                          id="password2"
                          name="password2"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>
                            <CIcon name="cil-asterisk" />
                          </CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCol>
        </CRow>
      </CCard>
    </>
  );
};

export default Members;
