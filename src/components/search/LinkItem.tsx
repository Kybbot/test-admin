import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import LinkIcon from '@/components/common/icons/LinkIcon';

interface Props {
  link: string;
  name: string;
}

const ProjectItem: React.FC<Props> = ({ link, name }) => (
  <ItemWrap to={link}>
    <ItemInfo>
      <ProjectIconWrap>
        <LinkIcon color="#333" />
      </ProjectIconWrap>
      <SmallWrap>
        <NameItem isColor>{name}</NameItem>
      </SmallWrap>
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
  display: flex;
`;

const SmallWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  text-decoration: none;
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

export default ProjectItem;
