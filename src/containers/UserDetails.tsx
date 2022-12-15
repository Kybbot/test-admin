import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Redirect, RouteComponentProps } from 'react-router';
import moment from 'moment';

import { cleanProjects, getUserProjects } from '@/store/actions/projects';
import {
  changeUserWorkload,
  cleanUser,
  cleanUsers,
  deleteUser,
  getUser,
  restoreUser,
} from '@/store/actions/users';
import { cleanInventory, getUsersInventory } from '@/store/actions/inventory';

import { selectRole, selectUser as selectCurrentUser } from '@/store/selectors/user';
import { selectUsersItems } from '@/store/selectors/inventory';
import { selectUsersProjects } from '@/store/selectors/projects';
import { selectUser } from '@/store/selectors/users';

import useToggle from '@/components/common/hooks/useToggle';

import ComputerIcon from '@/components/common/icons/ComputerIcon';
import useLanguage from '@/components/common/hooks/useLanguage';
import ZapIcon from '@/components/common/icons/ZapIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import CheckIcon from '@/components/common/icons/CheckIcon';
import Edit2Icon from '@/components/common/icons/Edit2Icon';
import EyeOffIcon from '@/components/common/icons/EyeOffIcon';
import EditIcon from '@/components/common/icons/EditIcon';
import BackIcon from '@/components/common/icons/BackIcon';
import Dribble from '@/components/common/icons/Dribble';
import EyeIcon from '@/components/common/icons/EyeIcon';
import RestoreIcon from '@/components/common/icons/RestoreIcon';
import LoaderDots from '@/components/common/LoaderDots';
import ProjectsCatalog from '@/components/userProjects/Catalog';
import WorkloadPanel from '@/components/users/WorkloadPanel';
import ModalAddTags from '@/components/userTags/ModalAddTags';
import InventoryItem from '@/components/users/InventoryItem';
import Loader from '@/components/common/Loader';
import CreateReminder from '@/components/CreateReminder';
import List from '@/components/List';
import BinIcon from '@/components/common/icons/BinIcon';
import ModalDelete from '@/components/users/ModalDelete';
import ModalRestore from '@/components/users/ModalRestore';

import getPhoto from '@/utils/getPhoto';
import PillIcon from '@/components/common/icons/PillIcon';
import CopyIcon from '@/components/common/icons/CopyIcon';
import MyToast from '@/components/Toast';

interface Props extends RouteComponentProps<{ userId: string }> {}

const UserDetails: React.FC<Props> = ({ history, match }) => {
  const { userId } = match.params;
  const user = useSelector(selectUser);
  const [updatedPhoto, setUpdatedPhoto] = useState('');
  const [isOpenInfo, toggleIsOpenInfo] = useToggle();
  const [isTagsModalActive, toggleIsTagsModalActive] = useToggle();
  const [isDeleteModalActive, toggleIsDeleteModalActive] = useToggle();
  const [isRestoreModalActive, toggleIsRestoreModalActive] = useToggle();
  const [isCreateReminderActive, toggleIsCreateReminderActive] = useToggle();
  const [isShowAllProjects, toggleIsShowAllProjects] = useToggle(false);
  const [copySuccess, toggleIsCopySuccess] = useToggle();

  const [{ mePage }] = useLanguage();

  const dispatch = useDispatch();
  const projects = useSelector(selectUsersProjects);
  const role = useSelector(selectRole);
  const currentUser = useSelector(selectCurrentUser);
  const items = useSelector(selectUsersItems);
  const isAdmin = role === 'admin';
  const activeProjects = projects?.filter(
    ({ projectInfo }) => projectInfo.status === 'active',
  );
  const inactiveProjects = projects?.filter(
    ({ projectInfo }) => projectInfo.status === 'inactive',
  );
  const isPersonal = user?.hasPersonalInventory;

  useEffect(() => {
    dispatch(getUser(+userId));
    dispatch(getUserProjects(+userId));
    dispatch(getUsersInventory(+userId));

    return () => {
      dispatch(cleanUser());
      if (history.location.pathname !== '/users') {
        dispatch(cleanUsers());
      }
      dispatch(cleanProjects());
      dispatch(cleanInventory());
    };
  }, [userId]);

  const handleDoubleClick = () => {
    const pashalka = '/assets/pashalka.gif';
    const altPhoto = '/assets/noname.png';

    if (updatedPhoto !== pashalka) {
      return setUpdatedPhoto(pashalka);
    }

    if (user?.photo) {
      return setUpdatedPhoto(getPhoto(user.photo));
    }
    return setUpdatedPhoto(altPhoto);
  };

  useEffect(() => {
    if (user) setUpdatedPhoto(getPhoto(user.photo));
  }, [user]);

  useEffect(() => {
    if (role) toggleIsOpenInfo(role !== 'admin');
  }, [role]);

  const handleGoToUserVacations = () => history.push(`/users/vacations/${user!._id}`);
  const handleGoToUserSickLeaves = () => history.push(`/users/sick-leaves/${user!._id}`);
  const handleGoBack = () => history.goBack();

  const handleChangeWorkload = (workload: number) => {
    dispatch(changeUserWorkload(+userId, workload));
  };

  const copyToClipboard = () => {
    if (navigator?.clipboard && user) {
      navigator.clipboard.writeText(user.email);
    }
    toggleIsCopySuccess(true);
  };

  const handleDelete = () => {
    dispatch(deleteUser(user!._id));
  };

  const handleRestore = () => {
    dispatch(restoreUser(user!._id));
  };

  if (isCreateReminderActive) {
    return <CreateReminder user={user!} hide={toggleIsCreateReminderActive} />;
  }

  if (+userId === currentUser!._id) {
    return <Redirect to="/me" />;
  }

  return (
    <>
      {!user
      || !items
      || !projects
      || !activeProjects
      || !inactiveProjects ? (
        <Loader />
        ) : (
          <>
            <Header>
              <HeaderWrap>
                <HeaderSmallWrap>
                  <TopButton onClick={handleGoBack}>
                    <BackIcon />
                  </TopButton>
                  <AddItemsTitle>
                    {!user ? <LoaderDots /> : user.name}
                  </AddItemsTitle>
                </HeaderSmallWrap>
                {isAdmin && (
                <HeaderRectangle to={`/edit-user/${userId}`}>
                  <HeaderEdit>
                    <EditIcon color="black" />
                  </HeaderEdit>
                </HeaderRectangle>
                )}
              </HeaderWrap>
            </Header>
            <MainWrap focus className="scrollbar">
              <UserPhoto photo={updatedPhoto} onDoubleClick={handleDoubleClick} />
              <SectionWrap>
                <Tip onClick={toggleIsOpenInfo} spaceBetween={false}>
                  <SectionName>{mePage.info}</SectionName>
                  {isOpenInfo ? <EyeIcon /> : <EyeOffIcon />}
                </Tip>
                {isOpenInfo && (
                <Details>
                  <TextWrap>
                    <DetailsText>{mePage.role}</DetailsText>
                    <DetailsSubText>{user.role}</DetailsSubText>
                  </TextWrap>
                  {Boolean(user.birthday) && (
                    <TextWrap>
                      <DetailsText>{mePage.birthday}</DetailsText>
                      <DetailsSubText>
                        {moment(user.birthday).format('DD/MM/YYYY')}
                      </DetailsSubText>
                    </TextWrap>
                  )}
                  {Boolean(user.english) && (
                    <TextWrap>
                      <DetailsText>{mePage.english}</DetailsText>
                      <DetailsSubText>{user.english}</DetailsSubText>
                    </TextWrap>
                  )}
                  {isAdmin && Boolean(user.email) && (
                    <TextWrap>
                      <DetailsText>{mePage.email}</DetailsText>
                      <DetailsSubText
                        style={{
                          textTransform: 'lowercase',
                          userSelect: 'all',
                        }}
                      >
                        <CopyWrapper>
                          {user.email}
                          <CopyIconWrapper onClick={copyToClipboard}>
                            <CopyIcon />
                          </CopyIconWrapper>
                        </CopyWrapper>
                      </DetailsSubText>
                    </TextWrap>
                  )}
                </Details>
                )}
              </SectionWrap>
              <SectionWrap style={{ margin: '10px -5px 32px' }}>
                {user.tags?.map((tag) => (
                  <TagItem key={tag}>
                    <CheckIconWrap>
                      <CheckIcon color="#188038" />
                    </CheckIconWrap>
                    {tag}
                  </TagItem>
                ))}

                {isAdmin && Boolean(user.tags?.length) && (
                <TagItem
                  key="edit"
                  style={{ cursor: 'pointer' }}
                  onClick={toggleIsTagsModalActive}
                >
                  &emsp;
                  <TagEditIconWrap>
                    <Edit2Icon width="16" height="16" color="#333" />
                  </TagEditIconWrap>
                </TagItem>
                )}

                {isAdmin && !user.tags?.length && (
                <TagItem
                  key="add"
                  style={{ cursor: 'pointer', paddingLeft: '10px' }}
                  onClick={toggleIsTagsModalActive}
                >
                  {mePage.add_tags}
                </TagItem>
                )}
              </SectionWrap>
              <SectionWrap>
                <Tip spaceBetween={false}>
                  <SectionName>{mePage.workload}</SectionName>
                </Tip>
                <WorkloadPanel
                  workload={user.workload}
                  onClick={handleChangeWorkload}
                  isAdmin={isAdmin}
                />
              </SectionWrap>

              {projects!.length > 0 && (
              <SectionWrap>
                <Tip spaceBetween={false}>
                  <SectionName>{mePage.projects}</SectionName>
                </Tip>
                <ProjectsCatalog projects={activeProjects!} />
                {isShowAllProjects && (
                  <ProjectsCatalog projects={inactiveProjects!} />
                )}
                {inactiveProjects.length > 0 && (
                  <ProjectsButton onClick={toggleIsShowAllProjects}>
                    {isShowAllProjects ? mePage.show_active : mePage.show_all}
                  </ProjectsButton>
                )}
              </SectionWrap>
              )}
              {(user.hasPersonalInventory || items.length > 0) && (
              <SectionWrap>
                <Tip spaceBetween>
                  <SectionName>{mePage.inventory}</SectionName>
                  {isAdmin && (
                    <PlusWrap
                      onClick={() => history.push(`/add-item-user/${userId}`)}
                    >
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
                {items.length > 0
                  && items.map((item) => (
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
              <ButtonsWrap>
                {!items.length && isAdmin && !isPersonal && (
                <ItemWrap
                  onClick={() => history.push(`/add-item-user/${userId}`)}
                >
                  <ItemInfo>
                    <LinkUser>
                      <IconWrap>
                        <ComputerIcon color="#333" />
                      </IconWrap>
                      <NameItem isColor>{mePage.assign_computer}</NameItem>
                    </LinkUser>
                  </ItemInfo>
                </ItemWrap>
                )}
              </ButtonsWrap>
              {isAdmin && (
              <SectionWrap>
                <Tip spaceBetween={false}>
                  <SectionName>{mePage.other}</SectionName>
                </Tip>
                <List
                  leftIcon={<Dribble />}
                  text={mePage.vacations}
                  variant={0}
                  onClick={handleGoToUserVacations}
                />
                <List
                  leftIcon={<PillIcon color="#76a6a9" />}
                  text={mePage.sick_leaves}
                  variant={2}
                  onClick={handleGoToUserSickLeaves}
                />
                <List
                  leftIcon={<ZapIcon color="rgb(240, 158, 26)" />}
                  text={mePage.create_action}
                  variant={1}
                  onClick={() => toggleIsCreateReminderActive(true)}
                />
              </SectionWrap>
              )}
              {isAdmin && !user.deleted && (
              <DeleteButton onClick={() => toggleIsDeleteModalActive(true)}>
                <LinkIcon>
                  <BinIcon color="#feaa22" />
                </LinkIcon>
                {mePage.delete_user}
              </DeleteButton>
              )}
              {isAdmin && user.deleted && (
              <DeleteButton onClick={() => toggleIsRestoreModalActive(true)}>
                <LinkIcon>
                  <RestoreIcon color="#feaa22" />
                </LinkIcon>
                {mePage.restore_user}
              </DeleteButton>
              )}
            </MainWrap>
            {isTagsModalActive && (
            <ModalAddTags hideModal={toggleIsTagsModalActive} />
            )}
            {isDeleteModalActive && (
            <ModalDelete
              hideModal={toggleIsDeleteModalActive}
              deleteHandle={handleDelete}
            />
            )}
            {isRestoreModalActive && (
            <ModalRestore
              hideModal={toggleIsRestoreModalActive}
              handleRestore={handleRestore}
            />
            )}
          </>
        )}
      <MyToast
        isActive={copySuccess}
        text={mePage.email_was_copied}
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
    </>
  );
};

const MainWrap = styled.div<{ focus: boolean }>`
  padding: 16px;
  background: white;
  height: 100%;
  overflow-y: auto;
`;

const CopyWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CopyIconWrapper = styled.div`
  cursor: pointer;
  margin-left: 5px;
  display: flex;
`;

const AddItemsTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin-left: 25px;
  letter-spacing: 0.3px;
  white-space: nowrap;
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

const UserPhoto = styled.div<{ photo: string | undefined }>`
  margin: 16px auto;
  width: 250px;
  height: 250px;
  border-radius: 100%;
  background-image: ${({ photo }) => `url('${photo}')`};
  background-size: cover;
  border: solid 1px #dae1e8;
  background-position: center;
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

const Tip = styled.div<{ spaceBetween: boolean }>`
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
  cursor: pointer;
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
  color: #21272e;
`;

const HeaderEdit = styled.div`
  width: 24px;
  height: 24px;
`;

const HeaderSmallWrap = styled.div`
  display: flex;
  align-items: center;
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
  position: relative;
  cursor: default;
  user-select: none;
`;

const TagEditIconWrap = styled.div`
  position: absolute;
  top: 4px;
  right: 13px;
  width: 16px;
  height: 16px;
`;

const CheckIconWrap = styled.div`
  position: absolute;
  top: 4px;
  left: 5px;
  width: 16px;
  height: 16px;
`;

const ItemInfo = styled.div`
  width: 100%;
`;

const NameItem = styled.div<{ isColor: boolean }>`
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

const ItemWrap = styled.div`
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

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const ButtonsWrap = styled.div`
  margin: 10px 0 32px;
`;

const IconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 17px;
  margin-left: 12px;
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

const LinkIcon = styled.div`
  margin-right: 24px;
  height: 24px;
  width: 24px;
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

export default UserDetails;
