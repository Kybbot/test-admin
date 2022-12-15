import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { User } from '@/store/reducers/user';
import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import getPhoto from '@/utils/getPhoto';

interface Props {
  user: User;
}

const Item: React.FC<Props> = ({ user }) => (
  <ItemWrap to={`/users/${user._id}`}>
    <ItemInfo>
      <LinkUser>
        <Photo url={getPhoto(user.smallPhoto)} />
        <NameItem isColor>{user.name}</NameItem>
      </LinkUser>
    </ItemInfo>
    <LinkUser>
      <RightArrow>
        <SmallArrowIcon />
      </RightArrow>
    </LinkUser>
  </ItemWrap>
);

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const RightArrow = styled.div`
  width: 16px;
  height: 16px;
  margin-bottom: 2px;
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
  text-decoration: none;
`;

const Photo = styled.div<{url: string}>`
  width: 43px;
  height: 43px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 10px;
  background-position: center;
  flex-shrink: 0;
`;

export default Item;
