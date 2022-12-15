import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { RouteComponentProps } from 'react-router';

import { selectIsSaveLoading } from '@/store/selectors/reminders';
import { selectAction } from '@/store/selectors/actions';
import { selectUsers } from '@/store/selectors/users';
import { selectUser } from '@/store/selectors/user';
import { editReminder } from '@/store/actions/reminders';
import { getAction } from '@/store/actions/actions';
import { cleanUsers, getUsersWithManagers } from '@/store/actions/users';

import useToggle from '@/components/common/hooks/useToggle';
import { ActionType, RepeatValue } from '@/store/reducers/actions';
import { Customer } from '@/store/reducers/customers';
import { Project } from '@/store/reducers/projects';
import { User } from '@/store/reducers/user';

import UserPlusIcon from '@/components/common/icons/UserPlusIcon';
import useLanguage from '@/components/common/hooks/useLanguage';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useInput from '@/components/common/hooks/useInput';
import AddEntityModal from '@/components/teamActions/AddEntityModal';
import ReminderItem from '@/components/actions/ReminderItem';
import Calendar from '@/components/calendar/Calendar';
import Loader from '@/components/common/Loader';
import DropDownSelect from '@/components/DropDownSelect';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import AddMentionModal from '@/components/teamActions/AddMentionModal';

import getPhoto from '@/utils/getPhoto';
import getMomentSting from '@/utils/getMomentSting';
import { cleanCustomers, getCustomers } from '@/store/actions/customers';
import { cleanProjects, getProjects } from '@/store/actions/projects';
import { selectCustomers } from '@/store/selectors/customers';
import { selectProjects } from '@/store/selectors/projects';

interface Props extends RouteComponentProps<{ reminderId: string }> {}

const EditTeamReminder: React.FC<Props> = ({ match, history }) => {
  const { reminderId } = match.params;
  const date = moment();
  const [message, setMessage] = useInput('');
  const [tempDate, setTempDate] = useState<moment.Moment | null>(date);
  const [developers, setDevelopers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isAddEntityActive, toggleIsAddEntityActive] = useToggle();
  const [assign, setAssign] = useState<number[]>([]);
  const [repeat, setRepeat] = useState<RepeatValue>(RepeatValue.NEVER);
  const [isRead, setIsRead] = useState(false);
  const [isAddMentionActive, toggleIsAddMentionActive] = useToggle();

  const [{ inputsPages }] = useLanguage();

  const isSaveLoading = useSelector(selectIsSaveLoading);
  const action = useSelector(selectAction);
  const users = useSelector(selectUsers);
  const sProjects = useSelector(selectProjects);
  const sCustomers = useSelector(selectCustomers);
  const currentUser = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersWithManagers());
    dispatch(getCustomers());
    dispatch(getProjects());
    dispatch(getAction(+reminderId));
    return (() => {
      dispatch(cleanUsers());
      dispatch(cleanCustomers());
      dispatch(cleanProjects());
    });
  }, []);

  useEffect(() => {
    if (action && action.type === ActionType.TEAM) {
      if (users) {
        setDevelopers(users?.filter((u) => action.userIds.includes(u._id)));
      }
      if (sCustomers) {
        setCustomers(sCustomers.filter((c) => action.customerIds.includes(c._id)));
      }
      if (sProjects) {
        setProjects(sProjects.filter((p) => action.projectIds.includes(p._id)));
      }
      setMessage(action.message);
      setTempDate(moment(action.date));
      setAssign(action.assign);
      setIsRead(action.isRead);
      Object.values(RepeatValue).forEach((value) => {
        if (value === action.repeat) setRepeat(value);
      });
    }
  }, [action]);

  const handleSaveButtonClick = () => {
    const body = {
      notificationDate: getMomentSting(tempDate!),
      usersId: developers.map((dev) => dev._id),
      customersId: customers.map((cus) => cus._id),
      projectsId: projects.map((proj) => proj._id),
      message,
      assignId: assign,
      isRead,
      repeat,
    };
    dispatch(editReminder(body, +reminderId, ActionType.TEAM));

    history.goBack();
  };

  const isMessageEmpty = message.length === 0;
  const isDateEmpty = !tempDate;

  const isSaveButtonDisabled = (
    isMessageEmpty
    || isDateEmpty
  );

  const handleSetDate = (value: moment.Moment | null) => setTempDate(value);

  const handleGoBack = () => history.goBack();

  const handleDeleteDeveloper = (id: number) => {
    const result = developers.filter(({ _id }) => id !== _id);
    setDevelopers(result);
  };

  const handleDeleteCustomer = (id: number) => {
    const result = customers.filter(({ _id }) => id !== _id);
    setCustomers(result);
  };

  const handleDeleteProject = (id: number) => {
    const result = projects.filter(({ _id }) => id !== _id);
    setProjects(result);
  };

  const handleDeleteMention = (id: number) => {
    if (id === currentUser!._id) return;

    const updatedAssign = assign.includes(id)
      ? assign.filter((i) => i !== id) : [...assign, id];

    setAssign(updatedAssign);
  };

  if (isAddEntityActive) {
    return (
      <AddEntityModal
        customers={customers}
        projects={projects}
        developers={developers}
        setProjects={setProjects}
        setCustomers={setCustomers}
        setDevelopers={setDevelopers}
        hide={toggleIsAddEntityActive}
      />
    );
  }

  if (isAddMentionActive) {
    return (
      <AddMentionModal
        assign={assign}
        setAssign={setAssign}
        hide={toggleIsAddMentionActive}
      />
    );
  }
  const areEntitiesEmpty = !projects.length
    && !customers.length
    && !developers.length;

  return (
    <>
      <Header>
        <IconWrap onClick={handleGoBack}>
          <CloseIcon />
        </IconWrap>
        <Title>{inputsPages.edit_action}</Title>
      </Header>
      { !users ? (
        <Loader />
      ) : (
        <MainWrap className="scrollbar">
          <CalendarWrap>
            <Calendar
              tempDate={tempDate}
              setTempDate={handleSetDate}
              fromDate
            />
          </CalendarWrap>
          <InputWrap>
            <DropDownSelect
              value={repeat}
              setValue={setRepeat}
              text={inputsPages.repeat}
              values={Object.values(RepeatValue)}
            />
          </InputWrap>
          <InputWrap>
            <TextArea
              setDescription={setMessage}
              descriptionValue={message}
              name={inputsPages.message}
              classTracking="scrollbar"
            />
          </InputWrap>
          <SectionWrap>
            <Tip spaceBetween>
              <SectionName>{inputsPages.mention}</SectionName>
            </Tip>
            <MentionWrap>
              {
                users.filter(({ _id }) => assign.includes(_id))
                  .map((userItem) => (
                    <MentionItem
                      key={userItem._id}
                      onClick={() => handleDeleteMention(userItem._id)}
                      selected={assign.includes(userItem._id)}
                    >
                      <MentionPhoto url={getPhoto(userItem.smallPhoto)} />
                      <MentionName isColor>{userItem.name.split(' ')[0]}</MentionName>
                    </MentionItem>
                  ))
              }
              <ItemWrap onClick={toggleIsAddMentionActive}>
                <ItemInfo>
                  <LinkUser>
                    <ButtonIconWrap>
                      <UserPlusIcon />
                    </ButtonIconWrap>
                    <NameItem isColor>{inputsPages.assign_user}</NameItem>
                  </LinkUser>
                </ItemInfo>
              </ItemWrap>
            </MentionWrap>
          </SectionWrap>
          <ButtonsWrap>
            <ItemWrap onClick={toggleIsAddEntityActive}>
              <ItemInfo>
                <LinkUser>
                  <ButtonIconWrap>
                    <PlusIcon />
                  </ButtonIconWrap>
                  <NameItem isColor>{inputsPages.add_entity}</NameItem>
                </LinkUser>
              </ItemInfo>
            </ItemWrap>
          </ButtonsWrap>
          { !areEntitiesEmpty && (
            <SectionWrap>
              <Tip spaceBetween>
                <SectionName>{inputsPages.entities}</SectionName>
              </Tip>
              {developers.map(({ _id, smallPhoto, name }) => (
                <ReminderItem
                  key={_id}
                  text={name}
                  smallPhoto={getPhoto(smallPhoto)}
                  deleteHandle={() => handleDeleteDeveloper(_id)}
                />
              ))}
              {projects.map(({ _id, name }) => (
                <ReminderItem
                  key={_id}
                  text={name}
                  deleteHandle={() => handleDeleteProject(_id)}
                />
              ))}
              {customers.map(({ _id, smallPhoto, name }) => (
                <ReminderItem
                  key={_id}
                  text={name}
                  smallPhoto={getPhoto(smallPhoto)}
                  deleteHandle={() => handleDeleteCustomer(_id)}
                />
              ))}
            </SectionWrap>
          )}
          <ButtonWrap>
            <Button
              onClick={handleSaveButtonClick}
              isLoading={isSaveLoading}
              disabledOnly={isSaveButtonDisabled}
              shadow
              isFixed={false}
            >
              {inputsPages.save_changes}
            </Button>
          </ButtonWrap>
        </MainWrap>
      )}
    </>
  );
};

const Header = styled.header`
  height: 72px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  position: relative;
  max-width: 552px;
  width: 100%;
  z-index: 99;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const IconWrap = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 24px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 28px 16px 16px;
  overflow-y: auto;
  background: white;
`;

const InputWrap = styled.div`
  font-weight: 400 !important;
  margin-bottom: 40px;
  width: 100%;
`;

const CalendarWrap = styled.div`
  height: 300px;
  width: 100%;
  margin: 15px 0 30px;
`;

const ButtonWrap = styled.div`
  width: 100%;
`;

const SectionName = styled.div`
  margin-right: 10px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.3px;
  color: #909599;
  white-space: nowrap;
`;

const Tip = styled.div<{spaceBetween: boolean}>`
  display: flex;
  justify-content: ${({ spaceBetween }) => (spaceBetween ? 'space-between' : 'flex-start')};
  margin-bottom: 10px;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const SectionWrap = styled.div`
  margin: 10px 0 32px;
  width: 100%;
`;

const MentionPhoto = styled.div<{url: string}>`
  width: 43px;
  height: 43px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 10px;
  background-position: center;
`;

const MentionName = styled.div<{isColor: boolean}>`
  font-size: 14px;
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

const MentionItem = styled.div<{selected: boolean}>`
  width: 100%;
  padding: 8px 10px;
  margin: 4px 0;
  display: flex;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#3897ff40' : 'rgb(240 241 242 / 27%)')};
  border: ${({ selected }) => (selected ? '1px solid #3897ff' : 'solid 1px rgba(33, 39, 46, 0.12)')};
  flex-shrink: 0;
`;

const MentionWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ItemInfo = styled.div`
  width: 100%;
`;

const NameItem = styled.div<{isColor: boolean}>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: ${({ isColor }) => (isColor ? '#21272e' : '#909599')};
  word-break: break-word;
  
  &:first-letter {
    text-transform: uppercase;
  }

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

const ItemWrap = styled.div`
  width: 100%;
  padding: 0 10px 0 10px;
  height: 50px;
  margin: 4px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  position: relative;
  text-decoration: none;
  cursor: pointer;
`;

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const ButtonsWrap = styled.div`
  margin: 10px 0 32px;
  width: 100%;
`;

const ButtonIconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 17px;
  margin-left: 12px;
`;

export default EditTeamReminder;
