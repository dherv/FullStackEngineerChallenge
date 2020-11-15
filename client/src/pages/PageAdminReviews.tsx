import { Button, Form, Input, Modal, Select, Space, Table } from 'antd';
import React, { FC, useEffect, useReducer, useState } from 'react';
import Api from '../Api';
import AddElement from '../components/AddElement';

const { Option } = Select;


 const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "init":
      return action.payload;
    case "add":
      console.log(action.payload)
      return [...state.slice(), action.payload];
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

const PageAdminReviews: FC = () => {
  const handleEdit = (record: any) => {
  
    setSelectedEmployee(record.employeedId)
    setSelectedReviewer(record.reviewerId)
    setVisible(true)
  
  };
  const handleDelete = (record: any) => {
    Api.delete(`/reviews/${record.id}`).then(() => {
      dispatchData({ type: "delete", payload: record });
    });
  };

  const columns = [
    {
      title: "Employee",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => {
        return record.employee.name;
      },
    },
    {
      title: "Reviewer",
      dataIndex: "reviewer",
      key: "reviewer",
      render: (text: string, record: any) => {
        return record.reviewer.name;
      },
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      render: (text: string, record: any) => {
        return record.text;
      },
    },
    {
      title: "Pending",
      dataIndex: "pending",
      key: "pending",
      render: (text: string, record: any) => {
        return record.pending.toString();
      },
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

  const [data, dispatchData] = useReducer(reducer, []) as any;
  const [employees, setEmployees] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<number|null>(null);
  const [selectedReviewer, setSelectedReviewer] = useState<number|null>(null);

  useEffect(() => {
    const fetchReviews = () => {
      return Api.get("/reviews").then((response) => dispatchData({type: "init", payload: response}));
    };
    const fetchEmployees = () => {
      return Api.get("/employees").then((response) => setEmployees(response));
    };
    fetchReviews();
    fetchEmployees();
  }, []);

  const handleClickAdd = () => setVisible(true);
  const handleOk = () => {
    const postReview = {
      employeeId: selectedEmployee,
      reviewerId: selectedReviewer,
      pending: true,
      text: null
    }
    return Api.post("/reviews", postReview).then((response) => {
      dispatchData({type: "add", payload: response})
      reset()
    })
  };
  const handleCancel = () => {
    reset()
  };
  const handleChangeEmployee = (employeeId:number) => {
    setSelectedEmployee(employeeId)
  };
  const handleChangeReviewer = (reviewerId:number) => {    console.log("called review")
    setSelectedReviewer(reviewerId)
  };
  const reset = () => {
    setVisible(false)
    setSelectedEmployee(null)
    setSelectedReviewer(null)
  };

  return (
    <section>
      <AddElement text="Add a review" onClick={handleClickAdd} />
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Add a review"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            disabled={!selectedReviewer || !selectedEmployee}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="select a person to review" name="employee">
            <Select
              placeholder="Select an employee to review"
              style={{ width: 200 }}
              onChange={handleChangeEmployee}
            >
              {employees.map((employee: any) => (
                <Option key={`employee-${employee.id}`}  value={employee.id}>{employee.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="select a person to review this employee"
            name="reviewer"
          >
            <Select
              placeholder="Select an employee"
              style={{ width: 200 }}
              disabled={!selectedEmployee}
              onChange={handleChangeReviewer}
            >
              {employees.filter((employee:any) => employee.id !== selectedEmployee).map((employee: any) => (
                <Option key={`reviewer-${employee.id}`} value={employee.id}>{employee.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default PageAdminReviews;
