/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';

enum THEME {
  default,
  blue
}

enum COLORS {
  default,
  white
}

enum SUBCOLOR {
  default,
  white
}

interface Props {
  onClick?: () => void;
  theme?: THEME;
  color?: COLORS;
  leftIcon?: React.ReactNode;
  text: string;
  subText?: string;
  subColor?: SUBCOLOR;
  height?: string;
  pending?: number | undefined;
  classTracking?: string;
}

export default function Rectangle({
  onClick,
  theme = THEME.default,
  color = COLORS.default,
  leftIcon,
  text,
  subText,
  pending,
  subColor = SUBCOLOR.default,
  height = '64px',
  classTracking = '',
} : Props) {
  const wrappers = {
    [THEME.default]: DefaultWrap,
    [THEME.blue]: BlueWrap,
  };

  const colors = {
    [COLORS.default]: DefaultText,
    [COLORS.white]: WhiteText,
  };

  const subColors = {
    [SUBCOLOR.default]: DefaultSubText,
    [SUBCOLOR.white]: WhiteSubText,
  };

  const ThemedWrap = wrappers[theme];
  const ThemedText = colors[color];
  const ThemedSubText = subColors[subColor];

  return (
    <ThemedWrap className={classTracking} onClick={onClick} height={height}>
      <IconWrap isIcon={Boolean(leftIcon)}>
        {leftIcon}
      </IconWrap>
      <View>
        <Content>
          <ThemedText>{text}</ThemedText>
          {subText && <ThemedSubText>{subText}</ThemedSubText>}
        </Content>
      </View>
      {!!pending && <Circle><Count>{pending}</Count></Circle>}
      <IconArrowWrap>
        <SmallArrowIcon />
      </IconArrowWrap>
    </ThemedWrap>
  );
}

Rectangle.theme = THEME;
Rectangle.color = COLORS;
Rectangle.subColor = SUBCOLOR;

const DefaultWrap = styled.div<{ height: string }>`
  min-height: ${({ height }) => height};
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  padding: 0 20px;
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  cursor: pointer;
`;

const BlueWrap = styled.div`
  min-height: 80px;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #004085;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DefaultText = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;

  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WhiteText = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;

  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DefaultSubText = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WhiteSubText = styled.p`
  opacity: 0.7;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  margin-top: 7px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconWrap = styled.div<{ isIcon: boolean }>`
  display: ${({ isIcon }) => (isIcon ? 'block' : 'none')};
  min-width: 30px;
  max-width: 30px;
  height: 24px;
  margin-right: 16px;
`;

const IconArrowWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  max-width: 16px;
  min-height: 16px;
  max-height: 16px;
  margin-left: auto;
  margin-left: 12px;
`;

const View = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f43939;
  min-width: 24px;
  max-width: 24px;
  min-height: 24px;
  max-height: 24px;
  border-radius: 50%;
`;

const Count = styled.p`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;
