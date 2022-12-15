import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Vacation } from '@/store/reducers/vacations';
import Select from '@/components/userVacations/Select';
import useLanguage from '@/components/common/hooks/useLanguage';
import IndicatorConfirmed from '@/components/common/IndicatorConfirmed';
import IndicatorCancelled from '@/components/common/IndicatorCancelled';
import IndicatorPending from '@/components/common/IndicatorPending';

interface Props {
  vacation: Vacation;
}

const Item: React.FC<Props> = ({ vacation }) => {
  const startDate = moment(vacation.startDate).format('DD/MM/YYYY');
  const endDate = moment(vacation.endDate).format('DD/MM/YYYY');

  const [{ inputsPages }] = useLanguage();

  const getHeaderString = () => {
    const countDays = vacation.usedDays;

    if (countDays === 1) return `1 day, ${moment(vacation.startDate).format('MMM YYYY')}`;

    return `${countDays} days, ${moment(vacation.startDate).format('MMM YYYY')}`;
  };

  const getIcon = () => {
    switch (vacation.status) {
      case 'pending': {
        return <IndicatorPending />;
      }
      case 'approved': {
        return <IndicatorConfirmed />;
      }
      case 'rejected': {
        return <IndicatorCancelled />;
      }
      default: {
        return <IndicatorPending />;
      }
    }
  };

  return (
    <Select
      icon={getIcon()}
      title={getHeaderString()}
      selectContent={(
        <Wrapper>
          <ContentWrap>
            <Content>
              <Title>{inputsPages.vacation_start}</Title>
            </Content>
            <RightContent>
              <UnitText>{startDate}</UnitText>
            </RightContent>
          </ContentWrap>
          <ContentWrap>
            <Content>
              <Title>{inputsPages.vacation_end}</Title>
            </Content>
            <RightContent>
              <UnitText>{endDate}</UnitText>
            </RightContent>
          </ContentWrap>
          {Boolean(vacation.comment) && (
            <ContentWrap>
              <Content>
                <Title>{inputsPages.comment}</Title>
              </Content>
              <RightContent>
                <UnitText>{vacation.comment}</UnitText>
              </RightContent>
            </ContentWrap>
          )}
          <ContentWrap>
            <Content>
              <Title>{inputsPages.status}</Title>
            </Content>
            <RightContent>
              <UnitText>{vacation.status}</UnitText>
            </RightContent>
          </ContentWrap>
        </Wrapper>
      )}
    />
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 64px;
  background-color: rgba(255, 255, 255, 0);
`;

const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
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
