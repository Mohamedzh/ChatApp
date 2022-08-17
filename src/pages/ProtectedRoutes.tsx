import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';

const useAuth = () => {
  const userStatus = useSelector((state: RootState) => state.user);

  const user = { loggedIn: userStatus };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth.loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
