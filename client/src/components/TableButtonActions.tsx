import { Button, Space } from 'antd';
import React, { FC } from 'react';
import { IEmployee, IReview } from '../types/app.types';

const TableButtonActions: FC<{
  record: IReview | IEmployee;
  onClickEdit: (record: any) => void;
  onClickDelete: (record: any) => void;
}> = ({ record, onClickEdit, onClickDelete }) => {
  const handleClickEdit = () => onClickEdit(record);
  const handleClickDelete = () => onClickDelete(record);
  return (
    <Space size="middle">
      <Button style={{ padding: 0 }} type="link" onClick={handleClickEdit}>
        Edit
      </Button>
      <Button style={{ padding: 0 }} type="link" onClick={handleClickDelete}>
        Delete
      </Button>
    </Space>
  );
};

export default TableButtonActions;
