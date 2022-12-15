import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { deleteInventoryItemFromUser, getUsersInventory } from '@/store/actions/inventory';
import { editUser, getUser } from '@/store/actions/users';

import { Computer } from '@/store/reducers/inventory';
import ComputerIcon from '@/components/common/icons/ComputerIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import useToggle from '@/components/common/hooks/useToggle';
import ModalDelete from '@/components/users/ModalDelete';

import getPhoto from '@/utils/getPhoto';

interface Props {
  isPersonal: boolean;
  item?: Computer;
  isAdmin: boolean;
  userId: number;
}

const InventoryItem: React.FC<Props> = ({
  isPersonal, userId, item, isAdmin,
}) => {
  const [isActiveModalDelete, toggleIsActiveModalDelete] = useToggle();
  const dispatch = useDispatch();

  const handleDeleteBond = () => {
    if (item) {
      dispatch(deleteInventoryItemFromUser(item._id));

      toggleIsActiveModalDelete(false);
    }
  };

  const handleDeletePC = async () => {
    const body = {
      hasPersonalInventory: false,
    };

    await dispatch(editUser(body, userId, false));
    await dispatch(getUser(userId));
    dispatch(getUsersInventory(userId));
    toggleIsActiveModalDelete(false);
  };

  if (isPersonal) {
    return (
      <>
        <PersonalItemWrap>
          <ItemInfo>
            <ProjectIconWrap>
              <ComputerIcon color="#333" />
            </ProjectIconWrap>
            <NameItem isColor>Personal computer</NameItem>
          </ItemInfo>
          {
            isAdmin && (
              <RightArrow onClick={toggleIsActiveModalDelete}>
                <PlusIcon stroke="#909599" width="20px" height="20px" />
              </RightArrow>
            )
          }
        </PersonalItemWrap>
        {isActiveModalDelete && (
          <ModalDelete
            deleteHandle={handleDeletePC}
            hideModal={toggleIsActiveModalDelete}
          />
        )}
      </>
    );
  }

  if (item) {
    return (
      <ItemWrap>
        <TopWrap>
          <LinkUser>
            <Photo url={getPhoto(item.photo)} />
            <TextGroup>
              <NameItem isColor>{`${item.model} ${item.diagonal} ${item.year}`}</NameItem>
              <Parameters>{`${item.imei}, ${item.cpu}, ${item.ram}, ${item.memory}`}</Parameters>
            </TextGroup>
          </LinkUser>
          {
            isAdmin && (
              <RightArrow onClick={toggleIsActiveModalDelete}>
                <PlusIcon stroke="#909599" width="20px" height="20px" />
              </RightArrow>
            )
          }
        </TopWrap>
        {isActiveModalDelete && (
          <ModalDelete
            deleteHandle={handleDeleteBond}
            hideModal={toggleIsActiveModalDelete}
          />
        )}
      </ItemWrap>
    );
  }

  return null;
};

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const TopWrap = styled.div`
  min-height: 61px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Parameters = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #2c2f33;
  margin-top: 3px;
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
  padding: 0 10px;
  margin: 4px 0;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
`;

const Photo = styled.div<{url: string}>`
  width: 60px;
  height: 55px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 10px;
  background-position: center;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightArrow = styled.div`
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  cursor: pointer;
`;

const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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
  flex-shrink: 0;
`;

const PersonalItemWrap = styled.div`
  padding: 8px 10px;
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  position: relative;
  cursor: pointer;
`;

export default InventoryItem;
