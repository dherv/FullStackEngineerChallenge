import { Menu } from 'antd';
import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IRoute } from '../types/app.types';

const TemplateSidebar: FC<{ routes: IRoute[] }> = ({ children, routes }) => {
  const location = useLocation();
  return (
    <Menu theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
      {routes.map((route) => (
        <Menu.Item key={route.path}>
          <NavLink to={route.path}>{route.title}</NavLink>
        </Menu.Item>
      ))}
      {children}
    </Menu>
  );
};

export default TemplateSidebar;
