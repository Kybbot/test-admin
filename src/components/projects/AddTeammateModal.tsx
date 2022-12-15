import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useToggle, { HandleToggle } from '@/components/common/hooks/useToggle';
import { User } from '@/store/reducers/user';
import { addTeammate } from '@/store/actions/projects';
import { selectUsers } from '@/store/selectors/users';
import { cleanUsers, getUsersWithManagers } from '@/store/actions/users';

import useLanguage from '@/components/common/hooks/useLanguage';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import SearchIcon from '@/components/common/icons/SearchIcon';
import IconClose from '@/components/common/icons/CloseIcon';
import SearchUser from '@/components/projects/SearchUser';
import Loader from '@/components/common/Loader';

import getPhoto from '@/utils/getPhoto';

interface Props {
  hide: HandleToggle;
  currentUsers: User[]
  projectId: number;
}

const AddTeammateModal: React.FC<Props> = ({
  currentUsers,
  hide,
  projectId,
}) => {
  const [isActiveSearch, setActiveSearch] = useToggle();

  const [{ inputsPages }] = useLanguage();

  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsersWithManagers());

    return () => {
      dispatch(cleanUsers());
    };
  }, []);

  const handleAddOnProject = (projId: number, userId: number) => {
    dispatch(addTeammate(projId, userId));
    hide(false);
  };

  const possibleDevelopers = users?.filter((user) => (
    !currentUsers.find((dev) => dev._id === user._id)
  ));

  if (isActiveSearch) {
    return (
      <SearchUser
        users={possibleDevelopers!}
        hideSearch={setActiveSearch}
        add={handleAddOnProject}
        projectId={projectId}
      />
    );
  }

  return (
    <Container>
      <Header>
        <HeaderWrap>
          <TopButton onClick={hide}>
            <IconClose />
          </TopButton>
          <HeaderText>{inputsPages.add_teammate}</HeaderText>
          <HeaderSmallWrapper>
            <HeaderIcon onClick={() => setActiveSearch(true)}>
              <SearchIcon />
            </HeaderIcon>
          </HeaderSmallWrapper>
        </HeaderWrap>
      </Header>
      <Empty height="72px" />
      <ItemsContainer>
        {!possibleDevelopers ? (
          <Loader />
        ) : (
          <Wrap>
            <ItemsWrap>
              {possibleDevelopers.map((user) => (
                <ItemWrap key={user._id} onClick={() => handleAddOnProject(projectId, user._id)}>
                  <ItemInfo>
                    <LinkUser>
                      <Photo url={getPhoto(user.smallPhoto)} />
                      <NameItem isColor>{user!.name}</NameItem>
                    </LinkUser>
                  </ItemInfo>
                  <LinkUser>
                    <RightArrow>
                      <PlusIcon stroke="#909599" />
                    </RightArrow>
                  </LinkUser>
                </ItemWrap>
              ))}
            </ItemsWrap>
          </Wrap>
        )}
      </ItemsContainer>
    </Container>
  );
};

const Empty = styled.div<{height: string}>`
  height: ${({ height }) => height && height};
  width: 100%;
`;

const Container = styled.div`
  height: auto;
  position: relative;
  background-color: white;
`;

const ItemsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.header`
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
  position: fixed;
  z-index: 110;
  width: 100%;
  top: 0;
  max-width: 552px;
`;

const HeaderWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
`;

const HeaderSmallWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
    width: 100%;
    padding-bottom: 2px;
    font-size: 18px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #21272e;
`;

const HeaderIcon = styled.div`
  margin-top: 2px;
  width: 24px;
  height: 24px;
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
  margin-right: 24px;
`;

const Wrap = styled.div`
 padding: 12px 0;
`;

const ItemsWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const RightArrow = styled.div`
  width: 25px;
  height: 25px;
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
  padding: 8px 10px;
  margin: 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  position: relative;
  cursor: pointer;
`;

const Photo = styled.div<{url: string}>`
  width: 43px;
  height: 43px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 10px;
  background-position: center;
`;

export default AddTeammateModal;
