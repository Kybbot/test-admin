import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { Buffer } from 'buffer';

import { addUser, getEnglishLevels, getUsersRoles } from '@/store/actions/users';
import { selectIsSaveLoading, selectUsersRoles } from '@/store/selectors/users';

import useLanguage from '@/components/common/hooks/useLanguage';
import { validateEmail } from '@/utils/validate-email';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useInput from '@/components/common/hooks/useInput';
import useToggle from '@/components/common/hooks/useToggle';
import DropDownSelectDate from '@/components/users/DropDownSelectDate';
import Loader from '@/components/common/Loader';
import Button from '@/components/Button';
import Input from '@/components/Input';

const AddManager: React.FC = () => {
  const [name, setName] = useInput('');
  const [lastName, setLastName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [birthday, setBirthday] = useInput('');
  const [hireMonth, setHireMonth] = useState<string | null>(null);
  const [hireYear, setHireYear] = useState<number | null>(null);
  const [isNameEmpty, toggleIsNameEmpty] = useToggle(false);
  const [isLastNameEmpty, toggleIsLastNameEmpty] = useToggle();
  const [isPasswordEmpty, toggleIsPasswordEmpty] = useToggle();
  const [isEmailInvalid, toggleIsEmailInvalid] = useToggle();
  const [isBirthdayInvalid, toggleIsBirthdayInvalid] = useToggle();
  const [isHireDateEmpty, toggleIsHireDateEmpty] = useToggle();

  const [{ inputsPages }] = useLanguage();

  const roles = useSelector(selectUsersRoles);
  const isSaveLoading = useSelector(selectIsSaveLoading);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersRoles());
    dispatch(getEnglishLevels());
  }, []);

  const handleSaveButtonClick = () => {
    if (!name) toggleIsNameEmpty(true);
    if (!lastName) toggleIsLastNameEmpty(true);
    if (!password) toggleIsPasswordEmpty(true);
    if (!email) toggleIsEmailInvalid(true);
    if (!moment(moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'), 'YYYY-MM-DD', true).isValid()) toggleIsBirthdayInvalid(true);
    if (!hireYear || !hireMonth) toggleIsHireDateEmpty(true);

    if (!name
    || !lastName
    || !password
    || !email
    || !moment(moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'), 'YYYY-MM-DD', true).isValid()
    || !hireYear
    || !hireMonth) return;

    const body = {
      name: `${name} ${lastName}`,
      email,
      password: Buffer.from(password).toString('base64'),
      birthday: moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      role: 'sales',
      hireDate: moment(`${hireMonth}-${hireYear}`, 'MMM-YYYY').format('YYYY-MM'),
    };

    dispatch(addUser(body));
  };

  useEffect(() => {
    if (birthday) toggleIsBirthdayInvalid(!moment(birthday, 'DD/MM/YYYY', true).isValid());
    if (name) toggleIsNameEmpty(false);
    if (lastName) toggleIsLastNameEmpty(false);
    if (password) toggleIsPasswordEmpty(false);
    if (email) toggleIsEmailInvalid(!validateEmail(email));
    if (hireYear && hireMonth) toggleIsHireDateEmpty(false);
  }, [
    birthday,
    name,
    email,
    lastName,
    password,
    hireMonth,
    hireYear,
  ]);

  const isSaveButtonDisabled = (
    isNameEmpty
    || isLastNameEmpty
    || isPasswordEmpty
    || isEmailInvalid
    || isBirthdayInvalid
    || isHireDateEmpty
  );

  const handleGoToUsers = () => history.goBack();

  return (
    <>
      <Header>
        <IconWrap onClick={handleGoToUsers}>
          <CloseIcon />
        </IconWrap>
        <Title>{inputsPages.add_manager}</Title>
      </Header>
      {!roles
        ? <Loader scale="0.5" />
        : (
          <MainWrap>
            <Wrapper>
              <InputsWrap>
                <Input
                    type="text"
                    placeholder="Taras"
                    label={`${inputsPages.firs_name}*`}
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
                  label={`${inputsPages.last_name}*`}
                  onChange={setLastName}
                  value={lastName}
                  errorMsg={inputsPages.required}
                  isError={isLastNameEmpty}
                  autocapitalize="words"
                />
              </InputsWrap>
              <InputWrap>
                <DropDownSelectDate
                  monthValue={hireMonth}
                  yearValue={hireYear}
                  setMonthValue={setHireMonth}
                  setYearValue={setHireYear}
                  text={`${inputsPages.hire_date}*`}
                />
              </InputWrap>
              <InputWrap>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  label={`${inputsPages.email}*`}
                  onChange={setEmail}
                  value={email}
                  errorMsg={inputsPages.not_valid}
                  isError={isEmailInvalid}
                  autocapitalize="words"
                />
              </InputWrap>
              <InputWrap>
                <Input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  label={`${inputsPages.birthday}*`}
                  onChange={setBirthday}
                  value={birthday}
                  errorMsg={inputsPages.not_valid}
                  isError={isBirthdayInvalid}
                  autocapitalize="words"
                  isDate
                />
              </InputWrap>
              <InputWrap>
                <Input
                  type="text"
                  placeholder="•••••••"
                  label={`${inputsPages.password}*`}
                  onChange={setPassword}
                  value={password}
                  errorMsg={inputsPages.required}
                  isError={isPasswordEmpty}
                  autocapitalize="words"
                />
              </InputWrap>
            </Wrapper>
            <ButtonWrap>
              <Button
                onClick={handleSaveButtonClick}
                isLoading={isSaveLoading}
                shadow
                disabledOnly={isSaveButtonDisabled}
                isFixed={false}
              >
                {inputsPages.save}
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
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  background: white;
  justify-content: space-between;
`;

const InputWrap = styled.div`
  font-weight: 400 !important;
  margin-bottom: 40px;
  width: 100%;
`;

const InputsWrap = styled.div`
  display: flex;
  margin-bottom: 40px;
  width: 100%;
`;

const EmptyPlace = styled.div`
  width: 16px;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const ButtonWrap = styled.div`
  width: 100%;
`;

export default AddManager;
