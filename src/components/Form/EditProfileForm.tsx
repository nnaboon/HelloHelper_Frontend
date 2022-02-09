/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Checkbox, Divider, Upload } from 'antd';
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
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet,
  mediaQueryDesktop
} from 'styles/variables';
import DefaultImage from 'images/default.png';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Loading } from 'components/Loading/Loading';
import { useUser } from 'hooks/user/useUser';

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
      <div style={{ marginTop: 8 }}>Upload</div>
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
          : me.category
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
            }).then(() => {
              getUser(window.localStorage.getItem('id'));
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
            fontSize="24px"
            marginTop="20px"
            marginBottom="20px"
            fontWeight={500}
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
              imageUrl: me.imageUrl
            }}
            onFinish={onFinish}
            autoComplete="off"
            css={css`
              display: flex;

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
                <Input
                  defaultValue={me.username}
                  placeholder="ชื่อ"
                  style={{ height: '40px', borderRadius: '12px' }}
                />
              </Form.Item>
              <Form.Item name="email" label="อีเมล">
                <Input
                  disabled={Boolean(
                    loginType === 'facebook.com' || loginType === 'google.com'
                  )}
                  placeholder="อีเมล"
                  style={{ height: '40px', borderRadius: '12px' }}
                />
              </Form.Item>

              {loginType === 'password' && (
                <React.Fragment>
                  <Divider />
                  <Text
                    fontSize="24px"
                    fontWeight={500}
                    marginBottom="20px"
                    marginTop="10px"
                  >
                    เปลี่ยนรหัสผ่าน
                  </Text>
                  <Form.Item name="prevPassword" label="รหัสผ่านปัจจุบัน">
                    <Input
                      placeholder="รหัสผ่านปัจจุบัน"
                      style={{ height: '40px', borderRadius: '12px' }}
                    />
                  </Form.Item>{' '}
                  <Form.Item name="password" label="รหัสผ่านใหม่">
                    <Input
                      placeholder="รหัสผ่านใหม่"
                      style={{ height: '40px', borderRadius: '12px' }}
                    />
                  </Form.Item>{' '}
                  <Form.Item name="confirmPassword" label="ยืนยันรหัสผ่านใหม่">
                    <Input
                      placeholder="รหัสผ่านใหม่"
                      style={{ height: '40px', borderRadius: '12px' }}
                    />
                  </Form.Item>
                </React.Fragment>
              )}
              <Divider />
              <Text
                fontSize="24px"
                fontWeight={500}
                marginBottom="20px"
                marginTop="10px"
              >
                สถานที่ให้ความช่วยเหลือ
              </Text>
              <Form.Item name="location" label="สถานที่ให้ความช่วยเหลือ">
                <GoogleMapContent
                  width={isSmallTablet ? '100%' : '470px'}
                  requestLocation={{
                    lat: me.location.latitude,
                    lng: me.location.longitude
                  }}
                  setRequestLocation={setLocation}
                />
              </Form.Item>
              <Divider />
              <Text fontSize="24px" fontWeight={500} marginY="20px">
                ความสามารถในการช่วยเหลือ
              </Text>
              {/* <Form.Item
            name="ability"
            css={css`
              position: relative;
              left: 15.333%;
              display: flex;

              .ant-checkbox-group-item {
                font-size: 16px;
                margin-bottom: 20px;
              }

              .ant-checkbox {
                margin-right: 40px !important;
              }

              .ant-checkbox-group {
                display: flex;
                flex-direction: column;
                width: 450px;
                font-size: 16px;
                > label {
                  margin-bottom: 8px;
                }
              }

              ${mediaQueryTablet} {
                left: 0;
              }
            `}
          > */}
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
                    flexDirection: 'column',
                    marginBottom: '50px'
                  }}
                />
              </Form.Item>
            </div>
            <div
              css={css`
                display: flex;
                height: 100% !important;
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
                  width: 140px;
                  height: 140px;
                  border-radius: 50%;
                  margin-bottom: 25px;
                  object-fit: cover;
                `}
              />{' '}
              <Form.Item name="image">
                <Upload
                  name="avatar"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleChange}
                >
                  <Button icon={<UploadOutlined />}>เลือกรูป</Button>
                </Upload>
              </Form.Item>
              <Text
                fontSize="14px"
                color="#848484"
                fontWeight={500}
                whiteSpace="pre"
              >
                ขนาดไฟล์: สูงสุด 1 MB{'\n'}ไฟล์ที่รองรับ: .JPEG, .PNG
              </Text>
              {!isSmallTablet && (
                <div
                  css={css`
                    width: 100%;
                    position: relative;
                    height: 100vh;
                    bottom: 0px;
                  `}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    css={css`
                      width: 170px;
                      height: 40px;
                      box-sizing: border-box;
                      background: #ee6400;
                      border-radius: 9px;
                      border: 0;
                      right: 100px;
                      color: #ffff;
                      font-size: 16px;
                      position: absolute;
                      bottom: 40px;

                      &:hover {
                        background: #ee6400;
                      }

                      ${mediaQueryTablet} {
                        width: 120px;
                        right: 0;
                        height: 35px;
                        font-size: 16px;
                      }

                      ${mediaQueryMobile} {
                        width: 100px;
                      }
                    `}
                  >
                    สำเร็จ
                  </Button>
                </div>
              )}
            </div>
            {/* <Form.Item name="image">
            <Upload
              name="avatar"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />}>เลือกรูป</Button>
            </Upload>
          </Form.Item> */}
            {/* </Form.Item> */}
            {isSmallTablet && (
              <div
                css={css`
                  width: 100%;
                  position: relative;
                  height: 100%;
                `}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  css={css`
                    width: 170px;
                    height: 40px;
                    box-sizing: border-box;
                    background: #ee6400;
                    border-radius: 9px;
                    border: 0;
                    right: 39%;
                    color: #ffff;
                    font-size: 16px;
                    position: absolute;
                    bottom: 20px;

                    &:hover {
                      background: #ee6400;
                    }

                    ${mediaQueryTablet} {
                      width: 120px;
                      right: 0;
                      height: 35px;
                      font-size: 16px;
                    }

                    ${mediaQueryMobile} {
                      width: 100px;
                    }
                  `}
                >
                  สำเร็จ
                </Button>
              </div>
            )}
          </Form>
        </div>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
});
