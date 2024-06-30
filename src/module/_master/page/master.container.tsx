import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function MasterContainer() {
  const token = localStorage.getItem("token");

  const renderToLogin = () => <Navigate to={"/login"} />;

  const renderMasterContainer = () => (
      <>
      test
        <Outlet />
      </>

  );

  return token === null ? renderToLogin() : renderMasterContainer();
}
