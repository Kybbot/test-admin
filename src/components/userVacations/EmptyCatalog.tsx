import React from 'react';
import styled from 'styled-components';

interface Props {
  isAdmin: boolean;
  availableDays: number;
}

const EmptyCatalog: React.FC<Props> = ({ isAdmin, availableDays }) => (
  <>
    {
      !isAdmin && (
        <>
          <AddItem>Request vacation</AddItem>
          <ArrowTop src="/assets/arrow.png" />
        </>
      )
    }
    <EyesWrap>
      <Eyes src="/assets/eyes.png" />
    </EyesWrap>
    <NoItem>No vacations</NoItem>
    {
      !isAdmin && (
        <Text>{`You have ${availableDays} available days`}</Text>
      )
    }
  </>
);

const AddItem = styled.div`
  font-family: HandOfSeanDemo;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #787c80;
  position: absolute;
  top: 27px;
  right: 84px;
  z-index: 20;
`;

const ArrowTop = styled.img`
  width: 110px;
  height: 65px;
  object-fit: contain;
  transform: rotate(1deg);
  position: absolute;
  top: 21px;
  right: 49px;
  z-index: 10;
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
  margin-bottom: 10px;
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

const Text = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  color: #909599;
  white-space: nowrap;
  text-align: center;
`;

export default EmptyCatalog;
