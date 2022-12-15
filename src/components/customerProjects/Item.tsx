import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Project } from '@/store/reducers/projects';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import ProjectsIcon from '@/components/common/icons/navigation/projectsIcon';

interface Props {
  project: Project;
}

const Item: React.FC<Props> = ({ project }) => (
  <ItemWrap to={`/projects/${project._id}`}>
    <ItemInfo>
      <ProjectIconWrap>
        <ProjectsIcon color="#333" />
      </ProjectIconWrap>
      <LinkUser>
        <NameItem isColor>{project.name}</NameItem>
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
`;

const ItemInfo = styled.div`
  width: 100%;
  display: flex;
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
  margin-bottom: 5px;
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
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  text-decoration: none;
  cursor: pointer;
`;

const ProjectIconWrap = styled.div`
  position: relative;
  width: 43px;
  height: 43px;
  border-radius: 5px;
  border: 1px solid rgba(33, 39, 46, 0.08);
  font-size: 15px;
  font-weight: 600;
  background-color: #f0f1f2;
  margin-right: 10px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: normal;
`;

export default Item;
