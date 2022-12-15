import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useLanguage from '@/components/common/hooks/useLanguage';
import UserIcon from '@/components/common/icons/navigation/userIcon';
import UsersIcon from '@/components/common/icons/navigation/usersIcon';
import SelectedUsersIcon from '@/components/common/icons/navigation/selectedUsersIcon';
import SelectedUserIcon from '@/components/common/icons/navigation/selectedUserIcon';
import ProjectsIcon from '@/components/common/icons/navigation/projectsIcon';
import CustomerIcon from '@/components/common/icons/customerIcon';
import ZapIcon from '@/components/common/icons/ZapIcon';
import { useSelector } from 'react-redux';
import { selectRole } from '@/store/selectors/user';
import BookIcon from '@/components/common/icons/BookIcon';

interface Props{
  path: string;
}

const Navigation: React.FC<Props> = ({ path }) => {
  const role = useSelector(selectRole);
  const [{ navigation }] = useLanguage();

  const isUser = role === 'developer';
  const isAdminSales = role === 'admin' || role === 'sales';

  const getActionsLink = () => {
    switch (role) {
      case ('admin'):
        return '/actions/id';
      case ('sales'):
        return '/sales-actions';
      case ('developer'):
        return '/team-actions';
      default: return '/me';
    }
  };

  return (
    <NavigationContainer>
      <LinkWrap replace to="/me">
        <NavigationLink isStatus={path === 'you'}>
          <NavigationIcon>
            {path === 'you'
              ? <SelectedUserIcon />
              : <UserIcon />}
          </NavigationIcon>
          <Text>{navigation.you}</Text>
        </NavigationLink>
      </LinkWrap>

      <LinkWrap replace to="/users">
        <NavigationLink isStatus={path === 'users'}>
          <NavigationIcon>
            {path === 'users'
              ? <SelectedUsersIcon />
              : <UsersIcon />}
          </NavigationIcon>
          <Text>{navigation.team}</Text>
        </NavigationLink>
      </LinkWrap>
      <LinkWrap replace to={getActionsLink()}>
        <NavigationLink isStatus={path === 'actions'}>
          <NavigationIcon>
            {path === 'actions'
              ? <ZapIcon color="#21272E" />
              : <ZapIcon color="#B4BABF" />}
          </NavigationIcon>
          <Text>{navigation.actions}</Text>
        </NavigationLink>
      </LinkWrap>
      {
        isUser && (
          <LinkWrap replace to="/academy">
            <NavigationLink isStatus={path === 'academy'}>
              <NavigationIcon>
                {path === 'academy'
                  ? <BookIcon color="#21272E" />
                  : <BookIcon color="#B4BABF" />}
              </NavigationIcon>
              <Text>{navigation.academy}</Text>
            </NavigationLink>
          </LinkWrap>
        )
      }
      {
        isAdminSales && (
          <LinkWrap replace to="/customers">
            <NavigationLink isStatus={path === 'customers'}>
              <NavigationIcon>
                {path === 'customers'
                  ? <CustomerIcon color="#21272E" />
                  : <CustomerIcon color="#B4BABF" />}
              </NavigationIcon>
              <Text>{navigation.customers}</Text>
            </NavigationLink>
          </LinkWrap>
        )
      }
      <LinkWrap replace to="/projects">
        <NavigationLink isStatus={path === 'projects'}>
          <NavigationIcon>
            {path === 'projects'
              ? <ProjectsIcon color="#21272E" />
              : <ProjectsIcon />}
          </NavigationIcon>
          <Text>{navigation.projects}</Text>
        </NavigationLink>
      </LinkWrap>
    </NavigationContainer>
  );
};

const LinkWrap = styled(Link)`
  display: block;
  align-items: center;
  justify-content: center;
  width: 25%;
  text-decoration: none;
`;

const NavigationLink = styled.div<{isStatus: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${({ isStatus }) => (isStatus ? '#21272e' : '#b4babf')};
`;

const NavigationContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 64px;
  display: flex;
  box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.17);
  justify-content: space-around;
  bottom: 0;
  padding: 8px 0;
  background-color: white;
  z-index: 100;
  max-width: 552px;
  left: 50%;
  transform: translateX(-50%);
`;

const NavigationIcon = styled.div`
  width: 28px;
  height: 28px;
  margin-left: 4px;
`;

const Text = styled.p`
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  margin-top: auto;
`;

export default Navigation;
