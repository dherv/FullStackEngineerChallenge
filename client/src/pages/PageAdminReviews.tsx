import { Form, Modal, Select, Table } from 'antd';
import React, { FC, useEffect, useReducer, useState } from 'react';
import Api from '../Api';
import AddElement from '../components/AddElement';
import FormButtonSubmit from '../components/FormButtonSubmit';
import TableButtonActions from '../components/TableButtonActions';
import { reducer } from '../reducers/app.reducer';
import { IEmployee, IReview } from '../types/app.types';

const { Option } = Select;

const PageAdminReviews: FC = () => {
  const [reviews, dispatchReviews] = useReducer(reducer, []) as any;
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [selectedReviewer, setSelectedReviewer] = useState<number | null>(null);
  const [reviewEdit, setReviewEdit] = useState<number | null>(null);
  const [editEmployee, setEditEmployee] = useState<{
    id: number;
    name: string;
  } | null>();
  const [editReviewer, setEditReviewer] = useState<{
    id: number;
    name: string;
  } | null>();

  useEffect(() => {
    const fetchReviews = () => {
      return Api.get('/reviews').then((response: IReview[]) =>
        dispatchReviews({ type: 'init', payload: response })
      );
    };
    fetchReviews();
    return () => {};
  }, []);

  useEffect(() => {
    const fetchEmployees = () => {
      return Api.get('/employees').then((response: IEmployee[]) =>
        setEmployees(response)
      );
    };
    fetchEmployees();
    return () => {};
  }, []);

  const handleClickAdd = () => setVisible(true);

  const handleOk = () => {
    const postReview = {
      employeeId: selectedEmployee,
      reviewerId: selectedReviewer,
      pending: true,
      text: null,
    };
    if (reviewEdit) {
      return Api.put(`/reviews/${reviewEdit}`, postReview).then(
        (response: IReview) => {
          dispatchReviews({ type: 'update', payload: response });
          reset();
        }
      );
    } else {
      return Api.post('/reviews', postReview).then((response: IReview) => {
        dispatchReviews({ type: 'add', payload: response });
        reset();
      });
    }
  };

  const handleCancel = () => {
    reset();
  };

  const handleChangeEmployee = (employeeId: number) => {
    setSelectedEmployee(employeeId);
  };

  const handleChangeReviewer = (reviewerId: number) => {
    setSelectedReviewer(reviewerId);
  };

  const handleEdit = (record: IReview) => {
    setReviewEdit(record.id);
    setEditEmployee({ id: record.employee.id, name: record.employee.name });
    setEditReviewer({ id: record.reviewer.id, name: record.reviewer.name });
    setVisible(true);
  };

  const handleDelete = (record: IReview) => {
    Api.delete(`/reviews/${record.id}`).then(() => {
      dispatchReviews({ type: 'delete', payload: record });
    });
  };

  const reset = () => {
    setVisible(false);
    setReviewEdit(null);
    setEditEmployee(null);
    setEditReviewer(null);
    setSelectedEmployee(null);
    setSelectedReviewer(null);
  };

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: IReview) => {
        return record.employee.name;
      },
    },
    {
      title: 'Reviewer',
      dataIndex: 'reviewer',
      key: 'reviewer',
      render: (text: string, record: IReview) => {
        return record.reviewer.name;
      },
    },
    {
      title: 'Review',
      dataIndex: 'review',
      key: 'review',
      responsive: ['md'],
      ellipsis: true,
      render: (text: string, record: IReview) => <div>{record.text}</div>,
    },
    {
      title: 'Pending',
      dataIndex: 'pending',
      key: 'pending',
      responsive: ['md'],
      render: (text: string, record: IReview) => {
        return record.pending.toString();
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: IReview) => (
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
      <AddElement text="Add a review" onClick={handleClickAdd} />
      <Table columns={columns as any} dataSource={reviews} rowKey="id" />
      <Modal
        title="Add a review"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={{
            remember: false,
            employee: editEmployee ? editEmployee.name : (null as any),
            reviewer: editReviewer ? editReviewer.name : (null as any),
          }}
          onFinish={handleOk}
        >
          <Form.Item label="select a person to review" name="employee">
            <Select
              placeholder="Select an employee to review"
              style={{ width: 200 }}
              onChange={handleChangeEmployee}
            >
              {employees.map((employee: any) => (
                <Option key={`employee-${employee.id}`} value={employee.id}>
                  {employee.name}
                </Option>
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
              {employees
                .filter((employee: any) => employee.id !== selectedEmployee)
                .map((employee: any) => (
                  <Option key={`reviewer-${employee.id}`} value={employee.id}>
                    {employee.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <FormButtonSubmit
              disabled={!selectedReviewer || !selectedEmployee}
            />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default PageAdminReviews;
