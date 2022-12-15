import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import {
  editCustomer,
  cleanCustomer,
  getCustomer,
} from '@/store/actions/customers';
import { selectIsSaveLoading, selectCustomer } from '@/store/selectors/customers';

import useLanguage from '@/components/common/hooks/useLanguage';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import { validateEmail } from '@/utils/validate-email';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useToggle from '@/components/common/hooks/useToggle';
import useInput from '@/components/common/hooks/useInput';
import Loader from '@/components/common/Loader';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputFile from '@/components/InputFile';

import getPhoto from '@/utils/getPhoto';
import { validateUrl } from '@/utils/validate-url';

interface Props extends RouteComponentProps<{ customerId: string }> {}

const EditCustomer: React.FC<Props> = ({ match, history }) => {
  const { customerId: id } = match.params;
  const [name, setName] = useInput('');
  const customer = useSelector(selectCustomer);
  const [{ src, alt, file }, setPhotoFile] = useState({
    src: customer ? getPhoto(customer!.smallPhoto!) : '/assets/noname.png',
    alt: 'Select Image',
    file: '',
  });
  const [email, setEmail] = useInput();
  const [secondEmail, setSecondEmail] = useInput();
  const [birthday, setBirthday] = useInput('');
  const [linkedIn, setLinkedIn] = useInput('');
  const [isSecondEmailActive, toggleIsSecondEmailActive] = useToggle();

  const [{ inputsPages }] = useLanguage();

  const isSaveLoading = useSelector(selectIsSaveLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomer(+id));

    return () => {
      dispatch(cleanCustomer());
    };
  }, []);

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      if (customer.email && customer.email[0]) setEmail(customer.email[0]);

      if (customer.email && customer.email[1]) {
        setSecondEmail(customer.email[1]);
        toggleIsSecondEmailActive(true);
      }

      if (customer.birthday) setBirthday(moment(customer.birthday).format('DD/MM/YYYY'));
      if (customer.linkedInProfile) setLinkedIn(customer.linkedInProfile);
    }
  }, [customer]);

  const handleSaveButtonClick = () => {
    const formData = new FormData();
    if (file) formData.append('image', file);
    const emails = [];
    if (email) emails.push(email);
    if (secondEmail) emails.push(secondEmail);
    const body = {
      name,
      birthday: birthday ? moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD') : undefined,
      email: emails.length ? emails : undefined,
      linkedInProfile: linkedIn || undefined,
    };
    dispatch(editCustomer(body, formData, +id));
  };

  const handlePhotoFile = (e: any) => {
    if (e.target.files[0]) {
      setPhotoFile({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
        file: e.target.files[0],
      });
    }
  };

  const isNameEmpty = name.length === 0;
  const isEmailInvalid = !validateEmail(email);
  const isSecondEmailInvalid = !validateEmail(secondEmail);
  // const isPhotoInvalid = !validateUrl(photoUrl);
  const isBirthdayValid = moment(moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'), 'YYYY-MM-DD', true).isValid() || birthday === '';
  const isLinkedInValid = !validateUrl(linkedIn) && linkedIn.length !== 0;

  const isSaveButtonDisabled = (
    isNameEmpty
    || isEmailInvalid
    || !isBirthdayValid
    || isSecondEmailInvalid
    || isLinkedInValid
  );

  const handleGoToCustomer = () => history.goBack();

  return (
    <>
      <Header>
        <IconWrap onClick={handleGoToCustomer}>
          <CloseIcon />
        </IconWrap>
        <Title>{inputsPages.edit}</Title>
      </Header>
      {
        !customer
          ? <Loader scale="0.5" />
          : (
            <MainWrap>
              <Wrapper>
                <InputWrap>
                  <Input
                      type="text"
                      placeholder="Taras Shevchenko"
                      label={`${inputsPages.full_name}*`}
                      onChange={setName}
                      value={name}
                      errorMsg={inputsPages.required}
                      isError={isNameEmpty}
                      autocapitalize="words"
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
                    isError={isLinkedInValid}
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
          )
      }
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

const InputWrap = styled.div<{ alt?: string }>`
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

export default EditCustomer;
