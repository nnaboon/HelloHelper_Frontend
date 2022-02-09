/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, Upload, message } from 'antd';
import { CommunityType } from 'features/community/const';
import { useAddCommunity } from 'hooks/community/useAddCommunity';
import { useUpdateUser } from 'hooks/user/useUpdateUser';
import { observer } from 'mobx-react-lite';
import { userStore } from 'store/userStore';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { useUploadUserImage } from 'hooks/user/useUploadUserImage';
import DefaultImage from 'images/default.png';
import { mediaQueryMobile } from 'styles/variables';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';

interface CreateCommunityFormProps {
  setVisible: (visible: boolean) => void;
}

const CreateCommunityFormSection = styled.div`
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 100%;
`;

export const CreateCommunityForm = ({
  setVisible
}: CreateCommunityFormProps) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(DefaultImage);
  const [location, setLocation] = useState<any>();
  const { me } = userStore;
  const { data: response, execute: addCommunity } = useAddCommunity();
  const { execute: updateUser } = useUpdateUser();
  const { execute: uploadUserImage } = useUploadUserImage();

  const history = useHistory();

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

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      // communityCode: value.password,
      communityName: value.name,
      location: {
        name: location.name,
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng()
      },
      description: value.description,
      userId: me?.userId
    };

    try {
      var formData = new FormData();
      formData.append('img', value.image.file.originFileObj);

      uploadUserImage(formData).then((res) => {
        addCommunity({ ...data, imageUrl: res.data }).then((res) => {
          history.push(`/community/${res.data}`);
        });
      });
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      message.success('สำเร็จ');
      setIsSubmitting(false);
      setVisible(false);
    }
  };

  useEffect(() => {
    if (location) {
      form.setFieldsValue({
        location: location.formatted_address
      });
    }
  }, [form, location]);

  return (
    <CreateCommunityFormSection>
      <Text fontSize="24px" marginTop="10px">
        สร้างชุมชนความช่วยเหลือ
      </Text>
      <Text
        fontSize="16px"
        marginTop="10px"
        marginBottom="10px"
        fontWeight={500}
        color="#F86800"
      >
        คุณสามารถสร้างชุมชนความช่วยเหลือใหม่ได้แล้ว
      </Text>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        css={css`
          margin: 26px 0;

          .ant-form-item-control-input {
            width: 360px;
          }

          ${mediaQueryMobile} {
            .ant-form-item-control-input {
              width: 100%;
            }
          }
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          {' '}
          <img
            src={imageUrl}
            alt="user avatar"
            css={css`
              width: 100px;
              height: 100px;
              border-radius: 50%;
              margin-bottom: 15px;
              object-fit: cover;
            `}
          />
          <Form.Item name="image">
            <Upload
              name="avatar"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleChange}
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              `}
            >
              <Button icon={<UploadOutlined />}>เลือกรูป</Button>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'กรุณากำหนกชื่อชุมชนความช่วยเหลือ'
            }
          ]}
        >
          <Input
            placeholder="ชื่อขุมชนความช่วยเหลือ"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        {/* <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'กรุณากำหนดรหัสชุมชนความข่วยเหลือ'
            }
          ]}
        >
          <Input
            placeholder="รหัสขุมชนความช่วยเหลือ"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <ul style={{ color: '#939393' }}>
          <li>สามารถเป็น ภาษาอังกฤษ ตัวเลข และอักษรพิเศษ </li>
          <li>ห้ามมีเว้นวรรค</li>
        </ul> */}
        <Form.Item name="description">
          <Input
            placeholder="คำอธิบาย"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>{' '}
        <Form.Item
          name="location"
          rules={[
            {
              required: !location,
              message: 'กรุณากำหนดสถานที่ให้ความช่วยเหลือ'
            }
          ]}
        >
          <GoogleMapContent
            requestLocation={location}
            setRequestLocation={setLocation}
            width={'100%'}
          />
        </Form.Item>
        <div
          css={css`
            width: 100%;
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
              bottom: 0px;
              right: 40px;
              color: #ffff;
              font-size: 16px;
              position: absolute;

              &:hover {
                background: #ee6400;
              }
            `}
          >
            ตกลง
          </Button>
        </div>
      </Form>
    </CreateCommunityFormSection>
  );
};
