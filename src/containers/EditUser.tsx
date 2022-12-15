import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import {
  editUser,
  cleanUser,
  getUser,
  getUsersRoles,
  getEnglishLevels,
} from '@/store/actions/users';
import {
  selectEnglishLevels,
  selectIsSaveLoading,
  selectUser,
  selectUsersRoles,
} from '@/store/selectors/users';

import useLanguage from '@/components/common/hooks/useLanguage';
import DropDownSelectDate from '@/components/users/DropDownSelectDate';
import DropDownSelect from '@/components/DropDownSelect';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useInput from '@/components/common/hooks/useInput';
import Loader from '@/components/common/Loader';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputFile from '@/components/InputFile';

import getPhoto from '@/utils/getPhoto';

interface Props extends RouteComponentProps<{ userId: string }> {}

const EditUser: React.FC<Props> = ({ match, history }) => {
  const [name, setName] = useInput('');
  const [lastName, setLastName] = useInput('');
  const user = useSelector(selectUser);
  const [{ src, alt, file }, setPhotoFile] = useState({
    src: user ? getPhoto(user!.smallPhoto!) : '/assets/noname.png',
    alt: 'Select Image',
    file: '',
  });

  const [birthday, setBirthday] = useInput('');
  const [role, setRole] = useState('');
  const [englishLevel, setEnglishLevel] = useState('');
  const [hireMonth, setHireMonth] = useState<string | null>(null);
  const [hireYear, setHireYear] = useState<number | null>(null);

  const [{ inputsPages }] = useLanguage();

  const roles = useSelector(selectUsersRoles);
  const englishLevels = useSelector(selectEnglishLevels);
  const isSaveLoading = useSelector(selectIsSaveLoading);

  const id = match.params.userId;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(+id));
    dispatch(getUsersRoles());
    dispatch(getEnglishLevels());

    return () => {
      dispatch(cleanUser());
    };
  }, []);

  useEffect(() => {
    if (user) {
      if (user.name) setName(user.name.split(' ')[0]);
      if (user.name) setLastName(user.name.split(' ')[1]);
      // if (user.smallPhoto) setUpdatedPhoto(getPhoto(user.smallPhoto));
      if (user.english) setEnglishLevel(user.english);
      if (user.role) setRole(user.role);
      if (user.birthday) setBirthday(moment(user.birthday).format('DD/MM/YYYY'));
      if (user.hireDate) {
        setHireMonth(moment(user.hireDate).format('MMM'));
        setHireYear(Number(moment(user.hireDate).format('YYYY')));
      }
    }
  }, [user]);

  const handleSaveButtonClick = () => {
    const formData = new FormData();
    if (file) formData.append('image', file);

    const body = {
      name: `${name} ${lastName}`,
      birthday: moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      english: englishLevel || undefined,
      hireDate: moment(`${hireMonth}-${hireYear}`, 'MMM-YYYY').format('YYYY-MM'),
      role: role || undefined,
    };

    dispatch(editUser(body, +id, true, formData));
  };
  const isNameEmpty = name.length === 0;
  const isLastNameEmpty = lastName.length === 0;
  const isBirthdayValid = moment(moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'), 'YYYY-MM-DD', true).isValid();

  const isSaveButtonDisabled = (
    isNameEmpty
    || isLastNameEmpty
  );

  const handleChangeRole = (roleName: string) => {
    setRole(roleName);
  };

  const handleEnglishLevel = (level: string) => {
    setEnglishLevel(level);
  };

  const handleGoToUser = () => history.goBack();

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
      {
        !user || !roles || !englishLevels
          ? <Loader scale="0.5" />
          : (
            <>
              <Header>
                <IconWrap onClick={handleGoToUser}>
                  <CloseIcon />
                </IconWrap>
                <Title>{inputsPages.edit}</Title>
              </Header>
              <MainWrap className="scrollbar">
                <InputsWrap>
                  <Input
                    type="text"
                    placeholder="Taras"
                    label={inputsPages.firs_name}
                    onChange={setName}
                    value={name}
                    errorMsg={inputsPages.required}
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
                    errorMsg={inputsPages.required}
                    isError={isLastNameEmpty}
                    autocapitalize="words"
                  />
                </InputsWrap>
                <InputWrap>
                  <DropDownSelect
                    value={role}
                    setValue={handleChangeRole}
                    text={inputsPages.role}
                    values={roles}
                  />
                </InputWrap>
                <InputWrap>
                  <DropDownSelectDate
                    monthValue={hireMonth}
                    yearValue={hireYear}
                    setMonthValue={setHireMonth}
                    setYearValue={setHireYear}
                    text={inputsPages.hire_date}
                  />
                </InputWrap>
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
                  <DropDownSelect
                    value={englishLevel}
                    setValue={handleEnglishLevel}
                    text={inputsPages.english}
                    values={englishLevels}
                  />
                </InputWrap>
                <InputWrap>
                  <Input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    label={inputsPages.birthday}
                    onChange={setBirthday}
                    value={birthday}
                    errorMsg={inputsPages.not_valid}
                    isError={!isBirthdayValid}
                    autocapitalize="words"
                    isDate
                  />
                </InputWrap>
                <ButtonWrap>
                  <Button
                    onClick={handleSaveButtonClick}
                    isLoading={isSaveLoading}
                    disabledOnly={isSaveButtonDisabled}
                    shadow
                  >
                    {inputsPages.save_changes}
                  </Button>
                </ButtonWrap>
              </MainWrap>
            </>
          )
      }
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
  z-index: 999;
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
  height: 100%;
  padding: 28px 16px 32px 16px;
  overflow-y: auto;
  background: white;
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

export default EditUser;
