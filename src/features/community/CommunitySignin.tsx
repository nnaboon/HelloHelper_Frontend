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

const ProfilePageUserHelperListSection = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 510px) minmax(auto, 510px) minmax(
      auto,
      510px
    );
  grid-gap: 30px;
`;

const ProfilePageUserInfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 40px;
  margin-bottom: 70px;
`;

const UserCard = styled.div`
  width: 445px;
  height: 246px;
  background: #ffffff;
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  display: flex;
  margin-left: 50px;
  border-sizing: border-box;
  padding: 20px;
  position: relative;
`;

const HelperImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #0f3276;
  margin-top: 15px;
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 5px;
`;

const ProfileInfoListHeading = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 14px;
  color: #5a5a5a;
`;

const ProfileInfoListDetail = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 21px;
  color: #e56101;
  margin-left: 12px;
`;
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
