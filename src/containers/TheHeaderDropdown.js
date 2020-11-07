import React, { useContext } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import useUser from "../hooks/useUser";
import axios from "../services/axios";
const TheHeaderDropdown = () => {
  const { user } = useUser();
  async function handleLogout() {}
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle
        className="c-header-nav-link"
        caret={false}
      >
        {user.name}
      </CDropdownToggle>
      <CDropdownMenu
        className="pt-0"
        placement="bottom-end"
      >
        <CDropdownItem>
          <CIcon name="cil-cog" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
