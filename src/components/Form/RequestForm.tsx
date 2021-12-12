/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Tooltip, Select, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { CATEGORY } from 'data/category';
import { RequestFormBody } from './const';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { InfoSvg } from 'components/Svg/InfoSvg';
import Flex from 'components/Flex/Flex';

const RegisterLocationFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 100%;
  overflow: scroll;
`;

export const RequestForm = () => {
  const [form] = Form.useForm();
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    console.log('s', location);
    form.setFieldsValue({
      location: location
    });
  }, [form, location]);

  const onFinish = async (value) => {
    console.log(value);
    setIsSubmitting(true);
    const data = {
      type: value.type,
      title: value.title,
      name: value.name,
      location: location ?? '',
      message: value.message ?? '',
      maxPrice: value.maxPrice,
      maxServiceCharge: value.maxServiceCharge,
      payment: value.payment,
      category: value.category,
      hashtag: value.hashtag,
      image: value.image
    } as RequestFormBody;

    try {
      console.log('data', data);
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <RegisterLocationFormSection>
      <Global
        styles={css`
          .ant-col-8 {
            max-width: 24%;
          }

          .ant-form-item-control-input-content {
            display: flex;
            align-items: center;
          }
          .ant-modal-body {
            height: 100%;
          }
        `}
      />
      <Text fontSize="24px" marginTop="10px" marginBottom="20px">
        ขอความช่วยเหลือ
      </Text>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        css={css`
          .ant-form-item-control-input {
            width: 460px;
          }
        `}
      >
        <Form.Item
          name="type"
          label="รูปแบบความช่วยเหลือ"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกรูปแบบความช่วยเหลือ'
            }
          ]}
        >
          <Select>
            <Select.Option value="provide">ให้ความช่วยเหลือ</Select.Option>
            <Select.Option value="request">ขอความช่วยเหลือ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="title"
          label="ชื่อ"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกชื่อความช่วยเหลือที่คุณต้องการ'
            }
          ]}
        >
          <Input
            placeholder="ชื่อ"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>

        <Form.Item
          name="location"
          label="สถานที่"
          rules={[
            {
              // required: true,
              message: 'กรุณากรอกสถานที่ที่คุณสามารถให้ความช่วยเหลือได้'
            }
          ]}
        >
          <GoogleMapContent setLocation={setLocation} />
        </Form.Item>
        <Form.Item name="message" label="ข้อความ">
          <Input.TextArea
            placeholder="ข้อความ"
            style={{ borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item
          name="maxPrice"
          label="ราคาสินค้าสูงสุด"
          rules={[
            {
              required: true,
              message: 'กรุณากำหนดขอบเขตราคาสินค้าสูงสุดที่คุณสามารถจ่ายได้'
            }
          ]}
        >
          <Input
            placeholder="ขอบเขตราคาสินค้า"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Flex justify="center" itemAlign="center">
          <Form.Item
            name="maxServiceCharge"
            label="อัตราค่าบริการสูงสุด"
            rules={[
              {
                required: true,
                message:
                  'กรุณากำหนดขอบเขตอัตราค่าบริการสูงสุดที่คุณสามารถจ่ายได้'
              }
            ]}
          >
            <Input
              placeholder="ขอบเขตราคาค่าบริการ"
              style={{ height: '40px', borderRadius: '12px' }}
            />
          </Form.Item>
          <Tooltip title="กำหนดราคาสูงสุดของความช่วยเหลือครั้งนี้ที่คุณพึงพอใจจะจ่าย ให้กับผู้ให้ความช่วยเหลือ">
            <InfoSvg
              css={css`
                margin-left: 10px;
                margin-top: -20px;
              `}
            />
          </Tooltip>
        </Flex>

        <Form.Item
          name="payment"
          label="วิธีการชำระเงิน"
          rules={[{ required: true, message: 'กรุณากรอกวิธีการชำระเงิน' }]}
        >
          <Input
            placeholder="วิธีการชำระเงิน"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item
          name="category"
          label="หมวดหมู่"
          rules={[
            { required: true, message: 'กรุณาเลือกหมวดหมู่ของความช่วยเหลือ' }
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
          >
            {CATEGORY.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="hashtag"
          label="แฮชแท็ก"
          rules={[{ required: true, message: 'กรุณากรอกแฮชแท็ก' }]}
        >
          <Input
            placeholder="แฮชแท็ก"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item
          name="image"
          label="รูปภาพ"
          rules={[{ required: true, message: 'กรุณากรอกแฮชแท็ก' }]}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
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

              &:hover {
                background: #ee6400;
              }
            `}
          >
            ขอความช่วยเหลือ
          </Button>
        </div>
      </Form>
    </RegisterLocationFormSection>
  );
};
