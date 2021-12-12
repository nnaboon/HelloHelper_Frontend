/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';
import { POPULAR_REQUEST_DATA } from 'data/helper';
import { Text } from 'components/Text';

const CommunityProvideSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

export const CommunityProvideContent = () => {
  return (
    <div>
      <Text fontSize="32px" fontWeight={500}>
        ความช่วยเหลือยอดนิยม
      </Text>
      <PopularRequestSection data={POPULAR_REQUEST_DATA} />
      <Text fontSize="32px" fontWeight={500}>
        Top 10 ความช่วยเหลือประจำสัปดาห์
      </Text>
      <PopularRequestSection data={POPULAR_REQUEST_DATA} />
      <Text fontSize="32px" fontWeight={500}>
        ความช่วยเหลือทั้งหมด
      </Text>
      <CommunityProvideSection>
        {POPULAR_REQUEST_DATA.map((items) => (
          <PopularRequestSection
            data={[items]}
            css={css`
              overflow: hidden !important;
            `}
          />
        ))}
      </CommunityProvideSection>
    </div>
  );
};
