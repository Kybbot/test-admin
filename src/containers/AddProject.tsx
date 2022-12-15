import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { addProject } from '@/store/actions/projects';
import { getUsers } from '@/store/actions/users';
import { getCustomers } from '@/store/actions/customers';

import { selectUsers } from '@/store/selectors/users';
import { selectCustomers } from '@/store/selectors/customers';
import { selectIsSaveLoading } from '@/store/selectors/projects';

import useLanguage from '@/components/common/hooks/useLanguage';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useInput from '@/components/common/hooks/useInput';
import useToggle from '@/components/common/hooks/useToggle';
import DropDownSelect from '@/components/projects/DropDownSelect';
import Loader from '@/components/common/Loader';
import Button from '@/components/Button';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';

const AddProject: React.FC = () => {
  const [name, setName] = useInput('');
  const [startDate, setStartDate] = useInput('');
  const [deadline, setDeadline] = useInput('');
  const [customerId, setCustomerId] = useState<number>();
  const [customer, setCustomer] = useInput('');
  const [description, setDescription] = useInput('');
  const [isNameEmpty, toggleIsNameEmpty] = useToggle();
  const [isCustomerEmpty, toggleIsCustomerEmpty] = useToggle();
  const [isStartDateInvalid, toggleIsStartDateInvalid] = useToggle();
  const [isDeadlineInvalid, toggleIsDeadlineInvalid] = useToggle();

  const [{ inputsPages }] = useLanguage();

  const isSaveLoading = useSelector(selectIsSaveLoading);
  const users = useSelector(selectUsers);
  const customers = useSelector(selectCustomers);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCustomers());
  }, []);

  const handleSaveButtonClick = () => {
    if (!name) toggleIsNameEmpty(true);
    // if (!customer) toggleIsCustomerEmpty(true);

    if (!name) return;

    const body = {
      customerId,
      name,
      deadline: !deadline ? undefined : moment(deadline, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      startDate: !startDate ? undefined : moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      description,
    };
    dispatch(addProject(body));
  };

  useEffect(() => {
    if (name) toggleIsNameEmpty(false);
    if (customer) toggleIsCustomerEmpty(false);
    if (startDate) toggleIsStartDateInvalid(!moment(moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'), 'YYYY-MM-DD', true).isValid());
    if (deadline) toggleIsDeadlineInvalid(!moment(moment(deadline, 'DD/MM/YYYY').format('YYYY-MM-DD'), 'YYYY-MM-DD', true).isValid());
  }, [
    name,
    customer,
    startDate,
    deadline,
  ]);

  const handleChangeCustomer = (id: number, customerName: string) => {
    setCustomer(customerName);
    setCustomerId(id);
  };

  const isSaveButtonDisabled = (
    isNameEmpty
    || isDeadlineInvalid
    || isStartDateInvalid
    || isCustomerEmpty
  );

  const handleGoToUsers = () => history.push('/projects');

  return (
    <>
      <Header>
        <IconWrap onClick={handleGoToUsers}>
          <CloseIcon />
        </IconWrap>
        <Title>{inputsPages.add_project}</Title>
      </Header>
      {users === null || customers === null
        ? <Loader scale="0.5" />
        : (
          <MainWrap className="scrollbar">
            <Wrapper>
              <InputWrap>
                <Input
                  type="text"
                  placeholder="Project"
                  label={`${inputsPages.project_name}*`}
                  onChange={setName}
                  value={name}
                  errorMsg={inputsPages.required}
                  isError={isNameEmpty}
                  autocapitalize="words"
                />
              </InputWrap>
              <InputWrap>
                <DropDownSelect
                  value={customer}
                  setValue={handleChangeCustomer}
                  text={`${inputsPages.customer}`}
                />
              </InputWrap>
              <InputWrap>
                <Input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  label={`${inputsPages.start_date}`}
                  onChange={setStartDate}
                  value={startDate}
                  errorMsg={inputsPages.not_valid}
                  isError={isStartDateInvalid}
                  autocapitalize="words"
                  isDate
                />
              </InputWrap>
              <InputWrap>
                <Input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  label={inputsPages.deadline}
                  onChange={setDeadline}
                  value={deadline}
                  errorMsg={inputsPages.not_valid}
                  isError={isDeadlineInvalid}
                  autocapitalize="words"
                  isDate
                />
              </InputWrap>
              <InputWrap>
                <TextArea
                  setDescription={setDescription}
                  descriptionValue={description}
                  name={inputsPages.description}
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
  z-index: 2;
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
  padding: 28px 16px 16px;
  overflow-y: auto;
  background: white;
  justify-content: space-between;
  overflow-y: auto;
`;

const InputWrap = styled.div`
  font-weight: 400 !important;
  margin-bottom: 40px;
  width: 100%;
`;

const ButtonWrap = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
`;

export default AddProject;
