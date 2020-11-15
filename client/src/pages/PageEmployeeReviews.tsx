import { Avatar, Button, Form, Input, List, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React, { FC, useEffect, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import Api from '../Api';
import { IReview } from '../types/app.types';
import FormButtonSubmit from "../components/FormButtonSubmit";
import { IReview } from "../types/app.types";

const { TextArea } = Input;

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "init":
      return action.payload;
    case "update":
      return state.map((item: any, index: number) => {
        if (item.id !== action.payload.id) {
          return item;
        }
        return {
          ...action.payload,
        };
      });
    default:
      throw new Error();
  }
};

const PageEmployeeReviews: FC = () => {
  const params = useParams() as any;
  const [data, dispatchData] = useReducer(reducer, [], () => []) as any;
  const [editReview, setEditReview] = useState<IReview | null>(null);
  const [reviewText, setReviewText] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = () => {
      Api.get(`/reviews?reviewerId=${params.id}/`).then(
        (response: IReview[]) => {
          dispatchData({
            type: "init",
            payload: response,
          });
        }
      );
    };
    fetchReviews();
  }, [params.id]);

  const handleChange = (event: any) => {
    setReviewText(event.target.value);
  };

  const handleClickEdit = (item: any) => {
    setEditReview(item);
    setReviewText(item.text);
    setVisible(true);
  };

  const handleOk = () => {
    if (editReview) {
      const putReview = { ...editReview, text: reviewText, pending: false };
      Api.put(`/reviews/${editReview.id}`, putReview).then(
        (response: IReview) => {
          dispatchData({
            type: "update",
            payload: response,
          });
          reset();
        }
      );
    }
  };

  const handleCancel = () => {
    reset();
  };

  const reset = () => {
    setEditReview(null);
    setReviewText("");
    setVisible(false);
  };

  return (
    <section>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item: IReview) => (
          <List.Item
            actions={[
              <Button
                type="link"
                key="edit"
                onClick={() => handleClickEdit(item)}
              >
                Edit
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: "transparent" }}
                  size="large"
                  icon={
                    !item.pending ? (
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    ) : (
                      <ClockCircleTwoTone />
                    )
                  }
                ></Avatar>
              }
              title={item.employee.name}
              description={
                item.pending && !item.text
                  ? `please write a review about ${item.employee.name}`
                  : (<div style={{overflow: 'auto'}}><span style={{fontWeight: 600}}>your review</span>: {item.text}</div>)
              }
            />
          </List.Item>
        )}
      />
      <Modal
        title="Review"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form initialValues={{ remember: false }}  onFinish={handleOk}>
          <Form.Item
            rules={[{ required: true, message: "Please write a review" }]}
            name="review"
          >
            <TextArea
              name="review"
              rows={4}
              value={reviewText}
              defaultValue={reviewText}
              onChange={handleChange}
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

export default PageEmployeeReviews;
