import React from 'react';
import styled from 'styled-components';

import { User } from '@/store/reducers/user';
import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import Icon from '@/components/Icon';
import { useHistory } from 'react-router';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';

import getPhoto from '@/utils/getPhoto';

interface Props {
  user: User;
  onClick?: () => void;
}

const Item: React.FC<Props> = ({ user, onClick }) => {
  const history = useHistory();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    history.push(`/users/${user._id}`);
  };

  const getIncicator = () => {
    if (user.isOnVacation) {
      return <Icon img="Workload0.png" width="18px" height="18px" />;
    }
    if (user.isSick) {
      return <Icon img="Pill.png" width="18px" height="18px" />;
    }
    return <Icon img={`Workload${user.workload}.png`} width="18px" height="18px" />;
  };

  return (
    <ItemWrap onClick={handleClick}>
      <ItemInfo>
        <LinkUser>
          <Photo url={getPhoto(user.smallPhoto)} />
          <WorkloadIcon>
            {getIncicator()}
          </WorkloadIcon>
          <NameItem isColor>{user.name}</NameItem>
        </LinkUser>
      </ItemInfo>
      <LinkUser>
        <RightArrow>
          {onClick ? <PlusIcon width="16" height="16" stroke="rgb(180, 186, 191)" /> : <SmallArrowIcon />}
        </RightArrow>
      </LinkUser>
    </ItemWrap>
  );
};

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
  text-transform: capitalize;
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
  text-decoration: none;
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
  flex-shrink: 0;
`;

const WorkloadIcon = styled.div`
  position: absolute;
  top: 33px;
  left: 36px;
`;

export default Item;
