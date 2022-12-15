import React, { FC, useEffect } from 'react';
import Input from '@/components/Input';
import SlackChannel from '@/components/SlackChanel';
import styled from 'styled-components';
import search from '@/utils/search';
import { SlackChannels } from '@/store/reducers/projects';
import { useDispatch, useSelector } from 'react-redux';
import { selectSlackChannels } from '@/store/selectors/projects';
import useInput from '@/components/common/hooks/useInput';
import { HandleToggle } from '@/components/common/hooks/useToggle';
import { getSlackChannels } from '@/store/actions/projects';

export type Props = {
  saveSlackInfo: (item:SlackChannels) => void
  active: string
  sendSlackChannels: () => void
  hideModal: HandleToggle;
};

const SlackModal:FC<Props> = ({
  saveSlackInfo, active, sendSlackChannels, hideModal,
}) => {
  const dispatch = useDispatch();
  const [searchValue, setSearch] = useInput('');

  const slackChannels = useSelector(selectSlackChannels);
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    dispatch(getSlackChannels());
  }, []);

  const searchItems = slackChannels ? search(slackChannels!, searchValue, ({ name }) => name) : [];

  return (
    <>
      <Background height={window.innerHeight} onClick={hideModal}>
        <Modal height={window.innerHeight} width={530} onClick={stopPropagation}>
          <SearchWrapper>
            <Input
              value={searchValue}
              onChange={setSearch}
              placeholder="Search..."
            />
          </SearchWrapper>
          <Wrapper>

            {
        searchItems.map((item) => (
          <SlackChannelsWrapper
            onClick={() => saveSlackInfo(item)}
            key={item.id}
          >
            <SlackChannel
              slack={item}
              active={active}
            />
          </SlackChannelsWrapper>
        ))
      }
          </Wrapper>
          <ButtonConfirm onClick={sendSlackChannels}>Confirm</ButtonConfirm>
        </Modal>
      </Background>
    </>
  );
};

export default SlackModal;

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
const SearchWrapper = styled.div`
  width: 100%;
  padding: 10px 0 0 0;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 460px;
  border-top: none;
  overflow: auto;
  position: relative;
  margin-bottom: 15px;
  margin-top: 10px;
  @media ${device.mobileS} {
    height: 355px;
  }
  @media ${device.mobileM} {
    height: 355px
  }
`;
const SlackChannelsWrapper = styled.div`
`;

const ButtonConfirm = styled.div`
  padding: 10px 10px;
  background: linear-gradient(99deg, #ff7500, #fb7e14);
  font-size: 15px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: solid 1px rgba(33,39,46,0.12);
  border-radius: 6px;
`;

const Background = styled.div<{ height: number }>`
  width: 100vw;
  height: ${({ height }) => height && `${height}px`};
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
`;

const Modal = styled.div<{ height: number, width:number }>`
  width:  100% ;
  max-width: 530px;
  min-height: 500px;
  box-shadow: 0 24px 24px 0 rgba(0, 0, 0, 0.3), 0 0 24px 0 rgba(0, 0, 0, 0.22);
  border-style: solid;
  border-width: 0.5px;
  border-image-source: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.4) 5%,
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 255, 255, 0)
  );
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #ffffff, #ffffff),
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.4) 5%,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0)
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin: 0 auto;
  padding: 12px 24px 24px 24px;
  background-color: white;
  position: absolute;
  left: ${({ width }) => `calc((100vw - ${width + 15}px) / 2)`} ;
  top: ${({ height }) => height && `calc((${height}px - 675px) / 2)`};
  border-radius: 3px;


  @media ${device.mobileS} {
    width: 94%;
    left: 10px;
    top: 17px;
    overflow-y: auto;
  }
  @media ${device.mobileM} {
    left: 10px;
    width: 95%;
    top: ${({ height }) => height && `calc((${height}px - 532px) / 2)`};
    bottom: unset;
  }
  @media ${device.tablet} {
    left: ${({ width }) => `calc((100vw - ${width}px) / 2)`} ;
    width:  100% ;
    max-width: 530px;
  }
`;
