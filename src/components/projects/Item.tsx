import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ProjectLight } from '@/store/reducers/projects';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import ProjectsIcon from '@/components/common/icons/navigation/projectsIcon';
import moment from 'moment';

import getPhoto from '@/utils/getPhoto';
import { useSelector } from 'react-redux';
import { selectCustomers } from '@/store/selectors/customers';

interface Props {
  project: ProjectLight;
}

const Item: React.FC<Props> = ({ project }) => {
  const customers = useSelector(selectCustomers);
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
        </ProjectIconWrap>
        <SmallWrap>
          <NameItem isColor>{project.name}</NameItem>
          { Boolean(project.customerIds.length) && (
            <ProjectsInfoWrap>
              {project.customerIds.map((id) => {
                const customer = customers?.find((c) => c._id === id);
                if (!customer) return null;
                return (
                  <CustomerItem key={project._id + id}>
                    <CustomerPhoto url={getPhoto(customer.smallPhoto)} />
                    <CustomerName>{customer.name}</CustomerName>
                  </CustomerItem>
                );
              })}
            </ProjectsInfoWrap>
          )}
          {moment(project.deadline).valueOf() > 0 && project.deadline && (
            <DateText>{`${getItemDateString(project.deadline)}`}</DateText>
          )}
        </SmallWrap>
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
  margin-bottom: 2px;
`;

const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SmallWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProjectsInfoWrap = styled.div`
  margin-top: 5px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const CustomerItem = styled.div`
  align-items: center;
  display: flex;
  margin-right: 8px;
`;

const CustomerName = styled.div`
  font-size: 12px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: #787c80;
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

const CustomerPhoto = styled.div<{url: string}>`
  width: 16px;
  height: 16px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 4px;
  background-position: center;
`;

export default Item;
