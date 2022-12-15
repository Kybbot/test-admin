import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Buffer } from 'buffer';
import { useHistory } from 'react-router';

import { selectIsChangePasswordReject, selectIsSaveLoading } from '@/store/selectors/auth';

import { changePassword } from '@/store/actions/login';

import useLanguage from '@/components/common/hooks/useLanguage';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useInput from '@/components/common/hooks/useInput';
import useToggle from '@/components/common/hooks/useToggle';
import Button from '@/components/Button';
import Input from '@/components/Input';

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useInput('');
  const [newPassword, setNewPassword] = useInput('');
  const [repeatPassword, setRepeatPassword] = useInput('');
  const [isOldPasswordEmpty, toggleIsOldPasswordEmpty] = useToggle();
  const [isNewPasswordEmpty, toggleIsNewPasswordEmpty] = useToggle();
  const [isRepeatPaswordEmpty, toggleIsRepeatPasswordEmpty] = useToggle();
  const [isNotSamePasswords, toggleIsNotSamePasswords] = useToggle();

  const [{ inputsPages, mePage }] = useLanguage();

  const isSaveLoading = useSelector(selectIsSaveLoading);
  const isError = useSelector(selectIsChangePasswordReject);

  const history = useHistory();

  const dispatch = useDispatch();

  const handleSaveButtonClick = () => {
    if (!oldPassword) toggleIsOldPasswordEmpty(true);
    if (!newPassword) toggleIsNewPasswordEmpty(true);
    if (!repeatPassword) toggleIsRepeatPasswordEmpty(true);
    if (newPassword !== repeatPassword) toggleIsNotSamePasswords(true);

    if (!oldPassword
      || !newPassword
      || !repeatPassword
      || newPassword !== repeatPassword
    ) return;

    const body = {
      newPassword: Buffer.from(newPassword).toString('base64'),
      oldPassword: Buffer.from(oldPassword).toString('base64'),
    };

    dispatch(changePassword(body));
  };

  useEffect(() => {
    if (oldPassword) toggleIsOldPasswordEmpty(false);
    if (newPassword) toggleIsNewPasswordEmpty(false);
    if (repeatPassword) toggleIsRepeatPasswordEmpty(false);
    if (newPassword === repeatPassword) toggleIsNotSamePasswords(false);
  }, [
    oldPassword,
    newPassword,
    repeatPassword,
  ]);

  const isSaveButtonDisabled = (
    isNewPasswordEmpty
    || isOldPasswordEmpty
    || isNotSamePasswords
    || isRepeatPaswordEmpty
  );

  const handleGoToMe = () => history.push('/me');

  return (
    <>
      <Header>
        <IconWrap onClick={handleGoToMe}>
          <CloseIcon />
        </IconWrap>
        <Title>{mePage.change_password}</Title>
      </Header>
      <MainWrap>
        <Wrapper>
          <InputWrap>
            <Input
              type="password"
              placeholder=""
              label={inputsPages.old_password}
              onChange={setOldPassword}
              value={oldPassword}
              errorMsg={inputsPages.required}
              isError={isOldPasswordEmpty}
              autocapitalize="words"
            />
          </InputWrap>
          <InputWrap>
            <Input
              type="password"
              placeholder=""
              label={inputsPages.new_password}
              onChange={setNewPassword}
              value={newPassword}
              errorMsg={inputsPages.required}
              isError={isNewPasswordEmpty}
              autocapitalize="words"
            />
          </InputWrap>
          <InputWrap>
            <Input
              type="password"
              placeholder=""
              label={inputsPages.repeat_password}
              onChange={setRepeatPassword}
              value={repeatPassword}
              errorMsg={inputsPages.dont_match}
              isError={isNotSamePasswords}
              autocapitalize="words"
            />
          </InputWrap>
          {isError && <Error>{inputsPages.old_pass_error}</Error>}
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

const ButtonWrap = styled.div`
  width: 100%;
`;

const Error = styled.div`
  color: #feaa22;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
  margin-bottom: 16px;
`;

export default ChangePassword;
