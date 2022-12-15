import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { cleanActions, getActions } from '@/store/actions/actions';
import { selectUser } from '@/store/selectors/user';

import useLanguage from '@/components/common/hooks/useLanguage';
import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import ItemHeader from '@/components/actions/ItemHeader';
import EmptyCatalog from '@/components/actions/EmptyCatalog';
import useToggle from '@/components/common/hooks/useToggle';
import { Action, ActionType } from '@/store/reducers/actions';
import CreateSalesReminder from '@/components/salesActions/CreateSalesReminder';
import Catalog from '@/components/salesActions/Catalog';
import Loader from '@/components/common/Loader';
import Navigation from '@/components/Navigation';
import ClockIcon from '@/components/СlockIcon';
import { selectCurrentActions } from '@/store/selectors/actions';
import { cleanProjects, getProjects } from '@/store/actions/projects';
import { cleanCustomers, getCustomers } from '@/store/actions/customers';
import { cleanUsers, getUsersWithManagers } from '@/store/actions/users';

const SalesActions: React.FC = () => {
  const [isCreateReminderActive, toggleIsCreateReminderActive] = useToggle();
  const [isFilterActive, toggleIsFilterActive] = useToggle();
  const [filteredActions, setFilteredActions] = useState<Action[] | null>(null);
  const history = useHistory();
  const [{ common }] = useLanguage();

  const dispatch = useDispatch();
  const actions = useSelector(selectCurrentActions);
  const user = useSelector(selectUser);

  useEffect(() => {
    const getInfo = async () => {
      if (history.action === 'REPLACE' || !actions) {
        dispatch(getActions(user?.role));
        dispatch(getUsersWithManagers());
        dispatch(getProjects());
        dispatch(getCustomers());
      }
    };
    getInfo();
    return () => {
      if (!history.location.pathname.includes('actions')) {
        dispatch(cleanActions());
        dispatch(cleanUsers());
        dispatch(cleanProjects());
        dispatch(cleanCustomers());
      }
    };
  }, []);

  useEffect(() => {
    if (isFilterActive) {
      const filtered = actions!.filter((action) => (
        action.type === ActionType.SALES && action.assign.includes(user!._id)
      ));

      setFilteredActions(filtered);
    } else {
      setFilteredActions(actions);
    }
  }, [isFilterActive, actions]);

  if (isCreateReminderActive) {
    return (
      <CreateSalesReminder
        hide={toggleIsCreateReminderActive}
      />
    );
  }

  return (
    <>

      {!filteredActions || !actions
        ? <Loader scale="0.5" />
        : (
          <>
            <ItemHeader
                headerName={common.sales_actions}
                openAdd={toggleIsCreateReminderActive}
                toggleFilter={toggleIsFilterActive}
                isFilterActive={isFilterActive}
                isSales
            />
            <ItemsContainer className="scrollbar">
              <ItemWrap to="/sales-actions/upcoming">
                <ItemInfo>
                  <LinkUser>
                    <IconWrap>
                      <ClockIcon color="black" />
                    </IconWrap>
                    <NameItem isColor>{common.upcoming_actions}</NameItem>
                  </LinkUser>
                </ItemInfo>
                <LinkUser>
                  <RightArrow>
                    <SmallArrowIcon />
                  </RightArrow>
                </LinkUser>
              </ItemWrap>
              {filteredActions.length ? (
                <Catalog
                  pageType="current"
                  actions={filteredActions!}
                />
              ) : (
                <EmptyCatalog />
              )}
            </ItemsContainer>
            <Navigation path="actions" />
          </>
        )}
    </>
  );
};

const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  padding: 16px 0;
  overflow-y: auto;
`;

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const RightArrow = styled.div`
  margin-top: 3px;
`;

const ItemInfo = styled.div`
  width: 100%;
`;

const NameItem = styled.div<{isColor: boolean}>`
  font-size: 14px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: ${({ isColor }) => (isColor ? '#21272e' : '#909599')};
  word-break: break-word;

  &:first-letter {
    text-transform: uppercase;
  }

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
  padding: 0 20px 0 10px;
  height: 50px;
  margin: 8px 16px 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  position: relative;
  text-decoration: none;
`;

const IconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  background-position: center;
`;

export default SalesActions;
