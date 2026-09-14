import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PublicOnlyRoute() {
  const user = localStorage.getItem('user');

  if (user) {
    return <Navigate to="/personal-home" replace />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;