import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectIsLoading,
  selectIsSearchActive,
  selectSearchItems,
} from '@/store/selectors/search';
import { cleanSearch as clear, search } from '@/store/actions/search';
import { HandleToggle } from '@/components/common/hooks/useToggle';
import { Customer } from '@/store/reducers/customers';
import { SearchItem } from '@/store/reducers/search';
import { Project } from '@/store/reducers/projects';
import { User } from '@/store/reducers/user';

import SearchGreyIcon from '@/components/common/icons/items/SearchGreyIcon';
import useFocusInput from '@/components/common/hooks/useFocusInput';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import BackIcon from '@/components/common/icons/BackIcon';
import useLanguage from '@/components/common/hooks/useLanguage';
import useInput from '@/components/common/hooks/useInput';
import ProjectItem from '@/components/search/ProjectItem';
import CustomerItem from '@/components/customers/Item';
import Loader from '@/components/common/Loader';
import UserItem from '@/components/users/Item';
import useDebounce from '../common/hooks/useDebounce';

interface Props {
  developers: User[];
  customers: Customer[];
  projects: Project[];
  setDevelopers: React.Dispatch<React.SetStateAction<User[]>>;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  hide: HandleToggle;
}

const AddEntityModal: React.FC<Props> = ({
  hide,
  setDevelopers,
  setProjects,
  setCustomers,
  developers,
  customers,
  projects,
}) => {
  const [searchValue, setSearch] = useInput('');
  const [inputRef, focusInput] = useFocusInput();
  const debouncedValue = useDebounce<string>(searchValue, 100);

  const dispatch = useDispatch();
  const items = useSelector(selectSearchItems);
  const isLoading = useSelector(selectIsLoading);
  const isActive = useSelector(selectIsSearchActive);
  const [{ common }] = useLanguage();

  useEffect(() => {
    if (searchValue.length === 0) dispatch(clear());
    if (searchValue === '/') setSearch('');
  }, [searchValue]);

  useEffect(() => {
    if (searchValue && searchValue.length) dispatch(search({ filter: searchValue }));
  }, [debouncedValue]);

  useEffect(() => {
    if (!isActive) setSearch('');
  }, [isActive]);

  const listWrapper = useRef<HTMLDivElement>(null);

  const clearSearch = () => setSearch('');

  const handleCreateBond = (item: SearchItem) => {
    if (item.type === 'user') {
      const updated = [...developers];
      updated.push(item.content);
      setDevelopers(updated);
    }

    if (item.type === 'project') {
      const updated = [...projects];
      updated.push(item.content);
      setProjects(updated);
    }

    if (item.type === 'customer') {
      const updated = [...customers];
      updated.push(item.content);
      setCustomers(updated);
    }

    hide(false);
  };

  const possibleEntities = items?.filter((item) => (
    !developers.find(({ _id }) => _id === item.content._id)
    && !customers.find(({ _id }) => _id === item.content._id)
    && !projects.find(({ _id }) => _id === item.content._id)
  ));

  return (
    <>
      <SearchWrap>
        <Header>
          <HeaderWrap>
            <TopButton onClick={hide}>
              <BackIcon />
            </TopButton>
            <SearchInput
              onClick={focusInput}
              type="text"
              autoFocus
              value={searchValue}
              onChange={setSearch}
              placeholder={common.global_search}
              ref={inputRef}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              autoCapitalize="off"
            />
            {isLoading && (
              <SmallLoader>
                <Loader position={false} width="100%" height="100%" />
              </SmallLoader>
            )}
            <PlusButton visibility={searchValue} onClick={clearSearch}>
              <PlusIcon width="27px" height="27px" />
            </PlusButton>
          </HeaderWrap>
        </Header>
        <ItemsContainer ref={listWrapper}>
          {(!possibleEntities.length || searchValue.length === 0 ? (
            searchValue.length >= 0 && (
              <WrapNoResult>
                <SearchIcon>
                  <SearchGreyIcon />
                </SearchIcon>
                <NoResult>{common.no_results}</NoResult>
              </WrapNoResult>
            )
          ) : (
            <ResultsWrap onClick={hide}>
              {possibleEntities.map((item) => {
                switch (item.type) {
                  case 'user':
                    return (
                      <UserItem
                        onClick={() => handleCreateBond(item)}
                        key={`user-${item.content._id}`}
                        user={item.content}
                      />
                    );
                  case ('project'):
                    return (
                      <ProjectItem
                        onClick={() => handleCreateBond(item)}
                        key={`project-${item.content._id}`}
                        project={item.content}
                      />
                    );
                  case ('customer'):
                    return (
                      <CustomerItem
                        onClick={() => handleCreateBond(item)}
                        key={`customer-${item.content._id}`}
                        customer={item.content}
                      />
                    );
                  default: return null;
                }
              })}
            </ResultsWrap>
          ))}
        </ItemsContainer>
      </SearchWrap>
    </>
  );
};

const SearchWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const WrapNoResult = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  padding-bottom: 88px;
`;

const SearchIcon = styled.div`
  width: 32px;
  height: 32px;
`;

const NoResult = styled.div`
  font-size: 17px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: normal;
  text-align: center;
  color: #909599;
  margin-top: 18px;
`;

const ItemsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100% - 72px);
  border-radius: 0 0 5px 5px;
  padding: 20px 0;
`;

const SearchInput = styled.input`
  width: 85%;
  padding: 0 24px;
  height: 24px;
  font-size: 16.5px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #21272e;
  border: none;
  outline: none;
  caret-color: #fb7e14;
  &::placeholder{
    color: #b4babf;
  }
`;

const TopButton = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const PlusButton = styled.div<{visibility: string}>`
  cursor: pointer;
  width: 27px;
  height: 27px;
  margin-bottom: 2px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ visibility }) => (visibility.length > 0 ? 'visibile' : 'hidden')};
`;

const Header = styled.header`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
  width: 100%;
  max-width: 552px;
  border-radius: 5px 5px 0 0;
`;

const HeaderWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 16px;
  border-bottom: 1px solid rgb(33 39 46 / 12%);
`;

const SmallLoader = styled.div`
  position: absolute;
  top: 35px;
  right: 70px;
  transform: scale(0.5);
`;

const ResultsWrap = styled.div`
  height: 100%;
  overflow: scroll;
`;

export default AddEntityModal;
