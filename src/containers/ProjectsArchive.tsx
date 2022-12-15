import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { cleanProjects, getProjectsArchive } from '@/store/actions/projects';
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

const ProjectsArchive: React.FC = () => {
  const [isActiveSearch, setActiveSearch] = useToggle();

  const dispatch = useDispatch();
  const history = useHistory();
  const projects = useSelector(selectProjectsLight);
  const role = useSelector(selectRole);
  const isAdmin = role === 'admin';

  const [{ common }] = useLanguage();

  useEffect(() => {
    dispatch(getProjectsArchive());

    return () => {
      dispatch(cleanProjects());
    };
  }, []);

  if (isActiveSearch) {
    return <Search projects={projects!} hideSearch={setActiveSearch} />;
  }

  return (
    <>

      {!projects
        ? <Loader scale="0.5" />
        : (
          <>
            <ItemHeader
                openSearch={setActiveSearch}
                isAdmin={isAdmin}
                headerName={common.archive}
                goBack={history.goBack}
            />
            <ItemsContainer className="scrollbar">
              {projects.length > 0 ? (
                <Catalog
                  projects={projects}
                />
              ) : (
                <EmptyCatalog isAdmin={isAdmin} isArchive />
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

export default ProjectsArchive;
