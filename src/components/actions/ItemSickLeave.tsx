import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';

import { viewSickLeave } from '@/store/actions/sick-leaves';

import useLanguage from '@/components/common/hooks/useLanguage';
import { SickLeave } from '@/store/reducers/sick-leaves';
import Select from '@/components/vacations/Select';
import getPhoto from '@/utils/getPhoto';
import { selectUsers } from '@/store/selectors/users';

interface Props {
  sickLeave: SickLeave;
}

const ItemVacation: React.FC<Props> = ({
  sickLeave,
}) => {
  const users = useSelector(selectUsers);
  const { userId } = sickLeave;
  const user = users?.find((u) => u._id === userId);

  const dispatch = useDispatch();

  const [{ common, inputsPages }] = useLanguage();

  if (!user) return null;

  const handleUserClick = () => {
    dispatch(push(`/users/${user._id}`));
  };

  const handleApprove = () => {
    dispatch(dispatch(viewSickLeave(sickLeave._id)));
  };

  return (
    <Select
      photo={getPhoto(user.smallPhoto)}
      title={user.name}
      text="Took sick leave"
      isSelectOpen
      withButton={false}
      userClick={handleUserClick}
      selectContent={(
        <Wrapper>
          <ContentWrap>
            <Content>
              <Title>{inputsPages.date}</Title>
            </Content>
            <RightContent>
              <UnitText>{moment(sickLeave.date).format('DD/MM/YYYY')}</UnitText>
            </RightContent>
          </ContentWrap>
          <ContentWrap>
            <Content>
              <Title>{inputsPages.comment}</Title>
            </Content>
            <RightContent>
              <UnitText>{sickLeave.comment}</UnitText>
            </RightContent>
          </ContentWrap>
          <Line />
          <ButtonsWrap>
            <Button onClick={handleApprove}>
              OK
            </Button>
          </ButtonsWrap>
        </Wrapper>
      )}
    />
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 64px;
  margin-top: -10px;
  background-color: rgba(255, 255, 255, 0);
`;

const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px 0px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 10px;
  justify-content: center;
  margin-top: 0;
`;

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 6px;
`;

const Button = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: rgb(56, 151, 255);
  text-transform: uppercase;
  margin-left: 20px;
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

const Line = styled.div`
  width: calc(100% + 20px);
  height: 1px;
  background-color: #ebeced;
  margin-left: -10px;
`;

export default ItemVacation;
