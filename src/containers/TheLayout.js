import React from "react";
import { Redirect } from "react-router-dom";
import useUser from "../hooks/useUser";
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader,
} from "./index";

const TheLayout = () => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default TheLayout;
