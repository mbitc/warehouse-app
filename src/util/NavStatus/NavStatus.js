import React from 'react';
import { Outlet } from 'react-router';
import { MainNavMenu } from '../../components/MainNavMenu/MainNavMenu';

const WithNav = () => {
    return (
        <>
            <MainNavMenu />
            <Outlet />
        </>
    );
};

const WithoutNav = () => {
    return (
      <>
        <Outlet />
      </>
    );
  };

export {WithNav, WithoutNav};