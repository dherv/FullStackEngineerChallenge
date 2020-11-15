import { Avatar, Button, Form, Input, List, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React, { FC, useEffect, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import Api from '../Api';

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
  const [review, setReview] = useState<any>();
  const [reviewText, setReviewText] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);


  useEffect(() => {
    const fetchReviews = () => {
      Api.get(`/reviews?reviewerId=${params.id}/`).then((response) => {

        dispatchData({
          type: "init",
          payload: response,
        });
      });
    };
    fetchReviews();
  }, [params.id]);

  const handleChange = (event: any) => {
    setReviewText(event.target.value);
  };

  const handleClickEdit = (item: any) => {
    setReview(item);
    setReviewText(item.text);
    setVisible(true);
   
   
  };

  const handleOk = () => {
    const putReview = { ...review, text: reviewText, pending: false };
    Api.put(`/reviews/${review.id}`, putReview).then((response) => {
      dispatchData({
        type: "update",
        payload: response,
      });
      reset();
    });
  };

  const handleCancel = () => {
    reset();
  };

  const reset = () => {

    setReview(null);
    setReviewText("");
    setVisible(false);
  };
  
  return (
    <section>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <Button type="link" key="list-loadmore-edit" onClick={() => handleClickEdit(item)}>
                edit
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

export default PageEmployeeReviews;
