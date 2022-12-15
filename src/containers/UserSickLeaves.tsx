import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { cleanSickLeaves, getUserSickLeaves, takeSickLeave } from '@/store/actions/sick-leaves';
import { selectCombinedSickLeaves, selectSickLeaves } from '@/store/selectors/sick-leaves';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import BackIcon from '@/components/common/icons/BackIcon';
import ModalSickLeave from '@/components/users/ModalTakeSickLieve';
import Item from '@/components/sick-leaves/Item';
import Loader from '@/components/common/Loader';
import MyToast from '@/components/Toast';

interface Props extends RouteComponentProps<{ userId: string }> {}

const UserSickLeaves: React.FC<Props> = ({ match, history }) => {
  const { userId: id } = match.params;
  const [isActiveModalSick, setIsActiveModalSick] = useToggle();
  const [isActiveToastSick, setIsActiveToastSick] = useToggle();
  const dispatch = useDispatch();
  const sickLeaves = useSelector(selectSickLeaves);
  const combinedSickLeaves = useSelector(selectCombinedSickLeaves);
  const [{ mePage }] = useLanguage();

  useEffect(() => {
    dispatch(getUserSickLeaves(+id));

    return () => {
      dispatch(cleanSickLeaves());
    };
  }, []);

  const handleTakeSickLeave = (comment: string) => {
    dispatch(takeSickLeave(comment));
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
        </HeaderWrap>
      </Header>
      {!sickLeaves || !combinedSickLeaves
        ? <Loader scale="0.5" />
        : (
          <ItemsContainer className="scrollbar">
            {combinedSickLeaves.length ? (
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
