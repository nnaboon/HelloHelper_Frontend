/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Divider } from 'antd';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { FormRule, getRule } from 'utils/form/getRule';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH,
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet
} from 'styles/variables';
import { useUpdateCommunity } from 'hooks/community/useUpdateCommunity';

export const CommunitySettingEditProfile = ({ communityData }: any) => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [location, setLocation] = useState<any>();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const { data: community, execute: updateCommunity } = useUpdateCommunity();

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
    console.log(location);
    const data = {
      communityName: value.communityName,
      description: value.description,
      communityCode: value.communityCode
        ? value.communityCode
        : communityData.communityCode,
      imageUrl: value.imageUrl ?? '',
      location: {
        name: location ? location?.name : communityData.location.name,
        lat: location
          ? location?.geometry.location.lat()
          : communityData.location.latitude,
        lng: location
          ? location?.geometry.location.lng()
          : communityData.location.longitude
      }
    };

    try {
      updateCommunity(communityData.communityId, data);
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
      message.success('สำเร็จ');
    }
  };

  // useEffect(() => {
  //   if (communityData) {
  //     setLocation(communityData.location);
  //   }
  // }, [communityData]);

  return (
    <div
      css={css`
        ${mediaQueryMobile} {
          padding: 20px 20px 30px 20px;
        }
      `}
    >
      <Text
        fontSize={isMobile ? '24px' : '28px'}
        marginY={isMobile ? '20px' : '40px'}
        marginLeft={isSmallTablet ? 0 : '60px'}
        fontWeight={500}
      >
        ข้อมูลชุมชนความช่วยเหลือ
      </Text>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          communityName: communityData.title,
          description: communityData.description,
          imageUrl: communityData.imageUrl,
          location: communityData.location
        }}
        css={css`
          height: 100vh;
          .ant-col-8 {
            ${mediaQuerySmallTablet} {
              max-width: 20%;
            }

            ${mediaQueryMobile} {
              max-width: 33.3333%;
            }
          }

          .ant-form-item-control-input {
            width: 460px;

            ${mediaQueryMobile} {
              width: 100%;
            }
          }

          ${mediaQueryTablet} {
            .ant-col-16 {
              max-width: 100%;
            }
          }
        `}
      >
        <Form.Item
          name="communityName"
          label="ชื่อ"
          // rules={[
          //   {
          //     // required: true,
          //     message: 'กรุณากรอกชื่อความช่วยเหลือที่คุณต้องการ'
          //   }
          // ]}
        >
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
          fontSize={isMobile ? '24px' : '28px'}
          fontWeight={500}
          marginLeft={isSmallTablet ? 0 : '60px'}
          marginY={isMobile ? '20px' : '40px'}
        >
          เปลี่ยนรหัสผ่าน
        </Text>
        <Form.Item
          name="code"
          label="รหัสผ่านปัจจุบัน"
          // rules={[
          //   {
          //     // required: true,
          //     message: 'กรุณากรอกรหัสผ่านปัจจุบัน'
          //   }
          // ]}
        >
          <Input
            placeholder="รหัสผ่านปัจจุบัน"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>{' '}
        <Form.Item
          name="communityCode"
          label="รหัสผ่านใหม่"
          // rules={[
          //   {
          //     // required: true,
          //     message: 'กรุณากรอกรหัสผ่านใหม่'
          //   }
          // ]}
        >
          <Input
            placeholder="รหัสผ่านใหม่"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>{' '}
        <Form.Item
          name="confirmCode"
          label="ยืนยันรหัสผ่านใหม่"
          normalize={(value) => value.trim()}
          rules={[
            { required: Boolean(form.getFieldValue('communityCode')) },
            // getRule(FormRule.REQUIRE, 'กรุณากรอกยืนยันรหัสผ่าน'),
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (value && getFieldValue('communityCode') !== value)
                  return Promise.reject('รหัสผ่านไม่ตรงกัน');
                return Promise.resolve();
              }
            })
          ]}
        >
          <Input
            placeholder="รหัสผ่านใหม่"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Divider />
        <Text
          fontSize={isMobile ? '24px' : '28px'}
          fontWeight={500}
          marginLeft={isSmallTablet ? 0 : '60px'}
          marginY={isMobile ? '30px' : '40px'}
        >
          สถานที่ให้ความช่วยเหลือ
        </Text>
        {/* <Form.Item
          name="location"
          // rules={[
          //   {
          //     // required: true,
          //     message: 'กรุณากรอกสถานที่ที่คุณสามารถให้ความช่วยเหลือได้'
          //   }
          // ]}
        > */}
        <Form.Item
          name="location"
          label="สถานที่"
          // rules={[
          //   {
          //     required: true,
          //     message: 'กรุณากรอกสถานที่ที่คุณสามารถให้ความช่วยเหลือได้'
          //   }
          // ]}
        >
          <GoogleMapContent
            width={isTablet ? '100%' : '470px'}
            requestLocation={communityData.location}
            setRequestLocation={setLocation}
          />
        </Form.Item>
        {/* </Form.Item> */}
        <div
          css={css`
            width: 100%;
            position: relative;
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
      </Form>
    </div>
  );
};
