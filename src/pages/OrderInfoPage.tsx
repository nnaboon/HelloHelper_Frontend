/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import Flex from 'components/Flex/Flex';
import { useLocation, useHistory } from 'react-router-dom';
import { STATUS_MAPPER } from 'components/Button/const';
import { StatusType } from 'components/Button/const';
import { Menu, Dropdown, message, Form, Modal, Divider } from 'antd';
import { StatusBadge } from 'components/Badge/StatusBadge';
import { RatingForm } from 'components/Form/RatingForm';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { LeftOutlined } from '@ant-design/icons';
import { useUpdateOrder } from 'hooks/order/useUpdateOrder';
import {
  mediaQueryMobile,
  useMedia,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  TABLET_WIDTH,
  mediaQuerySmallTablet,
  mediaQueryTablet
} from 'styles/variables';
import { useOrder } from 'hooks/order/useOrder';
import { Loading } from 'components/Loading/Loading';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';

const ProvideListContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 310px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  margin-top: 20px;
  padding: 30px 40px;

  ${mediaQueryTablet} {
    width: 100%;
    padding: 20px;
  }
`;

const ProvideListContent = styled.div`
  text-align: start;

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const ProvideListTitle = styled.div`
  width: 130px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: #b9b9b9;
  text-align: end;
  margin-right: 20px;

  ${mediaQueryMobile} {
    text-align: start;
  }
`;

const ProvideListData = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.54);

  ${mediaQueryMobile} {
    font-size: 16px;
    width: 185px;
    -webkit-line-clamp: 1;
  }
`;

const ReceiverData = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.54);

  ${mediaQueryMobile} {
    font-size: 16px;
    width: 185px;
    -webkit-line-clamp: 1;
  }
`;
export const OrderInfoPage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const history = useHistory();
  const { pathname } = useLocation();
  const query = pathname.split('/')[3];
  const orderType = pathname.split('/')[2];

  const { loading: updateLoading, execute: updateOrder } = useUpdateOrder();
  const { data: order, execute: getOrder } = useOrder();

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      rating: value.rating
    };

    try {
      console.log('data', data);
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getOrder(query);
  }, []);

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          if (order.status !== 'waiting') {
            try {
              updateOrder(query, { status: 'waiting' }).then(() => {
                getOrder(query);
              });
            } catch (error) {
              message.error('ไม่สามาถเปลี่ยนสถานะได้');
            } finally {
              message.success('สำเร็จ');
            }
          }
        }}
      >
        รอดำเนินการ
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          if (order.status !== 'pending') {
            try {
              updateOrder(query, { status: 'pending' }).then(() => {
                getOrder(query);
              });
            } catch (error) {
              message.error('ไม่สามาถเปลี่ยนสถานะได้');
            } finally {
              message.success('สำเร็จ');
            }
          }
        }}
      >
        กำลังดำเนินการ
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          if (order.status !== 'complete') {
            try {
              updateOrder(query, { status: 'complete' }).then(() => {
                getOrder(query);
              });
            } catch (error) {
              message.error('ไม่สามาถเปลี่ยนสถานะได้');
            } finally {
              message.success('สำเร็จ');
            }
          }
        }}
      >
        สำเร็จ
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          if (order.status !== 'cancel') {
            try {
              updateOrder(query, { status: 'cancel' }).then(() => {
                getOrder(query);
              });
            } catch (error) {
              message.error('ไม่สามาถเปลี่ยนสถานะได้');
            } finally {
              message.success('สำเร็จ');
            }
          }
        }}
      >
        ยกเลิก
      </Menu.Item>
    </Menu>
  );

  return (
    <WrapperContainer>
      {order ? (
        <React.Fragment>
          <Flex justify="space-between">
            <Flex
              css={css`
                cursor: pointer;
              `}
              onClick={() => {
                history.push(`/order/${orderType}`);
              }}
            >
              <LeftOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
              <div
                css={css`
                  font-size: 18px;
                `}
              >
                ย้อนกลับ
              </div>
            </Flex>
            <Flex>
              {' '}
              <Flex itemAlign="center" justify="flex-end" marginRight="25px">
                <ProvideListTitle>หมายเลขคำสั่งซื้อ</ProvideListTitle>
                <ProvideListData
                  css={css`
                    width: unset;
                    color: #ee6400;
                    font-size: 18px;
                  `}
                >
                  {order.id}
                </ProvideListData>
              </Flex>
              <StatusBadge
                status={STATUS_MAPPER[order.status].status}
                color={STATUS_MAPPER[order.status].color}
              />
            </Flex>
          </Flex>
          <Flex
            justify="space-between"
            marginTop="20px"
            marginBottom="40px"
            itemAlign="flex-end"
          >
            <div>
              <Text fontSize="26px" fontWeight={500} marginY="15px">
                ที่อยู่จัดส่ง
              </Text>
              <ReceiverData>{order.receiver.name}</ReceiverData>
              <ReceiverData>{order.receiver.phoneNumber}</ReceiverData>
              <ReceiverData>{order.receiver.address}</ReceiverData>
            </div>
            <div>
              {' '}
              {order.status === StatusType.COMPLETE ? (
                orderType === 'request' ? (
                  <Flex direction="column" itemAlign="flex-end">
                    <PrimaryButton
                      css={css`
                        width: 140px;
                        margin-left: 0;
                        height: 45px;
                        z-index: 10;

                        ${mediaQueryTablet} {
                          min-width: 130px;
                        }

                        ${mediaQueryMobile} {
                          min-width: 47%;
                          width: 47%;
                        }
                      `}
                      onClick={() => {
                        setIsModalVisible(true);
                      }}
                    >
                      ให้คะแนน
                    </PrimaryButton>
                    <SecondaryButton
                      css={css`
                        min-width: 140px;
                        height: 45px;
                        z-index: 10;
                        margin-right: 0;
                        margin-top: 10px;
                        margin-bottom: 0;

                        ${mediaQueryTablet} {
                          min-width: 130px;
                        }

                        ${mediaQueryMobile} {
                          min-width: 47%;
                          width: 47%;
                        }
                      `}
                    >
                      แชท
                    </SecondaryButton>
                  </Flex>
                ) : (
                  <Flex direction="column" itemAlign="flex-end">
                    <SecondaryButton
                      css={css`
                        min-width: 140px;
                        height: 45px;
                        z-index: 10;
                        margin-right: 0;
                        margin-bottom: 0;

                        ${mediaQueryTablet} {
                          min-width: 130px;
                        }

                        ${mediaQueryMobile} {
                          min-width: 47%;
                          width: 47%;
                        }
                      `}
                    >
                      แชท
                    </SecondaryButton>
                  </Flex>
                )
              ) : (
                <Flex direction="column">
                  <SecondaryButton
                    css={css`
                      min-width: 140px;
                      height: 45px;
                      z-index: 10;
                      margin-right: 0;
                      margin-bottom: 0;

                      ${mediaQueryTablet} {
                        min-width: 130px;
                      }

                      ${mediaQueryMobile} {
                        min-width: 47%;
                        width: 47%;
                      }
                    `}
                  >
                    แชท
                  </SecondaryButton>
                  <Dropdown overlay={menu}>
                    <PrimaryButton
                      css={css`
                        width: 140px;
                        height: 45px;
                        margin-left: 0;
                        margin-top: 10px;

                        ${mediaQueryTablet} {
                          min-width: 130px;
                        }

                        ${mediaQueryMobile} {
                          min-width: 47%;
                          width: 47%;
                        }
                      `}
                    >
                      เปลี่ยนสถานะ
                    </PrimaryButton>
                  </Dropdown>
                </Flex>
              )}
            </div>
          </Flex>

          <ProvideListContainer>
            <ProvideListContent>
              {/* <Flex itemAlign="flex-start"> */}
              {/* <ProvideListTitle>ชื่อความช่วยเหลือ</ProvideListTitle> */}
              <ProvideListData
                css={css`
                  font-weight: 700;
                  font-size: 24px;
                  color: black;
                `}
              >
                {order.title}
              </ProvideListData>
              {/* </Flex> */}
              <Flex itemAlign="flex-start" marginY="4px">
                {/* <ProvideListTitle>สถานที่ให้ความข่วยเหลือ</ProvideListTitle> */}
                <ProvideListData>{order.location.name}</ProvideListData>
              </Flex>
              <Flex itemAlign="flex-start" marginY="4px">
                {/* <ProvideListTitle>จำนวน</ProvideListTitle> */}
                <ProvideListData>x{order.number}</ProvideListData>
              </Flex>
              {/* <Flex itemAlign="flex-start">
          <ProvideListTitle>ราคาสินค้าทั้งหมด</ProvideListTitle>
          <ProvideListData>{order.price} บาท</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>อัตราค่าบริการ</ProvideListTitle>
          <ProvideListData>{order.serviceCharge} บาท</ProvideListData>
        </Flex> */}
              <Flex itemAlign="flex-start" marginY="4px">
                {/* <ProvideListTitle>ข้อความ</ProvideListTitle> */}
                <ProvideListData>{order.description}</ProvideListData>
              </Flex>
              {/* <Flex itemAlign="flex-start">
          <ProvideListTitle>รูปแบบการชำระเงิน</ProvideListTitle>
          <ProvideListData>{order.payment}</ProvideListData>
        </Flex> */}
              {/* <Flex itemAlign="flex-end" justify="flex-end">
          <ProvideListTitle>ราคาสินค้า</ProvideListTitle>
          <ProvideListData
            css={css`
              width: unset;
              font-size: 24px;
              color: black;
            `}
          >
            ฿{order.price}
          </ProvideListData>
        </Flex>
        <Flex itemAlign="flex-end" justify="flex-end">
          <ProvideListTitle>อัตราค่าบริการ</ProvideListTitle>
          <ProvideListData
            css={css`
              width: unset;
              font-size: 24px;
              color: black;
            `}
          >
            ฿{order.serviceCharge}
          </ProvideListData>
        </Flex> */}
              <Divider style={{ margin: '18px' }} />
              <Flex itemAlign="center" justify="flex-end" marginY="8px">
                <ProvideListTitle>ช่องทางการชำระเงิน</ProvideListTitle>
                <ProvideListData
                  css={css`
                    width: unset;
                    font-size: 16px;
                    color: black;
                  `}
                >
                  {order.payment}
                </ProvideListData>
              </Flex>
              <Flex itemAlign="center" justify="flex-end">
                <ProvideListTitle>ราคาสินค้า</ProvideListTitle>
                <ProvideListData
                  css={css`
                    width: unset;
                    font-size: 24px;
                    font-weight: 600;
                    color: black;
                  `}
                >
                  ฿{order.price}
                </ProvideListData>
              </Flex>
              <Flex itemAlign="center" justify="flex-end">
                <ProvideListTitle>อัตราค่าบริการ</ProvideListTitle>
                <ProvideListData
                  css={css`
                    width: unset;
                    font-size: 24px;
                    font-weight: 600;
                    color: black;
                  `}
                >
                  ฿{order.serviceCharge}
                </ProvideListData>
              </Flex>
              <Flex itemAlign="center" justify="flex-end">
                <ProvideListTitle>ยอดคำสั่งซื้อทั้งหมด</ProvideListTitle>
                <ProvideListData
                  css={css`
                    width: unset;
                    font-size: 24px;
                    font-weight: 600;
                    color: black;
                  `}
                >
                  ฿{order.serviceCharge + order.price}
                </ProvideListData>
              </Flex>
              {/* <Flex itemAlign="center" justify="flex-end" marginY="8px">
              <ProvideListTitle>ช่องทางการชำระเงิน</ProvideListTitle>
              <ProvideListData
                css={css`
                  width: unset;
                  font-size: 16px;
                  color: black;
                `}
              >
                {order.payment}
              </ProvideListData>
            </Flex> */}
            </ProvideListContent>

            {/* {order.status === StatusType.COMPLETE ? (
            <Flex
              css={css`
                position: absolute;
                right: 20px;
                bottom: 20px;
                width: max-content;

                ${mediaQueryMobile} {
                  position: relative;
                  bottom: 0;
                  right: 0;
                  width: 100%;
                  justify-content: space-between;
                  margin-top: 20px;
                }
              `}
            >
              <PrimaryButton
                css={css`
                  min-width: 160px;
                  background: #0047ff;

                  ${mediaQueryMobile} {
                    min-width: 47%;
                    width: 47%;
                  }
                `}
              >
                แชท
              </PrimaryButton>
            </Flex>
          ) : (
            <Flex
              css={css`
                position: absolute;
                right: 20px;
                bottom: 20px;
                width: max-content;

                ${mediaQueryMobile} {
                  position: relative;
                  bottom: 0;
                  right: 0;
                  width: 100%;
                  justify-content: space-between;
                  margin-top: 20px;
                }
              `}
            >
              <PrimaryButton
                css={css`
                  min-width: 150px;
                  background: #0047ff;

                  ${mediaQueryTablet} {
                    min-width: 170px;
                  }

                  ${mediaQueryMobile} {
                    min-width: 47%;
                    width: 47%;
                  }
                `}
              >
                แขท
              </PrimaryButton>
              <Dropdown overlay={menu}>
                <PrimaryButton
                  css={css`
                    min-width: 150px;

                    ${mediaQueryTablet} {
                      min-width: 170px;
                    }

                    ${mediaQueryMobile} {
                      min-width: 47%;
                      width: 47%;
                    }
                  `}
                >
                  เปลี่ยนสถานะ
                </PrimaryButton>
              </Dropdown>
            </Flex>
          )} */}
            <Modal
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              width={400}
              maskClosable={false}
              centered
              css={css`
                .ant-modal-content {
                  height: 220px;
                }
              `}
            >
              <RatingForm />
            </Modal>
          </ProvideListContainer>
        </React.Fragment>
      ) : (
        <Loading />
      )}
    </WrapperContainer>
  );
};
