import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import moment from 'moment';

import { getMe, logout } from '@/store/actions/login';
import {
  changeWorkload, cleanUsers, getUsersWithManagers, goToTelegram,
} from '@/store/actions/users';
import { panic, money } from '@/store/actions/actions';
import { takeSickLeave } from '@/store/actions/sick-leaves';
import {
  clearCalendarVacations,
  getMyInventory,
  getMyProject,
  getVacationsCalendar,
} from '@/store/actions/profile';
import {
  selectCombinedVacationsCalendar,
  selectMyInventory,
  selectMyProjects,
  selectVacationsCalendar,
} from '@/store/selectors/profile';
import { selectRole, selectUser } from '@/store/selectors/user';
import { selectHolidays } from '@/store/selectors/vacations';
import { selectCombinedSickLeaves, selectSickLeaves } from '@/store/selectors/sick-leaves';

import useToggle from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';

import SelectedCalendarIcon from '@/components/common/icons/navigation/selectedDashboardIcon';
import ChangeLanguageIcon from '@/components/common/icons/ChangeLanguageIcon';
import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import ChangePasswordIcon from '@/components/common/icons/ChangePasswordIcon';
import ProjectsIcon from '@/components/common/icons/navigation/projectsIcon';
import ItemsIcon from '@/components/common/icons/ItemsIcon';
import UsersIcon from '@/components/common/icons/usersIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import LogOutIcon from '@/components/common/icons/LogOutIcon';
import CheckIcon from '@/components/common/icons/CheckIcon';
import EditIcon from '@/components/common/icons/EditIcon';
import Dribble from '@/components/common/icons/Dribble';
import EyeOffIcon from '@/components/common/icons/EyeOffIcon';
import BookIcon from '@/components/common/icons/BookIcon';
import EyeIcon from '@/components/common/icons/EyeIcon';
import CopyIcon from '@/components/common/icons/CopyIcon';
import CashIcon from '@/components/common/icons/CashIcon';
import DashboardIcon from '@/components/common/icons/DashboardIcon';
import TelegramIcon from '@/components/common/icons/TelegramIcon';
import LoaderDots from '@/components/common/LoaderDots';
import ModalLogOut from '@/components/users/ModalLogOut';
import Loader from '@/components/common/Loader';
import ProjectsCatalog from '@/components/userProjects/Catalog';
import WorkloadPanel from '@/components/users/WorkloadPanel';
import InventoryItem from '@/components/users/InventoryItem';
import TokensLocalStorage from '@/utils/local-storage/TokensLocalStorage';
import ZapIcon from '@/components/common/icons/ZapIcon';
import TagIcon from '@/components/common/icons/TagIcon';
import AlertIcon from '@/components/common/icons/AlertIcon';
import PillIcon from '@/components/common/icons/PillIcon';
import ModalSickLeave from '@/components/users/ModalTakeSickLieve';
import Navigation from '@/components/Navigation';
import MyToast from '@/components/Toast';
import List from '@/components/List';
import Icon from '@/components/Icon';
import getPhoto from '@/utils/getPhoto';
import VacationsCalendar from '@/components/calendar/VacationsCalendar';
import { selectUsers } from '@/store/selectors/users';
import Empty from '@/components/Empty';

interface Props extends RouteComponentProps{}

const Me: React.FC<Props> = ({ history }) => {
  const [isActiveModal, setIsActiveModal] = useToggle();
  const [isActiveModalFuck, setIsActiveModalFuck] = useToggle();
  const [isActiveModalMoney, setIsActiveModalMoney] = useToggle();
  const [isActiveModalSick, setIsActiveModalSick] = useToggle();
  const [isActiveToastSick, setIsActiveToastSick] = useToggle();
  const [isOpenInfo, toggleIsOpenInfo] = useToggle();
  const [copySuccess, toggleIsCopySuccess] = useToggle();
  const [isShowAllProjects, toggleIsShowAllProjects] = useToggle();

  const [{ mePage, common }] = useLanguage();
  const vacations = useSelector(selectVacationsCalendar);
  const combinedVacations = useSelector(selectCombinedVacationsCalendar);
  const dispatch = useDispatch();
  const projects = useSelector(selectMyProjects);
  const user = useSelector(selectUser);
  const users = useSelector(selectUsers);
  const role = useSelector(selectRole);
  const items = useSelector(selectMyInventory);
  const sickLeaves = useSelector(selectSickLeaves);
  const combinedSickLeaves = useSelector(selectCombinedSickLeaves);
  const holidays = useSelector(selectHolidays);
  const activeProjects = projects?.filter((project) => project?.isActive);
  const inactiveProjects = projects?.filter((project) => !project?.isActive);

  const isAdmin = role === 'admin';
  const userSickLeaves = sickLeaves?.filter((sickUser) => sickUser.userId === user?._id!)
    .sort(({ date: a }, { date: b }) => moment(a).valueOf() - moment(b).valueOf());

  const lastUserSickLeave = userSickLeaves ? userSickLeaves[0] : null;

  const wasSickLeaveYesterday = lastUserSickLeave
    ? moment().subtract(1, 'day').isSame(moment(lastUserSickLeave.date), 'day')
    : false;

  const isSickLeaveToday = lastUserSickLeave
    ? moment().isSame(moment(lastUserSickLeave.date), 'day')
    : false;

  useEffect(() => {
    dispatch(getVacationsCalendar());
    dispatch(getUsersWithManagers());
    if (user) {
      dispatch(getMyProject());
      dispatch(getMyInventory());
    } else {
      dispatch(getMe());
    }
    return () => {
      dispatch(clearCalendarVacations());
      dispatch(cleanUsers());
    };
  }, []);

  const handleLogOut = () => {
    dispatch(logout());
  };

  const copyAccessToken = () => {
    const storage = TokensLocalStorage.getInstance();
    const token = storage.getAccessToken();

    if (navigator?.clipboard) {
      navigator.clipboard.writeText(token!);
    }

    toggleIsCopySuccess(true);
  };

  const handlePanic = () => {
    dispatch(panic());
    setIsActiveModalFuck(true);
  };

  const handleTakeSickLeave = (comment: string) => {
    dispatch(takeSickLeave(comment));
    setIsActiveToastSick(true);
  };

  const handleExtendSickLeave = () => {
    dispatch(takeSickLeave(lastUserSickLeave!.comment));
    setIsActiveToastSick(true);
  };

  const handleMoney = () => {
    dispatch(money());
    setIsActiveModalMoney(true);
  };

  const handleGoToUserVacations = () => history.push(`/users/vacations/${user?._id}`);
  const handleGoToUsersVacations = () => history.push('/vacations');
  const handleGoToChangePassword = () => history.push('/change-password');
  const handleGoToChangeLanguage = () => history.push('/change-language');
  const handleGoToTakeVacation = () => history.push(`/request-vacation/${user?._id}`);

  const handleChangeWorkload = (workload: number) => {
    dispatch(changeWorkload(workload));
  };

  const handleGoToTelegram = () => {
    dispatch(goToTelegram());
  };

  return (
    <>
      {
        !user
        || !items
        || !projects
        || !activeProjects
        || !inactiveProjects
        || !vacations
        || !sickLeaves
        || !combinedSickLeaves
        || !combinedVacations
        || !users
          ? <Loader />
          : (
            <>
              <ScrollbarWrapper className="scrollbar">
                <Header>
                  <HeaderWrap>
                    <HeaderSmallWrap>
                      <AddItemsTitle>
                        {mePage.welcome}
                        ,
                      </AddItemsTitle>
                      <AddItemsTitle>
                        {
                        !user?.name
                          ? <LoaderDots />
                          : (
                            user.name.split(' ')[0]
                          )
                      }
                      </AddItemsTitle>
                    </HeaderSmallWrap>
                    <UserPhoto to={`/edit-me/${user?._id}`} photo={getPhoto(user.smallPhoto)} />
                    <HeaderRectangle to={`/edit-me/${user?._id}`}>
                      <HeaderEdit>
                        <EditIcon color="black" />
                      </HeaderEdit>
                    </HeaderRectangle>
                  </HeaderWrap>
                </Header>
                <MainWrap focus>
                  {!user.telegramId && (
                  <SectionWrap>
                    <ActionButtonWrap style={{
                      backgroundColor: 'rgb(56,151,255,0.05)', border: 'solid 1px #3897ff', margin: '0 0 5px 0', cursor: 'unset',
                    }}
                    >
                      <ItemInfo>
                        <LinkUser>
                          <ActionIconWrap>
                            <AlertIcon color="#3897ff" />
                          </ActionIconWrap>
                          <ActionNameItem isColor>{common.informationWarning}</ActionNameItem>
                        </LinkUser>
                      </ItemInfo>
                    </ActionButtonWrap>
                    <ActionButtonWrap onClick={handleGoToTelegram}>
                      <ItemInfo>
                        <LinkUser>
                          <ActionIconWrap>
                            <TelegramIcon color="black" />
                          </ActionIconWrap>
                          <ActionNameItem isColor>{common.connectTelegram}</ActionNameItem>
                        </LinkUser>
                      </ItemInfo>
                    </ActionButtonWrap>
                  </SectionWrap>
                  )}
                  { !isAdmin && (
                  <SectionWrap>
                    <Tip onClick={toggleIsOpenInfo} spaceBetween={false}>
                      <SectionName>{mePage.info}</SectionName>
                      {isOpenInfo ? <EyeIcon /> : <EyeOffIcon />}
                    </Tip>
                    {
                    isOpenInfo && (
                      <Details>
                        <TextWrap>
                          <DetailsText>{mePage.role}</DetailsText>
                          <DetailsSubText>{user.role}</DetailsSubText>
                        </TextWrap>
                        {
                          Boolean(user.birthday)
                          && (
                            <TextWrap>
                              <DetailsText>{mePage.birthday}</DetailsText>
                              <DetailsSubText>{moment(user.birthday).format('DD/MM/YYYY')}</DetailsSubText>
                            </TextWrap>
                          )
                        }
                        {
                          Boolean(user.english)
                          && (
                            <TextWrap>
                              <DetailsText>{mePage.english}</DetailsText>
                              <DetailsSubText>{user.english}</DetailsSubText>
                            </TextWrap>
                          )
                        }
                        {
                          Boolean(user.email)
                          && (
                            <TextWrap>
                              <DetailsText>{mePage.email}</DetailsText>
                              <DetailsSubText style={{ textTransform: 'lowercase', userSelect: 'all' }}>{user.email}</DetailsSubText>
                            </TextWrap>
                          )
                        }
                      </Details>
                    )
                  }
                  </SectionWrap>
                  )}
                  { !isAdmin && (
                  <SectionWrap style={{ margin: '10px -5px 32px' }}>
                    {
                      user.tags?.map((tag) => (
                        <TagItem key={tag}>
                          <CheckIconWrap>
                            <CheckIcon color="#188038" />
                          </CheckIconWrap>
                          {tag}
                        </TagItem>
                      ))
                    }
                  </SectionWrap>
                  )}
                  { !isAdmin && (
                  <SectionWrap>
                    <Tip spaceBetween={false}>
                      <SectionName>{mePage.workload}</SectionName>
                    </Tip>
                    <WorkloadPanel
                      key={user.workload}
                      workload={user.workload}
                      onClick={handleChangeWorkload}
                      openModalFuck={handlePanic}
                    />
                  </SectionWrap>
                  )}
                  <SectionWrap>
                    <Tip spaceBetween>
                      <SectionName>{mePage.calendar}</SectionName>
                    </Tip>
                    <CalendarWrap>
                      <VacationsCalendar
                        tempDate={null}
                        setTempDate={() => null}
                        holidays={holidays}
                        vacations={combinedVacations}
                        sickLeaves={combinedSickLeaves}
                        fromDate={false}
                        isMePage
                      // @ts-ignore
                        activeUsers={null}
                      />
                    </CalendarWrap>
                  </SectionWrap>
                  {
                  (projects!.length > 0) && (
                    <SectionWrap>
                      <Tip spaceBetween={false}>
                        <SectionName>{mePage.projects}</SectionName>
                      </Tip>
                      <ProjectsCatalog
                        projects={activeProjects!}
                      />
                      {isShowAllProjects && (
                        <ProjectsCatalog
                          projects={inactiveProjects!}
                        />
                      )}
                      {inactiveProjects.length > 0 && (
                        <ProjectsButton onClick={toggleIsShowAllProjects}>
                          {isShowAllProjects ? mePage.show_active : mePage.show_all}
                        </ProjectsButton>
                      )}
                    </SectionWrap>
                  )
                }
                  {(user.hasPersonalInventory || items.length > 0) && (
                  <SectionWrap>
                    <Tip spaceBetween>
                      <SectionName>{mePage.inventory}</SectionName>
                      {isAdmin && (
                      <PlusWrap onClick={() => history.push(`/add-item-user/${user!._id}`)}>
                        <PlusIcon stroke="#909599" width="18px" height="18px" />
                      </PlusWrap>
                      )}
                    </Tip>
                    {user.hasPersonalInventory && (
                    <InventoryItem
                      userId={user._id}
                      isPersonal={user.hasPersonalInventory}
                      isAdmin={isAdmin}
                    />
                    )}
                    {items.length > 0 && items.map((item) => (
                      <InventoryItem
                        userId={user._id}
                        key={item._id}
                        isPersonal={false}
                        item={item}
                        isAdmin={isAdmin}
                      />
                    ))}
                  </SectionWrap>
                  )}
                  <SectionWrap>
                    {!isAdmin && (
                    <>
                      <Tip spaceBetween>
                        <SectionName>{mePage.quick_actions}</SectionName>
                      </Tip>
                      <PanicButtonWrap
                        onClick={handlePanic}
                        isPanic={user.workload === 5}
                      >
                        <ItemInfo>
                          <LinkUser>
                            <ActionIconWrap>
                              <Icon
                                img="Workload5.png"
                                width="24px"
                                height="24px"
                              />
                            </ActionIconWrap>
                            <ActionNameItem
                              isColor
                            >
                              {mePage.mne_pizda}
                            </ActionNameItem>
                          </LinkUser>
                        </ItemInfo>
                      </PanicButtonWrap>
                      {!isSickLeaveToday && (
                      <ActionButtonWrap
                        onClick={wasSickLeaveYesterday
                          ? handleExtendSickLeave
                          : setIsActiveModalSick}
                      >
                        <ItemInfo>
                          <LinkUser>
                            <ActionIconWrap>
                              <PillIcon color="#333" />
                            </ActionIconWrap>
                            <ActionNameItem isColor>
                              {wasSickLeaveYesterday
                                ? mePage.extend_sick_leave
                                : mePage.take_sick_leave}
                            </ActionNameItem>
                          </LinkUser>
                        </ItemInfo>
                      </ActionButtonWrap>
                      )}
                      <ActionButtonWrap onClick={handleGoToTakeVacation}>
                        <ItemInfo>
                          <LinkUser>
                            <ActionIconWrap>
                              <Dribble color="#333" />
                            </ActionIconWrap>
                            <ActionNameItem isColor>{mePage.take_vacation}</ActionNameItem>
                          </LinkUser>
                        </ItemInfo>
                      </ActionButtonWrap>
                      <ActionButtonWrap onClick={handleMoney}>
                        <ItemInfo>
                          <LinkUser>
                            <ActionIconWrap>
                              <CashIcon />
                            </ActionIconWrap>
                            <ActionNameItem isColor>{mePage.want_more_money}</ActionNameItem>
                          </LinkUser>
                        </ItemInfo>
                      </ActionButtonWrap>
                      <ActionButtonWrap onClick={handleGoToTelegram}>
                        <ItemInfo>
                          <LinkUser>
                            <ActionIconWrap>
                              <TelegramIcon color="black" />
                            </ActionIconWrap>
                            <ActionNameItem isColor>{common.telegram_bot}</ActionNameItem>
                          </LinkUser>
                        </ItemInfo>
                      </ActionButtonWrap>
                    </>
                    )}
                    {role === 'sales' && (
                    <SectionWrap>
                      <Tip spaceBetween={false}>
                        <SectionName>{mePage.workload}</SectionName>
                      </Tip>
                      <ActionButtonWrap onClick={copyAccessToken}>
                        <ItemInfo>
                          <LinkUser>
                            <ActionIconWrap>
                              <CopyIcon />
                            </ActionIconWrap>
                            <ActionNameItem isColor>{mePage.copy_token}</ActionNameItem>
                          </LinkUser>
                        </ItemInfo>
                      </ActionButtonWrap>
                    </SectionWrap>
                    )}
                  </SectionWrap>
                  <SectionWrap>
                    <Tip spaceBetween={false}>
                      <SectionName>{mePage.other}</SectionName>
                    </Tip>
                    {
                    isAdmin ? (
                      <>
                        <ItemWrap to="/dashboard">
                          <ItemInfo>
                            <LinkOthers>
                              <OthersIconWrap>
                                <DashboardIcon />
                              </OthersIconWrap>
                              <NameItem isColor>{mePage.dashboard}</NameItem>
                            </LinkOthers>
                          </ItemInfo>
                          <LinkOthers>
                            <RightArrow>
                              <SmallArrowIcon />
                            </RightArrow>
                          </LinkOthers>
                        </ItemWrap>
                        <ItemWrap to="/inventory">
                          <ItemInfo>
                            <LinkOthers>
                              <OthersIconWrap>
                                <ItemsIcon />
                              </OthersIconWrap>
                              <NameItem isColor>{mePage.inventory}</NameItem>
                            </LinkOthers>
                          </ItemInfo>
                          <LinkOthers>
                            <RightArrow>
                              <SmallArrowIcon />
                            </RightArrow>
                          </LinkOthers>
                        </ItemWrap>
                        <ItemWrap to="/vacations/id">
                          <ItemInfo>
                            <LinkOthers>
                              <OthersIconWrap>
                                <SelectedCalendarIcon />
                              </OthersIconWrap>
                              <NameItem isColor>{mePage.team_vacations}</NameItem>
                            </LinkOthers>
                          </ItemInfo>
                          <LinkOthers>
                            <RightArrow>
                              <SmallArrowIcon />
                            </RightArrow>
                          </LinkOthers>
                        </ItemWrap>
                        <ItemWrap to="/managers">
                          <ItemInfo>
                            <LinkOthers>
                              <OthersIconWrap>
                                <ProjectsIcon color="#333" />
                              </OthersIconWrap>
                              <NameItem isColor>{mePage.mangers}</NameItem>
                            </LinkOthers>
                          </ItemInfo>
                          <LinkOthers>
                            <RightArrow>
                              <SmallArrowIcon />
                            </RightArrow>
                          </LinkOthers>
                        </ItemWrap>
                        <ItemWrap to="/academy">
                          <ItemInfo>
                            <LinkOthers>
                              <OthersIconWrap>
                                <BookIcon color="#333" />
                              </OthersIconWrap>
                              <NameItem isColor>{common.lambda_edu}</NameItem>
                            </LinkOthers>
                          </ItemInfo>
                          <LinkOthers>
                            <RightArrow>
                              <SmallArrowIcon />
                            </RightArrow>
                          </LinkOthers>
                        </ItemWrap>
                        <ItemWrap to="/team-actions">
                          <ItemInfo>
                            <LinkOthers>
                              <OthersIconWrap>
                                <ZapIcon color="#333" />
                              </OthersIconWrap>
                              <NameItem isColor>{common.team_actions}</NameItem>
                            </LinkOthers>
                          </ItemInfo>
                          <LinkOthers>
                            <RightArrow>
                              <SmallArrowIcon />
                            </RightArrow>
                          </LinkOthers>
                        </ItemWrap>
                        <ItemWrap to="/team-tags">
                          <ItemInfo>
                            <LinkOthers>
                              <OthersIconWrap>
                                <TagIcon
                                  color="#333"
                                  width="24"
                                  height="24"
                                />
                              </OthersIconWrap>
                              <NameItem isColor>{mePage.team_tags}</NameItem>
                            </LinkOthers>
                          </ItemInfo>
                          <LinkOthers>
                            <RightArrow>
                              <SmallArrowIcon />
                            </RightArrow>
                          </LinkOthers>
                        </ItemWrap>
                      </>
                    ) : (
                      <>
                        <List
                          leftIcon={<UsersIcon color="#ffc760" />}
                          text={mePage.team_vacations}
                          variant={1}
                          onClick={handleGoToUsersVacations}
                        />
                        <List
                          leftIcon={<Dribble />}
                          text={mePage.my_vacations}
                          variant={0}
                          onClick={handleGoToUserVacations}
                        />
                        <List
                          leftIcon={<PillIcon color="#76a6a9" />}
                          text={mePage.my_sick_leaves}
                          variant={2}
                          onClick={() => history.push('/sick-leaves')}
                        />
                      </>
                    )
                  }
                  </SectionWrap>
                  {role === 'admin' && (
                  <>
                    <SectionWrap>
                      <Tip spaceBetween>
                        <SectionName>{mePage.quick_actions}</SectionName>
                      </Tip>
                      { !user.telegramId
                      && (
                      <ActionButtonWrap onClick={handleGoToTelegram}>
                        <ItemInfo>
                          <LinkUser>
                            <ActionIconWrap>
                              <TelegramIcon color="black" />
                            </ActionIconWrap>
                            <ActionNameItem isColor>{common.telegram_bot}</ActionNameItem>
                          </LinkUser>
                        </ItemInfo>
                      </ActionButtonWrap>
                      )}
                      <ActionButtonWrap onClick={copyAccessToken}>
                        <ItemInfo>
                          <LinkUser>
                            <ActionIconWrap>
                              <CopyIcon />
                            </ActionIconWrap>
                            <ActionNameItem isColor>{mePage.copy_token}</ActionNameItem>
                          </LinkUser>
                        </ItemInfo>
                      </ActionButtonWrap>
                    </SectionWrap>
                  </>
                  )}
                  <ChangeLanguageLink onClick={handleGoToChangeLanguage}>
                    <LinkIcon>
                      <ChangeLanguageIcon />
                    </LinkIcon>
                    {mePage.change_language}
                  </ChangeLanguageLink>
                  <ChangePasswordLink onClick={handleGoToChangePassword}>
                    <LinkIcon>
                      <ChangePasswordIcon />
                    </LinkIcon>
                    {mePage.change_password}
                  </ChangePasswordLink>
                  <LogOutLink onClick={setIsActiveModal}>
                    <LinkIcon>
                      <LogOutIcon />
                    </LinkIcon>
                    {mePage.logout}
                  </LogOutLink>
                  {isActiveModal && (
                  <ModalLogOut
                    logOut={handleLogOut}
                    hideModal={setIsActiveModal}
                  />
                  )}
                  <MyToast
                    isActive={isActiveModalMoney}
                    text={mePage.money_toast}
                    style={{
                      maxWidth: '520px',
                      width: 'calc(100% - 32px)',
                      position: 'fixed',
                    }}
                    bottom={86}
                    padding={16}
                    autoClose={2000}
                    hide={setIsActiveModalMoney}
                  />
                  <MyToast
                    isActive={isActiveModalFuck}
                    text={mePage.panic_toast}
                    style={{
                      maxWidth: '520px',
                      width: 'calc(100% - 32px)',
                      position: 'fixed',
                    }}
                    bottom={86}
                    padding={16}
                    autoClose={2000}
                    hide={setIsActiveModalFuck}
                  />
                  <MyToast
                    isActive={isActiveToastSick}
                    text={mePage.sick_toast}
                    style={{
                      maxWidth: '520px',
                      width: 'calc(100% - 32px)',
                      position: 'fixed',
                    }}
                    bottom={86}
                    padding={16}
                    autoClose={2000}
                    hide={setIsActiveToastSick}
                  />
                  {isActiveModalSick && (
                  <ModalSickLeave
                    hideModal={setIsActiveModalSick}
                    confirm={handleTakeSickLeave}
                  />
                  )}
                </MainWrap>
                <MyToast
                  isActive={copySuccess}
                  text={mePage.token_was_copied}
                  style={{
                    maxWidth: '520px',
                    width: 'calc(100% - 32px)',
                    position: 'fixed',
                  }}
                  bottom={86}
                  padding={16}
                  autoClose={2000}
                  hide={toggleIsCopySuccess}
                />
              </ScrollbarWrapper>
              <Empty height="64px" />
              <Navigation path="you" />
            </>
          )
      }
    </>
  );
};

const ScrollbarWrapper = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const MainWrap = styled.div<{focus: boolean}>`
  padding: 0 16px 16px;
  background: white;
`;

const HeaderSmallWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AddItemsTitle = styled.div`
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  letter-spacing: 0.3px;
`;

const Header = styled.header`
  background-color: #ffffff;
  padding: 32px 16px 24px;
  width: 100%;
  position: relative;
  margin-bottom: 10px;
`;

const HeaderWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  user-select: none;
  padding: 10px 16px;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  margin: 0 0 16px;
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px;
`;

const UserPhoto = styled(Link)<{photo: string | undefined}>`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-image: ${({ photo }) => (`url('${photo}')`)};
  background-size: cover;
  border: solid 1px #dae1e8;
  background-position: center;
  cursor: pointer;
  flex-shrink: 0;
`;

const HeaderRectangle = styled(Link)`
  position: absolute;
  right: 53px;
  bottom: -6px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  padding: 3px;
  cursor: pointer;
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

const LogOutLink = styled.div`
  position: relative;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 15px 0 15px;
  color: #feaa22;
  user-select: none;
  cursor: pointer;
  align-items: center;
  margin-top: 10px;
`;

const ChangePasswordLink = styled.div`
  position: relative;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 15px 0 15px;
  color: #feaa22;
  user-select: none;
  cursor: pointer;
  align-items: center;
  margin-top: 10px;
`;

const ChangeLanguageLink = styled.div`
  position: relative;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 15px 0 15px;
  color: #feaa22;
  user-select: none;
  cursor: pointer;
  align-items: center;
  margin-top: 40px;
`;

const LinkIcon = styled.div`
  margin-right: 24px;
  height: 24px;
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
  user-select: none;
`;

const SectionWrap = styled.div`
  margin: 10px 0 32px;
`;

const PlusWrap = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const CalendarWrap = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 0 20px;
`;

const LinkOthers = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const RightArrow = styled.div`
  width: 16px;
  height: 16px;
  margin-top: -2px;
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
  text-overflow: ellipsis;
  overflow: hidden;
  
  &:first-letter {
    text-transform: uppercase;
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

const ItemWrap = styled(Link)`
  padding: 15px 10px 15px 19px;
  margin: 8px 0;
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

const OthersIconWrap = styled.div`
  height: 24px;
  margin-right: 20px;
`;

const TagItem = styled.div`
  display: inline-block;
  height: 24px;
  position: relative;
  font-size: 11px;
  font-weight: 500;
  margin: 3px 5px;
  padding: 4px 10px 4px 22px;
  background: #d1d2d45c;
  text-decoration: none;
  border-radius: 5px;
  text-transform: capitalize;
  position: relative;
  cursor: default;
  user-select: none;
`;

const CheckIconWrap = styled.div`
  position: absolute;
  top: 4px;
  left: 5px;
  width: 16px;
  height: 16px;
`;

const ActionButtonWrap = styled.div`
  padding: 0 10px 0 10px;
  height: 50px;
  margin: 8px 0px;
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

const PanicButtonWrap = styled.div<{isPanic: boolean}>`
  padding: 0 10px 0 10px;
  height: 50px;
  margin: 8px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border:${({ isPanic }) => (isPanic ? 'solid 1px red' : 'solid 1px rgba(33, 39, 46, 0.12)')};
  background-color:${({ isPanic }) => (isPanic ? '#ffc1c266' : 'rgb(240 241 242 / 27%)')};
  position: relative;
  text-decoration: none;
  cursor: pointer;
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

const ProjectsButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px 0 10px;
  height: 40px;
  margin: 4px 0px;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  position: relative;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: #21272e;
`;

export default Me;
