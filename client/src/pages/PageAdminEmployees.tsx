import { Form, Input, Modal, Table } from "antd";
import React, { FC, useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import Api from "../Api";
import AddElement from "../components/AddElement";
import FormButtonSubmit from "../components/FormButtonSubmit";
import TableActionButtons from "../components/TableActionButtons";
import { IEmployee } from "../types/app.types";
import TableButtonActions from '../components/TableButtonActions';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "init":
      return action.payload;
    case "add":
      return [...state, action.payload];
    case "update":
      return state.map((item: any) => {
        if (item.id !== action.payload.id) {
          return item;
        }
        return {
          ...action.payload,
        };
      });
    case "delete":
      return state.filter((item: any) => item.id !== action.payload.id);
    default:
      throw new Error();
  }
};

const PageAdminEmployees: FC = () => {
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
      dispatchData({ type: "delete", payload: record });
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: IEmployee) => (
        <NavLink to={`/employee/${record.id}/reviews`}>{text}</NavLink>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: IEmployee) => (
        <TableButtonActions
          record={record}
          onClickEdit={handleEdit}
          onClickDelete={handleDelete}
        ></TableButtonActions>
      ),
    },
  ];

  const [data, dispatchData] = useReducer(reducer, []) as any;
  const [employeeEdit, setEmployeeEdit] = useState<number | null>(null);
  const [form, setForm] = useState<any>({
    name: "",
    department: "",
    position: "",
  });
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const fetchEmployees = () => {
      return Api.get("/employees").then((response: IEmployee[]) =>
        dispatchData({ type: "init", payload: response })
      );
    };

    fetchEmployees();
  }, []);

  const handleOk = () => {
    const postEmployee = form;
    if (employeeEdit) {
      return Api.put(`/employees/${employeeEdit}`, postEmployee).then(
        (response: IEmployee) => {
          dispatchData({ type: "update", payload: response });
          reset();
        }
      );
    } else {
      return Api.post("/employees", postEmployee).then(
        (response: IEmployee) => {
          dispatchData({ type: "add", payload: response });
          reset();
        }
      );
    }
  };

  const handleCancel = () => {
    reset();
  };

  const reset = () => {
    setVisible(false);
    setEmployeeEdit(null);
    setForm({ name: "", department: "", position: "" });
  };

  const handleChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickAdd = () => {
    setVisible(true);
  };
  console.log(form);
  return (
    <section>
      <AddElement text="Add an employee" onClick={handleClickAdd} />
      <Table columns={columns} dataSource={data} />
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
          onFinish={() => handleOk()}
        >
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: "Please input a name" }]}
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
            rules={[{ required: true, message: "Please input a department" }]}
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
            rules={[{ required: true, message: "Please input a position" }]}
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
