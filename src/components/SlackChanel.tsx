import React, { FC } from 'react';
import styled from 'styled-components';
import { SlackChannels } from '@/store/reducers/projects';
import LockIcon from '@/components/common/icons/LockIcon';
import CheckBoxOnIcon from '@/components/common/icons/CheckBoxOnIcon';
import CheckBoxOffIcon from '@/components/common/icons/CheckBoxOffIcon';

export type Props = {
  slack:SlackChannels
  active: string
};

const SlackChannel:FC<Props> = ({ slack, active }) => (
  <>
    <SlackChanel>
      <SlackChanelIcon>
        {slack.is_private ? (
          <LockIconWrapper>
            <LockIcon color="#000" />
          </LockIconWrapper>
        ) : '#'}
      </SlackChanelIcon>
      <SlackChanelName>
        {slack.name}
      </SlackChanelName>
      <CheckBoxWrap>
        {
              slack.id.toString() === active.toString()
                ? <CheckBoxOnIcon /> : <CheckBoxOffIcon />
            }
      </CheckBoxWrap>
    </SlackChanel>
  </>
);

export default SlackChannel;

const CheckBoxWrap = styled.div`
  width: 40px;
  height: 40px;
  padding: 8px;
  cursor: pointer;
`;

const LockIconWrapper = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
`;

const SlackChanel = styled.div`
  display: flex;
  align-items: center;
  border: solid 1px rgba(33,39,46,0.12);
  padding: 0 15px;
  cursor: pointer;
  background-color: #fff;
  margin: 0 10px 10px 0;
  border-radius: 6px;
`;

const SlackChanelIcon = styled.div`
  color: #000
`;

const SlackChanelName = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  padding: 10px 10px;
  color: #000;

`;
