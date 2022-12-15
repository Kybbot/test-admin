import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Overtime } from '@/store/reducers/vacations';
import Select from '@/components/userOvertimes/Select';
import ClockIcon from '@/components/СlockIcon';
import useLanguage from '@/components/common/hooks/useLanguage';

interface Props {
  overtime: Overtime;
}

const Item: React.FC<Props> = ({ overtime }) => {
  const getOvertimeString = () => moment(overtime.date).format('Do, MMM YYYY');

  const [{ inputsPages }] = useLanguage();

  return (
    <Select
      icon={<ClockIcon color="#6faaa1" />}
      title={getOvertimeString()}
      selectContent={(
        <Wrapper>
          {
            Boolean(overtime.comment)
            && (
              <ContentWrap>
                <Content>
                  <Title>{inputsPages.comment}</Title>
                </Content>
                <RightContent>
                  <UnitText>{overtime.comment}</UnitText>
                </RightContent>
              </ContentWrap>
            )
          }
        </Wrapper>
      )}
    />
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 30px;
  background-color: rgba(255, 255, 255, 0);
`;

const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 10px;
  justify-content: center;
  margin-top: 0;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-top: 10px;
  justify-content: center;
  margin-top: 0;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
  text-transform: capitalize;

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const UnitText = styled.span`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  text-transform: capitalize;
`;

export default Item;
