/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { SettingSvg } from 'components/Svg/SettingSvg';
import { LogoutSvg } from 'components/Svg/LogoutSvg';
import { COMMUNITY_MAPPER } from 'data/community';
import { CommunityMenuTab } from 'components/Menu/CommunityMenuTab';
import { CommunityMenu } from 'components/Menu/const';
import { CommunitySigninState } from './CommunitySigninState';

export const CommunitySignin = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <WrapperContainer>
      <Text fontSize="23px" fontWeight={500} marginY="10px">
        คุณมีชุมชนความช่วยเหลือแล้วหรือยัง ให้ความช่วยเหลือคนในชุมชนของคุณได้{' '}
        <span
          style={{ color: '#F86800', cursor: 'pointer' }}
          onClick={() => setIsModalVisible(true)}
        >
          ที่นี่
        </span>
      </Text>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={500}
        maskClosable={false}
        centered
      >
        <CommunitySigninState />
      </Modal>
    </WrapperContainer>
  );
};
