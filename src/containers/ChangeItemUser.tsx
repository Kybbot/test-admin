import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import useToggle from '@/components/common/hooks/useToggle';

import { selectUsers } from '@/store/selectors/users';
import { cleanUsers, getUsersWithManagers } from '@/store/actions/users';
import { editInventoryItem } from '@/store/actions/inventory';

import useLanguage from '@/components/common/hooks/useLanguage';
import SearchIcon from '@/components/common/icons/SearchIcon';
import HomeIcon from '@/components/common/icons/HomeIcon';
import IconClose from '@/components/common/icons/CloseIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import SearchUsers from '@/components/inventory/SearchUsers';
import Loader from '@/components/common/Loader';
import getPhoto from '@/utils/getPhoto';

interface Props extends RouteComponentProps<{ itemId: string }> {}

const ChangeItemUser: React.FC<Props> = ({ match, history }) => {
  const { itemId } = match.params;
  const [isActiveSearch, setActiveSearch] = useToggle();

  const [{ inputsPages }] = useLanguage();

  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getUsersWithManagers());

    return () => {
      dispatch(cleanUsers());
    };
  }, []);

  const handleCreateBond = (id: number | null) => {
    const body = {
      owner: id ? +id : null,
    };

    dispatch(editInventoryItem(body, +itemId));

    history.goBack();
  };

  if (isActiveSearch) {
    return (
      <SearchUsers
        createBond={handleCreateBond}
        users={users!}
        hideSearch={setActiveSearch}
      />
    );
  }

  return (
    <>
      <Header>
        <HeaderWrap>
          <TopButton onClick={history.goBack}>
            <IconClose />
          </TopButton>
          <HeaderText>{inputsPages.change_user}</HeaderText>
          <HeaderSmallWrapper>
            <HeaderIcon onClick={() => setActiveSearch(true)}>
              <SearchIcon />
            </HeaderIcon>
          </HeaderSmallWrapper>
        </HeaderWrap>
      </Header>
      {
        !users
          ? (
            <Loader />
          ) : (
            <>
              <ItemsContainer className="scrollbar">
                <Wrap>
                  <ItemsWrap>
                    {users?.map((user) => (
                      <ItemWrap key={user._id} onClick={() => handleCreateBond(user._id)}>
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

                    <ItemWrap onClick={() => handleCreateBond(null)}>
                      <ItemInfo>
                        <ProjectIconWrap>
                          <HomeIcon color="#333" />
                        </ProjectIconWrap>
                        <NameItem isColor>Office</NameItem>
                      </ItemInfo>
                      <LinkUser />
                    </ItemWrap>
                  </ItemsWrap>
                </Wrap>
              </ItemsContainer>
            </>
          )
      }
    </>
  );
};

const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  padding: 16px 0;
  overflow-y: auto;
`;

const Header = styled.header`
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
  position: relative;
  z-index: 110;
  width: 100%;
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
  display: flex;
  align-items: center;
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

const ProjectIconWrap = styled.div`
  width: 43px;
  height: 43px;
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
  flex-shrink: 0;
`;

export default ChangeItemUser;
