import { Button, Form, Input, Modal, Space, Table } from "antd";
import React, { FC, useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import Api from "../Api";
import AddElement from "../components/AddElement";

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
  const handleEdit = ({
    id,
    name,
    department,
    position,
  }: {
    id: number;
    name: string;
    department: string;
    position: string;
  }) => {
    setForm({
      name,
      department,
      position,
    });
    setEmployeeEdit(id);
    setVisible(true);
  };
  const handleDelete = (record: any) => {
    Api.delete(`/employees/${record.id}`).then(() => {
      dispatchData({ type: "delete", payload: record });
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
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
      render: (text: string, record: any) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  const [data, dispatchData] = useReducer(reducer, [], () => []) as any;
  const [employeeEdit, setEmployeeEdit] = useState<number | null>(null);
  const [form, setForm] = useState<any>({
    name: "",
    department: "",
    position: "",
  });
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const fetchEmployees = () => {
      return Api.get("/employees").then((response) =>
        dispatchData({ type: "init", payload: response })
      );
    };

    fetchEmployees();
  }, []);

  const handleOk = () => {
    const postEmployee = form;
    if (employeeEdit) {
      return Api.put(`/employees/${employeeEdit}`, postEmployee).then(
        (response) => {
          dispatchData({ type: "update", payload: response });
          reset();
        }
      );
    } else {
      return Api.post("/employees", postEmployee).then((response) => {
        dispatchData({ type: "add", payload: response });
        reset();
      });
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
            <Button
              style={{ marginTop: "1rem" }}
              key="submit"
              htmlType="submit"
              type="primary"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default PageAdminEmployees;
