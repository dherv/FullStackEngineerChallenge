import { Avatar, Button, Form, Input, List, Modal } from 'antd';
import React, { FC, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import Api from '../Api';
import FormButtonSubmit from '../components/FormButtonSubmit';
import { reducer } from '../reducers/app.reducer';
import { IReview } from '../types/app.types';

const { TextArea } = Input;

const PageEmployeeReviews: FC = () => {
  const params = useParams() as any;
  const [reviews, dipatchReviews] = useReducer(reducer, []) as any;
  const [editReview, setEditReview] = useState<IReview | null>(null);
  const [reviewText, setReviewText] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = () => {
      Api.get(`/reviews?reviewerId=${params.id}/`).then(
        (response: IReview[]) => {
          dipatchReviews({
            type: 'init',
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
      const putReview = {
        ...editReview,
        text: reviewText,
        pending: false,
      };
      Api.put(`/reviews/${editReview.id}`, putReview).then(
        (response: IReview) => {
          dipatchReviews({
            type: 'update',
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
    setReviewText('');
    setVisible(false);
  };

  return (
    <section>
      <List
        itemLayout="horizontal"
        dataSource={reviews}
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
                  style={{ backgroundColor: 'transparent' }}
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
                item.pending && !item.text ? (
                  `please write a review about ${item.employee.name}`
                ) : (
                  <div style={{ overflow: 'auto' }}>
                    <span style={{ fontWeight: 600 }}>your review</span>:{' '}
                    {item.text}
                  </div>
                )
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
        <Form initialValues={{ remember: false }} onFinish={handleOk}>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please write a review',
              },
            ]}
            name="review"
          >
            <TextArea
              name="review"
              rows={4}
              value={reviewText}
              defaultValue={reviewText}
              placeholder="please write your review here"
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
