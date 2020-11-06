import React from "react";

import { useHistory } from "react-router-dom";
import useUser from "../hooks/useUser";

function DashboardLayout({ children }) {
  const history = useHistory();
  const { user } = useUser();

  if (user === null) {
    // console.log(
    //   "Redirecting to Login because user is empty",
    //   user,
    //   localStorage
    // );
    history.push("/login");
  }

  // console.log(user);

  return <>{children}</>;
}

export default DashboardLayout;
