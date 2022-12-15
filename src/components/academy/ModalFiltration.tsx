/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { slideInUp, fadeIn } from 'react-animations';

import { setFilters, cleanFilters, getAcademyTags } from '@/store/actions/academy';
import { selectFilters, selectTags, selectIsSaveLoading } from '@/store/selectors/academy';

import { HandleToggle } from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';
import UseWindowScrollBlock from '@/components/common/hooks/useWindowScrollBlock';
import useFocusInput from '@/components/common/hooks/useFocusInput';
import Item from '@/components/userTags/Item';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import useInput from '@/components/common/hooks/useInput';
import search from '@/utils/search';
import { Post } from '@/store/reducers/academy';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hideModal: HandleToggle;
  posts: Post[] | null;
}

const ModalFilters: React.FC<ModalProps> = ({
  hideModal,
  posts,
}) => {
  UseWindowScrollBlock();
  const [searchValue, setSearchValue] = useInput('');
  const [searchItem, setSearchItem] = useState<string[]>();
  const [inputRef, focusInput] = useFocusInput();
  const filters = useSelector(selectFilters);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsSaveLoading);
  const tags = useSelector(selectTags);

  const [{ common }] = useLanguage();

  const listWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getAcademyTags());
  }, []);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const toggleTag = (tag: string) => {
    const updatedFilters = filters.includes(tag)
      ? filters.filter((i: string) => i !== tag) : [...filters, tag];

    dispatch(setFilters(updatedFilters));
  };

  useEffect(() => {
    if (tags) {
      const arr = search(tags, searchValue, (tag) => tag);
      setSearchItem(arr);
    }
  }, [tags, searchValue]);

  useEffect(() => {
    if (listWrapper.current) {
      listWrapper.current!.addEventListener('scroll', hideKeyboardOnScroll, false);
      window.addEventListener('scroll', hideKeyboardOnScroll, false);
    }

    return () => {
      listWrapper.current!.removeEventListener('scroll', hideKeyboardOnScroll, false);
      window.removeEventListener('scroll', hideKeyboardOnScroll, false);
    };
  }, [listWrapper]);

  const hide = () => [!isLoading && hideModal(false)];

  const clearSearch = () => setSearchValue('');

  const clearFilters = () => {
    dispatch(cleanFilters());
  };

  const getTagStatus = (tag: string) => (
    Boolean(filters.includes(tag))
  );

  const getTagCount = (tag: string) => {
    let total = 0;
    posts?.forEach((post) => {
      if (post.tags?.includes(tag)) total += 1;
    });

    return total;
  };

  const hideKeyboardOnScroll = () => {
    inputRef.current!.blur();
  };

  return (
    <>
      <Background height={window.innerHeight} onClick={hideModal}>
        <Modal height={window.innerHeight} onClick={stopPropagation}>
          <Wrap>
            <SmallWrap>
              <SearchWrap>
                <SearchItem
                  onClick={focusInput}
                  ref={inputRef}
                  type="text"
                  autoFocus={false}
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder={common.search}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  autoCapitalize="off"
                />
                <PlusButton visibility={searchValue} onClick={clearSearch}>
                  <PlusIcon width="27px" height="27px" />
                </PlusButton>
              </SearchWrap>
              <FilterButton>
                <Button
                  disable={isLoading}
                  onClick={clearFilters}
                >
                  {common.clear}
                </Button>
                <Button
                  disable={isLoading}
                  onClick={hide}
                >
                  {common.close}
                </Button>
              </FilterButton>
            </SmallWrap>
          </Wrap>
          {
            !searchItem ? (
              <BodyWrap className="scrollbar" />
            ) : (
              <BodyWrap className="scrollbar" ref={listWrapper}>
                {
                  searchItem.map((tag) => (
                    <Item
                      tag={tag}
                      toggleTag={() => toggleTag(tag)}
                      status={getTagStatus(tag)}
                      count={getTagCount(tag)}
                    />
                  ))
                }
              </BodyWrap>
            )
          }
        </Modal>
      </Background>
    </>
  );
};

const SmallWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Wrap = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 16px 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Button = styled.div<{ disable: boolean }>`
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 20px;
  height: 36px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  text-align: center;
  line-height: 36px;
  color: ${({ disable }) => (disable ? '#787c80' : 'rgb(56 151 255)')};
`;

const FilterButton = styled.div`
  height: 41px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const BodyWrap = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  margin: 73px 0 0;
  height: calc(100% - 89px);
  overflow: auto;
`;

const Modal = styled.div<{ height: number }>`
  max-width: 552px;
  height: ${({ height }) => height && `${height / 1.5}px`};
  width: 100%;
  border-radius: 15px 15px 0 0;
  background-image: linear-gradient(to bottom, #ffffff, #ffffff),
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.4) 5%,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0)
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin: 0 auto;
  padding: 0 16px 0 16px;
  background-color: white;
  position: absolute;
  left: calc((100vw - 552px) / 2);
  bottom: 0;
  
  @media (max-width: 552px) {
    left: 0;
  }
  
  animation: 0.3s ${keyframes`${slideInUp}`};
`;

const Background = styled.div<{ height: number }>`
  width: 100vw;
  height: ${({ height }) => height && `${height}px`};
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
  animation: 0.3s ${keyframes`${fadeIn}`};
`;

const SearchItem = styled.input`
  width: 100%;
  padding: 8px 40px 8px 16px;
  font-size: 15px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #21272e;
  border: none;
  outline: none;
  caret-color: #fb7e14;
  border: 1px solid #dae1e8;
  border-radius: 8px;
  &::placeholder{
    color: #b4babf;
  }
`;

const SearchWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PlusButton = styled.div<{visibility: string}>`
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin-bottom: 2px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ visibility }) => (visibility.length > 0 ? 'visibile' : 'hidden')};
  position: absolute;
  right: 8px;
`;

export default ModalFilters;
