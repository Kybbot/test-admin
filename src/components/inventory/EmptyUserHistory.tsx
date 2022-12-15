import React from 'react';
import styled from 'styled-components';
import useLanguage from '../common/hooks/useLanguage';

const EmptyUserHistory: React.FC = () => {
  const [{ inputsPages }] = useLanguage();

  return (
    <>
      <Wrap>
        <EyesWrap>
          <Eyes src="/assets/eyes.png" />
        </EyesWrap>
        <NoItem>{inputsPages.no_item_history}</NoItem>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  padding-top: 129px;
`;

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

export default EmptyUserHistory;
