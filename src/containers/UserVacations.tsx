import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import {
  cleanOvertimes,
  cleanVacationInfo,
  cleanVacations,
  getUserOvertimes,
  getUserVacations,
  getUserVacationsInfo,
} from '@/store/actions/vacations';
import { selectUserOvertimes, selectVacationInfo, selectVacations } from '@/store/selectors/vacations';
import { selectRole } from '@/store/selectors/user';

import useLanguage from '@/components/common/hooks/useLanguage';
import VacationsCatalog from '@/components/userVacations/Catalog';
import OvertimesCatalog from '@/components/userOvertimes/Catalog';
import EmptyCatalog from '@/components/userVacations/EmptyCatalog';
import ItemHeader from '@/components/userVacations/ItemHeader';
import Loader from '@/components/common/Loader';
import ClockIcon from '@/components/СlockIcon';
import moment from 'moment';

interface Props extends RouteComponentProps<{ userId: string }> {}

const UserVacations: React.FC<Props> = ({ match, history }) => {
  const { userId: id } = match.params;

  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const vacations = useSelector(selectVacations);
  const vacationsInfo = useSelector(selectVacationInfo);
  const overtimes = useSelector(selectUserOvertimes);
  const isAdmin = role === 'admin';
  const [{ inputsPages, mePage }] = useLanguage();

  useEffect(() => {
    dispatch(getUserVacations(+id));
    dispatch(getUserVacationsInfo(+id));
    dispatch(getUserOvertimes(+id));

    return () => {
      dispatch(cleanVacations());
      dispatch(cleanOvertimes());
      dispatch(cleanVacationInfo());
    };
  }, []);

  const handleGoBack = () => history.goBack();

  const handleGoToAddOvertimePage = () => history.push(`/add-overtime/${id}`);

  const sortedVacations = vacations?.slice().sort(({ endDate: dateA }, { endDate: dateB }) => (
    moment(dateA).valueOf() - moment(dateB).valueOf()
  ));

  const sortedOvertimes = overtimes?.slice().sort(({ date: dateA }, { date: dateB }) => (
    moment(dateA).valueOf() - moment(dateB).valueOf()
  ));

  return (
    <>
      <ItemHeader
        goBack={handleGoBack}
        isAdmin={isAdmin}
        userId={+id}
      />
      {!vacations || !vacationsInfo || !overtimes
        ? <Loader scale="0.5" />
        : (
          <ItemsContainer className="scrollbar">
            {vacations!.length > 0 || overtimes.length > 0 || isAdmin ? (
              <>
                <TopWrap>
                  <VacationInfoWrap>
                    {`${mePage.used}:${vacationsInfo.usedDays}`}
                  </VacationInfoWrap>
                  <VacationInfoWrap>
                    {`${mePage.available}:${vacationsInfo.availableDays}`}
                  </VacationInfoWrap>
                  <VacationInfoWrap>
                    {`${mePage.total}: ${vacationsInfo.totalDays}`}
                  </VacationInfoWrap>
                </TopWrap>
                {isAdmin && (
                  <ItemWrap onClick={handleGoToAddOvertimePage}>
                    <ItemInfo>
                      <LinkButton>
                        <ButtonIconWrap>
                          <ClockIcon color="#21272e" />
                        </ButtonIconWrap>
                        <NameItem isColor>{inputsPages.add_overtime}</NameItem>
                      </LinkButton>
                    </ItemInfo>
                  </ItemWrap>
                )}
                <VacationsCatalog
                  vacationsInfo={vacationsInfo}
                  vacations={sortedVacations!}
                />
                <OvertimesCatalog
                  overtimes={sortedOvertimes!}
                />
              </>
            ) : (
              <EmptyCatalog isAdmin={role === 'admin'} availableDays={vacationsInfo.availableDays} />
            )}
          </ItemsContainer>
        )}
    </>
  );
};

const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  padding: 16px 0;
  overflow-y: auto;
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
  
  &:first-letter {
    text-transform: uppercase;
  }

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

const ItemWrap = styled.div`
  padding: 0 10px 0 10px;
  height: 50px;
  margin: 0 16px 16px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  position: relative;
  text-decoration: none;
  cursor: pointer;
`;

const ItemInfo = styled.div`
  width: 100%;
`;

const ButtonIconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 17px;
  margin-left: 12px;
`;

const LinkButton = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const TopWrap = styled.div`
  display: flex;
  padding: 0 16px;
  flex-wrap: wrap;
`;

const VacationInfoWrap = styled.div`
  display: inline-block;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.3px;
  color: #909599;
  white-space: nowrap;
  margin: 10px 10px 10px 0;
`;

export default UserVacations;
