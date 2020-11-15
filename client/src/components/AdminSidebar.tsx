import React, { FC } from 'react';
import TemplateSidebar from '../templates/TemplateSidebar';

const AdminSidebar: FC = () => {
  const routes = [
    {
      path: '/admin/employees',
      title: 'employees',
    },
    { path: '/admin/reviews', title: 'reviews' },
  ];
  return <TemplateSidebar routes={routes} />;
};

export default AdminSidebar;
