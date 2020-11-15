import { Menu } from "antd";
import React, { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

const EmployeeSidebar: FC = () => {
  const location = useLocation();
  const routes = [
    {
      path: "/employee/1/reviews",
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
    </Menu>
  );
};

export default EmployeeSidebar;
