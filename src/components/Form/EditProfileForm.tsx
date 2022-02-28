/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, message, Checkbox, Divider, Upload } from 'antd';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { observer } from 'mobx-react-lite';
import { userStore } from 'store/userStore';
import { useUpdateUser } from 'hooks/user/useUpdateUser';
import { useUploadUserImage } from 'hooks/user/useUploadUserImage';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH,
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet,
  mediaQueryLargeDesktop,
  mediaQueryExtraLargeDesktop
} from 'styles/variables';
import DefaultImage from 'images/default.png';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { PrimaryButton } from 'components/Button/Button';
import { Loading } from 'components/Loading/Loading';
import { useUser } from 'hooks/user/useUser';
import { InputForm } from '../Input/InputForm';

const EditProfileTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 20px;

  ${mediaQueryLargeDesktop} {
    margin-bottom: 15px;
    font-size: 20px;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
  }
`;

export const EditProfileForm = observer(() => {
  const [form] = Form.useForm();
  const [location, setLocation] = useState<any>(null);
  const [selectedMyProvide, setSelectedMyProvide] = useState<Boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(DefaultImage);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);
  const { me, setMe, loginType } = userStore;
  const { data: user, execute: getUser } = useUser();
  const { execute: updateUser } = useUpdateUser();
  const { execute: uploadUserImage } = useUploadUserImage();

  const options = [
    { label: 'ด้านการจัดหาอาหาร', value: 'food' },
    { label: 'ด้านเครื่องแต่งกาย', value: 'cloth' },
    { label: 'ด้านความงาม', value: 'beauty' },
    { label: 'ด้านเครื่องใช้ในบ้าน', value: 'furniture' },
    { label: 'ด้านเครื่องใช้ไฟฟ้า', value: 'electronic' },
    { label: 'ด้านอุปกรณ์ทำการเกษตร', value: 'agriculture' },
    { label: 'ด้านหนังสือและเครื่องเขียน', value: 'stationary' },
    { label: 'ด้านเพลงและดนตรี', value: 'music' },
    { label: 'ด้านมือถือและอุปกรณ์เสริม', value: 'mobile' },
    { label: 'ด้านกีฬาและอุปกรณ์เสริม', value: 'sports' },
    { label: 'ด้านสุขภาพ', value: 'health' }
    // {
    //   label: 'ให้ความช่วยเหลือตามรายการให้ความช่วยเหลือของฉัน',
    //   value: undefined
    // }
  ];

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>อัปโหลด</div>
    </div>
  );
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info) => {
    // Change condition
    if (info.file.status === 'done') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'uploading') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  const toggleChecked = (value) => {
    setCheckedList(value);

    // console.log(value);
    // if (value.includes('ให้ความช่วยเหลือตามรายการให้ความช่วยเหลือของฉัน')) {
    //   setCheckedList([]);
    //   setSelectedMyProvide(true);
    //   value = [];
    //   // value = ['ไม่สามารถให้ความช่วยเหลือได้'];
    // } else {
    //   setSelectedMyProvide(false);
    // }
  };

  const onFinish = async (value) => {
    setIsSubmitting(true);
    console.log(location);
    const data = {
      title: value.title,
      email: value.email,
      location: {
        name: location
          ? location.name ?? location.formatted_address
          : me.location.name,
        latitude: location
          ? location.geometry.location.lat()
          : me.location.latitude,
        longitude: location
          ? location.geometry.location.lng()
          : me.location.longitude
      },
      category:
        checkedList.length > 0
          ? checkedList
          : selectedMyProvide
          ? checkedList
          : me.category,
      name: value.name,
      address: value.address,
      phoneNumber: value.phoneNumber
    };

    try {
      if (value.image) {
        var formData = new FormData();
        formData.append('img', value.image.file.originFileObj);

        uploadUserImage(formData)
          .then((res) => {
            updateUser(window.localStorage.getItem('id'), {
              ...data,
              imageUrl: res.data
            }).then((res) => {
              setMe(res.data);
              // getUser(window.localStorage.getItem('id'));
              message.success('สำเร็จ');
            });
          })
          .catch((error) => {
            message.error('ประเภทของรูปภาพจะต้องเป็น .JPEG, .PNG');
          });
      } else {
        updateUser(window.localStorage.getItem('id'), data).then(() => {
          message.success('สำเร็จ');
          getUser(window.localStorage.getItem('id'));
        });
      }
    } catch (error) {
      message.error('ไม่สามารถแก้ไขโปรไฟล์ได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (me) {
      setImageUrl(me.imageUrl ?? DefaultImage);
    }
  }, [me]);

  useEffect(() => {
    if (user) {
      setLocation(user.location);
      setMe(user);
    }
  }, [user]);

  return (
    <React.Fragment>
      {me ? (
        <div
          css={css`
            width: 100%;

            ${mediaQueryTablet} {
              margin-top: 40px;
            }
          `}
        >
          <Text
            marginTop="20px"
            marginBottom="20px"
            fontWeight={500}
            css={css`
              font-size: 2.8rem;
              margin-bottom: 25px;

              ${mediaQueryLargeDesktop} {
                margin-bottom: 15px;
                font-size: 20px;
              }
            `}
          >
            ข้อมูลของฉัน
          </Text>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              title: me.username,
              email: me.email,
              location: me.location,
              category: me.category,
              imageUrl: me.imageUrl,
              name: me.name,
              address: me.address,
              phoneNumber: me.phoneNumber
            }}
            onFinish={onFinish}
            autoComplete="off"
            css={css`
              display: flex;

              .ant-form-item-label > label {
                font-size: 16px;
              }

              .ant-checkbox + span {
                font-size: 16px;
              }

              .ant-checkbox-inner {
                width: 30px;
                height: 30px;
              }

              ${mediaQueryExtraLargeDesktop} {
                .ant-form-item-label > label {
                  font-size: 14px;
                }

                .ant-checkbox + span {
                  font-size: 14px;
                }

                .ant-checkbox-inner {
                  width: 16px;
                  height: 16px;
                }
              }

              ${mediaQueryTablet} {
                .ant-form-item {
                  margin-bottom: 0;
                }
              }

              ${mediaQuerySmallTablet} {
                flex-direction: column-reverse;
              }

              .ant-form-item-control-input {
                width: 100%;
                margin-bottom: 15px;
              }

              ${mediaQueryTablet} {
                .ant-col-8 {
                  max-width: 100%;
                  flex: 0 0 100%;
                }

                .ant-col-16 {
                  max-width: 100%;
                }
                .ant-form-item-label {
                  text-align: left;
                }
              }
            `}
          >
            <div
              css={css`
                width: 100%;
              `}
            >
              <Form.Item name="title" label="ชื่อ">
                <InputForm defaultValue={me.username} placeholder="ชื่อ" />
              </Form.Item>
              <Form.Item name="email" label="อีเมล">
                <InputForm
                  disabled={Boolean(
                    loginType === 'facebook.com' || loginType === 'google.com'
                  )}
                  placeholder="อีเมล"
                />
              </Form.Item>
              <Divider />
              <EditProfileTitle>สถานที่ให้ความช่วยเหลือ</EditProfileTitle>
              <Form.Item name="location" label="สถานที่ให้ความช่วยเหลือ">
                <GoogleMapContent
                  width={
                    isSmallTablet ? '100%' : isLargeDesktop ? '470px' : '100%'
                  }
                  height={isLargeDesktop ? '300px' : '400px'}
                  requestLocation={{
                    lat: me.location.latitude,
                    lng: me.location.longitude
                  }}
                  setRequestLocation={setLocation}
                />
              </Form.Item>
              <Divider />
              <EditProfileTitle>ความสามารถในการช่วยเหลือ</EditProfileTitle>

              <Form.Item label="ความสามารถในการช่วยเหลือ" name="category">
                <Checkbox.Group
                  options={options}
                  value={
                    checkedList.length > 0
                      ? checkedList
                      : // : selectedMyProvide
                        // ? ['ให้ความช่วยเหลือตามรายการให้ความช่วยเหลือของฉัน']
                        me.category
                  }
                  defaultValue={
                    checkedList.length > 0
                      ? checkedList
                      : // : selectedMyProvide
                        // ? ['ให้ความช่วยเหลือตามรายการให้ความช่วยเหลือของฉัน']
                        me.category
                  }
                  onChange={toggleChecked}
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  css={css`
                    > label {
                      margin: 5px 0;
                    }

                    ${mediaQueryLargeDesktop} {
                      > label {
                        margin: 5px 0;
                      }
                    }

                    ${mediaQueryTablet} {
                      > label {
                        font-size: 16px;
                      }
                    }
                  `}
                />
              </Form.Item>
              <Divider />
              <EditProfileTitle>
                ข้อมูลที่อยู่สำหรับการจัดส่งสินค้า
              </EditProfileTitle>
              <Form.Item name="name" label="ชื่อ-นามสกุล">
                <InputForm placeholder="ชื่อ-นามสกุล" />
              </Form.Item>
              <Form.Item name="address" label="ที่อยู่">
                <InputForm placeholder="ที่อยู่" />
              </Form.Item>
              <Form.Item name="phoneNumber" label="เบอร์โทรศัพท์">
                <InputForm placeholder="เบอร์โทรศัพท์" />
              </Form.Item>
              {isSmallTablet && (
                <div
                  css={css`
                    width: 100%;
                    position: relative;
                    height: 100%;
                  `}
                >
                  <PrimaryButton
                    type="primary"
                    htmlType="submit"
                    css={css`
                      width: 90px;
                      position: absolute;
                      min-width: 90px;
                      right: 0;
                      bottom: 0;

                      ${mediaQueryTablet} {
                        right: 0;
                        bottom: 0;
                      }
                    `}
                  >
                    สำเร็จ
                  </PrimaryButton>
                </div>
              )}
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                position: relative;
                top: 40px;

                ${mediaQuerySmallTablet} {
                  margin-bottom: 50px;
                }
              `}
            >
              <img
                src={imageUrl}
                alt="user avatar"
                css={css`
                  width: 100px;
                  height: 100px;
                  border-radius: 50%;
                  margin-bottom: 25px;
                  object-fit: cover;

                  ${mediaQueryLargeDesktop} {
                    width: 75px;
                    height: 75px;
                  }
                `}
              />{' '}
              <Form.Item name="image">
                <Upload
                  name="avatar"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleChange}
                >
                  <Button
                    icon={<UploadOutlined />}
                    css={css`
                      font-size: 12px;
                    `}
                  >
                    เลือกรูป
                  </Button>
                </Upload>
              </Form.Item>
              <Text
                color="#848484"
                fontWeight={500}
                whiteSpace="pre"
                css={css`
                  font-size: 18px;

                  ${mediaQueryLargeDesktop} {
                    font-size: 13px;
                  }
                `}
              >
                ขนาดไฟล์: สูงสุด 1 MB{'\n'}ไฟล์ที่รองรับ: .JPEG, .PNG
              </Text>
              {!isSmallTablet && (
                <div
                  css={css`
                    width: 100%;
                  `}
                >
                  <PrimaryButton
                    type="primary"
                    htmlType="submit"
                    css={css`
                      position: absolute;
                      width: 100px;
                      min-width: 100px;
                      right: 0;
                      bottom: 20px;
                    `}
                  >
                    สำเร็จ
                  </PrimaryButton>
                </div>
              )}
            </div>
          </Form>
        </div>
      ) : (
        <Loading height="calc(100vh - 265px)" />
      )}
    </React.Fragment>
  );
});
