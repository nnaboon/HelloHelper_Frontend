import { css, jsx, useTheme } from '@emotion/react'
import React from 'react';
import styled from '@emotion/styled';
import { REQUEST } from 'data/request';

const Card = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    padding: 50px;
    border-bottom: 1px solid rgb(239, 243, 244);
    background: #ffff;
`

export const RequestCard = () => {
    return (
        <div>
            {REQUEST.map(({ title, location }) => (
                <Card>
                    <div>{title}</div>
                    <div>{location.district}</div>                    
                </Card>

            ))}
        </div>
    )
}