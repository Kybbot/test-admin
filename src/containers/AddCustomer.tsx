import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { addCustomer } from '@/store/actions/customers';
import { selectIsSaveLoading } from '@/store/selectors/customers';

import useLanguage from '@/components/common/hooks/useLanguage';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import { validateEmail } from '@/utils/validate-email';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useInput from '@/components/common/hooks/useInput';
import useToggle from '@/components/common/hooks/useToggle';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { validateUrl } from '@/utils/validate-url';

const AddCustomer: React.FC = () => {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [secondEmail, setSecondEmail] = useInput('');
  const [linkedIn, setLinkedIn] = useInput('');
  const [birthday, setBirthday] = useInput('');
  const [isNameEmpty, toggleIsNameEmpty] = useToggle();
  const [isSecondEmailActive, toggleIsSecondEmailActive] = useToggle();
  const [isEmailInvalid, toggleIsEmailInvalid] = useToggle();
  const [isSecondEmailInvalid, toggleIsSecondEmailInvalid] = useToggle();
  const [isLinkedInInvalid, toggleIsLinkedInInvalid] = useToggle();
  const [isBirthdayInvalid, toggleIsBirthdayInvalid] = useToggle();

  const [{ inputsPages }] = useLanguage();

  const isSaveLoading = useSelector(selectIsSaveLoading);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSaveButtonClick = () => {
    if (!name) toggleIsNameEmpty(true);

    if (!name) return;
    const emails = [];
    if (email) emails.push(email);
    if (secondEmail) emails.push(secondEmail);
    const body = {
      name,
      birthday: birthday ? moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD') : undefined,
      email: emails.length ? emails : undefined,
      linkedInProfile: linkedIn || undefined,
    };
    dispatch(addCustomer(body));
  };
  useEffect(() => {
    if (name) toggleIsNameEmpty(false);
    toggleIsEmailInvalid(!validateEmail(email) && email.length !== 0);
    toggleIsSecondEmailInvalid(!validateEmail(secondEmail) && secondEmail.length !== 0);
    toggleIsBirthdayInvalid(!moment(moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'), 'YYYY-MM-DD', true).isValid() && birthday.length !== 0);
    toggleIsLinkedInInvalid(!validateUrl(linkedIn) && linkedIn.length !== 0);
  }, [
    name,
    email,
    secondEmail,
    birthday,
    linkedIn,
  ]);

  const isSaveButtonDisabled = (isNameEmpty
    || (isSecondEmailInvalid && isSecondEmailActive)
    || isEmailInvalid
    || isBirthdayInvalid
  );

  const handleGoToCustomers = () => history.push('/customers');

  return (
    <>
      <Header>
        <IconWrap onClick={handleGoToCustomers}>
          <CloseIcon />
        </IconWrap>
        <Title>{inputsPages.add_customer}</Title>
      </Header>
      <MainWrap>
        <Wrapper>
          <InputWrap>
            <Input
              type="text"
              placeholder="Taras"
              label={`${inputsPages.customer_name}*`}
              onChange={setName}
              value={name}
              errorMsg={inputsPages.required}
              isError={isNameEmpty}
              autocapitalize="words"
            />
          </InputWrap>
          <InputWrap>
            <Input
              type="email"
              placeholder="example@gmail.com"
              label={inputsPages.email}
              onChange={setEmail}
              value={email}
              errorMsg={inputsPages.not_valid}
              isError={isEmailInvalid}
              autocapitalize="words"
            />
            <PlusWrap onClick={toggleIsSecondEmailActive} isActive={isSecondEmailActive}>
              <PlusIcon stroke="#909599" width="20px" height="20px" />
            </PlusWrap>
          </InputWrap>
          {
            isSecondEmailActive && (
              <InputWrap>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  label={inputsPages.second_email}
                  onChange={setSecondEmail}
                  value={secondEmail}
                  errorMsg={inputsPages.not_valid}
                  isError={isSecondEmailInvalid}
                  autocapitalize="words"
                />
              </InputWrap>
            )
          }
          <InputWrap>
            <Input
              type="text"
              placeholder="https://www.linkedin.com/in/taras/"
              label={inputsPages.linkedin}
              onChange={setLinkedIn}
              value={linkedIn}
              errorMsg={inputsPages.not_valid}
              isError={isLinkedInInvalid}
              autocapitalize="words"
              isDate
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
              isError={isBirthdayInvalid}
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
            {inputsPages.add}
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

const InputWrap = styled.div`
  font-weight: 400 !important;
  margin-bottom: 40px;
  width: 100%;
  display: flex;
`;

const ButtonWrap = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const PlusWrap = styled.div<{isActive: boolean}>`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-top: 18px;
  transform: ${({ isActive }) => (isActive ? 'rotate(46deg)' : 'none')};
  transition: all 0.3s;
`;

export default AddCustomer;
