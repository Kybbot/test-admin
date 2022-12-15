import React from 'react';
import styled from 'styled-components';

const ComingSoon: React.FC = () => (
  <Wrap>
    <IconWrap src="/assets/clock-min.png" />
    <Title>text</Title>
    <Text>text</Text>
  </Wrap>
);

const IconWrap = styled.img`
  width: 64px;
  height: 84px;
  object-fit: contain;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
  margin: 8px 0;
  white-space: nowrap;
  width: 100%;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.3px;
  text-align: center;
  color: #909599;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default ComingSoon;
