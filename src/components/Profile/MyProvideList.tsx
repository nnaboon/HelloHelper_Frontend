/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { SecondaryButton } from 'components/Button/Button';
import { Dropdown, Menu, message, Rate, Modal } from 'antd';
import { EditSvg } from 'components/Svg/EditSvg';
import { DeleteSvg } from 'components/Svg/DeleteSvg';
import { EyeOffSvg } from 'components/Svg/EyeOffSvg';
import { mediaQueryMobile, useMedia, MOBILE_WIDTH } from 'styles/variables';
import { RequestFormModal } from 'components/Form/RequestForm';
import { USER_DATA } from 'data/user';

const HelperListCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  height: 360px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 35px;
  position: relative;
  cursor: pointer;

  ${mediaQueryMobile} {
    margin-top: 0;
  }
`;

const HelperListTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #f86800;
  margin-bottom: 8px;

  ${mediaQueryMobile} {
    font-size: 18px;
  }
`;

const HelperListHeading = styled.div`
  font-size: 12px;
  line-height: 26px;
  color: #c4c4c4;
  min-width: 170px;

  ${mediaQueryMobile} {
    width: max-content;
    min-width: max-content;
    margin-right: 10px;
  }
`;

const HelperListDetail = styled.div`
  font-size: 18px;
  line-height: 26px;
  color: #000000;

  width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ${mediaQueryMobile} {
    font-size: 16px;
    width: 185px;
    -webkit-line-clamp: 2;
  }
`;

const SecondaryHelpButton = styled(SecondaryButton)`
  width: max-content;
  padding: 0 10px;
  position: absolute;
  bottom: 20px;
  right: 20px;

  &:hover {
    background: #f86800;
    color: #ffff;
  }
`;

export const MyProvideList = ({ data }: any) => {
  const history = useHistory();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }

  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onModalOpen = () => {
    setIsModalVisible(true);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          <EditSvg style={{ marginRight: '8px' }} />

          <div>แก้ไข</div>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <EyeOffSvg style={{ marginRight: '18px' }} />
          <div>ซ่อน</div>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <DeleteSvg style={{ marginRight: '18px' }} />
          <div>ลบ</div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <HelperListCard
      key={data.provideId}
      // onClick={() => {
      //   history.push({
      //     pathname: `/${data.title}/${data.id}`,
      //     state: {
      //       type: 'provide'
      //     }
      //   });
      // }}
    >
      <Dropdown.Button
        onClick={handleButtonClick}
        overlay={menu}
        css={css`
          position: absolute;
          z-index: 8;
          top: 20px;
          color: #0000;
          right: 35px;
          .ant-dropdown-trigger {
            border: none;
          }

          .ant-dropdown-trigger > span {
            background-color: white !important;
          }

          &:selection {
            color: #fff;
            z-index: 8;
            background: transparent;
          }

          svg {
            font-size: 24px;
          }

          ${mediaQueryMobile} {
            right: 8px;
            top: 10px;
          }
        `}
      />
      <HelperListTitle>{data.title}</HelperListTitle>
      <Flex marginY={isMobile ? 2 : '8px'}>
        <HelperListHeading>ผู้ให้ความช่วยเหลือ</HelperListHeading>
        <HelperListDetail>
          {
            USER_DATA.find((props) => props.userId === data.providerUserId)
              .username
          }
        </HelperListDetail>
      </Flex>
      <Flex marginY={isMobile ? 2 : '8px'}>
        <HelperListHeading>สถานที่ให้ความช่วยเหลือ</HelperListHeading>
        <HelperListDetail>{data.location.name}</HelperListDetail>
      </Flex>
      <Flex marginY={isMobile ? 2 : '8px'}>
        <HelperListHeading>ยอดการให้ความช่วยเหลือนี้</HelperListHeading>
        <HelperListDetail>{data.provideSum} ครั้ง</HelperListDetail>
      </Flex>
      <Flex marginY={isMobile ? 2 : '8px'}>
        <HelperListHeading>คะแนนการให้ความช่วยเหลือนี้</HelperListHeading>
        <HelperListDetail>
          5.0 <Rate count={1} defaultValue={1} />
        </HelperListDetail>
      </Flex>
      <Flex marginY={isMobile ? 2 : '8px'}>
        <HelperListHeading>ค่าบริการ</HelperListHeading>
        <HelperListDetail>{data.serviceCharge} บาท</HelperListDetail>
      </Flex>
      <Flex marginY={isMobile ? 2 : '8px'}>
        <HelperListHeading>วิธีการชำระเงิน</HelperListHeading>
        <HelperListDetail>{data.payment}</HelperListDetail>
      </Flex>
      {/* <Modal
        visible={isModalVisible}
        onOk={onModalOpen}
        onCancel={onModalClose}
        footer={null}
        width={isMobile ? '80%' : '800px'}
        maskClosable={false}
        centered
        css={css`
          .ant-modal-content {
            height: 950px;

            ${mediaQueryMobile} {
              height: 480px;
            }
          }
        `}
      > */}
      <RequestFormModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        requestData={data}
      />
      {/* </Modal> */}
    </HelperListCard>
  );
};
