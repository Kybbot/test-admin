import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { changeLanguage, resetLoadingStatus } from '@/store/actions/language';
import { getMe } from '@/store/actions/login';
import { selectIsSaveLoading } from '@/store/selectors/language';
import { LANGUAGES } from '@/store/reducers/language';

import LanguageCheckIcon from '@/components/common/icons/LanguageCheckIcon';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useLanguage from '@/components/common/hooks/useLanguage';

import LoaderDots from '@/components/common/LoaderDots';
import { selectUser } from '@/store/selectors/user';

const ChangeLanguage: React.FC = () => {
  const dispatch = useDispatch();
  const [{ mePage }] = useLanguage();
  const history = useHistory();
  const user = useSelector(selectUser);
  const isSaveLoading = useSelector(selectIsSaveLoading);
  const [ln, setLn] = useState<LANGUAGES>(LANGUAGES.EN);

  useEffect(() => {
    if (!user) dispatch(getMe());

    return () => {
      dispatch(resetLoadingStatus());
    };
  }, []);

  useEffect(() => {
    if (user) {
      if (user.language) setLn(user.language);
    }
  }, [user]);

  const handleLanguageClick = (lnToSet: LANGUAGES) => () => {
    const body = {
      language: lnToSet,
    };

    dispatch(changeLanguage(body));
    setLn(lnToSet);
  };

  const languages: [string, LANGUAGES][] = [
    ['Українська', LANGUAGES.UA],
    ['English', LANGUAGES.EN],
    ['Русский', LANGUAGES.RU],
  ];

  const handleGoToSettings = () => history.goBack();

  return (
    <>
      <Header>
        <IconWrap onClick={handleGoToSettings}>
          <CloseIcon />
        </IconWrap>
        {isSaveLoading
          ? <LoaderDots />
          : <Title>{mePage.change_language}</Title>}
      </Header>
      <MainWrap>
        {languages.map((item) => (
          <Language
            key={item[0]}
            onClick={handleLanguageClick(item[1])}
          >
            {item[0]}
            <CheckIconWrap
              isSelected={item[1] === ln}
            >
              <LanguageCheckIcon />
            </CheckIconWrap>
          </Language>
        ))}
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
  z-index: 99;
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
  padding: 88px 0 16px 0;

  @media screen and (min-width: 552px) {
    height: calc(100% - 140px);
  }
`;

const Language = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 13px 16px;
  width: 100%;
  cursor: pointer;
`;

const CheckIconWrap = styled.div<{isSelected: boolean}>`
  display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
  min-width: 22px;
  height: 22px;
`;

export default ChangeLanguage;
