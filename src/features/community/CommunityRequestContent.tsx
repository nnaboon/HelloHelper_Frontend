/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { SUGGESTED_REQUEST_DATA } from 'data/request';
import { SuggestedRequestSection } from 'components/Card/SuggestedRequestCard';
import { Text } from 'components/Text';

const CommunityRequestSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

export const CommunityRequestContent = () => {
  return (
    <div>
      <Text fontSize="32px" fontWeight={500}>
        ความช่วยเหลือยอดนิยม
      </Text>
      <SuggestedRequestSection data={SUGGESTED_REQUEST_DATA} />
      <Text fontSize="32px" fontWeight={500}>
        Top 10 ความช่วยเหลือประจำสัปดาห์
      </Text>
      <SuggestedRequestSection data={SUGGESTED_REQUEST_DATA} />
      <Text fontSize="32px" fontWeight={500}>
        ความช่วยเหลือทั้งหมด
      </Text>
      <CommunityRequestSection>
        {SUGGESTED_REQUEST_DATA.map((items) => (
          <SuggestedRequestSection
            data={[items]}
            css={css`
              overflow: hidden !important;
            `}
          />
        ))}
      </CommunityRequestSection>
    </div>
  );
};
