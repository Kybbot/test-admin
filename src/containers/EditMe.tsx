import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { editMe } from '@/store/actions/users';

import { selectUser } from '@/store/selectors/user';
import { selectIsSaveLoading } from '@/store/selectors/users';

import useLanguage from '@/components/common/hooks/useLanguage';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useInput from '@/components/common/hooks/useInput';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputFile from '@/components/InputFile';
import Loader from '@/components/common/Loader';
import getPhoto from '@/utils/getPhoto';
import getMomentSting from '@/utils/getMomentSting';

interface Props extends RouteComponentProps<{ userId: string }> {}

const EditMe: React.FC<Props> = ({ history }) => {
  const [name, setName] = useInput('');
  const [lastName, setLastName] = useInput('');
  const user = useSelector(selectUser);
  const [{ src, alt, file }, setPhotoFile] = useState({
    src: getPhoto(user!.smallPhoto),
    alt: 'Select Image',
    file: '',
  });

  const [birthday, setBirthday] = useInput('');
  const [{ inputsPages }] = useLanguage();
  const isSaveLoading = useSelector(selectIsSaveLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      if (user.name) setName(user.name.split(' ')[0]);
      if (user.name) setLastName(user.name.split(' ')[1]);
      if (user.birthday) setBirthday(moment(user.birthday).format('DD/MM/YYYY'));
    }
  }, [user]);

  const handleSaveButtonClick = () => {
    const formData = new FormData();
    if (file) formData.append('image', file);

    const body = {
      name: `${name} ${lastName}`,
      birthday: getMomentSting(moment(birthday, 'DD/MM/YYYY')),
    };
    dispatch(editMe(body, formData));
  };

  const isNameEmpty = name.length === 0;
  const isLastNameEmpty = lastName.length === 0;
  const isBirthdayValid = moment(birthday, 'DD/MM/YYYY').isValid();

  const isSaveButtonDisabled = isNameEmpty || isLastNameEmpty;

  const handleGoToMe = () => history.push('/me');

  const handlePhotoFile = (e: any) => {
    if (e.target.files[0]) {
      setPhotoFile({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
        file: e.target.files[0],
      });
    }
  };

  return (
    <>
      <Header>
        <IconWrap onClick={handleGoToMe}>
          <CloseIcon />
        </IconWrap>
        <Title>{inputsPages.edit}</Title>
      </Header>
      {!user ? (
        <Loader scale="0.5" />
      ) : (
        <MainWrap>
          <Wrapper>
            <InputsWrap>
              <Input
                type="text"
                placeholder="Taras"
                label={inputsPages.firs_name}
                onChange={setName}
                value={name}
                errorMsg="Name is required"
                isError={isNameEmpty}
                autocapitalize="words"
              />
              <EmptyPlace />
              <Input
                type="text"
                placeholder="Shevchenko"
                label={inputsPages.last_name}
                onChange={setLastName}
                value={lastName}
                errorMsg="Lastname is required"
                isError={isLastNameEmpty}
                autocapitalize="words"
              />
            </InputsWrap>
            <InputWrap>
              <InputFile
                src={src}
                alt={alt}
                file={file}
                type="file"
                handlePhotoFile={handlePhotoFile}
              />
            </InputWrap>
            <InputWrap>
              <Input
                type="text"
                placeholder="DD/MM/YYYY"
                label={inputsPages.birthday}
                onChange={setBirthday}
                value={birthday}
                errorMsg="Birthday isn't valid"
                isError={!isBirthdayValid}
                autocapitalize="words"
                isDate
              />
            </InputWrap>
          </Wrapper>
          <ButtonWrap>
            <Button
              onClick={handleSaveButtonClick}
              isLoading={isSaveLoading}
              disabledOnly={isSaveButtonDisabled}
              shadow
              isFixed={false}
            >
              {inputsPages.save_changes}
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
  position: fixed;
  top: 0;
  left: 50%;
  max-width: 552px;
  width: 100%;
  transform: translateX(-50%);
  z-index: 1;
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
  // min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 100px 16px 16px;
  overflow-y: auto;
  flex-shrink: 0;
  background: white;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const InputWrap = styled.div`
  font-weight: 400 !important;
  margin-bottom: 40px;
  width: 100%;
`;

const InputsWrap = styled.div<{ alt?: string }>`
  display: flex;
  margin-bottom: 40px;
  width: 100%;
`;

const EmptyPlace = styled.div`
  width: 16px;
`;

const ButtonWrap = styled.div`
  width: 100%;
`;

export default EditMe;
