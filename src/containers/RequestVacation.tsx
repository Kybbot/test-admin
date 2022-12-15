import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment, { Moment } from 'moment';

import {
  selectHolidays,
  selectIsSaveLoading,
  selectVacationInfo,
} from '@/store/selectors/vacations';
import { selectMyProjects } from '@/store/selectors/profile';
import { getMyProject } from '@/store/actions/profile';
import {
  getHolidays,
  getUserVacationsInfo,
  requestVacation,
} from '@/store/actions/vacations';

import useLanguage from '@/components/common/hooks/useLanguage';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useInput from '@/components/common/hooks/useInput';
import Calendar from '@/components/calendarMultiple/Calendar';
import Loader from '@/components/common/Loader';
import Button from '@/components/Button';
import Input from '@/components/Input';
import getMomentSting from '@/utils/getMomentSting';
import ProjectsIcon from '@/components/common/icons/navigation/projectsIcon';
import CheckBoxOffIcon from '@/components/common/icons/CheckBoxOffIcon';
import CheckBoxOnIcon from '@/components/common/icons/CheckBoxOnIcon';
import Empty from '@/components/Empty';

interface Props extends RouteComponentProps<{ userId: string }> {}

const RequestVacation: React.FC<Props> = ({ match }) => {
  const { userId } = match.params;
  const [comment, setComment] = useInput('');
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [projectIDs, setProjectIDs] = useState<number[]>([]);

  const [{ common, inputsPages }] = useLanguage();

  const isSaveLoading = useSelector(selectIsSaveLoading);
  const vacationInfo = useSelector(selectVacationInfo);
  const holidays = useSelector(selectHolidays);
  const projects = useSelector(selectMyProjects);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserVacationsInfo(+userId));
    dispatch(getMyProject());
    dispatch(getHolidays());
  }, []);

  const handleSaveButtonClick = () => {
    const body = {
      startDate: getMomentSting(startDate!),
      endDate: getMomentSting(endDate!),
      comment,
    };

    dispatch(requestVacation(body));
  };

  const handleProjectClick = (projectId: number) => () => {
    const updatedIDs = projectIDs.includes(projectId)
      ? projectIDs.filter((i: number) => i !== projectId)
      : [...projectIDs, projectId];

    setProjectIDs(updatedIDs);
  };

  const handleSetStartDate = (value: moment.Moment | null) => setStartDate(value);
  const handleSetEndDate = (value: moment.Moment | null) => setEndDate(value);

  const getIsHoliday = (dateMoment : Moment) => {
    if (holidays) {
      return Boolean(holidays.find(({ date: timestamp }) => moment(timestamp).isSame(dateMoment, 'day')));
    }

    return false;
  };

  const getCountSelectedDays = () => {
    if (endDate) {
      const diff = endDate!.diff(moment(startDate), 'days');

      const momentDate = moment(startDate);

      let countSelectedDays = diff;

      for (let i = 0; i <= diff; i += 1) {
        if (momentDate.day() === 0 || momentDate.day() === 6) {
          countSelectedDays -= 1;
        } else if (getIsHoliday(momentDate)) {
          countSelectedDays -= 1;
        }

        momentDate.add(1, 'days');
      }

      return countSelectedDays + 1;
    }
    return 0;
  };

  const getDateString = (date: moment.Moment | null) => {
    if (date) return moment(date).format('DD/MM/YYYY');

    return inputsPages.unset;
  };

  const isAllProjectsChecked = projects?.filter((project) => (
    project.isActive
  )).length === projectIDs.length;

  const isSaveButtonDisabled = (
    !startDate || !endDate || !isAllProjectsChecked
  );

  const handleGoToVacations = () => history.goBack();

  return (
    <>
      <Header>
        <IconWrap onClick={handleGoToVacations}>
          <CloseIcon />
        </IconWrap>
        <Title>{common.request_vacation}</Title>
      </Header>
      {
        !holidays || !vacationInfo || !projects
          ? <Loader />
          : (
            <MainWrap className="scrollbar">
              <Wrapper>
                <Details>
                  <TextWrap>
                    <DetailsText>{inputsPages.available_days}</DetailsText>
                    <DetailsSubText>{vacationInfo?.availableDays}</DetailsSubText>
                  </TextWrap>
                  <TextWrap>
                    <DetailsText>{inputsPages.selected_days}</DetailsText>
                    <DetailsSubText>{getCountSelectedDays()}</DetailsSubText>
                  </TextWrap>
                  <TextWrap>
                    <DetailsText>{inputsPages.vacation_start}</DetailsText>
                    <DetailsSubText>{getDateString(startDate)}</DetailsSubText>
                  </TextWrap>
                  <TextWrap>
                    <DetailsText>{inputsPages.vacation_end}</DetailsText>
                    <DetailsSubText>{getDateString(endDate)}</DetailsSubText>
                  </TextWrap>
                </Details>
                <CalendarWrap>
                  <Calendar
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={handleSetStartDate}
                    setEndDate={handleSetEndDate}
                    holidays={holidays}
                    fromDate={false}
                  />
                </CalendarWrap>
                <Description>
                  <SubTitle>{common.description}</SubTitle>
                  <Selected>D</Selected>
                  &nbsp;
                  {`- ${inputsPages.selected_desc}`}
                  <Empty height="8px" />
                  <Holiday>D</Holiday>
                  &nbsp;
                  {`- ${inputsPages.holidays_desc}`}
                  <Empty height="8px" />
                  <Weekends>D</Weekends>
                  &nbsp;
                  {`- ${inputsPages.weekends_desc}`}
                </Description>
                <ProjectsWrap>
                  <SubTitle>{common.customers_are_informed}</SubTitle>
                  {projects.filter((project) => project.isActive)
                    .map((project) => (
                      <Project onClick={handleProjectClick(project._id)}>
                        <ItemInfo>
                          <ProjectIconWrap>
                            <ProjectsIcon color="#333" />
                            <StatusIndicator isActive={project.isActive} />
                          </ProjectIconWrap>
                          <SmallWrap>
                            <NameItem isColor>{project.name}</NameItem>
                          </SmallWrap>
                        </ItemInfo>
                        <CheckBox>
                          {projectIDs.find((id) => id === project._id)
                            ? <CheckBoxOnIcon />
                            : <CheckBoxOffIcon />}
                        </CheckBox>
                      </Project>
                    ))}
                </ProjectsWrap>
                <InputWrap>
                  <Input
                    type="text"
                    placeholder={inputsPages.comment}
                    label={inputsPages.comment}
                    onChange={setComment}
                    value={comment}
                    autocapitalize="words"
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
                  {inputsPages.request}
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
  overflow-y: auto;
  height: 100%;
  padding: 28px 16px 16px;
  background: white;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const InputWrap = styled.div`
  font-weight: 400 !important;
  margin: 40px 0;
  width: 100%;
`;

const ButtonWrap = styled.div`
  width: 100%;
`;

const CalendarWrap = styled.div`
  height: 300px;
  width: 100%;
  margin: 30px 0;
`;

const DetailsText = styled.p`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #787c80;
`;

const DetailsSubText = styled.p`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #21272e;

  &::first-letter {
    text-transform: capitalize;
  }
`;

const Details = styled.div`
  padding: 10px 16px;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  width: 100%;
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px;
`;

const Description = styled.div`
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  white-space: pre-line;
  overflow: hidden;
`;

const Holiday = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 12px;
  padding-top: 4px;
  padding-left: 2px;
  color: #fff;
  height: 25px;
  width: 25px;
  background-color: #ff464c;
  border-radius: 50%;
`;

const Weekends = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 12px;
  padding-top: 4px;
  padding-left: 2px;
  color: #fff;
  height: 25px;
  width: 25px;
  background-color: #ff464ba8;
  border-radius: 50%;
`;

const Selected = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 12px;
  padding-top: 4px;
  padding-left: 2px;
  color: #fff;
  height: 25px;
  width: 25px;
  background-color: #fb7e14;
  border-radius: 50%;
`;

const ProjectsWrap = styled.div`
  margin: 30px 0;
`;

const CheckBox = styled.div`
  width: 24px;
  height: 24px;
`;

const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const NameItem = styled.div<{isColor: boolean}>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: ${({ isColor }) => (isColor ? '#21272e' : '#909599')};
  word-break: break-word;
  text-transform: capitalize;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;


  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const Project = styled.div`
  padding: 8px 10px;
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  text-decoration: none;
  cursor: pointer;
`;

const ProjectIconWrap = styled.div`
  position: relative;
  width: 43px;
  height: 43px;
  border-radius: 5px;
  border: 1px solid rgba(33, 39, 46, 0.08);
  font-size: 15px;
  font-weight: 600;
  background-color: #f0f1f2;
  margin-right: 10px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: normal;
  flex-shrink: 0;
`;

const StatusIndicator = styled.div<{isActive: boolean}>`
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 15px;
  height: 15px;
  border-radius: 100% 0 6px;
  border: 2px solid #fbfbfb;
  background: ${({ isActive }) => (isActive ? '#64bf6a' : '#909599')};
`;

const SmallWrap = styled.div`
  width: 100%;
`;

const SubTitle = styled.h4`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1.3px;
  color: #909599;
  white-space: nowrap;
  margin-bottom: 10px;
`;

export default RequestVacation;
