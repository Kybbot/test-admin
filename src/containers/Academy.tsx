import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { cleanAcademy, getPosts } from '@/store/actions/academy';
import { selectFilters, selectPosts } from '@/store/selectors/academy';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import ModalFilters from '@/components/academy/ModalFiltration';
import EmptyCatalog from '@/components/academy/EmptyCatalog';
import ItemHeader from '@/components/academy/ItemHeader';
import CreatePost from '@/components/academy/CreatePost';
import Catalog from '@/components/academy/Catalog';
import { Post } from '@/store/reducers/academy';
import Loader from '@/components/common/Loader';
import Navigation from '@/components/Navigation';
import { useHistory } from 'react-router';
import { cleanUsers, getUsersWithManagers } from '@/store/actions/users';

const Academy: React.FC = () => {
  const [isCreatePostActive, toggleIsCreatePostActive] = useToggle();
  const [isModalFiltersActive, toggleIsModalFiltersActive] = useToggle();
  const [filteredPosts, setFilteredPosts] = useState<Post[] | null>(null);

  const [{ common }] = useLanguage();
  const filters = useSelector(selectFilters);
  const posts = useSelector(selectPosts);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersWithManagers());
    dispatch(getPosts());
    return () => {
      if (!history.location.pathname.includes('academy')) {
        dispatch(cleanUsers());
        dispatch(cleanAcademy());
      }
    };
  }, []);

  useEffect(() => {
    if (!filters.length && posts) {
      setFilteredPosts(posts);
    }

    if (filters.length && posts) {
      const filteredByTag = posts!.filter(({ tags }) => (
        filters.every((filter) => tags?.includes(filter))));

      setFilteredPosts(filteredByTag);
    }
  }, [posts, filters]);

  if (isCreatePostActive) {
    return (
      <CreatePost
        hide={toggleIsCreatePostActive}
      />
    );
  }

  return (
    <>

      {!filteredPosts
        ? <Loader scale="0.5" />
        : (
          <>
            <ItemHeader
                headerName={common.lambda_edu}
                openAdd={toggleIsCreatePostActive}
                toggleFilter={toggleIsModalFiltersActive}
                isFilterActive={Boolean(filters.length)}
            />
            <ItemsContainer className="scrollbar">
              {filteredPosts.length ? (
                <Catalog
                  posts={filteredPosts!}
                />
              ) : (
                <EmptyCatalog />
              )}
            </ItemsContainer>
            <Navigation path="academy" />
          </>
        )}
      {isModalFiltersActive && (
        <ModalFilters
          hideModal={toggleIsModalFiltersActive}
          posts={filteredPosts}
        />
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

export default Academy;
