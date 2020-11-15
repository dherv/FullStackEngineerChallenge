import { Menu } from 'antd';
import React, { FC } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';

const EmployeeSidebar: FC = () => {
  const location = useLocation();
  const params = useParams() as any;
  const routes = [
    {
      path: `/employee/${params.id}/reviews`,
      title: "reviews",
    },
  ];
  return (
    <Menu theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
      {routes.map((route) => (
        <Menu.Item key={route.path}>
          <NavLink to={route.path}>{route.title}</NavLink>
        </Menu.Item>
      ))}
      <Menu.Item style={{ position: "absolute", bottom: 0 }}>
        <NavLink to={"/admin/employees"}>Log as admin</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default EmployeeSidebar;
