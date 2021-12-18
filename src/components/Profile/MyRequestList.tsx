/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { SecondaryButton } from 'components/Button/Button';
import { Dropdown, Menu, message } from 'antd';
import { EditSvg } from 'components/Svg/EditSvg';
import { DeleteSvg } from 'components/Svg/DeleteSvg';
import { EyeOffSvg } from 'components/Svg/EyeOffSvg';
import { mediaQueryMobile } from 'styles/variables';

const HelperListCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  height: 360px;
  margin-top: 20px;
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
  width: 95%;

  ${mediaQueryMobile} {
    font-size: 18px;
  }
`;

const HelperListHeading = styled.div`
  font-size: 12px;
  line-height: 26px;
  color: #c4c4c4;
  min-width: 150px;

  ${mediaQueryMobile} {
    width: max-content;
    max-width: max-content;
    margin-right: 10px;
  }
`;

const HelperListDetail = styled.div`
  font-size: 18px;
  line-height: 26px;
  color: #000000;

  ${mediaQueryMobile} {
    font-size: 16px;
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

export const MyRequestList = ({ data }: any) => {
  const history = useHistory();
  function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }

  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
      key={data.id}
      onClick={() => {
        history.push({
          pathname: `/${data.title}/${data.id}`,
          state: {
            type: 'request'
          }
        });
      }}
    >
      <Dropdown.Button
        onClick={handleButtonClick}
        overlay={menu}
        css={css`
          position: absolute;
          top: 20px;
          color: #0000;
          z-index: 6;
          right: 35px;
          .ant-dropdown-trigger {
            border: none;
          }

          .ant-dropdown-trigger > span {
            background-color: white !important;
          }

          &:selection {
            color: #fff;
            background: transparent;
            z-index: 6;
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
      <Flex marginY="8px">
        <HelperListHeading>ผู้ให้ความช่วยเหลือ</HelperListHeading>
        <HelperListDetail>{data.name}</HelperListDetail>
      </Flex>
      <Flex marginY="8px">
        <HelperListHeading>สถานที่ให้ความช่วยเหลือ</HelperListHeading>
        <HelperListDetail>{data.location}</HelperListDetail>
      </Flex>
      <Flex marginY="8px">
        <HelperListHeading>ค่าบริการ</HelperListHeading>
        <HelperListDetail>{data.serviceCharge}</HelperListDetail>
      </Flex>
      <Flex marginY="8px">
        <HelperListHeading>วิธีการชำระเงิน</HelperListHeading>
        <HelperListDetail>{data.payment}</HelperListDetail>
      </Flex>
    </HelperListCard>
  );
};
