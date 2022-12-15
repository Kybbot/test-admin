import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { UserExtended } from '@/store/reducers/user';
import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import Icon from '@/components/Icon';
import ProjectsIcon from '@/components/common/icons/navigation/projectsIcon';
import moment from 'moment';
import getPhoto from '@/utils/getPhoto';

interface Props {
  user: UserExtended;
}

const ItemExtended: React.FC<Props> = ({ user }) => {
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

    if (diff < -1) return `In ${Math.abs(diff)} days`;

    return `${diff} days ago`;
  };

  return (
    <ItemWrap>
      <UserWrap to={`/users/${user._id}`}>
        <ItemInfo>
          <LinkUser>
            <Photo url={getPhoto(user.smallPhoto)} />
            <WorkloadIcon>
              {user.isOnVacation ? (
                <Icon img="Workload0.png" width="18px" height="18px" />
              ) : (
                <Icon img={`Workload${user.workload}.png`} width="18px" height="18px" />
              )}
            </WorkloadIcon>
            <NameItem isColor>{user.name}</NameItem>
          </LinkUser>
        </ItemInfo>
        <LinkUser>
          <RightArrow>
            <SmallArrowIcon />
          </RightArrow>
        </LinkUser>
      </UserWrap>
      {user.projects.map((project) => (
        <KeyBox key={project._id}>
          <Line />
          <ProjectItemInfo to={`/projects/${project._id}`}>
            <LinkUser>
              <ProjectIconWrap>
                <ProjectsIcon color="#333" />
              </ProjectIconWrap>
              <TextWrap>
                <ProjectNameItem isColor>
                  {project.name}
                  <Hours>
                    {`${project.projectInfo.tag} \u00A0 | \u00A0 ${project.projectInfo.hours} h`}
                    {moment(project.deadline).valueOf() > 0 && `\u00A0 | \u00A0 ${getItemDateString(project.deadline)}`}
                  </Hours>
                </ProjectNameItem>
              </TextWrap>
            </LinkUser>
            <RightArrow>
              <SmallArrowIcon />
            </RightArrow>
          </ProjectItemInfo>
        </KeyBox>
      ))}
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

const ProjectNameItem = styled.div<{isColor: boolean}>`
  font-size: 12px;
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

const Hours = styled.span`
  font-size: 11px;
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
  text-transform: none;


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
  position: relative;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  padding: 0px 10px;
  margin: 4px 16px;
`;

const UserWrap = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  text-decoration: none;
  min-height: 59px;
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
  left: 26px;
`;

const Line = styled.div`
  width: calc(100% + 20px); 
  height: 1px;
  background-color: #ebeced;
  margin-left: -10px;
`;

const ProjectIconWrap = styled.div`
  width: 28px;
  height: 28px;
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
  padding: 3px;
`;

const ProjectItemInfo = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 6px 0px 6px 0px;
  text-decoration: none;
  
  &:last-child {
    padding-bottom: 0px;
    margin-bottom: 6px;
  }
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const KeyBox = styled.div`
  width: 100%;
`;

export default ItemExtended;
