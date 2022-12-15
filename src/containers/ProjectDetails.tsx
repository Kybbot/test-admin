import React, { SetStateAction, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import Linkify from 'react-linkify';

import {
  cleanProject, disconnectSlack, editProject,
  getProject,
  getProjectsHours,
  getProjectsTags,
  toggleProjectStatus,
} from '@/store/actions/projects';
import { cleanUsers, getUsersWithManagers } from '@/store/actions/users';
import { cleanCustomers } from '@/store/actions/customers';
import { cleanSickLeaves } from '@/store/actions/sick-leaves';
import { selectProject } from '@/store/selectors/projects';
import { selectRole } from '@/store/selectors/user';
import { selectHolidays } from '@/store/selectors/vacations';

import useLanguage from '@/components/common/hooks/useLanguage';
import ZapIcon from '@/components/common/icons/ZapIcon';
import useToggle from '@/components/common/hooks/useToggle';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import BackIcon from '@/components/common/icons/BackIcon';
import EditIcon from '@/components/common/icons/EditIcon';
import EyeIcon from '@/components/common/icons/EyeIcon';
import EyeOffIcon from '@/components/common/icons/EyeOffIcon';
import LoaderDots from '@/components/common/LoaderDots';
import Loader from '@/components/common/Loader';
import UsersCatalog from '@/components/projects/UsersCatalog';
import CustomersCatalog from '@/components/projects/CustomersCatalog';
import AddCustomerModal from '@/components/projects/AddCustomerModal';
import AddTeammateModal from '@/components/projects/AddTeammateModal';
import CreateReminder from '@/components/CreateReminder';
import RestoreIcon from '@/components/common/icons/RestoreIcon';
import ModalWindow from '@/components/projects/Modal';
import { SlackChannels, TeammateStatus } from '@/store/reducers/projects';
import ArchiveIcon from '@/components/common/icons/ArchiveIcon';
import VacationsCalendar from '@/components/calendar/VacationsCalendar';
import List from '@/components/List';
import SlackIcon from '@/components/common/icons/SlackIcon';

import { clearDateCalendar } from '@/store/actions/date';
import SlackModal from '@/components/projects/SlackModal';
import DeleteSlackModal from '@/components/projects/DeleteSlackModal';
import { getVacationsCalendar } from '@/store/actions/profile';
import { selectCombinedSickLeaves } from '@/store/selectors/sick-leaves';

interface Props extends RouteComponentProps<{ projectId: string }> {}

const ProjectDetails: React.FC<Props> = ({ match, history }) => {
  const { projectId: id } = match.params;
  const [isAddTeammateActive, toggleIsAddTeammateActive] = useToggle();
  const [isAddCustomerActive, toggleIsAddCustomerActive] = useToggle();
  const [isOpenDescription, toggleIsOpenDescription] = useToggle(true);
  const [isCreateReminderActive, toggleIsCreateReminderActive] = useToggle();
  const [isDeleteModalActive, toggleIsDeleteModalActive] = useToggle();
  const [isSlackModalActive, toggleIsSlackModalActive] = useToggle();
  const [isSlackActive, toggleIsSlackActive] = useToggle();
  const [isRestoreModalActive, toggleIsRestoreModalActive] = useToggle();
  const [{ mePage, inputsPages, common }] = useLanguage();
  const [active, setActive] = useState('');
  const [channelName, setChannelName] = useState('');

  const dispatch = useDispatch();
  const project = useSelector(selectProject);
  const role = useSelector(selectRole);
  const sickLeaves = useSelector(selectCombinedSickLeaves);
  const holidays = useSelector(selectHolidays);

  const isAdmin = role === 'admin';

  const activeUsers = project?.team
    .filter((item) => item.userInfo.status !== TeammateStatus.INACTIVE);
  const inactiveUsers = project?.team
    .filter((item) => item.userInfo.status === TeammateStatus.INACTIVE);

  const projectUsers = project?.team.map(({ user }) => user);

  const projectSickLeaves = sickLeaves?.filter((sickLeave) => (
    project?.team.some((teammate) => (
      teammate.user._id === sickLeave.userId
    ))));
  const projectVacations = project?.vacations.map(({
    userId, vacation,
  }) => ({ ...vacation, userId }));

  useEffect(() => {
    dispatch(getUsersWithManagers());
    dispatch(getProject(+id));
    dispatch(getProjectsTags());
    dispatch(getProjectsHours());
    dispatch(getVacationsCalendar());

    return () => {
      dispatch(cleanProject());
      dispatch(cleanUsers());
      dispatch(cleanCustomers());
      dispatch(cleanSickLeaves());
    };
  }, [id]);

  const handleGoBack = () => history.goBack();

  const handleDisconnect = () => {
    dispatch(disconnectSlack(+id));
    toggleIsSlackActive(false);
  };

  const sendSlackChannels = () => {
    if (active) {
      dispatch(editProject({ slackChannelId: active, slackChannelName: channelName }, +id));
    }
    toggleIsSlackModalActive(false);
  };
  const changeActive = (i: SetStateAction<any>) => {
    setActive(i);
  };
  const saveSlackInfo = (item:SlackChannels) => {
    changeActive(item.id);
    setChannelName(item.name);
  };

  useEffect(() => () => {
    dispatch(clearDateCalendar());
  }, []);

  const handleToggleStatus = () => {
    dispatch(toggleProjectStatus(project!._id, project!.isActive));
  };

  const hideSlackModal = () => {
    toggleIsSlackModalActive(false);
    setActive('');
  };

  const componentDecorator = (href: string, text: string, key:number) => (
    <a href={href} key={key} style={{ wordBreak: 'break-all' }} target="_blank" rel="noreferrer">
      {text}
    </a>
  );

  if (isAddTeammateActive) {
    return (
      <AddTeammateModal
        projectId={+id}
        hide={toggleIsAddTeammateActive}
        currentUsers={projectUsers!}
      />
    );
  }

  if (isAddCustomerActive) {
    return (
      <AddCustomerModal
        projectId={+id}
        hide={toggleIsAddCustomerActive}
        currentUsers={project?.customers!}
      />
    );
  }

  if (isCreateReminderActive) {
    return (
      <CreateReminder
        project={project!}
        hide={toggleIsCreateReminderActive}
      />
    );
  }

  return (
    <>
      <Header>
        <HeaderWrap>
          <HeaderSmallWrap>
            <TopButton onClick={handleGoBack}>
              <BackIcon />
            </TopButton>
            <AddItemsTitle>
              {
                !project
                  ? <LoaderDots />
                  : (
                    project.name
                  )
              }
            </AddItemsTitle>
          </HeaderSmallWrap>
          {
            isAdmin && (
              <HeaderRectangle to={`/edit-project/${id}`}>
                <HeaderEdit>
                  <EditIcon color="black" />
                </HeaderEdit>
              </HeaderRectangle>
            )
          }
        </HeaderWrap>
      </Header>
      <MainWrap focus className="scrollbar">
        {
          !project || !projectSickLeaves || !projectVacations
            ? <Loader />
            : (
              <>
                <SectionWrap>
                  <Tip spaceBetween style={{ marginTop: '30px' }}>
                    <SectionName>{mePage.customers}</SectionName>
                    {isAdmin && (
                      <PlusWrap onClick={toggleIsAddCustomerActive}>
                        <PlusIcon stroke="#909599" width="18px" height="18px" />
                      </PlusWrap>
                    )}
                  </Tip>
                  <CustomersCatalog
                    customers={project.customers!}
                    projectId={+id}
                    isAdmin={isAdmin}
                  />
                  <Details>
                    <TextWrap>
                      <DetailsText>{inputsPages.project_name}</DetailsText>
                      <DetailsSubText>{project.name}</DetailsSubText>
                    </TextWrap>
                    {
                    Boolean(project.startDate) && (
                      <TextWrap>
                        <DetailsText>{inputsPages.start_date}</DetailsText>
                        <DetailsSubText>{moment(project.startDate).format('DD/MM/YYYY')}</DetailsSubText>
                      </TextWrap>
                    )
                  }
                    {
                    Boolean(project.deadline) && (
                      <TextWrap>
                        <DetailsText>{inputsPages.deadline}</DetailsText>
                        <DetailsSubText>{moment(project.deadline).format('DD/MM/YYYY')}</DetailsSubText>
                      </TextWrap>
                    )
                  }
                    <TextWrap>
                      <DetailsText>{inputsPages.status}</DetailsText>
                      <DetailsSubText>{project.isActive ? 'active' : 'inactive'}</DetailsSubText>
                    </TextWrap>
                  </Details>
                </SectionWrap>
                {
                  Boolean(project.description) && (
                    <SectionWrap>
                      <Tip onClick={toggleIsOpenDescription} spaceBetween={false}>
                        <SectionName>{inputsPages.description}</SectionName>
                        {isOpenDescription ? <EyeOffIcon /> : <EyeIcon />}
                      </Tip>
                      <Description isOpenDescription={isOpenDescription}>
                        <Linkify componentDecorator={componentDecorator}>
                          {project.description}
                        </Linkify>
                      </Description>
                    </SectionWrap>
                  )
                }
                <SectionWrap>
                  <Tip spaceBetween>
                    <SectionName>{mePage.calendar}</SectionName>
                  </Tip>
                  <CalendarWrap>
                    <VacationsCalendar
                      tempDate={null}
                      setTempDate={() => null}
                      holidays={holidays}
                      // @ts-ignore
                      vacations={projectVacations}
                      sickLeaves={projectSickLeaves}
                      fromDate={false}
                      activeUsers={activeUsers!}
                    />
                  </CalendarWrap>
                </SectionWrap>
                {(Boolean(project.team.length) || isAdmin) && (
                  <SectionWrap>
                    <Tip spaceBetween>
                      <SectionName>{mePage.team}</SectionName>
                      {isAdmin && (
                        <PlusWrap onClick={toggleIsAddTeammateActive}>
                          <PlusIcon stroke="#909599" width="18px" height="18px" />
                        </PlusWrap>
                      )}
                    </Tip>
                    <UsersCatalog
                      team={activeUsers!}
                      projectId={+id}
                      isAdmin={isAdmin}
                    />
                    {Boolean(inactiveUsers?.length) && (
                      <>
                        <Empty />
                        <UsersCatalog
                          team={inactiveUsers!}
                          projectId={+id}
                          isAdmin={isAdmin}
                        />
                      </>
                    )}
                  </SectionWrap>
                )}
                {
                  // eslint-disable-next-line no-nested-ternary
                 isAdmin && !project.slackChannelName
                   ? (
                     <SlackButtonWrap onClick={() => toggleIsSlackModalActive(true)}>
                       <ItemInfo>
                         <LinkUser>
                           <ActionIconWrap>
                             <SlackIcon color="black" />
                           </ActionIconWrap>
                           <ActionNameItem isColor>{common.slack_bot}</ActionNameItem>
                         </LinkUser>
                       </ItemInfo>
                     </SlackButtonWrap>
                   )
                   : isAdmin ? (
                     <SlackButtonWrapActive onClick={() => toggleIsSlackActive(true)}>
                       <ItemInfo>
                         <LinkUser>
                           <ActionIconWrap>
                             <SlackIcon color="black" />
                           </ActionIconWrap>
                           <ActionNameItem isColor>
                             {common.slack_bot_connected}
                             {' '}
                             {project.slackChannelName}

                           </ActionNameItem>

                         </LinkUser>
                       </ItemInfo>
                     </SlackButtonWrapActive>
                   ) : null
                }
                {
                  isSlackActive
                  && (
                  <DeleteSlackModal
                    hideModal={toggleIsSlackActive}
                    disconnect={handleDisconnect}
                  />
                  )
                }
                {
                  isSlackModalActive && (
                  <SlackModal
                    active={active}
                    saveSlackInfo={saveSlackInfo}
                    sendSlackChannels={sendSlackChannels}
                    hideModal={hideSlackModal}
                  />
                  )
                }
                {
                  isAdmin && (
                    <SectionWrap>
                      <Tip spaceBetween={false}>
                        <SectionName>{mePage.other}</SectionName>
                      </Tip>
                      <List
                        leftIcon={<ZapIcon color="rgb(240, 158, 26)" />}
                        text={mePage.create_action}
                        variant={1}
                        onClick={() => toggleIsCreateReminderActive(true)}
                      />
                    </SectionWrap>
                  )
                }
                {project.isActive && isAdmin && (
                  <DeleteButton onClick={() => toggleIsDeleteModalActive(true)}>
                    <LinkIcon>
                      <ArchiveIcon color="#feaa22" />
                    </LinkIcon>
                    {inputsPages.toArchive}
                  </DeleteButton>
                )}
                {!project.isActive && isAdmin && (
                  <DeleteButton onClick={() => toggleIsRestoreModalActive(true)}>
                    <LinkIcon>
                      <RestoreIcon color="#feaa22" />
                    </LinkIcon>
                    {mePage.restore_project}
                  </DeleteButton>
                )}
                {isDeleteModalActive && (
                  <ModalWindow
                    text={inputsPages.toArchive}
                    hideModal={toggleIsDeleteModalActive}
                    handleConfirm={handleToggleStatus}
                  />
                )}
                {isRestoreModalActive && (
                  <ModalWindow
                    text={mePage.restore}
                    hideModal={toggleIsRestoreModalActive}
                    handleConfirm={handleToggleStatus}
                  />
                )}
              </>
            )
        }
      </MainWrap>
    </>
  );
};

const SlackButtonWrap = styled.div`
  padding: 0 10px 0 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  border-radius: 6px;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 25px;

`;

const SlackButtonWrapActive = styled.div`
  padding: 0 10px 0 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  border-radius: 6px;
  position: relative;
  text-decoration: none;
  margin-bottom: 25px;
  cursor: pointer;
`;

const ActionNameItem = styled.div<{isColor: boolean}>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: ${({ isColor }) => (isColor ? '#21272e' : '#fff')};
  word-break: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:first-letter {
    text-transform: capitalize;
  }


  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const ActionIconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 18px;
  margin-left: 10px;
`;
const CalendarWrap = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 0 20px;
`;

const MainWrap = styled.div<{focus: boolean}>`
  padding: 0 16px 52px;
  padding-bottom: ${({ focus }) => focus && '20px'};
  background: white;
  height: 100%;
  overflow-y: auto;
`;

const HeaderSmallWrap = styled.div`
  display: flex;
  align-items: center;
`;

const AddItemsTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  color: #21272e;
  margin-left: 25px;
  letter-spacing: 0.3px;
  white-space: nowrap;
`;

const TopButton = styled.div`
  color: black;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Header = styled.header`
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
  position: relative;
  z-index: 100;
  width: 100%;
`;

const HeaderWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  z-index: 120;
`;

const DetailsText = styled.p`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #787c80;
`;

const DetailsSubText = styled.p`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #21272e;
  text-transform: capitalize;
`;

const Details = styled.div`
  padding: 10px 16px;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  margin: 5px 0 30px 0;
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px;
`;

const HeaderRectangle = styled(Link)`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color:#21272e;
`;

const HeaderEdit = styled.div`
  width: 24px;
  height: 24px;
`;

const Tip = styled.div<{spaceBetween: boolean}>`
  display: flex;
  justify-content: ${({ spaceBetween }) => (spaceBetween ? 'space-between' : 'flex-start')};
  margin-bottom: 10px;
  align-items: center;
  user-select: none;
`;

const SectionWrap = styled.div`
  margin: 10px 0 32px;
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

const PlusWrap = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Empty = styled.div`
  width: 100%;
  height: 20px;
`;

const Description = styled.div<{isOpenDescription: boolean}>`
  position: relative;
  max-height: ${({ isOpenDescription }) => (isOpenDescription ? '95px' : 'auto')};
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  white-space: pre-line;
  overflow: hidden;

  &:before {
    display: ${({ isOpenDescription }) => (isOpenDescription ? 'block' : 'none')};
    content: '';
    width: 100%;
    height: 35px;
    left: 0;
    top: 60px;
    position: absolute;
    background: linear-gradient(#ffffff00 ,#ffffff);
  }
`;

const DeleteButton = styled.div`
  position: relative;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 15px 0 15px;
  color: #feaa22;
  user-select: none;
  cursor: pointer;
  align-items: center;
`;

const LinkIcon = styled.div`

  margin-right: 24px;
  height: 24px;
  width: 24px;
`;

export default ProjectDetails;
