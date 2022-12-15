/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import styled from 'styled-components';

import useToggle from '@/components/common/hooks/useToggle';

import DropDownIcon from '@/components/common/icons/DropDownIcon';

enum THEME {
  default,
  whitesmoke
}

interface Props {
  photo?: string;
  title: string;
  text?: string;
  theme?: THEME;
  selectContent: React.ReactNode;
  isSelectOpen?: boolean;
  onClick?: () => void;
  userClick?: () => void;
  withButton?: boolean;
}

export default function Select({
  theme = THEME.default,
  photo,
  title,
  text,
  selectContent,
  isSelectOpen = false,
  onClick,
  withButton = true,
  userClick,
} : Props) {
  const themes = {
    [THEME.default]: DefaultTheme,
    [THEME.whitesmoke]: WhiteSmokeTheme,
  };

  const lines = {
    [THEME.default]: DefaultLine,
    [THEME.whitesmoke]: WhiteSmokeLine,
  };

  const ThemedWrap = themes[theme];
  const ThemedLine = lines[theme];

  const [isOpen, setIsOpen] = useToggle();

  useEffect(() => {
    setIsOpen(isSelectOpen);
  }, [isSelectOpen]);

  return (
    <ThemedWrap>
      <Header onClick={() => (withButton ? setIsOpen(!isOpen) : setIsOpen(true))}>
        <Wrap onClick={userClick}>
          {photo && <Photo url={photo} />}
          <TextWrap>
            <Title>{title}</Title>
            {text && <Text>{text}</Text>}
          </TextWrap>
        </Wrap>
        { withButton && (
          <ArrowWrap active={isOpen}>
            <DropDownIcon />
          </ArrowWrap>
        )}
      </Header>
      {isOpen && (
      <ContentWrap onClick={onClick}>
        <ThemedLine />
        {selectContent}
      </ContentWrap>
      )}
    </ThemedWrap>
  );
}

Select.theme = THEME;

const DefaultTheme = styled.div`
  padding: 6px 10px 0;
  border-radius: 6px;
  margin: 5px 16px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  min-height: 61px;
  cursor: pointer;
`;

const WhiteSmokeTheme = styled.div`
  padding: 12px 13px 12px 13px;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.06);
  background-color: #f4f5f9;
  min-height: 72px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  cursor: pointer;
`;

const DefaultLine = styled.div`
  margin: 10px 0 10px -10px;
  width: calc(100% + 20px);
  height: 1px;
  background-color: #ebeced;
`;

const WhiteSmokeLine = styled.div`
  height: 1px;
  margin: 10px 0 10px;
  background-color: #dae1e8;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;

  text-transform: capitalize;
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;
`;

const ArrowWrap = styled.div<{ active: boolean }>`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s ease;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#f0f1f2' : 'transpatent')};
  transform: ${({ active }) => (active ? 'rotate(180deg)' : 'rotate(0)')};
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrap = styled.div`
`;

const Photo = styled.div<{url: string}>`
  width: 43px;
  height: 43px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 10px;
`;
