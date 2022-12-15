import React, { useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { editProject, cleanProject, getProject } from '@/store/actions/projects';
import { selectIsSaveLoading, selectProject } from '@/store/selectors/projects';

import useLanguage from '@/components/common/hooks/useLanguage';
import useInput from '@/components/common/hooks/useInput';
import CloseIcon from '@/components/common/icons/CloseIcon';
import Loader from '@/components/common/Loader';
import Button from '@/components/Button';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';

interface Props extends RouteComponentProps<{ projectId: string }> {}

const EditProject: React.FC<Props> = ({ match }) => {
  const { projectId } = match.params;
  const [name, setName] = useInput('');
  const [startDate, setStartDate] = useInput('');
  const [deadline, setDeadline] = useInput('');
  const [description, setDescription] = useInput('');

  const [{ inputsPages }] = useLanguage();

  const isSaveLoading = useSelector(selectIsSaveLoading);
  const project = useSelector(selectProject);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProject(+projectId));

    return () => {
      dispatch(cleanProject());
    };
  }, []);

  useEffect(() => {
    if (project) {
      setName(project.name);
      if (project.startDate) setStartDate(moment(project.startDate).format('DD/MM/YYYY'));
      if (project.deadline) setDeadline(moment(project.deadline).format('DD/MM/YYYY'));
      if (project.description) setDescription(project.description);
    }
  }, [project]);

  const handleSaveButtonClick = () => {
    const body = {
      name,
      deadline: !deadline ? undefined : moment(deadline, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      startDate: !startDate ? undefined : moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      description,
    };
    dispatch(editProject(body, +projectId));
  };

  const isNameEmpty = name.length === 0;
  const isStartDateValid = moment(moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'), 'YYYY-MM-DD', true).isValid() || startDate === '';
  const isDeadlineValid = moment(moment(deadline, 'DD/MM/YYYY').format('YYYY-MM-DD'), 'YYYY-MM-DD', true).isValid() || deadline === '';

  const isSaveButtonDisabled = (
    isNameEmpty
    || !isDeadlineValid
    || !isStartDateValid
  );

  const handleGoBack = () => history.goBack();

  return (
    <>
      <Header>
        <IconWrap onClick={handleGoBack}>
          <CloseIcon />
        </IconWrap>
        <Title>{inputsPages.edit}</Title>
      </Header>
      {!project
        ? <Loader scale="0.5" />
        : (
          <MainWrap className="scrollbar">
            <Wrapper>
              <InputWrap>
                <Input
                  type="text"
                  placeholder="Project"
                  label={inputsPages.project_name}
                  onChange={setName}
                  value={name}
                  errorMsg={inputsPages.required}
                  isError={isNameEmpty}
                  autocapitalize="words"
                />
              </InputWrap>
              <InputWrap>
                <Input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  label={inputsPages.start_date}
                  onChange={setStartDate}
                  value={startDate}
                  errorMsg={inputsPages.not_valid}
                  isError={!isStartDateValid}
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
                  isError={!isDeadlineValid}
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
  position: relative;
  max-width: 552px;
  width: 100%;
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
  padding: 28px 16px 16px;
  overflow-y: auto;
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

export default EditProject;
