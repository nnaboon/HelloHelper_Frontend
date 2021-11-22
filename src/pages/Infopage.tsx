/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react'
import { Navbar } from 'components/Navbar/Navbar';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { Divider } from 'components/Divider/Divider';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { HelperListCard } from 'components/Card/HelperListCard';
import { SmallSuggestRequestCard } from 'components/Card/SmallSuggestRequestCard';

const RequestImage = styled.img`
    width: 420px;
    height: 510px;
    background: yellow;
    margin-bottom: 20px;
`;

const RequestCategoryButton = styled(PrimaryButton)`
    width: max-content;
    min-width: 140px;
    padding: 10px 15px;
    height: 40px;
    margin: 10px 8px 10px 0px;
`;

const RequestHashtagButton = styled(SecondaryButton)`
    width: max-content;
    min-width: 80px;
    padding: 10px 15px;
    height: 40px;
    margin: 10px 8px 10px 0px;
`;

const RequestInfoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
    margin-bottom: 60px;
`;

const RequestDetail = styled.div`
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #000000;
    min-width: 200px;
`;

const RequestTitle = styled.div`
    font-size: 14px;
    line-height: 26px;
    color: #CACACA;
    min-width: 90px;
`;

export const InfoPage = () => {
    return (
        <React.Fragment>
            <Navbar />
            <WrapperContainer>
                <div style={{ display: 'flex', justifyContent: 'space-around'}}>
                    <Flex direction="column" justify="flex-start" itemAlign="flex-start" style={{ width: 'unset'}}>
                        <RequestImage />
                        <Flex
                            css={css`
                                width: 600px;
                                flex-wrap: wrap;
                            `}
                        >
                            <RequestCategoryButton>อุปกรณ์ทำผม</RequestCategoryButton>
                        </Flex>
                        <Flex
                            css={css`
                                width: 600px;
                                flex-wrap: wrap;
                            `}
                        >
                            <RequestHashtagButton>#wax</RequestHashtagButton>
                            <RequestHashtagButton>#wax</RequestHashtagButton>
                            <RequestHashtagButton>#wax</RequestHashtagButton>
                            <RequestHashtagButton>#wax</RequestHashtagButton>
                            <RequestHashtagButton>#wax</RequestHashtagButton>
                            <RequestHashtagButton>#wax</RequestHashtagButton>
                            <RequestHashtagButton>#wax</RequestHashtagButton>
                            <RequestHashtagButton>#wax</RequestHashtagButton>
                            <RequestHashtagButton>#wax</RequestHashtagButton>
                            <RequestHashtagButton>#wax</RequestHashtagButton>
                            <RequestHashtagButton>#wax</RequestHashtagButton>
                            <RequestHashtagButton>#wax</RequestHashtagButton> 
                        </Flex>

                    </Flex>
                    <Flex direction="column" marginTop="80px" style={{ width: 'unset'}}>
                        <RequestInfoContainer>
                            <RequestTitle>Q</RequestTitle>
                            <RequestDetail>A</RequestDetail>                                
                            <RequestTitle>Q</RequestTitle>
                            <RequestDetail>A</RequestDetail>                                
                            <RequestTitle>Q</RequestTitle>
                            <RequestDetail>A</RequestDetail>                                
                        </RequestInfoContainer>
                        <PrimaryButton
                            style={{ width: '100%', maxWidth: '400px'}}
                        >สนใจให้ความช่วยเหลือ</PrimaryButton>
                    </Flex>
                </div>
                <Divider />
                <Text fontSize="24px" fontWeight={400}>รายชื่อผู้ต้องการช่วยเหลือ</Text>
                <Flex justify="flex-start" itemAlign="flex-start">
                    <div style={{ display: 'flex', flexDirection:'column' ,justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', marginTop: '40px'}}>
                        <HelperListCard
                            id="dsfa"
                            name="ทอง ดี ฟัน ขาว"
                            imageUrl=""
                        />
                        <HelperListCard
                            id="dsfa"
                            name="ทอง ดี ฟัน ขาว"
                            imageUrl=""
                        />
                        <HelperListCard
                            id="dsfa"
                            name="ทอง ดี ฟัน ขาว"
                            imageUrl=""
                        />
                    </div>
                    <Flex direction="column" itemAlign="flex-end">
                        <SmallSuggestRequestCard />
                        <SmallSuggestRequestCard />
                    </Flex>
                </Flex>
            </WrapperContainer>            
        </React.Fragment>

    );
}