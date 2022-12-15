import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ComputerIcon from '@/components/common/icons/ComputerIcon';
import getPhoto from '@/utils/getPhoto';
import { User } from '@/store/reducers/user';
import SlashIcon from '../common/icons/SlashIcon';

interface Props {
  users: User[] | undefined;
  title: string;
}

const PersonalItem: React.FC<Props> = ({ users, title }) => (
  <ItemWrap style={title === 'Personal Computer' ? { marginBottom: '20px' } : {}}>
    <ItemInfo>
      <ProjectIconWrap>
        {title === 'Personal Computer' ? <ComputerIcon color="#333" /> : <SlashIcon color="#333" />}
      </ProjectIconWrap>
      <NameItem isColor>{title}</NameItem>
    </ItemInfo>
    <Wrap>
      <SmallWrap>
        {users?.map((user) => (
          <OwnerWrap to={`/users/${user._id}`} key={user._id}>
            <Line style={{ margin: '0px 0 0px -10px' }} />
            <SmallWrapInside style={{ display: 'flex' }}>
              <OwnerPhoto url={getPhoto(user.smallPhoto)} />
              <OwnerName isColor>
                {user.name}
              </OwnerName>
            </SmallWrapInside>
          </OwnerWrap>
        ))}
      </SmallWrap>
    </Wrap>
  </ItemWrap>
);

const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
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

const Line = styled.div`
  width: calc(100% + 20px); 
  height: 1px;
  background-color: #ebeced;
`;

const OwnerWrap = styled(Link)`
  margin: 0 0 10px 0;
  align-items: center;
  width: 100%;
  text-decoration: none;
`;

const SmallWrap = styled.div`
  align-items: center;
  width: 100%;
`;

const SmallWrapInside = styled.div`
  align-items: center;
  width: 100%;
  padding: 6px 0;
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
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
  padding: 10px 10px 0px 10px;
  margin: 4px 0;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
`;

const OwnerPhoto = styled.div<{url: string}>`
  width: 28px;
  height: 28px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 10px;
  background-position: center;
`;

const OwnerName = styled.div<{isColor: boolean}>`
  text-transform: capitalize;
  font-size: 13px;
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

export default PersonalItem;
