import { Menu } from 'antd';
import React, { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import TemplateSidebar from '../templates/TemplateSidebar';

const EmployeeSidebar: FC = () => {
  const params = useParams() as any;
  const routes = [
    {
      path: `/employee/${params.id}/reviews`,
      title: 'reviews',
    },
  ];
  return (
    <TemplateSidebar routes={routes}>
      <Menu.Item style={{ position: 'absolute', bottom: 0 }}>
        <NavLink to={'/admin/employees'}>Log as admin</NavLink>
      </Menu.Item>
    </TemplateSidebar>
  );
};

export default EmployeeSidebar;
