import React from 'react';
import styled from 'styled-components';

import useLanguage from '@/components/common/hooks/useLanguage';

const EmptyCatalog: React.FC = () => {
  const [{ common }] = useLanguage();

  return (
    <>
      <EyesWrap>
        <Eyes src="/assets/eyes.png" />
      </EyesWrap>
      <NoItem>{common.no_actions}</NoItem>
    </>
  );
};

const NoItem = styled.div`
  font-size: 25px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const EyesWrap = styled.div`
  width: 62px;
  padding-top: 129px;
  margin: 0 auto 8px;
`;

const Eyes = styled.img`
  width: 62px;
  height: 80px;
  object-fit: contain;
  font-family: AppleColorEmoji;
  font-size: 64px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

export default EmptyCatalog;
