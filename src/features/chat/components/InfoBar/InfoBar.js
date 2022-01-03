/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { OrderForm } from 'components/Form/OrderForm';
import {
  useMedia,
  mediaQueryMobile,
  MOBILE_WIDTH,
  DESKTOP_WIDTH,
  mediaQueryDesktop
} from 'styles/variables';
import './InfoBar.css';

const InfoBar = ({ room }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isDesktop = useMedia(`max-width: ${DESKTOP_WIDTH}px`);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <React.Fragment>
      <div className="infoBar">
        <div className="leftInnerContainer">
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div className="user-name">ปลาทอง ตัวกลม</div>
            <div className="request-name">ขนมปังสังขยา โชคชัย4</div>
          </div>
          <div className="request-form" onClick={() => setIsModalVisible(true)}>
            ฟอร์มการช่วยเหลือ
          </div>
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={isMobile ? '85%' : 900}
        maskClosable={false}
        centered
        css={css`
          .ant-modal-content {
            min-height: 820px;
            height: 820px;

            @media screen and (min-width: 2000px) {
              min-height: 900px;
              height: max-content;
            }

            ${mediaQueryMobile} {
              min-height: 400px;
              height: 400px;
              overflow-y: scroll;
            }
          }
        `}
      >
        <OrderForm />
      </Modal>
    </React.Fragment>
  );
};

export default InfoBar;
