import styled from '@emotion/styled';
import { Text } from 'components/Text';
import React, { useState } from 'react';
import { HASHTAG } from 'data/hashtag';
import ContentImage from 'images/content_pic.jpg';
import { Modal, Button } from 'antd'

const TrendHashtagSection = styled.div`
    position: relative;
    height: calc( 100vh - 65px); 
    border-left: 1px solid rgb(239, 243, 244);
`;

const TrendHashtagContainer = styled.div`
    padding: 20px;
    width: 100%;
    min-width: 230px;
    background: rgb(239, 243, 244);
    margin-left: 30px;
    border-radius: 8px;
`;

const TrendHashtagName = styled.div`
    font-weight: 800;
    font-size: 20px;
`;

const TrendHashtagCount = styled.div`
    color: rgb(83, 100, 113);
`;

const TrendHashTagItem = styled.div`
    margin: 25px 0;
`;

const ContentContainer = styled.div`
    width: 100%;
    padding: 20px;
    background: yellow;
    margin-top: 20px;
    margin-left: 30px;
    border-radius: 8px;
`;

const ContentImageContainer = styled.img`
    width: 100%;
    height: 200px;
`;

const HelpButton = styled.button`
    background: purple;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 12px;
    padding: 12px;
    max-width: 95px;
    position: absolute;
    font-weight: 700;
    bottom: 40px;
    right: -69px;
`


export const TrendHashtag = () => {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
        console.log(visible)
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    
    return (
        <div>
            <TrendHashtagSection>
                <TrendHashtagContainer>
                    <Text fontWeight={800} fontSize="20px">Trend Hashtag</Text>
                    {HASHTAG.map(({ name, count }) => (
                        <TrendHashTagItem>
                            <TrendHashtagName>#{name}</TrendHashtagName>
                            <TrendHashtagCount>{count.toLocaleString()} help request</TrendHashtagCount>                            
                        </TrendHashTagItem>
                    ))}
                </TrendHashtagContainer>


                {/* <ContentContainer>
                    <ContentImageContainer
                        src={ContentImage}
                        alt="interest content"
                    />
                    <div>คอนเท้นน่าสนใจ</div>
                </ContentContainer> */}
                <HelpButton onClick={showModal}>click here</HelpButton>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                <p>{modalText}</p>
            </Modal>
            </TrendHashtagSection>
        </div>

    )
}