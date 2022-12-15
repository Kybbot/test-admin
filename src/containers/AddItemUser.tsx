import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { editInventoryItem, getInventoryItems } from '@/store/actions/inventory';
import { getUser, editUser } from '@/store/actions/users';

import { selectItems } from '@/store/selectors/inventory';
import { selectUser } from '@/store/selectors/users';

import useLanguage from '@/components/common/hooks/useLanguage';
import ComputerIcon from '@/components/common/icons/ComputerIcon';
import IconClose from '@/components/common/icons/CloseIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import Loader from '@/components/common/Loader';
import getPhoto from '@/utils/getPhoto';

interface Props extends RouteComponentProps<{ userId: string }> {}

const AddItemUser: React.FC<Props> = ({ match, history }) => {
  const { userId } = match.params;
  const [{ common }] = useLanguage();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getUser(+userId));

    dispatch(getInventoryItems());
    // getCurrentUser = user;
  }, []);

  const handleCreateBond = (id: number) => {
    const body = {
      owner: +userId,
    };

    dispatch(editInventoryItem(body, id));
    dispatch(getInventoryItems());

    history.goBack();
  };

  const handleCreatePC = () => {
    const body = {
      hasPersonalInventory: true,
    };

    dispatch(editUser(body, +userId));
  };

  const freeItems = items?.find((item) => !item.user);

  return (
    <>
      <Header>
        <HeaderWrap>
          <TopButton onClick={history.goBack}>
            <IconClose />
          </TopButton>
          <HeaderText>{common.add_item}</HeaderText>
          <HeaderSmallWrapper />
        </HeaderWrap>
      </Header>
      {
        !items
          ? (
            <Loader />
          ) : (
            <>
              <ItemsContainer className="scrollbar">
                <Wrap>
                  <ItemsWrap>
                    {freeItems?.items.map((item) => (
                      <ItemWrap key={item._id} onClick={() => handleCreateBond(item._id)}>
                        <TopWrap>
                          <LinkUser>
                            <Photo url={getPhoto(item.photo)} />
                            <TextGroup>
                              <NameItem isColor>{`${item.model} ${item.diagonal} ${item.year}`}</NameItem>
                              <Parameters>{`${item.imei}, ${item.cpu}, ${item.ram}, ${item.memory}`}</Parameters>
                            </TextGroup>
                          </LinkUser>
                          <RightArrow>
                            <PlusIcon stroke="#909599" />
                          </RightArrow>
                        </TopWrap>
                      </ItemWrap>
                    ))}
                    {user && !user.hasPersonalInventory && (
                      <PersonalItemWrap onClick={handleCreatePC}>
                        <ItemInfo>
                          <ProjectIconWrap>
                            <ComputerIcon color="#333" />
                          </ProjectIconWrap>
                          <NameItem isColor>Personal computer</NameItem>
                        </ItemInfo>
                        <LinkUser />
                        <RightArrow>
                          <PlusIcon stroke="#909599" />
                        </RightArrow>
                      </PersonalItemWrap>
                    )}
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

const TopWrap = styled.div`
  height: 61px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Parameters = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #2c2f33;
  margin-top: 3px;
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
  padding: 0 10px;
  margin: 4px 16px;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  cursor: pointer;
`;

const Photo = styled.div<{url: string}>`
  width: 60px;
  height: 55px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 10px;
  background-position: center;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
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

const PersonalItemWrap = styled.div`
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

export default AddItemUser;
