/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Divider, Upload } from 'antd';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { FormRule, getRule } from 'utils/form/getRule';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH,
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryLargeDesktop,
  mediaQueryTablet
} from 'styles/variables';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';
import DefaultImage from 'images/default.png';
import { useUpdateCommunity } from 'hooks/community/useUpdateCommunity';
import { useUploadCommunityImage } from 'hooks/community/useUploadCommunityImage';

export const CommunitySettingEditProfile = ({ communityData }: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState<string>(DefaultImage);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [location, setLocation] = useState<any>();
  const { execute: uploadCommunityImage } = useUploadCommunityImage();
  const { execute: updateCommunity } = useUpdateCommunity();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

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

  useEffect(() => {
    form.setFieldsValue({
      communityName: communityData.communityName,
      description: communityData.description,
      imageUrl: communityData.imageUrl,
      location: communityData.location
    });
  }, [communityData, form]);

  useEffect(() => {
    if (
      form.getFieldValue('communityCode') &&
      form.getFieldValue('communityCode') !== form.getFieldValue('confirmCode')
    )
      form.setFields([
        {
          name: 'confirmCode',
          errors: ['รหัสผ่านไม่ตรงกัน']
        }
      ]);
    else
      form.setFields([
        {
          name: 'confirmCode',
          errors: []
        }
      ]);
  }, [password]);

  useEffect(() => {
    form.setFieldsValue({
      location: location
    });
  }, [form, location]);

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      communityName: value.communityName,
      description: value.description,
      // communityCode: value.communityCode
      //   ? value.communityCode
      //   : communityData.communityCode,
      location: {
        name: location ? location?.name : communityData.location.name,
        latitude: location
          ? location?.geometry.location.lat()
          : communityData.location.latitude,
        longitude: location
          ? location?.geometry.location.lng()
          : communityData.location.longitude
      }
    };

    try {
      if (value.image) {
        var formData = new FormData();
        formData.append('img', value.image.file.originFileObj);

        uploadCommunityImage(formData)
          .then((res) => {
            console.log(res);
            updateCommunity(communityData.communityId, {
              ...data,
              imageUrl: res.data
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        updateCommunity(communityData.communityId, data);
      }
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
      message.success('สำเร็จ');
    }
  };

  useEffect(() => {
    if (communityData) {
      setImageUrl(communityData.imageUrl ?? DefaultImage);
    }
  }, [communityData]);

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;

        ${mediaQueryTablet} {
          margin-top: 40px;
        }

        ${mediaQueryMobile} {
          padding: 20px 20px 30px 20px;
        }
      `}
    >
      <Text
        marginY={isMobile ? '20px' : '40px'}
        marginLeft={isSmallTablet ? 0 : '60px'}
        fontWeight={500}
        css={css`
          font-size: 2.8rem;
          margin-bottom: 35px;

          ${mediaQueryLargeDesktop} {
            margin-bottom: 15px;
            font-size: 20px;
          }
        `}
      >
        ข้อมูลชุมชนความช่วยเหลือ
      </Text>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          communityName: communityData.title,
          description: communityData.description,
          imageUrl: communityData.imageUrl,
          location: communityData.location
        }}
        css={css`
          display: flex;
          height: 100%;

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

          // .ant-col-8 {
          //   ${mediaQuerySmallTablet} {
          //     max-width: 20%;
          //   }

          //   ${mediaQueryMobile} {
          //     max-width: 33.3333%;
          //   }
          // }

          // .ant-form-item-control-input {
          //   width: 460px;

          //   ${mediaQueryMobile} {
          //     width: 100%;
          //   }
          // }

          // ${mediaQueryTablet} {
          //   .ant-col-16 {
          //     max-width: 100%;
          //   }
          // }
        `}
      >
        <div
          css={css`
            width: 100%;
          `}
        >
          <Form.Item name="communityName" label="ชื่อ">
            <Input
              defaultValue={communityData.communityName}
              placeholder="ชื่อชุมชนความช่วยเหลือ"
              style={{ height: '40px', borderRadius: '12px' }}
            />
          </Form.Item>
          <Form.Item name="description" label="คำอธิบาย">
            <Input
              defaultValue={communityData ? communityData.description : ''}
              placeholder="ชื่อชุมชนความช่วยเหลือ"
              style={{ height: '40px', borderRadius: '12px' }}
            />
          </Form.Item>
          <Divider />
          <Text
            // fontSize={isMobile ? '24px' : '24px'}
            fontWeight={500}
            marginLeft={isSmallTablet ? 0 : '60px'}
            marginY={isMobile ? '30px' : '40px'}
            css={css`
              font-size: 2.8rem;
              margin-bottom: 35px;

              ${mediaQueryLargeDesktop} {
                margin-bottom: 15px;
                font-size: 20px;
              }
            `}
          >
            สถานที่ให้ความช่วยเหลือ
          </Text>

          <Form.Item name="location" label="สถานที่">
            <GoogleMapContent
              width="100%"
              height={isLargeDesktop ? '350px' : '460px'}
              requestLocation={{
                lat: communityData.location.latitude,
                lng: communityData.location.longitude
              }}
              setRequestLocation={setLocation}
            />
          </Form.Item>
        </div>
        <div
          css={css`
            // display: flex;
            // height: 100%;
            // flex-direction: column;
            // align-items: center;
            // width: 100%;
            // position: relative;

            // ${mediaQuerySmallTablet} {
            //   margin-bottom: 50px;
            // }

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
            alt="community pic"
            css={css`
              width: 120px;
              height: 120px;
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
            color="#848484"
            fontWeight={500}
            whiteSpace="pre"
            css={css`
              font-size: 1.5rem;

              ${mediaQueryLargeDesktop} {
                font-size: 14px;
              }
            `}
          >
            ขนาดไฟล์: สูงสุด 1 MB{'\n'}ไฟล์ที่รองรับ: .JPEG, .PNG
          </Text>
          {!isSmallTablet && (
            <div
              css={css`
                width: 100%;
                position: relative;
                height: 100%;
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
        {/* </Form.Item> */}
        {isSmallTablet && (
          <div
            css={css`
              width: 100%;
              position: relative;
              height: 100%;
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
                right: 44px;
                color: #ffff;
                font-size: 16px;
                position: absolute;
                bottom: -50px;

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
  );
};
