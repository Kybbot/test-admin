import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { selectItemHistoryUsers } from '@/store/selectors/inventory';
import { getItemHistory, inventoryActions } from '@/store/actions/inventory';

import useLanguage from '@/components/common/hooks/useLanguage';
import IconClose from '@/components/common/icons/CloseIcon';
import Loader from '@/components/common/Loader';
import EmptyUserHistory from '@/components/inventory/EmptyUserHistory';
import getPhoto from '@/utils/getPhoto';
import ComputerIcon from '@/components/common/icons/ComputerIcon';

interface Props extends RouteComponentProps<{ itemId: string }> {}

const ChangeItemUser: React.FC<Props> = ({ match, history }) => {
  const { itemId } = match.params;

  const owners = useSelector(selectItemHistoryUsers);
  const [{ inputsPages }] = useLanguage();

  const dispatch = useDispatch();
  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getItemHistory(+itemId));

    return () => {
      dispatch(inventoryActions.setItemHistoryUsers(null));
    };
  }, []);

  return (
    <>
      <Header>
        <HeaderWrap>
          <TopButton onClick={history.goBack}>
            <IconClose />
          </TopButton>
          <HeaderText>{inputsPages.item_history}</HeaderText>
        </HeaderWrap>
      </Header>
      {
        !owners
          ? (
            <Loader />
          ) : (
            <>
              <Wrapper className="scrollbar">
                <ItemCompWrap>
                  <KeyBox key={owners._id}>
                    <TopWrap>
                      <LinkUser>
                        {owners.photo ? (
                          <ComputerPhoto url={getPhoto(owners.photo)} />
                        ) : (
                          <ComputerIcon color="#333" />
                        )}
                        <TextGroup>
                          <NameItem isColor>{`${owners.model} ${owners.diagonal} ${owners.year}`}</NameItem>
                          <Parameters>{`${owners.imei}, ${owners.cpu}, ${owners.ram}, ${owners.memory}`}</Parameters>
                        </TextGroup>
                      </LinkUser>
                    </TopWrap>
                    <Line style={{ margin: '3px 0 0 -10px' }} />
                  </KeyBox>
                </ItemCompWrap>

                <ItemsContainer>
                  <Wrap>
                    <ItemsWrap>
                      {owners.formerOwners!.length === 0
                        ? (<EmptyUserHistory />) : owners.formerOwners!.map((owner) => (
                          <ItemWrap key={owner._id} to={`/users/${owner._id}`}>
                            <ItemInfo>
                              <LinkUser>
                                <Photo url={getPhoto(owner.smallPhoto)} />
                                <NameItem isColor>{owner!.name}</NameItem>
                              </LinkUser>
                            </ItemInfo>
                          </ItemWrap>
                        )).reverse()}
                    </ItemsWrap>
                  </Wrap>
                </ItemsContainer>
              </Wrapper>
            </>
          )
      }
    </>
  );
};

const ItemCompWrap = styled.div`
  padding: 0 10px;
  margin: 16px 16px;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
`;

const KeyBox = styled.div`
  width: 100%;
`;

const Line = styled.div`
  width: calc(100% + 20px); 
  height: 1px;
  background-color: #ebeced;
`;

const TopWrap = styled.div`
  min-height: 61px;
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

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  overflow-y: auto;
`;

const ItemsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 16px auto;
  position: relative;
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

// const HeaderSmallWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;

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

// const HeaderIcon = styled.div`
//   margin-top: 2px;
//   width: 24px;
//   height: 24px;
//   cursor: pointer;
// `;

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

// const RightArrow = styled.div`
//   width: 25px;
//   height: 25px;
// `;

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

const ItemWrap = styled(Link)`
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
  text-decoration: none;
`;

const ComputerPhoto = styled.div<{url: string}>`
  width: 60px;
  height: 55px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 10px;
  background-position: center;
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

// const ProjectIconWrap = styled.div`
//   width: 43px;
//   height: 43px;
//   border-radius: 5px;
//   border: 1.7px solid rgba(33, 39, 46, 0.08);
//   font-size: 15px;
//   font-weight: 600;
//   background-color: #f0f1f2;
//   margin-right: 10px;
//   text-transform: uppercase;
//   display: flex;
//   -webkit-box-align: center;
//   align-items: center;
//   -webkit-box-pack: center;
//   justify-content: center;
//   word-break: normal;
//   flex-shrink: 0;
// `;

export default ChangeItemUser;
