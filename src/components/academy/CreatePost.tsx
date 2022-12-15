/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectIsSaveLoading, selectTags } from '@/store/selectors/academy';
import { cleanAcademy, createPost, getAcademyTags } from '@/store/actions/academy';

import useToggle, { HandleToggle } from '@/components/common/hooks/useToggle';

import useLanguage from '@/components/common/hooks/useLanguage';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useInput from '@/components/common/hooks/useInput';
import DropDownSelect from '@/components/DropDownSelect';
import Loader from '@/components/common/Loader';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
import { PostDifficulty } from '@/store/reducers/academy';
import Input from '@/components/Input';
import MultiplyInput from '@/components/common/MiltiplyInput';
import DropDownCustomSelect from '@/components/DropDownMultiplyCustomSelect';
import { validateUrl } from '@/utils/validate-url';

interface Props {
  hide: HandleToggle;
}

const CreatePost: React.FC<Props> = ({
  hide,
}) => {
  const [title, setTitle] = useInput('');
  const [tags, setTags] = useState<string[]>(['']);
  const [description, setDescription] = useInput('');
  const [difficulty, setDifficulty] = useState<PostDifficulty>(PostDifficulty.NORMAL);
  const [links, setLinks] = useState<string[]>(['']);
  const [isErrorLinks, setIsErrorLinks] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isSaveButtonClick, toggleIsSaveButtonClick] = useToggle(false);

  const [{ inputsPages }] = useLanguage();

  const isSaveLoading = useSelector(selectIsSaveLoading);
  const academyTags = useSelector(selectTags);
  const dispatch = useDispatch();

  const handleAddTagsField = () => {
    setTags([...tags, '']);
  };

  useEffect(() => {
    dispatch(getAcademyTags());
  }, []);

  useEffect(() => {
    setIsErrorLinks(links.every((link) => !validateUrl(link)));
  }, [links]);

  useEffect(() => {
    if (!isSaveLoading && isSaveButtonClick) hide(false);
  }, [isSaveLoading, isSaveButtonClick]);

  const handleSaveButtonClick = () => {
    const formData = new FormData();

    formData.append('title', title);

    formData.append('difficulty', difficulty);

    tags.forEach((tag) => {
      if (tag.length) formData.append('tags', tag);
    });

    links.forEach((link) => {
      if (link.length) formData.append('links', link);
    });

    if (description) formData.append('description', description);

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
    }

    dispatch(createPost(formData));

    dispatch(cleanAcademy());

    toggleIsSaveButtonClick(true);
  };

  const isTitleEmpty = title.length === 0;

  const isSaveButtonDisabled = (
    isTitleEmpty
    || isErrorLinks
  );

  const handleAddLinksField = () => {
    setLinks([...links, '']);
  };

  const handleGoBack = () => hide(false);

  return (
    <>
      <Header>
        <IconWrap onClick={handleGoBack}>
          <CloseIcon />
        </IconWrap>
        <Title>{inputsPages.create_post}</Title>
      </Header>
      { !academyTags ? (
        <Loader />
      ) : (
        <MainWrap className="scrollbar">
          <InputsWrap>
            <InputWrap>
              <Input
                type="Title"
                placeholder="Title of the post"
                label={`${inputsPages.post_title}*`}
                onChange={setTitle}
                value={title}
                isError={isTitleEmpty}
                autocapitalize="words"
              />
            </InputWrap>
            <InputWrap>
              <TextArea
                setDescription={setDescription}
                descriptionValue={description}
                name={`${inputsPages.description}`}
              />
            </InputWrap>
            <DropdownWrap>
              <DropDownSelect
                text={inputsPages.difficulty}
                value={difficulty}
                setValue={setDifficulty}
                values={Object.values(PostDifficulty)}
              />
            </DropdownWrap>
            <DropdownWrap>
              {tags.map((val, index) => (
                <DropDownCustomSelect
                  key={val + tags.length + index}
                  text={index === 0 ? inputsPages.tags : ''}
                  value={tags}
                  setValue={setTags}
                  values={academyTags.filter((el) => !tags.includes(el))}
                  index={index}
                />
              ))}
              <ActionButtonWrap onClick={handleAddTagsField}>
                <ItemInfo>
                  <LinkUser>
                    <ActionNameItem isColor>{inputsPages.add}</ActionNameItem>
                  </LinkUser>
                </ItemInfo>
              </ActionButtonWrap>
            </DropdownWrap>
            <InputWrap>
              {links.map((val, index) => (
                <MultiplyInput
                  key={val + links.length + index}
                  type="text"
                  index={index}
                  placeholder="link.com"
                  label={index === 0 ? inputsPages.link : ''}
                  setValue={setLinks}
                  value={links}
                  errorMsg={inputsPages.not_valid}
                  autocapitalize="words"
                />
              ))}
              <ActionButtonWrap onClick={handleAddLinksField}>
                <ItemInfo>
                  <LinkUser>
                    <ActionNameItem isColor>{inputsPages.add}</ActionNameItem>
                  </LinkUser>
                </ItemInfo>
              </ActionButtonWrap>
            </InputWrap>
            <InputWrap>
              <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
            </InputWrap>
          </InputsWrap>
          <ButtonWrap>
            <Button
              onClick={handleSaveButtonClick}
              isLoading={isSaveLoading}
              disabledOnly={isSaveButtonDisabled}
              shadow
              isFixed={false}
            >
              {inputsPages.create}
            </Button>
          </ButtonWrap>
        </MainWrap>
      )}
    </>
  );
};

const Header = styled.header`
  height: 72px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  position: relative;
  max-width: 552px;
  width: 100%;
  z-index: 99;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const IconWrap = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 24px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 28px 16px 16px;
  overflow-y: auto;
  background: white;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
`;

const InputWrap = styled.div`
  font-weight: 400 !important;
  margin-bottom: 40px;
  width: 100%;
`;

const DropdownWrap = styled.div`
  font-weight: 400 !important;
  margin-bottom: 40px;
  width: 100%;
  
  span {
    top: -7px;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
`;

const ActionButtonWrap = styled.div`
  padding: 0 10px 0 10px;
  height: 50px;
  margin: 8px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  position: relative;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
`;

const ItemInfo = styled.div`
  width: 100%;
`;

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionNameItem = styled.div<{isColor: boolean}>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: ${({ isColor }) => (isColor ? '#21272e' : '#909599')};
  word-break: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  
  &:first-letter {
    text-transform: capitalize;
  }


  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const InputsWrap = styled.div`
  width: 100%;
`;

export default CreatePost;
