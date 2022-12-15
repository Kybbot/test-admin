import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
  getProjectsLight,
  cleanProjectsLight,
} from '@/store/actions/projects';
import { selectProjectsLight } from '@/store/selectors/projects';
import { selectRole } from '@/store/selectors/user';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import Catalog from '@/components/projects/Catalog';
import EmptyCatalog from '@/components/projects/EmptyCatalog';
import ItemHeader from '@/components/projects/ItemHeader';
import Navigation from '@/components/Navigation';
import Search from '@/components/projects/Search';
import Loader from '@/components/common/Loader';
import { ProjectLight } from '@/store/reducers/projects';
import moment from 'moment';
import { getCustomers } from '@/store/actions/customers';

const Projects: React.FC = () => {
  const [isActiveSearch, setActiveSearch] = useToggle();
  const [isSortActive, toggleIsSortActive] = useToggle(true);
  const [filteredProjects, setFilteredProjects] = useState<ProjectLight[] | null>(null);

  const [{ common }] = useLanguage();

  const dispatch = useDispatch();
  const projects = useSelector(selectProjectsLight);
  const role = useSelector(selectRole);
  const isAdmin = role === 'admin';

  useEffect(() => {
    dispatch(getProjectsLight());
    dispatch(getCustomers());
    return () => {
      dispatch(cleanProjectsLight());
    };
  }, []);

  useEffect(() => {
    if (isSortActive && projects) {
      const sorted = projects
        .slice().sort(({ deadline: a }, { deadline: b }) => {
          if (moment(a).valueOf() === 0) return -1;
          if (moment(b).valueOf() === 0) return 1;
          return moment(b).valueOf() - moment(a).valueOf();
        });

      setFilteredProjects(sorted);
    } else {
      setFilteredProjects(projects);
    }
  }, [isSortActive, projects]);

  if (isActiveSearch) {
    return <Search projects={filteredProjects!} hideSearch={setActiveSearch} />;
  }

  return (
    <>
      {!filteredProjects
        ? <Loader scale="0.5" />
        : (
          <>
            <ItemHeader
                openSearch={setActiveSearch}
                isAdmin={isAdmin}
                headerName={common.projects}
                isSortActive={isSortActive}
                toggleSort={toggleIsSortActive}
            />
            <ItemsContainer className="scrollbar">
              {filteredProjects.length > 0 ? (
                <Catalog
                  projects={filteredProjects}
                />
              ) : (
                <EmptyCatalog isAdmin={isAdmin} />
              )}
            </ItemsContainer>
            {!isActiveSearch && (
            <Navigation path="projects" />
            )}
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

export default Projects;
