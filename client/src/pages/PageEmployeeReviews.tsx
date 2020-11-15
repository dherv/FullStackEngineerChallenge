import { Avatar, Input, List, Modal } from "antd";
import React, { FC, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircleTwoTone, ClockCircleTwoTone } from "@ant-design/icons";
import Api from "../Api";

const { TextArea } = Input;

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "init":
      return action.payload;
    case "update":
      console.log(action.payload);
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
        console.log(response);
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
              <a key="list-loadmore-edit" onClick={() => handleClickEdit(item)}>
                edit
              </a>,
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
              title={<a href="https://ant.design">{item.employee.name}</a>}
              description={
                item.pending && !item.text
                  ? `please write a review about ${item.employee.name}`
                  : `your review: ${item.text}`
              }
            />
          </List.Item>
        )}
      />
      <Modal
        title="Review"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea
          name="review"
          rows={4}
          value={reviewText}
          onChange={handleChange}
        />
      </Modal>
    </section>
  );
};

export default PageEmployeeReviews;
