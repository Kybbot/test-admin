import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { selectUsers, selectUsersTags } from '@/store/selectors/users';
import { getUsers, getUsersTags } from '@/store/actions/users';

import EmptyCatalog from '@/components/teamTags/EmptyCatalog';
import useToggle from '@/components/common/hooks/useToggle';
import ItemHeader from '@/components/teamTags/ItemHeader';
import TagItem from '@/components/teamTags/TagItem';
import Loader from '@/components/common/Loader';
import Search from '@/components/teamTags/Search';
import UsersList from '@/components/teamTags/UsersList';

const TeamTags: React.FC = () => {
  const [isActiveSearch, setActiveSearch] = useToggle();
  const [isActiveUsersList, setActiveUsersList] = useToggle();
  const [currentTag, setCurrentTag] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const tags = useSelector(selectUsersTags);
  const users = useSelector(selectUsers);

  const allTags = useMemo(() => {
    const obj = tags?.reduce<{oldTags: string[]; newTags: string[]}>((acc, cur) => {
      if (cur === 'Toddler' || cur === 'Prodigy' || cur === 'Bench') {
        acc.newTags.push(cur);
        return acc;
      }
      acc.oldTags.push(cur);
      return acc;
    }, { oldTags: [], newTags: [] });

    return obj;
  }, [tags]);

  useEffect(() => {
    dispatch(getUsersTags());
    dispatch(getUsers());
  }, []);

  const goBack = () => {
    history.goBack();
  };

  const getTagCount = (tag: string) => {
    let total = 0;
    users?.forEach((user) => {
      if (user.tags?.includes(tag)) total += 1;
    });

    return total;
  };

  const handleClick = (tag: string) => {
    setCurrentTag(tag);
    setActiveUsersList(true);
    setActiveSearch(false);
  };

  if (isActiveSearch) {
    return (
      <Search
        tags={tags!}
        hideSearch={setActiveSearch}
        openUsersList={handleClick}
      />
    );
  }

  if (isActiveUsersList) {
    return (
      <UsersList
        tag={currentTag!}
        hideSearch={setActiveUsersList}
        users={users!}
      />
    );
  }

  return (
    <>
      {!tags || !users
        ? <Loader scale="0.5" />
        : (
          <>
            <ItemHeader
                goBack={goBack}
                openSearch={setActiveSearch}
            />
            <ItemsContainer className="scrollbar">
              {allTags && allTags.oldTags.length > 0 ? (
                <>
                  {allTags.oldTags.map((tag) => (
                    <TagItem
                      key={tag}
                      onClick={() => handleClick(tag)}
                      tag={tag}
                      count={getTagCount(tag)}
                    />
                  ))}
                  <div style={{ marginTop: 70 }}>
                    {allTags.newTags.map((tag) => (
                      <TagItem
                        key={tag}
                        onClick={() => handleClick(tag)}
                        tag={tag}
                        count={getTagCount(tag)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <EmptyCatalog />
              )}
            </ItemsContainer>
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
  padding: 8px 16px 12px;
  overflow-y: auto;
`;

export default TeamTags;
