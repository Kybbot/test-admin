import React from 'react';
import styled from 'styled-components';

import ProjectsIcon from '@/components/common/icons/navigation/projectsIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';

interface Props {
  text: string;
  smallPhoto?: string;
  deleteHandle: () => void;
}

const ReminderItem: React.FC<Props> = ({
  text,
  smallPhoto,
  deleteHandle,
}) => (
  <ItemWrap>
    <ItemInfo>
      <LinkUser>
        {
          smallPhoto ? (
            <Photo url={smallPhoto!} />
          ) : (
            <ProjectIconWrap>
              <ProjectsIcon color="#333" />
            </ProjectIconWrap>
          )
        }
        <NameItem isColor>{text}</NameItem>
      </LinkUser>
    </ItemInfo>
    <LinkUser>
      <RightArrow onClick={deleteHandle}>
        <PlusIcon stroke="#909599" width="20px" height="20px" />
      </RightArrow>
    </LinkUser>
  </ItemWrap>
);

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const RightArrow = styled.div`
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  cursor: pointer;
`;

const ItemInfo = styled.div`
  width: 100%;
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
  text-transform: capitalize;

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
  padding: 8px 10px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  cursor: inherit;;
`;

const Photo = styled.div<{url: string}>`
  width: 43px;
  height: 43px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 10px;
  background-position: center;
`;

const ProjectIconWrap = styled.div`
  width: 43px;
  height: 43px;
  border-radius: 5px;
  border: 1.7px solid rgba(33, 39, 46, 0.08);
  font-size: 15px;
  font-weight: 600;
  background-color: #f0f1f2;
  margin-right: 10px;
  text-transform: uppercase;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  word-break: normal;
`;

export default ReminderItem;
