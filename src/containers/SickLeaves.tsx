import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import {
  cleanSickLeaves,
  getPersonalSickLeaves,
  takeSickLeave,
} from '@/store/actions/sick-leaves';
import { selectRole } from '@/store/selectors/user';
import { selectPersonalCombinedSickLeaves, selectPersonalSickLeaves } from '@/store/selectors/sick-leaves';

import useLanguage from '@/components/common/hooks/useLanguage';
import Loader from '@/components/common/Loader';
import BackIcon from '@/components/common/icons/BackIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import Item from '@/components/sick-leaves/Item';
import useToggle from '@/components/common/hooks/useToggle';
import ModalSickLeave from '@/components/users/ModalTakeSickLieve';
import MyToast from '@/components/Toast';

const UserSickLeaves: React.FC = () => {
  const [isActiveModalSick, setIsActiveModalSick] = useToggle();
  const [isActiveToastSick, setIsActiveToastSick] = useToggle();
  const dispatch = useDispatch();
  const history = useHistory();
  const role = useSelector(selectRole);
  const sickLeaves = useSelector(selectPersonalSickLeaves);
  const combinedSickLeaves = useSelector(selectPersonalCombinedSickLeaves);
  const isAdmin = role === 'admin';
  const [{ mePage }] = useLanguage();

  const lastUserSickLeave = sickLeaves ? sickLeaves[0] : null;

  const wasSickLeaveYesterday = lastUserSickLeave
    ? moment().subtract(1, 'day').isSame(moment(lastUserSickLeave.date), 'day')
    : false;

  const isSickLeaveToday = lastUserSickLeave
    ? moment().isSame(moment(lastUserSickLeave.date), 'day')
    : false;

  useEffect(() => {
    dispatch(getPersonalSickLeaves());

    return () => {
      dispatch(cleanSickLeaves());
    };
  }, []);

  const handleTakeSickLeave = (comment: string) => {
    dispatch(takeSickLeave(comment));
    setIsActiveToastSick(true);
  };

  const handleExtendSickLeave = () => {
    dispatch(takeSickLeave(lastUserSickLeave!.comment));
    setIsActiveToastSick(true);
  };

  return (
    <>
      <Header>
        <HeaderWrap>
          <TopButton onClick={history.goBack}>
            <BackIcon />
          </TopButton>
          <HeaderText>{mePage.sick_leaves}</HeaderText>
          <HeaderSmallWrapper>
            {
              !isAdmin && !isSickLeaveToday && (
                <HeaderRectangle
                  onClick={wasSickLeaveYesterday ? handleExtendSickLeave : setIsActiveModalSick}
                >
                  <HeaderPlus>
                    <PlusIcon color="black" />
                  </HeaderPlus>
                </HeaderRectangle>
              )
            }
          </HeaderSmallWrapper>
        </HeaderWrap>
      </Header>
      {!sickLeaves || !combinedSickLeaves
        ? <Loader scale="0.5" />
        : (
          <ItemsContainer className="scrollbar">
            {combinedSickLeaves?.length ? (
              <>
                <TopWrap>
                  <VacationInfoWrap>
                    {`${mePage.total}:${sickLeaves.length}`}
                  </VacationInfoWrap>
                </TopWrap>
                {combinedSickLeaves.map((sickLeave) => (
                  <Item sickLeave={sickLeave} />
                ))}
              </>
            ) : (
              <>
                <EyesWrap>
                  <Eyes src="/assets/eyes.png" />
                </EyesWrap>
                <NoItem>{mePage.no_sick_leaves}</NoItem>
              </>
            )}
          </ItemsContainer>
        )}
      <MyToast
        isActive={isActiveToastSick}
        text={mePage.sick_toast}
        style={{
          maxWidth: '520px',
          width: 'calc(100% - 32px)',
          position: 'fixed',
        }}
        bottom={86}
        padding={16}
        autoClose={2000}
        hide={setIsActiveToastSick}
      />
      {isActiveModalSick && (
        <ModalSickLeave
          hideModal={setIsActiveModalSick}
          confirm={handleTakeSickLeave}
        />
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

const Header = styled.header`
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
  position: relative;
  z-index: 110;
  width: 100%;
  max-width: 552px;
`;

const HeaderWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
`;

const HeaderSmallWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
  width: 100%;
  padding-bottom: 2px;
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const TopButton = styled.div`
  color: black;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 24px;
`;

const HeaderRectangle = styled.div`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color:#21272e;
`;

const HeaderPlus = styled.div`
  width: 24px;
  height: 24px;
`;

const NoItem = styled.div`
  font-size: 25px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
  margin-bottom: 10px;
`;

const EyesWrap = styled.div`
  width: 62px;
  padding-top: 129px;
  margin: 0 auto 8px;
`;

const Eyes = styled.img`
  width: 62px;
  height: 80px;
  object-fit: contain;
  font-family: AppleColorEmoji;
  font-size: 64px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

export default UserSickLeaves;
