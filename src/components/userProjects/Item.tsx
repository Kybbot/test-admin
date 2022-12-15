import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Project } from '@/store/reducers/projects';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import ProjectsIcon from '@/components/common/icons/navigation/projectsIcon';
import moment from 'moment';

interface Props {
  project: Project;
}

const Item: React.FC<Props> = ({ project }) => {
  const { projectInfo } = project;
  const { tag, hours } = projectInfo;

  const getProjectInfoString = () => {
    if (!hours) return `${tag}`;
    return `${tag ? (`${tag} \u00A0 | \u00A0 `) : ''}${hours} h`;
  };

  const getItemDateString = (date: string) => {
    const diff = moment().startOf('day').diff(date, 'days');

    switch (diff) {
      case 0:
        return 'Today';
      case 1:
        return 'Yesterday';
      case -1:
        return 'Tomorrow';
      default: break;
    }

    if (diff < -1) return `In ${Math.abs(diff)} days, ${moment(date).format('Do MMMM')}`;

    return `${diff} days ago, ${moment(date).format('Do MMMM')}`;
  };
  return (
    <ItemWrap to={`/projects/${project._id}`}>
      <ItemInfo>
        <ProjectIconWrap>
          <ProjectsIcon color="#333" />
          <StatusIndicator isActive={project.isActive} />
        </ProjectIconWrap>
        <LinkUser>
          <SmallWrap>
            <NameItem isColor>{project.name}</NameItem>
            <ProjectInfo>{getProjectInfoString()}</ProjectInfo>
            {project.deadline && moment(project.deadline).valueOf() > 0 && project.isActive && (
              <DateText>{`${getItemDateString(project.deadline)}`}</DateText>
            )}
          </SmallWrap>
        </LinkUser>
      </ItemInfo>
      <LinkUser>
        <RightArrow>
          <SmallArrowIcon />
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

const ProjectInfo = styled.div`
  font-size: 12px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: #787c80;
  word-break: break-word;

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

const StatusIndicator = styled.div<{isActive: boolean}>`
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 15px;
  height: 15px;
  border-radius: 100% 0 6px;
  border: 2px solid #fbfbfb;
  background: ${({ isActive }) => (isActive ? '#64bf6a' : '#909599')};
`;

const SmallWrap = styled.div`
  width: 100%;
`;

const DateText = styled.div`
  font-size: 11px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: #787c80;
  word-break: break-word;
  height: 16px;
  margin-top: 5px;

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

export default Item;
