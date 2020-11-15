import { Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { FC } from 'react';
import { PlusCircleTwoTone } from '@ant-design/icons';

const AddElement: FC<{
  text: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ text, onClick }) => {
  return (
    <Card style={{ marginBottom: '1rem' }} hoverable onClick={onClick}>
      <span>{text}</span>
      <Avatar
        style={{ backgroundColor: 'transparent' }}
        icon={<PlusCircleTwoTone />}
      />
    </Card>
  );
};

export default AddElement;
