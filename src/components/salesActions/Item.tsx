/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { actionsActions, toggleReminderStatus } from '@/store/actions/actions';
import { selectUser } from '@/store/selectors/user';

import {
  ReminderAction,
  RepeatValue,
  SalesReminderAction,
  DeveloperReminderAction,
} from '@/store/reducers/actions';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import ProjectsIcon from '@/components/common/icons/navigation/projectsIcon';
import CheckBoxOnIcon from '@/components/common/icons/CheckBoxOnIcon';
import CheckBoxOffIcon from '@/components/common/icons/CheckBoxOffIcon';
import Edit2Icon from '@/components/common/icons/Edit2Icon';
import SignIcon from '@/components/common/icons/SignIcon';
// import { act } from 'react-dom/test-utils';
import getPhoto from '@/utils/getPhoto';
import { selectUsers } from '@/store/selectors/users';
import { selectProjects } from '@/store/selectors/projects';
import { selectCustomers } from '@/store/selectors/customers';

interface Props {
  action: ReminderAction | SalesReminderAction | DeveloperReminderAction;
  pageType: 'current' | 'future' | 'archived' | 'recurrent';
}

const Item: React.FC<Props> = ({
  pageType,
  action,
}) => {
  const dispatch = useDispatch();
  const admin = useSelector(selectUser);
  const history = useHistory();
  const users = useSelector(selectUsers);
  const projects = useSelector(selectProjects);
  const customers = useSelector(selectCustomers);

  const handleToggleReminderStatus = () => {
    dispatch(toggleReminderStatus(action!._id, action!.isRead, action.type, pageType));
  };

  const handleEditClick = () => {
    history.push(`/edit-action/sales/${action._id}`);
    dispatch(actionsActions.setAction(action));
  };

  const getItemDateString = (date: string) => {
    const diff = moment().startOf('day').diff(date, 'days');

    switch (diff) {
      case 0:
        return 'Today';
      case 1:
        return 'Yesterday';
      case -1:
        return 'Tomorrow';
      default: break;
    }

    if (diff < -1) return `In ${Math.abs(diff)} days, ${moment(date).format('Do MMMM')}`;

    return `${diff} days ago, ${moment(date).format('Do MMMM')}`;
  };

  return (
    <ItemWrap>
      <MessageWrap>
        <SubText>
          {action.message}
        </SubText>
      </MessageWrap>
      <Line style={{ marginLeft: '-10px' }} />
      <MiddleWrap>
        <SubTextDate>
          {getItemDateString(action.date)}
          <RepeatVal>
            {action.repeat !== RepeatValue.NEVER ? `, ${action.repeat}` : ''}
          </RepeatVal>
        </SubTextDate>
        <Buttons>
          {
            action.assign.includes(admin!._id) && (
              <MentionIcon><SignIcon color="rgb(180, 186, 191)" /></MentionIcon>
            )
          }
          <EditIconWrap onClick={handleEditClick}>
            <Edit2Icon />
          </EditIconWrap>
          {
            action!.isRead ? (
              <CheckBoxWrap onClick={handleToggleReminderStatus}>
                <CheckBoxOnIcon />
              </CheckBoxWrap>
            ) : (
              <CheckBoxWrap onClick={handleToggleReminderStatus}>
                <CheckBoxOffIcon />
              </CheckBoxWrap>
            )
          }
        </Buttons>
      </MiddleWrap>
      <BottomWrap>
        {action.userIds.map((u) => {
          const user = users?.find((us) => us._id === u);
          if (!user) return null;
          return (
            <KeyBox key={user._id}>
              <Line />
              <ItemInfo to={`/users/${user._id}`}>
                <LinkUser>
                  <Photo url={getPhoto(user.smallPhoto)} />
                  <TextWrap>
                    <NameItem isColor>
                      {user.name}
                    </NameItem>
                  </TextWrap>
                </LinkUser>
                <RightArrow>
                  <SmallArrowIcon />
                </RightArrow>
              </ItemInfo>
            </KeyBox>
          );
        })}
        {action.customerIds.map((c) => {
          const customer = customers?.find((cus) => cus._id === c);
          if (!customer) return null;
          return (
            <KeyBox key={customer._id}>
              <Line />
              <ItemInfo to={`/customers/${customer._id}`}>
                <LinkUser>
                  <Photo url={getPhoto(customer.photo)} />
                  <TextWrap>
                    <NameItem isColor>
                      {customer.name}
                    </NameItem>
                  </TextWrap>
                </LinkUser>
                <RightArrow>
                  <SmallArrowIcon />
                </RightArrow>
              </ItemInfo>
            </KeyBox>
          );
        })}
        {action.projectIds.map((projId) => {
          const project = projects?.find((p) => p._id === projId);
          if (!project) return null;
          return (
            <KeyBox key={project._id}>
              <Line />
              <ItemInfo to={`/projects/${project._id}`}>
                <LinkUser>
                  <ProjectIconWrap>
                    <ProjectsIcon color="#333" />
                  </ProjectIconWrap>
                  <TextWrap>
                    <NameItem isColor>
                      {project.name}
                    </NameItem>
                  </TextWrap>
                </LinkUser>
                <RightArrow>
                  <SmallArrowIcon />
                </RightArrow>
              </ItemInfo>
            </KeyBox>
          );
        })}
      </BottomWrap>
    </ItemWrap>
  );
};

const LinkUser = styled.div`
  display: flex;
  align-items: center;
`;

const ItemInfo = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 11px;
  cursor: pointer;
  padding: 6px 0px;
  padding-right: 10px;
  text-decoration: none;
  
  &:last-child {
    padding-bottom: 0px;
  }
`;

const NameItem = styled.div<{isColor: boolean}>`
  text-transform: capitalize;
  font-size: 13px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: ${({ isColor }) => (isColor ? '#21272e' : '#909599')};
  word-break: break-word;
  text-transform: capitalize;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;


  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const EditIconWrap = styled.div`
  display: block;
  width: 40px;
  height: 40px;
  padding: 8px;
  cursor: pointer;
`;

const ItemWrap = styled.div`
  position: relative;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  min-height: 61px;
  padding: 6px 10px;
  margin: 8px 16px;
`;

const BottomWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  user-select: none;
  flex-direction: column;
`;

const MessageWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 3px 0 8px 0;
`;

const MiddleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  user-select: none;
`;

const Photo = styled.div<{url: string}>`
  width: 28px;
  height: 28px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 10px;
  background-position: center;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubText = styled.p`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  white-space: pre-line;
`;

const SubTextDate = styled.p`
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;
`;

const RepeatVal = styled.span`
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;
  
  &::first-letter {
    text-transform: uppercase;
  }
`;

const CheckBoxWrap = styled.div`
  width: 40px;
  height: 40px;
  padding: 8px;
  cursor: pointer;
`;

const Line = styled.div`
  width: calc(100% + 20px); 
  height: 1px;
  background-color: #ebeced;
`;

const Buttons = styled.div`
  display: flex;
`;

const ProjectIconWrap = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 5px;
  border: 1.7px solid rgba(33, 39, 46, 0.08);
  font-size: 15px;
  font-weight: 600;
  background-color: #f0f1f2;
  margin-right: 10px;
  text-transform: uppercase;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  word-break: normal;
  padding: 3px;
`;

const RightArrow = styled.div`
  width: 16px;
  height: 16px;
  margin-bottom: 2px;
`;

const MentionIcon = styled.div`
  width: 40px;
  height: 40px;
  padding: 8px;
`;

const KeyBox = styled.div`
  width: 100%;
`;

export default Item;
