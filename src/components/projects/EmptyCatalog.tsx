import React from 'react';
import styled from 'styled-components';

interface Props {
  isAdmin: boolean;
  isArchive?: boolean;
}

const EmptyCatalog: React.FC<Props> = ({ isAdmin, isArchive = false }) => (
  <>
    {
      isAdmin && !isArchive && (
        <>
          <AddItem>Add project</AddItem>
          <ArrowTop src="/assets/arrow.png" />
        </>
      )
    }
    <EyesWrap>
      <Eyes src="/assets/eyes.png" />
    </EyesWrap>
    <NoItem>No projects</NoItem>
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
