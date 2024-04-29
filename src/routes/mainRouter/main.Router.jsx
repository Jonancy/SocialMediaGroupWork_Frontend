import React, { Fragment, Suspense, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { allRoutes } from "../allRoutes/all.Routes";
import ClientLayout from "../../layouts/clientlayout";
import AdminLayout from "../../layouts/adminlayout";

const MainLayoutWrapper = ({ routes, children }) => {
  const ClientWrapper = routes.hasClientLayout ? ClientLayout : Fragment;
  const AdminWrapper = routes.hasAdminLayout ? AdminLayout : Fragment;

  return (
    <AdminWrapper>
      <ClientWrapper>{children}</ClientWrapper>
    </AdminWrapper>
  );
};

//TODO: When the hotel is unverified then the i will make a wrapper to check the hotel if the hotel is verified or not
export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>loading...</p>}>
        <Routes>
          {allRoutes.map((values) => (
            <Route
              path={values.path}
              key={values.id}
              element={
                <MainLayoutWrapper routes={values}>
                  <values.element />
                </MainLayoutWrapper>
              }
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
