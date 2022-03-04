/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Divider, Upload } from 'antd';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { observer } from 'mobx-react-lite';
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
import { InputForm } from 'components/Input/InputForm';
import DefaultImage from 'images/default.png';
import { useUpdateCommunity } from 'hooks/community/useUpdateCommunity';
import { useUploadCommunityImage } from 'hooks/community/useUploadCommunityImage';
import { useDisableCommunity } from 'hooks/community/useDisableCommunity';
import { logout } from 'features/logout/Logout';
import { userStore } from 'store/userStore';
import { PrimaryButton } from '../../components/Button/Button';

const CommunityEditProfileTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 20px;

  ${mediaQueryLargeDesktop} {
    margin-bottom: 30px;
    font-size: 20px;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
  }
`;

export const CommunitySettingEditProfile = observer(
  ({ communityData }: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState<string>(DefaultImage);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [location, setLocation] = useState<any>();

    const { execute: uploadCommunityImage } = useUploadCommunityImage();
    const { execute: updateCommunity } = useUpdateCommunity();
    const { execute: disableCommunity } = useDisableCommunity();

    const [form] = Form.useForm();
    const history = useHistory();
    const { me } = userStore;

    const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
    const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
    const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
    const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

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
        form.getFieldValue('communityCode') !==
          form.getFieldValue('confirmCode')
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
        location: {
          name: location
            ? location?.name ?? location.formatted_address
            : communityData.location.name,
          latitude: location
            ? location?.geometry.location.lat()
            : communityData.location.latitude,
          longitude: location
            ? location?.geometry.location.lng()
            : communityData.location.longitude
        }
      };

      try {
        console.log(value.image);
        if (value.image) {
          var formData = new FormData();
          formData.append('img', value.image.file.originFileObj);

          uploadCommunityImage(formData)
            .then((res) => {
              console.log(res);
              updateCommunity(communityData.communityId, {
                ...data,
                imageUrl: res.data
              }).catch((error) => {
                if (error.response.data === 'Unauthorized') {
                  logout();
                }
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          updateCommunity(communityData.communityId, data).catch((error) => {
            if (error.response.data === 'Unauthorized') {
              logout();
            }
          });
        }
      } catch (error) {
        message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
        console.log(error);
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
            margin-top: 0;
            padding: 20px 20px 30px 20px;
          }
        `}
      >
        <CommunityEditProfileTitle>
          ข้อมูลชุมชนความช่วยเหลือ
        </CommunityEditProfileTitle>
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
          `}
        >
          <div
            css={css`
              width: 100%;
            `}
          >
            <Form.Item name="communityName" label="ชื่อ">
              <InputForm
                defaultValue={communityData.communityName}
                placeholder="ชื่อชุมชนความช่วยเหลือ"
              />
            </Form.Item>
            <Form.Item name="description" label="คำอธิบาย">
              <InputForm
                defaultValue={communityData ? communityData.description : ''}
                placeholder="ชื่อชุมชนความช่วยเหลือ"
              />
            </Form.Item>
            <Divider />
            <CommunityEditProfileTitle>
              สถานที่ให้ความช่วยเหลือ
            </CommunityEditProfileTitle>

            <Form.Item name="location" label="สถานที่">
              <GoogleMapContent
                width="100%"
                height={isLargeDesktop ? '280px' : '350px'}
                requestLocation={{
                  lat: communityData.location.latitude,
                  lng: communityData.location.longitude
                }}
                setRequestLocation={setLocation}
              />
            </Form.Item>
            <div
              css={css`
                cursor: pointer;

                &:hover {
                  color: #ee6400;
                }
              `}
              onClick={() => {
                disableCommunity(communityData.communityId)
                  .then(() => {
                    message.success('ลบชุมชนความช่วยเหลือนี้สำเร็จ');
                    window.localStorage.removeItem('selectedCommunity');
                    history.push('/');
                  })
                  .catch((error) => {
                    if (error.response.data === 'Unauthorized') {
                      logout();
                    }
                    message.error('ลบชุมชนความช่วยเหลือนี้ไม่สำเร็จ');
                  });
              }}
            >
              ลบชุมชนความช่วยเหลือ
            </div>
            {isSmallTablet && (
              <div
                css={css`
                  width: 100%;
                  position: relative;
                  height: 100%;
                  bottom: 0;
                `}
              >
                <PrimaryButton
                  type="primary"
                  htmlType="submit"
                  css={css`
                    width: 100px;
                    min-width: 100px;
                    right: 44px;
                    position: absolute;
                    bottom: -50px;

                    ${mediaQueryTablet} {
                      right: 0;
                      bottom: 0px;
                    }

                    ${mediaQueryMobile} {
                      bottom: -50px;
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

              ${mediaQuerySmallTablet} {
                margin-bottom: 50px;
              }
            `}
          >
            <img
              src={imageUrl}
              alt="community pic"
              css={css`
                width: 100px;
                height: 100px;
                min-width: 100px;
                min-height: 100px;
                border-radius: 50%;
                margin-bottom: 25px;
                object-fit: cover;

                ${mediaQueryLargeDesktop} {
                  width: 85px;
                  height: 85px;
                  min-width: 85px;
                  min-height: 85px;
                }

                ${mediaQueryTablet} {
                  margin-top: 10px;
                  margin-bottom: 25px;
                }

                ${mediaQueryMobile} {
                  width: 75px;
                  height: 75px;
                  min-width: 75px;
                  min-height: 75px;
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
                line-height: 21px;

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
                  position: relative;
                  height: 100%;
                  bottom: 0px;
                `}
              >
                <PrimaryButton
                  type="primary"
                  htmlType="submit"
                  css={css`
                    width: 100px;
                    min-width: 100px;
                    right: 100px;
                    position: absolute;
                    bottom: 0;
                  `}
                >
                  สำเร็จ
                </PrimaryButton>
              </div>
            )}
          </div>
        </Form>
      </div>
    );
  }
);
