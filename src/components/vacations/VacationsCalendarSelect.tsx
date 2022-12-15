/* eslint-disable react/require-default-props */
import React from 'react';
import styled, { css } from 'styled-components';
import Icon from '@/components/Icon';
import { SickLeaveWithType, VacationWithType } from '@/components/calendar/VacationsCalendar';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectDateCalendar } from '@/store/selectors/date';
import { Teammate } from '@/store/reducers/projects';

enum THEME {
  default,
  whitesmoke
}

interface Props {
  type: 'vacation' | 'sick-leave',
  photo?: string;
  title: string;
  theme?: THEME;
  clicked: boolean,
  item: VacationWithType | SickLeaveWithType;
  activeUsers:Teammate[];
}

export default function AdminCalendarSelect({
  theme = THEME.default,
  photo,
  title,
  clicked,
  type,
  item,
  activeUsers,
} : Props) {
  const themes = {
    [THEME.default]: DefaultTheme,
    [THEME.whitesmoke]: WhiteSmokeTheme,
  };
  const ThemedWrap = themes[theme];
  const selectedDay = useSelector(selectDateCalendar);

  const getDatesString = () => {
    if (item.type === 'vacation' && !item.vacations && item.startDate === item.endDate) {
      return `${moment(item.startDate).format('D MMM')}`;
    }
    if (item.type === 'vacation' && !item.vacations && item.startDate !== item.endDate && moment(item.startDate).isSame(moment(item.endDate), 'month')) {
      return `${moment(item.startDate).format('D')}-${moment(item.endDate).format('D MMM')}`;
    }
    if (item.type === 'vacation' && !item.vacations && item.startDate !== item.endDate) {
      return `${moment(item.startDate).format('D MMM')}-${moment(item.endDate).format('D MMM')}`;
    }

    if (item.type === 'vacation') {
      if (moment(item.startDate).isSame(moment(item.endDate), 'month')) {
        const isOneDay = moment(item.startDate).isSame(moment(item.endDate), 'day');
        return `${moment(item.startDate).format('D')}${!isOneDay ? ` - ${moment(item.endDate).format('D MMM')}` : ` ${moment(item.startDate).format('MMM')}`}`;
      }
      return `${moment(item.startDate).format('D MMM')} - ${moment(item.endDate).format('D MMM')}`;
    }
    if (item.type === 'sick-leave') {
      if (moment(item.startDate).isSame(moment(item.endDate), 'month')) {
        const isOneDay = moment(item.startDate).isSame(moment(item.endDate), 'day');
        return `${moment(item.startDate).format('D')}${!isOneDay ? ` - ${moment(item.endDate).format('D MMM')}` : ` ${moment(item.startDate).format('MMM')}`}`;
      }
      return `${moment(item.startDate).format('D MMM')} - ${moment(item.endDate).format('D MMM')}`;
    }
    return null;
  };

  const activeCalendarDates = () => {
    if (item.type === 'vacation' && item.vacations) {
      return item.vacations.some(({ startDate, endDate }) => moment(selectedDay).isBetween(moment(startDate), moment(endDate), 'day', '[]'));
    }
    if (item.type === 'sick-leave' && item.sickLeaves) {
      return item.sickLeaves.some(({ date }) => moment(selectedDay).isSame(date, 'day'));
    }
    return moment(selectedDay).isBetween(moment(item.startDate), moment(item.endDate), 'day', '[]');
  };

  if (activeUsers && activeUsers.some(({ user }) => user._id === item.userId)) {
    return (
      <ThemedWrap clicked={clicked} active={activeCalendarDates()}>
        <Header>
          <Wrap>
            {photo && (
            <Photo url={photo}>
              <Type><Icon img={type === 'vacation' ? 'Workload0.png' : 'Pill.png'} width="14px" height="14px" /></Type>
            </Photo>
            )}
            <TextWrap>
              <Title>{title}</Title>
              <Text>
                {getDatesString()}
              </Text>
            </TextWrap>
          </Wrap>
        </Header>
      </ThemedWrap>
    );
  }
  return (
    <ThemedWrap clicked={clicked} active={activeCalendarDates()}>
      <Header>
        <Wrap>
          {photo && (
            <Photo url={photo}>
              <Type><Icon img={type === 'vacation' ? 'Workload0.png' : 'Pill.png'} width="14px" height="14px" /></Type>
            </Photo>
          )}
          <TextWrap>
            <Title>{title}</Title>
            <Text>
              {getDatesString()}
            </Text>
          </TextWrap>
        </Wrap>
      </Header>
    </ThemedWrap>
  );
}

AdminCalendarSelect.theme = THEME;

const DefaultTheme = styled.div<{clicked: boolean, active?: boolean}>`
  padding: 10px 10px;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  cursor: pointer;

  ${({ clicked }) => clicked
    && css`
  border: solid 1px #3897ff;
  background-color: #3897ff40;
  `};
  ${({ active }) => active
          && css`
  border: solid 1px #3897ff;
  background-color: #3897ff40;
  `};
`;

const WhiteSmokeTheme = styled.div<{clicked: boolean}>`
  padding: 12px 13px 12px 13px;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.06);
  background-color: #f4f5f9;

  ${({ clicked }) => clicked
    && css`
  border: solid 1px #3897ff;
  background-color: #3897ff40;
  `};
`;

const Header = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  text-transform: capitalize;
  max-width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 540px) {
    max-width: 22vw;
  }
`;

const Text = styled.div`
  font-size: 9px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Photo = styled.div<{url: string}>`
  position: relative;
  width: 37px;
  height: 37px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-position: center;
  background-size: cover;
  border-radius: 100%;
  margin-right: 10px;

  @media screen and (max-width: 350px) {
    height: 32px;
    width: 32px;
    margin-right: 5px;
  }
`;

const Type = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;
