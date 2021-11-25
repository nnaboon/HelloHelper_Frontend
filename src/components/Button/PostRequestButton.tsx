/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { PrimaryButton } from './Button';
import { Modal } from 'antd';
import { RequestForm } from 'components/Form/RequestForm';

const RequestButton = styled(PrimaryButton)`
  width: 198px;
  height: 49px;
  font-weight: 700;
  font-size: 18px;

  &:hover {
    color: #ffff;
  }
`;

export const PostRequestButton = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Global
        styles={css`
          .ant-modal-content {
            border-radius: 12px;
            height: 950px;
          }
        `}
      />
      <RequestButton onClick={() => setIsModalVisible(true)}>
        ขอความช่วยเหลือ
      </RequestButton>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
        maskClosable={false}
        centered
      >
        <RequestForm />
      </Modal>
    </div>
  );
};
