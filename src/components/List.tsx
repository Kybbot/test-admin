/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import { HandleToggle } from '@/components/common/hooks/useToggle';

enum VARIANT {
  pink,
  yellow,
  green,
  blue
}

interface Props {
  onClick?: () => void;
  leftIcon: React.ReactNode;
  text: string;
  variant?: VARIANT;
  count?: number;
}

export default function List({
  onClick,
  leftIcon,
  text,
  variant = VARIANT.pink,
  count = 0,
}: Props) {
  const type = {
    [VARIANT.pink]: PinkView,
    [VARIANT.yellow]: YellowView,
    [VARIANT.green]: GreenView,
    [VARIANT.blue]: BlueView,
  };
  const ThemedView = type[variant];

  return (
    <Wrapper onClick={onClick}>
      <ThemedView>
        {leftIcon}
      </ThemedView>
      <View>
        <Text>{text}</Text>
        <LastWrap>
          {Boolean(count) && <Count>{count}</Count>}
          <SmallArrowIcon />
        </LastWrap>
      </View>
    </Wrapper>
  );
}

List.variant = VARIANT;

const Wrapper = styled.div`
  min-height: 72px;
  background-color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const PinkView = styled.div`
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  border: solid 2px rgba(33, 39, 46, 0.08);
  border-radius: 50%;
  background-color: #f2f4fa;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const BlueView = styled.div`
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  border: solid 2px #23212e14;
  border-radius: 50%;
  background-color: #e3e8f8;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const YellowView = styled.div`
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  border: solid 2px rgba(33, 39, 46, 0.08);
  border-radius: 50%;
  background-color: #fff8eb;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const GreenView = styled.div`
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  border: solid 2px rgba(33, 39, 46, 0.08);
  border-radius: 50%;
  background-color: #e1eff0;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
`;

const View = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Count = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  background: #fda161;
  width: 22px;
  height: 22px;
  border-radius: 100%;
  margin-right: 16px;
  font-size: 12px;
  font-weight: 600;
`;

const LastWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
