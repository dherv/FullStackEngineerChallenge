import { Form, Input, Modal, Table } from 'antd';
import React, { FC, useEffect, useReducer, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Api from '../Api';
import AddElement from '../components/AddElement';
import FormButtonSubmit from '../components/FormButtonSubmit';
import TableButtonActions from '../components/TableButtonActions';
import { reducer } from '../reducers/app.reducer';
import { IEmployee } from '../types/app.types';

const PageAdminEmployees: FC = () => {
  const [employees, dispatchEmployees] = useReducer(reducer, []) as any;
  const [employeeEdit, setEmployeeEdit] = useState<number | null>(null);
  const [form, setForm] = useState<any>({
    name: '',
    department: '',
    position: '',
  });
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmployees = () => {
      return Api.get('/employees').then((response: IEmployee[]) =>
        dispatchEmployees({ type: 'init', payload: response })
      );
    };
    fetchEmployees();
  }, []);

  const handleOk = () => {
    const postEmployee = form;
    if (employeeEdit) {
      return Api.put(`/employees/${employeeEdit}`, postEmployee).then(
        (response: IEmployee) => {
          dispatchEmployees({ type: 'update', payload: response });
          reset();
        }
      );
    } else {
      return Api.post('/employees', postEmployee).then(
        (response: IEmployee) => {
          dispatchEmployees({ type: 'add', payload: response });
          reset();
        }
      );
    }
  };

  const handleCancel = () => {
    reset();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickAdd = () => {
    setVisible(true);
  };

  const handleEdit = (record: IEmployee) => {
    setForm({
      name: record.name,
      department: record.department,
      position: record.position,
    });
    setEmployeeEdit(record.id);
    setVisible(true);
  };

  const handleDelete = (record: IEmployee) => {
    Api.delete(`/employees/${record.id}`).then(() => {
      dispatchEmployees({ type: 'delete', payload: record });
    });
  };

  const reset = () => {
    setVisible(false);
    setEmployeeEdit(null);
    setForm({ name: '', department: '', position: '' });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: IEmployee) => (
        <NavLink to={`/employee/${record.id}/reviews`}>{text}</NavLink>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: IEmployee) => (
        <TableButtonActions
          record={record}
          onClickEdit={handleEdit}
          onClickDelete={handleDelete}
        ></TableButtonActions>
      ),
    },
  ];

  return (
    <section>
      <AddElement text="Add an employee" onClick={handleClickAdd} />
      <Table columns={columns} dataSource={employees} />
      <Modal
        title="Add an employee"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={{ remember: false }}
          onFinish={handleOk}
        >
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: 'Please input a name' }]}
          >
            <Input
              name="name"
              onChange={handleChange}
              value={form.name}
              defaultValue={form.name}
            />
          </Form.Item>

          <Form.Item
            label="department"
            name="department"
            rules={[
              {
                required: true,
                message: 'Please input a department',
              },
            ]}
          >
            <Input
              name="department"
              onChange={handleChange}
              value={form.department}
              defaultValue={form.department}
            />
          </Form.Item>

          <Form.Item
            label="position"
            name="position"
            rules={[
              {
                required: true,
                message: 'Please input a position',
              },
            ]}
          >
            <Input
              name="position"
              onChange={handleChange}
              value={form.position}
              defaultValue={form.position}
            />
          </Form.Item>

          <Form.Item>
            <FormButtonSubmit />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default PageAdminEmployees;
