import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { Project } from '@/store/reducers/projects';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import ProjectsIcon from '@/components/common/icons/navigation/projectsIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';

interface Props {
  project: Project;
  onClick?: () => void;
}

const ProjectItem: React.FC<Props> = ({ project, onClick }) => {
  const history = useHistory();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    history.push(`/projects/${project._id}`);
  };

  return (
    <ItemWrap onClick={handleClick}>
      <ItemInfo>
        <ProjectIconWrap>
          <ProjectsIcon color="#333" />
        </ProjectIconWrap>
        <SmallWrap>
          <NameItem isColor>{project.name}</NameItem>
        </SmallWrap>
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

const ItemWrap = styled.div`
  padding: 8px 10px;
  margin: 4px 16px;
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
