import React, { useContext } from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import useUser from "../hooks/useUser";
import { useHistory } from "react-router-dom";

const TheHeaderDropdown = () => {
  const { user, removeUser } = useUser();
  const history = useHistory();

  async function handleLogout() {
    removeUser();
    history.push("/");
  }
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
